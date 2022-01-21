import { Container } from '@mui/material';
// @mui
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import SignupDialog from 'src/components/auth/SignupDialog';
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
  const [open, setOpen] = useState(false);
  const isDesktop = useResponsive('up', 'desktop');
  const [signupDialogOpen, setSignupDialogOpen] = useState(false);
  const [submitDialogOpen, setSubmitDialogOpen] = useState(false);
  
  const handleSubmitDialogOpen = () => { setSubmitDialogOpen(true); };
  const handleSubmitDialogClose = () => { setSubmitDialogOpen(false); };
  const handleSignupDialogOpen = () => { setSignupDialogOpen(true); };
  const handleSignupDialogClose = () => { setSignupDialogOpen(false); };

  return (
    <RootStyle sx={{backgroundColor: 'green', minHeight:'100%'}} >
      <Container sx={{height:'100%', backgroundColor:'black'}} maxWidth={'tablet'} >
        <Navbar onOpenSidebar={() => setOpen(true)} handleSignupDialogOpen={handleSignupDialogOpen} handleSubmitDialogOpen={handleSubmitDialogOpen} />
        <Sidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
        <MainStyle >
          <Outlet context={handleSignupDialogOpen}/>
        </MainStyle>
        {!isDesktop && <FloatingSubmitButton handleSignupDialogOpen={handleSignupDialogOpen} handleSubmitDialogOpen={handleSubmitDialogOpen}/>}
        <SubmitDialog handleClose={handleSubmitDialogClose} open={submitDialogOpen} />
        <SignupDialog handleClose={handleSignupDialogClose} open={signupDialogOpen} />
      </Container>

    </RootStyle>
  );
}

//custom hook for children within Outlet to have access to handleSignupDialogOpen function
//reference: https://reactrouter.com/docs/en/v6/api#useoutletcontext
export function useSignupDialog() {
  return useOutletContext<VoidFunction>(); 
}
