import React from 'react'
import {Container, Alert, Button} from '@mui/material';
import { Link } from 'react-router-dom';

function WelcomePage() {
  return (
    <Container
        container
        spacing={0}
        align="center"
        justify="center"
        style={{ backgroundColor: 'teal' }}
    >
        <Container item style={{ backgroundColor: 'yellow' }}>
            <Alert severity="info">Welcome to CCKL Admin Page!</Alert>
            <Link to="/login">
                <Button variant="contained">Login To Manage</Button>
            </Link>
        </Container>
    </Container>
  )
}

export default WelcomePage