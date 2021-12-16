// CSS
import 'antd/dist/antd.less';
import './assets/css/main.css';
// JS
import React, { Component } from 'react';


import MainRouter from "./components/routing/Router";

class App extends Component {
  render() {
    return (
        <>
            <MainRouter />
        </>
    );
  }
}

export default App;