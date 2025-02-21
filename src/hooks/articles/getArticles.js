import axios from 'axios';
import { useEffect, useState } from 'react';
import { getUrl } from '../../../getUrl';

/*
    @returns {
        "id": number,
        "title": string,
        "content": string,
        "created_at": "2023-01-14T21:22:42.000Z",
        "lastname": string,
        "firstname": string,
        "category_title": "Tuto" | "Article"
    }
*/

export const useArticles = () => {
    const [articles, setArticles] = useState([]);

    const getArticles = async () => {
        try {
            const response = await axios.get(getUrl() + '/articles');
            setArticles(response.data);
        } catch (error) {
            console.error(error);
            throw new Error('Impossible de récupérer les articles');
        }
    }

    useEffect(() => {
        getArticles();
    }, []);

    return articles;
}