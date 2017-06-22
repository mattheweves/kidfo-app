import React from 'react';
import { BrowserRouter as Router, Route, Link, BrowserHistory, Redirect } from 'react-router-dom';

class EditFamily extends React.Component {

    state = {
      redirectToReferrer: false
    }

    onSubmit(e) {

      const formData = {
         name: this.name.value,
         emerg_contact_1: this.emerg_contact_1.value,
         emerg_contact_1_phone: this.emerg_contact_1_phone.value,
         emerg_contact_2: this.emerg_contact_2.value,
         emerg_contact_2_phone: this.emerg_contact_2_phone.value,
         insuranceprovider: this.insuranceprovider.value,
         health_ins_enrollee_id: this.health_ins_enrollee_id.value,
         health_ins_group_num: this.health_ins_group_num.value,
         physicianname: this.physicianname.value,
         physicianphone: this.physicianphone.value
      };
        this.props.editFamily(formData, this.props.family.id);
    };

    render() {

    const { family, submitFamily, editFamilyForm } = this.props;
    const { redirectToReferrer } = this.state;

    if (editFamilyForm) {
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
            <div className="input-field col s6 active">
                  <input
                    id="name"
                    defaultValue={family.name}
                    type="text" className="validate"
                    ref={(input) => this.name = input}
                  />
                  <label for="name">Name</label>
              </div>
              <div className="input-field col s6">
                  <input
                    defaultValue={family.emerg_contact_1}
                    id="emerg_contact_1" type="text" className="validate"
                    ref={(input) => this.emerg_contact_1 = input}
                  />
                  <label for="emerg_contact_1">Emergency Contact 1</label>
              </div>
              <div className="input-field col s6">
                  <input
                    defaultValue={family.emerg_contact_1_phone}
                    id="emerg_contact_1" type="text" className="validate"
                    ref={(input) => this.emerg_contact_1_phone = input}
                  />
                  <label for="emerg_contact_1_phone">Emergency Contact 1 Phone</label>
              </div>
              <div className="input-field col s6">
                  <input
                    defaultValue={family.emerg_contact_2}
                    id="emerg_contact_1" type="text" className="validate"
                    ref={(input) => this.emerg_contact_2 = input}
                  />
                  <label for="emerg_contact_2">Emergency Contact 2</label>
              </div>
              <div className="input-field col s6">
                  <input
                    defaultValue={family.emerg_contact_2_phone}
                    id="emerg_contact_1" type="text" className="validate"
                    ref={(input) => this.emerg_contact_2_phone = input}
                  />
                  <label for="emerg_contact_2_phone">Emergency Contact 2 Phone</label>
              </div>
              <div className="input-field col s6">
                  <input
                    defaultValue={family.insuranceprovider}
                    id="insuranceprovider" type="text" className="validate"
                    ref={(input) => this.insuranceprovider = input}
                  />
                  <label for="insuranceprovider">Insurance Provider</label>
              </div>
              <div className="input-field col s6">
                  <input
                    defaultValue={family.health_ins_enrollee_id}
                    id="health_ins_enrollee_id" type="text" className="validate"
                    ref={(input) => this.health_ins_enrollee_id = input}
                  />
                  <label for="health_ins_enrollee_id">Enrollee ID</label>
              </div>
              <div className="input-field col s6">
                  <input
                    defaultValue={family.health_ins_group_num}
                    id="health_ins_group_num" type="text" className="validate"
                    ref={(input) => this.health_ins_group_num = input}
                  />
                  <label for="health_ins_group_num">Group Number</label>
              </div>
              <div className="input-field col s6">
                  <input
                    defaultValue={family.physicianname}
                    id="physicianname" type="text" className="validate"
                    ref={(input) => this.physicianname = input}
                  />
                  <label for="physicianname">Physician Name</label>
              </div>
              <div className="input-field col s6">
                  <input
                    defaultValue={family.physicianphone}
                    id="health_ins_group_num" type="text" className="validate"
                    ref={(input) => this.physicianphone = input}
                  />
                  <label for="physicianphone">Physician Phone</label>
              </div>
            </div>
          <input className="waves-effect waves-light btn" type="submit" value="Submit" />
          </form>
      </div>
    )
   }
    return (
      <Redirect from={EditFamily} to='/myfamily'/>
    );
  }
}

export default EditFamily;
