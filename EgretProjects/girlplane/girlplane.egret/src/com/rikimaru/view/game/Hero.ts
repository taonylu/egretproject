/**
*  文 件 名：Hero.ts
*  功    能：英雄
*  内    容： 
*  作    者： Rikimaru
*  生成日期：2015/8/24
*  修改日期：2015/8/24
*  修改日志：
*/
class Hero extends BaseHero{
   
    
	public constructor() {
        super();
        //创建主角
        this.addChild(new egret.Bitmap(RES.getRes("hero_png")));
        //创建主角碰撞点
        this.hitArea = new egret.Sprite();
        this.hitArea.graphics.beginFill(0x000000,0);
        this.hitArea.graphics.drawRect(0,0,50,50);
        this.hitArea.graphics.endFill();
        this.hitArea.x = this.width / 2 - this.hitArea.width/2;
        this.hitArea.y = this.height / 2 - this.hitArea.height/2;
        this.addChild(this.hitArea);
        //其他
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.cacheAsBitmap = true;
        this.bulletType = BulletA.NAME;
        this.reset();
	}
	
    public onEnter(): void { 
    
    }
	
    public reset(): void { 
        this.moveSpeed = 10;
        this.shotSpeed = 5;
        this.shotTimeCount = 0;
        this.power = 1;
        this.life = 1;
        this.bLive = true;
    }
    
    public onShot(): boolean { 
        if(this.bLive == false) { 
            return false;
        }
        //射击计时
        this.shotTimeCount++;
        if(this.shotTimeCount >= this.shotSpeed) { 
            this.shotTimeCount = 0;
            return true;
        }
        return false;
    }
    
    public beAttacked(power:number): boolean { 
        this.life -= power;
        if(this.life <= 0) { 
            return true;
        }
        return false;
    }
    
    public onDestroy(): void { 
       
    }
    
}










