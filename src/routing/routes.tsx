import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import PlainLayout from 'src/layouts/PlainLayout';
import EmptyLayout from 'src/layouts/EmptyLayout';
// PAGES
// Feeds
import HomePage from '../pages/Feeds/HomePage';
import UsersPage from '../pages/Feeds/UsersPage';
import ExplorePage from '../pages/Feeds/ExplorePage';
import WordsPage from '../pages/Feeds/WordsPage';
import CategoriesPage from '../pages/Feeds/CategoriesPage';
import PostPage from '../pages/Feeds/PostPage';
import MyProfilePage from '../pages/Feeds/MyProfilePage';
import ProfilePage from '../pages/Feeds/ProfilePage';

// Misc
import PageNotFound from '../pages/Misc/PageNotFound';

//guards
import AuthGuard from 'src/guards/AuthGuard';
import GuestGuard from 'src/guards/GuestGuard';

// FTUX

// Information
import PrivacyPage from '../pages/Information/PrivacyPage';
import TermsPage from '../pages/Information/TermsPage';
import AboutPage from '../pages/Information/AboutPage';
import FAQPage from '../pages/Information/FAQPage';

// Registration
import SignupPage from '../pages/Auth/SignupPage';
import ResetPasswordPage from '../pages/Auth/ResetPasswordPage';
import ForgotPasswordPage from 'src/pages/Auth/ForgotPasswordPage';
import LoginPage from '../pages/Auth/LoginPage';

// Charts
import ChartsPage from '../pages/Charts/ChartsPage';

// Account
import SettingsPage from '../pages/Account/SettingsPage';
import ComingSoonPage from '../pages/Misc/ComingSoonPage';

import { PAGE_PATHS } from './paths';

// ----------------------------------------------------------------------

 //TODO: create private pages
 //currentUser ? <Component {...props} /> : <Redirect to="/login" />

//notes:
// A route object has the same properties as a <Route> element. 
// The `children` is just an array of child routes

export default function Router() {
  return useRoutes([
    //(mostly) BOTH registeredUser and guestUser routes**
    { path: '/', element: <DashboardLayout />, children: [
        { path: '', element: <HomePage /> },
        { path: 'words', children: [
            { path: ':id', element: <WordsPage /> }, //search results for that word/phrase
          ]
        },
        { path: 'categories', children: [
            { path: '', element: <ComingSoonPage /> },
            { path: ':id', element: <CategoriesPage /> },
          ]
        },
        { path: 'users', children: [
            { path: ':id', element: <UsersPage /> },
          ]
        },
        { path: 'post', children: [
            { path: ':id', element: <PostPage /> }, //displays that particular post first, followed by top trending posts on inssajeon
          ]
        },
        { path: 'profile', children: [  //TODO: 'profile' and 'me' must be an unallowed username
            { path: 'me', element: <AuthGuard><MyProfilePage/></AuthGuard> }, //**registeredUser only route
            { path: ':id', element: <ProfilePage /> }, //TODO auto navigate to 'me' if :id matches registeredUser's id
          ] 
        },
      ],
    },
    { path: '/', element: <DashboardLayout />, children: [
        { path: PAGE_PATHS.page.about, element: <AboutPage /> },
        { path: PAGE_PATHS.page.privacy, element: <PrivacyPage/> },
        { path: PAGE_PATHS.page.terms, element: <TermsPage/> },
        { path: PAGE_PATHS.page.faq, element: <FAQPage/> },
      ],
    },
    //guestUser only routes
    { path: '/', element:<GuestGuard><EmptyLayout/></GuestGuard>, children: [
        { path: "*", element: <Navigate to={PAGE_PATHS.auth.signup} replace />, index:true },
        { path: PAGE_PATHS.auth.signup, element: <SignupPage /> },
        { path: PAGE_PATHS.auth.login, element: <LoginPage/> },
        { path: PAGE_PATHS.auth.forgot, element: <ForgotPasswordPage/> },
        { path: PAGE_PATHS.auth.reset, element: <ResetPasswordPage/> }, //TODO this can only be accessed from the link firebase sends them
      ],
    },
    //registeredUser only routes
    { path: 'myaccount', element:<AuthGuard><EmptyLayout/></AuthGuard>, children: [
        { path: "*", element: <Navigate to="settings" replace />, index:true },
        { path: 'settings', element: <PlainLayout/>, children: [
          { path: "*", element: <Navigate to="" replace />, index:true },
          { path: '', element: <SettingsPage /> },
        ]}
      ]
    },
    { path: 'charts', element: <DashboardLayout />, children: [
      { path: "*", element: <Navigate to="" replace />, index:true },
      { path: '', element: <ComingSoonPage /> },
    ]},
    //404
    {
      path: '/',
      element: <PlainLayout />,
      children: [
        { path: '*', element: <Navigate to={PAGE_PATHS.page.page404} replace />, index:true },
        { path: PAGE_PATHS.page.page404, element: <PageNotFound /> },
      ],
    },
  ]);
}