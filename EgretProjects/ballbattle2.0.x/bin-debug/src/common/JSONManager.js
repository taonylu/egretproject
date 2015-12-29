/**
*  文 件 名：JSONManager.ts
*  功    能：JSON管理类
*  内    容：
*  作    者： 羊力大仙
*  生成日期：2015/9/23
*  修改日期：2015/9/23
*  修改日志：
*/
var JSONManager = (function () {
    function JSONManager() {
        /**登录请求*/
        this.loginRequest = {
            "cmd": 0,
            "userid": 0,
            "password": ""
        };
        /**登录返回*/
        this.loginReturn = {
            "cmd": 0,
            "success": 0,
            "errorcode": 0
        };
        /**点击开始游戏后发送的数据*/
        this.startRequset = {
            "cmd": 0,
            "usertype": 0,
            "userid": 0,
            "username": "",
            "skinid": 0
        };
        /**开始游戏成功，接收的的游戏数据*/
        this.gameData = {
            "cmd": 0,
            "hero": [],
            "rectnum": 0,
            "rectlist": [],
            "playernum": 0,
            "playerlist": [],
            "errorcode": 0
        };
        /**新玩家加入*/
        this.playerJoin = {
            "cmd": 0,
            "userid": 0,
            "username": "",
            "weight": 0,
            "from": "",
            "x": 0,
            "y": 0,
            "skinid": 0,
            sporeid: 0
        };
        /**玩家移动请求*/
        this.playerMove = {
            "cmd": 0,
            "userid": 0,
            "angle": "",
            "sporelist": []
        };
        /**返回玩家移动请求*/
        this.revPlayerMove = {
            "cmd": 0,
            "userid": 0,
            "angle": 0,
            "sporelist": []
        };
        /**发送吃方块请求*/
        this.eatRect = {
            "cmd": 0,
            "hunterid": 0,
            "eatlist": []
        };
        /**返回吃方块*/
        this.revEatRect = {
            "cmd": 0,
            "hunterid": 0,
            "eatlist": []
        };
        /**发送玩家互吃*/
        this.eatPlayer = {
            "cmd": 0,
            "hunterid": 0,
            "foodid": 0
        };
        /**返回玩家互吃*/
        this.revEatPlayer = {
            "cmd": 0,
            "hunterid": 0,
            "foodid": 0
        };
        /**接收生成新的方块*/
        this.revCreateNewRect = {
            "cmd": 0,
            "rectnum": 0,
            "rectlist": []
        };
        /**接收玩家离开*/
        this.revUserLeave = {
            "cmd": 0,
            "userid": 0
        };
        /**发送吐泡泡*/
        this.tuPaoPao = {
            "cmd": 0,
            "userid": 0,
        };
        /**接收吐泡泡*/
        this.revTuPaoPao = {
            "cmd": 0,
            "userid": 0,
            "paopaolist": []
        };
        /**吃泡泡*/
        this.eatPaoPao = {
            "cmd": 0,
            "hunterid": 0,
            "paopaoid": 0
        };
        /**返回吃泡泡*/
        this.revEatPaoPao = {
            "cmd": 0,
            "hunterid": 0,
            "paopaoid": 0
        };
        /**发送分裂*/
        this.fenLie = {
            "cmd": 0,
            "userid": 0,
        };
        /**接收分裂*/
        this.revFenLie = {
            "cmd": 0,
            "userid": 0,
            "sporelist": []
        };
    }
    var __egretProto__ = JSONManager.prototype;
    JSONManager.getInstance = function () {
        if (this.instance == null) {
            this.instance = new JSONManager();
        }
        return this.instance;
    };
    return JSONManager;
})();
JSONManager.prototype.__class__ = "JSONManager";
