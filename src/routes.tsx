import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import PlainLayout from './layouts/plain';
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
import SubmitPage from './pages/Submit/SubmitPage';

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
        { path: ':id', element: <ResultsPage /> },
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
      ],
    },
    //guestUser only routes
    { path: 'registration', element: <PlainLayout />, children: [
        { path: "*", element: <Navigate to="signup" replace />, index:true },
        { path: 'signup', element: <SignupPage /> },
        { path: 'login', element: <LoginPage/> },
        { path: 'forgot-password', element: <ForgotPasswordPage/> },
      ],
    },
    //registeredUser only routes
    { path: 'myaccount', children: [
        { path: "*", element: <Navigate to="settings" replace />, index:true },
        { path: 'settings', element: <PlainLayout/>, children: [
          { path: "*", element: <Navigate to="" replace />, index:true },
          { path: '', element: <SettingsPage /> },
        ]}
      ]
    },
    { path: 'submit', element: <PlainLayout/>, children: [
      { path: "*", element: <Navigate to="" replace />, index:true },
      { path: '', element: <SubmitPage /> },
    ]},
    { path: 'charts', element: <DashboardLayout />, children: [
      { path: "*", element: <Navigate to="" replace />, index:true },
      { path: '', element: <ChartsPage /> },
    ]},
    //404
    {
      path: '*',
      element: <PlainLayout />,
      children: [
        { path: '*', element: <Navigate to="/404" replace />, index:true },
        { path: '404', element: <PageNotFound /> },
      ],
    },
  ]);
}