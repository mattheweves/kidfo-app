import { slide as Menu } from 'react-burger-menu';
import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';


class SideMenu extends React.Component {
  showSettings (event) {
    event.preventDefault();
  }

  render () {
    const { hasFamily } = this.props;
    return (
      <Menu>
          <li><Link to="/profile/edit">Edit My Profile</Link></li>
          <li><a href="#modalspouse">Invite Spouse</a></li>
          <li><a href="#modalsitter">Invite Sitter</a></li>
          { hasFamily ?
            <li><Link to="/myfamily/edit">Edit My Family</Link></li>
            :
            <li><Link to="/myfamily/enable">Enable Family Account</Link></li>
          }
      </Menu>
    );
  }
}


export default SideMenu;
