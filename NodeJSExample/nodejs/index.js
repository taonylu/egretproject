var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.send('<h1>Welcome Realtime Server</h1>');
});


var socketList = {}; //socket列表
var licence = 0;     //授权码
var rid = 0;         //房间号
var luckyUser = 0;   //幸运用户
var idAdd = 0;       //用于生成socket.name
var onlineNum = 0;   //在线人数

io.on('connection', function(socket){
    console.log('a user connected');
    //监听新用户加入
    socket.on('login', function(obj){
        if(obj.licence && obj.rid){  //大屏幕接入
            console.log("大屏幕进入");
            onlineNum++;
            licence = obj.licence;
            rid = obj.rid;
            socket.name = "pc";
            socketList[socket.name] = socket;
            socket.emit('loginComplete', {"status":1, "msg":"大屏幕登录成功了"});
        }else if(obj.licence && obj.rid == null){  //手机接入
            if(obj.licence == licence){
                console.log("手机用户进入");
                idAdd++;
                onlineNum++;
                socket.name = idAdd.toString();
                socketList[socket.name] = socket;
                socketList["pc"].emit("userJoin",{"avatar":"resource/assets/testhead.png", "name":"peter" + idAdd, "id":idAdd });
                socket.emit("userInfo",{"avatar":"resource/assets/testhead.png", "name":"peter" + idAdd, "id":idAdd });

                //用户达到3人则开始
                if(onlineNum >= 3){
                    var json = {};
                    json.mapdata = [
                        [1,0,0,0,1,0,0],
                        [0,0,2,0,0,2,0],
                        [0,0,0,0,0,0,0],
                        [0,3,0,3,0,0,0],
                        [0,0,0,0,0,0,0],
                        [0,4,0,0,4,0,0],
                        [0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0]
                    ];

                    for(var socketID in socketList){
                        luckyUser = socketID;
                        console.log("幸运:" + luckyUser);
                        break;
                    }

                    json.luckyUser = luckyUser;

                    socketList["pc"].emit("gameStart", json);

                    for(var socketID in socketList){
                        socketList[socketID].emit("mapData",json);
                    }
                }

            }
        }else{  //接入错误
            console.log("接入错误，关闭socket");
            socket.disconnect();
        }

        console.log("当前在线人数:" + onlineNum);
    });

    //监听用户退出
    socket.on('disconnect', function(){
        //将退出的用户从在线列表中删除
        if(socketList.hasOwnProperty(socket.name)) {
            onlineNum--;
            delete  socketList[socket.name];
            console.log("玩家退出:" + socket.name);
            //退出用户的信息
            //var obj = {userid:socket.name, username:onlineUsers[socket.name]};

            //删除
           // delete onlineUsers[socket.name];
            //在线人数-1
           // onlineCount--;

            //向所有客户端广播用户退出
           // io.emit('logout', {onlineUsers:onlineUsers, onlineCount:onlineCount, user:obj});

        }
    });

    //手机端用户消除，转发给大屏幕
    socket.on('eliminate',function(obj){
        socketList["pc"].emit('eliminate', {'id':socket.name, 'pos':obj.pos});

    });


    //监听用户发布聊天内容
    socket.on('message', function(obj){
        //向所有客户端广播发布的消息
       // io.emit('message', obj);
       // console.log(obj.username+'说：'+obj.content);
    });

});

//监听端口本地地址 http://192.168.1.103:3000
http.listen(3000, function(){
    console.log('listening on *:3000');
});