import { Outlet } from 'react-router-dom'
import Header from './Components/Header'
import Footer from './Components/Footer'

function Layout() {
    return (
        //removed min-h-screen
        <>
            <div className='p-4 flex flex-col md:max-w-6xl mx-auto'>
                <Header />
                <Outlet />
            </div>
            <Footer />
        </>
    )
}

export default Layout