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

    return(
      <div>
      { showSitter ?
        <SitterProfile
          sitter={sitter}
        />
        :
        this.state.sitters.map((sitter, index) => {
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
      }
      </div>
    );
  }
}

export default Sitters;
