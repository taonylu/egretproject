/**
 *
 * @author 
 *
 */
class LifeUI extends egret.DisplayObjectContainer{
    
    private lifeList: Array<egret.Bitmap> = [];
    
	public constructor() {
        super();
        
        for(var i: number = 0;i < 3;i++) {
            var life: egret.Bitmap = new egret.Bitmap(RES.getRes("life_png"));
            life.x = i*(10 + life.width);
            this.addChild(life);
            this.lifeList.push(life);
        }
	}
	
    public setLife(lifeNum:number): void {
        for(var i: number = 0;i < 3;i++) {
            if(i < lifeNum) {
                this.lifeList[i].visible = true;
            } else {
                this.lifeList[i].visible = false;
            }
        }
    }
}
