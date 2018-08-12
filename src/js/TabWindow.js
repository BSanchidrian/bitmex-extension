class TabWindow {
  constructor() {
    let test = $(
      "#content > div > span > div.content.container > div > div > div.resizesensor-wrapper > div.react-grid-layout.gridLayout > div.react-grid-item.widget-container.instrumentsListWrapper.react-draggable.cssTransforms.react-resizable > section > header > span > ul"
    );
    console.log(test);

    let li = jQuery("<li>", {
      "data-tab-index": 2,
      "data-test-id": "tab-Test",
      id: "litest"
    }).appendTo(test);

    let span = jQuery("<span>", {
      class: "tabTitle nowrap",
      title: "Prueba"
    }).appendTo(li);

    jQuery("<span>", {
      class: "innerTitle",
      text: "Prueba",
      id: "test"
    }).appendTo(span);

    // $("#test").click(() => {
    //   console.log("test");
    //   $("#litest").addClass("active");
    //   let bodySelector =
    //     "#content > div > span > div.content.container > div > div > div.resizesensor-wrapper > div.react-grid-layout.gridLayout > div.react-grid-item.widget-container.instrumentsListWrapper.react-draggable.cssTransforms.react-resizable > section > div";

    //   $(bodySelector).html("<div>test</div>");
    // });
  }
}
