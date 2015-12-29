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
    onSocketData(json): void;
    onSocketError(): void;
    onSocketClose(): void;
    onSocketConnectTimeOver():void;
}
