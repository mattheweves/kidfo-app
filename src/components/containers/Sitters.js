import React from 'react';
import { BrowserRouter as Router, Route, Link, BrowserHistory } from 'react-router-dom';
import urlFor from '../../helpers/urlFor';
import userAuth from '../../helpers/userAuth';
import axios from 'axios';
import SitterDisplay from '../SitterDisplay';
import SitterProfile from '../SitterProfile';

class Sitters extends React.Component {

  componentDidMount() {
    this.getSitters();
  }

  constructor () {
    super();
    this.state = {
      showSitter: false,
      sitters: [],
      sitter: {}
    };
  }

  getSitters = () => {
    axios.get(urlFor('sitters'), userAuth())
    .then((res) => this.setState({ sitters: res.data }))
    .catch((err) => console.log(err.response) );
  }

  getSitter = (id) => {
    axios.get(urlFor(`sitters/${id}`),userAuth())
    .then((res) => this.setState( { sitter: res.data, showSitter: true }) )
    .catch((err) => console.log(err.response.data) );
  }


  render() {
    const { sitters, sitter, showSitter } = this.state;
    let hasFamily = localStorage.getItem('family') > 0;

      if(hasFamily){
      return(
        <div><div className="row"><h5 className="left">My Sitters</h5></div>
              { showSitter ?
                <SitterProfile
                  sitter={sitter}
                />
                :
                sitters.length > 0 ?
                   sitters.map((sitter, index) => {
                   return(
                     <SitterDisplay
                       key={index}
                       index={index}
                       sitter={sitter}
                       getSitter={this.getSitter}
                       showSitter={this.showSitter}
                     />
                   );
                 })
                : ""
              }
          </div>
      );
    } else
      { return null; }

  }
}

export default Sitters;
