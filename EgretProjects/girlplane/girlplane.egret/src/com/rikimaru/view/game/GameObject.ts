/**
*  文 件 名：GameObject.ts
*  功    能：游戏元素基类
*  内    容： 
*  作    者： Rikimaru
*  生成日期：2015/8/24
*  修改日期：2015/8/24
*  修改日志：
*/
class GameObject extends egret.Bitmap{
	public constructor() {
        super();
	}
	
    public reset(): void { 
       
    }
    
    public onEnable(): void { 
        
    }
    
    public onEnterFrame(): void { 
        
    }
    
    public onRemove(): void { 
        this.parent && this.parent.removeChild(this);
    }
    
    public onDestroy(): void { 
        
    }
}
