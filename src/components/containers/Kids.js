import React from 'react';
import KidDisplay from '../KidDisplay';
import urlFor from '../../helpers/urlFor';
import userAuth from '../../helpers/userAuth';
import axios from 'axios';


class Kids extends React.Component {

  constructor () {
    super();
    this.state = {
      kids: [],
    };
  }

  componentWillMount() {
    this.getKids();
  }

  getKids = () => {
    axios.get(urlFor('kids'),userAuth())
    .then((res) => this.setState({ kids: res.data }))
    .catch((err) => console.log(err.response) );
  }

  render() {
    const { kids, getKid, deleteKid, showKid, editKid } = this.props;
    const kiddisplay = kids.map((kid, index) => {
      return(
        <KidDisplay
          key={index}
          index={index}
          kid={kid}
          getKid={getKid}
          deleteKid={deleteKid}
          showKid={showKid}
          editKid={editKid}
        />
      );
    });

    return(
      <div>
        { kiddisplay }
      </div>
    );
  }
}

export default Kids;
