/**
*  文 件 名：EnemyA.ts
*  功    能：敌人A
*  内    容： 小型金黄色飞机
*  作    者： Rikimaru
*  生成日期：2015/8/24
*  修改日期：2015/8/24
*  修改日志：
*/
class EnemyA extends BaseEnemy{
    public static NAME: string = "EnemyA";
    
	public constructor() {
        super();
        this.texture = RES.getRes("enemy_1");
        this.setAnchor();
	}
	
	/**重置参数*/
    public reset(): void { 
        this.speedY = 2;
        this.shotSpeed = Math.random()*50 + 50;
        this.shotTimeCount = 0;
        this.life = 1; 
        this.bLive = true;
        this.bulletType =BulletB.NAME;
    }

    /**从舞台移除*/
    public onRemove(): void { 
        this.parent && this.parent.removeChild(this);
        ObjectPool.getPool(EnemyA.NAME).returnObject(this);
    }
    
}









