import React from 'react'
import './MessageWindow.css'
const Message = ({text, userName, self }) => (
    <div className={'message' + (self ? ' message-self' : '')}>
        <div className='message-username'>{userName}</div>
        <div className='message-text'>{text}</div>
    </div>
)

export default class MessageWindow extends React.Component {
    constructor(props) {
        super(props)
        this.messageWindow = React.createRef();
    }

    componentDidUpdate() {
        const messageWindow = this.messageWindow.current;
        messageWindow.scrollTop = messageWindow.scrollHeight - messageWindow.clientHeight;
    }
    
    render() {
        const { messages = [] , userName } = this.props

        return (
            <div className='message-window' ref={this.messageWindow}>
                {messages.map((msg,index) => {
                    return <Message key={index} text={msg.text} userName={msg.userName} self={userName === msg.userName} />
                })}
            </div>
        )
    }
}