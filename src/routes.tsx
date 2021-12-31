import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import PlainLayout from './layouts/plain';
// PAGES
// Feeds
import HomePage from './pages/Feeds/HomePage';
import UsersPage from './pages/Feeds/UsersPage';
import ExplorePage from './pages/Feeds/ExplorePage';
import WordsPage from './pages/Feeds/WordsPage';
import CategoriesPage from './pages/Feeds/CategoriesPage';
import PostPage from './pages/Feeds/PostPage';
import MyProfilePage from './pages/Feeds/MyProfilePage';
import ProfilePage from './pages/Feeds/ProfilePage';

// Misc
import PageNotFound from './pages/Misc/PageNotFound';

// FTUX

// Information
import PrivacyPage from './pages/Information/PrivacyPage';
import TermsPage from './pages/Information/TermsPage';
import AboutPage from './pages/Information/AboutPage';
import FAQPage from './pages/Information/FAQPage';

// Registration
import SignupPage from './pages/Registration/SignupPage';
import ForgotPasswordPage from './pages/Registration/ForgotPasswordPage';
import LoginPage from './pages/Registration/LoginPage';

// Charts
import ChartsPage from './pages/Charts/ChartsPage';

// Account
import SettingsPage from './pages/Account/SettingsPage';
import ComingSoonPage from './pages/Misc/ComingSoonPage';


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
            { path: 'profile', children: [  //TODO: 'profile' must be an unallowed username
                { path: 'me', element: <MyProfilePage /> }, //**registeredUser only route
                { path: ':id', element: <ProfilePage /> }, //TODO auto navigate to 'me' if :id matches registeredUser's id
              ] 
            },
          ]
        },
        { path: 'post', children: [
            { path: ':id', element: <PostPage /> }, //displays that particular post first, followed by top trending posts on inssajeon
          ]
        },
      ],
    },
    { path: '/', element: <DashboardLayout />, children: [
        { path: 'about', element: <AboutPage /> },
        { path: 'privacy', element: <PrivacyPage/> },
        { path: 'terms', element: <TermsPage/> },
        { path: 'faq', element: <FAQPage/> },
      ],
    },
    //guestUser only routes
    { path: 'registration', element: <DashboardLayout />, children: [
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
    { path: 'charts', element: <DashboardLayout />, children: [
      { path: "*", element: <Navigate to="" replace />, index:true },
      { path: '', element: <ComingSoonPage /> },
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