
//mui
import EditIcon from '@mui/icons-material/Edit';
import { Box, Fab } from '@mui/material';
import useAuth from 'src/hooks/useAuth';
//components

interface SubmitDialogProps {
  handleSubmitDialogOpen: VoidFunction;
  handleSignupDialogOpen: VoidFunction;
}

export default function FloatingSubmitButton( {handleSubmitDialogOpen, handleSignupDialogOpen}: SubmitDialogProps  ) {
  const {authedUser} = useAuth();

  let handleClick = () => {
    if (authedUser) {
      handleSubmitDialogOpen();
    } else {
      handleSignupDialogOpen();
    }
  }

  return (
    <Box sx={{display: 'flex', flexDirection: 'row-reverse', position:'sticky', bottom: 30}}>
      <Fab  sx={{marginRight:3, }} color="primary" aria-label="입력하기" onClick={handleClick}>
        <EditIcon />
      </Fab>
    </Box>
  )
}
