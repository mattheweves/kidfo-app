import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import urlFor from '../../helpers/urlFor';
import userAuth from '../../helpers/userAuth';
import axios from 'axios';

class New extends React.Component {

  onSubmit(e) {
    e.preventDefault();
    const formData = {
       email: this.email.value,
       password: this.password.value,
    };
       this.props.signIn(formData);
       this.setState({ redirectToReferrer: true })
    };

    state = {
      redirectToReferrer: false
    }

  render() {

    const { user, signedIn } = this.props;
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return (
        <Redirect from={New} to='/home'/>
      )
    }
    return (
        <div className="form">
          <img className="brand-logo responsive-img" src='/img/loginbrand.png'></img>
          <br /><br />
                  <form
                    className="col s12"
                    onSubmit={(e) => this.onSubmit(e)}
                  >
                  <div className="card-title">

                  </div>
                      <div className="input-field col s6">
                            <input
                              id="email" type="text" className="validate"
                              ref={(input) => this.email = input}
                            />
                            <label for="email">Email</label>
                      </div>
                      <div className="input-field col s6">
                            <input
                              id="password" type="password" className="validate"
                              ref={(input) => this.password = input}
                            />
                            <label for="password">Password</label>
                      </div>
                      <input className="waves-effect waves-light btn" type="submit" value="Login" />
                  </form><br />
                  <center>No Account? <Link to="/sign_up">Sign Up</Link></center>

      </div>
    );
  }
}


export default New;
