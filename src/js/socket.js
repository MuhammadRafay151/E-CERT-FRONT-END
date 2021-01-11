import { io } from "socket.io-client";
const url= process.env.VUE_APP_API_URL
import store from "../store"
let socket;
export function connectSocket(token) {
     socket = io.connect(url, {
        auth: {
            token: token,
        },
    });
    socket.on("message", (data) => {
        store.commit("NewMessage", data)
    });
    socket.on("connect_error", (err) => {
        console.log(err.message); // prints the message associated with the error
    });

}
export function CloseSocket(){
    // socket.disconnect()
    // console.log(socket)
    socket.emit('close',{a:1})
}