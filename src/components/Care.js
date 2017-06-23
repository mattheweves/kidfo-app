import React from 'react';
import { BrowserRouter as Router, Route, Link, BrowserHistory } from 'react-router-dom';
import Families from './containers/Families';
import Sitters from './containers/Sitters';

class Care extends React.Component {

  render() {
    return (
      <div>
       <span className="left"><h5>Families I Sit For</h5></span>
       <br /><br />
       <Families />
       <br /><br />
       <span className="left"><h5>My Sitters</h5></span>
       <br /><br />
       <Sitters />
     </div>
    );
  }

}

export default Care;
