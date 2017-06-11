import React from 'react';
import KidDisplay from './KidDisplay';

class Kids extends React.Component {

  componentWillMount() {
    this.props.getKids();
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
