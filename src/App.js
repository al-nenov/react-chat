import React from "react";
import "./App.css";
import Chatkit from "@pusher/chatkit-client";

import MessageList from "./components/MessageList";
import SendMessageForm from "./components/SendMessageForm";
import RoomList from "./components/RoomList";
import NewRoomForm from "./components/NewRoomForm";

import { tokenUrl, instanceLocator } from "./config";

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      roomId: null,
      messages: [],
      joinableRooms: [],
      joinedRooms: []
    }
    this.sendMessage = this.sendMessage.bind(this)
    this.subscribeToRoom = this.subscribeToRoom.bind(this)
    this.getJoinableRooms = this.getJoinableRooms.bind(this)
  }
  componentDidMount() {
    const tokenProvider = new Chatkit.TokenProvider({
      url: tokenUrl
    });

    const chatManager = new Chatkit.ChatManager({
      instanceLocator,
      userId: "testis-id",
      tokenProvider: tokenProvider
    });

    chatManager.connect()
      .then(currentUser => {
        this.currentUser = currentUser
        this.getJoinableRooms()
      })
      
  }

  // Get rooms
  getJoinableRooms() {    
    this.currentUser.getJoinableRooms()
    .then(joinableRooms => {        
      this.setState({
        joinableRooms,
        joinedRooms: this.currentUser.rooms
      })
    })
    .catch(error => console.error("Error on joinable rooms: ", error))
  }

  // Subscribe to room and hook to messages 
  subscribeToRoom(roomId) {
    this.setState({messages:[]})
    this.currentUser.subscribeToRoom({
      roomId: roomId,
      hooks: {
        onMessage: message => {
          this.setState({
            messages: [...this.state.messages, message]
          })
        }
      }              
    }).then(room => {
      this.setState({
        roomId: room.id
      })
      this.getJoinableRooms()
    })
    .catch(error => console.error('Error on subscribe to room: ', error))
  }

  sendMessage(text) {
    this.currentUser.sendMessage({
      text,
      roomId: this.state.roomId
    })
  }

  render() {
    return (
      <div className="app">
        <RoomList subscribeToRoom={this.subscribeToRoom} rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}/>
        <MessageList messages={this.state.messages} />
        <SendMessageForm sendMessage={this.sendMessage}/>
        <NewRoomForm />
      </div>
    );
  }
}

export default App;
