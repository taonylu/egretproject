/**
*  文 件 名：Bullet.ts
*  功    能：子弹基类
*  内    容： 
*  作    者： Rikimaru
*  生成日期：2015/8/24
*  修改日期：2015/8/24
*  修改日志：
*/
class BaseBullet extends GameObject{
    /**移动速度*/
    public moveSpeed: number;
    /**x移动速度*/
    public speedX: number;
    /**y移动速度*/
    public speedY: number;
    /**威力*/
    public power: number;
    /**子弹拥有者*/
    public owner: Owner;
    /**是否存活*/
    public bLive: boolean;
    /**子弹类型*/
    public bulletType: string;
    
	public constructor() {
        super();
	}
	
    public onMove(): void { 
        //移动
        this.x += this.speedX;
        this.y += this.speedY;
        //边界检测
        if(this.y < -this.height || this.y > GameConfig.stageHeight) {
            this.bLive = false;
        }
    }

}













