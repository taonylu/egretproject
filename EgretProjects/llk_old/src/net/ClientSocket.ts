/**
*  文 件 名：ClientSocket.ts
*  功    能： 客户端Socket
*  内    容： 
*  作    者： 羊力大仙
*  生成日期：2015/9/14
*  修改日期：2015/9/14
*  修改日志：
*/
class ClientSocket {
    private static instance: ClientSocket;
    private webSocket: egret.WebSocket;
    private tempMsg: string = "";           //临时数据
    private callBack: ISocketCallBack;      //socket回调
    private IP: string = "192.168.1.50";
    private port: number = 12345;

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
        this.webSocket.connect(this.IP,this.port);

    }

    private onSocketConnect(): void {
        console.log("socket connect success...");
        if(this.tempMsg != "") { 
            this.send(this.tempMsg);
            this.tempMsg = "";
        }
        this.callBack.onSocketConnect();
    }

    private onSocketData(e: egret.Event): void {
        var data = this.webSocket.readUTF();
        console.log("socket rev data：" + data);
        var json = JSON.parse(data);
        this.callBack.onSocketData(json);
        
    }

    private onSocketError(e:egret.IOErrorEvent): void { 
        console.log("socket connent error...");
        this.callBack.onSocketError();
    }
    
    public send(jsonMsg:string): void { 
        console.log("socket send msg:" + jsonMsg);
        if(this.webSocket && this.webSocket.connected) {
            this.webSocket.writeUTF(jsonMsg);
            this.webSocket.flush();
        } else { 
            console.log("socket is close,can't send msg...");
            this.tempMsg = jsonMsg;
            this.connect();
        } 
    }
    
    public onSocketClose(): void { 
        console.log("close socket...");
        this.tempMsg = "";
        this.callBack.onSocketClose();
    }
    
    public setCallBack(callBack: ISocketCallBack) { 
        this.callBack = callBack;
    }

}








