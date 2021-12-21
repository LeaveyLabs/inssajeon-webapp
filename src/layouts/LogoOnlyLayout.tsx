import { Outlet } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
// components
import ClickwableWideLogo from '../components/ClickableWideLogo';
//etc
import { NAVBAR_HEIGHT } from 'src/config';
// ----------------------------------------------------------------------

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  position: 'absolute',
  backgroundColor:'green',
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up('tablet')]: {
    padding: theme.spacing(5, 5, 0)
  }
}));

const MainStyle = styled('main')(({ theme }) => ({
  flexGrow: 1,
  paddingTop: NAVBAR_HEIGHT + 10,
  paddingBottom: 0,
}));


// ----------------------------------------------------------------------

export default function LogoOnlyLayout() {
  return (
    <>
      <HeaderStyle>
        <ClickwableWideLogo />
      </HeaderStyle>
      <MainStyle>
        <Outlet />
      </MainStyle>
    </>
  );
}
