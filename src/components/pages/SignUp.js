import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import urlFor from '../../helpers/urlFor';
import userAuth from '../../helpers/userAuth';
import axios from 'axios';

class SignUp extends React.Component {

  onSubmit(e) {
    const formData = {
       first_name: this.first_name.value,
       last_name: this.last_name.value,
       email: this.email.value,
       phone_number: this.phone_number.value,
       password: this.password.value,
       password_confirmation: this.password_confirmation.value
    };
       this.signUp(formData);
       this.setState({ redirectToReferrer: true })
    };

    state = {
      redirectToReferrer: false
    }

  signUp = (formdata) => {
    axios.post(urlFor(`users`), formdata)
    .then((res) => {
      this.props.setState( { user: res.data, signedIn: true });
      localStorage.setItem('token', this.props.user.authentication_token);
      localStorage.setItem('email', this.props.user.email);
      localStorage.setItem('signedIn', true);
    })
    .catch((err) => console.log(err.response) );
  }

  render() {
    const { user } = this.props;
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return (
        <Redirect from={SignUp} to='/'/>
      )
    }
    return (
      <div className="row">
          <form
            className="col s12"
            onSubmit={(e) => this.onSubmit(e)}
           >
            <div className="row">
              <div className="input-field col s3">
                  <input
                    id="first_name" type="text" className="validate"
                    ref={(input) => this.first_name = input}
                  />
                  <label for="name">First Name</label>
              </div>
              <div className="input-field col s3">
                  <input
                    id="last_name" type="text" className="validate"
                    ref={(input) => this.last_name = input}
                  />
                  <label for="name">Last Name</label>
              </div>
              <div className="input-field col s6">
                  <input
                    id="email" type="email" className="validate"
                    ref={(input) => this.email = input}
                  />
                  <label for="name">Email</label>
              </div>
              <div className="input-field col s6">
                  <input
                    id="phone_number" type="text" className="validate"
                    ref={(input) => this.phone_number = input}
                  />
                  <label for="phone_number">Phone Number</label>
              </div>
              <div className="input-field col s6">
                  <input
                    id="password" type="password" className="validate"
                    ref={(input) => this.password = input}
                  />
                  <label for="name">Password</label>
              </div>
              <div className="input-field col s6">
                  <input
                    id="password_confirmation" type="password" className="validate"
                    ref={(input) => this.password_confirmation = input}
                  />
                  <label for="name">Password Confirmation</label>
              </div>
            </div>
          <input className="waves-effect waves-light btn" type="submit" value="Create Account" />
          </form>
      </div>

    );

  }

}

export default SignUp;
