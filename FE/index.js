
const clientio=io("http://localhost:3000/");
clientio.on('StartMessage',data=>{
    console.log(data);
});
const inputmessage= document.getElementById('message-input');
const messagecontainer= document.getElementById("send-container");
const container= document.getElementById("message-container");
appendMessage('you joined');
const username= prompt('enter your name');
clientio.emit('new-user',username);
messagecontainer.addEventListener('submit',e=>{
    e.preventDefault();
    const message=inputmessage.value;
    appendMessage(`you:${message}`);
    clientio.emit('sendMessage',message);
    inputmessage.value='';
});
clientio.on('chat',data=>{
    console.log(data);
    appendMessage(`${data.user}:${data.message}`);
});
clientio.on('user-connected',Uname=>{
    appendMessage(`${Uname} connected`);
});
function appendMessage(message){
    const newinput= document.createElement('div');
    newinput.innerText=message;
    container.append(newinput);
}