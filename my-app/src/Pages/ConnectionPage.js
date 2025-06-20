import React, { useState } from 'react';
import axios from 'axios';
import { 
  Container, 
  Typography, 
  Box, 
  TextField, 
  Button, 
  FormControl, 
  InputLabel,
  FilledInput,
  InputAdornment,
  IconButton,
  Paper,
  Alert
} from '@mui/material';

function ConnectionPage() {
    const API_URL = 'http://localhost:8000/admin/login';

    const [form, setForm] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(API_URL, form);
            setSuccess(true);
            setMessage('Connexion réussie !');
            if (response.data.token) {
                localStorage.setItem('admin_token', response.data.token);
            }
        } catch (error) {
            setSuccess(false);
            if (error.response && error.response.data && error.response.data.detail) {
                setMessage(error.response.data.detail);
            } else {
                setMessage("Erreur lors de la connexion.");
            }
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    Connexion Administrateur
                </Typography>
                
                {message && (
                    <Alert 
                        severity={success ? "success" : "error"} 
                        sx={{ mb: 2 }}
                    >
                        {message}
                    </Alert>
                )}
                
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <FormControl fullWidth margin="normal" variant="filled">
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            variant="filled"
                            fullWidth
                        />
                    </FormControl>
                    
                    <FormControl fullWidth margin="normal" variant="filled">
                        <InputLabel htmlFor="password">Mot de passe</InputLabel>
                        <FilledInput
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={form.password}
                            onChange={handleChange}
                            required
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {/* Remplacer par du texte simple */}
                                        {showPassword ? "Masquer" : "Afficher"}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    
                    <Button 
                        type="submit" 
                        fullWidth 
                        variant="contained" 
                        sx={{ 
                            mt: 3, 
                            mb: 2, 
                            bgcolor: '#c01515', 
                            '&:hover': {
                                bgcolor: '#a01010',
                            }
                        }}
                    >
                        Se connecter
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}

export default ConnectionPage;