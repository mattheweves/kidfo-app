import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav';
import Kids from './components/Kids';
import KidForm from './components/KidForm';
import KidProfile from './components/KidProfile';
import urlFor from './helpers/urlFor';
import axios from 'axios';


class App extends Component {
  constructor () {
    super();
    this.state = {
      showKidForm: false,
      showKid: false,
      kids: [],
      kid: {},
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
      showKid: false
    });
  }

  getKids = () => {
    axios.get(urlFor('kids'))
    .then((res) => this.setState({ kids: res.data }))
    .catch((err) => console.log(err.response) );
  }

  getKid = (id) => {
    axios.get(urlFor(`kids/${id}`))
    .then((res) => this.setState( { kid: res.data, showKid: true }) )
    .catch((err) => console.log(err.response.data) );
  }

  performSubmissionRequest = (data, id) => {
    if (id) {
      return axios.patch(urlFor(`kids/${id}`), data);
    }
    else {
      return axios.post(urlFor(`kids`), data);
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

  deleteKid = (id) => {
    const newKidsState = this.state.kids.filter((kid) => kid.id !== id );
    axios.delete(urlFor(`kids/${id}`))
    .then((res) => this.setState( { kids: newKidsState }) )
    .catch((err) => console.log(err.response.data) );
  }

  render() {

    const { showKid, showKidForm, kids, kid, error, submitKid, getKid, goHome } = this.state;

    return (
      <div className="App">
        <Nav toggleKid={this.toggleKid} showKidForm={showKidForm} goHome={this.goHome} />
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
        </div>
      </div>
    );
  }
}

export default App;
