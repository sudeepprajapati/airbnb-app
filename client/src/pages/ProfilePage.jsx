import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { Navigate, redirect, useNavigate, useParams } from 'react-router-dom';
import PlacesPage from "./PlacesPage";
import AccountNavigation from "../Components/AccountNavigation";
import UserDetails from "./UserDetails";

export default function ProfilePage() {
    const { ready, user } = useContext(UserContext);

    let { subpage } = useParams()
    if (subpage === undefined) {
        subpage = 'profile';
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
                <UserDetails user={user} />
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
        </div>
    )
}
