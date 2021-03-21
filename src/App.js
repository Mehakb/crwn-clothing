import './App.css';
import Homepage from './pages/homepage/homepage.component';
import { Switch, Route } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { useEffect, useState } from 'react';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { setCurrentUser } from "./redux/user/user.actions";
const App = ({ setCurrentUser }) => {
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
        <Route path="/signin" component={SignInAndSignUpPage} />
      </Switch>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(App);