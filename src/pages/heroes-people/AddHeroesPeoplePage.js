import { React, useState} from 'react'
import { Link as RouterLink} from 'react-router-dom';
import { 
  Link, 
  Button, 
  Stack, 
  Typography, 
  Container,
} from '@mui/material';
import Iconify from '../../components/iconify';
import { Form } from '../../sections/@dashboard/heroes-people';
/* eslint-disable camelcase */

export default function AddHeroesPeoplePage() {
    const from = "/dashboard/heroes-people";
    const [data, setData] = useState({
        e_name: "",
        m_name: "",
        e_job_title: "",
        m_job_title: "",
        image: "",
        fb_link: "",
    });

    return (
        <>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Heroes People
                    </Typography>
                    <Link to={from} component={RouterLink}>
                        <Button variant="contained" startIcon={<Iconify icon="akar-icons:arrow-back-thick-fill" />}>
                            Back
                        </Button>
                    </Link>
                </Stack>
                <Form
                    url="/admin/heroes-people/create"
                    initValues = {data}
                />
            </Container>
        </>
    )
}
