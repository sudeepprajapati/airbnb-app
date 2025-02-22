import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Header() {
    const { user } = useContext(UserContext);

    // Get the first letter of the user's name for the profile icon
    const profileInitial = user?.name ? user.name.charAt(0).toUpperCase() : '';

    return (
        <div>
            <header className='flex justify-between items-center '>
                <Link to="/" className='flex items-center gap-1 text-primary font-extrabold' >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
                    </svg>

                    <span className='font-bold text-xl hidden sm:block'>StayNest</span>
                </Link>
                <div className='flex gap-2 items-center border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-200'>
                    <div className='hidden sm:block'>Anywhere</div>
                    <div className="hidden sm:block border border-1 border-gray-300"></div>
                    <div className='hidden sm:block'>Any week</div>
                    <div className="hidden sm:block border-l border-gray-300"></div>
                    <div className='hidden sm:block'>Add guests</div>

                    <input type="text" placeholder="Search" className="block sm:hidden max-w-32 h-7 border-none focus:ring-transparent " />

                    <button className='bg-primary text-white p-1.5 rounded-full'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
                </div>
                <Link to={user ? '/account' : '/login'} className='flex gap-2 items-center border border-gray-300 rounded-full py-2 px-4 '>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>

                    {!!user ? (
                        <div className='flex items-center justify-center w-8 h-8 bg-gray-900 text-white text-sm rounded-full'>
                            {profileInitial}
                        </div>
                    ) : (
                        <div className='overflow-hidden'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                        </div>
                    )}
                    {!user && (
                        <div className='text-gray-500 hidden md:block'>Login</div>
                    )}
                </Link>
            </header>
        </div>
    );
}

export default Header;
