import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';

import TopNav from './TopNav';
import LeftNav from './LeftNav';
import Button from './Button';

class App extends Component {
  constructor(props) {
    super(props);
  }

  onLogoutPress() {
    fetch('/user/logout', {
      method: 'POST',
    })
      .then(() => {
        window.location.href = '/';
      });
  }

  render() {
    return (
      <div>
        <TopNav />
        <LeftNav />
        <Button onPress={this.onLogoutPress}>Log Out</Button>
      </div>
    );
  }
}

export default App;

