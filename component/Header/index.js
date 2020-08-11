import React, { Component } from 'react'
import styles from './index.less'
import logo from '@assets/react.png'

class Index extends Component {
    render(){
        return (
            <div className={styles.header}>
                我是头部
                <img src={logo} alt="img" />
            </div>
        )
    }
}

export default Index;