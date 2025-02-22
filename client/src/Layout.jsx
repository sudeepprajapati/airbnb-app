import { Outlet } from 'react-router-dom'
import Header from './Components/Header'
import Footer from './Components/Footer'

function Layout() {
    return (
        //removed min-h-screen
        <>
            <main className='p-4 flex flex-col md:max-w-6xl mx-auto'>
                <Header />
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default Layout