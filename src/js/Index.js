$(document).ready(function() {
  const recentTradesWindow = new RecentTradesWindow({
    title: "Recent trades",
    width: 300,
    height: 250,
    draggable: true,
    position: [10, 10]
  });
  recentTradesWindow.render();
});
