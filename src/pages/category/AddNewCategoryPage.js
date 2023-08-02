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
import { CategoryAddForm } from '../../sections/@dashboard/category';

export default function AddNewCategoryPage() {
    const location = useLocation();
    const from = location.state?.from.pathname || "/";
    const categoryCreateUrl = "/admin/categories/create";
    const initValues = {
        name:"",
        published: true,
    }

    return (
        <>
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
                Add New Category
            </Typography>
            <Link to={from} component={RouterLink}>
                <Button variant="contained" startIcon={<Iconify icon="akar-icons:arrow-back-thick-fill" />}>
                Back
                </Button>
            </Link>
            </Stack>

            <CategoryAddForm
                url= {categoryCreateUrl}
                initValues = {initValues}
            />
            
        </Container>
        </>
        
    )
}
