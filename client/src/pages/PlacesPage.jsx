import { Link } from "react-router-dom";

import AccountNavigation from "../Components/AccountNavigation";

export default function PlacesPage() {
    return (
        <div>
            <AccountNavigation />
            <div className="text-center">
                <p>list of all places</p>
                <br />
                <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add New Place
                </Link>
            </div>
        </div>
    )

}