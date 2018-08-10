class Window {
  constructor(options = {}) {
    if (!options || options == {}) {
      options = {
        title: "Window",
        width: 400,
        height: 300,
        draggable: true,
        position: [0, 0]
      };
    }

    this.title = options.title;
    this.width = options.width;
    this.height = options.height;
    this.draggable = options.draggable;
    this.position = options.position;
  }

  render() {
    this.window = jQuery("<div>", {
      width: this.width,
      height: this.height,
      class: "window ui-widget-content",
      css: {
        position: "absolute",
        top: this.position[0],
        left: this.position[1]
      }
    }).appendTo("body");

    this.windowHeader = jQuery("<h4>", {
      text: this.title,
      class: "window-header",
      css: {
        margin: 0
      }
    }).appendTo(this.window);

    this.windowBody = jQuery("<div>", { class: "window-body" }).appendTo(
      this.window
    );

    if (this.draggable) {
      this.window.draggable();
      this.window.resizable();
    }
  }

  static createMessage(params) {
    const message = jQuery("<div>", {
      class: `message-row ${params.side}`
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
