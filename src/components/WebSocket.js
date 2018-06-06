// @flow

let instance = null;

class WebsocketController {
    constructor(): WebSocket {
        if (!instance) {
            instance = this;
            this.ws = new WebSocket("ws://172.20.10.3:8585");
            this.ws.onopen = () => {};

            this.ws.onmessage = (e) => {};

            this.ws.onerror = (e) => {};

            this.ws.onclose = (e) => {};
        }

        return instance;
    }
}

export default WebsocketController;
