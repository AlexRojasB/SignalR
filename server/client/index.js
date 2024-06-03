"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const signalR = __importStar(require("@microsoft/signalr"));
// create connection
let connection = new signalR.HubConnectionBuilder()
    .withUrl("/hubs/view")
    .build();
// on view update message from client
connection.on("viewCountUpdate", (value) => {
    var counter = document.getElementById("viewCounter");
    if (counter == null)
        return;
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
