import React from 'react';
import { BrowserRouter as Router, Route, Link, BrowserHistory } from 'react-router-dom';
import urlFor from '../../helpers/urlFor';
import userAuth from '../../helpers/userAuth';
import axios from 'axios';
import FamilyDisplay from '../FamilyDisplay';
import EditFamily from '../../components/EditFamily';
import FamilyProfile from '../../components/FamilyProfile';

class Families extends React.Component {

  componentDidMount() {
    this.getFamilies();
  }

  constructor () {
    super();
    this.state = {
      showFamily: false,
      families: [],
      family: {}
    };
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

  render() {
    const { families, family, showFamily } = this.state;

    return(
      <div>
      { showFamily ?
        <FamilyProfile
          family={family}
        />
        :
        this.state.families.map((family, index) => {
           return(
             <FamilyDisplay
               key={index}
               index={index}
               family={family}
               getFamily={this.getFamily}
               showFamily={this.showFamily}
             />
           );
         })
      }
      </div>
    );
  }
}

export default Families;
