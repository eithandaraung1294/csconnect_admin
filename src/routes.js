import { Route, Routes, Navigate } from "react-router-dom";
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import {
  DashboardAppPage, 
  UserPage, 
  CategoryPage, 
  BlogPage, 
  LoginPage, 
  Page404, 
  WelcomePage, 
  AddNewUserPage, 
  EditUserPage, 
  AddNewCategoryPage,
  EditCategoryPage,
  AddNewBlogPage,
  ViewBlogPage,
  EditBlogPage,
  NavBarMenuPage,
  AddNewNavBarMenuPage,
  EditNavBarMenuPage,
  NavBarSubMenuPage,
  AddNewNavBarSubMenuPage,
  EditNavBarSubMenuPage,
  ViewPage,
  LogoPage,
  BannerPage,
  AddBannerPage,
  HeroesTextPage,
  AddHeroesTextPage,
  EditHeroesPeoplePage,
  FeaturePage,
  AddFeaturePage,
  EditFeaturePage,
  MapPage
} from './pages';
import { RequireAuth } from "./components/require-auth";
import { PersistLogin } from "./components/persist-login";
import HeroesPeoplePage from "./pages/heroes-people/HeroesPeoplePage";
import AddHeroesPeoplePage from "./pages/heroes-people/AddHeroesPeoplePage";

// ----------------------------------------------------------------------

export default function Router() {
  return (
    <Routes>
      <Route  path = "/" element={<WelcomePage />}/>
      <Route  path = "/login" element={<LoginPage />}/>
      {/* <Route  path = "/register" element={<Register />}/> */}
      <Route element={<PersistLogin />}>

        <Route path = "/dashboard" element={<DashboardLayout />} >
          {/* <Route element={<Navigate to="/dashboard/app"/>}/> */}

            <Route element={<RequireAuth />}>
              <Route path="app" element={<DashboardAppPage />} />

              {/* Navbar Menu */}
              <Route path="navbar-menus" element={<NavBarMenuPage />} />
              <Route path="navbar-menus/create" element={<AddNewNavBarMenuPage />} />
              <Route path="navbar-menus/edit/:id" element={<EditNavBarMenuPage />} />

              {/* Navbar Sub Menu */}
              <Route path="navbar-sub-menus" element={<NavBarSubMenuPage />} />
              <Route path="navbar-sub-menus/create" element={<AddNewNavBarSubMenuPage />} />
              <Route path="navbar-sub-menus/edit/:id" element={<EditNavBarSubMenuPage />} />
              <Route path="navbar-sub-menus/:id" element={<ViewPage />} />

              {/* Logo */}
              <Route path="logo" element={<LogoPage />} />
              
              {/* banner */}
              <Route path="banner" element={<BannerPage />} />
              <Route path="banner/create" element={<AddBannerPage />} />

               {/* Feature */}
              <Route path="feature" element={<FeaturePage />} />
              <Route path="feature/create" element={<AddFeaturePage />} />
              <Route path="feature/edit/:id" element={<EditFeaturePage />} />
              {/* Map */}
              <Route path="map" element={<MapPage />} />
              
              {/* herores-text */}
              <Route path="heroes-text" element={<HeroesTextPage />} />
              <Route path="heroes-text/create" element={<AddHeroesTextPage />} />

              {/* heroes people */}
              <Route path="heroes-people" element={<HeroesPeoplePage />} />
              <Route path="heroes-people/create" element={<AddHeroesPeoplePage />} />
              <Route path="heroes-people/edit/:id" element={<EditHeroesPeoplePage />} />

              {/* users */}
              <Route path="users" element={<UserPage />} />
              <Route path="users/create" element={<AddNewUserPage />} />
              <Route path="users/edit/:id" element={<EditUserPage />} />

              {/* categories */}
              <Route path="categories" element={<CategoryPage />} />
              <Route path="categories/create" element={<AddNewCategoryPage />} />
              <Route path="categories/edit/:id" element={<EditCategoryPage />} />

              {/* blog */}
              <Route path="blogs" element={<BlogPage />} />
              <Route path="blogs/create" element={<AddNewBlogPage />} />
              <Route path="blogs/detail" element={<ViewBlogPage />} />
              <Route path="blogs/edit" element={<EditBlogPage />} />
            </Route>

        </Route>
      </Route>
      <Route element={<SimpleLayout />} >
        {/* <Route element={<Navigate to="/dashboard/app" />}/> */}
        <Route path="404" element={<Page404 />} />
        <Route path="*" element={<Navigate to="/404"/>} />
      </Route>
    </Routes>
);
}
