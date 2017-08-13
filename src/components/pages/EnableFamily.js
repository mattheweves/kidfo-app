import React from 'react';
import urlFor from '../../helpers/urlFor';
import userAuth from '../../helpers/userAuth';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Redirect,  BrowserHistory } from 'react-router-dom';


class EnableFamily extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      familyEnabled: false
    };
  }

    enableFamily = () => {
      const formData = {
         family:""
       };
      axios.post(urlFor('family'), formData, userAuth())
      .then((res) => {
        this.setState( { familyEnabled: true });
        localStorage.setItem('family', res.family.id);
      })
      .catch((err) => {
        if (err.response.status == 401) {
          this.setState( { familyEnabled: false });
          this.setState({ error: "You cannot enable a Family Account."});
        }
      });
    }

  render() {

    const { familyEnabled } = this.state;
    const hasFamily = localStorage.getItem('family') > 0;

    if(hasFamily) {
      <Redirect from='/myfamily/enable' to='/home'/>
    }
    else if(familyEnabled){
      return(
        <div>
          Congratulations, family account enabled!  You can edit your Family Details in the side menu, or use the link below.<br /><br />
          <Link to='/myfamily/edit'><a className="waves-effect waves-light btn">Edit Family</a></Link><br/>
        </div>
      );
    }
    else {
    return (
      <div>
        <a className="waves-effect waves-light btn" onClick={() => this.enableFamily()}>Enable Family Account</a>
      </div>
    );
  }
  }

}

export default EnableFamily;
