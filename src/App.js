import './App.css';
import Homepage from './pages/homepage/homepage.component';
import { Switch, Route } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { useEffect, useState } from 'react';
import { auth } from './firebase/firebase.utils';

const App = () => {
  const [currentUser, setUser] = useState(null);

  let unsubscribeFromAuth = null;

  useEffect(
    () => {
      unsubscribeFromAuth = auth.onAuthStateChanged(user => setUser(user))

      return () => {
        unsubscribeFromAuth();
      }
    }
    , [])

  return (
    <div>
      <Header currentUser={currentUser} />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/signin" component={SignInAndSignUpPage} />
      </Switch>
    </div>
  );
}

export default App;
