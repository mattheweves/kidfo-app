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
      family: {},
      editFamilyForm: false,
      showFamily: false
    };
  }

  editMyFamily = () => {
      this.getMyFamily(localStorage.getItem('family'));
  }

  editFamily = (data, id) => {
    axios.patch(urlFor(`family/${id}`), data, userAuth())
    .then((res) => this.setState( { family: res.data, editFamily: false }) )
    .catch((err) => console.log(err.response) );
    this.editMyFamily();
    
  }

  getMyFamily = (id) => {
    axios.get(urlFor(`family/${id}`),userAuth())
    .then((res) => this.setState( { family: res.data }) )
    .catch((err) => console.log(err.response.data) );
  }

  render() {
    const { family, editFamily } = this.state;

      return(
        <div>
          <Route exact path="/myfamily" render={props => <MyFamilyDisplay family={family} />  }   />
          <Route exact path="/myfamily/edit" render={props => <EditFamily family={family} editFamily={this.editFamily} />  }   />
        </div>
      );

  }
}

export default User;
