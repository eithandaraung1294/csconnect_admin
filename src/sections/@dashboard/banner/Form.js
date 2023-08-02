import { React, useState, useEffect} from 'react'
import { 
    TextField, 
    Grid,
    Card,
    Alert,
    Input,
    Box
  } from '@mui/material';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

import useAuth from '../../../hooks/useAuth';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { MultipleDropzone } from '../../../components/Uploader/MultipleUploaders';
import { SingleDropzone } from '../../../components/Uploader/SingleUploaders';
import {Cancel} from '../../../components/cancel-button';
import { SaveButton } from '../../../components/save-button';
import { CheckboxesTags } from '../../../components/checkboxes-tags';
import { IOSSwitch } from '../../../components/ios-switch';
import { TextEditor } from '../../../components/text-editor';
import { SnackBar } from '../../../components/snackbar';

/* eslint-disable camelcase */

export default function Form({ url, initValues}){

    const axiosPrivate = useAxiosPrivate();
    const [editorErrMsg, setEditorErrMsg] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [coverImage, setCoverImage] = useState(initValues.image)
     // snack bar
    const [message, setMessage] = useState();

    const navigate = useNavigate();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({defaultValues: initValues});
    const uploadUrl = "/admin/uploads/banner";
    const backUrl = "/dashboard/banner"
    const cardstyle = { width: '100%',  p: 2, backgroundColor: '#FFFFFF', fontSize: 2 };
    
    const onSubmit = async (data) => {
        const post = await axiosPrivate.post(url,
            JSON.stringify({...data, image:coverImage}),
            {
                headers: { 'Content-Type': 'application/json'},
                withCredentials: true
            }
        ).then(() => navigate(backUrl, { replace: true }))
        .catch(err => {
            // if(err?.response?.data?.status === 400){
                setErrMsg(err.response.data.message);
            // }
        });
        
    }

    return (
        <Card sx={cardstyle}>
            {
            errMsg && <Alert severity="error" sx={{ mb: 2 }}>{errMsg}</Alert>
            }
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 3, md: 4 }}>
                    <Grid item xs={12} sm={12} md={12}>
                        <SingleDropzone
                            uploadUrl={uploadUrl}
                            label="Dropzone"
                            id="dropzone-uploader"
                            coverImage={coverImage}
                            setCoverImage={(data) => {
                                setCoverImage(data)
                                }}
                            removeCoverImage={() => setCoverImage('')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <TextField 
                            fullWidth 
                            name="e_title" 
                            label="Title in English" 
                            color="secondary"
                            {...register("e_title", { required: "Title is required." })}
                            error={Boolean(errors.e_title)}
                            helperText={errors.e_title?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <TextField 
                            fullWidth 
                            name="m_title" 
                            label="Title in Myanmar" 
                            color="secondary"
                            {...register("m_title", { required: "Title is required." })}
                            error={Boolean(errors.m_title)}
                            helperText={errors.m_title?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} 
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

