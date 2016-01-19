/**
 *
 * @author 
 *
 */
class UserManager {
	
    public luckyUser:string = "";   //大屏显示用户
    public userList = {};           //用户列表，根据uid保存userVO信息
    
    //保存用户
    public storeUser(userVO:UserVO){
        this.userList[userVO.uid] = userVO;
    }
    
    //获取用户
    public getUser(uid:string):UserVO{
        return this.userList[uid];
    }
    
    //删除用户
    public deleteUser(uid:string){
        if(this.isExist(uid)){
            var userVO:UserVO = this.userList[uid];
            userVO.clear();
        }
        delete this.userList[uid];
    }
    
    //用户是否存在
    public isExist(uid:string):Boolean{
        if(this.userList[uid]){
            return true;
        }
        return false;
    }
    
    //清理用户列表
    public clear(){
        for(var key in this.userList){
            var userVO:UserVO = this.userList[key];
            userVO.clear();
            delete this.userList[key];
        }
    }
    
    
    private static instance:UserManager;
    public static getInstance():UserManager{
        if(this.instance == null){
            this.instance = new UserManager();
        }
        return this.instance;
    }
}
