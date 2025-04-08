import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Container } from '@mui/material';
import Form from './../Component/Form';

const LoginPage = () => {
    console.log("test");
    return (
        <Container sx={{
            height: '100vh',
            marginLeft: 'auto',
            marginRight: 'auto',
        }}>
            <Container>
                <Form />
                <ToastContainer />
            </Container>
        </Container>
    );
};

export default LoginPage;