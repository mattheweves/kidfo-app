import React from 'react';
import FamilyDisplay from './FamilyDisplay';

class Families extends React.Component {

  componentWillMount() {
    //this.props.getFamilies();
  }

  render() {
    const { families, getFamily, showFamily } = this.props;
    const familydisplay = families.map((family, index) => {
      return(
        <FamilyDisplay
          key={index}
          index={index}
          family={family}
          getFamily={getFamily}
          showFamily={showFamily}
        />
      );
    });

    return(
      <div>
        { familydisplay }
      </div>
    );
  }
}

export default Families;
