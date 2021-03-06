/**
 * 通讯类
 * @author 
 *
 */
class ClientSocket {
    private static instance: ClientSocket;  //单例
    private socket;                         //socket.io
    
    public gameManager:GameManager;
    public lockScene:LockScene;
    public gameScene:GameScene;
    public resultScene:ResultScene;
    
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
        this.socket = io.connect(window["gameConfig"].server,{ reconnection: false,'force new connection': true});
        console.log("connect:",window["gameConfig"].server);
        
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
        
        this.socket.on("startLock",function(data) {
            self.gameManager.revStartLock();
        }); 
        
        this.socket.on("assignRole",function(data) {
            self.lockScene.revAssignRole(data);
        });
        
        this.socket.on("startGame",function(data) {      
            self.lockScene.revStartGame();
        });
        
        this.socket.on("gameOver",function(data) {
            self.gameScene.revGameOver(data);
        }); 
        
        this.socket.on("prize",function(data) {
            self.gameScene.revPrize();
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















