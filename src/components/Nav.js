import React from 'react';
import SideMenu from './SideMenu';
import { BrowserRouter as Router, Route, Link, BrowserHistory } from 'react-router-dom';


class Nav extends React.Component {

  render() {

    const { signOut, signedIn } = this.props;
    return (

      <nav>
        <div className="nav-wrapper">
          <SideMenu signedIn={signedIn}/>
          <a href="#" className="brand-logo left">KIDFO</a>
          <ul id="nav-mobile" className="right hide-on-sm-and-down">
          {
            signedIn === "true" ?
            <div>
            <li><Link to="/kids">Kids</Link></li>
            <li><Link to="/families">Care</Link></li>
            <li><Link to="/myfamily">My Family</Link></li>
            <li><a onClick={() => signOut()}>Sign Out</a></li>
            </div>
            :
            <Link to="/login">Login</Link>
          }
          </ul>
        </div>
     </nav>
    );
  }

}

export default Nav;
