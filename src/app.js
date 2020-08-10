
import React, { Component } from 'react'
import ReactDom from 'react-dom'
import Index from './index'

class App extends Component {
    render(){
        return <Index />
    }
}

ReactDom.render(<App />,document.getElementById('myPro'))