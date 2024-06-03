import * as signalR from "@microsoft/signalr";

var counter = document.getElementById("viewCounter");
var button = document.getElementById("btnGetFullName");

// create connection
let viewConnection = new signalR.HubConnectionBuilder()
.withUrl("/hubs/View")
.build();

let stringConnection = new signalR.HubConnectionBuilder()
.withUrl("/hubs/stringtools")
.build();

button?.addEventListener("click", function(evt) {
    var firstname = (document.getElementById("inputFirstName") as HTMLInputElement).value;
    var lastname = (document.getElementById("inputLastName") as HTMLInputElement).value;

    stringConnection.invoke("getFullName", firstname, lastname).then((val) => { alert(val); });
});

// on view update message from client
viewConnection.on("viewCountUpdate", (value: number) => {
    if(counter == null) return;
    counter.innerText = value.toString();
});

// notify server we're watching
function notify() {
    viewConnection.send("notifyWatching");
}

// start connection
function startSuccess() {
    console.log("Connected.");
    notify();
}

function startFail() {
    console.log("Connection failed.");
}

viewConnection.start().then(startSuccess, startFail);
stringConnection.start();