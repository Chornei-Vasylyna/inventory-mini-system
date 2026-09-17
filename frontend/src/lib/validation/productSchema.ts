import { z } from 'zod'

export const productSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  quantity: z.number({ error: 'Quantity is required' }).int('Quantity must be a whole number').min(0, 'Quantity cannot be negative'),
  price: z.number({ error: 'Price is required' }).min(0, 'Price cannot be negative').refine(
    (value) => Number.isInteger(value * 100),
    'Price can have at most 2 decimal places',
  ),
  description: z.string().trim().optional(),
})

export type ProductFormValues = z.infer<typeof productSchema>