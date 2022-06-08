export const ROUTES = [
  {
    path: '/',
    label: 'Home',
    exact: true,
  },
  {
    path: '/posts',
    label: 'Posts',
  },
  {
    path: '/projects',
    label: 'Work',
  },
  {
    path: '/about',
    label: 'About',
  },
]

export const ADMIN_ROUTES = [
  {
    path: '/',
    label: 'Home',
    exact: true,
  },
  {
    path: '/admin/dashboard',
    label: 'Dashboard',
  },
  {
    path: '/admin/dashboard/users',
    label: 'Users',
  },
]

export const POST_TABLE_HEADINGS = [
  'title',
  'views',
  'likes',
  'comments',
  'actions',
]
export const USER_TABLE_HEADINGS = ['username', 'email', 'comments', 'actions']
