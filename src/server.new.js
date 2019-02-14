
const express = require('express');
const app = express();
const cors = require('cors');

// const editorSocketLockHandler = require('./editorLock');

// import editorSocketLockHandler from "./editorLock";

const data = {
  "content":"Hello world form server!",
  "lock":"off"
};

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
    console.log("client Id : "+client.id);
    console.log(client.id);
});
// editorSocketLockHandler(io);