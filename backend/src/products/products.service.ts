import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import type { ProductStatus } from '../generated/prisma/enums.js';
import type { CreateProductDto } from './dtos/create-product.dto.js';
import type { UpdateProductDto } from './dtos/update-product.dto.js';

@Injectable()
export class ProductsService {
	constructor(private readonly prisma: PrismaService) {}

	findAll() {
		return this.prisma.product.findMany({
			orderBy: { createdAt: 'desc' },
		});
	}

	async findOne(id: number) {
		const product = await this.prisma.product.findUnique({ where: { id } });

		if (!product) {
			throw new NotFoundException(`Product with id ${id} not found`);
		}

		return product;
	}

	create(input: CreateProductDto) {
		const status = this.calculateStatus(input.quantity);

		return this.prisma.product.create({ data: {
			...input, 
			status
		}});
	}

	async update(id: number, input: UpdateProductDto) {
		await this.findOne(id);
		const data = input.quantity === undefined
			? input
			: { ...input, status: this.calculateStatus(input.quantity) };

		return this.prisma.product.update({
			where: { id },
			data,
		});
	}

	async remove(id: number) {
		await this.findOne(id);

		return this.prisma.product.delete({ where: { id } });
	}

	private calculateStatus(quantity: number): ProductStatus {
		if (quantity <= 0) return "out_of_stock";
		if (quantity <= 5) return "low_stock";
		return "in_stock"
	}
}
