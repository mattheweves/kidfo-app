import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter, BrowserHistory } from 'react-router-dom';
import KidDisplay from '../KidDisplay';
import KidForm from '../../components/KidForm';
import KidProfile from '../../components/KidProfile';
import urlFor from '../../helpers/urlFor';
import userAuth from '../../helpers/userAuth';
import axios from 'axios';


class Kids extends React.Component {

  componentWillMount() {
    this.getKids();
  }

  constructor () {
    super();
    this.state = {
      kids: [],
      kid: {},
      showKidForm: false,
      showKid: false
    };
  }

  toggleKid = () => {
      this.setState({
        showKidForm: ! this.state.showKidForm,
        kid: {}
      });
  }

  getKids = () => {
    axios.get(urlFor('kids'),userAuth())
    .then((res) => this.setState( { kids: res.data } ))
    .catch((err) => console.log(err.response) );
  }

  getKid = (id) => {
    axios.get(urlFor(`kids/${id}`),userAuth())
    .then((res) => {
      this.setState( { kid: res.data, showKid: true });
    }
     )
    .catch((err) => console.log(err.response.data) );
  }

  editKid = (kid) => {
      this.setState({
        showKidForm: ! this.state.showKidForm,
        kid: kid
      });
  }

  submitKid = (data, id) => {
    this.performSubmissionRequest(data,id)
    .then((res) => this.setState( { kid: res.data, showKidForm: false }) )
    .catch((err) => {
       const { errors } = err.response.data;
        if (errors.name) {
          this.setState({ error: "Missing Name!" });
        } else  {
          this.setState({ error: "Error: check your Data!"});
        }
    });
    this.getKids();
  }

  deleteKid = (id) => {
    const newKidsState = this.state.kids.filter((kid) => kid.id !== id );
    axios.delete(urlFor(`kids/${id}`),userAuth())
    .then((res) => this.setState( { kids: newKidsState }) )
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

  render() {
    const { kids, kid, getKids, getKid, editKid, showKidForm, showKid, getFamily } = this.state;


    return(
      <div>
      <Route path="/kid/:id" component={KidProfile}/>
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
         this.state.kids.map((kid, index) => {
            return(
              <KidDisplay
                key={index}
                index={index}
                kid={kid}
                getKid={this.getKid}
                deleteKid={this.deleteKid}
                showKid={this.showKid}
                editKid={this.editKid}
              />
            );
          })
      }
      <a className="waves-effect waves-light btn" onClick={() => this.toggleKid()}>+ Kid</a><br />

      </div>
    );
  }
}

export default Kids;
