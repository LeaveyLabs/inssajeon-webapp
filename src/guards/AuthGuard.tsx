import { ReactNode, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// pages
import LoginPage from 'src/pages/Auth/LoginPage';
import LoadingPage from 'src/pages/Misc/LoadingPage';
// hooks
import useAuth from '../hooks/useAuth';
// components

// ----------------------------------------------------------------------

type AuthGuardProps = {
  children: ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const { authedUser, isInitialized } = useAuth();
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);

  if (!isInitialized) {
    return <LoadingPage />;
  }

  if (!authedUser) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <LoginPage />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
