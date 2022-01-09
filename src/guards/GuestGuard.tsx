import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
// routes
import { PAGE_PATHS } from 'src/routing/paths';
import LoadingPage from 'src/pages/Misc/LoadingPage'

// ----------------------------------------------------------------------

type GuestGuardProps = {
  children: ReactNode;
};

export default function GuestGuard({ children }: GuestGuardProps) {
  const { user, isInitialized } = useAuth();

  if (!isInitialized) {
    return <LoadingPage />;
  }

  if (user) {
    return <Navigate to={PAGE_PATHS.dashboard.home} />;
  }

  return <>{children}</>;
}
