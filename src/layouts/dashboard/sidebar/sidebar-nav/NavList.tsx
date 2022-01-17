// @mui
import { matchPath, useLocation } from 'react-router-dom';
//
import { NavItemRoot, NavItemSub } from './NavItem';
import { NavListProps } from './type';

// ----------------------------------------------------------------------

const getActive = (path: string, pathname: string) => {
  return path ? !!matchPath({ path: path, end: false, }, pathname) : false;
}

type NavListRootProps = {
  list: NavListProps;
};

export function NavListRoot({ list }: NavListRootProps) {
  const { pathname } = useLocation();
  let active = getActive(list.path, pathname);

  //need to home page unactive for paths != "/"
  if (list.path ==="/") {
    if (pathname !== "/") {
      active = false;
    }
  } 

  return <NavItemRoot item={list} active={active} />;
}

// ----------------------------------------------------------------------

type NavListSubProps = {
  list: NavListProps;
};

function NavListSub({ list }: NavListSubProps) {
  const { pathname } = useLocation();
  const activeRoot = getActive(list.path, pathname);

  return <NavItemSub item={list} active={activeRoot} />;
}
