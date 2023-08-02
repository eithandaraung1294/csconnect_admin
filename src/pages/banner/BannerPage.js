import { Alert, Avatar, Box, Button, Card, Chip, Container, Divider,Stack, Link, Typography } from '@mui/material';

import React, { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Helmet } from 'react-helmet-async';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';


const BannerPage = () => {
    const axiosPrivate = useAxiosPrivate();
    const [banner, setBanner] = useState('');
    const getUrl = "/admin/banner"
    useEffect(()=> {
        const getBanner = () => {
            axiosPrivate.get(getUrl).then((res) => setBanner(res?.data));
        }
        getBanner();
    },[])
    return (
        <>
            <Helmet>
                <title> Navbar Menu | CCKL </title>
            </Helmet>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Banner
                    </Typography>
                    <Stack direction="row" spacing={2} sx={{  display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', }}>
                        <Link to="/dashboard/banner/create" component={RouterLink}>
                            <Button variant="outlined">Add New Or Edit</Button>
                        </Link>
                    </Stack>
                </Stack>
                
                <Card >
                    <Container sx={{ my: '3rem' }}>
                        <Typography variant="h5" gutterBottom>
                            Banner Image
                        </Typography>
                        <Box
                            component="img"
                            sx={{
                            height: 233,
                            width: 350,
                            maxHeight: { xs: 233, md: 167 },
                            maxWidth: { xs: 350, md: 250 },
                            }}
                            alt="The house from the offer."
                            src={banner?.image}
                        />
                        <Divider />
                        <Typography variant="h5" gutterBottom>
                            Title in English:
                        </Typography>
                        <Typography variant="span" gutterBottom>
                            {banner?.e_title} 
                        </Typography>
                        <Divider />
                        <Typography variant="h5" gutterBottom>
                            Title in Myanmar:
                        </Typography>
                        <Typography variant="span" gutterBottom>
                            {banner?.m_title}
                        </Typography>
                    </Container>
                </Card>
            </Container>

            
            </>
    )
}

export default BannerPage