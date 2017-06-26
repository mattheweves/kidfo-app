import React from 'react';

class Session extends React.Component {

  render() {
    return (
      <div className="row">
          <form
            className="col s12"
            onSubmit={(e) => this.onSubmit(e)}
           >
            <div className="row">
              <div className="input-field col s6">
                  <input
                    id="first_name" type="text" className="validate"
                    ref={(input) => this.first_name = input}
                  />
                  <label for="name">First Name</label>
              </div>
              <div className="input-field col s6">
                  <input
                    id="last_name" type="text" className="validate"
                    ref={(input) => this.last_name = input}
                  />
                  <label for="name">Last Name</label>
              </div>
              <div className="input-field col s6">
                  <input
                    id="password" type="password" className="validate"
                    ref={(input) => this.password = input}
                  />
                  <label for="name">Password</label>
              </div>
              <div className="input-field col s6">
                  <input
                    id="password_confirmation" type="password" className="validate"
                    ref={(input) => this.password_confirmation = input}
                  />
                  <label for="name">Password Confirmation</label>
              </div>
            </div>
          <input className="waves-effect waves-light btn" type="submit" value="Create Account" />
          </form>
      </div>

    );

  }

}

export default Session;
