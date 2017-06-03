import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav';
import Kids from './components/Kids';
import Kid from './components/Kid';

class App extends Component {
  constructor () {
    super();
    this.state = {
      showKid: false,
      kids: [],
      kid: {},
      error: ''
    };
  }

  getKids = () => {
    console.log("Kids");
  }

  render() {

    const { showKid, kids, kid, error } = this.state;

    return (
      <div className="App">

        <Nav  />
        <Kids
          getKids={this.getKids}
          kids={kids}
          getKid={this.getKid}
        />

      </div>
    );
  }
}

export default App;
