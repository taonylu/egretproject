/**
*  文 件 名：PlayerManager.ts
*  功    能：玩家管理类
*  内    容：
*  作    者： 羊力大仙
*  生成日期：2015/10/13
*  修改日期：2015/10/13
*  修改日志：
*/
var PlayerManager = (function () {
    function PlayerManager() {
        //所有玩家列表 [userID, [[sporeID,BaseSpore]]]
        this.playerList = {};
        //所有孢子列表 [sporeID, BaseSpore]
        this.sporeList = {};
        //体重列表[userID, weight]
        this.weightList = {};
    }
    var d = __define,c=PlayerManager;p=c.prototype;
    /**添加孢子*/
    p.addPlayer = function (player) {
        if (this.playerList[player.userID] == null) {
            this.playerList[player.userID] = {};
        }
        this.playerList[player.userID][player.sporeID] = player;
        this.sporeList[player.sporeID] = player;
        if (this.weightList[player.userID] == null) {
            this.weightList[player.userID] = player.weight;
        }
    };
    /**根据sporeID获取孢子*/
    p.getPlayerBySporeID = function (sporeID) {
        return this.sporeList[sporeID];
    };
    /**根据userID任意获取一个孢子*/
    p.getOneSporeByUserID = function (userID) {
        var sporeList = this.playerList[userID];
        for (var i in sporeList) {
            return sporeList[i];
        }
        return null;
    };
    /**根据孢子ID获取孢子列表*/
    p.getSporeBySporeID = function (sporeID) {
        return this.sporeList[sporeID];
    };
    /**根据用户ID获取孢子列表*/
    p.getSporeListByUserID = function (userID) {
        return this.playerList[userID];
    };
    /**删除孢子*/
    p.deleteSpore = function (sporeID) {
        var userID = this.sporeList[sporeID].userID;
        delete this.playerList[userID][sporeID];
        delete this.sporeList[sporeID];
    };
    /**删除用户的所有孢子*/
    p.deleteUser = function (userID) {
        var sporeList = this.playerList[userID];
        var player;
        var sporeID;
        for (var i in sporeList) {
            player = sporeList[i];
            sporeID = player.sporeID;
            delete this.sporeList[sporeID];
        }
        delete this.playerList[userID];
        delete this.weightList[userID];
    };
    /**根据用户ID获取体重*/
    p.getWeightByUserID = function (userID) {
        return this.weightList[userID];
    };
    /**根据孢子ID增加体重*/
    p.addWeightBySporeID = function (sporeID, weight) {
        var userID = this.getSporeBySporeID(sporeID).userID;
        if (this.weightList[userID] != null) {
            this.weightList[userID] += weight;
        }
    };
    /**根据孢子ID减少体重*/
    p.reduceWeightBySporeID = function (sporeID, weight) {
        var userID = this.getSporeBySporeID(sporeID).userID;
        if (this.weightList[userID] != null) {
            this.weightList[userID] -= weight;
        }
    };
    /**删除用户体重*/
    p.deleteWeightByUserID = function (userID) {
        delete this.weightList[userID];
    };
    /**删除所有*/
    p.deleteAll = function () {
        for (var i in this.sporeList) {
            delete this.sporeList[i];
        }
        for (i in this.playerList) {
            delete this.playerList[i];
        }
        for (i in this.weightList) {
            delete this.weightList[i];
        }
    };
    PlayerManager.getInstance = function () {
        if (this.instance == null) {
            this.instance = new PlayerManager();
        }
        return this.instance;
    };
    return PlayerManager;
})();
egret.registerClass(PlayerManager,"PlayerManager");
