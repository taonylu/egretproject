/**
 * 通讯类
 * @author 
 *
 */
class ClientSocket {
    private static instance: ClientSocket;  //单例
    private socket;                         //socket.io

    public gameManager:GameManager;
    public homeScene:HomeScene;
    public gameScene:GameScene;
    public lockScene:LockScene;
    
    public static getInstance(): ClientSocket {
        if(this.instance == null) {
            this.instance = new ClientSocket();
        }
        return this.instance;
    }
    
    public isConnected():Boolean{
        if(this.socket && this.socket.connected){
            return true;
        }
        return false;
    }
    
    public closeSocket(){
        egret.log("主动断开连接");
        this.socket.disconnect();
    }

    public startConnect(): void {

        //连接socket
        this.socket = io.connect(GameConst.gameCofig.server,{ reconnection: false,'force new connection': true});
        console.log("connect:",GameConst.gameCofig.server);
        
        var self: ClientSocket = this;
        
        //连接成功 
        this.socket.on('connect',function() {
            egret.log("connenct succss");
            self.gameManager.connect();
        });    
            
        //连接失败    
        this.socket.on('error',function(data) {
            egret.log("connenct erro");
            
        });   
            
        //断开连接    
        this.socket.on('disconnect',function() {
            egret.log("connenct close");
            self.gameManager.disconnect();
        });  
        
        //尝试重新连接
        this.socket.on('reconnect_attempt',function() {
            egret.log("reconnect");
        }); 
        
        //连接超时
        this.socket.on('connect_timeout',function() {
            //self.onReconnectAttempt();
        }); 
        
        
        //////////////////////////////////////////////////////
        /////////////////   接收数据     //////////////////////
        //////////////////////////////////////////////////////

        this.socket.on("userJoin",function(data) {
            self.homeScene.revUserJoin(data);
        }); 
        
        this.socket.on("lock",function(data) {
            self.lockScene.revLock(data);
        }); 
        
        this.socket.on("action", function(data){
           self.gameScene.revAction(data); 
        });
        
        this.socket.on("userQuit",function(data) {
            self.homeScene.revUserQuit(data);
        });
    }
    
    //////////////////////////////////////////////////////
    /////////////////   发送数据    //////////////////////
    //////////////////////////////////////////////////////
       
    
    public sendMessage(cmd: string,data = null,callBack: Function = null,thisObject = null): void {
        if(this.socket && this.socket.connected) {
            this.socket.emit(cmd,data,function(data) {
                if(callBack && thisObject) {
                    callBack.call(thisObject,data);
                }
            });
        }
    }
    
}















