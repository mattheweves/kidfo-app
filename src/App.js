import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, BrowserHistory } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Kids from './components/containers/Kids';
import User from './components/stores/models/User';
import Families from './components/containers/Families';
import FamilyProfile from './components/FamilyProfile';
import EditFamily from './components/EditFamily';
import urlFor from './helpers/urlFor';
import userAuth from './helpers/userAuth';
import axios from 'axios';
import New from './components/Sessions/New';
import Invites from './components/Invites';
import Invitation from './components/Invitation';
import Flash from './components/Flash';

class App extends Component {
  constructor () {
    super();
    this.state = {
      signedIn: localStorage.getItem('signedIn'),
      user: {},
      invites: [],
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
      this.setState( { user: res.data });
      localStorage.setItem('token', this.state.user.authentication_token);
      localStorage.setItem('email', this.state.user.email);
      localStorage.setItem('signedIn', true);
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

  getInvites = () => {
    axios.get(urlFor('invites'),userAuth())
    .then((res) => this.setState({ invites: res.data }))
    .catch((err) => console.log(err.response) );
  }

  sendInvite = (data) => {
    axios.post(urlFor('invites'), data, userAuth())
    .then((res) => console.log(res.data) )
    .catch((err) => {
       const { errors } = err.response.data;
        if (errors.email) {
          this.setState({ error: "Email Cannot Be Blank!" });
        } else  {
          this.setState({ error: "Unknown Error"});
        }
    });
  }

  responseInvite = (id, action) => {
    axios.post(urlFor(`invites/${id}/${action}`),userAuth())
    .then((res) => this.setState({ invite: res.data }))
    .catch((err) => console.log(err.response) );
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

    const { goHome,
            showKid, showKidForm, kids, kid,
            submitKid, getKid, editKid,
            families, family, getFamily, showFamily, editFamily, editMyFamily, editFamilyForm,
            user, signIn, signOut, signedIn,
            invites, sendInvite,
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
        <Link to="/login">Login</Link>
        <New
               user={user}
               signedIn={signedIn}
               signIn={this.signIn}
        />
        <Route path="/kids"  component={Kids}/>
        <Route path="/families" component={Families} user={user}/>
        <Route path="/home" component={App}/>
        <div className="container">
          { error && <Flash error={error} resetError={this.resetError} /> }
        </div>
        <div className="container" >
            <Invites
            //  getInvites={this.getInvites}
              invites={invites}
              responseInvite={this.responseInvite}
            />
        </div>
      </div>
      </Router>
    );
  }
}

export default App;
