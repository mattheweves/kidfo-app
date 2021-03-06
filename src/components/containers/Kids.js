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
    if(!this.props.kids){
      this.getKids();
    }
    else {
      this.setState( { kids: this.props.kids } )
    }
  }

  constructor (props) {
    super(props);
    this.state = {
      kids: [],
      kid: {},
      showKidForm: false,
      showKid: false,
      familyid: localStorage.getItem('family')
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

  viewKid = () => {
      this.setState({
        showKid: true
      });
  }

  editKid = (kid) => {
      this.setState({
        showKidForm: ! this.state.showKidForm,
        kid: kid
      });
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
    const { kids, kid, familyid, getKids, getKid, editKid, showKidForm, showKid, getFamily } = this.state;
    const myKid = true;

    return(
      <Router>
        <div>
        { showKidForm ?
          <KidForm
            kid={kid}
            submitKid={this.submitKid}
          />
            :
          showKid ?
          <Route exact path={`/kids/${kid.id}`} render={props => <KidProfile kid={kid} getFamily={this.getFamily} /> } />
            :
           kids.length > 0 ?
           kids.map((kid, index) => {
              return(
                <KidDisplay
                  key={index}
                  index={index}
                  kid={kid}
                  myKid={myKid}
                  getKid={this.getKid}
                  deleteKid={this.deleteKid}
                  showKid={this.showKid}
                  editKid={this.editKid}
                />
              );
            }): ""
          }

        </div>
      </Router>
    );
  }
}

export default Kids;
