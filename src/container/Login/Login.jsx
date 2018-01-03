import React, { Component, PropTypes } from 'react';
import './Login.scss';

class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { onChange, onKeyPress, onClick } = this.props
        return (
            <div className="login-box">
                <h2>登 录</h2>
                <div className="input">
                    <input
                      type="text"
                      placeholder="请输入用户名"
                      onChange={onChange}
                      onKeyPress={onKeyPress}
                    />
                </div>
                <div className="submit">
                    <button type="button" onClick={onClick} >提交</button>
                </div>
            </div>
        )
    }
}

export default Login
