import { NavLink, Outlet } from 'react-router-dom'
import Header from '../components/header/header'

const Layout = () => {
  return (
    <div className="flex">
      <aside className="bg-white w-[200px] min-h-screen border-r border-gray-200 pt-6 px-5">
        <b className="text-xl font-bold text-black mb-10 font-mono">SkyLia</b>
        <div className='flex flex-col mt-10 gap-5'>
          <NavLink to="/dashboard" className="text-black hover:text-blue-500 text-md">Dashboard</NavLink>
          <NavLink to="/dashboard/tickets" className="text-black hover:text-blue-500 text-md">Tickets</NavLink>
        </div>
      </aside>

      <div className="flex-1 flex flex-col w-full">
        <Header items={[]} active='' />
        <main className="p-6 ">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout