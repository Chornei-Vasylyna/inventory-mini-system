import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { productSchema, type ProductFormValues } from '../lib/validation/productSchema'
import { useCreateProduct } from '../lib/api/products.mutations'

export const ProductFormPage = () => {
	const navigate = useNavigate()
	const createProduct = useCreateProduct()
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<ProductFormValues>({
		resolver: zodResolver(productSchema),
		defaultValues: {
			name: '',
			description: '',
		},
	})

	const onSubmit = (values: ProductFormValues) => {
		createProduct.mutate({ ...values, description: values.description || undefined }, {
			onSuccess: () => navigate('/products'),
		})
	}

	return (
		<section className="mx-auto mt-8 w-[calc(100%-2rem)] max-w-[680px] pb-10 sm:mt-14">
			<div className="mb-6">
				<p className="mb-2.5 text-xs font-bold uppercase tracking-[0.12em] text-[#4c766a]">Inventory</p>
				<h1 className="m-0 font-serif text-4xl font-medium tracking-[-0.03em] text-[#24302d] sm:text-5xl">Add product</h1>
				<p className="mt-2.5 text-[#60706a]">Capture the details of a product to add it to your stock.</p>
			</div>
			<form className="grid gap-5 rounded-xl border border-[#d8e1da] bg-white/90 p-6 shadow-[0_18px_45px_rgba(39,61,51,0.1)] sm:grid-cols-2 sm:p-10" onSubmit={handleSubmit(onSubmit)} noValidate>
				<div className="flex flex-col gap-2 sm:col-span-2">
					<label className="text-sm font-bold text-[#24302d]" htmlFor="name">Name</label>
					<input className="w-full rounded-md border border-[#cbd8cf] bg-[#fbfdfb] px-3 py-3 text-[#24302d] outline-none transition placeholder:text-[#94a29a] focus:border-[#4c766a] focus:ring-4 focus:ring-[#4c766a]/15 aria-invalid:border-[#b64f4f]" id="name" placeholder="e.g. Wireless keyboard" {...register('name')} aria-invalid={Boolean(errors.name)} />
					{errors.name && <p className="m-0 text-xs text-[#a33f3f]" role="alert">{errors.name.message}</p>}
				</div>

				<div className="flex flex-col gap-2">
					<label className="text-sm font-bold text-[#24302d]" htmlFor="quantity">Quantity</label>
					<input
						className="w-full rounded-md border border-[#cbd8cf] bg-[#fbfdfb] px-3 py-3 text-[#24302d] outline-none transition placeholder:text-[#94a29a] focus:border-[#4c766a] focus:ring-4 focus:ring-[#4c766a]/15 aria-invalid:border-[#b64f4f]"
						id="quantity"
						type="number"
						min="0"
						step="1"
						{...register('quantity', { valueAsNumber: true })}
						aria-invalid={Boolean(errors.quantity)}
					/>
					{errors.quantity && <p className="m-0 text-xs text-[#a33f3f]" role="alert">{errors.quantity.message}</p>}
				</div>

				<div className="flex flex-col gap-2">
					<label className="text-sm font-bold text-[#24302d]" htmlFor="price">Price</label>
					<input
						className="w-full rounded-md border border-[#cbd8cf] bg-[#fbfdfb] px-3 py-3 text-[#24302d] outline-none transition placeholder:text-[#94a29a] focus:border-[#4c766a] focus:ring-4 focus:ring-[#4c766a]/15 aria-invalid:border-[#b64f4f]"
						id="price"
						type="number"
						min="0"
						step="0.01"
						{...register('price', { valueAsNumber: true })}
						aria-invalid={Boolean(errors.price)}
					/>
					{errors.price && <p className="m-0 text-xs text-[#a33f3f]" role="alert">{errors.price.message}</p>}
				</div>

				<div className="flex flex-col gap-2 sm:col-span-2">
					<label className="text-sm font-bold text-[#24302d]" htmlFor="description">Description (optional)</label>
					<textarea className="min-h-[110px] w-full resize-y rounded-md border border-[#cbd8cf] bg-[#fbfdfb] px-3 py-3 text-[#24302d] outline-none transition placeholder:text-[#94a29a] focus:border-[#4c766a] focus:ring-4 focus:ring-[#4c766a]/15 aria-invalid:border-[#b64f4f]" id="description" placeholder="Add useful details for your team" {...register('description')} />
					{errors.description && <p className="m-0 text-xs text-[#a33f3f]" role="alert">{errors.description.message}</p>}
				</div>

				{createProduct.isError && <p className="m-0 rounded-md bg-[#fff0ef] px-3 py-2.5 text-xs text-[#a33f3f] sm:col-span-2" role="alert">Unable to create product.</p>}

				<div className="flex items-center gap-[18px] pt-1 sm:col-span-2">
					<button className="rounded-md border-0 bg-[#315f54] px-[18px] py-3 font-bold text-white transition hover:bg-[#264c43] hover:-translate-y-px disabled:cursor-wait disabled:opacity-65" type="submit" disabled={isSubmitting || createProduct.isPending}>
						{isSubmitting || createProduct.isPending ? 'Creating...' : 'Create product'}
					</button>
					<Link className="font-bold text-[#4c766a] no-underline hover:underline" to="/products">Cancel</Link>
				</div>
			</form>
		</section>
	)
}
