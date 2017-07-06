import React from 'react';
import SideMenu from './SideMenu';
import { BrowserRouter as Router, Route, Link, BrowserHistory } from 'react-router-dom';


class Nav extends React.Component {

  render() {

    const { signOut, signedIn } = this.props;
    const hasFamily = localStorage.getItem('family') > 0;
    const haveSpouse = localStorage.getItem('SpouseConnected');

    return (
      <div>
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo left">KIDFO</a>
          <SideMenu signedIn={signedIn} hasFamily={hasFamily}/>
          <ul id="nav-mobile" className="right hide-on-sm-and-down">
          {
            signedIn === "true" ?
            <div>
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/kids">Kids</Link></li>
              <li><Link to="/care">Care</Link></li>
              { hasFamily && <li><Link to="/myfamily">My Family</Link></li> }
              <li><a onClick={() => signOut()}>Sign Out</a></li>
            </div>
            :
            <div>
              <li><Link to="/login">Sign In</Link></li>
              <li><Link to="/sign_up">Sign Up</Link></li>
            </div>
          }
          </ul>
        </div>
     </nav>
     <br /><br />
     </div>
    );
  }

}

export default Nav;
