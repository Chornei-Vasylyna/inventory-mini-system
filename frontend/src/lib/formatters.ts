import type { ProductStatus } from './api/products.types'

export const formatProductStatus = (status: ProductStatus) => {
	const readableStatus = status.replace(/_/g, ' ')

	return readableStatus.charAt(0).toUpperCase() + readableStatus.slice(1)
}