import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav';
import Kids from './components/Kids';
import User from './components/stores/models/User';
import KidForm from './components/KidForm';
import KidProfile from './components/KidProfile';
import urlFor from './helpers/urlFor';
import userAuth from './helpers/userAuth';
import axios from 'axios';
import New from './components/Sessions/New';


class App extends Component {
  constructor () {
    super();
    this.state = {
      showKidForm: false,
      showKid: false,
      kids: [],
      kid: {},
      user: {},
      signedIn: localStorage.getItem('signedIn'),
      error: ''
    };
  }

  toggleKid = () => {
    this.setState({
      showKidForm: ! this.state.showKidForm,
      kid: {}
    });
  }

  goHome = () => {
    this.setState({
      showKidForm: false,
      showKid: false,
      kids: [],
      signedIn: localStorage.getItem('signedIn')
    });
    this.getKids();

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
          console.log("Unauthorized");
        } else  {
          console.log("Unknown Error");
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

  render() {

    const { showKid, showKidForm, kids, kid, user,
            error, submitKid, getKid, goHome, signIn, signOut, signedIn
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
          { showKidForm ?
            <KidForm
              kid={kid}
              submitKid={this.submitKid}
            />
              :
            showKid ?
            <KidProfile
              kid={kid}
            />
              :
            <Kids
              getKids={this.getKids}
              kids={kids}
              getKid={this.getKid}
              deleteKid={this.deleteKid}
              showKid={this.showKid}
            />
          }
          { signedIn === "false" ?
            <New
              user={user}
              signedIn={signedIn}
              signIn={this.signIn}
            />
            :
            ""
          }
        </div>
      </div>
    );
  }
}

export default App;
