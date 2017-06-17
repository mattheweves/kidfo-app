import React from 'react';
import { BrowserRouter as Router, Route, Link, BrowserHistory } from 'react-router-dom';
import urlFor from '../../helpers/urlFor';
import userAuth from '../../helpers/userAuth';
import axios from 'axios';
import FamilyDisplay from '../FamilyDisplay';
import EditFamily from '../../components/EditFamily';
import FamilyProfile from '../../components/FamilyProfile';

class Families extends React.Component {

  componentDidMount() {
    this.getFamilies();
  }

  constructor (props) {
    super(props);
    this.state = {
      showFamily: false,
      editFamilyForm: false,
      families: [],
      family: {}
    };
  }

  editMyFamily = () => {
      this.setState({
        family: this.props.user.family_id,
        editFamilyForm: ! this.state.editFamilyForm
      });
  }

  editFamily = (data, id) => {
    axios.patch(urlFor(`family/${id}`), data, userAuth())
    .then((res) => this.setState( { family: res.data, editFamily: false }) )
    .catch((err) => console.log(err.response) );
    this.editMyFamily();
  }

  getFamilies = () => {
    axios.get(urlFor('families'),userAuth())
    .then((res) => this.setState({ families: res.data }))
    .catch((err) => console.log(err.response) );
  }

  getFamily = (id) => {
    axios.get(urlFor(`family/${id}`),userAuth())
    .then((res) => this.setState( { family: res.data, showFamily: true }) )
    .catch((err) => console.log(err.response.data) );
  }

  render() {
    const { families, family, showFamily, editFamilyForm } = this.state;

    return(
      <div>
      { showFamily ?
        <FamilyProfile
          family={family}
        />
        :
        editFamilyForm ?
        <EditFamily
         family={family}
         editFamily={this.editFamily}
        />
        :
        this.state.families.map((family, index) => {
           return(
             <FamilyDisplay
               key={index}
               index={index}
               family={family}
               getFamily={this.getFamily}
               showFamily={this.showFamily}
             />
           );
         })
      }
      <Link to={`/family/edit/`} >
         <a className="waves-effect waves-light btn" onClick={() => this.editMyFamily()}>Edit My Family</a>
      </Link>
      </div>
    );
  }
}

export default Families;
