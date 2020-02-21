import React from "react";

class RoomList extends React.Component {

  render() {
    const orderedRooms = this.props.rooms.sort((a,b) =>{return a.id - b.id})
    return (
      <div className="rooms-list">
        <ul>
          <h3>Your rooms:</h3>
          {orderedRooms.map(room =>{
            const active = room.id === this.props.activeRoom && 'active';
            return (
              <li 
                onClick={() => this.props.subscribeToRoom(room.id)} 
                key={room.id} 
                className={active + " room"}>
                  <a href="#"># {room.name}</a>
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
}

export default RoomList;
