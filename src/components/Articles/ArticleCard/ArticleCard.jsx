import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import './ArticleCard.css';
import { useCallback, useMemo } from 'react';
import { Pencil, Share, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from "../../../../wrapper/AuthProvider";

export const ArticleCard = ({ article, categories }) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const categoryColor = useMemo(() => {
        if (!categories || !article.category_title) return "#59b4b5";
        const category = categories.find(category => category.title === article.category_title);
        return category ? category.color : "#59b4b5";
    }, [categories, article.category_title]);
    const formattedDate = useMemo(() => new Date(article.created_at).toLocaleDateString(), [article.created_at]);

    const isUserArticle = useMemo(() => {
        const userFullName = `${user?.firstname} ${user?.lastname}`;
        const articleAuthor = `${article.firstname} ${article.lastname}`;
        return user && userFullName === articleAuthor;
    }, [user, article]);

    const handleChooseArticle = useCallback(() => {
        navigate(`/article/${article.id}`);
    }, [navigate, article.id]);

    const handleDeleteArticle = useCallback((e) => {
        // Delete article
        e.stopPropagation();
        console.log('Delete article');
    }, []);

    const handleUpdateArticle = useCallback((e) => {
        e.stopPropagation();
        navigate(`/article/update/${article.id}`);
    }, [ navigate, article.id]);

    const handleShareArticle = useCallback((e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(`localhost:5173/article/${article.id}`);
        toast.info('Lien de l\'article copié dans le presse-papier 🔗✅');
    }, [article.id]);

    return (
        <div className='article-card' onClick={handleChooseArticle}>
            <div className='article-card-header'>
                <h2>{article.title}</h2>
                <p style={{ backgroundColor: categoryColor ?? "#59b4b5" }} className='article-card-category'>{article.category_title}</p>
            </div>
            <p className='article-card-content'>{article.content}</p>
            <div className='article-card-footer'>
                <div>
                    <p className='article-card-name'>{article.lastname} {article.firstname}</p>
                    <p className='article-card-date'>{formattedDate}</p>
                </div>
                <div className='article-card-actions'>
                    {isUserArticle && (
                        <>
                            <Trash2 size={16} onClick={handleDeleteArticle} />
                            <Pencil size={16} onClick={handleUpdateArticle} />
                        </>
                    )
                    }
                    <Share size={16} onClick={handleShareArticle} />
                </div>
            </div>
        </div>
    )
}

ArticleCard.propTypes = {
    article: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        created_at: PropTypes.string.isRequired,
        lastname: PropTypes.string.isRequired,
        firstname: PropTypes.string.isRequired,
        category_title: PropTypes.string.isRequired,
    }).isRequired,
    categories: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
    })).isRequired,
};