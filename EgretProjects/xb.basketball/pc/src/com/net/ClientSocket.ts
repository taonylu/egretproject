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
        this.socket = io.connect(window["server"],{ reconnection: false,'force new connection': true});
        
        var self: ClientSocket = this;

        //连接成功 
        this.socket.on('connect',function() {
            egret.log("connect success");
            GameManager.getInstance().onConnect();
        });    
            
        //连接失败    
        this.socket.on('error',function(data) {
            egret.log("connect error");
            GameManager.getInstance().onError();
        });   
            
        //断开连接    
        this.socket.on('disconnect',function() {
            egret.log("disconnect");
            GameManager.getInstance().onDisconnect();
        });  
        
        //尝试重新连接
        this.socket.on('reconnect_attempt',function() {
            egret.log("reconnect_attempt");
        }); 
        
        //连接超时
        this.socket.on('connect_timeout',function() {
            egret.log("connect_timeout");
        }); 
        
        
        //////////////////////////////////////////////////////
        /////////////////   接收数据     //////////////////////
        //////////////////////////////////////////////////////

        this.socket.on("startGame",function(data) {      
            self.homeScene.revStartGame();
        }); 
        
        this.socket.on("shoot", function(data){
            self.gameScene.revShoot(data);
        });
        
        this.socket.on("userQuit", function(data){
            self.gameScene.revUserQuit();
        });
    }

    //发送数据
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















