class Window {
  constructor(title = "Window", width = 400, height = 300, draggable = true) {
    this.title = title;
    this.width = width;
    this.height = height;
    this.draggable = draggable;
  }

  render() {
    this.window = jQuery("<div>", {
      width: this.width,
      height: this.height,
      class: "window ui-widget-content",
      css: {
        position: "absolute",
        top: 0,
        left: 0
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
}
