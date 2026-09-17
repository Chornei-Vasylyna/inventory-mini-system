import { Link, NavLink, Outlet } from 'react-router'

export const App = () => {
  return (
    <div className="min-h-screen bg-[#f3f7f3] text-[#24302d]">
      <header className="border-b border-[#d8e1da] bg-[#fbfdfb]/90">
        <div className="mx-auto flex w-[calc(100%-2rem)] max-w-275 items-center justify-between gap-6 py-4 sm:py-5">
          <Link className="font-serif text-2xl font-medium tracking-[-0.03em] text-[#24302d] no-underline" to="/">Inventory</Link>
          <nav className="flex items-center gap-4 text-sm font-bold sm:gap-7" aria-label="Main navigation">
              <NavLink end className={({ isActive }) => `no-underline transition ${isActive ? 'text-[#315f54]' : 'text-[#60706a] hover:text-[#315f54]'}`} to="/products">Products</NavLink>
            <NavLink className={({ isActive }) => `no-underline transition ${isActive ? 'text-[#315f54]' : 'text-[#60706a] hover:text-[#315f54]'}`} to="/products/new">Add product</NavLink>
          </nav>
        </div>
      </header>
      <main className="min-h-[calc(100vh-73px)]">
        <Outlet />
      </main>
    </div>
  )
}
