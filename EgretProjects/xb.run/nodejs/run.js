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
    		mobileUserJoin(rid, socket, data);
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
		return false;
	}
	//新建房间
	roomList[rid] = {};
	roomList[rid].pc = socket;
	listenerSocketPC(socket);

	return true;
	console.log('PC用户加入');
}

/**监听pc socket*/
function listenerSocketPC(socket){
	//更新rid
    socket.on('upRid',function(data){
		console.log("upRid:",data.rid);
		//清理房间
		delete roomList[data.rid];
		//新建房间
		roomList[data.rid] = {};
		roomList[data.rid].pc = socket;
    });

    //分配角色
    socket.on('assignRole',function(data){
    	if(roomList[socket.rid].pc && roomList[socket.rid].mobile){
			var mobileObj = roomList[socket.rid].mobile;
			for(var key in mobileObj) {
				 mobileObj[key].emit('assignRole',{'roleType':data.roleType, 'openid':data.openid});
			}
    	}
    });

    //开始锁定
    socket.on('startLock',function(){
    	if(roomList[socket.rid].pc && roomList[socket.rid].mobile){
			var mobileObj = roomList[socket.rid].mobile;
			for(var key in mobileObj) {
				 mobileObj[key].emit('startLock');
			}
    	}
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
				 mobileObj[key].emit('gameOver',{});
			}
    	}
    	callback({});
    });
}

/**手机用户加入*/
function mobileUserJoin(rid, socket, data){
	//房间不存在，则返回登录失败
	if(roomList[rid] == null || roomList[rid].pc == null){
		return false;
	}
	//手机端用户数组不存在，则新建
	if(roomList[rid].mobile == null){
		roomList[rid].mobile = {};
	}
	//房间人满，则返回登录失败
	if(getObjLength(roomList[rid].mobile) >= 3){
		return false;
	}
	//保存客户端用户
	roomList[rid].mobile[socket.openid] = socket;
	//注册客户端socket监听
	listenerSocketMobile(socket);
	//返回手机端登录成功
	//如果是手机登录，则发送玩家加入
	var pcSocket = roomList[rid].pc;
	if(pcSocket){
		pcSocket.emit('userJoin', {openid:socket.openid,headimgurl:"resource/assets/home/home_player.png",nickname:"Test"});
	}
	console.log('手机用户加入');
	return true;
}

/**监听手机端 socket*/
function listenerSocketMobile(socket){
	//锁定位置
    socket.on('lock',function(data){
		var actionType = data.actionType;
		if(roomList[socket.rid] && roomList[socket.rid].pc){
			roomList[socket.rid].pc.emit('lock',{openid:data.openid});
		}
    });

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