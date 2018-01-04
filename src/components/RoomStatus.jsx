import React, { Component } from 'react';

class RoomStatus extends Component {
    render() {
        const { onlineCount, userList } = this.props
        return <div className="room-status">在线人数: {onlineCount}, 在线列表: {userList}</div>
    }
}

export default RoomStatus
