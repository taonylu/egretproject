/**
*  文 件 名：BaseHero.ts
*  功    能：英雄基类
*  内    容： 
*  作    者： Rikimaru
*  生成日期：2015/8/24
*  修改日期：2015/8/24
*  修改日志：
*/
class BaseHero extends egret.Sprite{
    /**移动速度*/
    public moveSpeed: number;
    /**攻击速度*/
    public shotSpeed: number;
    /**攻击时间计数*/
    public shotTimeCount: number;
    /**威力*/
    public power: number;
    /**生命*/
    public life: number;
    /**是否存活*/
    public bLive:boolean;
    /**碰撞范围*/
    public hitArea: egret.Sprite;
    /**子弹类型*/
    public bulletType: string;
    
	public constructor() {
        super();
	}
	
    public onRemove(): void { 
        this.parent && this.parent.removeChild(this);
    }
}
