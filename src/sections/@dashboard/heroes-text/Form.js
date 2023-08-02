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
import {Cancel} from '../../../components/cancel-button';
import { SaveButton } from '../../../components/save-button';
/* eslint-disable camelcase */


export default function Form({url, initValues}){

    const axiosPrivate = useAxiosPrivate();
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({defaultValues: initValues});
    const backUrl = "/dashboard/heroes-text";

    const cardstyle = { width: '100%',  p: 2, backgroundColor: '#FFFFFF', fontSize: 2 };
    const onSubmit = async (data) => {
        axiosPrivate.post(url,
            JSON.stringify(data),
            {
                headers: { 'Content-Type': 'application/json'},
                withCredentials: true
            }
        ).then(res => {
            setTimeout(() => {
                if(res.status === 200 ) navigate(backUrl, { replace: true })
            }, 1000);
        }).catch(err => {
            if (err?.response?.status === 400) {
                setErrMsg(err.response.data.message);
            } else {
                setErrMsg('Create Failed');
            }
        });
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
                            name="e_title" 
                            label="Title in English" 
                            color="secondary"
                            {...register("e_title", { required: "English title is required." })}
                            error={Boolean(errors.e_title)}
                            helperText={errors.e_title?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField 
                            fullWidth
                            name="m_title" 
                            label="Title in Myanmar" 
                            {...register("m_title", { required: "Myanmar title is required." })}
                            error={Boolean(errors.m_title)}
                            helperText={errors.m_title?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField 
                            fullWidth 
                            name="e_description" 
                            label="Description in English" 
                            color="secondary"
                            {...register("e_description", { required: "Description is required." })}
                            error={Boolean(errors.e_description)}
                            helperText={errors.e_description?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField 
                            fullWidth
                            name="m_description" 
                            label="Description in Myanmar" 
                            {...register("m_description", { required: "Description is required." })}
                            error={Boolean(errors.m_description)}
                            helperText={errors.m_description?.message}
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

