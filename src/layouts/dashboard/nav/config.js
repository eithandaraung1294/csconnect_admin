// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'users',
    path: '/dashboard/users',
    icon: icon('ic_user'),
  },
  {
    title: 'Navbar Menu',
    path: '/dashboard/navbar-menus',
    icon: icon('ic_lock'),
  },

  {
    title: 'Navbar SubMenu',
    path: '/dashboard/navbar-sub-menus',
    icon: icon('ic_battery'),
  },
  {
    title: 'Logo',
    path: '/dashboard/logo',
    icon: icon('ic_heart'),
  },
  {
    title: 'Banner',
    path: '/dashboard/banner',
    icon: icon('ic_clock'),
  },
  {
    title: 'Feature',
    path: '/dashboard/feature',
    icon: icon('ic_feature'),
  },
  {
    title: 'Heroes Text',
    path: '/dashboard/heroes-text',
    icon: icon('ic_book'),
  },
  {
    title: 'Heroes People',
    path: '/dashboard/heroes-people',
    icon: icon('ic_heroes'),
  },
  {
    title: 'Map',
    path: '/dashboard/map',
    icon: icon('ic_map'),
  },
  {
    title: 'Categories',
    path: '/dashboard/categories',
    icon: icon('ic_cart'),
  },
  {
    title: 'blogs',
    path: '/dashboard/blogs',
    icon: icon('ic_blog'),
  },
  // {
  //   title: 'logout',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
