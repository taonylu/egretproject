/**
 * 场景D
 * @author 
 *
 */
class SceneD extends BaseScene {
    private starGroup: eui.Group;
    private imgGroup:eui.Group;
    private imgList = [];
    private star0:eui.Image;
    private star1:eui.Image;
    private arrow:eui.Image;
    private arrowPos:number;
    private title:eui.Image;
    private titlePos:number;

    public constructor() {
        super();
        this.skinName = "SceneDSkin"
    }

    public onCreated(): void {
        for(var i=0;i<6;i++){
            this.imgList.push(this.imgGroup.getChildAt(i));
        }
        this.arrowPos = this.arrow.y;
        this.titlePos = this.title.y;
        this.title.y = 0;
    }

    public onEnable(): void {
       
    }

    public onRemove(): void {
        
    }
    
    public startAnim(){
        this.validateNow();
        this.playTitleAnim();
        this.playStarAnim();
        this.playFireWork();
        this.playImgAnim();
        this.playArrow();
        this.isAnimDone = true;
    }
    
    public stopAnim(){
        egret.Tween.removeAllTweens();
    }
    
    private playTitleAnim(){
        this.title.y = 0;
        egret.Tween.get(this.title).to({y:this.titlePos},500);
    }
    
    private playStarAnim() {
        this.starGroup.alpha = 1;
        egret.Tween.get(this.starGroup,{ loop: true }).to({ alpha: 0 },500).to({ alpha: 1 },500);
    }
    
    private playFireWork(){
        egret.Tween.get(this.star0).wait(500).to({alpha:0.,scaleX:5,scaleY:5,x:(this.star0.x - 100)},2000);
        egret.Tween.get(this.star1).wait(500).to({ alpha: 0,scaleX: 5,scaleY: 5,x: (this.star1.x + 100) },2000);
    }
    
    private playImgAnim(){
        var len = this.imgList.length;
        for(var i=0;i<len;i++){
            this.imgList[i].scaleX = 0;
            this.imgList[i].scaleY = 0;
        }
        var time:number = 500;
        egret.Tween.get(this.imgList[0]).wait(time).to({scaleX:1,scaleY:1},time,egret.Ease.bounceOut);
        egret.Tween.get(this.imgList[1]).wait(time*2).to({ scaleX: 1,scaleY: 1 },time,egret.Ease.bounceOut);
        egret.Tween.get(this.imgList[2]).wait(time*3).to({ scaleX: 1,scaleY: 1 },time,egret.Ease.bounceOut);
        egret.Tween.get(this.imgList[3]).wait(time*4).to({ scaleX: 1,scaleY: 1 },time,egret.Ease.bounceOut);
        egret.Tween.get(this.imgList[4]).wait(time*5).to({ scaleX: 1,scaleY: 1 },time,egret.Ease.bounceOut);
        egret.Tween.get(this.imgList[5]).wait(time*6).to({ scaleX: 1,scaleY: 1 },time,egret.Ease.bounceOut);
    }
    
    private playArrow(){
        this.arrow.y = this.arrowPos;
        egret.Tween.get(this.arrow,{loop:true}).to({y:this.arrowPos-10},300).to({y:this.arrowPos},300);
    }

}










