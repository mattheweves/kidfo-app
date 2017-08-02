import React from 'react';
import { BrowserRouter as Router, Route, Link, BrowserHistory } from 'react-router-dom';
import Invites from './Invites';

class Home extends React.Component {


  componentDidMount() {
    this.getKids();
  }

  constructor (props) {
    super(props);
    this.state = {
      invites: []
    };
  }

  render() {
    return (
    <Invites />
    );
  }

}

export default Home;
