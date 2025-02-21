import { Routes, Route } from "react-router"
import { Home } from "../src/Pages/Home/Home"
import { LoginPage } from "../src/Pages/Login/Login"
import { RegisterPage } from "../src/Pages/Register/Register"
import { ArticlesPage } from "../src/Pages/Articles/ArticlesPage"
import { SingleArticlePage } from "../src/Pages/Article/SingleArticlePage"
import { CreateArticlePage } from "../src/Pages/CreateArticle/CreateArticlePage"

export const RoutesProvider = () => {
    return (
        <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/articles/create" element={<CreateArticlePage />} />
            <Route path="/article/:id" element={<SingleArticlePage />} />
            <Route path="/article/update/:id" element={<SingleArticlePage />} />
            <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
    )
}