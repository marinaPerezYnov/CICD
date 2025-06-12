import React, { useState } from 'react';
import axios from 'axios';

function RegisterPage() {
    const API_URL = 'http://localhost:8000/admin/register';
    const [form, setForm] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(API_URL, form);
            setMessage('Compte admin créé avec succès !');
            setForm({ email: '', password: '' });
            // Stocke le token si présent dans la réponse
            if (response.data.token) {
                localStorage.setItem('admin_token', response.data.token);
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.detail) {
                setMessage(error.response.data.detail);
            } else {
                setMessage("Erreur lors de la création du compte.");
            }
        }
    };

    return (
        <div>
            <h2>Créer un compte Admin</h2>
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
                <button type="submit">Créer le compte</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default RegisterPage;