import { ReactNode } from 'react';
// hooks
import useAuth from '../hooks/useAuth';
// pages
import LoadingPage from 'src/pages/Misc/LoadingPage'
// components

// ----------------------------------------------------------------------

type LoadingGuardProps = {
  children: ReactNode;
};

export default function AuthGuard({ children }: LoadingGuardProps) {
  const { isInitialized } = useAuth();
  if (!isInitialized) {
    return <LoadingPage />;
  }
  return <>{children}</>;
}
