import { Outlet } from 'react-router-dom'
import Header from '../components/header/header'

const Layout = () => {
  return (
    <div className="flex">
      <aside className="bg-white w-[200px] min-h-screen border-r border-gray-200 pt-6 px-5">
        <b className="text-xl font-bold text-black mb-10 font-mono">SkyDesk</b>
        <nav className="flex flex-col gap-1 mt-10">
          <span className='text-black text-lg'>Dashboard</span>
          <span className='text-black text-lg'>Tickets</span>
        </nav>
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