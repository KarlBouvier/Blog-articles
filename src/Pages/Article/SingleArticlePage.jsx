import { useNavigate, useParams } from 'react-router';
import { useArticle } from '../../hooks/articles/getArticle';
import { useCategories } from '../../hooks/categories/getCategories';
import './SingleArticlePage.css';
import { useMemo } from 'react';
import { ArrowLeft } from 'lucide-react';

export const SingleArticlePage = () => {
    const { id } = useParams();
    const article = useArticle(id);
    const categories = useCategories();
    const navigate = useNavigate();

    const formattedDate = useMemo(() => {
        if (!article) return '';
        return new Date(article.created_at).toLocaleDateString()
    }, [article]);

    const categoryColor = useMemo(() => {
        if (!article || !categories) return '';
        const category = categories.find(category => category.title === article.category_title);
        return category ? category.color : '';
    }, [categories, article]);

    return (
        <div className='single-article-page'>
            <div className='back-button' onClick={() => navigate(-1)}>
                <ArrowLeft size={32} />
            </div>
            <div className='article'>
                <div className='article-header'>
                    <h1>{article?.title}</h1>
                    <p style={{color: categoryColor}}>{article?.category_title}</p>
                </div>
                <p>{article?.content}</p>
                <div className='article-footer'>
                    <p>Écris par : {article?.firstname} {article?.lastname}</p>
                    <p>Le {formattedDate}</p>
                </div>
            </div>
        </div>
    )
}