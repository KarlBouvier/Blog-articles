import React, { useCallback } from 'react';
import { useCategories } from '../../hooks/categories/getCategories';
import { useNavigate } from 'react-router';
import "./CreateArticlePage.css";
import { useAuth } from '../../../wrapper/AuthProvider';
import axios from 'axios';
import { getUrl } from '../../../getUrl';
import { toast } from 'react-toastify';

export const CreateArticlePage = () => {
    const { user, isUserLoading, userToken } = useAuth();
    const categories = useCategories();
    const navigate = useNavigate();
    const titleRef = React.useRef();
    const contentRef = React.useRef();
    const [categoryId, setCategoryId] = React.useState();


    if (!user && !isUserLoading) {
        navigate('/login');
    }

    const handleCreateArticle = useCallback(async () => {
        if (!titleRef.current.value) {
            toast.error('Veuillez remplir tous les champs ❌');
            titleRef.current.focus();
            return;
        }
        if (!contentRef.current.value) {
            toast.error('Veuillez remplir tous les champs ❌');
            contentRef.current.focus();
            return
        }
        try {
            await axios.post(getUrl() + '/articles', {
                title: titleRef.current.value,
                content: contentRef.current.value,
                category_id: categoryId || categories[0]?.id,
                user_id: user.id,
            }, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            toast.success('Article créé avec succès ✅📝');
            const response = await axios.get(getUrl() + '/articles');
            const articleId = response.data.find(article => article.title === titleRef.current.value).id;
            navigate(`/article/${articleId}`);
        } catch (error) {
            console.error(error);
            toast.error('Impossible de créer l\'article');
        }
    }, [titleRef, contentRef, categoryId, user, userToken, navigate, categories]);

    return (
        <div className='create-article'>
            <div className='create-article-card'>
                <h2>Create article</h2>
                <div className='create-article-card-content'>
                    <label>Title</label>
                    <input className='article-input' ref={titleRef} type='text' placeholder='Title' />
                </div>
                <div className='create-article-card-content'>
                    <label>Content</label>
                    <textarea className='article-textarea' ref={contentRef} placeholder="Contenue de l'article 📝" />
                </div>
                <div className='create-article-card-content'>
                    <label>Catégorie</label>
                    <select className='article-input' defaultValue={categories[0]?.id} onChange={(e) => setCategoryId(e.target.value)}>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.title}</option>
                        ))}
                    </select>
                </div>
                <button onClick={handleCreateArticle}>Créer l'article</button>
            </div>
        </div>
    )
}