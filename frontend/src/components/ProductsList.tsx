import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router'
import { productsQuery } from '../lib/api/products.queries'

export const ProductsList = () => {
	const { data: products, isPending, isError } = useQuery(productsQuery())

	if (isPending) return <p className="rounded-xl border border-[#d8e1da] bg-white/90 p-8 text-[#60706a] shadow-[0_18px_45px_rgba(39,61,51,0.08)]">Loading products...</p>
	if (isError) return <p className="rounded-xl border border-[#f0d1ce] bg-[#fff0ef] p-4 text-[#a33f3f]" role="alert">Unable to load products.</p>

	return (
		products.length === 0 ? <p className="rounded-xl border border-dashed border-[#cbd8cf] bg-white/70 p-8 text-[#60706a]">No products yet.</p> : (
			<ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2">
				{products.map((product) => (
					<li className="rounded-xl border border-[#d8e1da] bg-white/90 p-5 shadow-[0_12px_30px_rgba(39,61,51,0.07)] transition hover:-translate-y-px hover:border-[#a9c0b3]" key={product.id}>
						<Link className="font-serif text-2xl font-medium tracking-[-0.02em] text-[#24302d] no-underline hover:text-[#315f54]" to={`/products/${product.id}`}>{product.name}</Link>
						<p className="m-0 mt-2 text-sm text-[#60706a]">{product.quantity} in stock</p>
					</li>
				))}
			</ul>
		)
	)
}