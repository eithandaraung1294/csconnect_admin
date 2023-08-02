import { React, useState, useEffect} from 'react'
import { 
    TextField, 
    Grid,
    Card,
    FormControl,
    Alert,
    InputLabel,
    MenuItem,
    Select
  } from '@mui/material';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import {Cancel} from '../../../components/cancel-button';
import { SaveButton } from '../../../components/save-button';
import { TextEditor } from '../../../components/text-editor';

/* eslint-disable camelcase */


export default function Form({url, initValues}){

    const axiosPrivate = useAxiosPrivate();
    const [errMsg, setErrMsg] = useState('');
    const [nbMenu, setNbMenu] = useState([]);
    const [editorErrMsg, setEditorErrMsg] = useState('');
    const [selectvalue, setSelectValue] = useState('');

    const navigate = useNavigate();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({defaultValues: initValues});
    const backUrl = "/dashboard/navbar-sub-menus";
    const getNavBarData = "/admin/navbar-menus/all";

    const cardstyle = { width: '100%',  p: 2, backgroundColor: '#FFFFFF', fontSize: 2 };
    useEffect(() => {
        setSelectValue(initValues.parent_menu_id);
        const getData = async () => {
            try {
                const response = await axiosPrivate.get(getNavBarData);
                setNbMenu(response.data);
            } catch (err) {
                alert("Getting error parent menu");
                // navigate('/login', { state: { from: location }, replace: true });
            }
        }
        getData();
    }, []);

    const onSubmit = async (data) => {
        if(data.e_description.value.length < 50 || data.m_description.value.length < 50){
            setEditorErrMsg('Required, Add description Minimum length 50 characters');
            return;
        }
        try{
            await axiosPrivate.post(url,
                JSON.stringify({...data, e_description:data.e_description.value, m_description:data.m_description.value}),
                {
                    headers: { 'Content-Type': 'application/json'},
                    withCredentials: true
                }
            ).then(res => {
                setTimeout(() => {
                    if(res.status === 200 ) navigate(backUrl, { replace: true })
                }, 1000);
            });
        } catch (err) {
            if (err?.response?.status === 400) {
                setErrMsg(err.response.data.message);
            } else {
                setErrMsg('Create Failed');
            }
        }
    }

    const handleChange = (event) => {
        setSelectValue(event.target.value);
        setValue("parent_menu_id", event.target.value);
    };
    return (
        <Card sx={cardstyle}>
            {
            errMsg && <Alert severity="error" sx={{ mb: 2 }}>{errMsg}</Alert>
            }
             <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 3, md: 4 }}>
                    <Grid item xs={12} sm={12} md={12}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Select Parent Menu</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectvalue}
                                label="Age"
                                onChange={handleChange}
                            >
                                {
                                    nbMenu.map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.e_title} - {option.m_title}
                                        </MenuItem> 
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    
                    <Grid item xs={12} sm={12} md={12}>
                        <TextField 
                            fullWidth 
                            name="e_title" 
                            label="Title in English" 
                            color="secondary"
                            {...register("e_title", { required: "Title in English is required." })}
                            error={Boolean(errors.e_title)}
                            helperText={errors.e_title?.message}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} md={12}>
                        <TextField 
                            fullWidth 
                            name="e_title" 
                            label="Title in Myanmar" 
                            color="secondary"
                            {...register("m_title", { required: "Title in Myanmar is required." })}
                            error={Boolean(errors.m_title)}
                            helperText={errors.m_title?.message}
                        />
                    </Grid>
                    
                    <Grid item xs={12} sm={12} md={12}>
                        <InputLabel id="demo-simple-select-label">Description in English</InputLabel>

                        <TextEditor
                            uploadUrl= "/admin/uploads/post-image"
                            value= {initValues?.e_description}
                            setValue={(val) => setValue('e_description', val)}
                        />    
                        {editorErrMsg && <Alert severity="error" sx={{ mb: 2 }}>{editorErrMsg}</Alert>}

                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <InputLabel id="demo-simple-select-label">Description in Myanmar</InputLabel>

                        <TextEditor
                            uploadUrl= "/admin/uploads/post-image"
                            value= {initValues?.m_description}
                            setValue={(val) => setValue('m_description', val)}
                        />    
                        {editorErrMsg && <Alert severity="error" sx={{ mb: 2 }}>{editorErrMsg}</Alert>}

                    </Grid>
                    {/* <Grid item xs={12} sm={12} md={12}>
                        <IOSSwitch
                            published= {published}
                            onChange= {async () => {
                                await setPublished(!published)
                                await setValue("published", !published)
                            }}
                            label = "Publish"
                        />
                    </Grid> */}
                    
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

