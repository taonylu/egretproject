/**
 * 分数条
 * @author 
 *
 */
class ScoreBarUI extends egret.DisplayObjectContainer{
    public scoreBg: egret.Bitmap;      //分数背景
    private scoreBar: egret.Bitmap;    //分数条
    private scoreText: egret.TextField;//分数文本
    
    public zheScore: Array<number> = [];    //折扣分数
    public zheList: Array<number> = [];     //几折
    public zheUIList: Array<ZheUI> = [];    //折扣UI
    public curZhe: number = 0;              //当前折扣
    
	public constructor() {
        super();
        
        this.zheScore = GameConst.zheScore;
        this.zheList = GameConst.zheList;
        
        //分数背景
        this.scoreBg = new egret.Bitmap(RES.getRes("scorebg_png"));
        this.addChild(this.scoreBg);

        //分数条
        this.scoreBar = new egret.Bitmap(RES.getRes("scorebar_png"));
        this.scoreBar.x = this.scoreBg.x + 1;
        this.scoreBar.y = this.scoreBg.y + 1;
        this.addChild(this.scoreBar);
        
        //分数文本
        this.scoreText = new egret.TextField();
        this.scoreText.width = 70;
        this.scoreText.height = this.scoreBar.height;
        this.scoreText.textAlign = egret.HorizontalAlign.CENTER;
        this.scoreText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.scoreText.x = this.scoreBar.x;
        this.scoreText.y = this.scoreBar.y;
        this.addChild(this.scoreText);
        
        //折扣UI位置
        var len: number = this.zheList.length;
        for(var i: number = 0;i < len;i++) {
            var zheUI: ZheUI = new ZheUI();
            zheUI.setText(this.zheList[i] + "折");
            zheUI.anchorOffsetX = zheUI.width / 2;
            zheUI.x = this.scoreBg.x + (this.zheScore[i] / GameConst.totalScore) * this.scoreBar.width;
            zheUI.y = this.scoreBg.y + this.scoreBg.height;
            zheUI.setZhe(false);
            this.addChild(zheUI);
            this.zheUIList.push(zheUI);
        }
        
        this.setScore(0);
	}
	
    //设置分数
    public setScore(score: number): void {
        //分数文本
        this.scoreText.text = score.toString();
        
        //分数条
        var scale = score / GameConst.totalScore;
        if(scale > 1) {
            scale = 1;
        }
        this.scoreBar.scaleX = scale;
        
        //当前折扣
        var len: number = this.zheScore.length;
        var maxIndex: number = -1;
        for(var i: number = 0;i < len;i++) {
            if(score >= this.zheScore[i]) {
                maxIndex = i;
                this.curZhe = this.zheList[maxIndex];
            }
        }
        
        //折扣标签高亮
        if(maxIndex != -1) {
            for(i = 0;i < len;i++) {
                this.zheUIList[i].setZhe(false);
            }
            this.zheUIList[maxIndex].setZhe(true);
        }
        
    }
}








