import React, { Component } from 'react';
import Login from "../components/Login.jsx";

//import { connect } from 'react-redux';

//const mapStateToProps = state => ({
//});

//const mapDispatchToProps = dispatch => ({
//});

class MainContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(`i am MainContainer and I did mount`);
    /* TODO:
       - check for a valid session cookie, if good proceed to checking session in DB
       - if no cookie, show login
    */
    console.log(`are we logged in?`);
    fetch('/api/user/start-session')
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {

      });
  }

  render() {
    return(
      <div className="container">
        <div className="outerBox">
          <h1 id="header">greetings from MainContainer</h1>
          { /* Start adding components here... */ }
          <Login />
        </div>
      </div>
    );
  }

}

export default MainContainer;
//export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);