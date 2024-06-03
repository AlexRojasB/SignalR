import * as signalR from "@microsoft/signalr";

var counter = document.getElementById("viewCounter");

// create connection
let connection = new signalR.HubConnectionBuilder()
.withUrl("/hubs/View")
.build();


// on view update message from client
connection.on("viewCountUpdate", (value: number) => {
    if(counter == null) return;
    counter.innerText = value.toString();
});

// notify server we're watching
function notify() {
    connection.send("notifyWatching");
}

// start connection
function startSuccess() {
    console.log("Connected.");
    notify();
}

function startFail() {
    console.log("Connection failed.");
}

connection.start().then(startSuccess, startFail);