import { Container } from '@mui/material';
// @mui
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SubmitDialog from 'src/components/submit/SubmitDialog';
import useResponsive from 'src/hooks/useResponsive';
import FloatingSubmitButton from '../../components/submit/FloatingSubmitButton';
// config
import {
  NAVBAR_HEIGHT, SIDEBAR_WIDTH_DESKTOP
} from '../../config';
import Navbar from './navbar';
import Sidebar from './sidebar';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('desktop')]: {
    marginRight: SIDEBAR_WIDTH_DESKTOP,
  },
}));

const MainStyle = styled('main')(({ theme }) => ({
  paddingTop: NAVBAR_HEIGHT + 10,
}));

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
        <Navbar onOpenSidebar={() => setOpen(true)} handleDialogOpen={handleDialogOpen} />
        <Sidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
        <MainStyle >
          <Outlet />
        </MainStyle>
        {!isDesktop && <FloatingSubmitButton handleDialogOpen={handleDialogOpen}/>}
        <SubmitDialog handleClose={handleDialogClose} open={dialogOpen} />
      </Container>
    </RootStyle>
  );
}
