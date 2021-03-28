import './App.css';
import Homepage from './pages/homepage/homepage.component';
import { Switch, Route, Redirect } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { useEffect } from 'react';
import {
  // addCollectionAndDocuments, 
  auth, createUserProfileDocument
} from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from './redux/user/user.selector';
import { createStructuredSelector } from 'reselect';
import CheckoutPage from './pages/checkout/checkout.component';
// import { selectCollectionsForPreview } from './redux/shop/shop.selectors';

const App = ({ setCurrentUser, currentUser
  // , collectionsArray 
}) => {
  let unsubscribeFromAuth = null;
  useEffect(
    () => {
      unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
        if (userAuth) {
          const userRef = await createUserProfileDocument(userAuth);

          userRef.onSnapshot(snapshot => {
            setCurrentUser({ id: snapshot.id, ...snapshot.data() });
          });
        }
        else {
          setCurrentUser(userAuth);
        }
        // addCollectionAndDocuments('collections', collectionsArray.map(({ title, items }) => ({ title, items })))
      })

      return () => {
        unsubscribeFromAuth();
      }
    }
    , [])

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/shop" component={ShopPage} />
        <Route exact path="/signin" render={() => currentUser ? (<Redirect to="/" />) : <SignInAndSignUpPage />} />
        <Route exact path="/checkout" component={CheckoutPage} />
      </Switch>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  // collectionsArray: selectCollectionsForPreview
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);