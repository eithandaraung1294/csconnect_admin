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
import { UserAddForm } from '../../sections/@dashboard/user';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
/* eslint-disable camelcase */

export default function EditUserPage() {
    const location = useLocation();
    const [user, setUser] = useState();
    const [error, setError] = useState();
    const axiosPrivate = useAxiosPrivate();
    const from = location.state?.from.pathname || "/dashboard/users";
    const getUserUrl = "/admin/users/";
    const id = location.pathname.split("/")[4];

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get(`${getUserUrl}/${id}`, {
                    signal: controller.signal
                });
                console.log(response.data);
                const {password,createdAt, updatedAt, refresh_token, ...usr} = {...response.data, new_password:''};
                console.log(usr);
                if(isMounted) await setUser(usr);

            } catch (err) {
                if(err.response.status === 400){
                    setUser(err.response.data.message)
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
                    Edit User 
                </Typography>
                <Link to={from} component={RouterLink}>
                    <Button variant="contained" startIcon={<Iconify icon="akar-icons:arrow-back-thick-fill" />}>
                    Back
                    </Button>
                </Link>
                </Stack>
                <Box>
                    {user?.username}
                    <br/>
                    {user?.email}
                    <br/>
                    {user?.photo}

                </Box>
                {
                    error && <Alert severity="error">{error}</Alert>
                }
                {
                    user && 
                    <UserAddForm
                        url="/admin/users/update"
                        initValues = {user}
                    />
                }
                
                
            </Container>
        </>
    )
}
