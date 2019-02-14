import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8000');

function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
//   socket.emit('lock', 1000);

  socket.on('lock', message => {
      console.log("lock captured");
      console.log("")
      cb(null, message);
  });
  socket.on('unlock', message => cb(null, message));

  socket.on('editing', message => cb(null, message));
//   console.log("CB");
//   console.log(cb);
}

function subscribeToLock(cb) {
  socket.on('lock', (message) => cb(null, message));
  socket.emit('subscribeTolock', 1000);
  socket.emit('lock', 1000);

  socket.on('lock', message => {
      console.log("lock captured");
      cb(null, message);
  });
}

function subscribeToUnLock(cb) {
  socket.on('lock', message => cb(null, message));
  socket.emit('subscribeToUnlock', 1000);
  
  socket.on('unlock', message => {
    console.log("unlock caputured");
    cb(null, message);
  });

}


function subscribeToEditing(cb) {
  socket.on('editing', message => cb(null, message));
  socket.emit('subscribeToEditing', 1000);
  
  socket.on('editing', message => {
    console.log("editing caputured");
    cb(null, message);
  });
}


export { subscribeToTimer , subscribeToUnLock, subscribeToLock, subscribeToEditing, socket };