/**
*  文 件 名：PlayerManager.ts
*  功    能：玩家管理类
*  内    容： 
*  作    者： 羊力大仙
*  生成日期：2015/10/13
*  修改日期：2015/10/13
*  修改日志：
*/
class PlayerManager {

    //所有玩家列表 [userID, [[sporeID,BaseSpore]]]
    public playerList:Object = {};
    //所有孢子列表 [sporeID, BaseSpore]
    public sporeList:Object = {};
    //体重列表[userID, weight]
    public weightList:Object = {};
    
    /**添加孢子*/
    public addPlayer(player:BaseSpore): void {
        if(this.playerList[player.userID] == null) { 
            this.playerList[player.userID] = {};
        }
        this.playerList[player.userID][player.sporeID] = player;
        this.sporeList[player.sporeID] = player;

        if(this.weightList[player.userID] == null){
            this.weightList[player.userID] = player.weight;
        }

    }

    /**根据sporeID获取孢子*/
    public getPlayerBySporeID(sporeID:number): BaseSpore {
        return this.sporeList[sporeID];
    }

    /**根据userID任意获取一个孢子*/
    public getOneSporeByUserID(userID:number):BaseSpore{
        var sporeList = this.playerList[userID];
        for(var i in sporeList){
            return sporeList[i];
        }
        return null;
    }

    /**根据孢子ID获取孢子列表*/
    public getSporeBySporeID(sporeID:number):BaseSpore{
        return this.sporeList[sporeID];
    }
    
    /**根据用户ID获取孢子列表*/
    public getSporeListByUserID(userID:number): Object { 
        return this.playerList[userID];
    }

    /**删除孢子*/
    public deleteSpore(sporeID:number): void { 
        var userID: number = this.sporeList[sporeID].userID;
        delete this.playerList[userID][sporeID];
        delete this.sporeList[sporeID];
    }
    
    /**删除用户的所有孢子*/
    public deleteUser(userID: number): void { 
        var sporeList = this.playerList[userID];
        var player: BaseSpore;
        var sporeID: number;
        for(var i in sporeList) { 
            player = sporeList[i];
            sporeID = player.sporeID;
            delete this.sporeList[sporeID];
        }
        delete this.playerList[userID];
        delete this.weightList[userID];
    }

    /**根据用户ID获取体重*/
    public getWeightByUserID(userID:number):number{
        return this.weightList[userID];
    }

    /**根据孢子ID增加体重*/
    public addWeightBySporeID(sporeID:number, weight:number):void{
        var userID:number = this.getSporeBySporeID(sporeID).userID;
        if(this.weightList[userID] != null){
            this.weightList[userID] += weight;
        }
    }

    /**根据孢子ID减少体重*/
    public reduceWeightBySporeID(sporeID:number,weight:number):void{
        var userID:number = this.getSporeBySporeID(sporeID).userID;
        if(this.weightList[userID] != null){
            this.weightList[userID] -= weight;
        }
    }

    /**删除用户体重*/
    public deleteWeightByUserID(userID:number):void{
        delete this.weightList[userID];
    }

    
    /**删除所有*/
    public deleteAll(): void { 
        for(var i in this.sporeList) { 
            delete this.sporeList[i];
        }
        for(i in this.playerList) { 
            delete this.playerList[i];
        }
        for(i in this.weightList){
            delete  this.weightList[i];
        }
    }

    private static instance:PlayerManager;
    public static getInstance():PlayerManager{
        if(this.instance == null){
            this.instance = new PlayerManager();
        }
        return this.instance;
    }
    
}






