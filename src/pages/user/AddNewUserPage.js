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
import { UserAddForm } from '../../sections/@dashboard/user';

export default function AddNewUserPage() {
  const location = useLocation();
  const from = location.state?.from.pathname || "/";

  const initValues = {
    username:"",
    email: "",
    password: "",
    confirmPassword: "",
    is_admin: "",
    photo: ""
  }

  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Add New Users
          </Typography>
          <Link to={from} component={RouterLink}>
            <Button variant="contained" startIcon={<Iconify icon="akar-icons:arrow-back-thick-fill" />}>
              Back
            </Button>
          </Link>
        </Stack>

        <UserAddForm
          url="/admin/users/create"
          initValues = {initValues}
        />
        
      </Container>
    </>
    
  )
}
