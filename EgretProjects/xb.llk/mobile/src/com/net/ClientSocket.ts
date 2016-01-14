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
    
    public connected:Boolean = false;   //是否连接
    

    public static getInstance(): ClientSocket {
        if(this.instance == null) {
            this.instance = new ClientSocket();
        }
        return this.instance;
    }

    public startConnect(url:string): void {

        //连接socket
        this.socket = io.connect(url,{ reconnection:false});
        var self: ClientSocket = this;
        
        //连接成功 
        this.socket.on('connect',function() {
            self.connected = true;
            self.onConnect();
        });    
            
        //连接失败    
        this.socket.on('error',function(data) {
            self.connected = false;
            self.onError(data);
        });   
            
        //断开连接    
        this.socket.on('disconnect',function() {
            self.connected = false;
            self.onDisconnect();
        });  
        
        //尝试重新连接
        this.socket.on('reconnect_attempt',function() {
            self.connected = false;
            self.onReconnectAttempt();
        }); 
        
        //////////////////////////////////////////////////////
        /////////////////   接收数据     //////////////////////
        //////////////////////////////////////////////////////
        //被施放道具
        this.socket.on(NetConst.S2C_pro,function(data) {
            self.gameScene.revPro(data);
        });
        
        //关卡地图
        this.socket.on(NetConst.S2C_mapData,function(data) {
            self.homeScene.revMapData(data);
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
    
    public sendMessage(cmd: string,data,callBack: Function = null,thisObject = null): void {
        if(this.connected) {
            this.socket.emit(cmd,data,function(data) {
                if(callBack && thisObject) {
                    callBack.call(thisObject,data);
                }
            });
        }
    }
    
}















