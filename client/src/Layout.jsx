import { Outlet } from 'react-router-dom'
import Header from './Components/Header'

function Layout() {
    return (
        <div className='p-4 flex flex-col min-h-screen'>
            <Header />
            <Outlet />
        </div>
    )
}

export default Layout