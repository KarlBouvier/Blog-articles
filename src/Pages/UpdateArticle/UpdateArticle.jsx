import "./UpdateArticle.css";
import { useArticle } from "../../hooks/articles/getArticle";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../../../wrapper/AuthProvider";
import { useEffect, useState, useRef, useCallback } from "react";
import { useCategories } from "../../hooks/categories/getCategories";
import { toast } from "react-toastify";
import axios from "axios";
import { getUrl } from "../../../getUrl";

export const UpdateArticle = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user, isUserLoading, userToken } = useAuth();
    const article = useArticle(id);
    const categories = useCategories();
    const titleRef = useRef();
    const contentRef = useRef();
    const [categoryId, setCategoryId] = useState();

    useEffect(() => {
        if (!article) return;
        if (!categories) return;
        titleRef.current.value = article.title;
        contentRef.current.value = article.content;
        const categoryId = categories.find(category => category.title === article.category_title).id;
        setCategoryId(categoryId);
    }, [article, categories]);

    const handleUpdateArticle = useCallback( async () => {
        if (!titleRef.current.value || !contentRef.current.value) {
            toast.error('Veuillez remplir tous les champs ❌');
            return;
        }
        const title = titleRef.current.value;
        const content = contentRef.current.value;
        const category_id = categoryId;
        try {
            await axios.put(getUrl() + '/articles/' + id, {
                title,
                content,
                category_id,
            }, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            }
            );
            toast.success('Article modifié avec succès ✅📝');
            navigate(`/article/${id}`);
        } catch (error) {
            console.error(error);
            toast.error('Impossible de modifier l\'article');
        }
    }, [titleRef, contentRef, categoryId, navigate, id, userToken]);

    if(!user && !isUserLoading) {
        navigate('/login');
    } else if (!article || !categories) {
        return <div>Loading...</div>
    }

    const userFullName = user.firstname + ' ' + user.lastname;
    const articleAuthor = article.firstname + ' ' + article.lastname;

    if (userFullName !== articleAuthor) {
        navigate(`/article/${id}`);
    }

    return (
        <div className='update-article'>
            <div className='update-article-card'>
                <h2>Update article</h2>
                <div className='update-article-card-content'>
                    <label>Title</label>
                    <input className='article-input' ref={titleRef} type='text' placeholder='Title' />
                </div>
                <div className='update-article-card-content'>
                    <label>Content</label>
                    <textarea className='article-textarea' ref={contentRef} />
                </div>
                <div className='update-article-card-content'>
                    <label>Catégorie</label>
                    <select className='article-input' onChange={(e) => setCategoryId(e.target.value)}>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.title}</option>
                        ))}
                    </select>
                </div>
                <button onClick={handleUpdateArticle}>Modifier l'article</button>
            </div>
        </div>
    )
}