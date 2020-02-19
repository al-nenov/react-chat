import React from "react";
import "./App.css";
import Chatkit from "@pusher/chatkit-client";

import MessageList from "./components/MessageList";
import SendMessageForm from "./components/SendMessageForm";
import RoomList from "./components/RoomList";
import NewRoomForm from "./components/NewRoomForm";

import { tokenUrl, instanceLocator, roomId } from "./config";

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      messages: [],     
    }
    this.sendMessage = this.sendMessage.bind(this)
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

    chatManager
      .connect()
      .then(currentUser => {
        this.currentUser = currentUser
        this.currentUser.subscribeToRoom({
          roomId: roomId,
          hooks: {
            onMessage: message => {
              this.setState({
                messages: [...this.state.messages, message]
              })
            }
          }              
        })
      })  
      .catch(error => console.error("error: ", error));
  }

  sendMessage(text) {
    this.currentUser.sendMessage({
      text,
      roomId
    })
  }

  render() {
    return (
      <div className="app">
        <RoomList />
        <MessageList messages={this.state.messages} />
        <SendMessageForm sendMessage={this.sendMessage}/>
        <NewRoomForm />
      </div>
    );
  }
}

export default App;
