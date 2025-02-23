import { Link } from "react-router";
import "./Hero.css";

export const Hero = () => {
    return (
        <div className="hero">
            <h1>Blog</h1>
            <div className="hero-content">
                <p>Que vous soyez créatif, curieux ou passionné, cet espace est le vôtre.
                    Partagez vos expériences, vos réflexions et vos découvertes avec le monde entier,
                    et inspirez ceux qui vous lisent.</p>
                <Link to="/articles" className="link-button">Découvrir les articles !</Link>
            </div>
        </div>
    );
}