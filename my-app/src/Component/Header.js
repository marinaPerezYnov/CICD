import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function Header() {
  return (
    <AppBar position="static" sx={{ marginBottom: '20px', backgroundColor: '#c01515' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          CICD Application
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/"
          >
            Accueil
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/listUsers"
          >
            Liste Utilisateurs
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/admin"
          >
            Admin
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/admin/se-connecter"
          >
            Connexion Admin
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;