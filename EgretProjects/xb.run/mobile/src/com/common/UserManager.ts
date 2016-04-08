/**
 * 用户管理类
 * @author 
 *
 */
class UserManager {
    /**角色 0兔子 1熊猫 2麋鹿*/
    public roleID: number = 0;
    /**角色名字列表*/
    public roleNameList = ["哈哈兔", "悠悠熊猫","暴躁鹿"];
    
	private static instance:UserManager;
	public static getInstance():UserManager{
    	if(this.instance == null){
        	this.instance = new UserManager();
    	}
    	return this.instance;
	}
}
