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
var onlineNum = 0;   //在线人数
var timerID = 0;     //倒计时
var timeLimit = 5;  //倒计时限制
var curTime = 0;     //当前计时



io.on('connection', function(socket){
    //监听新用户加入
    socket.on('login', function(obj){
        console.log("用户进入,licence=" + obj.licence + " rid=" + obj.rid + " uid=" + obj.uid);
        if(obj.rid && obj.uid == null){  //大屏幕接入
            onlineNum++;
            licence = obj.licence;
            rid = obj.rid;
            socket.name = "pc";
            socketList[socket.name] = socket;
            socket.emit('login', {"status":1});

           // if(onlineNum >= 2){
                startCountDown();
            //}


        }else if(obj.uid && obj.rid){  //手机接入
            if(obj.rid == rid){
                onlineNum++;
                socket.name = obj.uid;
                socketList[socket.name] = socket;
                socketList["pc"].emit("userJoin",{"headimgurl":"resource/assets/testhead.png", "nickname":obj.uid, "id":obj.uid });
                socket.emit('login', {"status":1});
                socket.emit("userInfo",{"headimgurl":"resource/assets/testhead.png", "nickname":obj.uid , "uid":obj.uid });



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

            //向所有客户端广播用户退出
            io.emit('userQuit', {'uid':socket.name});

        }
    });

    //手机端用户消除，转发给大屏幕
    socket.on('eliminate',function(obj){
        socketList["pc"].emit('eliminate', {'uid':socket.name, 'pos':obj.pos});

    });


});

//开始倒计时
function startCountDown(){
    curTime = 0;

    timerID = setInterval(function(){
        curTime++;
        console.log("倒计时:" + curTime);
        if(curTime > timeLimit){
            countDownComplete();
        }
    },1000);
}

function countDownComplete(){
    clearInterval(timerID);
    sendStartGame();
}

//发送游戏开始
function sendStartGame(){
    console.log("发送游戏开始");
    var level1 = [
        [1,0,0,0,1,0,0],
        [0,0,2,0,0,2,6],
        [6,0,0,0,0,0,0],
        [0,3,0,3,0,0,0],
        [0,0,0,0,0,0,5],
        [0,4,0,0,4,0,5],
        [7,0,0,0,7,0,0],
        [0,0,0,0,0,0,0]
    ];

    var level2 = [
        [1,0,0,0,1,0,0],
        [0,0,2,0,0,2,6],
        [6,0,0,0,0,0,0],
        [0,3,0,3,0,0,0],
        [0,0,0,0,0,0,5],
        [0,4,0,0,4,0,5],
        [7,0,0,0,7,0,0],
        [0,0,0,0,0,0,0]
    ];

    var level3 = [
        [1,0,0,0,1,0,0],
        [0,0,2,0,0,2,6],
        [6,0,0,0,0,0,0],
        [0,3,0,3,0,0,0],
        [0,0,0,0,0,0,5],
        [0,4,0,0,4,0,5],
        [7,0,0,0,7,0,0],
        [0,0,0,0,0,0,0]
    ];

    var json = {"mapData":[level1, level2, level3]};

    for(var socketID in socketList){
        if(socketID != "pc"){
            luckyUser = socketID;
            console.log("幸运:" + luckyUser);
            break;
        }
    }

    json.luckyUser = luckyUser;

    socketList["pc"].emit("gameStart", json);

    for(var socketID in socketList){
        socketList[socketID].emit("mapData",json);
    }
}


//监听端口本地地址 http://192.168.1.103:3000
http.listen(3000, function(){
    console.log('listening on *:3000');
});