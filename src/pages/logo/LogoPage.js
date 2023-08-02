import { React, useState, useEffect} from 'react'
import { 
    Grid,
  } from '@mui/material';

import { SingleDropzone } from '../../components/Uploader/SingleUploaders';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export const LogoPage = () => {
    const [coverImage, setCoverImage] = useState('')
    const axiosPrivate = useAxiosPrivate();

    const uploadUrl = "/admin/uploads/logo";
    const getUrl = "/admin/logo";
    useEffect(() => {
        const getLogo = async () =>{
            await axiosPrivate.get(getUrl).then((res) => setCoverImage(res.data.image));
        }
        getLogo();
    },[])
    return (
        <Grid item xs={12} sm={12} md={12}>
            <SingleDropzone
                uploadUrl={uploadUrl}
                label="Logo Uploader"
                id="dropzone-uploader"
                coverImage={coverImage}
                setCoverImage={(data) => {
                    setCoverImage(data)
                    }}
                removeCoverImage={() => alert("You can update.Cannot remove.")}
            />
        </Grid>
    )
}

export default LogoPage;
