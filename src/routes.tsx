import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
// components
import HomePage from './pages/Feeds/HomePage';
import PageNotFound from './pages/Misc/PageNotFound';
import UserPage from './pages/Feeds/UserPage';
import SignupPage from './pages/Registration/SignupPage';
import ForgotPasswordPage from './pages/Registration/ForgotPasswordPage';
import LoginPage from './pages/Registration/LoginPage';
import SettingsPage from './pages/Account/SettingsPage';
import ExplorePage from './pages/Feeds/ExplorePage';
import ResultsPage from './pages/Feeds/ResultsPage';
import ChartsPage from './pages/Charts/ChartsPage';

// ----------------------------------------------------------------------

 //TODO: create private pages
 //currentUser ? <Component {...props} /> : <Redirect to="/login" />

//notes:
// A route object has the same properties as a <Route> element. 
// The `children` is just an array of child routes

export default function Router() {
  return useRoutes([
    //(mostly) registeredUser and guestUser routes
    { path: '/', element: <DashboardLayout />, children: [
        { path: "*", element: <Navigate to="" replace />, index:true },
        { path: '', element: <HomePage /> },
        { path: 'categories', children: [
            { path: '', element: <ExplorePage /> },
            { path: ':id', element: <ResultsPage /> },
          ]
        },
        { path: 'users', children: [
            { path: ':id', element: <UserPage /> },
            { path: 'me', element: <UserPage /> },
          ]
        },
        { path: 'search', children: [
            { path: ':id', element: <ResultsPage /> },
          ]
        },
      ],
    },
    //guestUser only routes
    { path: 'registration', element: <LogoOnlyLayout />, children: [
        { path: "*", element: <Navigate to="signup" replace />, index:true },
        { path: 'signup', element: <SignupPage /> },
        { path: 'login', element: <LoginPage/> },
        { path: 'forgot-password', element: <ForgotPasswordPage/> },
      ],
    },
    //registeredUser only routes
    { path: 'myaccount', children: [
        { path: "*", element: <Navigate to="settings" replace />, index:true },
        { path: 'settings', element: <LogoOnlyLayout/>, children: [
          { path: "*", element: <Navigate to="" replace />, index:true },
          { path: '', element: <SettingsPage /> },
        ]}
      ]
    },
    { path: 'charts', element: <DashboardLayout />, children: [
      { path: "*", element: <Navigate to="" replace />, index:true },
      { path: '', element: <ChartsPage /> },
    ]},
    //404
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '*', element: <Navigate to="/404" replace />, index:true },
        { path: '404', element: <PageNotFound /> },
      ],
    },
  ]);
}