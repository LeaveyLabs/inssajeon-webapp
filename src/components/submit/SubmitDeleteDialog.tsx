import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Divider} from '@mui/material'
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Typography } from '@mui/material';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface SubmitDeleteDialogProps {
  open: boolean;
  handleClose: VoidFunction;
  handleConfirmDelete: VoidFunction;
}

export default function SubmitDeleteDialog( {open, handleClose, handleConfirmDelete}: SubmitDeleteDialogProps ) {

  return (
      <Dialog
        TransitionComponent={Transition}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant="h5" color="error">
            "정말로 초안을 삭제하고 싶으세요?"
          </Typography>
        </DialogTitle>
        <Divider variant="middle" />
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            삭제하면, 회복할 수 없습니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>아니요, 돟아가겠습니다</Button>
          <Button color="error" onClick={handleConfirmDelete}>예, 삭제</Button>
        </DialogActions>
      </Dialog>
  );
}
