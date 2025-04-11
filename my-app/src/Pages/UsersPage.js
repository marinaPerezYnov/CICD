import React from 'react';

import { Container } from '@mui/material';
import ListUsers from './../Component/ListUsers';

const UsersPage = () => {
    return (
        <Container data-testid="users-page-container" sx={{
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

export default UsersPage;