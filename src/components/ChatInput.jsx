import React, {Component} from 'react';

class ChatInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myId: this.props.myId,
            myName: this.props.myName,
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
    }

    // 点击提交或按回车
    handleClick(e) {
        e.preventDefault();
        this.sendMessage()
    }

    handleKeyPress(e) {
        if (e.key == 'Enter') {
            this.sendMessage()
        }
    }

    // 发送聊天信息
    sendMessage() {
        const { socket } = this.props
        const message = this.input.value
        if (message) {
            socket.emit('message', {
                uid: this.state.myId,
                username: this.state.myName,
                message,
            })

            // reset input value
            this.input.value = ''
        }
    }

    render() {
        return(
            <div className="input-box">
                <div className="input">
                    <input
                      type="text"
                      maxLength="140"
                      placeholder="按回车提交"
                      ref={el => this.input = el}
                      onKeyPress={this.handleKeyPress}
                    />
                </div>
                <div className="button">
                    <button type="button" onClick={this.handleClick}>提交</button>
                </div>
            </div>
            )
    }
}

export default ChatInput
