
const express = require('express');
const app = express();
const cors = require('cors');
// 

const lock = false;

let content = '';

// const data = {
//   "content":"Hello world form server!",
//   "lock":"off",
// };

const data={
  content : '',
  lock : false,
  clientId : ''
}

users={

}

//client ={id: String(socket id), content : String(***), lock : String(on/off)}
const clients =[];

Array.prototype.findByValueOfObject = function(key, value){
  return this.filter(function(item){
    return (item[key]===value);
  })
}

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const port = 8000;

const server = app.listen(port, function() {
  console.log('server listening on 3000');
})

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/data/', cors(corsOptions), (req, res) =>{
  return res.send(data);
});


console.log('server.js - listening on port: ', port);

const io = require('socket.io')(server);

io.on('connection', (client) => {
  client.channel = "";

  // When the client joins a channel, save it to the socket
  client.on("joinChannel", function (data) {
    client.channel = data.channel;
  })

  //When the client sends a new message ....
  client.on("message",function(data){ 
    // ...emit a "message" event to every other socket
    client.broadcast.emit("message",{
      channel : client.channel,
      message : data.message,
      socketId : data.socketId,
      lock : data.lock,
      users : users
    });
  });

  //When the client add a new user ....
  client.on("joinUser", function(data){ 
    // data = { socketId, username}
    // ...emit a "message" event to every other socket
    users[data.socketId]=data.username;
    console.log("User Joined!");
      client.emit("userData", {
        channel : client.channel,
        message : data.message,
        socketId : data.socketId,
        lock : data.lock,
        users : users
      });
    });

    
})


// emit : channel : channelId
//      : lock : lock change
//      : content : for content change