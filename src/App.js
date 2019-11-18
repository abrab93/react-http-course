import React, { Component } from 'react';
import Blog from './containers/Blog/Blog';
import {BrowserRouter} from 'react-router-dom';

class App extends Component {
  render() {
    return (
        //<BrowserRouter basename="/my-app"> if only our app is served from xyz.c/my-app and not from xyz.c/
        <BrowserRouter>
            <div className="App">
                <Blog />
            </div>
        </BrowserRouter>
    );
  }
}

export default App;
