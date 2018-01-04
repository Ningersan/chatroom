import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

class Messages extends Component {
    componentDidUpdate() {
        // scroll to bottom
        this.messageList.scrollTop = this.messageList.scrollHeight
    }

    render() {
        const { myId, messages } = this.props
        const oneMessage = messages.map(function(message){
            return(
                    <Message
                      key={message.msgId}
                      msgType={message.type}
                      isMe={myId === message.uid}
                      msgUser={message.username}
                      action={message.action}
                      time={message.time}
                    />
                )
        })
        return <div className="messages" ref={el => this.messageList = el}>{oneMessage}</div>
    }
}

class Message extends Component {
    renderSystem() {
        const { msgUser, action, time } = this.props
        return (
            <div className="one-message system-message">
                {msgUser} {(action == 'login') ? '进入了聊天室' : '离开了聊天室'}
                <span className="time">&nbsp;{time}</span>
            </div>
        )
    }

    renderMe() {
        const { isMe, action, msgUser, time } = this.props
        return (
            <div className={isMe ? 'me one-message' : 'other one-message'}>
                <p className="time"><span>{msgUser}</span> {time}</p>
                <div className="message-content">{action}</div>
            </div>
        )
    }

    render() {
        return this.props.msgType == 'system' ? this.renderSystem() : this.renderMe()
    }
}

export default Messages
