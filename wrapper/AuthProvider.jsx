import { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import axios from "axios";
import { getUrl } from "../getUrl";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser ] = useState();
    const [isUserLoading, setIsLoading] = useState(true);

    const userToken = localStorage.getItem('authToken');

    const getProfile = async () => {
        if (!userToken) {
            setIsLoading(false);
            return;
        }
        try {
            const response = await axios.get(getUrl() + '/profile', {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            setUser(response.data);
        } catch (error) {
            console.error(error);
            throw new Error('Impossible de récupérer le profil utilisateur');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getProfile();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, isUserLoading, userToken }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
}