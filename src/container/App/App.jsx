import React, { Component, PropTypes } from 'react'
import Login from '../Login/Login'
import ChatRoom from '../../components/ChatRoom'

class App extends Component {
    constructor() {
        super()
        this.state = {
            isLogined: false,
            username: '',
            uid: '',
            socket: io(),
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    // 监控名称变化
    handleChange(e) {
        this.setState({ username: e.target.value })
    }

    // 监控点击提交或按回车
    handleClick(e) {
        e.preventDefault()
        this.handleLogin()
    }

    handleKeyPress(e) {
        if (e.key == 'Enter') {
            this.handleLogin()
        }
        return false;
    }

    // 登陆
    handleLogin() {
        const uid = this.getUid();
        const username = this.state.username || `游客 ${uid}`;

        this.setState({ isLogined: true, uid: uid, username: username });
        this.state.socket.emit('login', { uid: uid, username: username })
    }

    // 生成用户id
    getUid() {
        return new Date().getTime() + "" + Math.floor(Math.random() * 9 + 1)
    }

    render() {
        return !this.state.isLogined ?
            <Login
              onClick={this.handleClick}
              onChange={this.handleChange}
              onKeyPress={this.handleKeyPress}
            />
            : <ChatRoom
                uid={this.state.uid}
                username={this.state.username}
                socket={this.state.socket}
            />
    }
}

export default App
