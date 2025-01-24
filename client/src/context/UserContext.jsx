import axios from "axios";
import { useState, createContext, useEffect } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);

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
        <UserContext.Provider value={{ user, setUser, ready }}>
            {children}
        </UserContext.Provider>
    );
}