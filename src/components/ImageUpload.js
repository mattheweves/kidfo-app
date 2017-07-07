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
     return (
       <section className="col s6 offset-s3 ">
         <li><a href="#imageupload">Change Image</a></li>
         <div id="imageupload" className="modal top-sheet">
           <div className="modal-content">
             <h4>Image Upload</h4>
             <div>
               <Dropzone onDrop={this.onDrop.bind(this)}>
                 <img src="/img/userplaceholder.png" className="circle responsive-img"></img>Drop here to add Image
               </Dropzone>
             </div>
             <aside>
               <p>Uploaded files</p>
               <ul>
                {
                   this.state.files.map(f => <li>{f.name} - {f.size} bytes</li>)
                }
               </ul>
             </aside>
           </div>
         </div>
       </section>
     );
   }

}
export default ImageUpload;
