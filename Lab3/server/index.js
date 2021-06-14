var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http,{
    cors: {
        origin: "http://54.237.83.43:63342",
        methods: ["GET", "POST"]
    }
});
// app.all('*',(req,res,next)=>{
//     // 跨域处理
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By", ' 3.2.1');
//     res.header("Content-Type", "application/json;charset=utf-8");
//     next(); // 执行下一个路由
// });

app.get('/', function(req, res){
    res.send('<h1>Hello world</h1>');
});

// io.on('connection', function (socket) {
//     console.log('client '+ socket.id + ' connected');
//     socket.on('disconnect', function () {
//         console.log('client ' + socket.id + ' disconnected');
//     })
// });
io.on('connection', function (socket) {
    console.log('client '+ socket.id + ' connected');
    socket.on('player', function (data) {
        data.socketid = socket.id;
        socket.broadcast.emit('player', data);
    });
    socket.on('disconnect', function () {
        console.log('client ' + socket.id + ' disconnected');
        socket.broadcast.emit('offline', {socketid:socket.id});
    })
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
