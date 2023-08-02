import React from 'react'
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Link } from '@mui/material';

export default function Cancel({backUrl}){
  return (
    <Link to={backUrl} component={RouterLink} style={{ textDecoration: 'none' }}>
        <Button variant="outlined" startIcon={<DoDisturbIcon/> }>
            Cancel
        </Button>
    </Link>
  )
}
