/**
*  文 件 名：Enemy.ts
*  功    能：敌人基类
*  内    容： 
*  作    者： Rikimaru
*  生成日期：2015/8/24
*  修改日期：2015/8/24
*  修改日志：
*/
class BaseEnemy extends GameObject {
    /**移动速度*/
    public moveSpeed: number;
    public speedX: number;
    public speedY: number;
    /**生命值*/
    public life: number;
    /**是否存活*/
    public bLive: boolean;
    /**射击速度*/
    public shotSpeed: number;
    /**射击时间计数*/
    public shotTimeCount: number;
    /**子弹类型*/
    public bulletType: string;
    
    public constructor() {
        super();
    }
    
    /**设置锚点*/
    protected setAnchor(): void { 
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
    }
    
    public onMove(): void { 
        //移动
        this.x += this.speedX;
        this.y += this.speedY;
        //边界检测
        if(this.y < -this.height || this.y > GameConfig.stageHeight) {
            this.bLive = false;
        }
        if(this.x < this.width/2) {
            this.x = this.width/2;
            this.speedX = -this.speedX;
        } else if(this.x > GameConfig.stageWidth - this.width/2) { 
            this.x = GameConfig.stageWidth - this.width/2;
            this.speedX = -this.speedX;
        }
    }
    
    /**射击*/
    public onShot(): boolean { 
        //射击计时
        this.shotTimeCount++;
        if(this.shotTimeCount >= this.shotSpeed) { 
            this.shotTimeCount = 0;
            return true;
        }
        return false;
    }
    
    /**遭受攻击*/
    public beAttacked(power:number): boolean { 
        this.life -= power;
        if(this.life <= 0) { 
            this.bLive = false;
            return true;
        }
        return false;
    }
}






