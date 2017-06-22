import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import urlFor from '../../helpers/urlFor';
import userAuth from '../../helpers/userAuth';
import axios from 'axios';

class New extends React.Component {

  onSubmit(e) {
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

  signIn = (data) => {
    axios.post(urlFor(`sessions`), data)
    .then((res) => {
      this.props.setState( { user: res.data, signedIn: true });
      localStorage.setItem('token', this.props.user.authentication_token);
      localStorage.setItem('email', this.props.user.email);
      localStorage.setItem('family', this.props.user.family_id);
      localStorage.setItem('signedIn', true);
    })
    .catch((err) => {
       const { errors } = err.response.status;
        if (errors === 401) {
          this.setState({ error: "Missing Name!" });
        } else  {
          this.setState({ error: "General Submission Error: Check your Data!"});
        }
    });
  }

  render() {

    const { user, signedIn } = this.props;
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return (
        <Redirect from={New} to='/'/>
      )
    }
    return (
        <div className="row">
          <form
            className="col s12"
            onSubmit={(e) => this.onSubmit(e)}
          >
              <div className="input-field col s6">
                    <input
                      id="email" placeholder="email" type="text" className="validate"
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

          <input className="waves-effect waves-light btn" type="submit" value="Submit" />
          </form>
      </div>
    );
  }
}


export default New;
