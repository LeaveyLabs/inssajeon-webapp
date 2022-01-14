import CloseIcon from '@mui/icons-material/Close';
import { Button, Divider, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
//mui
import { TransitionProps } from '@mui/material/transitions';
import * as React from 'react';
import { PAGE_PATHS } from 'src/routing/paths';
//components

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface SignupDialogProps {
  open: boolean;
  handleClose: VoidFunction
}

export default function SignupDialog( {open, handleClose}: SignupDialogProps ) {

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      TransitionComponent={Transition}
      fullWidth={true}
      maxWidth='tabletSlightlySmaller'
    >
      <DialogTitle sx={{ m: 0, p: 4, display: 'flex', justifyContent: 'center' }} >
        <div>
          <Typography variant="h3" >당신이 인싸 기능을 발결했다!</Typography> {/*typography within dialog title must be wrapped in a div to avoid error https://github.com/mbrn/material-table/issues/653*/}
        </div>
        <IconButton aria-label="close" onClick={handleClose} sx={{position: 'absolute', right: 10, top: 10, color: (theme) => theme.palette.grey[500],}}>
          <CloseIcon sx={{ fontSize: 35 }} />
        </IconButton>
      </DialogTitle>
      <Divider/>
      <DialogContent sx={{ p:4, display:'flex', flexDirection:'row', alignContent:'center', justifyContent:'center', alignItems:'center' }}>
        <Typography variant="h4" >이 기능을 사용하려먼&nbsp;&nbsp;</Typography>
        <Button component={Link} to={PAGE_PATHS.auth.login} variant="contained" size="large" >
          <Typography variant="h4" >가입</Typography>
        </Button>
        <Typography variant="h4" >&nbsp;해야 합니다.</Typography>
      </DialogContent>
    </Dialog>
  )
}
