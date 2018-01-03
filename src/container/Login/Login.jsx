import React, { Component, PropTypes } from 'react';
import './loginbox.scss';

export default class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="login-box">
                <h2>登 陆</h2>
                <div className="input">
                    <input type="text" placeholder="请输入用户名" onChange={this.handleChange.bind(this)}
                        onKeyPress={this.handleKeyPress.bind(this)} />
                </div>
                <div className="submit">
                    <button type="button" onClick={this.handleClick.bind(this)} >提交</button>
                </div>
            </div>
        )
    }
}

export default Login
