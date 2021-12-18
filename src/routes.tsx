import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
// components
import PageOne from './pages/PageOne';
import Page404 from './pages/Page404';

// ----------------------------------------------------------------------

 //currentUser ? <Component {...props} /> : <Redirect to="/login" />

//notes:
// A route object has the same properties as a <Route> element. 
// The `children` is just an array of child routes

export default function Router() {
  return useRoutes([
    //(mostly) registeredUser and guestUser routes
    { path: '/', element: <DashboardLayout />, children: [
        { path: "*", element: <Navigate to="" replace />, index:true },
        { path: '', element: <PageOne /> },
        { path: 'tags', children: [
            { path: '', element: <PageOne /> },
            { path: ':id', element: <PageOne /> },
          ]
        },
        { path: 'users', children: [
            { path: ':id', element: <PageOne /> },
            { path: 'me', element: <PageOne /> },
          ]
        },
        { path: 'search', children: [
            { path: ':id', element: <PageOne /> },
          ]
        },
      ],
    },
    //guestUser only routes
    { path: 'registration', element: <LogoOnlyLayout />, children: [
        { path: "*", element: <Navigate to="signup" replace />, index:true },
        { path: 'signup', element: <PageOne /> },
        { path: 'login', element: <PageOne/> },
        { path: 'forgot-password', element: <PageOne/> },
      ],
    },
    //registeredUser only routes
    { path: 'myaccount', children: [
        { path: "*", element: <Navigate to="settings" replace />, index:true },
        { path: 'settings', element: <LogoOnlyLayout/>, children: [
          { path: "*", element: <Navigate to="" replace />, index:true },
          { path: '', element: <PageOne /> },
        ]}
      ]
    },
    //404
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" replace />, index:true },
      ],
    },
  ]);
}