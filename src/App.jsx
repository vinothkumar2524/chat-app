import React from 'react'
import './App.css'
import MessageWindow from './MessageWindow'
import TextBar from './TextBar'
import {registerOnMessageCallback , send} from './websocket.js'

export class App extends React.Component {
    state = {
        messages : [],
        userName : null
    }
    
    constructor(props){
        super(props);
        registerOnMessageCallback(this.onMessageReceived.bind(this))
    }

    onMessageReceived(msg) {
        msg = JSON.parse(msg);
        this.setState({
            message : this.state.messages.concat(msg)
        })
    }

    setUserName(name) {
        this.setState({
            userName : name
        })
    }

    sendMessage(text) {
        const message = {
            userName : this.state.userName,
            text: text
        };
         send(JSON.stringify(message))
        console.log(typeof send)
        
    }
    
    render() {
        const setUserName = this.setUserName.bind(this);
        const sendMessage = this.sendMessage.bind(this);

        if(this.state.userName === null) {
            return(
                <div>
                    <div>Enter UserName</div>
                    <TextBar onSend={setUserName} />
                </div>
            )
        }

        return (
            <div className='container'>
                <div className='container-title'>Messages</div>
                <MessageWindow messages={this.state.messages} userName={this.state.userName} />
                <TextBar onSend={sendMessage} />
            </div>
        )
    }
}

export default App;