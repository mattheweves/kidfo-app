import React from 'react';
import ShowInvite from '../ShowInvite';
import urlFor from '../../helpers/urlFor';
import userAuth from '../../helpers/userAuth';
import axios from 'axios';

class Invites extends React.Component {

  componentWillMount() {
    this.getInvites();
  }

  constructor (props) {
    super(props);
    this.state = {
      invites: []
    };
  }

  getInvites = () => {
    axios.get(urlFor('invites'),userAuth())
    .then((res) => this.setState({ invites: res.data }))
    .catch((err) => console.log(err.response) );
  }

  responseInvite = (id, action) => {
    axios.post(urlFor(`invites/${id}/${action}`),userAuth())
    .then((res) => this.setState({ invites: res.data }))
    .catch((err) => console.log(err.response) );
  }

  render() {
    const { invites } = this.state;
    const showinvite = invites.map((invite, index) => {
      return(
        <ShowInvite
          key={index}
          index={index}
          invite={invite}
          responseInvite={this.responseInvite}
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