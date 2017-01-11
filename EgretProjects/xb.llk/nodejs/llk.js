var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
 
app.get('/', function(req, res){
    res.send('<h1>Welcome Realtime Server</h1>');
});
 
http.listen(3002, function(){
    console.log('listening on *:3002');
});

//在线用户
var roomList = {};

io.on('connection', function(socket){
    console.log('a user connected');
     
    //监听新用户加入
    socket.on('login', function(data,callback){
    	var userType = data.userType;
        var rid = data.rid;
		var openid = data.openid;
        console.log("----" + "用户加入" + "rid:" + rid + " userType:" + userType + " openid:" + openid);
        //将新加入用户的唯一标识当作socket的名称，后面退出的时候会用到
        socket.rid = rid;
		socket.openid = openid;
        //pc用户加入
    	if(userType == "pc"){
    		pcUserJoin(rid, socket);
    	}
    	//手机用户加入
    	if(userType == "mobile"){
    		mobileUserJoin(rid, socket);
    	}
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
			pcSocket.emit('userQuit',{openid:socket.openid});
			delete roomList[socket.rid].mobile[socket.openid];
		}
    });
   
});

/**pc用户加入*/
function pcUserJoin(rid, socket){
	//房间已存在
	if(roomList[rid] != null){
		socket.emit('login', {'success':false, 'msg':'房间已存在'});
		return;
	}
	//新建房间
	roomList[rid] = {};
	roomList[rid].pc = socket;
	listenerSocketPC(socket);
	console.log('PC用户加入');
}

/**监听pc socket*/
function listenerSocketPC(socket){
	//更新rid
    socket.on('upRid',function(data){
		console.log("upRid:",data.rid);
		//清理房间
		delete roomList[socket.id];
		delete roomList[data.rid];
		//新建房间
		roomList[data.rid] = {};
		roomList[data.rid].pc = socket;
		
		//发送排行榜测试数据
		var data = {
			"heroRankList":[
				{"p1HeadUrl":"resource/assets/home/home_p1.png", "p2HeadUrl":"resource/assets/home/home_p1.png", stage:3,wave:3},
				{"p1HeadUrl":"resource/assets/home/home_p1.png", "p2HeadUrl":"resource/assets/home/home_p1.png", stage:1,wave:0}
				],
			"killRankList":[
				{"headUrl":"resource/assets/home/home_p1.png", "kill":99},
				{"headUrl":"resource/assets/home/home_p1.png", "kill":88}
				],
			"historyScore":999999
		}
		socket.emit("rank", data);
    });

	//开始游戏
    socket.on('startGame',function(data){
    	if(roomList[socket.rid].pc && roomList[socket.rid].mobile){
			var mobileObj = roomList[socket.rid].mobile;
			for(var key in mobileObj) {
				 mobileObj[key].emit('startGame');
			}
    	}
    });

	//游戏结束
    socket.on('gameOver',function(data,callback){
    	console.log("rev gameOver");
    	if(roomList[socket.rid].pc && roomList[socket.rid].mobile){
			var mobileObj = roomList[socket.rid].mobile;
			for(var key in mobileObj) {
				 mobileObj[key].emit('gameOver',{"historyScore":data.p1Score + data.p2Score,"scoreRank":99,"p1KillRank":99,"p2KillRank":99});
			}
    	}
    	roomList[socket.rid].pc.emit("gameOver",{"historyScore":data.p1Score + data.p2Score,"scoreRank":99,"p1KillRank":99,"p2KillRank":99});
		//callback({"historyScore":data.p1Score + data.p2Score,"scoreRank":99,"p1KillRank":99,"p2KillRank":99});
    });
}

/**手机用户加入*/
function mobileUserJoin(rid, socket){
	//房间不存在，则返回登录失败
	if(roomList[rid] == null || roomList[rid].pc == null){
		socket.emit('login', {'success':false, 'msg':'房间不存在'});
		return;
	}
	//手机端用户数组不存在，则新建
	if(roomList[rid].mobile == null){
		roomList[rid].mobile = {};
	}
	//房间人满，则返回登录失败
	if(getObjLength(roomList[rid].mobile) >= 2){
		socket.emit('login', {'success':false, 'msg':'人数已满'});
		return;
	}
	//保存客户端用户
	roomList[rid].mobile[socket.openid] = socket;
	//注册客户端socket监听
	listenerSocketMobile(socket);
	//如果是手机登录，则发送玩家加入
	var pcSocket = roomList[rid].pc;
	if(pcSocket){
		pcSocket.emit('userJoin', {openid:socket.openid,headimgurl:"resource/assets/home/home_p1.png",nickname:"Test"});
	}
	console.log('手机用户加入');
}

/**监听手机端 socket*/
function listenerSocketMobile(socket){
	//接收来自手机的消息
    socket.on('action',function(data){
		var actionType = data.actionType;
		if(roomList[socket.rid] && roomList[socket.rid].pc){
			roomList[socket.rid].pc.emit('action',{actionType:actionType,openid:socket.openid});
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