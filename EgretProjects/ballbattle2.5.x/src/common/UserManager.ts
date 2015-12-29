/**
*  文 件 名：UserManager.ts
*  功    能：用户数据
*  内    容： 
*  作    者：羊力大仙
*  生成日期：2015/9/23
*  修改日期：2015/9/23
*  修改日志：
*/
class UserManager{
    
    /**用户ID*/
    public userID: number = 0;
    /**用户昵称*/
    public userName: string = "";
    /**用户类型 0游客 1注册用户*/
    public userType: number = 0;
    /**皮肤ID*/
    public skinID: number = 1;
    
    private static instance:UserManager;
    
    public static getInstance(): UserManager { 
        if(this.instance == null) { 
            this.instance = new UserManager();
        }
        return this.instance;
    }
    
}
