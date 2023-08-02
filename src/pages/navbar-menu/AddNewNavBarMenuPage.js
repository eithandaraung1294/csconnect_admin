import { React} from 'react'
import { Link as RouterLink, useLocation} from 'react-router-dom';
import { 
  Link, 
  Button, 
  Stack, 
  Typography, 
  Container, 
} from '@mui/material';
import Iconify from '../../components/iconify';
import { AddForm } from '../../sections/@dashboard/navbar-menu';

export default function AddNewNavBarMenuPage() {
    const location = useLocation();
    const from = location.state?.from.pathname || "/";

    const initValues = {
        e_title:"",
        m_title: "",
        priority: "",
        published: "",
    }

    return (
        <>
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    Add Navbar Menu
                </Typography>
                <Link to={from} component={RouterLink}>
                    <Button variant="contained" startIcon={<Iconify icon="akar-icons:arrow-back-thick-fill" />}>
                        Back
                    </Button>
                </Link>
            </Stack>

            <AddForm
                url="/admin/navbar-menus/create"
                initValues = {initValues}
            />
            
        </Container>
        </>
        
    )
}
