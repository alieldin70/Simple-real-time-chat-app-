const express =require('express');
const app= express();
var cors=require('cors');
app.use(express.json());
app.use(cors());
const port=3000;
const server =app.listen(port,()=>{console.log(`server is running......${port}`);});
const io =require('socket.io')(server,{
    cors:'*'
})
const users={};

io.on('connection',(socket)=>{
socket.emit('StartMessage','Hello Client');
socket.on('new-user',username=>{
    users[socket.id]=username;
    socket.broadcast.emit('user-connected',username);
})

socket.on('sendMessage',data=>{
io.emit('chat',{message:data,user:users[socket.id]});
})
});