import React from 'react';
import { BrowserRouter as Router, Route, Link, BrowserHistory, Redirect } from 'react-router-dom';
import ImageUpload from './ImageUpload';

class EditFamily extends React.Component {

    componentDidMount() {
      this.props.getMyFamily(localStorage.getItem('family'));
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

    const { family, editFamily, editFamilyForm } = this.props;

    if (editFamilyForm) {
    return(
      <div>
      <ImageUpload
        formtype="family"
        family={family}
        editFamily={editFamily}
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
                    placeholder=" "
                    defaultValue={family.name}
                    type="text" className="validate"
                    ref={(input) => this.name = input}
                  />
                  <label className={family ? 'active' : 'inactive'} for="name">Name</label>
              </div>
              <div className="input-field col s6">
                  <input
                    defaultValue={family.emerg_contact_1}
                    id="emerg_contact_1" type="text" className="validate"
                    ref={(input) => this.emerg_contact_1 = input}
                  />
                  <label className={family ? 'active' : 'inactive'} for="emerg_contact_1">Emergency Contact 1</label>
              </div>
              <div className="input-field col s6">
                  <input
                    defaultValue={family.emerg_contact_1_phone}
                    id="emerg_contact_1" type="text" className="validate"
                    ref={(input) => this.emerg_contact_1_phone = input}
                  />
                  <label className={family ? 'active' : 'inactive'} for="emerg_contact_1_phone">Emergency Contact 1 Phone</label>
              </div>
              <div className="input-field col s6">
                  <input
                    defaultValue={family.emerg_contact_2}
                    id="emerg_contact_1" type="text" className="validate"
                    ref={(input) => this.emerg_contact_2 = input}
                  />
                  <label className={family ? 'active' : 'inactive'} for="emerg_contact_2">Emergency Contact 2</label>
              </div>
              <div className="input-field col s6">
                  <input
                    defaultValue={family.emerg_contact_2_phone}
                    id="emerg_contact_1" type="text" className="validate"
                    ref={(input) => this.emerg_contact_2_phone = input}
                  />
                  <label className={family ? 'active' : 'inactive'} for="emerg_contact_2_phone">Emergency Contact 2 Phone</label>
              </div>
              <div className="input-field col s6">
                  <input
                    defaultValue={family.insuranceprovider}
                    id="insuranceprovider" type="text" className="validate"
                    ref={(input) => this.insuranceprovider = input}
                  />
                  <label className={family ? 'active' : 'inactive'} for="insuranceprovider">Insurance Provider</label>
              </div>
              <div className="input-field col s6">
                  <input
                    defaultValue={family.health_ins_enrollee_id}
                    id="health_ins_enrollee_id" type="text" className="validate"
                    ref={(input) => this.health_ins_enrollee_id = input}
                  />
                  <label className={family ? 'active' : 'inactive'} for="health_ins_enrollee_id">Enrollee ID</label>
              </div>
              <div className="input-field col s6">
                  <input
                    defaultValue={family.health_ins_group_num}
                    id="health_ins_group_num" type="text" className="validate"
                    ref={(input) => this.health_ins_group_num = input}
                  />
                  <label className={family ? 'active' : 'inactive'} for="health_ins_group_num">Group Number</label>
              </div>
              <div className="input-field col s6">
                  <input
                    defaultValue={family.physicianname}
                    id="physicianname" type="text" className="validate"
                    ref={(input) => this.physicianname = input}
                  />
                  <label className={family ? 'active' : 'inactive'} for="physicianname">Physician Name</label>
              </div>
              <div className="input-field col s6">
                  <input
                    defaultValue={family.physicianphone}
                    id="health_ins_group_num" type="text" className="validate"
                    ref={(input) => this.physicianphone = input}
                  />
                  <label className={family ? 'active' : 'inactive'} for="physicianphone">Physician Phone</label>
              </div>
            </div>
          <input className="waves-effect waves-light btn" type="submit" value="Submit" />
          </form>
      </div>
    </div>
    )
   }
    return (
      <Redirect from={EditFamily} to='/myfamily'/>
    );
  }
}

export default EditFamily;
