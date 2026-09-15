import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Post,
} from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { CreateProductDto } from './dtos/create-product.dto.js';
import { UpdateProductDto } from './dtos/update-product.dto.js';

@Controller('products')
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@Get()
	findAll() {
		return this.productsService.findAll();
	}

	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.productsService.findOne(id);
	}

	@Post()
	create(@Body() input: CreateProductDto) {
		return this.productsService.create(input);
	}

	@Patch(':id')
	update(
		@Param('id', ParseIntPipe) id: number,
		@Body() input: UpdateProductDto,
	) {
		return this.productsService.update(id, input);
	}

	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.productsService.remove(id);
	}
}
