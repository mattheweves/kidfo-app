import React from 'react';
import MyFamilyDisplay from '../MyFamilyDisplay';
import EditFamily from '../EditFamily';
import urlFor from '../../helpers/urlFor';
import userAuth from '../../helpers/userAuth';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, BrowserHistory } from 'react-router-dom';


class User extends React.Component {
  componentDidMount() {
    this.getMyFamily(localStorage.getItem('family'));
  }

  constructor (props) {
    super(props);
    this.state = {
      family: localStorage.getItem('family'),
      editFamilyForm: false,
      showFamily: false
    };
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
    const { family, editFamily, editFamilyForm } = this.state;

      return(
        <div>
          <Route exact path="/myfamily" render={props => <MyFamilyDisplay family={family} editMyFamily={this.editMyFamily} />  }   />
          <Route exact path="/myfamily/edit" render={props => <EditFamily family={family} editFamilyForm={editFamilyForm} editFamily={this.editFamily} getMyFamily={this.getMyFamily} />  }   />
        </div>
      );

  }
}

export default User;
