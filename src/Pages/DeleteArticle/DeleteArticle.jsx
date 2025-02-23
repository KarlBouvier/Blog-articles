import { useNavigate, useParams } from "react-router";
import { useArticle } from "../../hooks/articles/getArticle";
import { useAuth } from "../../../wrapper/AuthProvider";
import { toast } from "react-toastify";
import './DeleteArticle.css';
import { useCallback, useState } from "react";
import axios from "axios";
import { getUrl } from "../../../getUrl";
import { ArrowLeft } from "lucide-react";

export const DeleteArticle = () => {
    const { id } = useParams();
    const { user, isUserLoading, userToken } = useAuth();
    const navigate = useNavigate();
    const article = useArticle(id);
    const [isLoading, setIsLoading] = useState(false);
    const [isCheck, setIsCheck] = useState(false);

    const handleDelete = useCallback( async () => {
        if (isLoading) return;
        if (!isCheck) {
            toast.error('Vous devez cocher la case pour supprimer l\'article');
            return;
        }
        try {
            setIsLoading(true);
            await axios.delete(getUrl() + `/articles/${id}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            }
            );
            toast.success('Article supprimé avec succès');
            navigate('/articles');
        } catch (error) {
            toast.error('Erreur lors de la suppression de l\'article');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, [isLoading, isCheck, userToken, navigate, id]);

    if (!user && !isUserLoading) {
        navigate('/login');
        toast.error('Vous devez être connecté pour supprimer un article');
        return null;
    }
    if (!article) {
        return <div>Loading...</div>
    }
    const userFullName = user.firstname + ' ' + user.lastname;
    const articleAuthor = article.firstname + ' ' + article.lastname;

    if (userFullName !== articleAuthor) {
        navigate(`/article/${id}`);
    }

    return (
        <div className="delete-article">
            <div className="delete-article-card">
                <div className="delete-article-header">
                    <ArrowLeft className="back" size={16} onClick={() => navigate(-1)} />
                    <h2 className="warning-title">Suppression de l'article</h2>
                </div>
                <p>Êtes-vous sûr de vouloir supprimer cet article ?</p>
                <div className="delete-article-infos">
                    <div className="delete-article-infos-item">
                        <p className="delete-article-infos-item-label">Titre:</p>
                        <p>{article.title}</p>
                    </div>
                    <div className="delete-article-infos-item">
                        <p className="delete-article-infos-item-label">Contenu:</p>
                        <p className="delete-article-infos-item-content">{article.content}</p>
                    </div>
                    <div className="delete-article-infos-item">
                        <p className="delete-article-infos-item-label">Catégorie:</p>
                        <p>{article.category_title}</p>
                    </div>
                </div>
                <div className="delete-article-checkbox">    
                    <input type="checkbox" onChange={(e) => setIsCheck(e.target.checked)} />
                    <label>Je suis sûr de vouloir supprimer cet article</label>
                </div>
                <button onClick={handleDelete} disabled={!isCheck}>{isLoading ? "Chargement..." : "Supprimer 🗑️"}</button>
            </div>
        </div>
    )
}