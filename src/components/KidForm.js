import React from 'react';

class KidForm extends React.Component {

  onSubmit(e) {

    e.preventDefault();
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

    return(

      <div className="row">
          <form
            className="col s12"
            onSubmit={(e) => this.onSubmit(e)}
          >
            <div className="row">
             <br />
              <img className="responsive-img circle col s4 offset-s4" src="http://i.pravatar.cc/150?img=46"></img>
            </div>
            <div className="row">
            <div className="input-field col s6">
                  <input
                    id="name" type="text" className="validate"
                    ref={(input) => this.name = input}
                  />
                  <label for="name">Name</label>
              </div>
              <div className="input-field col s6">
                  <input
                    placeholder="                 mm/dd/yyyy"
                    id="birthdate" type="text" className="validate"
                    ref={(input) => this.birthdate = input}
                  />
                  <label for="birthdate">Birth Date</label>
              </div>
              <div className="input-field col s6">
                  <input
                    placeholder="                 M | F"
                    id="gender" type="text" className="validate"
                    ref={(input) => this.gender = input}
                  />
                  <label for="gender">Gender</label>
              </div>
              <div className="input-field col s6">
                  <input
                    id="allergies" type="text" className="validate"
                    ref={(input) => this.allergies = input}
                  />
                  <label for="allergies">Allergies</label>
              </div>
              <div className="input-field col s6">
                  <input
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
                  id="sleeproutine" className="materialize-textarea"
                  ref={(textarea) => this.sleeproutine = textarea}
                />
                <label for="sleeproutine">Sleep Routine</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <textarea
                  id="eatdetails" className="materialize-textarea"
                  ref={(textarea) => this.eatdetails = textarea}
                />
                <label for="eatdetails">Eat Details</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                  <input id="nonos"
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
    );
    }
}

export default KidForm;
