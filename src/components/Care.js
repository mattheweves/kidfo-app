import React from 'react';
import { BrowserRouter as Router, Route, Link, BrowserHistory } from 'react-router-dom';
import Families from './containers/Families';
import Sitters from './containers/Sitters';



class Care extends React.Component {

  render() {
    
    return (
      <div>
       <Families />
       <Sitters />
     </div>
    );
  }

}

export default Care;
