import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
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
  const { pathname } = useLocation();

  if (!isInitialized) {
    return <LoadingPage />;
  }

  if (authedUser) { //if authed
    //if authed and >0 upvotes => nothing is allowed
    if (authedUser.nonauth.activity.upvotes.length > 0 ) {
      return <Navigate to={PAGE_PATHS.dashboard.home} />;
    }
    //else authed and has only 0 upvotes => only createProfilePage is allowed
    //IMPORTANT: this return expression here is actually what redirects the user from /signup to /create-profile after they submit the signup form
    else {
      if (pathname === PAGE_PATHS.auth.createProfile) {
        return <>{children}</>;
      } else {
        return <Navigate to={PAGE_PATHS.auth.createProfile} />;
      }
    }
  } else { //if unauthed
    //otherwise, user is unauthed. everything except for createProfilePage is allowed
    if (pathname === PAGE_PATHS.auth.createProfile) {
      return <Navigate to={PAGE_PATHS.auth.login} />;
    }
    return <>{children}</>;
  }
}
