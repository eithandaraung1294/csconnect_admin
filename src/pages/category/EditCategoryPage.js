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
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { CategoryAddForm } from '../../sections/@dashboard/category';

/* eslint-disable camelcase */

export default function EditCategoryPage() {
    const location = useLocation();
    const [category, setCategory] = useState();
    const [error, setError] = useState();
    const axiosPrivate = useAxiosPrivate();
    const from = location.state?.from.pathname || "/dashboard/categories";
    const getCategoryUrl = "/admin/categories";
    const id = location.pathname.split("/")[4];
    const categoryEditUrl = "/admin/categories/update";

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get(`${getCategoryUrl}/${id}`, {
                    signal: controller.signal
                });
                const {createdAt, updatedAt,slug, ...other} = response.data;
                if(isMounted) await setCategory(other);
            } catch (err) {
                if(err.response.status === 400){
                    setCategory(err.response.data.message)
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
                        Edit Category 
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
                    category && 
                    <CategoryAddForm
                        url= {categoryEditUrl}
                        initValues = {category}
                    />
                }
            </Container>
        </>
    )
}
