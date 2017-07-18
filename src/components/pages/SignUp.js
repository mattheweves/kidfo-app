import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import urlFor from '../../helpers/urlFor';
import userAuth from '../../helpers/userAuth';
import axios from 'axios';

class SignUp extends React.Component {

  onSubmit(e) {
    e.preventDefault();
    const formData = {
       email: this.email.value,
       password: this.password.value,
       password_confirmation: this.password_confirmation.value
    };
       this.props.signUp(formData);
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
        <Redirect from={SignUp} to='/profile/edit'/>
      )
    }
    return (
      <div className="form">
      <img className="brand-logo responsive-img" src='/img/loginbrand.png'></img>
          <form
            className="col s12"
            onSubmit={(e) => this.onSubmit(e)}
           >
            <div className="row">
              <div className="input-field col s12">
                  <input
                    id="email" type="email" className="validate"
                    ref={(input) => this.email = input}
                  />
                  <label for="name">Email</label>
              </div>
              <div className="input-field col s12">
                  <input
                    id="password" type="password" className="validate"
                    ref={(input) => this.password = input}
                  />
                  <label for="name">Password</label>
              </div>
              <div className="input-field col s12">
                  <input
                    id="password_confirmation" type="password" className="validate"
                    ref={(input) => this.password_confirmation = input}
                  />
                  <label for="name">Password Confirmation</label>
              </div>
            </div>
          <input className="waves-effect waves-light btn" type="submit" value="Create Account" />
          </form><br />
          <center>Have An Account?<br /><Link to="/">Sign In</Link></center>
      </div>

    );

  }

}

export default SignUp;
