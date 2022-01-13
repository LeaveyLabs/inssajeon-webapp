import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import LoadingPage from 'src/pages/Misc/LoadingPage';
// routes
import { PAGE_PATHS } from 'src/routing/paths';
// hooks
import useAuth from '../hooks/useAuth';

// ----------------------------------------------------------------------

type GuestGuardProps = {
  children: ReactNode;
};

export default function GuestGuard({ children }: GuestGuardProps) {
  const { authedUser, isInitialized } = useAuth();

  if (!isInitialized) {
    return <LoadingPage />;
  }

  if (authedUser) {
    return <Navigate to={PAGE_PATHS.dashboard.home} />;
  }

  return <>{children}</>;
}
