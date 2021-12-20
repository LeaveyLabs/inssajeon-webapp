import { useState } from 'react';
import { Outlet } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, DialogTitle, FormGroup, Fab } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
// hooks
import useCollapseSidebar from '../../hooks/useCollapseSidebar';
//components
import DialogAnimate from 'src/components/animate/DialogAnimate'
// config
import {
  SIDEBAR_WIDTH,
  NAVBAR_HEIGHT,
  SIDEBAR_COLLAPSE_WIDTH,
} from '../../config';
//
import Navbar from './navbar';
import Sidebar from './sidebar';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('desktop')]: {
    display: 'flex',
    minHeight: '100%',
  },
}));

type MainStyleProps = {
  isCollapse: boolean | undefined;
};

const MainStyle = styled('main', {
  shouldForwardProp: (prop) => prop !== 'collapseClick',
})<MainStyleProps>(({ isCollapse: collapseClick, theme }) => ({
  flexGrow: 1,
  paddingTop: NAVBAR_HEIGHT + 24,
  paddingBottom: NAVBAR_HEIGHT + 24,
}));

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------


export default function DashboardLayout() {
  const { isCollapse } = useCollapseSidebar();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [open, setOpen] = useState(false);

  const handleAddPost = () => {
    setIsOpenModal(true)
  };
  
  const handleCloseModal = () => {
    setIsOpenModal(false)
  };

  return (
    <RootStyle>
      <Navbar onOpenSidebar={() => setOpen(true)} />
      <Sidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      <DialogAnimate open={isOpenModal} onClose={handleCloseModal}>
        <DialogTitle>{'Add Post'}</DialogTitle>
        <FormGroup
        />
      </DialogAnimate>
      <MainStyle isCollapse={isCollapse}>
        <Outlet />
        <Fab variant="extended" size="large" color="primary" aria-label="add" onClick={handleAddPost}>
          <EditIcon />
          단어 정의하기
        </Fab>
      </MainStyle>
    </RootStyle>
  );
}
