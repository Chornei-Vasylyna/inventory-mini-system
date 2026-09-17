export type ProductStatus = 'out_of_stock' | 'low_stock' | 'in_stock'

export type Product = {
	id: number
	name: string
	quantity: number
	price: number | string
	status: ProductStatus
	description: string | null
	createdAt: string
	updatedAt: string | null
}

export type CreateProductInput = {
	name: string
	quantity: number
	price: number
	description?: string
}

export type UpdateProductInput = Partial<CreateProductInput>
