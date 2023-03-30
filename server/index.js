const express= require("express");
const app= express();
const http =require("http");
const {Server} = require("socket.io");
const cors = require("cors");
const server =http.createServer(app);
const clients=[]
// cors middleware to communicate with the React server running on the port 3000.
app.use(cors)

const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"],
    },
});
// server side socket connection.
io.on("connection",(socket)=>{
    console.log("User Connected",socket.id); 
    // recieve the clients location from the client socket.
    socket.on("send location",(data)=>{
    // check for the existance of the client 
    const index = clients.findIndex((client) => client.client_id === socket.id);
    // if exists update the location.
    if (index !== -1) {
      clients[index].location = {latitude:data.latitude,longitude:data.longitude};
    }
    // else push the clients location into "clients" list.
    else{
        clients.push({client_id:data.client_id,location:{latitude:data.latitude,longitude:data.longitude}});
    }
        socket.broadcast.emit("active clients",clients);
    }) 
    // on disconnection of a client remove the clients information from the "clients" list 
    socket.on("disconnect",(data)=>{
        console.log(socket.id,"client has dissconnected");
        const index=clients.findIndex((client)=>client.client_id===socket.id);
        if (index!=-1){
            clients.splice(index,1);
        }
        socket.broadcast.emit("active clients ",clients);
    }) 
}); 

// running the server on port 5000
server.listen(5000,()=>{
    console.log("server is up and running on port 5000");

})



