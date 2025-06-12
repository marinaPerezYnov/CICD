import React, { useState } from 'react';
import axios from 'axios';

function ConnectionPage() {
    const API_URL = 'http://localhost:8000/admin/login';

    const [form, setForm] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(API_URL, form);
            setMessage('Connexion réussie !');
            // Stocke le token si présent dans la réponse
            if (response.data.token) {
                localStorage.setItem('admin_token', response.data.token);
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.detail) {
                setMessage(error.response.data.detail);
            } else {
                setMessage("Erreur lors de la connexion.");
            }
        }
    };

    return (
        <div>
            <h2>Connexion Utilisateur</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email :</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Mot de passe :</label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Se connecter</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default ConnectionPage;