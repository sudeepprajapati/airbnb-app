import { useState, createContext, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            axios.get('/profile')
                .then(({ data }) => {
                    setUser(data);
                    setReady(true);
                })
                .catch((error) => {
                    console.error("Error fetching profile:", error);
                    setReady(true); // Set ready to true even if there's an error
                });
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, loading, setUser, ready }}>
            {children}
        </UserContext.Provider>
    );
}