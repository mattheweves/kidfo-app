import React from 'react';
import Kid from './Kid';

class Kids extends React.Component {

  render() {
    const { kids, getKid } = this.props;
    const kiddisplay = kids.map((kid, index) => {
      return(
        <Kid
          key={index}
          index={index}
          kid={kid}
          getKid={getKid}
        />
      );
    });

    return(
      <div className="kid-container">
        { kiddisplay }
      </div>
    );
  }
}

export default Kids;
