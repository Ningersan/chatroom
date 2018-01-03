import React, { Component, PropTypes } from 'react';
import Login from './Login/Login'

class App extends Component {
    constructor() {
        super()
        this.state({ 
            isLogined: false,
            username: '',
            uid: '',
            socket: io()
        })
        this.handleClickLogin = this.handleClickLogin.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    // 生成用户id
    generateUid() {
        return new Date().getTime() + "" + Math.floor(Math.random() * 9 + 1);
    }

    // 监控名称变化
    handleChange(e) {
        this.setState({ username: e.target.value })
    }

    // 监控点击提交或按回车
    handleClickLogin(e) {
        e.preventDefault();
        this.handleLogin();
    }

    handleLKeyPress(e) {
        if (e.key == 'Enter') {
            this.handleLogin()
        }
        return false;
    }

    // 登陆
    handleLogin() {
        let username = this.state.username;

        // 随机生成游客名字
        // username = '游客' + Math.floor(Math.random()*89+10)
        const uid = this.generateUid();
        if (!username) {
            username = '游客' + uid;
        }
        this.setState({ uid: uid, username: username });
        this.state.socket.emit('login', { uid: uid, username: username })
    }

    render() {
        return isLogined ?
            <Login
              onClick={this.handleClickLogin}
              onChange={this.handleChange}
              onKeyPress={this.handleLKeyPress}
            />
            : <ChatRoom
                uid={this.state.uid} 
                username={this.state.username}
                socket={this.state.socket}
            />
    }
}

export default App
