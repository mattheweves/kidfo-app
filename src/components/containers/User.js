import React from 'react';
import MyFamilyDisplay from '../MyFamilyDisplay';
import EditFamily from '../EditFamily';
import Invites from './Invites';
import UserProfile from '../UserProfile';
import EditUserProfile from '../EditUserProfile';
import urlFor from '../../helpers/urlFor';
import userAuth from '../../helpers/userAuth';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, BrowserHistory } from 'react-router-dom';


class User extends React.Component {

  componentWillMount() {
    this.getMyAccount();
    this.getMyFamily(localStorage.getItem('family'));
  }

  constructor (props) {
    super(props);
    this.state = {
      user: {},
      invites: [],
      family: {},
      editFamilyForm: false,
      showFamily: false
    };
  }

  getMyAccount = () => {
    axios.get(urlFor('accounts'),userAuth())
    .then((res) => this.setState( { user: res.data }) )
    .catch((err) => console.log(err.response.data) );
  }

  editMyFamily = () => {
      this.getMyFamily(localStorage.getItem('family'));
      this.setState({ editFamilyForm: true});
  }

  editFamily = (data, id) => {
    axios.patch(urlFor(`family/${id}`), data, userAuth())
    .then((res) => this.setState( { family: res.data, editFamilyForm: false }) )
    .catch((err) => console.log(err.response) );
    this.editMyFamily();

  }

  getMyFamily = (id) => {
    axios.get(urlFor(`family/${id}`),userAuth())
    .then((res) => this.setState( { family: res.data }) )
    .catch((err) => console.log(err.response.data) );
  }

  render() {
    const { user, family, editFamily, editFamilyForm, getMyAccount } = this.state;
      return(
        <div>
          <Route exact path ="/home" render={props => <UserProfile user={user} />  } />
          <Route exact path ="/profile/edit" render={props => <EditUserProfile user={user} getMyAccount={this.getMyAccount} />  } />
          <Route exact path="/myfamily" render={props => <MyFamilyDisplay family={family} editMyFamily={this.editMyFamily} getMyFamily={this.getMyFamily} />  }   />
          <Route exact path="/myfamily/edit" render={props => <EditFamily family={family} editFamilyForm={editFamilyForm} editFamily={this.editFamily} getMyFamily={this.getMyFamily} />  }   />
          <Route path="/home" component={Invites} />
        </div>
      );

  }
}

export default User;
