import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Box, Dialog, IconButton, ImageListItemBar, Slide, Stack, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});
  
export default function StandardImageList({images}) {

    const [selectedTile, setSelectedTile] = React.useState(null);

    const handleClickOpen = (item) => {
        setSelectedTile(item);
        console.log("clicked");
        console.log(item);
    };

    const handleClose = () => {
        setSelectedTile(null);
      };
      // console.log(images);
    return (
      <>
        <ImageList sx={{ width: 600, height: '100%' }} cols={3} rowHeight={250}>
          {images?.map((item, index) => (
              <ImageListItem key={index} onClick={() => handleClickOpen(item)}>
                  <img
                      src={`${item}?w=164&h=164&fit=crop&auto=format`}
                      srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      alt={item}
                      loading="lazy"
                  />
              </ImageListItem>
          ))}
        </ImageList>

        <Dialog
          fullScreen
          open={selectedTile !== null}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <ImageListItemBar
              position='top'
              actionIcon={
                  <IconButton
                      sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                      onClick={handleClose}
                  >
                      <ClearIcon />
                  </IconButton>
              }
          />
          {selectedTile && (
              <img src={selectedTile} alt={selectedTile}/>
          )}
        </Dialog>
      </>
    );
}

const itemData = [
     'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
     'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
     'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
     'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
     'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
     'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
     'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
     'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
     'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
     'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
     'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
     'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
     'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
     'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
     'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
];
