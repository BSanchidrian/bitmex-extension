var messagesDiv = undefined;
var minimumSizeRequired = 0;

class RecentTradesWindow extends Window {
  constructor(params) {
    super(params.title, params.width, params.height, params.draggable);
    this.bitmexClient = new BitmexClient(this.onMessage);

    chrome.storage.sync.get("sizeRequired", function(data) {
      minimumSizeRequired = data.sizeRequired;
      console.log("Minimum size required: ", minimumSizeRequired);
    });
  }

  onMessage(message, flags) {
    let json = JSON.parse(message.data);

    if (json.table === "trade" && json.action === "insert") {
      json.data.forEach(element => {
        if (element.size < minimumSizeRequired) return;

        Window.createMessage(element).prependTo(messagesDiv);
        // delete child nodes to avoid overflow
        if (messagesDiv[0].childNodes.length > 200) {
          for(let i = messagesDiv[0].childNodes.length - 1; i >= 100; i--) {
            messagesDiv[0].removeChild(messagesDiv[0].childNodes[i]);
          }
        }
      });
    }
  }

  render() {
    super.render();

    const messages = jQuery("<div>", {
      class: "messages"
    }).appendTo(this.windowBody);

    messagesDiv = jQuery("<div>", {
      class: "messages-inner"
    }).appendTo(messages);
  }
}
