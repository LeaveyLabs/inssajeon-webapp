
//mui
import EditIcon from '@mui/icons-material/Edit';
import { Box, Fab, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import useAuth from 'src/hooks/useAuth';
import { useTheme } from '@mui/material';
//components

interface SubmitDialogProps {
  handleSubmitDialogOpen: VoidFunction;
  handleSignupDialogOpen: VoidFunction;
}

const TransitionFab = styled(Fab)(({ theme }) => ({
  transition: theme.transitions.create([
    "height",
    'width',
    'margin',
    'padding',
  ], {duration: theme.transitions.duration.complex}),
  width: 'auto',
  minWidth: 48, //fab button width
}));

  //   transition: theme.transitions.create('width', {
  //     duration: theme.transitions.duration.shorter,
  //   }),

const TransitionDiv = styled('div')(({ theme }) => ({
  transition: theme.transitions.create([
    "height",
    'width',
    'margin',
    'padding',
  ], {duration: theme.transitions.duration.complex}),
}));

export default function FloatingSubmitButton( {handleSubmitDialogOpen, handleSignupDialogOpen}: SubmitDialogProps  ) {
  const {authedUser} = useAuth();
  const theme = useTheme();

  let oldScrollY = 0;
  let threshhold = 50;
  const [scrollDirection, setScrollDirection] = useState('up');
  const controlScrollDirection = () => {
    if(window.scrollY > oldScrollY + threshhold) {
        setScrollDirection('down');
        oldScrollY = window.scrollY;
    } else if (window.scrollY < oldScrollY - threshhold) {
        setScrollDirection('up');
        oldScrollY = window.scrollY;
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', controlScrollDirection);
    return () => {
      window.removeEventListener('scroll', controlScrollDirection);
    };
  },[]);

  let handleClick = () => {
    if (authedUser) {
      handleSubmitDialogOpen();
    } else {
      handleSignupDialogOpen();
    }
  }

  return (
    <Box sx={{display: 'flex', flexDirection: 'row-reverse', position:'sticky', bottom: theme.spacing(3)}}>
      <TransitionFab size="large" variant={scrollDirection === 'up' ? "extended" : 'circular'} sx={{right: theme.spacing(3), height:48}} color="primary" aria-label="입력하기" onClick={handleClick}>
        <EditIcon />
        <TransitionDiv > 
          {scrollDirection === 'up' ? "작성하기": ""}
        </TransitionDiv>
      </TransitionFab>
    </Box>
  )
}
