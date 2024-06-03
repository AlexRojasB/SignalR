import * as signalR from "@microsoft/signalr";

var counter = document.getElementById("viewCounter");
var button = document.getElementById("btnGetFullName");
var btnJoinYellow = document.getElementById("btnJoinYellow");
var btnJoinBlue = document.getElementById("btnJoinBlue");
var btnJoinOrange = document.getElementById("btnJoinOrange");
var btnTriggerYellow = document.getElementById("btnTriggerYellow");
var btnTriggerBlue = document.getElementById("btnTriggerBlue");
var btnTriggerOrange = document.getElementById("btnTriggerOrange");

// create connection
let viewConnection = new signalR.HubConnectionBuilder()
.withUrl("/hubs/View")
.build();

let stringConnection = new signalR.HubConnectionBuilder()
.withUrl("/hubs/stringtools")
.build();

let colorConnection = new signalR.HubConnectionBuilder()
.withUrl("/hubs/color")
.build();

button?.addEventListener("click", function(evt) {
    var firstname = (document.getElementById("inputFirstName") as HTMLInputElement).value;
    var lastname = (document.getElementById("inputLastName") as HTMLInputElement).value;

    stringConnection.invoke("getFullName", firstname, lastname).then((val) => { alert(val); });
});

btnJoinYellow?.addEventListener("click", () => colorConnection.invoke("JoinGroup", "Yellow"));
btnJoinBlue?.addEventListener("click", () => colorConnection.invoke("JoinGroup", "Blue"));
btnJoinOrange?.addEventListener("click", () => colorConnection.invoke("JoinGroup", "Orange"));

btnTriggerYellow?.addEventListener("click", () => colorConnection.invoke("TriggerGroup", "Yellow"));
btnTriggerBlue?.addEventListener("click", () => colorConnection.invoke("TriggerGroup", "Blue"));
btnTriggerOrange?.addEventListener("click", () => colorConnection.invoke("TriggerGroup", "Orange"));

// on view update message from client
viewConnection.on("viewCountUpdate", (value: number) => {
    if(counter == null) return;
    counter.innerText = value.toString();
});

colorConnection.on("triggerColor", (color) => {
    document.getElementsByTagName("body")[0].style.backgroundColor = color;
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
colorConnection.start();