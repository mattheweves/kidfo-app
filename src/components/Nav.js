import React from 'react';

class Nav extends React.Component {

  render() {

    const { toggleKid, showKid, showKidForm, goHome } = this.props;

    return (

      <nav>
        <div className="nav-wrapper">
          <a href="#" data-activates="slide-out" className="button-collapse" onClick={() => goHome() }><i className="material-icons">menu</i></a>
          <a href="#" className="brand-logo center">KIDFO</a>
          <ul id="nav-mobile" className="right hide-on-sm-and-down">
            <li><a className="waves-effect waves-light btn" onClick={() => toggleKid()}>+ Kid</a></li>
          </ul>
        </div>
        <ul id="slide-out" className="side-nav">
            <li><div className="userView">
              <div className="background">
                <img src="img/wave2.png"></img>
              </div>
              <a href=""><img className="circle" src="img/whitney.png"></img></a>
              <a href=""><span className="white-text name">John Doe</span></a>
              <a href=""><span className="white-text email">jdandturk@gmail.com</span></a>
            </div></li>
            <li><a href=""><i className="material-icons">cloud</i>First Link With Icon</a></li>
            <li><a href="">Second Link</a></li>
            <li><div className="divider"></div></li>
            <li><a className="subheader">Subheader</a></li>
            <li><a className="waves-effect" href="#!">Third Link With Waves</a></li>
        </ul>
     </nav>
    );
  }

}

export default Nav;
