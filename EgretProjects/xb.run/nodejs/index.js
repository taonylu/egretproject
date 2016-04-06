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
        console.log("rid:",rid,"userType:",userType)
        //将新加入用户的唯一标识当作socket的名称，后面退出的时候会用到
        socket.name = rid;

        //检查在线列表，如果不在里面就加入
    	if(userType == "pc" && !pcUser[rid]){
    		initPC(socket);
    		pcUser[rid] = socket;
    		console.log('PC加入了聊天室');
    	}else if(userType == "mobile" && !mobileUser[rid]){
    		initMobile(socket);
    		mobileUser[rid] = socket;
    		console.log('手机加入了聊天室');
    	}
        //回调函数
        callback({success:true});

        //如果是手机登录，则让pc端显示游戏准备界面
        if(userType == "mobile"){
        	var pcSocket = pcUser[rid];
        	if(pcSocket){
        		pcSocket.emit('userJoin');
        	}
        }

        
    });

     
    //监听用户退出
    socket.on('disconnect', function(){
		var pcSocket = pcUser[socket.name];
		if(pcSocket){
			pcSocket.emit('userQuit');
		}
    	delete pcUser[socket.name];
    	delete mobileUser[socket.name];
    });
   
});

function initPC(socket){
	//开始校准
    socket.on('startLock',function(data){
    	if(pcUser[socket.name]){
			if(mobileUser[socket.name]){
				mobileUser[socket.name].emit('startLock');
			}
    	}
    });

	//开始游戏
    socket.on('startGame',function(data){
    	if(pcUser[socket.name]){
			if(mobileUser[socket.name]){
				mobileUser[socket.name].emit('startGame');
			}
    	}
    });

	//游戏结束
    socket.on('gameOver',function(data){
    	if(pcUser[socket.name]){
			if(mobileUser[socket.name]){
				mobileUser[socket.name].emit('gameOver');
			}
    	}
    });
}

function initMobile(socket){
	//接收来自手机的消息
    socket.on('action',function(data){
    	if(mobileUser[socket.name]){
    		var actionType = data.actionType;
			if(pcUser[socket.name]){
				pcUser[socket.name].emit('action',{actionType:actionType});
			}
    	}
    });

	//锁定
    socket.on('lock',function(data){
    	if(mobileUser[socket.name]){
			if(pcUser[socket.name]){
				pcUser[socket.name].emit('lock');
			}
    	}
    });
}