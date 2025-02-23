import { useMemo } from "react";
import { Hero } from "../../components/Hero/Hero";
import { useArticles } from "../../hooks/articles/getArticles";
import "./Home.css";
import { ArticleCard } from "../../components/Articles/ArticleCard/ArticleCard";
import { useCategories } from '../../hooks/categories/getCategories';

export const Home = () => {
    const articles = useArticles();
    const categories = useCategories();

    const last3Articles = useMemo(() => {
        return articles.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 3);
    }, [articles]);
    return (
        <div className="home">
            {/* <h1>Home</h1>
            <p>Welcome to the Home page!</p> */}
            <div className="hero-container">
                <Hero />
            </div>
            <div>
                <h2 className="home-title">Les derniers articles 👇</h2>
                <div className="articles-container">
                    {last3Articles.map((article) => (
                        <ArticleCard key={article.id} article={article} categories={categories} />
                    ))}
                </div>
            </div>
        </div>
    )
}