import { Link } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { productsQuery } from '../lib/api/products.queries'

export const ProductsPage = () => {
	const { data: products, isPending, isError } = useQuery(productsQuery())

	if (isPending) return <p>Loading products...</p>
	if (isError) return <p role="alert">Unable to load products.</p>

	return (
		<section>
			<div>
				<h1>Products</h1>
				<Link to="/products/new">Add product</Link>
			</div>
			{products.length === 0 ? <p>No products yet.</p> : (
				<ul>
					{products.map((product) => (
						<li key={product.id}>
							<Link to={`/products/${product.id}`}>{product.name}</Link>
							<span> {product.quantity} in stock</span>
						</li>
					))}
				</ul>
			)}
		</section>
	)
}
