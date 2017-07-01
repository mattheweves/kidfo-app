import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import urlFor from '../helpers/urlFor';
import userAuth from '../helpers/userAuth';
import axios from 'axios';
import ImageUpload from './ImageUpload';

class EditUserProfile extends React.Component {

  componentWillMount() {
    this.props.getMyAccount();
  }

  onSubmit(e) {
    const formData = {
       first_name: this.first_name.value,
       last_name: this.last_name.value,
       email: this.email.value,
    };
       this.editUser(formData);
       this.setState({ redirectToReferrer: true })
       window.location.reload()
    };

    state = {
      redirectToReferrer: false
    }

  editUser = (formdata) => {
    axios.patch(urlFor('accounts'),formdata,userAuth())
    .then((res) => {
      this.props.setState( { user: res.data, signedIn: true });
      localStorage.setItem('token', this.props.user.authentication_token);
    })
    .catch((err) => console.log(err.response) );
  }

  render() {
    const { user } = this.props;
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return (
        <Redirect from='/profile/edit' to='/'/>
      )
    }
    return (
      <div>
        <ImageUpload
          formtype="user"
          user={user}
          editUser={this.editUser}
        />
        <div className="row">
            <div className="col s4 offset-s4">
              { user.image ? <img src={user.image.url} alt="" className="circle responsive-img"></img>: "" }
            </div>
            <form
              className="col s12"
              onSubmit={(e) => this.onSubmit(e)}
             >
              <div className="row">
                <div className="input-field col s3">
                    <input
                      id="first_name" type="text" className="validate"
                      defaultValue={user.first_name}
                      ref={(input) => this.first_name = input}
                    />
                    <label for="name">First Name</label>
                </div>
                <div className="input-field col s3">
                    <input
                      id="last_name" type="text" className="validate"
                      defaultValue={user.last_name}
                      ref={(input) => this.last_name = input}
                    />
                    <label for="name">Last Name</label>
                </div>
                <div className="input-field col s6">
                    <input
                      id="email" type="email" className="validate"
                      defaultValue={user.email}
                      ref={(input) => this.email = input}
                    />
                    <label for="name">Email</label>
                </div>
              </div>
            <input className="waves-effect waves-light btn" type="submit" value="Submit" />
            </form>
        </div>
      </div>
    );

  }

}

export default EditUserProfile;
