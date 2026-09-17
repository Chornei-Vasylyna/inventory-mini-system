import { queryOptions } from '@tanstack/react-query'
import { productKeys } from './products.keys'
import { productsService } from './products.service'

export const productsQuery = () =>
	queryOptions({
		queryKey: productKeys.all,
		queryFn: productsService.getAll,
	})

export const productQuery = (productId: number) =>
	queryOptions({
		queryKey: productKeys.detail(productId),
		queryFn: () => productsService.getById(productId),
	})
