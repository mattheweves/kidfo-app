import React from 'react';

class ShowInvite extends React.Component {

  render() {
    const { invite, responseInvite } = this.props;

    return (
      <div className="col s12 m8 offset-m2 l6 offset-l3">
        <div className="card-panel grey lighten-5 z-depth-1">
          <div className="row valign-wrapper">
            <div className="col s2">
              <img src="img/whitney.png" alt="" className="circle responsive-img"></img>
            </div>
            <div className="col s6 left-align">
              <span className="black-text left-align">
                <h5>
                { invite.email }
                </h5><br />
                { invite.invite_kind }
              </span>
            </div>
            <div className="col s4">
              <span className="note-card-edit" onClick={() => responseInvite(invite.id, "accept" )}>
                <i className="material-icons">mode_edit</i>
              </span>
              <span className="note-card-edit" onClick={() => responseInvite(invite.id, "reject")}>
                <i className="material-icons">delete</i>
              </span>
            </div>
          </div>
        </div>
      </div>

    );

  }

}

export default ShowInvite;
