import { useParams } from 'react-router'

export const ProductDetailsPage = () => {
	const { productId } = useParams()

	return <h1>Product {productId}</h1>
}
