import { React, useState, useEffect} from 'react'
import { 
    TextField, 
    IconButton, 
    InputAdornment,
    Grid,
    Card,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Alert,
    FormHelperText
  } from '@mui/material';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { Dropzone } from '../../../components/Uploader/Uploaders';
import Iconify from '../../../components/iconify';
import {Cancel} from '../../../components/cancel-button';
import { SaveButton } from '../../../components/save-button';
/* eslint-disable camelcase */


export default function UserAddForm({url, initValues}){

    const axiosPrivate = useAxiosPrivate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({defaultValues: initValues});
    const backUrl = "/dashboard/users";

    const imageURL = (data) => {
        setValue("photo", data);
    }
     
    const cardstyle = { width: '100%',  p: 2, backgroundColor: '#FFFFFF', fontSize: 2 };
    const onSubmit = async (data) => {
        // e.preventDefault();
        try{
            await axiosPrivate.post(url,
                JSON.stringify(data),
                {
                    headers: { 'Content-Type': 'application/json'},
                    withCredentials: true
                }
            ).then(res => {
                setTimeout(() => {
                    navigate(backUrl, { replace: true })
                }, 1000);
            });
        } catch (err) {
            if (err?.response?.status === 400) {
                setErrMsg(err.response.data.message);
            } else {
                setErrMsg('User Create Failed');
            }
        }
    }

    return (
        <Card sx={cardstyle}>
            {
            errMsg && <Alert severity="error" sx={{ mb: 2 }}>{errMsg}</Alert>
            }
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 3, md: 4 }}>
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField 
                            fullWidth 
                            name="username" 
                            label="User Name" 
                            color="secondary"
                            {...register("username", { required: "User Name is required." })}
                            error={Boolean(errors.username)}
                            helperText={errors.username?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                    <TextField 
                        fullWidth
                        type="email" 
                        name="email" 
                        label="Email address" 
                        {...register("email", { required: "Email is required." })}
                        error={Boolean(errors.email)}
                        helperText={errors.email?.message}
                    />
                    </Grid>
                   
                    <Grid item xs={12} sm={6} md={6}>
                        {
                            initValues?.new_password !== undefined 
                            ? <TextField
                                fullWidth
                                name="new_password"
                                label="New Password"
                                type={showPassword ? 'text' : 'password'}
                                {...register("new_password")}
                                error={Boolean(errors.password)}
                                helperText={errors.password?.message}
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
                            : <TextField
                                fullWidth
                                name="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                {...register("password", { required: "Password is required." })}
                                error={Boolean(errors.password)}
                                helperText={errors.password?.message}
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
                        }
                        
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField
                            fullWidth
                            name="confirmPassword"
                            label="Confirm Password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            // onChange={(e) => setConfirmPassword(e.target.value)}
                            {...register("confirmPassword")}
                            error={Boolean(errors.confirmPassword)}
                            helperText={errors.confirmPassword?.message}
                            InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                                    <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                </IconButton>
                                </InputAdornment>
                            ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label" >Is Admin?</FormLabel>
                            <RadioGroup row aria-label="gender" name="is_admin" defaultValue={initValues.is_admin}>
                                <FormControlLabel 
                                    value="true" 
                                    control={
                                    <Radio {...register("is_admin", { required: "Choose your User type" })} />
                                    } 
                                    label="Admin"
                                />
                                <FormControlLabel 
                                    value="false" 
                                    control={
                                    <Radio {...register("is_admin", { required: "Choose your User type" })} />
                                    } 
                                    label="User" 
                                />
                            </RadioGroup>
                            <FormHelperText style={{color:'#d32f2f'}}>{errors.is_admin?.message}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <Dropzone
                            uploadUrl="/admin/uploads/profile"
                            label="Dropzone"
                            id="dropzone-uploader"
                            photo={initValues.photo}
                            imageURL={imageURL}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <></>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} 
                        container
                        justifyContent="right"
                    >
                        <Grid  sx={{ mr: 2 }}>
                            <Cancel backUrl={backUrl} />
                        </Grid>
                        <Grid >
                            <SaveButton/>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Card>
    )
}

