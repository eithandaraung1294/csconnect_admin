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
import { Form } from '../../sections/@dashboard/heroes-text';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
/* eslint-disable camelcase */

export default function AddHeroesTextPage() {
    const [isLoading, setLoading] = useState(true);
    const axiosPrivate = useAxiosPrivate();
    const from = "/dashboard/heroes-text";
    const getUrl = "/admin/heroes-text";
    const [data, setData] = useState({
        e_title: "",
        m_title: "",
        e_description: "",
        m_description: ""
    });


    useEffect(() => {
        const getData = async () => {
            try{
                const res = await axiosPrivate.get(getUrl);
                if(res.data != null){
                    setData({
                        ...data,
                        e_title: res.data.e_title,
                        m_title: res.data.m_title,
                        e_description: res.data.e_description,
                        m_description: res.data.m_description,
                    });
                }
                setLoading(false);
            }catch(err){
                setLoading(false);
            };
        }
        getData();
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
                    !isLoading  &&  <Form
                            url="/admin/heroes-text/create"
                            initValues = {data}
                        />
                }
               
                
                
            </Container>
        </>
    )
}
