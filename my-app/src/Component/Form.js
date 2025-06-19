import React, { useEffect, useState } from 'react';
import { 
    TextField, 
    Button, 
    Container, 
    Typography, 
    FormControl
} from '@mui/material';
import { toast } from 'react-toastify';

import {
    isAdult, 
    isValidPostalCode, 
    isValidName, 
    isValidEmail
} from '../Utils/Validate/Validate';

import axios from 'axios';

const Form = () => {
    const [mail, setMail] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [dateNaissance, setDateNaissance] = useState('');
    const [ville, setVille] = useState('');
    const [codePostal, setCodePostal] = useState('');
    const [disabled, setDisabled] = useState(false); 

    useEffect(() => {
        if (
            (mail !== '' && isValidEmail(mail))
            && (nom !== ''  && isValidName(nom))
            && (prenom !== '' && isValidName(prenom) )
            && (dateNaissance !== '' && isAdult(dateNaissance))
            && ville !== '' 
            && (codePostal !== '' && isValidPostalCode(codePostal))
        ) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [mail, nom, prenom, dateNaissance, ville, codePostal]);
    
    const handleSubmit = () => {
        // Affichage du toaster de succès
        toast.success('Données sauvegardées avec succès !');
        console.log(nom, prenom, mail, dateNaissance, ville, codePostal);
        
        // mysql-marina-perez.alwaysdata.net
        // Url de création d'un nouvel utilisateur
        // axios.post('http://mysql-marina-perez.alwaysdata.net/users', {
        axios.post('http://localhost:8000/users', {
            nom,
            prenom,
            email: mail,
            date_naissance: dateNaissance,
            ville,
            code_postal: codePostal,
            pays: "France", // ou une valeur par défaut
            nombre_achat: 0 // ou une valeur par défaut
        })
        .then((response) => {
            console.log("response : ", response);
            console.log("res : ", response.data);
        })
        .catch((error) => {
            console.error("error : ", error);
        });
    };

    return (
        <Container maxWidth="sm" sx={{
            border: '1px solid #ccc',
            padding: '20px',
        }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Sauvegarder les données 
            </Typography>
            <FormControl margin="normal" fullWidth required>
                <TextField
                    label="Nom"
                    type={"text"}
                    value={nom}
                    onChange={(e) => {
                        setNom(e.target.value);
                    }}
                    inputProps={{ 'data-testid': 'nom-input' }}
                />
            </FormControl>
            <FormControl margin="normal" fullWidth required>
                <TextField
                    label="Prénom"
                    type={"text"}
                    value={prenom}
                    onChange={(e) => {
                        setPrenom(e.target.value);
                    }}
                    inputProps={{ 'data-testid': 'prenom-input' }}
                />
            </FormControl>
            <FormControl margin="normal" fullWidth required>
                <TextField
                    label="Mail"
                    type={"mail"}
                    value={mail}
                    onChange={(e) => {
                        setMail(e.target.value);
                    }}
                    inputProps={{ 'data-testid': 'mail-input' }}
                />
            </FormControl>
            <FormControl margin="normal" fullWidth required>
                <Typography variant="h6" gutterBottom sx={{
                    fontSize: '1rem',
                }}>Date de naissance</Typography>
                <TextField
                    type={"date"}
                    label="Date de naissance"
                    value={dateNaissance}
                    onChange={(e) => {
                        setDateNaissance(e.target.value);
                    }}
                    inputProps={{ 'data-testid': 'date-input' }}
                />
            </FormControl>
            <FormControl margin="normal" fullWidth required>
                <TextField
                    label="Ville"
                    type={"text"}
                    value={ville}
                    onChange={(e) => setVille(e.target.value)}
                    inputProps={{ 'data-testid': 'ville-input' }}
                />
            </FormControl>
            <FormControl margin="normal" fullWidth required>
                <TextField
                    label="Code postal"
                    type={"text"}
                    value={codePostal}
                    onChange={(e) => {
                        setCodePostal(e.target.value);
                    }}
                    inputProps={{ 'data-testid': 'code-postal-input' }}
                />
            </FormControl>
            <Button variant="contained" color="primary" sx={{
                backgroundColor: '#c01515',
            }} type="submit" fullWidth 
            disabled={!disabled}
            onClick={handleSubmit}>
                Sauvegarder
            </Button>
        </Container>
    );
};

export default Form;