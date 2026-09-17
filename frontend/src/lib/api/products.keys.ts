export const productKeys = {
	all: ['products'] as const,
	detail: (productId: number) => ['products', productId] as const,
}
