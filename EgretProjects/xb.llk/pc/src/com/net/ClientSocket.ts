/**
 * 通讯类
 * @author 
 *
 */
class ClientSocket {
    private static instance: ClientSocket;  //单例
    private socket;                         //socket.io
    
    public homeScene: HomeScene;            //主页场景
    public gameScene: GameScene;            //游戏场景

    public static getInstance(): ClientSocket {
        if(this.instance == null) {
            this.instance = new ClientSocket();
        }
        return this.instance;
    }

    public startConnect(url:string): void {

        //连接socket
        this.socket = io.connect(url);
         
        var self: ClientSocket = this;
        
        //连接成功 
        this.socket.on('connect',function() {
            self.onConnect();
        });    
            
        //连接失败    
        this.socket.on('error',function(data) {
            self.onError(data);
        });   
            
        //断开连接    
        this.socket.on('disconnect',function() {
            self.onDisconnect();
        });  
        
        //尝试重新连接
        this.socket.on('reconnect_attempt',function() {
            self.onReconnectAttempt();
        }); 
        
        //////////////////////////////////////////////////////
        /////////////////   接收数据     //////////////////////
        //////////////////////////////////////////////////////
        
        //屏幕准备
        this.socket.on(NetConst.loginComplete,function(data) {
            self.homeScene.revLoginComplete(data);
        });
        
        //玩家加入
        this.socket.on(NetConst.userJoin,function(data) {
            self.homeScene.revUserJoin(data);
        });
        
        //玩家退出
        this.socket.on(NetConst.userQuit,function(data) {
            self.homeScene.revUserQuit(data);
        });
        
        //游戏开始
        this.socket.on(NetConst.gameStart,function(data) {
            self.homeScene.revGameStart(data);
        });
        
        //玩家消除
        this.socket.on(NetConst.eliminate,function(data) {
            self.gameScene.revEliminate(data);
        });
        
        //使用道具(大屏幕)
        this.socket.on(NetConst.pro,function(data) {
            self.gameScene.revPro(data);
        });
        
        //使用道具（手机）
        this.socket.on(NetConst.userPro,function(data) {
            self.gameScene.revUserPro(data);
        });
        
        //地图更换
        this.socket.on(NetConst.luckyMap,function(data) {
            self.gameScene.revLuckyMap(data);
        });
        
        //游戏结束
        this.socket.on(NetConst.gameOver,function(data) {
            self.gameScene.revGameOver(data);
        });
    }
    
    //////////////////////////////////////////////////////
    /////////////////   事件处理    //////////////////////
    //////////////////////////////////////////////////////
        
    //连接成功
    private onConnect(): void {
        egret.log("connenct succss");
    }
        
    //连接失败
    private onError(data): void {
        egret.log("connenct erro");
    }
        
    //连接断开
    private onDisconnect(): void {
        egret.log("connenct close");
    }
        
    //尝试重新连接
    private onReconnectAttempt(): void {
        egret.log("reconnect");
    }
    
    //发送数据
    public sendMessage(cmd: string,data): void {
        console.log("send:" + data);
        this.socket.emit(cmd,data);
    }
    
}















