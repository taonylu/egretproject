/**
*  文 件 名：LoginSuccessJSON.ts
*  功    能： 登录成功
*  内    容： 
*  作    者： 羊力大仙
*  生成日期：2015/9/16
*  修改日期：2015/9/16
*  修改日志：
*/
class LoginSuccessJSON {
    public json;
    public cmd: number = 1001;
    public userID: number = 0;
    public userName: string = "";
  
    public readData(json): void {
        this.json = json;
        this.cmd = this.json.cmd;
        this.userID = this.json.userID;
        this.userName = StringTool.mixUnicodeToCh(this.json.userName);
        //this.userName = this.json.userName;
    }
}
