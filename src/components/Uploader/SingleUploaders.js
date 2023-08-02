import './style.scss';
import _ from 'lodash';
import {React, useState} from 'react';
import { Alert, Box, Container, IconButton, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import CollectionsSharpIcon from '@mui/icons-material/CollectionsSharp';
import axios from '../../api/axios';

export const SingleDropzone = ({uploadUrl, id, label, coverImage, setCoverImage, removeCoverImage }) => {
    const [err, setErr] = useState();
    //* upload images
    const uploadImage = async e => {
        try{
            const { files } = e.target;
            const formData = new FormData();
            formData.append('image', files[0]);
            const { data } = await axios.post(uploadUrl, formData);
            setCoverImage(data.imagePath);
        } catch(err) {
            if(err.response.status === 400){
                setErr(err.response.data.message);
            }
        }
    }

    return (
        <div className="form-group">
            {
                err && <Alert severity="error" sx={{ mb: 2 }}>{err}</Alert>
            }
            <label htmlFor={id} className="text-primary font-weight-bold">{label}</label>
            <Box className="d-flex" label="sadfasdfasd">
                <Container justify="center"  className="file-uploader-mask d-flex justify-content-center align-items-center">
                    <CollectionsSharpIcon/>
                </Container>
                <input className="file-input" type="file" id={id} onChange={uploadImage} />
            </Box>
            {
                coverImage && (
                    <ImageList sx={{ width: '100%', height: 200 }} cols={3} rowHeight={164}>
                        <ImageListItem>
                            <img
                                src={`${coverImage}?w=164&h=164&fit=crop&auto=format`}
                                srcSet={`${coverImage}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                alt={coverImage}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                position='top'
                                actionIcon={
                                    <IconButton
                                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                        onClick={(e) => removeCoverImage()}
                                    >
                                        <ClearIcon />
                                    </IconButton>
                                }
                            />
                        </ImageListItem>
                  </ImageList>
                )
            }
        </div>
    )
}
