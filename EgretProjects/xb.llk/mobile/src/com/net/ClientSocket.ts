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
        
        //接收用户自己信息
        this.socket.on(NetConst.S2C_userInfo,function(data) {
            self.homeScene.revUserInfo(data);
        });

        //被施放道具
        this.socket.on(NetConst.S2C_pro,function(data) {
            self.gameScene.revPro(data);
        });
        
        //关卡地图
        this.socket.on(NetConst.S2C_mapData,function(data) {
            self.gameScene.revMapData(data);
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
    public sendMessage(cmd: string,json): void {
        console.log("send:" + json);
        this.socket.emit(cmd,json);
    }
    
}















