import { ElementType, lazy, Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import AuthGuard from 'src/guards/AuthGuard';
import GuestGuard from 'src/guards/GuestGuard';
import EmptyLayout from 'src/layouts/EmptyLayout';
import PlainLayout from 'src/layouts/PlainLayout';
import LoadingPage from 'src/pages/Misc/LoadingPage';

import DashboardLayout from '../layouts/dashboard';
import { PAGE_PATHS } from './paths';

//guards
// layouts
//extra
// ----------------------------------------------------------------------

//loadable is depcreated but gets the job done for a loadingpage
const Loadable = (Component: ElementType) => (props: any) => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Component {...props} />
    </Suspense>
  );
};

//useRoutes notes:
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
        { path: PAGE_PATHS.auth.createProfile, element: <CreateProfilePage/> }, //TODO this can only be accessed from the link firebase sends them
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

// PAGES
// Feeds
const HomePage = Loadable(lazy(() => import('../pages/Feeds/HomePage')));
const UsersPage = Loadable(lazy(() => import('../pages/Feeds/UsersPage')));
//const ExplorePage = Loadable(lazy(() => import('../pages/Feeds/ExplorePage')));
const WordsPage = Loadable(lazy(() => import('../pages/Feeds/WordsPage')));
const CategoriesPage = Loadable(lazy(() => import('../pages/Feeds/CategoriesPage')));
const PostPage = Loadable(lazy(() => import('../pages/Feeds/PostPage')));
const MyProfilePage = Loadable(lazy(() => import('../pages/Feeds/MyProfilePage')));
const ProfilePage = Loadable(lazy(() => import('../pages/Feeds/ProfilePage')));

// Misc
const PageNotFound = Loadable(lazy(() => import('../pages/Misc/PageNotFound')));

// FTUX

// Authentication
const LoginPage = Loadable(lazy(() => import('../pages/Auth/LoginPage')));
const SignupPage = Loadable(lazy(() => import('../pages/Auth/SignupPage')));
const ResetPasswordPage = Loadable(lazy(() => import('../pages/Auth/ResetPasswordPage')));
const ForgotPasswordPage = Loadable(lazy(() => import('src/pages/Auth/ForgotPasswordPage')));
const CreateProfilePage = Loadable(lazy(() => import('src/pages/Auth/CreateProfilePage')));

// Information
const PrivacyPage = Loadable(lazy(() => import( '../pages/Information/PrivacyPage') ));
const TermsPage = Loadable(lazy(() => import( '../pages/Information/TermsPage') ));
const AboutPage = Loadable(lazy(() => import( '../pages/Information/AboutPage') ));
const FAQPage = Loadable(lazy(() => import( '../pages/Information/FAQPage') ));

// Charts
//const ChartsPage = Loadable(lazy(() => import( '../pages/Charts/ChartsPage') ));

// Accounto
const ComingSoonPage = Loadable(lazy(() => import( '../pages/Misc/ComingSoonPage') ));
const SettingsPage = Loadable(lazy(() => import( '../pages/Account/SettingsPage') ));