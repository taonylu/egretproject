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
    	delete pcUser[socket.name];
    	delete mobileUser[socket.name];
    });
   
});

function initPC(socket){
	
}

function initMobile(socket){
	//接收来自手机的锁定中心消息
    socket.on('lockOn',function(data,callback){
    	if(mobileUser[socket.name]){
    		var deviceX = data.deviceX;
    		var deviceY = data.deviceY;
    		var deviceZ = data.deviceZ;

			if(pcUser[socket.name]){
				pcUser[socket.name].emit('lockOn',{deviceX:deviceX, deviceY:deviceY,deviceZ:deviceZ});
			}
			callback();
    	}
    });
}