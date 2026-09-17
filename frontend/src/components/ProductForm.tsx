import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { useCreateProduct } from '../lib/api/products.mutations'
import { productSchema, type ProductFormValues } from '../lib/validation/productSchema'
import { ProductFormField } from './ProductFormField'

const inputClassName = 'w-full rounded-md border border-[#cbd8cf] bg-[#fbfdfb] px-3 py-3 text-[#24302d] outline-none transition placeholder:text-[#94a29a] focus:border-[#4c766a] focus:ring-4 focus:ring-[#4c766a]/15 aria-invalid:border-[#b64f4f]'

export const ProductForm = () => {
	const navigate = useNavigate()
	const createProduct = useCreateProduct()
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<ProductFormValues>({
		resolver: zodResolver(productSchema),
		defaultValues: { name: '', description: '' },
	})

	const onSubmit = (values: ProductFormValues) => {
		createProduct.mutate({ ...values, description: values.description || undefined }, {
			onSuccess: () => navigate('/products'),
		})
	}

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
				{createProduct.isError && <p className="m-0 rounded-md bg-[#fff0ef] px-3 py-2.5 text-xs text-[#a33f3f] sm:col-span-2" role="alert">Unable to create product.</p>}
				<div className="flex items-center gap-4.5 pt-1 sm:col-span-2">
					<button className="rounded-md border-0 bg-[#315f54] px-4.5 py-3 font-bold text-white transition hover:bg-[#264c43] hover:-translate-y-px disabled:cursor-wait disabled:opacity-65" type="submit" disabled={isSubmitting || createProduct.isPending}>
						{isSubmitting || createProduct.isPending ? 'Creating...' : 'Create product'}
					</button>
					<Link className="font-bold text-[#4c766a] no-underline hover:underline" to="/products">Cancel</Link>
				</div>
		</form>
	)
}