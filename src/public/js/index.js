console.log('probando cliente');
const socketClient=io()

const form= document.getElementById('form')
const fromUser= document.getElementById('fromUser')
const contentMessage=document.getElementById('contentMessage')
const  toUser= document.getElementById('toUser');

form.onsubmit= (e)=>{
    e.preventDefault()
    const userName= fromUser.value
    socketClient.emit('userName', userName)
}