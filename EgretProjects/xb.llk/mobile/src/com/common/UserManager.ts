/**
 *
 * @author 
 *
 */
class UserManager {
	
    public luckyUser:string = "";   //大屏显示用户
    
    public bLuckUser:Boolean = false;
    
    private static instance:UserManager;
    public static getInstance():UserManager{
        if(this.instance == null){
            this.instance = new UserManager();
        }
        return this.instance;
    }
}
