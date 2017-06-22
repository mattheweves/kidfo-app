import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, History, Link, BrowserHistory } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import User from './components/containers/User';
import Kids from './components/containers/Kids';
import SignUp from './components/pages/SignUp';
import Families from './components/containers/Families';
import FamilyProfile from './components/FamilyProfile';
import EditFamily from './components/EditFamily';
import urlFor from './helpers/urlFor';
import userAuth from './helpers/userAuth';
import axios from 'axios';
import New from './components/Sessions/New';
import Invites from './components/containers/Invites';
import Invitation from './components/Invitation';
import Flash from './components/Flash';


class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      signedIn: localStorage.getItem('signedIn'),
      user: {},
      error: ''
    };
  }

  goHome = () => {
    this.setState({
      invites: [],
      signedIn: localStorage.getItem('signedIn')
    });
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

  loginRoute() {
    if(this.state.signedIn === false) {

    }

  }

  render() {

    const { goHome,
            kids, kid,
            families, family,
            user, signIn, signOut, signedIn,
            invites,
            error
           } = this.state;

    return (
      <Router>
          <div className="App">
            <Nav
              goHome={this.goHome}
              signOut={this.signOut}
              signedIn={signedIn}
            />
            <div className="container">
            { error && <Flash error={error} resetError={this.resetError} /> }
            { signedIn === "true" ?
                <div>
                <Route path="/kids" render={props => <Kids kids={kids} kid={kid} handler={this.handler} />  }   />
                <Route path="/families" component={Families} families={families}/>
                  <Invites
                    getInvites={this.getInvites}
                    invites={invites}
                    responseInvite={this.responseInvite}
                  />
                  <Invitation
                    sendInvite={this.sendInvite}
                  />
                  <User />
                </div>
                :
                <div>
                  <Route exact path="/login" render={props => <New user={user} signIn={this.signIn} signedIn={signedIn} />  } />
                  <Route exact path="/sign_up" render={props => <SignUp user={user} />  } />
                </div>
            }
            </div>

           </div>
      </Router>
    );
  }
}

export default App;
