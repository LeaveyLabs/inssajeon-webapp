import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Divider, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
//mui
import { styled } from '@mui/material/styles';
import { TransitionProps } from '@mui/material/transitions';
import * as React from 'react';
import SubmitDialogProfile from './SubmitDialogProfile';
//components
import SubmitForm from './SubmitForm';


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledSubmitDialog = styled(Dialog)(({ theme }) => ({
  [theme.breakpoints.down('tablet')]: {
    marginTop: theme.spacing(5),
  },
  '& .MuiDialog-paper': {
    [theme.breakpoints.down('tablet')]: {
      borderBottomRightRadius:0,
      borderBottomLeftRadius:0,
      }
},
}));

interface SubmitDialogProps {
  open: boolean;
  handleClose: VoidFunction
}

export default function SubmitDialog( {open, handleClose}: SubmitDialogProps ) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('tablet'));

  return (
    <StyledSubmitDialog 
      open={open} 
      onClose={handleClose} 
      TransitionComponent={Transition}
      fullWidth={true}
      maxWidth='tablet'
      fullScreen={fullScreen}
      scroll='paper'
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'center' }} >
        <div>
          <Typography variant="h2" >새 단어 정의하기</Typography> {/*typography within dialog title must be wrapped in a div to avoid error https://github.com/mbrn/material-table/issues/653*/}
        </div>
        <IconButton 
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 10,
            top: 10,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          {fullScreen ? <KeyboardArrowDownIcon sx={{ fontSize: 35 }} /> : <CloseIcon sx={{ fontSize: 35 }} />}
        </IconButton>
      </DialogTitle>
      <Divider/>
      <DialogContent sx={{ p:3,pb:10 }}>
        <SubmitDialogProfile />
        <SubmitForm handleClose={handleClose}/>
      </DialogContent>
    </StyledSubmitDialog>
  )
}
