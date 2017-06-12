import React from 'react';
import ShowInvite from './ShowInvite';

class Invites extends React.Component {
  componentWillMount() {
    this.props.getInvites();
  }

  render() {
    const { invites, responseInvite } = this.props;
    console.log(invites);
    const showinvite = invites.map((invite, index) => {
      return(
        <ShowInvite
          key={index}
          index={index}
          invite={invite}
          responseInvite={responseInvite}
        />
      );
    });

    return(
      <div>
        { showinvite }
      </div>
    );
  }
}

export default Invites;
