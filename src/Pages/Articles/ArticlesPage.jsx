import { toast } from 'react-toastify';
import { ArticleCard } from '../../components/Articles/ArticleCard/ArticleCard';
import { useArticles } from '../../hooks/articles/getArticles';
import { useCategories } from '../../hooks/categories/getCategories';
import { useNavigate, useSearchParams } from 'react-router';
import './ArticlesPage.css';
import { Search, X } from 'lucide-react';
import { useCallback, useMemo, useRef } from 'react';
import { useAuth } from '../../../wrapper/AuthProvider';

export const ArticlesPage = () => {
    const articles = useArticles();
    const categories = useCategories();
    const { user } = useAuth();
    const navigate = useNavigate();
    const searchRef = useRef('');
    const [searchParams, setSearchParams] = useSearchParams();

    const handleUpdateSearch = useCallback((newParams) => {
        const currentParams = Object.fromEntries([...searchParams]);
        const updatedParams = { ...currentParams, ...newParams };

        Object.keys(updatedParams).forEach(key => {
            if (!updatedParams[key]) {
                delete updatedParams[key];
            }
        });

        setSearchParams(updatedParams);
    }, [searchParams, setSearchParams]);

    const handleSearch = useCallback((e) => {
        const query = e.target.value;
        handleUpdateSearch({ query });
    }, [handleUpdateSearch]);

    const handleCategory = useCallback((e) => {
        const category = e.target.value;
        handleUpdateSearch({ category });
    }, [handleUpdateSearch]);

    const handleNavCreateArticle = () => {
        if (!user) {
            toast.error('Vous devez être connecté pour créer un article');
            navigate('/login');
            return;
        }
        navigate('/articles/create');
    };

    const articlesFiltered = useMemo(() => {
        const query = searchParams.get('query');
        const category = searchParams.get('category');

        return articles.filter(article => {
            if (query && !article.title.toLowerCase().includes(query.toLowerCase())) {
                return false;
            }

            if (category && (!article.category_title || article.category_title !== category)) {
                return false;
            }

            return true;
        });
    }, [articles, searchParams]);

    const handleClearSearch = useCallback(() => {
        searchRef.current.value = '';
        handleUpdateSearch({ query: '' });
    }, [handleUpdateSearch]);

    return (
        <div className='articles'>
            <div className='articles-header'>
                <h1>Articles</h1>
                <div className='articles-header-actions'>
                    <div>
                        <select className='select-category' onChange={handleCategory}>
                            <option value=''>Toutes les catégories</option>
                            {categories.map(category => (
                                <option className='select-category-option' key={category.id} value={category.title}>{category.title}</option>
                            ))}
                        </select>
                    </div>
                    <div className='search'>
                        <Search />
                        <input ref={searchRef} className='search-bar' type='text' placeholder='Rechercher un article' onChange={handleSearch} />
                        {searchRef.current.value && <X className='clear' size={16} onClick={handleClearSearch} />}
                    </div>
                    <button onClick={handleNavCreateArticle}>Créer un article</button>
                </div>
            </div>
            <div className='articles-list'>
                {
                    !articlesFiltered ? <p style={{ backgroundColor: "red"}}>Loading...</p> :
                        articlesFiltered.length === 0 ? (
                            <div>
                                <p>Désolé ! Aucun article ne correspond à votre recherche ! Vous finirez bien par trouver votre bonheur ! 🎉</p>
                            </div>
                        ) :
                            (
                                articlesFiltered.map(article => (
                                    <ArticleCard key={article.id} article={article} categories={categories} />
                                ))
                            )
                }
            </div>
        </div>
    )
}