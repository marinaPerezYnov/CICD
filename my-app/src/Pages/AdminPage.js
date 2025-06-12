import React, { useEffect, useState } from 'react';

const API_URL = 'http://localhost:8000/admin';

function AdminPage() {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    // Récupère le token du localStorage
    const token = localStorage.getItem('admin_token');

    useEffect(() => {
        if (!token) {
            setIsAdmin(false);
            return;
        }

        // Vérifier si l'utilisateur courant est admin
        fetch(`${API_URL}/me`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => setIsAdmin(data.isAdmin))
            .catch(() => setIsAdmin(false));

        // Charger la liste des utilisateurs
        fetch(`${API_URL}/users`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(() => setUsers([]));
    }, [token]);

    const handleSelect = (userId) => {
        setSelectedUsers(prev =>
            prev.includes(userId)
                ? prev.filter(id => id !== userId)
                : [...prev, userId]
        );
    };

    const handleDelete = () => {
        if (!window.confirm('Confirmer la suppression des utilisateurs sélectionnés ?')) return;
        fetch(`${API_URL}/users`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ ids: selectedUsers }),
        })
            .then(res => {
                if (res.ok) {
                    setUsers(users.filter(u => !selectedUsers.includes(u.id)));
                    setSelectedUsers([]);
                }
            });
    };

    if (!token || !isAdmin) {
        return <div>Accès refusé. Vous devez être administrateur.</div>;
    }

    return (
        <div>
            <h2>Liste des utilisateurs</h2>
            <button onClick={handleDelete} disabled={selectedUsers.length === 0}>
                Supprimer sélectionnés
            </button>
            <table>
                <thead>
                    <tr>
                        <th>Sélectionner</th>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedUsers.includes(user.id)}
                                    onChange={() => handleSelect(user.id)}
                                />
                            </td>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminPage;