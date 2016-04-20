/**
 * 用户管理类
 * @author 
 *
 */
class UserManager {
	
    private static instance: UserManager;
    public static getInstance(): UserManager {
        if(this.instance == null) {
            this.instance = new UserManager();
        }
        return this.instance;
    }
}
