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
import { Form } from '../../sections/@dashboard/blog';

export default function AddNewBlogPage() {
    const location = useLocation();
    const from = location.state?.from.pathname || "/";
    const blogCreateUrl = "/admin/posts/create";
    const backUrl = "/dashboard/blogs";
    const initValues = {
        title:"",
        description: "",
        user_id: "",
        category_id: [],
        published: true,
        cover_image: '',
        image: [],

    }

    return (
        <>
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    Add New Blog
                </Typography>
                <Link to={from} component={RouterLink}>
                    <Button variant="contained" startIcon={<Iconify icon="akar-icons:arrow-back-thick-fill" />}>
                    Back
                    </Button>
                </Link>
            </Stack>

            <Form
                backUrl={backUrl}
                url= {blogCreateUrl}
                initValues = {initValues}
                status="Add"
            />
            
        </Container>
        </>
        
    )
}
