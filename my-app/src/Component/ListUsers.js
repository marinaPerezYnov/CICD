import React from "react";
import { users } from "../Utils/Mocks/Users";
import { Box, Container, List, ListItem, ListItemText, Typography } from "@mui/material";

/**
 * 
 * Liste des utilisateurs
 */
const ListUsers = () => {
    return (
        <Container sx={{
            marginTop: '30px',
            border: '1px solid #ccc',
            padding: '20px',
            backgroundColor: 'aquamarine'
        }}>
            <Typography variant="h4" component="h3" gutterBottom sx={{
                marginBottom: '20px',
                padding: '2% 5%',
            }}>
                Liste des utilisateurs
            </Typography>
            <Container sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
            }}>
            {users.map((user, index) => (
                <List key={index}>
                    <ListItem sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        border: '1px solid #ccc',
                        padding: '20px',
                        backgroundColor: 'white',
                    }}>
                        <Typography variant="h6" component="h1" gutterBottom>
                            Utilisateur {index + 1}
                        </Typography>
                        <Box>
                            <p>Nom : {user.nom}</p>
                            <p>Prenom: {user.prenom}</p>
                            <p>Email: {user.email}</p>
                            <p>Date de naissance: {user.date_naissance}</p>
                            <p>Pays: {user.pays}</p>
                            <p>Ville: {user.ville}</p>
                            <p>Code postal: {user.code_postal}</p>
                        </Box>
                    </ListItem>
                </List>
            ))}
            </Container>
        </Container>
    );
}

export default ListUsers;