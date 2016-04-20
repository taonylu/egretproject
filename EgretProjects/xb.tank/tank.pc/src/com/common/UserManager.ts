/**
 * 用户管理类
 * @author 
 *
 */
class UserManager {
    public userList: Array<UserVO> = new Array<UserVO>();  //用户列表
    public userLimit = 2; //用户数量上限
    
    /**
     * 添加用户
     * @param userVo
     * @return 是否添加成功
     */
    public addUser(userVO: UserVO): boolean {
        if(this.userList.length < this.userLimit) {
            if(this.isExsit(userVO.openid) == false) {
                this.userList.push(userVO);
                return true;
            }
        }else{
            console.log("用户数量已达上限");
        }
        return false;
    }
    
    //删除用户
    public deleteUser(openid: string) {
        var len = this.userList.length;
        for(var i = 0;i < len;i++) {
            if(this.userList[i].openid == openid) {
                this.userList.splice(i,1);
            }
        }
    }
    
    //获取用户
    public getUser(openid: string): UserVO {
        var len = this.userList.length;
        for(var i = 0;i < len;i++) {
            if(this.userList[i].openid == openid) {
                return this.userList[i];
            }
        }
        return null;
    }
    
    //是否已存在该用户
    public isExsit(openid: string): boolean {
        var len = this.userList.length;
        for(var i = 0;i < len;i++) {
            if(this.userList[i].openid == openid) {
                return true;
            }
        }
        return false;
    }
    
    //超出用户人数限制
    public isOverUserLimit(): boolean {
        if(this.userList.length > this.userLimit) {
            return true;
        }
        return false;
    }
    
    //获取用户人数
    public getUserNum() {
        return this.userList.length;
    }
    
    //清理所有用户
    public clearAllUser() {
        this.userList.length = 0;
    }
    
    
    
    
    private static instance: UserManager;
    public static getInstance(): UserManager {
        if(this.instance == null) {
            this.instance = new UserManager();
        }
        return this.instance;
    }
}
