import { ProductForm } from '../components/ProductForm'

export const ProductFormPage = () => {
	return (
		<section className="mx-auto mt-8 w-[calc(100%-2rem)] max-w-170 pb-10 sm:mt-14">
			<div className="mb-6">
				<p className="mb-2.5 text-xs font-bold uppercase tracking-[0.12em] text-[#4c766a]">Inventory</p>
				<h1 className="m-0 font-serif text-4xl font-medium tracking-[-0.03em] text-[#24302d] sm:text-5xl">Add product</h1>
				<p className="mt-2.5 text-[#60706a]">Capture the details of a product to add it to your stock.</p>
			</div>
			<ProductForm />
		</section>
	)
}