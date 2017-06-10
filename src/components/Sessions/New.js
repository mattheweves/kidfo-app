import React from 'react';

class New extends React.Component {

  onSubmit(e) {

    e.preventDefault();
    const formData = {
       email: this.email.value,
       password: this.password.value,
    };
      this.props.signIn(formData);

    };


  render() {

    const { signIn, signedIn } = this.props;

    return (
        <div className="row">
          { signedIn === "true" ?
            ""
            :
          <form
            className="col s12"
            onSubmit={(e) => this.onSubmit(e)}
          >
              <div className="input-field col s6">
                    <input
                      id="email" placeholder="email" type="text" className="validate"
                      ref={(input) => this.email = input}
                    />
                    <label for="email">Email</label>
              </div>
              <div className="input-field col s6">
                    <input
                      id="password" type="password" className="validate"
                      ref={(input) => this.password = input}
                    />
                    <label for="password">Password</label>
              </div>

          <input className="waves-effect waves-light btn" type="submit" value="Submit" />
          </form>
        }
      </div>
    );
  }
}


export default New;
