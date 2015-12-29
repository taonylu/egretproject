/**
*  文 件 名：ISocketCallBack.ts
*  功    能： 客户端Socket处理接口
*  内    容： 
*  作    者： 羊力大仙
*  生成日期：2015/9/14
*  修改日期：2015/9/14
*  修改日志：
*/
interface ISocketCallBack {
    onSocketConnect(): void;
    onSocketData(data:string): void;
    onSocketError():void
    onSocketClose(): void;
}
