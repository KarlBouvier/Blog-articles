import { useCallback, useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import './Register.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getUrl } from '../../../getUrl';
export const RegisterPage = () => {
    const navigate = useNavigate();
    const emailRef = useRef();
    const lastnameRef = useRef();
    const firstnameRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const registerHandler = useCallback(async () => {
        if (isLoading) return;
        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            setError('Les mots de passe ne correspondent pas');
            passwordRef.current.value = '';
            confirmPasswordRef.current.value = '';
            passwordRef.current.focus();
            return;
        }
        if (emailRef.current.value === '' || passwordRef.current.value === '' || lastnameRef.current.value === '' || firstnameRef.current.value === '') {
            setError('Veuillez remplir tous les champs');
            return;
        }
        setError('');
        try {
            setIsLoading(true);
            await axios.post(getUrl() + '/auth/register', {
                email: emailRef.current.value,
                password: passwordRef.current.value,
                lastname: lastnameRef.current.value,
                firstname: firstnameRef.current.value
            });
            toast.success('Inscription réussie ✅, veuillez vous connecter');
            navigate('/login');
        } catch (error) {
            toast.error('Erreur lors de l\'inscription');
            setError(error.response.data.message);
        } finally {
            setIsLoading(false);
        }

    }, [isLoading, navigate]);

    useEffect(() => {
        firstnameRef.current.focus();
    }, []);

    return (
        <div className="register">
            <div className="registerCard">
                <div className='registerCardForm'>
                    <div className='registerCardFormInput'>
                        <label>Prénom: </label>
                        <input ref={firstnameRef} type="text" placeholder="Prénom" />
                    </div>
                    <div className='registerCardFormInput'>
                        <label>Nom: </label>
                        <input ref={lastnameRef} type="text" placeholder="Nom" />
                    </div>
                    <div className='registerCardFormInput'>
                        <label>Email: </label>
                        <input ref={emailRef} type="email" placeholder="Email" />
                    </div>
                    <div className='registerCardFormInput'>
                        <label>Mot de passe: </label>
                        <input ref={passwordRef} type="password" placeholder="Mot de passe" />
                    </div>
                    <div className='registerCardFormInput'>

                        <label>Confirmer le mot de passe: </label>
                        <input ref={confirmPasswordRef} type="password" placeholder="Confirmer le mot de passe" />
                    </div>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                </div>
                <button onClick={registerHandler}>{isLoading ? "Chargement..." : "S'inscrire"}</button>
            </div>
            <div style={{ textAlign: 'center' }}>
                <p>Vous avez déjà un compte ?</p>
                <Link to="/login">Se connecter</Link>
            </div>
        </div>
    )
}