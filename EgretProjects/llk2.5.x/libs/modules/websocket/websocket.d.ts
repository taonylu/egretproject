/**
*  文 件 名：ClientSocket.ts
*  功    能：Socket基类
*  内    容：
*  作    者： 羊力大仙
*  生成日期：2015/9/22
*  修改日期：2015/9/22
*  修改日志：
*/
declare class ClientSocket {
    private static instance;
    webSocket: egret.WebSocket;
    private socketHand;
    private dataBuffer;
    IP: string;
    port: number;
    isConnecting: boolean;
    private timer;
    private dataLenMin;
    static getInstance(): ClientSocket;
    connect(): void;
    private onSocketConnect();
    private onSocketData();
    private onSocketError();
    private onSocketClose();
    send(byteArray: any): void;
    close(): void;
    setSocketHand(socketHand: ISocketHand): void;
    private startTimer();
    private stopTimer();
    private onTimerComplete();
}
/**
*  文 件 名：ISocketHand.ts
*  功    能：socket处理类接口
*  内    容：
*  作    者： 羊力大仙
*  生成日期：2015/9/23
*  修改日期：2015/9/23
*  修改日志：
*/
interface ISocketHand {
    onSocketConnect(): void;
    onSocketData(cmd: number, byteArray: egret.ByteArray): void;
    onSocketError(): void;
    onSocketClose(): void;
    onSocketConnectTimeOver(): void;
}
