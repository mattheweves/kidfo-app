import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav';
import Kids from './components/Kids';
import User from './components/stores/models/User';
import KidForm from './components/KidForm';
import KidProfile from './components/KidProfile';
import Families from './components/Families';
import FamilyProfile from './components/FamilyProfile';
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
      showKidForm: false,
      showKid: false,
      showFamily: false,
      kids: [],
      kid: {},
      families: [],
      family: {},
      user: {},
      signedIn: localStorage.getItem('signedIn'),
      invites: [],
      error: ''
    };
  }

  toggleKid = () => {
      this.setState({
        showKidForm: ! this.state.showKidForm,
        kid: {}
      });
  }

  editKid = (kid) => {
      console.log(kid.name);
      this.setState({
        kid: kid,
        showKidForm: ! this.state.showKidForm
      });
  }

  goHome = () => {
    this.setState({
      showKidForm: false,
      showKid: false,
      showFamily: false,
      families: [],
      kids: [],
      invites: [],
      signedIn: localStorage.getItem('signedIn')
    });
    this.getKids();
    this.getFamilies();
    this.getInvites();

  }

  getKids = () => {
    axios.get(urlFor('kids'),userAuth())
    .then((res) => this.setState({ kids: res.data }))
    .catch((err) => console.log(err.response) );
  }

  getKid = (id) => {
    axios.get(urlFor(`kids/${id}`),userAuth())
    .then((res) => this.setState( { kid: res.data, showKid: true }) )
    .catch((err) => console.log(err.response.data) );
  }

  performSubmissionRequest = (data, id) => {
    if (id) {
      return axios.patch(urlFor(`kids/${id}`), data,userAuth());
    }
    else {
      return axios.post(urlFor(`kids`), data,userAuth());
    }
  }

  submitKid = (data, id) => {
    this.performSubmissionRequest(data,id)
    .then((res) => this.setState( { kid: res.data, showKidForm: false }) )
    .catch((err) => {
       const { errors } = err.response.data;
        if (errors.name) {
          this.setState({ error: "Missing Name!" });
        } else  {
          this.setState({ error: "General Submission Error: Check your Data!"});
        }
    });
  }

  getFamilies = () => {
    axios.get(urlFor('families'),userAuth())
    .then((res) => this.setState({ families: res.data }))
    .catch((err) => console.log(err.response) );
  }

  getFamily = (id) => {
    axios.get(urlFor(`family/${id}`),userAuth())
    .then((res) => this.setState( { family: res.data, showFamily: true }) )
    .catch((err) => console.log(err.response.data) );
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


  signIn = (data) => {
    axios.post(urlFor(`sessions`), data)
    .then((res) => {
      this.setState( { user: res.data });
      localStorage.setItem('token', this.state.user.authentication_token);
      localStorage.setItem('email', this.state.user.email);
      localStorage.setItem('signedIn', true);
      this.goHome();
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

  deleteKid = (id) => {
    const newKidsState = this.state.kids.filter((kid) => kid.id !== id );
    axios.delete(urlFor(`kids/${id}`),userAuth())
    .then((res) => this.setState( { kids: newKidsState }) )
    .catch((err) => console.log(err.response.data) );
  }

  resetError = () => {
    this.setState({ error: ''});
  }

  render() {

    const { goHome,
            showKid, showKidForm, kids, kid,
            submitKid, getKid, editKid,
            families, family, getFamily, showFamily,
            user, signIn, signOut, signedIn,
            invites, sendInvite,
            error
           } = this.state;

    return (
      <div className="App">
        <Nav
          toggleKid={this.toggleKid}
          showKidForm={showKidForm}
          goHome={this.goHome}
          signOut={this.signOut}
          signedIn={signedIn}
        />
        <div className="container">
          {error && <Flash error={error} resetError={this.resetError} />}
          { showKidForm ?
            <KidForm
              kid={kid}
              submitKid={this.submitKid}
            />
              :
            showKid ?
            <KidProfile
              kid={kid}
              getFamily={this.getFamily}
            />
              :
            <Kids
              getKids={this.getKids}
              kids={kids}
              getKid={this.getKid}
              deleteKid={this.deleteKid}
              showKid={this.showKid}
              editKid={this.editKid}
            />
          }
          { showFamily && signedIn === "true" ?
            <FamilyProfile
              family={family}
            />
            :
            <Families
              getFamilies={this.getFamilies}
              families={families}
              getFamily={this.getFamily}
              showFamily={this.showFamily}
            />

        }
          { signedIn === "false" ?
            <New
              user={user}
              signedIn={signedIn}
              signIn={this.signIn}
            />
            :
            <Invitation
              sendInvite={this.sendInvite}
            />
          }
        </div>
        <div className="container" >
            <Invites
              getInvites={this.getInvites}
              invites={invites}
              responseInvite={this.responseInvite}
            />
        </div>
      </div>
    );
  }
}

export default App;
