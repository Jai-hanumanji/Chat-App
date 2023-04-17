const express=require("express");
const app=express();
const http=require("http").createServer(app);

const PORT=process.env.PORT||3000

http.listen(3000,()=>{
    console.log(`listening on port ${PORT}`);
})

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})

app.use(express.static(__dirname+'/public'))

const io=require('socket.io')(http)
io.on('connection',(socket)=>{
    console.log("connected");
    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg);
    })
})
