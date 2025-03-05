import { UserContext } from "../context/UserContext";
import SearchBar from "./SearchBar";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";



function Header({ onSearch }) {
    const { user, setUser } = useContext(UserContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await axios.post('/logout');
        setUser(null);
        navigate('/');
    };

    // Get the first letter of the user's name for the profile icon
    const profileInitial = user?.name ? user.name.charAt(0).toUpperCase() : '';
    const showSearchBar = location.pathname === '/' || location.pathname === '/search';
    return (
        <div>
            <header className='flex justify-between items-center md:max-w-6xl mx-auto p-3'>

                <Link to="/" className="flex items-center gap-1 font-extrabold">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="url(#gradient)" // Apply the gradient to the SVG
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-8 sm:size-7"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"
                        />
                    </svg>
                    <span className="font-bold text-xl hidden sm:block bg-gradient-to-r from-[#5e2bff] via-[#5e2bff] to-[#5e2bff] text-transparent bg-clip-text">
                        StayNest
                    </span>

                    {/* Define the Gradient */}
                    <svg height="0" width="0">
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style={{ stopColor: "#5e2bff", stopOpacity: 1 }} />
                                <stop offset="100%" style={{ stopColor: "#5e2bff", stopOpacity: 1 }} />
                            </linearGradient>
                        </defs>
                    </svg>
                </Link>
                {showSearchBar && <SearchBar onSearch={onSearch} />}
                <Link to={!user && '/login'} className='relative '>
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="flex gap-2 items-center bg-white border border-gray-300 rounded-full py-2 px-4 "
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>

                        {!!user ? (
                            <div className='flex items-center justify-center w-8 h-8 bg-gray-900 text-white text-sm rounded-full'>
                                {profileInitial}
                            </div>
                        ) : (
                            <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-1">
                                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                                </svg>
                            </div>
                        )}
                        {!user && (
                            <div className='text-gray-500 hidden md:block'>Sign in</div>
                        )}

                    </button>
                    {menuOpen && user && (
                        <div className="absolute right-0 mt-2 bg-white border border-gray-200 w-44 rounded-lg shadow-lg">
                            <Link to="/account" className="block px-4 py-2 hover:bg-gray-50">Account</Link>
                            <Link to="/hosting" className="block px-4 py-2 hover:bg-gray-50">Manage Listing</Link>
                            <hr />
                            <button
                                onClick={handleLogout}
                                className="block  bg-white hover:bg-gray-50 font-bold w-full text-left px-4 py-2"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </Link>
            </header>
            <div className=' border border-gray-100 w-full mt-1'></div>
        </div>
    );
}

export default Header;


