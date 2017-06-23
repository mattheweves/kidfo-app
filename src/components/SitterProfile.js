import React from 'react';

class SitterProfile extends React.Component {


    render () {
    const { sitter } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col s12" >
            <div className="row">
             <br />
              <img className="responsive-img circle col s4 offset-s4" src="http://i.pravatar.cc/150?img=46"></img>
            </div>
            <div className="col s6 offset-s3">
                <h3>{sitter.first_name}</h3>
                <p>{sitter.email}</p>
            </div>
          </div>
        </div>
      </div>
    );

  }

}

export default SitterProfile;
