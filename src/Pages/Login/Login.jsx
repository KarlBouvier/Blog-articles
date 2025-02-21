import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { useCallback, useRef, useState } from "react";
import "./Login.css";
import { getUrl } from "../../../getUrl";

export const LoginPage = () => {
    const navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = useCallback(async () => {
        if (isLoading) return;
        if (emailRef.current.value === '') {
            setError("l'email est requis");
            emailRef.current.focus();
            return;
        }
        if (passwordRef.current.value === '') {
            setError("le mot de passe est requis");
            passwordRef.current.focus();
            return;
        }
        setError('');
        try {
            setIsLoading(true);
            const response = await axios.post(getUrl() + '/auth/login', {
                email: emailRef.current.value,
                password: passwordRef.current.value
            });
            localStorage.setItem('authToken', response.data.token);
            toast.success('Connexion réussie 🎉');
            navigate('/');
        } catch (error) {
            toast.error('Erreur lors de la connexion');
            setError(error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    }, [isLoading, navigate]);

    return (
        <div className="login">
            <div className="loginCard">
                <div className='loginCardForm'>
                    <div className='loginCardFormInput'>
                        <label>Email: </label>
                        <input ref={emailRef} type="text" placeholder="Email" />
                    </div>
                    <div className='loginCardFormInput'>
                        <label>Mot de passe: </label>
                        <input ref={passwordRef} type="password" placeholder="Mot de passe" />
                    </div>
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    <div>
                        <button onClick={handleLogin}>Connexion</button>
                    </div>
                </div>
            </div>
            
        </div>
    )
}