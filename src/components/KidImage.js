import React from 'react';
import Dropzone from 'react-dropzone';
import urlFor from '../helpers/urlFor';
import userAuth from '../helpers/userAuth';
import axios from 'axios';

class KidImage extends React.Component {

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
      var file = files[0]
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = {
           kid: this.props.kid.id,
           image_url: event.target.result
        };
        this.props.submitKid(imageData, this.props.kid.id);
        console.log(event.target.result);

      };
      reader.readAsDataURL(file);
 }

   render() {
     return (
       <section>
         <div className="dropzone">
           <Dropzone onDrop={this.onDrop.bind(this)}>
             <p>Try dropping some files here, or click to select files to upload.</p>
           </Dropzone>
         </div>
         <aside>
           <h2>Dropped files</h2>
           <ul>
            {
               this.state.files.map(f => <li>{f.name} - {f.size} bytes</li>)
            }
           </ul>
         </aside>
       </section>
     );
   }

}
export default KidImage;
