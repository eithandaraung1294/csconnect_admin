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
import { Form } from '../../sections/@dashboard/navbar-sub-menu';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
/* eslint-disable camelcase */

export default function EditNavBarSubMenuPage() {
    const location = useLocation();
    const [nbMenu, setNbMenu] = useState();
    const [error, setError] = useState();
    const axiosPrivate = useAxiosPrivate();
    const from = location.state?.from.pathname || "/dashboard/navbar-sub-menus";
    const getUserUrl = "/admin/navbar-sub-menus/";
    const id = location.pathname.split("/")[4];

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get(`${getUserUrl}/${id}`, {
                    signal: controller.signal
                });
                const {createdAt, updatedAt,navbar_menu, ...data} = {...response.data};
                if(isMounted) await setNbMenu(data);

            } catch (err) {
                if(err.response.status === 400){
                    setNbMenu(err.response.data.message)
                }
            }
        }
        getUsers();
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
                        Edit NavBar Sub Menu 
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
                    nbMenu && 
                    <Form
                        url="/admin/navbar-sub-menus/update"
                        initValues = {nbMenu}
                    />
                }
                
                
            </Container>
        </>
    )
}
