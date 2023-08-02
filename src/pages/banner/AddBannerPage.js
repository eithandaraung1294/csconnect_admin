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
import { Form } from '../../sections/@dashboard/banner';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
/* eslint-disable camelcase */

export default function AddBannerPage() {
    const [banner, setBanner] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const axiosPrivate = useAxiosPrivate();
    const from = "/dashboard/banner";
    const getUrl = "/admin/banner";
    const [data, setData] = useState({
        image:"",
        e_title: "",
        m_title: "",});


    useEffect(() => {
        const getBanner = async () => {
            try{
                const res = await axiosPrivate.get(getUrl);
                if(res.data != null){
                    setData({
                        ...data,
                        image: res.data.image,
                        e_title: res.data.e_title,
                        m_title: res.data.m_title
                    });
                }
                setLoading(false);
            }catch(err){
                setLoading(false);
            };
        }
        getBanner();
    }, [])

    return (
        <>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Banner
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
                    !isLoading  &&  <Form
                            url="/admin/banner/create"
                            initValues = {data}
                        />
                }
               
                
                
            </Container>
        </>
    )
}
