const host = process.env.NODE_ENV === 'production' ? window.location.host : 'localhost:8080'

export let send;

let onMessageCallBack;

export const startWebSocketConnection = () => {

    const ws = new window.WebSocket('ws://' + host + '/chat') || {}
    ws.onopen = () => {
        console.log('opened ws connection');
    }

    ws.onclose = (e) => {
        console.log('close ws connection : ', e.code, e.reason);
    }

    ws.onmessage = (e) => {
        onMessageCallBack && onMessageCallBack(e.data)
    }

    send = ws.send.bind(ws);
}

export const registerOnMessageCallback = (fn) => {
    onMessageCallBack = fn
}

