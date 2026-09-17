import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router'
import { productQuery } from '../lib/api/products.queries'

export const ProductDetails = () => {
	const { productId } = useParams()

	const parsedProductId = Number(productId)
    
	const { data: product, isPending, isError } = useQuery({
		...productQuery(parsedProductId),
		enabled: Number.isInteger(parsedProductId),
	})

	if (!Number.isInteger(parsedProductId) || isError) return <p className="rounded-xl border border-[#f0d1ce] bg-[#fff0ef] p-4 text-[#a33f3f]" role="alert">Product not found.</p>
	if (isPending) return <p className="rounded-xl border border-[#d8e1da] bg-white/90 p-8 text-[#60706a] shadow-[0_18px_45px_rgba(39,61,51,0.08)]">Loading product...</p>

	const { name, quantity, price, description } = product

	return (
		<>
			<div className="mb-8">
				<Link className="text-sm font-bold text-[#4c766a] no-underline hover:underline" to="/products">&larr; Back to products</Link>
				<p className="mb-2.5 mt-6 text-xs font-bold uppercase tracking-[0.12em] text-[#4c766a]">Product details</p>
				<h1 className="m-0 font-serif text-4xl font-medium tracking-[-0.03em] text-[#24302d] sm:text-5xl">{name}</h1>
			</div>
			<div className="rounded-xl border border-[#d8e1da] bg-white/90 p-6 shadow-[0_18px_45px_rgba(39,61,51,0.1)] sm:p-10">
				<dl className="m-0 grid gap-6 sm:grid-cols-2">
					<div>
						<dt className="text-xs font-bold uppercase tracking-widest text-[#60706a]">In stock</dt>
						<dd className="m-0 mt-1 font-serif text-3xl text-[#24302d]">{quantity}</dd>
					</div>
					<div>
						<dt className="text-xs font-bold uppercase tracking-widest text-[#60706a]">Price</dt>
						<dd className="m-0 mt-1 font-serif text-3xl text-[#24302d]">${Number(price).toFixed(2)}</dd>
					</div>
					<div className="sm:col-span-2">
						<dt className="text-xs font-bold uppercase tracking-widest text-[#60706a]">Description</dt>
						<dd className="m-0 mt-2 leading-7 text-[#60706a]">{description || 'No description provided.'}</dd>
					</div>
				</dl>
			</div>
		</>
	)
}