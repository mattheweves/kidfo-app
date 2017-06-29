import React from 'react';
import KidImage from './KidImage';

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
        this.props.submitKid(formData, this.props.kid.id);

    };


    render() {

    const { kid, submitKid } = this.props;
    console.log(kid.name);
    return(
      <div>
      <KidImage
        kid={kid}
        submitKid={submitKid}
      />
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
                  <label for="name">Name</label>
              </div>
              <div className="input-field col s6">
                  <input
                    defaultValue={kid.birthdate}
                    placeholder="                 mm/dd/yyyy"
                    id="birthdate" type="text" className="validate"
                    ref={(input) => this.birthdate = input}
                  />
                  <label for="birthdate">Birth Date</label>
              </div>
              <div className="input-field col s6">
                  <input
                    defaultValue={kid.gender}
                    placeholder="                 M | F"
                    id="gender" type="text" className="validate"
                    ref={(input) => this.gender = input}
                  />
                  <label for="gender">Gender</label>
              </div>
              <div className="input-field col s6">
                  <input
                    defaultValue={kid.allergies}
                    id="allergies" type="text" className="validate"
                    ref={(input) => this.allergies = input}
                  />
                  <label for="allergies">Allergies</label>
              </div>
              <div className="input-field col s6">
                  <input
                    defaultValue={kid.bedtime}
                    placeholder="                 Ex: 8PM"
                    id="bedtime" type="text" className="validate"
                    ref={(input) => this.bedtime = input}
                  />
                  <label for="bedtime">BedTime</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <textarea
                  defaultValue={kid.sleeproutine}
                  id="sleeproutine" className="materialize-textarea"
                  ref={(textarea) => this.sleeproutine = textarea}
                />
                <label for="sleeproutine">Sleep Routine</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <textarea
                  defaultValue={kid.eatdetails}
                  id="eatdetails" className="materialize-textarea"
                  ref={(textarea) => this.eatdetails = textarea}
                />
                <label for="eatdetails">Eat Details</label>
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
                  <label for="nonos">No-Nos</label>
              </div>
            </div>
          <input className="waves-effect waves-light btn" type="submit" value="Submit" />
          </form>
          </div>
      </div>
    );
    }
}

export default KidForm;
