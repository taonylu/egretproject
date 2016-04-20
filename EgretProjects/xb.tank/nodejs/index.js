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
var pcUser = {};
var mobileUser = {};

io.on('connection', function(socket){
    console.log('a user connected');
     
    //监听新用户加入
    socket.on('login', function(data,callback){
    	var userType = data.userType;
        var rid = data.rid;
		var openid = data.openid;
        console.log("rid:" + rid + " userType:" + userType + " openid:" + openid);
        //将新加入用户的唯一标识当作socket的名称，后面退出的时候会用到
        socket.rid = rid;
		socket.openid = openid;

        //检查在线列表，如果不在里面就加入
    	if(userType == "pc" && !pcUser[rid]){
    		initPC(socket);
    		pcUser[rid] = socket;
    		console.log('PC用户加入');
    	}else if(userType == "mobile"){
    		initMobile(socket);
			if(mobileUser[rid] == undefined){
				mobileUser[rid] = {};
			}
    		mobileUser[rid][data.openid] = socket;
    		console.log('手机用户加入');
    	}
        //回调函数
        callback({success:true});

        //如果是手机登录，则发送玩家加入
        if(userType == "mobile"){
        	var pcSocket = pcUser[rid];
        	if(pcSocket){
        		pcSocket.emit('userJoin', {openid:openid,headimgurl:"",nickname:"ABC"});
        	}
        }

        
    });

     
    //监听用户退出
    socket.on('disconnect', function(){
		var pcSocket = pcUser[socket.rid];
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

function initPC(socket){
	//更新rid
    socket.on('upRid',function(data){
    	if(pcUser[socket.rid]){
			delete pcUser[socket.rid];
			delete mobileUser[socket.rid];
			pcUser[data.rid] = socket;
    	}
    });

	//开始游戏
    socket.on('startGame',function(data){
    	if(pcUser[socket.rid]){
			if(mobileUser[socket.rid]){
				io.emit('startGame');
			}
    	}
    });

	//游戏结束
    socket.on('gameOver',function(data,callback){
    	if(pcUser[socket.rid]){
			if(mobileUser[socket.rid]){
				io.emit('gameOver');
			}
    	}
		callback();
    });
}

function initMobile(socket){
	//接收来自手机的消息
    socket.on('action',function(data){
    	if(mobileUser[socket.rid]){
    		var actionType = data.actionType;
			if(pcUser[socket.rid]){
				pcUser[socket.rid].emit('action',{actionType:actionType,openid:socket.openid});
			}
    	}
    });
}