import React from 'react';
import urlFor from '../helpers/urlFor';
import userAuth from '../helpers/userAuth';
import axios from 'axios';


class Invitation extends React.Component {

  onSubmit(e, inviteType) {

    var emailval = "";

    { inviteType == "for_spouse" ? emailval=this.emailspouse.value : emailval=this.emailsitter.value};

    const formData = {
       email: emailval,
       invite_kind: inviteType
    };
      this.sendInvite(formData);
  };

  sendInvite = (data) => {
    axios.post(urlFor('invites'), data, userAuth())
    .then((res) => console.log(res.data) )
    .catch((err) => {
       const { errors } = err.response.data;
        if (errors.email) {
          this.setState({ error: "Email Cannot Be Blank!" });
        } else  {
          this.setState({ error: "Unknown Error"});
        }
    });
  }


  render() {

    return(
         <div>
             <div id="modalspouse" className="modal bottom-sheet">
               <div className="modal-content">
                 <h4>Invite Spouse</h4>
                 <form
                   onSubmit={(e) => this.onSubmit(e, "for_spouse")}
                 >
                     <div className="input-field col s6">
                           <input
                             id="emailspouse" placeholder="email" type="text" className="validate"
                             ref={(input) => this.emailspouse = input}
                           />
                           <label for="email">Email</label>
                     </div>
                     <div className="modal-footer">
                       <input className="waves-effect waves-light btn" type="submit" value="Submit" />
                     </div>
                 </form>
               </div>
             </div>

             <div id="modalsitter" className="modal bottom-sheet">
               <div className="modal-content">
                 <h4>Invite Sitter</h4>
                 <form
                   onSubmit={(e) => this.onSubmit(e, "for_sitter")}
                 >
                     <div className="input-field col s6">
                           <input
                             id="emailsitter" placeholder="email" type="text" className="validate"
                             ref={(input) => this.emailsitter = input}
                           />
                           <label for="email">Email</label>
                     </div>
                     <div className="modal-footer">
                       <input className="waves-effect waves-light btn" type="submit" value="Submit"/>
                     </div>
                 </form>
               </div>
             </div>
         </div>

    );

  }

}

export default Invitation;
