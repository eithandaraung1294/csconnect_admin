import { React, useState, useEffect} from 'react'
import { 
    TextField, 
    Grid,
    Card,
    Alert,
  } from '@mui/material';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { SaveButton } from '../../components/save-button';
/* eslint-disable camelcase */


export default function MapPage(){

    const axiosPrivate = useAxiosPrivate();
    const [errMsg, setErrMsg] = useState('');
    const [map, setMap] = useState('');

    const navigate = useNavigate();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const createUrl = "/admin/map/create";
    const cardstyle = { width: '100%',  p: 2, backgroundColor: '#FFFFFF', fontSize: 2 };
    const getUrl = "/admin/map";
    useEffect(() => {
        const getMap = async () =>{
            await axiosPrivate.get(getUrl).then((res) => setMap(res.data.map));
        }
        getMap();
    },[])

    const onSubmit = async (data) => {
        try{
            await axiosPrivate.post(createUrl,
                JSON.stringify(data),
                {
                    headers: { 'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            setMap(data.map);
        }catch(err){
            if (err?.response?.status === 400) {
                setErrMsg(err.response.data.message);
            } else {
                setErrMsg('Create Failed');
            }
        }
       
    }

    return (
        <>
        <Card sx={cardstyle}>
            {
            errMsg && <Alert severity="error" sx={{ mb: 2 }}>{errMsg}</Alert>
            }
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 3, md: 4 }}>
                    <Grid item xs={12} sm={12} md={12}>
                        <TextField 
                            fullWidth 
                            name="map" 
                            label="Google Map link" 
                            color="secondary"
                            {...register("map", { required: "Google Map link is required." })}
                            error={Boolean(errors.map)}
                            helperText={errors.map?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} 
                        container
                        justifyContent="right"
                    >
                        
                        <Grid >
                            <SaveButton/>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Card>
        {
            map !== "" && <Card sx={cardstyle}>
                            <iframe title="map" style={{ width:"100%", height:"400px" }} 
                                src={map}/>
                            </Card>
        }
        
        </>

    )
}

