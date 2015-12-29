/**
*  文 件 名：UserDataProxy.ts
*  功    能： 用户数据
*  内    容： 
*  作    者： 羊力大仙
*  生成日期：2015/9/16
*  修改日期：2015/9/16
*  修改日志：
*/
class UserDataProxy extends puremvc.Proxy implements puremvc.IProxy{
    public static NAME: string = "UserDataProxy";
    
    public userID: number = 0;
    public userName: string = "";
    
	public constructor() {
        super(UserDataProxy.NAME);
	}

}
