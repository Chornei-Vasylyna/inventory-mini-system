import type { ReactNode } from 'react'

type ProductFormFieldProps = {
	children: ReactNode
	colSpan?: boolean
	label: string
	name: string
	error?: string
}

export const ProductFormField = ({ children, colSpan = false, label, name, error }: ProductFormFieldProps) => (
	<div className={`flex flex-col gap-2${colSpan ? ' sm:col-span-2' : ''}`}>
		<label className="text-sm font-bold text-[#24302d]" htmlFor={name}>{label}</label>
		{children}
		{error && <p className="m-0 text-xs text-[#a33f3f]" role="alert">{error}</p>}
	</div>
)