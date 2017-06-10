import urlFor from '../../../helpers/urlFor';
import axios from 'axios';

class User {


  setIsLoading(status) {
    this.isLoading = status;
  }

  setSignedIn(status, email) {
    this.signedIn = status;
    if(status && email) {
      this.email = email;
    }
  }

  async createSession(email, password) {
    this.setIsLoading(true);

    const response = //signIn = (data) => {
      axios.get(urlFor(`sessions`))
      .then((res) => console.log(res.data) )
      .catch((err) => console.log(err.response.data) );
    //};

    const status =  response.status;

    if (status == 201) {
      const body =  response.json();
      const { user } = body.data;
      localStorage.setItem('token', user.authentication_token);
      localStorage.setItem('email', user.email);

      this.setIsLoading(false);
      this.setSignedIn(true, user.email);

  } else {
    console.log('error');
    }

  }

}
