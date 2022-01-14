
//mui
import EditIcon from '@mui/icons-material/Edit';
import { Box, Fab } from '@mui/material';
//components

interface SubmitDialogProps {
  handleDialogOpen: VoidFunction
}

export default function FloatingSubmitButton( {handleDialogOpen}: SubmitDialogProps  ) {
  return (
    <Box sx={{display: 'flex', flexDirection: 'row-reverse', position:'sticky', bottom: 30}}>
      <Fab  sx={{marginRight:3, }} color="primary" aria-label="입력하기" onClick={handleDialogOpen}>
        <EditIcon />
      </Fab>
    </Box>
  )
}
