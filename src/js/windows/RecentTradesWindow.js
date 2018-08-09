var messages = undefined;

class RecentTradesWindow extends Window {
  constructor(params) {
    super(params.title, params.width, params.height, params.draggable);
    this.bitmexClient = new BitmexClient(this.onMessage);
    // this.bitmexClient.subscribe("trade", "XBTUSD");
  }

  onMessage(message, flags) {
    let json = JSON.parse(message.data);

    if (json.table === "trade" && json.action === "insert") {
      json.data.forEach(element => {
        RecentTradesWindow.createMessage(element).prependTo(messages);
      });
    }
  }

  render() {
    super.render();

    messages = jQuery("<div>", {
      class: "messages"
    }).appendTo(this.windowBody);

    jQuery("<div>", {
      class: "messages-inner"
    }).appendTo(messages);
  }

  static createMessage(params) {
    const message = jQuery("<div>", {
      class: `message ${params.side}`
    });

    jQuery("<div>", {
      class: "message-price",
      text: params.price
    }).appendTo(message);

    jQuery("<div>", {
      class: "message-amount",
      text: params.size
    }).appendTo(message);

    let timestamp = new Date(params.timestamp);
    jQuery("<div>", {
      class: "message-time",
      text: `${timestamp.getHours()}:${timestamp.getMinutes()}:${timestamp.getSeconds()}`
    }).appendTo(message);

    jQuery("<div>", {
      class: "message-side",
      text: params.side === "Buy" ? "B" : "S"
    }).appendTo(message);

    return message;
  }
}
