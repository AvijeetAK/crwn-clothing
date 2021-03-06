import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component' ;

import ShopPage from './pages/shop/shop.component.jsx'

import Header from './components/header/header.component';

import SignInAndSignUpPage from './pages/signinandsignuppage/signinandsignuppage.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { canConstructResponseFromBodyStream } from 'workbox-core/_private';




class App extends React.Component {


  
  constructor() {

    super();

    this.state = {

      
      currentUser : null 
    }
  }


    unsubscribeFromAuth = null ;

    componentDidMount() {

      this.unsubscribeFromAuth =   auth.onAuthStateChanged( async userAuth => {

        if(userAuth){

          const userRef = await createUserProfileDocument(userAuth);

          userRef.onSnapshot(snapshot => {

            this.setState(
              {

              currentUser: {

                  id: snapshot.id,
                  ...snapshot.data()

             }

            })

           

          });

          this.setState(this.currentUser = userAuth);
        }

        });

    }


    componentWillUnmount() {

      this.unsubscribeFromAuth();

    }
  render() {

    return (
      <div>
  
          <Header currentUser = { this.state.currentUser } />
        <Switch>
        <Route exact path='/'  component={HomePage}  />
        <Route path='/shop'  component={ShopPage}  />
        <Route path='/signin'  component={SignInAndSignUpPage}  />
  
        </Switch>
       
      </div>
    );

  }
  
}
 
export default App;
