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
      messages: [],     
    }
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
        currentUser.subscribeToRoom({
          roomId: "26994a6c-3164-452b-8cca-9db45a82a659",
          hooks: {
            onMessage: message => {
              this.setState((prevState) => {
                return (
                  {messages: prevState.messages.concat(message)}
                )
              })
            }
          }
        });
      })
      .catch(error => console.error("error: ", error));
  }

  render() {
    return (
      <div className="app">
        <RoomList />
        <MessageList messages={this.state.messages} dummy={this.state.DUMMY_DATA}/>
        <SendMessageForm />
        <NewRoomForm />
      </div>
    );
  }
}

export default App;
