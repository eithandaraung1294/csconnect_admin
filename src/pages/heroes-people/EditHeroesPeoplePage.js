import { React, useEffect, useState} from 'react'
import { Link as RouterLink, useLocation} from 'react-router-dom';
import { 
  Link, 
  Button, 
  Stack, 
  Typography, 
  Container,
  Alert,
  Box, 
} from '@mui/material';
import Iconify from '../../components/iconify';
import { Form } from '../../sections/@dashboard/heroes-people';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
/* eslint-disable camelcase */

export default function EditHeroesPeoplePage() {
    const location = useLocation();
    const [hero, setHeroes] = useState();
    const [error, setError] = useState();
    const axiosPrivate = useAxiosPrivate();
    const from = location.state?.from.pathname || "/dashboard/heroes-people";
    const getUrl = "/admin/heroes-people";
    const id = location.pathname.split("/")[4];

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getData = async () => {
            try {
                const response = await axiosPrivate.get(`${getUrl}/${id}`, {
                    signal: controller.signal
                });
                console.log(response.data);
                const {createdAt, updatedAt, ...usr} = response.data;
                if(isMounted) await setHeroes(usr);

            } catch (err) {
                if(err.response.status === 400){
                    setError(err.response.data.message)
                }
            }
        }
        getData();
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    return (
        <>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    Edit Heroes People
                </Typography>
                <Link to={from} component={RouterLink}>
                    <Button variant="contained" startIcon={<Iconify icon="akar-icons:arrow-back-thick-fill" />}>
                    Back
                    </Button>
                </Link>
                </Stack>
                {
                    error && <Alert severity="error">{error}</Alert>
                }
                {
                    hero && 
                    <Form
                        url="/admin/heroes-people/update"
                        initValues = {hero}
                    />
                }
                
                
            </Container>
        </>
    )
}
