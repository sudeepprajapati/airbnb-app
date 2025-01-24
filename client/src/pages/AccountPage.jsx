import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { Link, Navigate, redirect, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

export default function AccountPage() {
    const { ready, user, setUser } = useContext(UserContext);

    let { subpage } = useParams()
    if (subpage === undefined) {
        subpage = 'profile';
    }
    const navigate = useNavigate();
    async function logout() {
        await axios.post('/logout')
        navigate('/'); // Redirect to home page on successful login
        setUser(null);
    }

    if (!ready) {
        return 'Loading...';
    }

    if (ready && !user && !redirect) {
        return <Navigate to="/login" />
    }

    function linkClasses(type = null) {
        let classes = 'py-2 px-6'
        if (type === subpage) {
            classes += '  bg-primary text-white rounded-full'
        }
        return classes;
    }

    return (
        <div>
            <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
                <Link className={linkClasses('profile')} to={'/account'}>My profile</Link>
                <Link className={linkClasses('bookings')} to={'/account/bookings'}>My bookings</Link>
                <Link className={linkClasses('places')} to={'/account/places'}>My accommondations</Link>
            </nav>

            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.name} ({user.email}) <br />
                    <button onClick={logout} className="primary max-w-md mt-2">Logout</button>
                </div>
            )}
        </div>
    )
}
