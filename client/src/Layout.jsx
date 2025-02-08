import { Outlet } from 'react-router-dom'
import Header from './Components/Header'

function Layout() {
    return (
        //removed min-h-screen
        <div className='p-4 flex flex-col md:max-w-6xl mx-auto'>
            <Header />
            <Outlet />
        </div>
    )
}

export default Layout