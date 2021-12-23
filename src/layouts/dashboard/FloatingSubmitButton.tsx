
import { useNavigate } from "react-router-dom";
import React from 'react'
//mui
import EditIcon from '@mui/icons-material/Edit';
import { Box, Fab } from '@mui/material'

export default function FloatingSubmitButton() {
  let navigate = useNavigate();

  const handleAddPost = () => {
    navigate("/submit", { replace: true });
  };

  return (
    <Box sx={{display: 'flex', flexDirection: 'row-reverse', position:'sticky', bottom: 30}}>
      <Fab  sx={{marginRight:3, }} color="primary" aria-label="입력하기" onClick={handleAddPost}>
        <EditIcon />
      </Fab>
    </Box>
  )
}
