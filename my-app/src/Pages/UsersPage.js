import React from 'react';

import { Container } from '@mui/material';
import ListUsers from './../Component/ListUsers';

const LoginPage = () => {
    console.log("test");
    return (
        <Container sx={{
            height: '100vh',
            marginLeft: 'auto',
            marginRight: 'auto',
        }}>
            <Container>
                <ListUsers />
            </Container>
        </Container>
    );
};

export default LoginPage;