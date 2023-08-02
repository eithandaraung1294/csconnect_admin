import {React, useState } from 'react';
import { useNavigate} from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

import useAuth from "../../../hooks/useAuth";

import axios from '../../../api/axios';

const LOGIN_URL = '/admin/auth/login';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const response = await axios.post(LOGIN_URL,
            JSON.stringify({email, password}),
            {
                headers: { 'Content-Type': 'application/json'},
                withCredentials: true
            }
        );
        console.log(JSON.stringify(response?.data));
        const user = response?.data?.data;
        const accessToken = response?.data?.accessToken;
        setAuth({ user, accessToken });
        setEmail('');
        setPassword('');
        // error throwing
        navigate('/dashboard/app', { replace: true });
    } catch (err) {
        if (err?.response?.status === 400) {
            setErrMsg(err.response.data.message);
        } else {
            setErrMsg('Login Failed');
        }
       
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
            {
              errMsg && <Alert severity="error">{errMsg}</Alert>
            }
            <TextField name="email" label="Email address" onChange={(e) => setEmail(e.target.value)}/>

            <TextField
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <Checkbox name="remember" label="Remember me" />
          <Link variant="subtitle2" underline="hover">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained">
          Login
        </LoadingButton>
      </form>
    </>
  );
}
