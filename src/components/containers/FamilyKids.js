import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter, BrowserHistory } from 'react-router-dom';
import KidDisplay from '../KidDisplay';
import KidForm from '../../components/KidForm';
import KidProfile from '../../components/KidProfile';
import urlFor from '../../helpers/urlFor';
import userAuth from '../../helpers/userAuth';
import axios from 'axios';


class FamilyKids extends React.Component {

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
      showKid: false,
    };
  }

  toggleKid = () => {
      this.setState({
        showKidForm: ! this.state.showKidForm,
        kid: {}
      });
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


  render() {
    const { kids, kid, familyid, getKids, getKid, editKid, showKidForm, showKid, getFamily } = this.state;
    const haveFamily = localStorage.getItem('family') > 0;
    const myKid = false;

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
                  showKid={this.showKid}
                />
              );
            }): ""
          }
        </div>
      </Router>
    );
  }
}

export default FamilyKids;
