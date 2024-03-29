// @mui
import { Box, List, ListSubheader } from '@mui/material';
import { styled } from '@mui/material/styles';
import { NavListRoot } from './NavList';
//
import { NavSectionProps } from './type';

// ----------------------------------------------------------------------

export const ListSubheaderStyle = styled((props) => (
  <ListSubheader disableSticky disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.overline,
  paddingTop: theme.spacing(2),
  paddingLeft: theme.spacing(2),
  paddingBottom: theme.spacing(1),
  color: theme.palette.text.primary,
}));

// ----------------------------------------------------------------------

export default function NavSection({ navConfig,  ...other }: NavSectionProps) {
  return (
    <Box {...other}>
      {navConfig.map((group) => (
        <List key={group.subheader} disablePadding sx={{ px: 2 }}>
          <ListSubheaderStyle>
            {group.subheader}
          </ListSubheaderStyle>

          {group.items.map((list) => (
            <NavListRoot key={list.title} list={list} />
          ))}
        </List>
      ))}
    </Box>
  );
}
