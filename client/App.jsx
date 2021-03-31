import React, { Component } from 'react';
import MainContainer from './containers/MainContainer.jsx';
import Cookies from 'js-cookie';

/* 

import Characters from './components/Characters';
import CreateCharacter from './components/CreateCharacter';

*/



class App extends Component {
  constructor(props) {
    super(props);
    console.log(Cookies.get('ssid'));
  }

  render() {
    return(
      <div>
        hello from banana-town (react)
        <MainContainer/>
      </div>
    );
  }
}

export default App;


