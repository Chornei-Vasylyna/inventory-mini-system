import { Module } from '@nestjs/common';
import { ProductsController } from './products/products.controller.js';
import { ProductsService } from './products/products.service.js';
import { PrismaService } from './prisma.service.js';


@Module({
  imports: [],
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService],
})
export class AppModule {}
