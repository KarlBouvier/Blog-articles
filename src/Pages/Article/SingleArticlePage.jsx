import { useNavigate, useParams } from 'react-router';
import { useArticle } from '../../hooks/articles/getArticle';
import { useCategories } from '../../hooks/categories/getCategories';
import './SingleArticlePage.css';
import { useMemo, useCallback } from 'react';
import { ArrowLeft, Pencil, Share, Trash2 } from 'lucide-react';
import { useAuth } from '../../../wrapper/AuthProvider';
import { toast } from 'react-toastify';

export const SingleArticlePage = () => {
    const { id } = useParams();
    const { user } = useAuth();
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

    const isUserAuthor = useMemo(() => {
        const userFullName = `${user?.firstname} ${user?.lastname}`;
        const articleAuthor = `${article?.firstname} ${article?.lastname}`;
        return userFullName === articleAuthor;
    }, [user, article]);

    const handleDeleteArticle = useCallback((e) => {
        e.stopPropagation();
        navigate(`/article/delete/${id}`);
    }, [ navigate, id]);

    const handleUpdateArticle = useCallback((e) => {
        e.stopPropagation();
        navigate(`/article/update/${id}`);
    }, [ navigate, id]);

    const handleShareArticle = useCallback((e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(`localhost:5173/article/${id}`);
        toast.info('Lien de l\'article copié dans le presse-papier 🔗✅');
    }, [id]);

    return (
        <div className='single-article-page'>
            <div className='buttons'>
                <div className='back-button' onClick={() => navigate(-1)}>
                    <ArrowLeft size={32} />
                </div>
                <div className='buttons-actions'>
                    <Share onClick={handleShareArticle} color='#5274fa' className='button-action' size={16} />
                    {isUserAuthor && (
                        <>
                            <Pencil onClick={handleUpdateArticle} color='orange' className='button-action' size={16} />
                            <Trash2 onClick={handleDeleteArticle} color='#fa3c3c' className='button-action' size={16} />
                        </>
                    )}
                </div>

            </div>
            <div className='article'>
                <div className='article-header'>
                    <h1>{article?.title}</h1>
                    <p style={{ color: categoryColor }}>{article?.category_title}</p>
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