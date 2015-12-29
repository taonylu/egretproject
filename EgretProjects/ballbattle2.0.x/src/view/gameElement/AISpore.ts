/**
*  文 件 名：AISpore.ts
*  功    能：AI玩家
*  内    容： 
*  作    者：羊力大仙
*  生成日期：2015/9/18
*  修改日期：2015/9/18
*  修改日志：
*/
class AIPlayer extends BaseSpore{
    private turnRoundLimit: number = 180;
    private turnRoundCount: number = 180;   //多久转换一次方向
    
	public constructor() {
        super();
	}
	
    public autoMove(): void { 
        if(this.turnRound()) { 
            console.log("auto move");
            this.moveToByAngle(Math.random() * 360);
        }
        
    }
    
    public findTarget(target:BaseSpore): void {
        if(this.turnRound()) { 
            console.log("find target");
            this.moveToByAngle(target.angle);
        } 
    }
    
    public escape(target: BaseSpore): void {
        if(this.turnRound()) {
            console.log("escaple");
            this.moveToByAngle(target.angle);
        }
    }
    
    private turnRound(): boolean { 
        this.turnRoundCount++;
        if(this.turnRoundCount > this.turnRoundLimit) { 
            this.turnRoundCount = 0;
            return true;
        }
        return false;
    }
}
