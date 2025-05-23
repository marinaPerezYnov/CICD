import React, { useEffect } from "react";
import { Box, Container, List, ListItem, Typography } from "@mui/material";
import axios from "axios";

/**
 * 
 * Liste des utilisateurs
 */
const ListUsers = () => {

    const [userList, setUserList] = React.useState([]);

    const getUsers = async () => {

        axios.get('http://localhost:8000/users')
        .then((response) => {
            setUserList(response.data['utilisateurs']);
        })
        .catch((error) => {
            console.error('Error fetching users:', error);
        });
    }

    useEffect(() => {
        getUsers();
    }, []);

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
                <p>1 user(s) already registered</p>
            {
            userList?.length > 0 
            && userList.map((user, index) => (
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