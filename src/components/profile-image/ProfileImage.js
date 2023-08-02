import { IconButton, ImageListItem, ImageListItemBar } from '@mui/material'
import React from 'react'
import ClearIcon from '@mui/icons-material/Clear';

const ProfileImage = ({uploadedImgs, onClick}) => {
  return (
    <ImageListItem>
        <img
            src={`${uploadedImgs}?w=248&fit=crop&auto=format`}
            srcSet={`${uploadedImgs}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={uploadedImgs}
            loading="lazy"
        />
            <ImageListItemBar
                position='top'
                actionIcon={
                    <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    >
                        <ClearIcon onClick={onClick}/>
                    </IconButton>
                }
            />
    </ImageListItem>
  )
}

export default ProfileImage;