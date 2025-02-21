import { useEffect, useState } from "react";
import axios from 'axios';
import { getUrl } from '../../../getUrl';

export const useArticle = (id) => {
    const [article, setArticle] = useState(null);

    const getArticle = async () => {
        try {
            const response = await axios.get(getUrl() + '/articles/' + id);
            setArticle(response.data);
        } catch (error) {
            console.error(error);
            throw new Error('Impossible de récupérer l\'article');
        }
    }

    useEffect(() => {
        getArticle();
    }, []);

    return article;
}