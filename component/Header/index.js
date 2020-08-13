
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import styles from './index.less'
import logo from '@assets/react.png'

class Index extends Component {
    render(){
        return (
            <div className={styles.header}>
                我是头部
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/product">Product</Link>
                <img src={logo} alt="img" />
            </div>
        )
    }
}

export default Index;