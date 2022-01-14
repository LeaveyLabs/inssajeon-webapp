import { ReactNode } from 'react';
// pages
import LoadingPage from 'src/pages/Misc/LoadingPage';
// hooks
import useAuth from '../hooks/useAuth';
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
