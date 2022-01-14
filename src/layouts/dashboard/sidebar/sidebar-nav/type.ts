import { BoxProps } from '@mui/material';
import { ReactElement } from 'react';

// ----------------------------------------------------------------------

export type NavListProps = {
  title: string;
  path: string;
  icon?: ReactElement;
  info?: ReactElement;
  children?: {
    title: string;
    path: string;
    children?: { title: string; path: string }[];
  }[];
};

export type NavItemProps = {
  item: NavListProps;
  active: boolean;
  open?: boolean;
  onOpen?: VoidFunction;
};

export interface NavSectionProps extends BoxProps {
  navConfig: {
    subheader: string;
    items: NavListProps[];
  }[];
}
