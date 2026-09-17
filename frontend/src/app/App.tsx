import { Link, NavLink, Outlet } from 'react-router'

export const App = () => {
  return (
    <div>
      <header>
        <Link to="/">Inventory</Link>
        <nav aria-label="Main navigation">
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/products/new">Add product</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
