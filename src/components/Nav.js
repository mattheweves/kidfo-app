import React from 'react';
import SideMenu from './SideMenu';
import { BrowserRouter as Router, Route, Link, BrowserHistory } from 'react-router-dom';


class Nav extends React.Component {

  render() {

    const { signOut, signedIn, user } = this.props;
    const hasFamily = localStorage.getItem('family') > 0;
    const haveSpouse = localStorage.getItem('SpouseConnected');

    return (
      <div>
      <nav>
        <div className="nav-wrapper">
          <Link to="/home" ><img className="brand-logo" src='/img/kidfologo.png'></img></Link>
          <SideMenu user={user} signedIn={signedIn} hasFamily={hasFamily} signOut={signOut}/>
          <ul id="nav-mobile" className="button-collapse right hide-on-sm-and-down">
          {
            signedIn === "true" ?
            <div>
              { hasFamily && <li><Link to="/kids" onClick="window.location.reload()" >Kids</Link></li> }
              <li><Link to="/families" onClick="window.location.reload()">Families</Link></li>
              { hasFamily && <li><Link to="/sitters" onClick="window.location.reload()">Sitters</Link></li>}
              { hasFamily && <li><Link to="/myfamily">My Family</Link></li> }
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
