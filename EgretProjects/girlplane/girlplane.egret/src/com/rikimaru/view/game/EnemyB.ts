/**
*  文 件 名：EnemyB.ts
*  功    能：敌人B
*  内    容： 小型金黄色飞机
*  作    者： Rikimaru
*  生成日期：2015/8/24
*  修改日期：2015/8/24
*  修改日志：
*/
class EnemyB extends BaseEnemy{
    public static NAME: string = "EnemyB";
	public constructor() {
        super();
        this.texture = RES.getRes("enemy_4");
        this.setAnchor();
	}
	
    public reset(): void { 
        this.speedX = 2;
        this.speedY = 1;
        this.shotSpeed = Math.random()*30 + 20;
        this.shotTimeCount = 0;
        this.life = 20; 
        this.bLive = true;
        this.bulletType =BulletB.NAME;
    }
    
    public onRemove(): void { 
        this.parent && this.parent.removeChild(this);
        ObjectPool.getPool(EnemyB.NAME).returnObject(this);
    }
}
