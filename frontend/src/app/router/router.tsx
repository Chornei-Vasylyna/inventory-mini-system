import { createBrowserRouter, redirect } from 'react-router'
import { App } from '../App'
import { ProductDetailsPage } from '../../pages/ProductDetailsPage'
import { ProductFormPage } from '../../pages/ProductFormPage'
import { ProductsPage } from '../../pages/ProductsPage'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        loader: () => redirect('/products'),
      },
      {
        path: 'products',
        Component: ProductsPage,
      },
      {
        path: 'products/new',
        Component: ProductFormPage,
      },
      {
        path: 'products/:productId/edit',
        Component: ProductFormPage,
      },
      {
        path: 'products/:productId',
        Component: ProductDetailsPage,
      },
    ],
  },
])