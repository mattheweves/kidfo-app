import React from 'react';
import KidDisplay from './KidDisplay';

class Kids extends React.Component {

  componentWillMount() {
    this.props.getKids();
  }

  render() {
    const { kids, getKid, deleteKid, showKid } = this.props;
    const kiddisplay = kids.map((kid, index) => {
      return(
        <KidDisplay
          key={index}
          index={index}
          kid={kid}
          getKid={getKid}
          deleteKid={deleteKid}
          showKid={showKid}
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
