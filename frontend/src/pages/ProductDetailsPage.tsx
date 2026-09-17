import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'
import { productQuery } from '../lib/api/products.queries'

export const ProductDetailsPage = () => {
	const { productId } = useParams()
	const parsedProductId = Number(productId)
	const { data: product, isPending, isError } = useQuery({
		...productQuery(parsedProductId),
		enabled: Number.isInteger(parsedProductId),
	})

	if (!Number.isInteger(parsedProductId) || isError) return <p role="alert">Product not found.</p>
	if (isPending) return <p>Loading product...</p>

	return <h1>{product.name}</h1>
}
