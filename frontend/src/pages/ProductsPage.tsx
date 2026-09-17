import { ProductsList } from '../components/ProductsList'

export const ProductsPage = () => {
	return (
		<section className="mx-auto mt-8 w-[calc(100%-2rem)] max-w-250 pb-10 sm:mt-14">
			<div className="mb-8">
				<div>
					<p className="mb-2.5 text-xs font-bold uppercase tracking-[0.12em] text-[#4c766a]">Inventory</p>
					<h1 className="m-0 font-serif text-4xl font-medium tracking-[-0.03em] text-[#24302d] sm:text-5xl">Products</h1>
					<p className="mt-2.5 text-[#60706a]">Keep an eye on what is in stock and ready to move.</p>
				</div>
			</div>
			<ProductsList />
		</section>
	)
}
