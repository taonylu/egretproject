/**
 *
 * @author 
 *  preload加载时的吃药动画
 */
class LoadingUI  extends eui.Component{
    private pill0: eui.Image;             //exml用于定位的image
    private pill1: eui.Image;
    private pill2: eui.Image;
    private eat0: eui.Image;
    
    private pillMC0: PillMC;             //loading动画，自定义mc
    private pillMC1: PillMC;
    private pillMC2: PillMC;
    private eatMC: EatMC;
    
	public constructor() {
        super();
        this.addEventListener(eui.UIEvent.CREATION_COMPLETE,this.initView,this);
        this.skinName = "resource/myskin/ui/LoadingUISkin.exml"; 
	}

    private initView(): void {
        this.removeEventListener(eui.UIEvent.CREATION_COMPLETE,this.initView,this);
        
        this.pillMC0 = new PillMC();
        this.pillMC0.x = this.pill0.x;
        this.pillMC0.y = this.pill0.y;
        this.addChild(this.pillMC0);
        this.removeChild(this.pill0);

        this.pillMC1 = new PillMC();
        this.pillMC1.x = this.pill1.x;
        this.pillMC1.y = this.pill1.y;
        this.addChild(this.pillMC1);
        this.removeChild(this.pill1);
        
        this.pillMC2 = new PillMC();
        this.pillMC2.x = this.pill2.x;
        this.pillMC2.y = this.pill2.y;
        this.addChild(this.pillMC2);
        this.removeChild(this.pill2);
        
        this.eatMC = new EatMC();
        this.eatMC.x = this.eat0.x;
        this.eatMC.y = this.eat0.y;
        this.addChild(this.eatMC);
        this.removeChild(this.eat0);
        this.eatMC.frameRate = 200;
        this.eatMC.play();
    }

    //根据Process设置动画
    private curProcess: number = 0;
    public setAnimByProcess(process:number): void {
        if(this.curProcess == process) {
            return;
        }
        this.curProcess = process;
        if(process > 0) {   //防止加载缓存时，process为0导致动画位置不正确
            this.eatMC.x -= 20;
        }
        
        switch(process) {
            case 1: 
                this.pillMC2.gotoAndStop(2);
                break;
            case 2:
                this.pillMC2.gotoAndStop(3);
                break;
            case 3:
                this.removeChild(this.pillMC2)
                break;
            case 4:
                this.pillMC1.gotoAndStop(2);
                break;
            case 5:
                this.pillMC1.gotoAndStop(3);
                break;
            case 6:
                this.removeChild(this.pillMC1);
                break;
            case 7:
                this.pillMC0.gotoAndStop(2);
                break;
            case 8:
                this.pillMC0.gotoAndStop(3);
                break;
            case 9:
                this.removeChild(this.pillMC0);
                break;
            case 10:
                this.eatMC.stop();
                break;
        }
    }
    
    //销毁
    private destory(): void {
        
    }
}






