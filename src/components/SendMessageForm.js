import React from "react";

class SendMessageForm extends React.Component {
  constructor() {
    super()
    this.state = {
      value: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(ev) {
    this.setState({
      value: ev.target.value
    })
    
  }

  handleSubmit(ev) {
    ev.preventDefault()
    this.props.sendMessage(this.state.value)
    this.setState({value: ''})
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="send-message-form">
        <input
          onChange={this.handleChange}
          value={this.state.value}
          placeholder="SendMessageForm" 
          type="text" />
      </form>
    );
  }
}

export default SendMessageForm;
