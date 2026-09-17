import { useMutation, useQueryClient } from '@tanstack/react-query'
import { productKeys } from './products.keys'
import { productsService } from './products.service'
import type { CreateProductInput, UpdateProductInput } from './products.types'

export const useCreateProduct = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (input: CreateProductInput) => productsService.create(input),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: productKeys.all })
		},
	})
}

export const useUpdateProduct = (productId: number) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (input: UpdateProductInput) => productsService.update(productId, input),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: productKeys.detail(productId) })
			await queryClient.invalidateQueries({ queryKey: productKeys.all })
		},
	})
}

export const useDeleteProduct = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (productId: number) => productsService.remove(productId),
		onSuccess: async (_, productId) => {
			queryClient.removeQueries({ queryKey: productKeys.detail(productId) })
			await queryClient.invalidateQueries({ queryKey: productKeys.all })
		},
	})
}
