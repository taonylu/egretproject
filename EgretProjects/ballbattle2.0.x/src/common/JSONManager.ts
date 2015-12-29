/**
*  文 件 名：JSONManager.ts
*  功    能：JSON管理类
*  内    容： 
*  作    者： 羊力大仙
*  生成日期：2015/9/23
*  修改日期：2015/9/23
*  修改日志：
*/
class JSONManager {
    
    /**登录请求*/
    public loginRequest = {
        "cmd": 0,
        "userid":0,
        "password":""
    }
    
    /**登录返回*/
    public loginReturn = {
        "cmd":0,
        "success":0,
        "errorcode":0
    }
    
    /**点击开始游戏后发送的数据*/
    public startRequset = {
        "cmd":0,
        "usertype":0,    //0游客  1用户    
        "userid":0,
        "username":"",
        "skinid":0
    }
    
    /**开始游戏成功，接收的的游戏数据*/
    public gameData = {
        "cmd":0,
        "hero":[],
        "rectnum":0,
        "rectlist":[],
        "playernum":0,
        "playerlist":[],
        "errorcode":0
    }
    
    /**新玩家加入*/
    public playerJoin = {
        "cmd":0,
        "userid":0,
        "username":"",
        "weight":0,
        "from":"",
        "x":0,
        "y":0,
        "skinid":0,
        sporeid:0
    }
    
    /**玩家移动请求*/
    public playerMove = {
        "cmd":0,
        "userid":0,
        "angle": "",    //服务端不收浮点数...
        "sporelist":[]
    }
    
    /**返回玩家移动请求*/
    public revPlayerMove = {
        "cmd":0,
        "userid":0,
        "angle":0,
        "sporelist":[]
    }
    
    /**发送吃方块请求*/
    public eatRect = {
        "cmd":0,
        "hunterid":0,
        "eatlist":[]
    }
    
    /**返回吃方块*/
    public revEatRect = {
        "cmd":0,
        "hunterid":0,
        "eatlist":[]
    }
    
    /**发送玩家互吃*/
    public eatPlayer = {
        "cmd":0,
        "hunterid":0,
        "foodid":0
    }
    
    /**返回玩家互吃*/
    public revEatPlayer = {
        "cmd":0,
        "hunterid":0,
        "foodid":0
    }
    
    /**接收生成新的方块*/
    public revCreateNewRect = {
        "cmd":0,
        "rectnum":0,
        "rectlist":[]
    }
    
    /**接收玩家离开*/
    public revUserLeave = {
        "cmd":0,
        "userid":0
    }
    
    /**发送吐泡泡*/
    public tuPaoPao = {
        "cmd":0,
        "userid":0,
    }
    
    /**接收吐泡泡*/
    public revTuPaoPao = {
        "cmd":0,
        "userid":0,
        "paopaolist":[]
    }

    /**吃泡泡*/
    public eatPaoPao = {
        "cmd":0,
        "hunterid":0,
        "paopaoid":0
    }

    /**返回吃泡泡*/
    public revEatPaoPao = {
        "cmd":0,
        "hunterid":0,
        "paopaoid":0
    }
    
    /**发送分裂*/
    public fenLie = {
        "cmd":0,
        "userid":0,
    }
    
    /**接收分裂*/
    public revFenLie = {
        "cmd":0,
        "userid":0,
        "sporelist":[]
    }
    
    private static instance: JSONManager;
        
    public static getInstance(): JSONManager { 
        if(this.instance == null) { 
            this.instance = new JSONManager();
        }
        return this.instance;
    }
}
