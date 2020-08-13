
import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import ReactDom from 'react-dom';
import Index from './index';
import About from './about';
import Product from './product';

class App extends Component {
    render(){
        return (
            <Router>
                <Route path="/" exact component={Index}></Route>
                <Route path="/about" component={About}></Route>
                <Route path="/product" component={Product}></Route>
            </Router>
        )
    }
}

ReactDom.render(<App />,document.getElementById('myPro'))