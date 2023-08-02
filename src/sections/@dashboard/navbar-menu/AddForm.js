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


export default function UserAddForm({url, initValues}){

    const axiosPrivate = useAxiosPrivate();
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({defaultValues: initValues});
    const backUrl = "/dashboard/navbar-menus";

    const cardstyle = { width: '100%',  p: 2, backgroundColor: '#FFFFFF', fontSize: 2 };
    const onSubmit = async (data) => {
        // e.preventDefault();
        // try{
            axiosPrivate.post(url,
                JSON.stringify(data),
                {
                    headers: { 'Content-Type': 'application/json'},
                    withCredentials: true
                }
            ).then(res => {
                setTimeout(() => {
                    navigate(backUrl, { replace: true })
                }, 1000);
            }).catch(err => {
                setErrMsg(err.response.data.message);
            });
            
        // } catch (err) {
        //     console.log(err);
        //     if (err?.response?.status === 400) {
        //         setErrMsg(err.response.data.message);
        //     } else {
        //         setErrMsg('Create Failed');
        //     }
        // }
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
                            label="English Title" 
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
                            label="Myanmar Title" 
                            {...register("m_title", { required: "Myanmar title is required." })}
                            error={Boolean(errors.m_title)}
                            helperText={errors.m_title?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField 
                            fullWidth
                            type='number'
                            name="priority" 
                            label="Priority" 
                            {...register("priority", { required: "Priority is required" })}
                            error={Boolean(errors.priority)}
                            helperText={errors.priority?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label" >Publish?</FormLabel>
                            <RadioGroup row aria-label="gender" name="is_admin" defaultValue={initValues.published}>
                                <FormControlLabel 
                                    value="true" 
                                    control={
                                    <Radio {...register("published", { required: "Choose your Published" })} />
                                    } 
                                    label="Publish"
                                />
                                <FormControlLabel 
                                    value="false" 
                                    control={
                                    <Radio {...register("published", { required: "Choose your Published" })} />
                                    } 
                                    label="Unpublish" 
                                />
                            </RadioGroup>
                            <FormHelperText style={{color:'#d32f2f'}}>{errors.is_admin?.message}</FormHelperText>
                        </FormControl>
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

