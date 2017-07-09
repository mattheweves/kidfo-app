import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, History, Link, BrowserHistory } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Sitters from './components/containers/Sitters';
import Families from './components/containers/Families';
import User from './components/containers/User';
import UserProfile from './components/UserProfile';
import Home from './components/containers/Home';
import Kids from './components/containers/Kids';
import KidForm from './components/KidForm';
import SignUp from './components/pages/SignUp';
import EnableFamily from './components/pages/EnableFamily';
import EditFamily from './components/EditFamily';
import urlFor from './helpers/urlFor';
import userAuth from './helpers/userAuth';
import axios from 'axios';
import New from './components/Sessions/New';
import Invitation from './components/Invitation';
import Flash from './components/Flash';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      signedIn: localStorage.getItem('signedIn'),
      error: '',
      kid: {},
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
      localStorage.setItem('signedIn', true);
      window.location.reload()
    })
    .catch((err) => {
       const { errors } = err.response.status;
        if (errors === 401) {
          this.setState({ error: "Missing Name!" });
        } else  {
          this.setState({ error: "General Submission Error: Check your Data!"});
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
            user, signIn, signOut, signedIn, kid,
            error
           } = this.state;

    return (
      <Router>
          <div className="App">
            <Nav
              user={user}
              goHome={this.goHome}
              signOut={this.signOut}
              signedIn={signedIn}
            />

            <div className="container">
            { error && <Flash error={error} resetError={this.resetError} /> }
            { signedIn === "true" ?
                <div>
                <User user={user} />
                <Route exact path="/kids" component={Kids}/>
                <Route path="/kids/new" render={props =><KidForm kid={kid}/> } />
                <Route path="/families" component={Families}/>
                <Route path="/sitters" component={Sitters}/>
                <Route exact path="/myfamily/enable" component={EnableFamily}/>
                  <Invitation
                    sendInvite={this.sendInvite}
                  />
                </div>
                :
                <div>
                  <Route exact path="/login" render={props => <New user={user} signIn={this.signIn} signedIn={signedIn} />  } />
                  <Route exact path="/sign_up" render={props => <SignUp user={user} signUp={this.signUp}/>  } />
                </div>
            }
            </div>

           </div>
      </Router>
    );
  }
}

export default App;
