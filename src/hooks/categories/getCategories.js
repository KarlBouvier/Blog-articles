import { useState, useEffect } from 'react';
import axios from 'axios';
import { getUrl } from '../../../getUrl';

/*
    @return {
        "id": number,
        "title": "Tuto",
        "color": "#9D174D"
    }[]
*/

export const useCategories = () => {
    const [categories, setCategories] = useState([]);

    const getCategories = async () => {
        try {
            const response = await axios.get(getUrl() + '/categories');
            setCategories(response.data);
        } catch (error) {
            console.error(error);
            throw new Error('Impossible de récupérer les catégories');
        }
    }

    useEffect(() => {
        getCategories();
    }, []);

    return categories;
}