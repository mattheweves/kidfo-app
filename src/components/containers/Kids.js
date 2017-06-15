import React from 'react';
import { BrowserRouter as Router, Route, Link, BrowserHistory } from 'react-router-dom';
import KidDisplay from '../KidDisplay';
import KidForm from '../../components/KidForm';
import KidProfile from '../../components/KidProfile';
import urlFor from '../../helpers/urlFor';
import userAuth from '../../helpers/userAuth';
import axios from 'axios';


class Kids extends React.Component {

  componentWillMount() {
    this.getKids();
  }
  constructor (props) {
    super(props);
    this.state = {
      kids: [],
      showKidForm: false,
      showKid: false,
      kid: {}
    };
  }

  toggleKid = () => {
      this.setState({
        showKidForm: ! this.state.showKidForm,
        kid: {}
      });
  }

  getKids = () => {
    axios.get(urlFor('kids'),userAuth())
    .then((res) => this.setState({ kids: res.data }))
    .catch((err) => console.log(err.response) );
  }

  getKid = (id) => {
    axios.get(urlFor(`kids/${id}`),userAuth())
    .then((res) => this.setState( { kid: res.data, showKid: true }) )
    .catch((err) => console.log(err.response.data) );
  }

  editKid = (kid) => {
      console.log(kid.name);
      this.setState({
        kid: kid,
        showKidForm: ! this.state.showKidForm
      });
  }

  submitKid = (data, id) => {
    this.performSubmissionRequest(data,id)
    .then((res) => this.setState( { kid: res.data, showKidForm: false }) )
    .catch((err) => {
       const { errors } = err.response.data;
        if (errors.name) {
          this.setState({ error: "Missing Name!" });
        } else  {
          this.setState({ error: "Error: check your Data!"});
        }
    });
  }

  deleteKid = (id) => {
    const newKidsState = this.state.kids.filter((kid) => kid.id !== id );
    axios.delete(urlFor(`kids/${id}`),userAuth())
    .then((res) => this.setState( { kids: newKidsState }) )
    .catch((err) => console.log(err.response.data) );
  }

  performSubmissionRequest = (data, id) => {
    if (id) {
      return axios.patch(urlFor(`kids/${id}`), data,userAuth());
    }
    else {
      return axios.post(urlFor(`kids`), data,userAuth());
    }
  }

  render() {
    const { kid, getKid, deleteKid, editKid,
            showKid, showKidForm } = this.state;

    const kiddisplay = this.state.kids.map((kid, index) => {
      return(
        <KidDisplay
          key={index}
          index={index}
          kid={kid}
          getKid={this.state.getKid}
          deleteKid={this.state.deleteKid}
          showKid={this.state.showKid}
          editKid={this.state.editKid}
        />
      );
    });

    return(
      <div>
      <Route path="/kid/:id" component={KidProfile}/>
      { showKidForm ?
        <KidForm
          kid={kid}
          submitKid={this.submitKid}
        />
          :
        showKid ?
        <KidProfile
          kid={kid}
          getFamily={this.getFamily}
        />
          :
          ""
        //  { kiddisplay }
        // <Kids
        //   getKids={this.getKids}
        //   kids={kids}
        //   getKid={this.getKid}
        //   deleteKid={this.deleteKid}
        //   showKid={this.showKid}
        //   editKid={this.editKid}
        // />
      }

      </div>
    );
  }
}

export default Kids;
