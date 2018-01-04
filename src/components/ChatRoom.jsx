import React, { Component } from 'react';
import RoomStatus from './RoomStatus';
import Messages from './Messages';
import ChatInput from './ChatInput';

class ChatRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            onlineUsers: {},
            onlineCount: 0,
            userList: '',
        }
    }

    // 开始监控socket
    componentDidMount() {
        const { socket } = this.props
        socket.on('login', message => this.updateSysMsg(message, 'login'))
        socket.on('logout', message => this.updateSysMsg(message, 'logout'))
        socket.on('message', message => this.updateMsg(message))
    }

    // 处理在线人数及用户名
    handleUsers() {
        const users = this.state.onlineUsers
        const userList = []
        for (let id in users) {
            if (users.hasOwnProperty(id)) {
                userList.push(users[id])
            }
        }
        this.setState({ userList: userList.join('、') })
    }

    handleLogout() {
        location.reload()
    }

    // 生成消息id
    getMsgId() {
        return new Date().getTime() + "" + Math.floor(Math.random() * 899 + 100)
    }

    // 更新系统消息
    updateSysMsg(o, action) {
        const newMsg = {
            type: 'system',
            username: o.user.username,
            uid: o.user.uid,
            action: action,
            msgId: this.getMsgId(),
            time: this.getTime()
        }

        this.setState(prevState => ({
            onlineCount: o.onlineCount,
            onlineUsers: o.onlineUsers,
            messages: prevState.messages.concat(newMsg)
        }))
        this.handleUsers()
    }

    // 发送新消息
    updateMsg(obj) {
        let { messages } = this.state
        const newMsg = {
            type: 'chat',
            username: obj.username,
            uid: obj.uid,
            action: obj.message,
            msgId: this.getMsgId(),
            time: this.getTime()
        }
        messages = messages.concat(newMsg);
        this.setState({ messages })
    }

    // 生成时间
    getTime() {
        let hour = new Date().getHours()
        let minute = new Date().getMinutes()
        hour = (hour == 0) ? '00' : hour;
        minute = (minute < 10) ? '0' + minute : minute;
        return `${hour}:${minute}`
    }

    render() {
        const { uid, username, socket } = this.props
        return (
            <div className="chat-room">
                <div className="welcome">
                    <div className="room-name">hello {username}</div>
                    <div className="button">
                        <button onClick={this.handleLogout}>登出</button>
                    </div>
                </div>
                <RoomStatus onlineCount={this.state.onlineCount} userList={this.state.userList} />
                <Messages messages={this.state.messages} myId={uid} />
                <div ref="chatArea" className="footer">
                    <ChatInput myId={uid} myName={username} socket={socket} />
                </div>
            </div>
        )
    }
}

export default ChatRoom
