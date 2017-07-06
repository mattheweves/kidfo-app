import React from 'react';
import urlFor from '../../helpers/urlFor';
import userAuth from '../../helpers/userAuth';
import axios from 'axios';

class EnableFamily extends React.Component {


    enableFamily = () => {
      const formData = {
         family:""
       };
      axios.post(urlFor('family'), formData, userAuth())
      .then((res) => {
        localStorage.setItem('family', res.family.id);
        window.location.reload()
      })
      .catch((err) => {
         const { errors } = err.response.status;
          if (errors === 401) {
            this.setState({ error: "Family already enabled!" });
          } else  {
            this.setState({ error: "Request Unsuccessful.!"});
          }
      });
    }

  render() {

    return (
        <a className="waves-effect waves-light btn" onClick={() => this.enableFamily()}>Enable Family Account</a>
    );
  }

}

export default EnableFamily;
