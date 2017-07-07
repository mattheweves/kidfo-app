import React from 'react';

class SitterProfile extends React.Component {


    render () {
    const { sitter } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col s12" >
            <div className="row">
              <div className="col s4 offset-s4">
                { sitter.image ? <img src={sitter.image.url} alt="" className="circle responsive-img"></img> : "" }
              </div>
            </div>
            <div className="col s6 offset-s3">
                <h3>{sitter.first_name} {sitter.last_name}</h3><br />
                Care Motto:<i>{sitter.motto}</i><br />
                <b>{sitter.phone_number}</b>
                <p>{sitter.email}</p>
            </div>
          </div>
        </div>
      </div>
    );

  }

}

export default SitterProfile;
