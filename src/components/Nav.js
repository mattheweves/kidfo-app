import React from 'react';

class Nav extends React.Component {

  render() {

    const { toggleKid, showKid, showKidForm, goHome, signOut, signedIn } = this.props;
    console.log("Nav" + signedIn);
    return (

      <nav>
        <div className="nav-wrapper">
          <a href="#" data-activates="slide-out" className="button-collapse" onClick={() => goHome() }><i className="material-icons">menu</i></a>
          <a href="#" className="brand-logo center">KIDFO</a>
          <ul id="nav-mobile" className="right hide-on-sm-and-down">
          {
            signedIn === "true" ?
            <div>
              <li><a className="waves-effect waves-light btn" onClick={() => toggleKid()}>+ Kid</a></li>
              <li><a className="waves-effect waves-light btn" onClick={() => signOut()}>Sign Out</a></li>
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
