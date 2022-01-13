import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';
import * as React from 'react';

export default function PostMoreButton() {
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
            <MenuItem onClick={popupState.close}>신고하기</MenuItem>
            <MenuItem onClick={popupState.close}>이 사용자을 차단하기</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}