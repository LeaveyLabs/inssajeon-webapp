import { useState } from 'react';
import { Outlet } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, DialogTitle, FormGroup, Fab } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
// hooks
import useCollapseSidebar from '../../hooks/useCollapseSidebar';
import useResponsive from 'src/hooks/useResponsive';
//components
import DialogAnimate from 'src/components/animate/DialogAnimate'
import SubmitDialog from 'src/components/submit/SubmitDialog';
import Navbar from './navbar';
import Sidebar from './sidebar';
import FloatingSubmitButton from './FloatingSubmitButton';
// config
import {
  SIDEBAR_WIDTH_MOBILE,
  NAVBAR_HEIGHT,
} from '../../config';
//


// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('desktop')]: {
    marginRight: SIDEBAR_WIDTH_MOBILE,
  },
}));

const MainStyle = styled('main')(({ theme }) => ({
  paddingTop: NAVBAR_HEIGHT + 10,
}));

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------


export default function DashboardLayout() {
  //const { isCollapse } = useCollapseSidebar();
  const [open, setOpen] = useState(false);
  const isDesktop = useResponsive('up', 'desktop');
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <RootStyle>
      <Container maxWidth={'tablet'} >
        <Navbar onOpenSidebar={() => setOpen(true)} />
        <Sidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
        <MainStyle >
          <Outlet />
        </MainStyle>
        <FloatingSubmitButton handleDialogOpen={handleDialogOpen}/>
        <SubmitDialog handleClose={handleDialogClose} open={dialogOpen} />
      </Container>
    </RootStyle>
  );
}
