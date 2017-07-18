import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, History, Link, BrowserHistory } from 'react-router-dom';
import App from './App';
import './Welcome.css';
import SignUp from './components/pages/SignUp';
import urlFor from './helpers/urlFor';
import userAuth from './helpers/userAuth';
import axios from 'axios';
import New from './components/Sessions/New';
import Flash from './components/Flash';

class Welcome extends Component {
  constructor (props) {
    super(props);
    this.state = {
      signedIn: localStorage.getItem('signedIn'),
      error: '',
      user: {}
    };
  }

  signIn = (data) => {
    axios.post(urlFor(`sessions`), data)
    .then((res) => {
      this.setState( { user: res.data, signedIn: true });
      localStorage.setItem('token', this.state.user.authentication_token);
      localStorage.setItem('email', this.state.user.email);
      localStorage.setItem('family', this.state.user.family_id);
      localStorage.setItem('userImage', this.state.user.image.url);
      localStorage.setItem('signedIn', true);
      window.location.reload()
    })
    .catch((err) => {
        if (err.response.status == 401) {
          this.setState({ error: "Invalid Login." });
        }
        else if(err.response.status == 404) {
          this.setState({ error: "No account found with that email."});
        }
        else {
          this.setState({ error: "Unknown Error."});
        }
    });
  }

  signUp = (formdata) => {
    axios.post(urlFor(`users`), formdata)
    .then((res) => {
      this.setState( { user: res.data, signedIn: true });
      localStorage.setItem('token', this.state.user.authentication_token);
      localStorage.setItem('email', this.state.user.email);
      localStorage.setItem('family', this.state.user.family_id);
      localStorage.setItem('signedIn', true);
      window.location.reload();
     })
    .catch((err) => console.log(err.response) );
  }

  goHome = () => {
   this.setState({
     signedIn: localStorage.getItem('signedIn')
   });
   window.location.reload();

 }

  signOut = () => {
    const data = localStorage.getItem('token');
    if (data !== ""){
      axios.delete(urlFor(`sessions`), userAuth())
      .then((res) => this.setState( { user: res.data }))
      .catch((err) => console.log("Error") );
      window.localStorage.setItem('token', "");
      localStorage.setItem('signedIn', false);
      this.goHome();
    }
    else {
      localStorage.setItem('signedIn', false);
      this.goHome();
    }
  }

  resetError = () => {
    this.setState({ error: ''});
  }

  render() {

    const {
            user, signIn, signOut, signedIn,
            error
           } = this.state;

    if(signedIn === "true") {
    return (
      <App />
    );
    }
   else {
     return(
       <Router>
       <div className="welcome">
              <div className="container custom-container login">
                <div className="panel panel-default">
                    <div className="panel-body">
                      <Route exact path="/sign_up" render={props => <SignUp user={user} signUp={this.signUp}/>  } />
                      <Route exact path="/" render={props => <New user={user} signIn={this.signIn} signedIn={signedIn} />  } />
                    </div>
                </div>
                <button id="flow-button" className="btn btn-custom btn-block not-visible">Sign in</button>
            </div>
       </div>
      </Router>

     );
   }
  }
}

export default Welcome;
