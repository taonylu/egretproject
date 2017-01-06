var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
 
app.get('/', function(req, res){
    res.send('<h1>Welcome Realtime Server</h1>');
});
 
http.listen(3000, function(){
    console.log('listening on *:3000');
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
    	if(userType == "mobile"){
    		mobileUserJoin(rid, socket);
    	}
        //回调函数
        callback({success:true});

        //如果是手机登录，则发送玩家加入
        if(userType == "mobile"){
        	var pcSocket = pcUser[rid];
        	if(pcSocket){
        		pcSocket.emit('userJoin', {openid:openid,headimgurl:"resource/assets/home/home_p1.png",nickname:"ABC"});
        	}
        }
    });

     
    //监听用户退出
    socket.on('disconnect', function(){
		var pcSocket = pcUser[socket.rid];
		if(pcSocket == null){
			return;
		}
		if(pcSocket == socket){ //pc离开
			console.log("pc离开");
			delete pcUser[socket.rid];
			delete mobileUser[socket.rid];
		}else{ //手机离开
			console.log("手机离开");
			pcSocket.emit('userQuit',{openid:socket.openid});
			delete mobileUser[socket.rid];
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
    	if(roomList[socket.rid].pc && roomList[socket.rid].mobile){
			var mobileObj = roomList[socket.rid].mobile;
			for(var key in mobileObj) {
				 mobileObj[key].emit('gameOver',{"historyScore":9999,"scoreRank":3,"p1KillRank":5,"p2KillRank":6});
			}
    	}
		callback({"historyScore":9999,"scoreRank":3,"p1KillRank":5,"p2KillRank":6});
    });
}

/**手机用户加入*/
function mobileUserJoin(rid, socket){
	//检查房间是否存在
	if(roomList[rid] == null){
		socket.emit('login', {'success':false, 'msg':'房间不存在'});
		return;
	}
	if(roomList[rid].mobile == null){
		roomList[rid].mobile = {};
	}
	//检查人数是否足够
	if(getObjLength(roomList[rid].mobile) >= 2){
		socket.emit('login', {'success':false, 'msg':'人数已满'});
		return;
	}

	roomList[rid].mobile[data.openid] = socket;
	listenerSocketMobile(socket);
	console.log('手机用户加入');
}

/**监听手机端 socket*/
function listenerSocketMobile(socket){
	//接收来自手机的消息
    socket.on('action',function(data){
		var actionType = data.actionType;
		if(roomList[socket.rid]){
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