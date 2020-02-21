import React from "react";

class RoomList extends React.Component {

  render() {
    return (
      <div className="rooms-list">
        <ul>
          <h3>Your rooms:</h3>
          {this.props.rooms.map(room =>{
            return (
              <li 
                onClick={() => this.props.subscribeToRoom(room.id)} 
                key={room.id} 
                className="room">
                  # {room.name}
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
}

export default RoomList;
