import { apiClient } from '../../app/config/axiosConfig'
import type { CreateProductInput, Product, UpdateProductInput } from './products.types'

export const productsService = {
	async getAll() {
		const response = await apiClient.get<Product[]>('/products')
		return response.data
	},

	async getById(productId: number) {
		const response = await apiClient.get<Product>(`/products/${productId}`)
		return response.data
	},

	async create(input: CreateProductInput) {
		const response = await apiClient.post<Product>('/products', input)
		return response.data
	},

	async update(productId: number, input: UpdateProductInput) {
		const response = await apiClient.patch<Product>(`/products/${productId}`, input)
		return response.data
	},

	async remove(productId: number) {
		await apiClient.delete(`/products/${productId}`)
	},
}
