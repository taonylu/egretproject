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
    var __egretProto__ = PlayerManager.prototype;
    /**添加孢子*/
    __egretProto__.addPlayer = function (player) {
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
    __egretProto__.getPlayerBySporeID = function (sporeID) {
        return this.sporeList[sporeID];
    };
    /**根据userID任意获取一个孢子*/
    __egretProto__.getOneSporeByUserID = function (userID) {
        var sporeList = this.playerList[userID];
        for (var i in sporeList) {
            return sporeList[i];
        }
        return null;
    };
    /**根据孢子ID获取孢子列表*/
    __egretProto__.getSporeBySporeID = function (sporeID) {
        return this.sporeList[sporeID];
    };
    /**根据用户ID获取孢子列表*/
    __egretProto__.getSporeListByUserID = function (userID) {
        return this.playerList[userID];
    };
    /**删除孢子*/
    __egretProto__.deleteSpore = function (sporeID) {
        var userID = this.sporeList[sporeID].userID;
        delete this.playerList[userID][sporeID];
        delete this.sporeList[sporeID];
    };
    /**删除用户的所有孢子*/
    __egretProto__.deleteUser = function (userID) {
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
    __egretProto__.getWeightByUserID = function (userID) {
        return this.weightList[userID];
    };
    /**根据孢子ID增加体重*/
    __egretProto__.addWeightBySporeID = function (sporeID, weight) {
        var userID = this.getSporeBySporeID(sporeID).userID;
        if (this.weightList[userID] != null) {
            this.weightList[userID] += weight;
        }
    };
    /**根据孢子ID减少体重*/
    __egretProto__.reduceWeightBySporeID = function (sporeID, weight) {
        var userID = this.getSporeBySporeID(sporeID).userID;
        if (this.weightList[userID] != null) {
            this.weightList[userID] -= weight;
        }
    };
    /**删除用户体重*/
    __egretProto__.deleteWeightByUserID = function (userID) {
        delete this.weightList[userID];
    };
    /**删除所有*/
    __egretProto__.deleteAll = function () {
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
PlayerManager.prototype.__class__ = "PlayerManager";
