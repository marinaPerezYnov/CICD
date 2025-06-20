import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Button, 
  List, 
  ListItem, 
  Checkbox, 
  Alert,
  Grid,
  Collapse,
  IconButton
} from '@mui/material';

function AdminPage() {
    const API_URL = 'http://localhost:8000/admin';
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [expandedUsers, setExpandedUsers] = useState({});

    // Récupère le token du localStorage
    const token = localStorage.getItem('admin_token');
    console.log("Token:", token);
    const toggleUserExpand = (userId) => {
        setExpandedUsers(prev => ({
            ...prev,
            [userId]: !prev[userId]
        }));
    };

    const fetchUsers = useCallback(() => {
        axios.get(`${API_URL}/users`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                setUsers(res.data);
            })
            .catch(error => {
                console.error("Erreur lors du chargement des utilisateurs:", error);
                setMessage("Erreur lors du chargement des utilisateurs");
                setSuccess(false);
            });
    }, [token, API_URL]);

    useEffect(() => {
        console.log("Token dans useEffect : ", token);
        console.log("isAdmin dans useEffect : ", isAdmin);

        if (!token) {
            setIsAdmin(false);
            return;
        }

        // Vérifier si l'utilisateur courant est admin
        axios.get(`${API_URL}/me`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                console.log("Admin status response:", res.data);
                setIsAdmin(res.data.isAdmin);
                // Si admin, charger la liste des utilisateurs
                if (res.data.isAdmin) {
                    fetchUsers();
                }
            })
            .catch(() => {
                setIsAdmin(false);
                setMessage("Vous n'êtes pas autorisé à accéder à cette page");
                setSuccess(false);
            });
    }, [token, API_URL, isAdmin, fetchUsers]);

    const handleSelect = (userId) => {
        setSelectedUsers(prev =>
            prev.includes(userId)
                ? prev.filter(id => id !== userId)
                : [...prev, userId]
        );
    };

    const handleDelete = () => {
        if (!window.confirm('Confirmer la suppression des utilisateurs sélectionnés ?')) return;
        
        axios.delete(`${API_URL}/users`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            data: { ids: selectedUsers },
        })
            .then(() => {
                setUsers(users.filter(u => !selectedUsers.includes(u.id)));
                setSelectedUsers([]);
                setMessage("Utilisateurs supprimés avec succès");
                setSuccess(true);
            })
            .catch(error => {
                console.error("Erreur lors de la suppression:", error);
                setMessage("Erreur lors de la suppression des utilisateurs");
                setSuccess(false);
            });
    };

    if (!token) {
        return (
            <Container maxWidth="sm" sx={{ mt: 8 }}>
                <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
                    <Typography variant="h5" color="error">
                        Accès refusé
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 2 }}>
                        Vous devez vous connecter pour accéder à cette page
                    </Typography>
                </Paper>
            </Container>
        );
    }

    if (!isAdmin) {
        return (
            <Container maxWidth="sm" sx={{ mt: 8 }}>
                <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
                    <Typography variant="h5" color="error">
                        Accès refusé
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 2 }}>
                        Vous devez être administrateur pour accéder à cette page
                    </Typography>
                </Paper>
            </Container>
        );
    }

    return (
        <Container sx={{
            marginTop: '30px',
            padding: '20px'
        }}>
            <Paper elevation={3} sx={{ p: 4, backgroundColor: '#f8f8f8' }}>
                <Typography variant="h4" component="h1" gutterBottom sx={{
                    marginBottom: '20px',
                    padding: '2% 5%',
                    color: '#c01515',
                    borderBottom: '2px solid #c01515'
                }}>
                    Gestion des utilisateurs
                </Typography>

                {message && (
                    <Alert 
                        severity={success ? "success" : "error"} 
                        sx={{ mb: 3 }}
                        onClose={() => setMessage('')}
                    >
                        {message}
                    </Alert>
                )}

                <Box sx={{ mb: 3 }}>
                    <Button 
                        variant="contained" 
                        color="error"
                        onClick={handleDelete} 
                        disabled={selectedUsers.length === 0}
                        sx={{ 
                            bgcolor: '#c01515', 
                            '&:hover': {
                                bgcolor: '#a01010',
                            }
                        }}
                    >
                        🗑️ Supprimer ({selectedUsers.length})
                    </Button>
                </Box>

                <Typography variant="body2" sx={{ mb: 2 }}>
                    {users.length} utilisateur(s) enregistré(s)
                </Typography>

                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <Paper 
                                key={user.id} 
                                elevation={1} 
                                sx={{ 
                                    mb: 2, 
                                    overflow: 'hidden',
                                    transition: 'all 0.3s',
                                    '&:hover': {
                                        boxShadow: 3
                                    }
                                }}
                            >
                                <ListItem 
                                    sx={{
                                        p: 2,
                                        borderBottom: expandedUsers[user.id] ? '1px solid #eee' : 'none'
                                    }}
                                >
                                    <Grid container alignItems="center" spacing={2}>
                                        <Grid item xs={1}>
                                            <Checkbox
                                                checked={selectedUsers.includes(user.id)}
                                                onChange={() => handleSelect(user.id)}
                                                inputProps={{ 'aria-label': 'select user' }}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography variant="subtitle1">
                                                {user.name || user.nom}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography variant="body2">
                                                {user.email}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography variant="body2" color="textSecondary">
                                                ID: {user.id}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <IconButton
                                                onClick={() => toggleUserExpand(user.id)}
                                                size="small"
                                            >
                                                {expandedUsers[user.id] ? '▲' : '▼'}
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                
                                <Collapse in={expandedUsers[user.id]} timeout="auto" unmountOnExit>
                                    <Box sx={{ p: 3, bgcolor: '#f9f9f9' }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <Typography variant="body2">
                                                    <strong>Nom:</strong> {user.nom || user.name}
                                                </Typography>
                                                <Typography variant="body2">
                                                    <strong>Prénom:</strong> {user.prenom}
                                                </Typography>
                                                <Typography variant="body2">
                                                    <strong>Date de naissance:</strong> {user.date_naissance}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography variant="body2">
                                                    <strong>Email:</strong> {user.email}
                                                </Typography>
                                                <Typography variant="body2">
                                                    <strong>Pays:</strong> {user.pays}
                                                </Typography>
                                                <Typography variant="body2">
                                                    <strong>Ville:</strong> {user.ville}
                                                </Typography>
                                                <Typography variant="body2">
                                                    <strong>Code postal:</strong> {user.code_postal}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Collapse>
                            </Paper>
                        ))
                    ) : (
                        <Paper sx={{ p: 3, textAlign: 'center' }}>
                            <Typography variant="body1">
                                Aucun utilisateur trouvé
                            </Typography>
                        </Paper>
                    )}
                </List>
            </Paper>
        </Container>
    );
}

export default AdminPage;