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

  constructor () {
    super();
    this.state = {
      showFamily: false,
      families: [],
      family: {}
    };
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
    const { families, family, showFamily } = this.state;
    let familiesExist = families.length > 0;

     if(familiesExist){
          return(
            <Router>
            <div><div className="row"><h5 className="left">Families I Sit For</h5></div>
              { showFamily ?
                <Route path={`/families/${family.id}`} render={props => <FamilyProfile family={family} /> } />
                :
                this.state.families.map((family, index) => {
                   return(
                     <div>
                      <FamilyDisplay
                       index={index}
                       family={family}
                       getFamily={this.getFamily}
                       showFamily={this.showFamily}
                     />
                     </div>
                   );
                 })
              }
            </div>
            </Router>
          );
        }
      else
       { return(
         <div>
           You are not a sitter for any families at this time.  Have them invite you via your email address, and once you accept the invitation, their family info and KIDFO will show up here!<br /><br />
            <Link to="/home" className="waves-effect waves-light btn">Go Home</Link>
          </div>

       ); }
      }
    }

export default Families;
