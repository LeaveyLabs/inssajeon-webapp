
import { Outlet } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
// ----------------------------------------------------------------------

const MainStyle = styled('main')(({ theme }) => ({

}));

// -------------------------------------


export default function EmptyLayout() {

  return (
    <MainStyle sx={{height:'100%'}}>
      <Outlet />
    </MainStyle>
    
  );
}