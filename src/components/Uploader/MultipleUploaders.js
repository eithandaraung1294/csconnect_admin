import './style.scss';
import _ from 'lodash';
import React from 'react';
import { Box, Container, IconButton, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ClearIcon from '@mui/icons-material/Clear';
import axios from '../../api/axios';

export const MultipleDropzone = ({uploadUrl, id, label, extraImages, setExtraImages, removeImage }) => {

    //* upload images
    const uploadImage = async e => {
        try{
            const { files } = e.target;
            const formData = new FormData();
            formData.append('image', files[0]);
            const { data } = await axios.post(uploadUrl, formData);
            setExtraImages(data.imagePath);
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <div className="form-group">
            <label htmlFor={id} className="text-primary font-weight-bold">{label}</label>
            <Box className="d-flex dropzone-container">
                <Container justify="center"  className="dropzone-uploader-mask">
                    <CloudUploadIcon/>
                </Container>
                <input className="dropzone-input" type="file" id={id} onChange={uploadImage} />
            </Box>
            {
                extraImages && (
                    <ImageList sx={{ width: '100%', height: 300 }} cols={4} rowHeight={164}>
                        {extraImages.map((item,index) => (
                            <ImageListItem key={index}>
                                <img
                                    src={`${item}?w=164&h=164&fit=crop&auto=format`}
                                    srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                    alt={item}
                                    loading="lazy"
                                />
                                <ImageListItemBar
                                    position='top'
                                    actionIcon={
                                        <IconButton
                                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                            onClick={(e) => {removeImage(index);}}
                                        >
                                            <ClearIcon />
                                        </IconButton>
                                    }
                                />
                            </ImageListItem>
                        ))}
                  </ImageList>
                )
            }
        </div>
    )
}
