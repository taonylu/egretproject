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
        this.socket = io.connect(url,{ reconnection: false});
         
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
        
        //玩家弹幕
        this.socket.on(NetConst.S2C_barrage,function(data) {
            GameManager.getInstance().revBarrage(data);
        });
        
        //登录完成
        this.socket.on(NetConst.S2C_login,function(data) {
           self.homeScene.revLogin(data);
        });
        
        //玩家加入
        this.socket.on(NetConst.S2C_userJoin,function(data) {
            self.homeScene.revUserJoin(data);
        });
        
        //玩家退出
        this.socket.on(NetConst.S2C_userQuit,function(data) {
            self.homeScene.revUserQuit(data);
        });
        
        //游戏开始
        this.socket.on(NetConst.S2C_gameStart,function(data) {
            self.homeScene.revGameStart(data);
        });
        
        //玩家消除
        this.socket.on(NetConst.S2C_eliminate,function(data) {
            self.gameScene.revEliminate(data);
        });
        
        //使用道具(大屏幕)
        this.socket.on(NetConst.S2C_pro,function(data) {
            self.gameScene.revPro(data);
        });
        
        //地图更换
        this.socket.on(NetConst.S2C_luckyMap,function(data) {
            self.gameScene.revLuckyMap(data);
        });
        
        //游戏结束
        this.socket.on(NetConst.S2C_gameOver,function(data) {
            self.gameScene.revGameOver(data);
        });
    }
    
    //////////////////////////////////////////////////////
    /////////////////   事件处理    //////////////////////
    //////////////////////////////////////////////////////
        
    //连接成功
    private onConnect(): void {
        egret.log("connenct succss");
        GameManager.getInstance().onConnect();
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
        this.socket.emit(cmd,data);
    }
    
}















