import React from 'react';

class ShowInvite extends React.Component {


  getInviteKind = () => {
    if(this.props.invite.kind == "for_sitter") {
      "sitter"
    }
    else {
      "parent"
    };
  }

  render() {
    const { invite, responseInvite } = this.props;


    return (
      <div className="col s12 m8 offset-m2 l6 offset-l3">
        <div className="card-panel grey lighten-5 z-depth-1">
          <div className="row valign-wrapper">
            <div className="col s6 left-align">
              <span className="black-text left-align">
                You have been invited to be a { invite.invite_kind == "for_sitter" ? "sitter" : "parent" } for the { invite.family.name } Family.<br />
              </span>
            </div>
            <div className="col s4">
              <a className="waves-effect waves-light btn" onClick={() => responseInvite(invite.id, "accept" )}>Accept</a><br /><br />
              <a className="waves-effect waves-light btn" onClick={() => responseInvite(invite.id, "reject" )}>Reject</a>
            </div>
          </div>
        </div>
      </div>

    );

  }

}

export default ShowInvite;
