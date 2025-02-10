import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

// function Header() {
//     const { user } = useContext(UserContext);

//     // Get the first letter of the user's name for the profile icon
//     const profileInitial = user?.name ? user.name.charAt(0).toUpperCase() : '';

//     return (
//         <div>
//             <header className='flex justify-between items-center '>
//                 <Link to="/" className='flex items-center gap-1 text-primary font-extrabold' >
//                     {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 -rotate-90">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
//                     </svg> */}
//                 <svg xmlns="http://www.w3.org/2000/svg" height="32" width="28" viewBox="0 0 448 512"><path fill="#F5385D" d="M224 373.1c-25.2-31.7-40.1-59.4-45-83.2-22.6-88 112.6-88 90.1 0-5.5 24.3-20.3 52-45 83.2zm138.2 73.2c-42.1 18.3-83.7-10.9-119.3-50.5 103.9-130.1 46.1-200-18.9-200-54.9 0-85.2 46.5-73.3 100.5 6.9 29.2 25.2 62.4 54.4 99.5-32.5 36.1-60.6 52.7-85.2 54.9-50 7.4-89.1-41.1-71.3-91.1 15.1-39.2 111.7-231.2 115.9-241.6 15.8-30.1 25.6-57.4 59.4-57.4 32.3 0 43.4 25.9 60.4 59.9 36 70.6 89.4 177.5 114.8 239.1 13.2 33.1-1.4 71.3-37 86.6zm47-136.1C280.3 35.9 273.1 32 224 32c-45.5 0-64.9 31.7-84.7 72.8C33.2 317.1 22.9 347.2 22 349.8-3.2 419.1 48.7 480 111.6 480c21.7 0 60.6-6.1 112.4-62.4 58.7 63.8 101.3 62.4 112.4 62.4 62.9 .1 114.9-60.9 89.6-130.2 0-3.9-16.8-38.9-16.8-39.6z"/></svg>
//                     <span className='font-bold text-xl hidden sm:block'>airbnb</span>
//                 </Link>
//                 <div className='flex gap-2 items-center border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-200'>
//                     <div>Anywhere</div>
//                     <div className="border border-1 border-gray-300"></div>
//                     <div>Any week</div>
//                     <div className="border-l border-gray-300"></div>
//                     <div>Add guests</div>

//                     <button className='bg-primary text-white p-1.5 rounded-full'>
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
//                         </svg>
//                     </button>
//                 </div>
//                 <Link to={user ? '/account' : '/login'} className='flex gap-2 items-center border border-gray-300 rounded-full py-2 px-4 '>
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
//                     </svg>

//                     {!!user ? (
//                         <div className='flex items-center justify-center w-8 h-8 bg-gray-900 text-white text-sm rounded-full'>
//                             {profileInitial}
//                         </div>
//                     ) : (
//                         <div className='overflow-hidden'>
//                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
//                             </svg>
//                         </div>
//                     )

//                     }
//                     {!user && (
//                         <div className='text-gray-500'>Login</div>
//                     )}
//                 </Link>
//             </header>
//         </div>
//     );
// }

function Header() {
    const { user } = useContext(UserContext);

    // Get the first letter of the user's name for the profile icon
    const profileInitial = user?.name ? user.name.charAt(0).toUpperCase() : '';

    return (
        <div>
            <header className='flex justify-between items-center '>
                <Link to="/" className='flex items-center gap-1 text-primary font-extrabold' >
                    <svg xmlns="http://www.w3.org/2000/svg" height="32" width="28" viewBox="0 0 448 512"><path fill="#F5385D" d="M224 373.1c-25.2-31.7-40.1-59.4-45-83.2-22.6-88 112.6-88 90.1 0-5.5 24.3-20.3 52-45 83.2zm138.2 73.2c-42.1 18.3-83.7-10.9-119.3-50.5 103.9-130.1 46.1-200-18.9-200-54.9 0-85.2 46.5-73.3 100.5 6.9 29.2 25.2 62.4 54.4 99.5-32.5 36.1-60.6 52.7-85.2 54.9-50 7.4-89.1-41.1-71.3-91.1 15.1-39.2 111.7-231.2 115.9-241.6 15.8-30.1 25.6-57.4 59.4-57.4 32.3 0 43.4 25.9 60.4 59.9 36 70.6 89.4 177.5 114.8 239.1 13.2 33.1-1.4 71.3-37 86.6zm47-136.1C280.3 35.9 273.1 32 224 32c-45.5 0-64.9 31.7-84.7 72.8C33.2 317.1 22.9 347.2 22 349.8-3.2 419.1 48.7 480 111.6 480c21.7 0 60.6-6.1 112.4-62.4 58.7 63.8 101.3 62.4 112.4 62.4 62.9 .1 114.9-60.9 89.6-130.2 0-3.9-16.8-38.9-16.8-39.6z" /></svg>
                    <span className='font-bold text-xl hidden sm:block'>airbnb</span>
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
                    )

                    }
                    {!user && (
                        <div className='text-gray-500 hidden md:block'>Login</div>
                    )}
                </Link>
            </header>
        </div>
    );
}

export default Header;
