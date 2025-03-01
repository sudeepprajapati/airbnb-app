import { Outlet } from 'react-router-dom'
import Header from './Components/Header'
import Footer from './Components/Footer'
import { createContext, useState } from 'react';

export const SearchContext = createContext();

function Layout() {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    return (
        <SearchContext.Provider value={{ searchQuery, handleSearch }}>
            <div>
                <Header onSearch={handleSearch} />
                <main className='p-4 flex flex-col md:max-w-6xl mx-auto'>
                    <Outlet />
                </main>
                <Footer />
            </div>
        </SearchContext.Provider>
    )
}

export default Layout