import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { Link, Navigate, redirect, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNavigation from "../Components/AccountNavigation";

export default function ProfilePage() {
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


    return (
        <div>
            <AccountNavigation />

            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.name} ({user.email}) <br />
                    <button onClick={logout} className="primary max-w-md mt-2">Logout</button>
                </div>
            )}

            {
                subpage === 'places' && (
                    <div>
                        {/* <h1 className="text-2xl font-bold ml-16">Welcome, {user.name}!</h1> */}
                        <div className="text-center max-w-3xl mx-auto">
                            <PlacesPage />
                        </div>
                    </div>
                )
            }

            {
                subpage === 'bookings' && (
                    <div className="text-center max-w-lg mx-auto">
                        Bookings
                    </div>
                )
            }
        </div>
    )
}
