import React from 'react';
import ImageUpload from './ImageUpload';
import urlFor from '../helpers/urlFor';
import userAuth from '../helpers/userAuth';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';


class KidForm extends React.Component {

    onSubmit(e) {

      const formData = {
         name: this.name.value,
         gender: this.gender.value,
         allergies: this.allergies.value,
         nonos: this.nonos.value,
         eatdetails: this.eatdetails.value,
         sleeproutine: this.sleeproutine.value,
         birthdate: this.birthdate.value,
         bedtime: this.bedtime.value
      };
        this.submitKid(formData, this.props.kid.id);
        this.setState({ redirectToReferrer: true })
        window.location.reload();

    };

    state = {
      redirectToReferrer: false
    }

    performSubmissionRequest = (formdata, id) => {
      if (id) {
        return axios.patch(urlFor(`kids/${id}`), formdata,userAuth());
      }
      else {
        return axios.post(urlFor('kids'), formdata,userAuth());
      }
    }

    submitKid = (data, id) => {
      this.performSubmissionRequest(data,id)
      .then((res) => this.setState( { redirectToReferrer: true }) )
      .catch((err) => {
         const { errors } = err.response.data;
          if (errors.name) {
            this.setState({ error: "Missing Name!" });
          } else  {
            this.setState({ error: "Error: check your Data!"});
          }
      });
    }


    render() {

    const { kid } = this.props;
    const haveFamily = localStorage.getItem('family') > 0;
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return (
        <Redirect to='/kids'/>
      )
    }
    return(
      <div>
      {
       haveFamily ?
        <div>
        { kid.name ?
        <ImageUpload
          formtype="kid"
          kid={kid}
          submitKid={this.submitKid}
        /> : "" }
        <div className="row">
          <form
            className="col s12"
            onSubmit={(e) => this.onSubmit(e)}
          >
            <div className="row">
            <div className="input-field col s6 active">
                  <input
                    id="name"
                    defaultValue={kid.name}
                    type="text" className="validate"
                    ref={(input) => this.name = input}
                  />
                  <label className={kid ? 'active' : 'inactive'} for="name">Name</label>
              </div>
              <div className="input-field col s6">
                  <input
                    defaultValue={kid.birthdate}
                    placeholder="                 mm/dd/yyyy"
                    id="birthdate" type="text" className="validate"
                    ref={(input) => this.birthdate = input}
                  />
                  <label className={kid ? 'active' : 'inactive'} for="birthdate">Birth Date</label>
              </div>
              <div className="input-field col s6">
                  <input
                    defaultValue={kid.gender}
                    placeholder="                 M | F"
                    id="gender" type="text" className="validate"
                    ref={(input) => this.gender = input}
                  />
                  <label className={kid ? 'active' : 'inactive'} for="gender">Gender</label>
              </div>
              <div className="input-field col s6">
                  <input
                    defaultValue={kid.allergies}
                    id="allergies" type="text" className="validate"
                    ref={(input) => this.allergies = input}
                  />
                  <label className={kid ? 'active' : 'inactive'} for="allergies">Allergies</label>
              </div>
              <div className="input-field col s6">
                  <input
                    defaultValue={kid.bedtime}
                    placeholder="                 Ex: 8PM"
                    id="bedtime" type="text" className="validate"
                    ref={(input) => this.bedtime = input}
                  />
                  <label className={kid ? 'active' : 'inactive'} for="bedtime">BedTime</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <textarea
                  defaultValue={kid.sleeproutine}
                  id="sleeproutine" className="materialize-textarea"
                  ref={(textarea) => this.sleeproutine = textarea}
                />
                <label className={kid ? 'active' : 'inactive'} for="sleeproutine">Sleep Routine</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <textarea
                  defaultValue={kid.eatdetails}
                  id="eatdetails" className="materialize-textarea"
                  ref={(textarea) => this.eatdetails = textarea}
                />
                <label className={kid ? 'active' : 'inactive'} for="eatdetails">Eat Details</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                  <input id="nonos"
                    defaultValue={kid.nonos}
                    placeholder="                   Screens before bed, TV during dinner, sugar, dairy."
                    type="text" className="validate"
                    ref={(input) => this.nonos = input}
                  />
                  <label className={kid ? 'active' : 'inactive'} for="nonos">No-Nos</label>
              </div>
            </div>
          <input className="waves-effect waves-light btn" type="submit" value="Submit" />
          </form>
          </div>
        </div>
        :""
      }
    </div>
    );
    }
}

export default KidForm;
