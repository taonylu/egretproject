/**
*  功    能：JSON管理类
*  内    容：
*  作    者：羊力大仙
*  生成日期：2015/10/23
*  修改日期：
*  修改日志：
*/
var JsonManager = (function () {
    function JsonManager() {
    }
    var d = __define,c=JsonManager;p=c.prototype;
    JsonManager.submit = {
        "cmd": 0,
        "userid": 0,
        "gameid": 0,
        "score": 0,
        "username": ""
    };
    JsonManager.revSubmit = {
        "cmd": 0,
        "scorelist": []
    };
    return JsonManager;
})();
egret.registerClass(JsonManager,"JsonManager");
