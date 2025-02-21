import { NavLink, useNavigate } from "react-router"
import "./Header.css"
import { useCallback } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../../wrapper/AuthProvider";

export const Header = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = useCallback(() => {
        localStorage.removeItem('authToken');
        toast.success('Déconnexion réussie, à bientôt 👋🏻 !');
        navigate('/');
        window.location.reload();
    }, [navigate]);

    return (
        <header className="header">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/articles">Articles</NavLink>
            <div className="auth">
                {!user ? (
                    <>
                        <NavLink to="/login">Login</NavLink>
                        <NavLink to="/register">Register</NavLink>
                    </>
                ) : (
                    <button onClick={handleLogout}>Logout</button>
                )}
            </div>
        </header>
    )
}