// NOTE: The contents of this file will only be executed if
// you uncomment its entry in "assets/js/app.js".

// To use Phoenix channels, the first step is to import Socket
// and connect at the socket path in "lib/web/endpoint.ex":
import {Socket} from "phoenix"

let socket = new Socket("/socket", {params: {token: window.userToken}})

socket.connect();

window.new_channel = function (player, screen_name) {
  return socket.channel("game:" + player, {screen_name: screen_name});
}

window.join = (channel) => {
  channel.join()
    .receive("ok", response => {
      console.log("Joined succesfully!", response);
    })
    .receive("error", response => {
      console.log("Unable to join", response);
    });
};

window.new_game = (channel) => {
  channel.push("new_game")
    .receive("ok", response => {
      console.log("New Game!", response);
    })
    .receive("error", response => {
      console.log("Could not create new game", response)
    });
};