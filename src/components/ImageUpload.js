import React from 'react';
import Dropzone from 'react-dropzone';
import urlFor from '../helpers/urlFor';
import userAuth from '../helpers/userAuth';
import axios from 'axios';

class ImageUpload extends React.Component {

  constructor () {
    super();
    this.state = {
      files:[]
    };
  }

 onDrop(files) {
   this.setState({
     files
   });

      var file = files[0];
      var formfor = this.props.formtype;

      if(formfor == "kid") {
          var imagetype = this.props.kid;
          var imagetypeId = this.props.kid.id;
        }
      else if(formfor == "family") {
          var imagetype = this.props.family;
          var imagetypeId = this.props.family.id;
      }
      else if(formfor == "user") {
          var imagetype = this.props.user;
          var imagetypeId = this.props.user.id;
      };

      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = {
           imagetype: imagetypeId,
           image_url: event.target.result
        };
        if(formfor == "kid") {
          this.props.submitKid(imageData, this.props.kid.id);
        }
        else if(formfor == "family") {
          this.props.editFamily(imageData, this.props.family.id);
        }
        else if(formfor == "user") {
          this.props.editUser(imageData, this.props.user.id);
        };
      };
      reader.readAsDataURL(file);

 }

   render() {
     const { user, family, kid } = this.props;

     return (
       <div>
            <Dropzone className="dropzone center-align" onDrop={this.onDrop.bind(this)}>
              { user && user.image ? <img src={user.image.url} alt="" className="circle profile-img responsive-img"></img>
                :
                family && family.image ? <img src={family.image.url} alt="" className="responsive-img"></img>
                :
                kid && kid.image ? <img src={kid.image.url} alt="" className="circle responsive-img"></img>
                :
                <img src="/img/userplaceholder.png" className="circle responsive-img"></img>
              }
              <br /><br />
              <span className="waves-effect waves-light btn">Upload New Picture</span><br /><br />
            </Dropzone>
            <aside>
                <p>Uploaded files</p>
                <ul>
                 {
                    this.state.files.map(f => <li>{f.name} - {f.size} bytes.  Image will show upon refresh.</li>)
                 }
                </ul>
            </aside>

       </div>
     );
   }

}
export default ImageUpload;
