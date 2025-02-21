import axios from "axios";
import { useEffect, useState } from "react"
import { getUrl } from "../../getUrl";

export const useProfile = () => {
    const [ data, setData ] = useState(null);

    const getProfile = async () => {
        const token = localStorage.getItem('authToken');
        try {
            const response = await axios.get(getUrl() + '/profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setData(response.data);
        }
        catch (error) {
            console.error(error);
            throw new Error('Impossible de récupérer le profil utilisateur');
        }
    }

    useEffect(() => {
        getProfile();
    }, []);

    return data;
}