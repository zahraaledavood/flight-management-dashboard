import { NavLink, Outlet } from 'react-router-dom'
import Header from '../components/header/header'

const Layout = () => {
  return (
    <div className="flex">
      <aside className="bg-white w-[200px] min-h-screen border-r border-gray-200 pt-6 px-5">
        <b className="text-xl font-bold text-black mb-10 font-mono">Airline Name</b>
        <div className='flex flex-col mt-10 gap-5'>
          <NavLink to="/dashboard" end className={({isActive})=> `text-black ${isActive ? 'bg-cream-custom': ''} p-2 rounded-md text-sm hover:text-black`}>Dashboard</NavLink>
          <NavLink to="/dashboard/tickets" className={({isActive})=> `text-black ${isActive ? 'bg-cream-custom': ''} p-2 rounded-md text-sm hover:text-black`}>Tickets</NavLink>
          <NavLink to="/dashboard/setting" className={({isActive})=> `text-black ${isActive ? 'bg-cream-custom' : ''} p-2 rounded-md text-sm hover:text-black`}>Setting</NavLink>
        </div>
      </aside>

      <div className="flex-1 flex flex-col w-full">
        <Header items={[]} active='' showLogout={true} />
        <main className="p-6 ">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout