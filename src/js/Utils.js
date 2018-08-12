function injectJS(src, textContent, callback) {
  let script = document.createElement("script");

  if (textContent) {
    script.textContent = textContent;
    document.getElementsByTagName("head")[0].appendChild(script);
    script.parentNode.removeChild(script);
    if (callback) callback();
  } else {
    script.onload = function() {
      if (callback) callback();
    };
    script.src = src;
    document.getElementsByTagName("head")[0].appendChild(script);
  }
}
