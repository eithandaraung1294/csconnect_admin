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
import { Form } from '../../sections/@dashboard/navbar-sub-menu';

export default function AddNewNavBarSubMenuPage() {
    const location = useLocation();
    const from = location.state?.from.pathname || "/";

    const initValues = {
        parent_menu_id: "",
        e_title:"",
        m_title: "",
        e_description: "",
        m_description: "",
    }

    return (
        <>
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    Add Navbar Sub Menu
                </Typography>
                <Link to={from} component={RouterLink}>
                    <Button variant="contained" startIcon={<Iconify icon="akar-icons:arrow-back-thick-fill" />}>
                        Back
                    </Button>
                </Link>
            </Stack>

            <Form
                url="/admin/navbar-sub-menus/create"
                initValues = {initValues}
            />
            
        </Container>
        </>
        
    )
}
