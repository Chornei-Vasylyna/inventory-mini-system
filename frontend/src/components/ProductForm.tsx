import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router'
import { useCreateProduct, useUpdateProduct } from '../lib/api/products.mutations'
import { productQuery } from '../lib/api/products.queries'
import { productSchema, type ProductFormValues } from '../lib/validation/productSchema'
import { ProductFormField } from './ProductFormField'

const inputClassName = 'w-full rounded-md border border-[#cbd8cf] bg-[#fbfdfb] px-3 py-3 text-[#24302d] outline-none transition placeholder:text-[#94a29a] focus:border-[#4c766a] focus:ring-4 focus:ring-[#4c766a]/15 aria-invalid:border-[#b64f4f]'

export const ProductForm = () => {
	const navigate = useNavigate()
	const { productId } = useParams()

	const parsedProductId = Number(productId)
	const isEditMode = Number.isInteger(parsedProductId)
	
	const createProduct = useCreateProduct()
	const updateProduct = useUpdateProduct(parsedProductId)
	const { data: product, isPending: isProductPending, isError: isProductError } = useQuery({
		...productQuery(parsedProductId),
		enabled: isEditMode,
	})
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<ProductFormValues>({
		resolver: zodResolver(productSchema),
		values: product ? {
			name: product.name,
			quantity: product.quantity,
			price: Number(product.price),
			description: product.description ?? '',
		} : { name: '', quantity: 0, price: 0, description: '' },
	})

	const onSubmit = (values: ProductFormValues) => {
		const description = values.description?.trim() || ''

		if (isEditMode) {
			updateProduct.mutate({ ...values, description: description || null }, {
				onSuccess: () => navigate('/products'),
			})
			return
		}

		createProduct.mutate({ ...values, description: description || undefined }, {
			onSuccess: () => navigate('/products'),
		})
	}

	if (isEditMode && isProductError) return <p className="rounded-xl border border-[#f0d1ce] bg-[#fff0ef] p-4 text-[#a33f3f]" role="alert">Unable to load product.</p>
	if (isEditMode && (isProductPending || !product)) return <p className="rounded-xl border border-[#d8e1da] bg-white/90 p-8 text-[#60706a] shadow-[0_18px_45px_rgba(39,61,51,0.08)]">Loading product...</p>

	const isPending = isSubmitting || createProduct.isPending || updateProduct.isPending

	return (
		<form className="grid gap-5 rounded-xl border border-[#d8e1da] bg-white/90 p-6 shadow-[0_18px_45px_rgba(39,61,51,0.1)] sm:grid-cols-2 sm:p-10" onSubmit={handleSubmit(onSubmit)} noValidate>
				<ProductFormField colSpan label="Name" name="name" error={errors.name?.message}>
					<input className={inputClassName} id="name" placeholder="e.g. Wireless keyboard" {...register('name')} aria-invalid={Boolean(errors.name)} />
				</ProductFormField>
				<ProductFormField label="Quantity" name="quantity" error={errors.quantity?.message}>
					<input className={inputClassName} id="quantity" type="number" min="0" step="1" {...register('quantity', { valueAsNumber: true })} aria-invalid={Boolean(errors.quantity)} />
				</ProductFormField>
				<ProductFormField label="Price" name="price" error={errors.price?.message}>
					<input className={inputClassName} id="price" type="number" min="0" step="0.01" {...register('price', { valueAsNumber: true })} aria-invalid={Boolean(errors.price)} />
				</ProductFormField>
				<ProductFormField colSpan label="Description (optional)" name="description" error={errors.description?.message}>
					<textarea className={`${inputClassName} min-h-27.5 resize-y`} id="description" placeholder="Add useful details for your team" {...register('description')} />
				</ProductFormField>
				{(createProduct.isError || updateProduct.isError) && <p className="m-0 rounded-md bg-[#fff0ef] px-3 py-2.5 text-xs text-[#a33f3f] sm:col-span-2" role="alert">Unable to {isEditMode ? 'update' : 'create'} product.</p>}
				<div className="flex items-center gap-4.5 pt-1 sm:col-span-2">
					<button className="cursor-pointer rounded-md border-0 bg-[#315f54] px-4.5 py-3 font-bold text-white transition hover:bg-[#264c43] hover:-translate-y-px disabled:cursor-wait disabled:opacity-65" type="submit" disabled={isPending}>
						{isPending ? (isEditMode ? 'Saving...' : 'Creating...') : (isEditMode ? 'Save changes' : 'Create product')}
					</button>
					<Link className="font-bold text-[#4c766a] no-underline hover:underline" to="/products">Cancel</Link>
				</div>
		</form>
	)
}