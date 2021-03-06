import React, { Component, PropTypes } from 'react'
import ChatRoom from '../components/ChatRoom'
import './loginbox.scss'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username:'',
            uid:'',
        }
        this.socket = io()
    }

    // 监控名称变化
    handleChange(e) {
        this.setState({username: e.target.value})
    }

    // 监控点击提交或按回车
    handleClick(e) {
        e.preventDefault();
        this.handleLogin();
    }

    handleKeyPress(e) {
        if (e.key == 'Enter') {
            this.handleLogin()
        }
        return false;
    }

    // 登陆
    handleLogin() {
        let username = this.state.username
        const uid = this.getUid();
        if (!username) {
            username = '游客'+ uid;
        }
        this.setState({uid:uid, username:username});
        this.socket.emit('login', {uid:uid, username:username})
    }

    // 生成用户id
    getUid() {
        return new Date().getTime() + "" + Math.floor(Math.random() * 9 + 1)
    }

    render() {
        let renderDOM;
        if (this.state.uid) {
            renderDOM = <ChatRoom uid={this.state.uid} username={this.state.username} socket={this.socket}/>
        } else {
            renderDOM = (<div className="login-box">
                            <h2>登 陆</h2>
                            <div className="input">
                                <input type="text" placeholder="请输入用户名" onChange={this.handleChange.bind(this)}
                                onKeyPress={this.handleKeyPress.bind(this)}/>
                            </div>
                            <div className="submit">
                                <button type="button" onClick={this.handleClick.bind(this)} >提交</button>
                            </div>
                        </div>)
        }
        return (<div>{renderDOM}</div>)
    }
}

export default App