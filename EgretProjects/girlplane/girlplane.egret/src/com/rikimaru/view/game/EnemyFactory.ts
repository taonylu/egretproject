/**
*  文 件 名：EnemyFactory.ts
*  功    能： 飞机工厂
*  内    容： 
*  作    者： Rikimaru
*  生成日期：2015/8/25
*  修改日期：2015/8/25
*  修改日志：
*/
class EnemyFactory {
    private static instance;
    
    public static getInstance(): EnemyFactory { 
        if(this.instance == null) { 
            this.instance = new EnemyFactory();
        }
        return this.instance;
    }
    
    /**创建一个敌人*/
    public create(name:string): void { 
        var scene: GameScene = GameScene.instance;
        var enemy:BaseEnemy = ObjectPool.getPool(name).getObject();
        enemy.reset();
        scene.enemyList.push(enemy);
        scene.gameSprite.addChild(enemy);
        enemy.x = 50 +  (scene.mapWidth-100) * Math.random();
        enemy.y = 0;
        
    }
    
    public createRandom(): void { 
        
    }
	
}








