var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.send("welcome");  //在浏览器打开时显示在页面上的信息..
});


io.on('connection', function(socket){
    console.log('a user connected');


    socket.on('login', function(obj,callBack) {
        //obj类型any
        //console.log(obj.uid);

        console.log("rev login");

        callBack({name:"peter", age:1});

        socket.emit('login',{name:"peter", age:1} );

        //向所有客户端广播用户加入
        io.emit('login',{name:"peter", age:1} );
    });

});

http.listen(3000, function(){
    console.log('listening on *:3000');
});