import React from 'react';


class Invitation extends React.Component {

  onSubmit(e, inviteType) {

    const formData = {
       email: this.email.value,
       invite_kind: inviteType
    };
      this.props.sendInvite(formData);
  };


  render() {


    const { sendInvite } = this.props;

    return(
         <div>
             <a className="waves-effect waves-light btn" href="#modalspouse">Invite Spouse</a>
             <a className="waves-effect waves-light btn" href="#modalsitter">Invite Sitter</a>

             <div id="modalspouse" className="modal bottom-sheet">
               <div className="modal-content">
                 <h4>Invite Spouse</h4>
                 <form
                   onSubmit={(e) => this.onSubmit(e, "for_spouse")}
                 >
                     <div className="input-field col s6">
                           <input
                             id="email" placeholder="email" type="text" className="validate"
                             ref={(input) => this.email = input}
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
                             id="email" placeholder="email" type="text" className="validate"
                             ref={(input) => this.email = input}
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
