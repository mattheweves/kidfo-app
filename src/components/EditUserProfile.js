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
    e.preventDefault();
    const formData = {
       first_name: this.first_name.value,
       last_name: this.last_name.value,
       phone_number: this.phone_number.value,
       motto: this.motto.value
    };
       this.editUser(formData);
       window.location.reload();
       this.setState({ redirectToReferrer: true });
    };

    state = {
      redirectToReferrer: false
    }

  editUser = (formdata) => {
    axios.patch(urlFor('accounts'),formdata,userAuth())
    .then((res) => {
      localStorage.setItem('token', this.props.user.authentication_token);
    })
    .catch((err) => console.log(err.response) );
  }

  render() {
    const { user } = this.props;
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return (
        <Redirect from='/profile/edit' to='/home'/>
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
                    <label className={user ? 'active' : 'inactive'} for="name">First Name</label>
                </div>
                <div className="input-field col s3">
                    <input
                      id="last_name" type="text" className="validate"
                      defaultValue={user.last_name}
                      ref={(input) => this.last_name = input}
                    />
                    <label className={user ? 'active' : 'inactive'} for="name">Last Name</label>
                </div>
                <div className="input-field col s6">
                    <input
                      id="phone_number" type="text" className="validate"
                      defaultValue={user.phone_number}
                      ref={(input) => this.phone_number = input}
                    />
                    <label className={user ? 'active' : 'inactive'} for="name">Phone Number</label>
                </div>
                <div className="input-field col s12">
                    <input
                      id="motto" type="text" className="validate"
                      defaultValue={user.motto}
                      ref={(input) => this.motto = input}
                    />
                    <label className={user ? 'active' : 'inactive'} for="name">Parenting/Sitting Motto</label>
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
