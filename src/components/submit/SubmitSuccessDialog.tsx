import { Divider, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import * as React from 'react';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface SubmitSuccessDialogProps {
  open: boolean;
  handleClose: VoidFunction;
}

export default function SubmitSuccessDialog( {open, handleClose, }: SubmitSuccessDialogProps ) {

  return (
      <Dialog
        TransitionComponent={Transition}
        open={open}
        onClose={handleClose}
        aria-labelledby="submit-success-dialog"
        aria-describedby="submit-success-dialog"
      >
        <DialogTitle id="submit-success-dialog">
          <div>
            <Typography variant="h5" >게시물이 성공적으로 업로드되었습니다!</Typography> {/*typography within dialog title must be wrapped in a div to avoid error https://github.com/mbrn/material-table/issues/653*/}
          </div>
        </DialogTitle>
        <Divider variant="middle" />
        {/* <DialogContent>
          <DialogContentText id="alert-dialog-description">
            삭제하면, 회복할 수 없습니다.
          </DialogContentText>
        </DialogContent> */}
        <DialogActions>
          <Button onClick={handleClose} autoFocus>게시물 보기</Button>
        </DialogActions>
      </Dialog>
  );
}
