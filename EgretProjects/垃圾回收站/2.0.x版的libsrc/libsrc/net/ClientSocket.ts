/**
*  文 件 名：ClientSocket.ts
*  功    能：Socket基类
*  内    容： 
*  作    者： 羊力大仙
*  生成日期：2015/9/22
*  修改日期：2015/9/22
*  修改日志：
*/
class ClientSocket {
    private static instance:ClientSocket;
    public webSocket: egret.WebSocket;
    private socketHand: ISocketHand;     //回调
    private dataBuffer: any;             //数据缓存。socket未连接时，发送数据，则将该数据缓存。在连接成功后发送。
    public IP: string;
    public port: number;
    public isConnecting:boolean = false; //socket是否处于正在连接状态，防止多次请求连接
    private timer:egret.Timer;           //连接超时计时器
    
    public static getInstance(): ClientSocket { 
        if(this.instance == null) { 
            this.instance = new ClientSocket();
        }
        return this.instance;
    }
    
    public connect(): void {
        console.log("start connect socket...");
        if(this.webSocket == null) {
            this.webSocket = new egret.WebSocket();
            this.webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA,this.onSocketData,this);
            this.webSocket.addEventListener(egret.Event.CONNECT,this.onSocketConnect,this);
            this.webSocket.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onSocketError,this);
            this.webSocket.addEventListener(egret.Event.CLOSE,this.onSocketClose,this);
        }
        if(this.isConnecting == false) {
            this.isConnecting = true;
            this.webSocket.connect(this.IP,this.port);
            this.startTimer();
        }
    }

    private onSocketConnect(): void {
        console.log("socket connect success...");
        this.isConnecting = false;
        this.stopTimer();
        this.socketHand.onSocketConnect();
        if(this.dataBuffer != null) { 
            this.send(this.dataBuffer);
            this.dataBuffer = null;
        }
    }
    
 
    private onSocketData(): void {
       var data = this.webSocket.readUTF();
       console.log("socket rev：" + data);
       try {
           var json = JSON.parse(data);
       } catch(e){
           console.log("rev json is invalid");
           return;
       }
        this.socketHand.onSocketData(json);
    }

    private onSocketError(): void {
        console.log("socket connent error...");
        this.isConnecting = false;
        this.stopTimer();
        this.dataBuffer = null;
        this.socketHand.onSocketError();
    }
    
    
    
    private onSocketClose(): void { 
        console.log("close socket...");
        this.isConnecting = false;
        this.stopTimer();
        this.dataBuffer = null;
        this.socketHand.onSocketClose();
    }
    
    public send(json): void { 
        if(this.webSocket && this.webSocket.connected) {
            var str: string = JSON.stringify(json);
            console.log("socket send msg:" + str);
            this.webSocket.writeUTF(str);
            this.webSocket.flush();
        } else if(this.isConnecting == false){
            this.dataBuffer = json;
            this.connect();
        }
    }

    public close():void{
        if(this.webSocket){
            this.dataBuffer = null;
            this.isConnecting = false;
            this.stopTimer();
            this.webSocket.close();
        }
    }
    
    public setSocketHand(socketHand:ISocketHand): void { 
        this.socketHand = socketHand;
    }

    private startTimer():void{
        if(this.timer == null){
            this.timer = new egret.Timer(10000);
        }
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimerComplete,this);
        this.timer.reset();
        this.timer.start();
    }

    private stopTimer():void{
        if(this.timer != null){
            this.timer.stop();
        }
    }

    private onTimerComplete():void{
        this.close();
        this.socketHand.onSocketConnectTimeOver();
    }
}









