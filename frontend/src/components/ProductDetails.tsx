import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate, useParams } from 'react-router'
import { useDeleteProduct } from '../lib/api/products.mutations'
import { productQuery } from '../lib/api/products.queries'
import { formatProductStatus } from '../lib/formatters'

export const ProductDetails = () => {
	const { productId } = useParams()

	const parsedProductId = Number(productId)
	const navigate = useNavigate()
	const deleteProduct = useDeleteProduct()
    
	const { data: product, isPending, isError } = useQuery({
		...productQuery(parsedProductId),
		enabled: Number.isInteger(parsedProductId),
	})

	if (!Number.isInteger(parsedProductId) || isError) return <p className="rounded-xl border border-[#f0d1ce] bg-[#fff0ef] p-4 text-[#a33f3f]" role="alert">Product not found.</p>
	if (isPending) return <p className="rounded-xl border border-[#d8e1da] bg-white/90 p-8 text-[#60706a] shadow-[0_18px_45px_rgba(39,61,51,0.08)]">Loading product...</p>

	const { name, quantity, price, status, description } = product

	const handleDelete = () => {
		if (!window.confirm(`Delete ${name}?`)) return
		deleteProduct.mutate(parsedProductId, { onSuccess: () => navigate('/products') })
	}

	return (
		<>
			<div className="mb-8">
				<Link className="text-sm font-bold text-[#4c766a] no-underline hover:underline" to="/products">&larr; Back to products</Link>
				<p className="mb-2.5 mt-6 text-xs font-bold uppercase tracking-[0.12em] text-[#4c766a]">Product details</p>
				<h1 className="m-0 font-serif text-4xl font-medium tracking-[-0.03em] text-[#24302d] sm:text-5xl">{name}</h1>
			</div>
			<div className="mb-6 flex flex-wrap gap-3">
				<Link className="rounded-md bg-[#315f54] px-4 py-2.5 font-bold text-white no-underline transition hover:bg-[#264c43]" to={`/products/${parsedProductId}/edit`}>Edit product</Link>
				<button className="cursor-pointer rounded-md border border-[#b64f4f] bg-transparent px-4 py-2.5 font-bold text-[#a33f3f] transition hover:bg-[#fff0ef] disabled:cursor-wait disabled:opacity-65" type="button" onClick={handleDelete} disabled={deleteProduct.isPending}>Delete product</button>
			</div>
			{deleteProduct.isError && <p className="mb-6 rounded-md bg-[#fff0ef] px-3 py-2.5 text-xs text-[#a33f3f]" role="alert">Unable to delete product.</p>}
			<div className="rounded-xl border border-[#d8e1da] bg-white/90 p-6 shadow-[0_18px_45px_rgba(39,61,51,0.1)] sm:p-10">
				<dl className="m-0 grid gap-6 sm:grid-cols-2">
					<div>
						<dt className="text-xs font-bold uppercase tracking-widest text-[#60706a]">Status</dt>
						<dd className="m-0 mt-1 font-serif text-3xl text-[#24302d]">{formatProductStatus(status)}</dd>
					</div>
					<div>
						<dt className="text-xs font-bold uppercase tracking-widest text-[#60706a]">Quantity</dt>
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