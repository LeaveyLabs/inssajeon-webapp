function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_MYACCOUNT = '/myaccount';

// ----------------------------------------------------------------------

//ATTENTION:: BE SURE TO CHANGE PATH NAME HERE *as well as* IN ROUTES.TSX. NESTED ROUTES IN ROUTES.TSX CANT USE THESE CONSTANTS
export const PAGE_PATHS = {
  auth: {
    login: '/login',
    signup: '/signup',
    forgot: '/forgot-password',
    reset: '/reset-password', 
    createProfile: '/create-profile',
  },
  page: {
    comingSoon: '/coming-soon',
    maintenance: '/maintenance',
    about: '/about',
    contact: '/contact',
    privacy: '/privacy',
    terms: '/terms',
    faq: '/faq',
    page404: '/404',
    //where to put these below? decide later
    myAccount: {
      home: path(ROOTS_MYACCOUNT, ''),
      settings: path(ROOTS_MYACCOUNT, 'settings'),
    }
  },
  dashboard: {
    home: '/',
    users: '/users',
    words: '/words',
    categories: '/categories',
    charts: '/charts',
    post: '/post',
    profile: '/profile',
  }
};