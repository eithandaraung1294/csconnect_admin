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
import { Form } from '../../sections/@dashboard/feature';

export default function AddFeaturePage() {
    const location = useLocation();
    const from = location.state?.from.pathname || "/";

    const initValues = {
        e_title:"",
        m_title: "",
        icon: "",
        color: "",
        e_description: "",
        m_description: "",
    }

    return (
        <>
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    Add Feature
                </Typography>
                <Link to={from} component={RouterLink}>
                    <Button variant="contained" startIcon={<Iconify icon="akar-icons:arrow-back-thick-fill" />}>
                        Back
                    </Button>
                </Link>
            </Stack>

            <Form
                url="/admin/feature/create"
                initValues = {initValues}
            />
            
        </Container>
        </>
        
    )
}
