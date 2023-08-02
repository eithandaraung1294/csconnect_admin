import { Alert, Avatar, Box, Button, Card, Chip, Container, Divider,Stack, Link, Typography } from '@mui/material';

import React, { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Helmet } from 'react-helmet-async';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';


const HeroesTextPage = () => {
    const axiosPrivate = useAxiosPrivate();
    const [heroest, setHeroest] = useState('');
    const getUrl = "/admin/heroes-text"
    useEffect(()=> {
        const getBanner = () => {
            axiosPrivate.get(getUrl).then((res) => setHeroest(res?.data));
        }
        getBanner();
    },[])
    return (
        <>
            <Helmet>
                <title> Herores Text | CCKL </title>
            </Helmet>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Heroes Text
                    </Typography>
                    <Stack direction="row" spacing={2} sx={{  display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', }}>
                        <Link to="/dashboard/heroes-text/create" component={RouterLink}>
                            <Button variant="outlined">Add New Or Edit</Button>
                        </Link>
                    </Stack>
                </Stack>
                
                <Card >
                    <Container sx={{ my: '3rem' }}>
                        <Typography variant="h5" gutterBottom>
                            Title in English :
                        </Typography>
                        <Typography variant="span" gutterBottom>
                            {heroest?.e_title} 
                        </Typography>
                        <Divider />
                        <Typography variant="h5" gutterBottom>
                            Title in Myanmar :
                        </Typography>
                        <Typography variant="span" gutterBottom>
                            {heroest?.m_title} 
                        </Typography>
                        <Divider />
                        <Typography variant="h5" gutterBottom>
                            Description in English :
                        </Typography>
                        <Typography variant="span" gutterBottom>
                            {heroest?.e_description}
                        </Typography>
                        <Divider />
                        <Typography variant="h5" gutterBottom>
                            Description in Myanmar :
                        </Typography>
                        <Typography variant="span" gutterBottom>
                            {heroest?.m_description}
                        </Typography>
                    </Container>
                </Card>
            </Container>

            
            </>
    )
}

export default HeroesTextPage