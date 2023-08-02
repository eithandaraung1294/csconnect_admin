import { React, useState } from 'react'
import { 
    TextField, 
    Grid,
    Card,
    Alert,
  } from '@mui/material';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import {Cancel} from '../../../components/cancel-button';
import { SaveButton } from '../../../components/save-button';
import { IOSSwitch } from '../../../components/ios-switch';
/* eslint-disable camelcase */

export default function CategoryAddForm({url, initValues}){
    const [published, setPublished] = useState(initValues.published);
    const axiosPrivate = useAxiosPrivate();
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({defaultValues: initValues});
    const backUrl = "/dashboard/categories";
    const cardstyle = { width: '100%',  p: 2, backgroundColor: '#FFFFFF', fontSize: 2 };
    console.log(published);
    const onSubmit = async (data) => {
        try{
            await axiosPrivate.post(url,
                JSON.stringify({ ...data, published}),
                {
                    headers: { 'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            navigate(backUrl, { replace: true });
        } catch (err) {
            if (err?.response?.status === 400) {
                setErrMsg(err.response.data.message);
            } else {
                setErrMsg('Category Create Failed');
            }
        }
    }

    const handleChange = async () => {
        await setPublished(!published);
        await setValue("published", published);
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
                            name="name" 
                            label="Category Name" 
                            color="secondary"
                            {...register("name", { required: "Category Name is required." })}
                            error={Boolean(errors.name)}
                            helperText={errors.name?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <IOSSwitch
                            published= {published}
                            onChange= {handleChange}
                            label = "Publish"
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

