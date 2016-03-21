/**
 * 游戏背景，山，天空，草地
 * @author 
 *
 */
class GameBg extends BaseUI{
    private sky:eui.Image;      //地图
    private sky0:eui.Image;     //地图用于交迭
    private hill:eui.Image;
    private hill0:eui.Image;
    private grass:eui.Image;
    private grass0:eui.Image;
    private skySpeed:number = -0.1;
    private hillSpeed:number = -0.5;
    private grassSpeed:number = -2;
    
	public constructor() {
    	super("GameBgSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        this.reset();
    }
    
    public render(){
        //this.sky.x += this.skySpeed;
        //this.sky0.x += this.skySpeed;
        //this.hill.x += this.hillSpeed;
        //this.hill0.x += this.hillSpeed;
        this.grass.x += this.grassSpeed;
        this.grass0.x += this.grassSpeed;
//        if(this.sky.x < -this.sky.width){
//            this.sky.x = this.sky0.x + this.sky0.width;
//        }else if(this.sky0.x < -this.sky0.width) {
//            this.sky0.x = this.sky.x + this.sky.width;
//        }
//        if(this.hill.x < -this.hill.width) {
//            this.hill.x = this.hill0.x + this.hill0.width;
//        }else if(this.hill0.x < -this.hill0.width) {
//            this.hill0.x = this.hill.x + this.hill.width;
//        }
        if(this.grass.x < -this.grass.width) {
            this.grass.x = this.grass0.x + this.grass0.width;
        } else if(this.grass0.x < -this.grass0.width) {
            this.grass0.x = this.grass.x + this.grass.width;
        }
    }
    
    public reset(){
        this.sky.x = 0;
        this.hill.x = 0;
        this.grass.x = 0;
        
        this.sky0.x = this.sky.width;
        this.hill0.x = this.hill.width;
        this.grass0.x = this.grass.width;
    }
}
