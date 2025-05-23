import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Container } from '@mui/material';
import Form from '../Component/Form';

const SaveUserDatasPage = () => {

    return (
        <Container data-testid="save-datas-form-page-container" sx={{
            height: '100vh',
            marginLeft: 'auto',
            marginRight: 'auto',
        }}>
            <Container>
                <Form />
                {/* <ToastContainer data-testid="toast-container" /> */}
            </Container>
        </Container>
    );
};

export default SaveUserDatasPage;