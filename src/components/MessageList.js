import React from "react";
import ReactDom from "react-dom";
import Message from "./Message";

class MessageList extends React.Component {

    componentWillUpdate() {
        const node = ReactDom.findDOMNode(this);
        const advance = 100;
        this.shouldScroll = node.scrollTop + node.clientHeight + advance >= node.scrollHeight;
    }

    componentDidUpdate() {
        if(this.shouldScroll) {
            const node = ReactDom.findDOMNode(this);
            node.scrollTop = node.scrollHeight;
        }        
    }

    render() {
        if(!this.props.roomId) {
            return (
                <div className="message-list">
                    <div className="join-room">
                        &larr; Join or create a room!
                    </div>
                </div>
            )
        }
        var msgs = this.props.messages;
        return (
        <div className="message-list">
            {msgs.map((message, index) => {
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
