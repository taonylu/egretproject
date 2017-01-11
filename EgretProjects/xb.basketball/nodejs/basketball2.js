var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
 
app.get('/', function(req, res){
    res.send('<h1>Welcome Realtime Server</h1>');
});
 
http.listen(3001, function(){
    console.log('listening on *:3001');
});

//在线用户
var roomList = {};

io.on('connection', function(socket){
    console.log('a user connected');
     
    //pc连接socket或刷新，接收pc更新房间号
    socket.on('submitRid', function(data){
    	console.log("submitRid:" + data.rid);
    	var rid = data.rid;
    	socket.rid = rid;
    	//房间已存在
    	if(roomList[rid] != null){
    		socket.emit('submitRid',{'data':{'bSuccess':false, 'msg':'房间已存在'}});
    		return;
    	}
    	//房间不存在，则创建
    	roomList[rid] = {};
    	roomList[rid].pc = socket;
    	listenerSocketPC(socket);
    	socket.emit('submitRid',{'data':{'bSuccess':true, 'msg':''}});
    });


    //监听mobile登录
    socket.on('login', function(data,callback){
        var rid = data.rid;
        console.log("----" + "用户加入" + "rid:" + rid);
        //将新加入用户的唯一标识当作socket的名称，后面退出的时候会用到
        socket.rid = rid;
        //房间不存在，则返回登录失败
		if(roomList[rid] == null || roomList[rid].pc == null){
			callback({'bSuccess':false, 'msg':'房间不存在'});
			return;
		}
		//房间人满，则返回登录失败
		if(roomList[rid].mobile != null){
			callback({'bSuccess':false, 'msg':'房间人满'});
			return;
		}
		//保存手机端用户
		roomList[rid].mobile = socket;
		//注册客户端socket监听
		listenerSocketMobile(socket);
		//返回手机端登录成功
        console.log("返回手机登录成功:",rid);
		//roomList[rid].mobile.emit('login', {'bSuccess':true, 'msg':''});
        callback({'bSuccess':true, 'msg':''});
		//返回pc端游戏开始
		roomList[rid].pc.emit('startGame');
    });

     
    //监听用户退出
    socket.on('disconnect', function(){
    	//房间不存在，不予处理
    	if(roomList[socket.rid] == null){
    		return;
    	}
    	//pc端断线，则删除房间
		var pcSocket = roomList[socket.rid].pc;
		if(pcSocket == socket){ 
			console.log("pc离开");
			delete roomList[socket.rid];
		}else{ 
			//手机端断线，则删除手机端，并广播给pc端
			console.log("手机离开");
			pcSocket.emit('userQuit');
			delete roomList[socket.rid].mobile;
		}
    });
   
});


/**监听pc socket*/
function listenerSocketPC(socket){
	//游戏结束
    socket.on('gameOver',function(data,callback){
    	console.log("rev gameOver");
    	if(roomList[socket.rid].pc && roomList[socket.rid].mobile){
			 roomList[socket.rid].mobile.emit('gameOver',{'score':data.score});
    	}
    });
}


/**监听手机端 socket*/
function listenerSocketMobile(socket){
	//接收来自手机的消息
    socket.on('shoot',function(data){
		if(roomList[socket.rid] && roomList[socket.rid].pc){
			roomList[socket.rid].pc.emit('shoot',{angle:data.angle});
		}
    });
}

/**获取obj长度*/
function getObjLength(obj){
	var count = 0;
	for(var key in obj){
		count++;
	}
	return count;
}