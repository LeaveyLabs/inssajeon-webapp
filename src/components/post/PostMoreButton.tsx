import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { IconButton } from '@mui/material';

export default function PostMoreButton() {
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <IconButton {...bindTrigger(popupState)}>
            <MoreVertIcon />
          </IconButton>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close}>신고하기</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}