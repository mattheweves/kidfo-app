import React from 'react';
import { BrowserRouter as Router, Route, Link, BrowserHistory } from 'react-router-dom';


class Nav extends React.Component {

  render() {

    const { goHome, signOut, signedIn } = this.props;
    return (

      <nav>
        <div className="nav-wrapper">
          <a href="#" data-activates="slide-out" className="button-collapse" onClick={() => goHome() }><i className="material-icons">menu</i></a>
          <a href="#" className="brand-logo center">KIDFO</a>
          <ul id="nav-mobile" className="right hide-on-sm-and-down">
          {
            signedIn === "true" ?
            <div>
            <li><Link to="/kids">Kids</Link></li>
            <li><Link to="/families">Care</Link></li>
              <a className="waves-effect waves-light btn" onClick={() => signOut()}>Sign Out</a>
            </div>
            :
            ""
          }
          </ul>
        </div>
     </nav>
    );
  }

}

export default Nav;
