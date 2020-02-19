import React from "react";
import Message from "./Message";

class MessageList extends React.Component {
    render() {
        var msgs = this.props.messages;
        return (
        <div className="message-list">
            {msgs.map((message, index) => {
                //console.log(index)
                return (
                    <Message 
                    key={index}
                    senderId={message.senderId}
                    text={message.text}
                    />
                );
            })}
        </div>
        );
    }
}

export default MessageList;
