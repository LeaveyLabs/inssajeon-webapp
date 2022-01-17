import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';
import * as React from 'react';
import { UserEntity } from 'src/db/entities/users/UserEntity';
import useAuth from 'src/hooks/useAuth';
import { useSignupDialog } from 'src/layouts/dashboard';

interface ProfileMoreButtonProps {
  profileUser: UserEntity;
}

//TODO THIS COMPONENT HAS BARELY BEEN TOUCHED I JUST COPY AND PASTED POST MORE BUTTON CODE OVER HERE
export default function ProfileMoreButton( {profileUser} : ProfileMoreButtonProps ) {
  let {authedUser} = useAuth();
  const [isFlagged, setIsFlagged] = React.useState(false);
  const handleSignupDialogOpen = useSignupDialog();

  const handleFlagPost = () => {
    if (!authedUser) {
      handleSignupDialogOpen()
    } else if (isFlagged) {
      //TODO "you already flagged this"
    } else {
      setIsFlagged(true);
      //TODO openFlagDialogue
    }
  }

  // const handleBlockUser = () => {
  //   if (!authedUser) {
  //     handleSignupDialog()
  //   } else if (isFlagged) {
  //     //TODO "you already flagged this"
  //   } else {
  //     setIsFlagged(true);
  //     //TODO openFlagDialogue
  //   }
  // }

  //notes on custom hook for menu: https://github.com/jcoreio/material-ui-popup-state
  return (
    <PopupState 
      variant="popover" 
      popupId="demo-popup-menu"
    >
      {(popupState) => (
        <React.Fragment>
          <IconButton {...bindTrigger(popupState)}>
            <MoreVertIcon />
          </IconButton>
          <Menu 
            {...bindMenu(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}>
            <MenuItem onClick={() => {popupState.close(); handleFlagPost(); } }>신고하기</MenuItem>
            {/* <MenuItem onClick={() => {popupState.close(); handleBlockUser(); } }>이 사용자을 차단하기</MenuItem> */}
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}