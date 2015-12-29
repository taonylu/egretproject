var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.send('<h1>Welcome Realtime Server</h1>');

});

//�����û�
var onlineUsers = {};
//��ǰ��������
var onlineCount = 0;

io.on('connection', function(socket){
    console.log('a user connected');

    //socket.emit("news","welcome");

    console.log(socket.baseUrl);


    //�������û�����
    socket.on('login', function(obj){
        //���¼����û���Ψһ��ʶ����socket�����ƣ������˳���ʱ����õ�
        socket.name = obj.userid;

        //��������б������������ͼ���
        if(!onlineUsers.hasOwnProperty(obj.userid)) {
            onlineUsers[obj.userid] = obj.username;
            //��������+1
            onlineCount++;
        }

        //�����пͻ��˹㲥�û�����
        io.emit('login', {onlineUsers:onlineUsers, onlineCount:onlineCount, user:obj});
        console.log(obj.username+'������������');
    });

    //�����û��˳�
    socket.on('disconnect', function(){
        //���˳����û��������б���ɾ��
        if(onlineUsers.hasOwnProperty(socket.name)) {
            //�˳��û�����Ϣ
            var obj = {userid:socket.name, username:onlineUsers[socket.name]};

            //ɾ��
            delete onlineUsers[socket.name];
            //��������-1
            onlineCount--;

            //�����пͻ��˹㲥�û��˳�
            io.emit('logout', {onlineUsers:onlineUsers, onlineCount:onlineCount, user:obj});
            console.log(obj.username+'�˳���������');
        }
    });

    //�����û�������������
    socket.on('message', function(obj){
        //�����пͻ��˹㲥��������Ϣ
        io.emit('message', obj);
        console.log(obj.username+'˵��'+obj.content);
    });

});

http.listen(3000, function(){
    console.log('listening on *:3000');
});