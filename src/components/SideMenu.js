import { slide as Menu } from 'react-burger-menu';
import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';


class SideMenu extends React.Component {
  showSettings (event) {
    event.preventDefault();

  }

  render () {
    return (
      <Menu>
          <li><Link to="/user/edit">Edit My Profile</Link></li>
          <li><a href="#modalspouse">Invite Spouse</a></li>
          <li><a href="#modalsitter">Invite Sitter</a></li>
          <li><Link to="/myfamily/edit">Edit My Family</Link></li>
      </Menu>
    );
  }
}


export default SideMenu;
