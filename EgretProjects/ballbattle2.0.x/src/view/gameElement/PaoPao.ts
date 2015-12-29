/**
*  文 件 名：PaoPao.ts
*  功    能：玩家吐出的泡泡
*  内    容： 
*  作    者： 羊力大仙
*  生成日期：2015/10/12
*  修改日期：2015/10/12
*  修改日志：
*/
class PaoPao extends egret.Sprite{
    public ID: number;       //泡泡ID
    public userID:number;    //用户id
    public weight:number;    //重量
    public raduis: number;   //半径
    public isChecked:Boolean = false;        //已碰撞检测过，防止碰撞检测时，同时被多个玩家重复吃掉
    public isCanColliseSelf:boolean = false; //泡泡刚吐出来时，不能立刻检查和自己孢子的碰撞
    
	public constructor() {
        super();
        this.weight = GameConst.paopaoWeight;
        this.width = GameConst.paopaoInitWidth*2 + this.weight * GameConst.addRaduisRate;
        this.raduis = this.width / 2;
        
        this.graphics.beginFill(0xff0000);
        this.graphics.drawCircle(this.raduis,this.raduis,this.raduis);
        this.graphics.endFill();
        
        this.anchorOffsetX = this.raduis;
        this.anchorOffsetY = this.raduis;
	}

    //从指定位置缓动到前方一定距离
    public movefrom(xPos:number, yPos:number, angle:number): void { 
        xPos += Math.cos(angle)*GameConst.paopaoMoveDis;
        yPos += Math.sin(angle)*GameConst.paopaoMoveDis;
        egret.Tween.get(this).to({ x: xPos,y: yPos },GameConst.fenlieTime,egret.Ease.quadOut).call(function():void{
            this.isCanColliseSelf = true;
        },this);
    }
    
    public hide(): void { 
        this.parent && this.parent.removeChild(this);
        egret.Tween.removeTweens(this);
    }
	
}






