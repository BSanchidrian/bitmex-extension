const CLOSE_NORMAL = 1000;
const CLOSE_UNEXPECTED = 1011;
const CLOSE_DOWNTIME = 1012;

class BitmexClient {
  constructor(onMessageCallback, useTestnet = false) {
    const endpoints = {
      production: "wss://www.bitmex.com/realtime?subscribe=trade",
      testnet: "wss://testnet.bitmex.com/realtime?subscribe=trade"
    };

    this.connected = false;
    this.ws = new WebSocket(
      useTestnet ? endpoints.testnet : endpoints.production
    );
    this.ws.onopen = this.onOpen;
    this.ws.onmessage = this.onMessage;
    this.ws.onclose = this.onClose;
    this.ws.onerror = this.onError;
    this.ws.onMessageCallback = onMessageCallback;
  }

  send(data, options) {
    if (!this.connected) return;

    try {
      this.waitForConnection(this.ws.send(data, options), 300);
    } catch (e) {
      console.log("error sending data", e);
    }
  }

  waitForConnection(callback, interval) {
    console.log("called + ", this.connected);
    if (this.connected === 1) {
      callback();
      return;
    }

    setTimeout(() => this.waitForConnection(callback, interval), interval);
  }

  subscribe(key, value) {
    let subscription = `{"op": "subscribe", "args": ["${key}:${value}"]}`;
    this.send(subscription);
  }

  reconnect() {}

  onOpen() {
    console.log("Connected to bitmex");
    this.connected = true;
  }

  onMessage(data, flags) {
    this.onMessageCallback(data, flags);
  }

  onClose(code) {
    this.connected = false;
    let reconnecting = false;

    switch (code) {
      case CLOSE_NORMAL:
        break;
      case CLOSE_UNEXPECTED:
        break;
      default:
        reconnecting = true;
        break;
    }

    if (reconnecting) this.reconnect();
  }

  onError(e) {
    console.log("Unexpected error", e);
  }
}
