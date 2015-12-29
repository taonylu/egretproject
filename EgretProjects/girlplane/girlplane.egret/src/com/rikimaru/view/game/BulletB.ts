/**
*  文 件 名：BulletA.ts
*  功    能：子弹B
*  内    容： 圆形普通小子弹
*  作    者： Rikimaru
*  生成日期：2015/8/24
*  修改日期：2015/8/24
*  修改日志：
*/
class BulletB extends BaseBullet{
    public static NAME: string = "BulletB";
    public constructor() {
        super();
        this.texture = RES.getRes("enemyBullet1");
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
    }
	
    public reset(): void { 
        this.moveSpeed = 10;
        this.speedY = 5;
        this.owner = Owner.Enemy;
        this.power = 1;
        this.bLive = true;
    }
}









