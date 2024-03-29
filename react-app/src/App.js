import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
// import User from './components/User';
import { authenticate } from './store/session';
// import ListingForm from './components/listingform/ListingForm';
import MainPage from './components/mainpage';
// import SellPage from './components/sellpage';
import BrowsePage from './components/browsePage';
import BrowseFilterPage from './components/browsePage/browseFilterPage';
import ShoeProfilePage from './components/ShoeProfilePage';
import ShoeListingPage from './components/ShoeListingPage';
import ShoeListingFormPage from './components/ShoeListingPage/ShoeListingFormPage'
import ShoePurchasePage from './components/ShoeBuyingPage';
import ShoePurchaseFormPage from './components/ShoeBuyingPage/ShoePurchaseFormPage';
import CurrentUserListings from './components/usersListings';
import CurrentUserPurchases from './components/userPurchases';
// import UploadPicture from './components/ImagesForm';
import Footer from './components/footer';
import PageNotFound from './components/pageNotFound';
import ApparelForm from './components/apparelForm/ApparelForm';
import BrowsePageBrand from './components/browsePage/browsePageBrand';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
          <Footer />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
          <Footer />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <NavBar />
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/listings' exact={true} >
          <NavBar />
          <CurrentUserListings />
        </ProtectedRoute>
        <ProtectedRoute path='/users/purchases' exact={true} >
          <NavBar />
          <CurrentUserPurchases />
        </ProtectedRoute>
        <Route path='/shoe/:shoeId' exact={true} >
          <NavBar />
          <ShoeProfilePage />
        </Route>
        <ProtectedRoute path='/shoe/:shoeId/sell' exact={true} >
          <NavBar />
          <ShoeListingPage />
        </ProtectedRoute>
        <ProtectedRoute path='/shoe/:shoeId/sell/:sizeId' exact={true} >
          <NavBar />
          <ShoeListingFormPage />
        </ProtectedRoute>
        <ProtectedRoute path='/shoe/:shoeId/buy' exact={true} >
          <NavBar />
          <ShoePurchasePage />
        </ProtectedRoute>
        <ProtectedRoute path='/shoe/:shoeId/buy/:sizeId' exact={true} >
          <NavBar />
          <ShoePurchaseFormPage />
        </ProtectedRoute>
        <ProtectedRoute path='/add' exact={true} >
          <NavBar />
          <ApparelForm />
        </ProtectedRoute>
        <Route path='/shoes/:id' exact={true} >
          <NavBar />
          <BrowseFilterPage />
        </Route>
        <Route path='/shoes/:brand' exact={true} >
          <NavBar />
          <BrowsePageBrand />
        </Route>
        <Route path='/shoes' exact={true} >
          <NavBar />
          <BrowsePage />
        </Route>
        <Route path='/' exact={true} >
          <NavBar />
          <MainPage />
        </Route>
        <Route>
          <NavBar />
          <PageNotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
