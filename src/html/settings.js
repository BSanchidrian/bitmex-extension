let sizeRequired = document.getElementById("sizeRequired");

sizeRequired.oninput = function() {
  chrome.storage.sync.set({ sizeRequired: sizeRequired.value }, function() {
    console.log("Value is set to " + sizeRequired.value);
  });
};

chrome.storage.sync.get("sizeRequired", function(data) {
  sizeRequired.value = data.sizeRequired;
});
