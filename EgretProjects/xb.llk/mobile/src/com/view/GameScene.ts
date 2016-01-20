/**
 * 游戏场景
 * @author 
 *
 */
class GameScene extends BaseScene{
    
    //------------------[网络]------------------
    public socket: ClientSocket;

    //---------------[游戏UI]-----------------
    private skillResetBtn:eui.Image;  //技能按钮 打乱
    private skillIceBtn:eui.Image;  //冰冻
    private skillTipBtn:eui.Image;  //提示
    private skillIce:eui.Image;   //冰冻特效
    private skillLabel0:eui.Label;  //技能次数文本
    private skillLabel1:eui.Label;
    private skillLabel2:eui.Label;
    
    
    private blockPool: ObjectPool = ObjectPool.getPool(BlockUI.NAME,10); //方块对象池
    private boomPool: ObjectPool = ObjectPool.getPool(BoomUI.NAME,10);   //炸弹对象池
    private selectOld:SelectUI = new SelectUI(); //选择框动画，第一个对象
    private selectNew:SelectUI = new SelectUI(); //选择框动画，第二个对象
    
    private lineSuPool: ObjectPool = ObjectPool.getPool(LineSu.NAME,10);  //连线
    private lineZhePool: ObjectPool = ObjectPool.getPool(LineZhe.NAME,4);
    
    private resultGroup:eui.Group;     //结果Group
    private againBtn:eui.Image;        //再斗一次
    private rankLabel:eui.BitmapLabel; //排名文本
    private timeLabel:eui.Label;       //时间文本
    
    private progressBar:eui.Image;     //进度条
    private barStart:number = 0.15;    //进度条scaleX
    private barEnd:number = 1.45;
    
    private waitGroup:eui.Group;       //游戏结束，等待Group
    private waitLabel:eui.Label;       //等待显示字体
    
    //------------------[地图数据]--------------------
    private blockGroup: eui.Group;        //方块容器
    private blockNum: number = 0;         //当前关卡方块数量
    private blockData: Array<number> = new Array<number>();  //方块的类型数组，用于判断方块皮肤ID后缀数字,"block" + blockData[i]
    public tempMap: Array<any> = new Array<any>();          //临时地图，二维数组，存放本关的地图数据的拷贝
    private blockArr: Array<any> = new Array<any>();         //方块数组，二维数组，用于存放Block实例
    private rowMax: number = 10;      //地图最大行
    private colMax: number = 9;      //地图最大列
    private blockWidth: number = 60; //方块宽
    private blockHeight: number = 60;//方块高
    private mapStartY: number = 0;   //方块起始位置
    private mapStartX: number = 0;
    
    //------------------[游戏变量]--------------------
    private isSelect: Boolean = false;      //是否已经选择了一个方块
    private oldTarget: BlockUI;             //第一次点击的方块
    private newTarget: BlockUI;             //第二次点击的方块
    private curLevel: number = 1;           //当前关卡，1-3
    private cancelBlockNum:number = 0;      //已消除方块
    private totalBlock:number = 0;          //总方块
    
    
    //------------------[寻路数据]--------------------
    private minRoadPoint: number = 10000;               //路径数
    private route: Array<Object> = new Array<Object>(); //记录路径
    private _stage: egret.Stage;                        //舞台stage

	public constructor() {
        super("GameSceneSkin");
        
	}
	
    public componentCreated(): void {
        super.componentCreated();
        this.initView();  
    }

    public onEnable(): void { 
        this.startGame();
    }

    public onRemove(): void {
        
    }
    
    public reset(){
        this.resetGame();            //重置方块、寻路等
        this.deConfigListener();     //清理监听
        this.hideResult();           //隐藏结果面板
        MapManager.getInstance().level.length = 0; //清理地图
    }
    
    private startGame(): void {
        this.curLevel = 1;
        this.cancelBlockNum = 0;
        this.progressBar.scaleX = this.barStart;
        this.waitGroup.visible = false;
        this.totalBlock = MapManager.getInstance().getBlockNum();
        this.skillLabel0.text = "3";
        this.skillLabel1.text = "3";
        this.skillLabel2.text = "3";
        this.hideResult();
        this.createMap();
        this.configListener();
    }
    
    private resetGame(): void {
        //清理剩余方块
        for(var i: number = 0;i < this.rowMax;i++) {
            for(var j:number=0;j<this.colMax;j++){
                if(this.blockArr[i][j] != null) {
                    this.blockArr[i][j].hideImmediately();
                }
            }
            this.blockArr[i].length = 0;
        }
        
        //重置参数
        this.isSelect = false;
        this.oldTarget = null;
        this.newTarget = null;
        this.minRoadPoint = 10000;
        this.route.length = 0;
        this.blockNum = 0;
        this.blockData.length = 0;
        this.tempMap = null;
        //隐藏组件
        this.selectOld.hide();
        this.selectNew.hide();
    }
    
    //游戏结束
    private gameOver(): void { 
        console.log("game over");
        
    }
    
    //下一关
    public nextLevel(): void {
        this.curLevel++;
        this.resetGame();
        this.createMap();
        //无其他关卡
        if(MapManager.getInstance().level[this.curLevel - 1] == null) {
            this.waitGroup.visible = true;
            this.waitLabel.text = "您已完成游戏\n请等待其他玩家完成游戏"
        }
        
        this.configListener();
    }
    
    public configListener(){
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
        this.skillResetBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onResetTouch, this);
        this.skillIceBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onIceTouch,this);
        this.skillTipBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTipTouch,this);
    }
    
    public deConfigListener(){
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
        this.skillResetBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onResetTouch,this);
        this.skillIceBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onIceTouch,this);
        this.skillTipBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTipTouch,this);
    }
    
    //打乱对手
    private onResetTouch(){
        this.sendUserPro("disturb");
    }
    
    //冰冻对手
    private onIceTouch(){
        this.sendUserPro("ice");
    }
    
    //重排自己
    private onTipTouch(){
        this.sendUserPro("find");
    }
    
    ///////////////////////////////////////////////////
    ///-----------------[游戏UI]----------------------
    ///////////////////////////////////////////////////
    private initView(): void {
        this._stage = GameConst.stage;
        for(var i:number=0;i<this.rowMax;i++){
            this.blockArr.push(new Array<BlockUI>());
        }
        
    }
    
    //显示结果
    private showResult(data){
        var rank:number = data.rank;   //排名
        var spend:number = data.spend; //花费时间
        
        this.addChild(this.resultGroup);
        this.rankLabel.text = rank.toString();
        if(spend > 0){
            var min:number = Math.floor(spend/1000/60);
            var sec:number = Math.floor(spend/1000%60);
            this.timeLabel.text = min + ":" + sec;
        }else{
            this.timeLabel.text = "0";
        }
        
        this.againBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAgainBtnTouch, this);
    }
    
    //点击再斗一次按钮
    private onAgainBtnTouch(){
        this.reset();
        LayerManager.getInstance().runScene(GameManager.getInstance().homeScene);
    }
    
    //隐藏结果
    private hideResult(){
        this.againBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onAgainBtnTouch,this);
        this.resultGroup.parent && this.resultGroup.parent.removeChild(this.resultGroup);
        
    }
    
    
    
    ///////////////////////////////////////////////////
    ///-----------------[游戏逻辑]----------------------
    ///////////////////////////////////////////////////
    
    //创建地图
    private createMap(): void {
        //引用原始地图的数据
        var mapData = MapManager.getInstance().level[this.curLevel-1]; //关卡1-3，数组下标0-2
        
        if(mapData == null){
            return;
        }
        
        this.tempMap = ArrayTool.copy2DArr(mapData);
       
        
        //创建方块
        var index: number = 0; //已经生成的方块数
        for(var i = 0;i < this.rowMax;i++) {
            for(var j = 0;j < this.colMax;j++) {
                if(this.tempMap[i][j] > 0) {
                    var block: BlockUI = this.blockPool.getObject();
                    block.setSkin(this.tempMap[i][j]);
                    block.row = i;
                    block.col = j;
                    block.x = this.mapStartX + j * (this.blockWidth);
                    block.y = this.mapStartY + i * (this.blockHeight) - this._stage.stageHeight;
                    this.blockGroup.addChild(block);
                    this.blockArr[block.row][block.col] = block;
                    egret.Tween.get(block).to({ y: (this.mapStartY + i * (this.blockHeight)) },500);
                    index++;
                }
            }
        }
    }
    
    //点击方块
    private onTouchTap(e: egret.TouchEvent): void {
        if(e.target instanceof BlockUI) {
            //消除方块时，不能进行点击
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
            this.checkBlock(e.target);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
        }
    }
    
    //检查方块是否相连
    private checkBlock(block: BlockUI): void {
        if(this.isSelect) {
            //记录老对象
            this.oldTarget = this.newTarget;
            this.selectOld.play(this.oldTarget);
        }
        //记录新对象;
        this.newTarget = block;
        this.selectNew.play(this.newTarget);
        if(this.isSelect) {
            //两次点击不是同一个方块，且他们是同一类型的图片便可开始扫描是否通路
            if(this.newTarget != this.oldTarget && this.newTarget.skinID == this.oldTarget.skinID) {
                //通路检查
                if(this.checkRoad(this.oldTarget,this.newTarget)) {
                    //画线
                    this.linkRoad();
                    //爆炸效果
                    var boom1: BoomUI = this.boomPool.getObject();
                    var boom2: BoomUI = this.boomPool.getObject();
                    this.addChild(boom1);
                    this.addChild(boom2);
                    boom1.play(this.newTarget);
                    boom2.play(this.oldTarget);
                    //发送消除信息
                    this.sendEliminate(this.oldTarget, this.newTarget);
                    //两方块的消失
                    this.oldTarget.hide();
                    this.newTarget.hide();
                    this.tempMap[this.oldTarget.row][this.oldTarget.col] = 0;
                    this.tempMap[this.newTarget.row][this.newTarget.col] = 0;
                    this.blockArr[this.oldTarget.row][this.oldTarget.col] = null;
                    this.blockArr[this.newTarget.row][this.newTarget.col] = null;
                    this.oldTarget = this.newTarget = null;
                    //声音
                    //得分
                    this.cancelBlockNum += 2;
                    // 当前长度 = 初始长度 + 已消除方块数/总方块数*(最长长度-初始长度)
                    this.progressBar.scaleX = this.barStart + this.cancelBlockNum/this.totalBlock*(this.barEnd - this.barStart);
                    //隐藏选择框
                    this.selectOld.hide();
                    this.selectNew.hide();
                    this.isSelect = false;

                    //检查游戏是否结束
                    if(this.checkGameOver()) {
                       this.nextLevel();
                       return;
                    }
                    
                    //检查地图上是否有能相连的方块，如果没有，则重新排列
                    if(this.bangzhu() == false){
                        console.log("重排前数组:",this.tempMap);
                        this.sortBlock();
                        this.sendUpMap();
                    }
                    return;
                    //两个相同类型方块不能相连，则取消选择
                } else {
                    this.oldTarget = null;
                    this.newTarget = null;
                    this.selectOld.hide();
                    this.selectNew.hide();
                    this.isSelect = false;
                    return;
                }
                //点击的两个方块非相同类型，则取消第一个选择方块
            } else {
                this.selectOld.hide();
                var temp: SelectUI = this.selectOld;
                this.selectOld = this.selectNew;
                this.selectNew = temp;
                return;
            }
        }
        this.isSelect = true;
    }
        
    //直线、一折、二折、综合检查函数
    private checkRoad(oldTarget: BlockUI,newTarget: BlockUI): Boolean {
        var r1: number = oldTarget.row;
        var c1: number = oldTarget.col;
        var r2: number = newTarget.row;
        var c2: number = newTarget.col;
        var result: Boolean = false;
        //两者处于同一行
        if(r1 == r2) {
            //直线扫描
            if(this.lineCheck(r1,c1,r2,c2)) {
                //直线是最短路径不需要计算直接传给路径数组
                this.saveLinePath(r1,c1,r2,c2);
                return true;
            }
            //同一行两折点扫描
            for(var i: number = 0;i < this.rowMax;i++) {
                //两者上或下同时为0垂直扫描3条线
                if(this.tempMap[i][c1] == 0 && this.tempMap[i][c2] == 0) {
                    if(this.lineCheck(r1,c1,i,c1) && this.lineCheck(i,c1,i,c2) && this.lineCheck(i,c2,r2,c2)) {
                        //this.route.push({x:c1,y:r1},{x:c1,y:i},{x:c2,y:i},{x:c2,y:r2});
                        //两折点需要计算出最短路径
                        this.theShortest(r1,c1,i,c1,i,c2,r2,c2);
                        result = true;
                    }
                }
            }
        }
        else if(c1 == c2) {
            //两者处于同一列
            if(this.lineCheck(r1,c1,r2,c2)) {
                //直线是最短路径不需要计算直接传给路径数组
                //this.route.push({ x: c1,y: r1 },{ x: c2,y: r2 });
                this.saveLinePath(r1,c1,r2,c2);
                return true;
            }
            //同一列两折点扫描
            for(i = 0;i < this.colMax;i++) {
                //两者前或后同时为0横向扫描3条线
                if(this.tempMap[r1][i] == 0 && this.tempMap[r2][i] == 0) {
                    if(this.lineCheck(r1,c1,r1,i) && this.lineCheck(r1,i,r2,i) && this.lineCheck(r2,i,r2,c2)) {
                        //this.route.push({x:c1,y:r1},{x:i,y:r1},{x:i,y:r2},{x:c2,y:r2});
                        //两折点需要计算出最短路径
                        this.theShortest(r1,c1,r1,i,r2,i,r2,c2);
                        result = true;
                    }
                }
            }
        }
        else {
            //不在同一行也不在同一列拐角处必须为0
            //第二个对象那一行第一个对象那一列拐角扫描
            if(this.tempMap[r2][c1] == 0) {
                if(this.lineCheck(r1,c1,r2,c1) && this.lineCheck(r2,c1,r2,c2)) {
                    //一折拐角没有最短路径直接传给数组不需要计算
                    //this.route.push({ x: c1,y: r1 },{ x: c1,y: r2 },{ x: c2,y: r2 });
                    this.saveLinePath(r1,c1,r2,c1);
                    this.route.pop();
                    this.saveLinePath(r2,c1,r2,c2);
                    return true;
                }
            }
            //第一个对象那一行第二个对象那一列拐角扫描
            if(this.tempMap[r1][c2] == 0) {
                if(this.lineCheck(r1,c1,r1,c2) && this.lineCheck(r2,c2,r1,c2)) {
                    //一折拐角没有最短路径直接传给数组不需要计算
                    //this.route.push({ x: c1,y: r1 },{ x: c2,y: r1 },{ x: c2,y: r2 });
                    this.saveLinePath(r1,c1,r1,c2);
                    this.route.pop();
                    this.saveLinePath(r1,c2,r2,c2);
                    return true;
                }
            }
            //两折点综合扫描
            //横向扫描
            for(i = 0;i < this.colMax;i++) {
                //两者前或后同时为0横向扫描3条线
                if(this.tempMap[r1][i] == 0 && this.tempMap[r2][i] == 0) {
                    if(this.lineCheck(r1,c1,r1,i) && this.lineCheck(r1,i,r2,i) && this.lineCheck(r2,i,r2,c2)) {
                        //this.route.push({x:c1,y:r1},{x:i,y:r1},{x:i,y:r2},{x:c2,y:r2});
                        //两折点需要计算出最短路径
                        this.theShortest(r1,c1,r1,i,r2,i,r2,c2);
                        result = true;
                    }
                }
            }
            //垂直扫描
            for(i = 0;i < this.rowMax;i++) {
                //两者上或下同时为0垂直扫描3条线
                if(this.tempMap[i][c1] == 0 && this.tempMap[i][c2] == 0) {
                    if(this.lineCheck(r1,c1,i,c1) && this.lineCheck(i,c1,i,c2) && this.lineCheck(i,c2,r2,c2)) {
                        //this.route.push({x:c1,y:r1},{x:c1,y:i},{x:c2,y:i},{x:c2,y:r2});
                        //两折点需要计算出最短路径
                        this.theShortest(r1,c1,i,c1,i,c2,r2,c2);
                        result = true;
                    }
                }
            }
        }
        return result;
    }
        
    //直线检查函数
    private lineCheck(r1: number,c1: number,r2: number,c2: number): Boolean {
        //两者处于同一行
        if(r1 == r2) {
            //前者大于后者就交换位置
            if(c1 > c2) {
                var t: number = c1;
                c1 = c2;
                c2 = t;
            }
            //两者相邻就直接消除
            if(c1 + 1 == c2) {
                return true;
            }
            //不相邻就搜索两者之间是否通路不对自身进行搜索
            for(var i: number = c1 + 1;i < c2;i++) {
                if(this.tempMap[r1][i] > 0) {
                    return false;
                }
            }
            return true;
        }
        else if(c1 == c2) {
            //两者处于同一列
            //前者大于后者就交换位置
            if(r1 > r2) {
                t = r1;
                r1 = r2;
                r2 = t;
            }
            //两者相邻就直接消除
            if(r1 + 1 == r2) {
                return true;
            }
            //不相邻就搜索两者之间是否通路不对自身进行搜索
            for(i = r1 + 1;i < r2;i++) {
                if(this.tempMap[i][c1] > 0) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }
    
    //保存直线数组数组
    private saveLinePath(r1,c1,r2,c2){
        if(r1 == r2){ //同行
            if(c1>c2){
                for(var i: number = c1;i >= c2;i--) {
                    this.route.push({ x: i,y: r1 });
                }
            }else{
                for(var i: number = c1;i <= c2;i++) {
                    this.route.push({ x: i,y: r1 });
                }
            }
            
        }else if(c1 == c2){
            if(r1 > r2){
                for(var i: number = r1;i >= r2;i--) {
                    this.route.push({ x: c1,y: i });
                }
            }else{
                for(var i: number = r1;i <= r2;i++) {
                    this.route.push({ x: c1,y: i });
                }
            }
            
        } 
    }
        
    //画线函数
    private linkRoad(): void {
        //挨个对比
        var len: number = this.route.length - 1; //倒数第1个不需要判断
        var lineList: Array<BaseLine> = new Array<BaseLine>();
        for(var i: number = 0;i < len;i++) {   
            //每次取出前两个
            var obj1: Object = this.route[i];
            var obj2: Object = this.route[i + 1];
            if(i + 2 <= len) { //如果取出的前两个后面还有1个，则取出用于判断折
                var obj3: Object = this.route[i + 2];
                var c3: number = obj3["x"];
                var r3: number = obj3["y"];
            }

            if(i + 1 == len) {
                break;
            }

            var c1: number = obj1["x"];
            var r1: number = obj1["y"];
            var c2: number = obj2["x"];
            var r2: number = obj2["y"];


            if(c1 == c2 && (obj3 == null || c2 == c3)) {  //同列
                var lineSu: LineSu = this.lineSuPool.getObject();
                lineSu.rotation = 0;
                lineSu.x = c2 * this.blockWidth + this.blockWidth / 2;
                lineSu.y = r2 * this.blockHeight + this.blockHeight / 2;
                lineList.push(lineSu);
                this.blockGroup.addChild(lineSu);
              
            } else if(r1 == r2 && (obj3 == null || r2 == r3)) {  //同行
                var lineSu: LineSu = this.lineSuPool.getObject();
                lineSu.rotation = 90;
                lineSu.x = c2 * this.blockWidth + this.blockWidth / 2; 
                lineSu.y = r2 * this.blockHeight + this.blockHeight / 2;
                lineList.push(lineSu);
                this.blockGroup.addChild(lineSu);
               
            } else if(obj3) { //折线
                var lineZhe: LineZhe = this.lineZhePool.getObject();
                lineZhe.x = c2 * this.blockWidth + this.blockWidth / 2;
                lineZhe.y = r2 * this.blockHeight + this.blockHeight / 2;
                this.blockGroup.addChild(lineZhe);
                lineList.push(lineZhe);
                if((c1 == c2 && r2 > r1 && r2 == r3 && c3 > c2) || (r1 == r2 && c1 > c2 && c2 == c3 && r3 < r2)) {  // L型
                    lineZhe.rotation = 0;
                 
                } else if((c1 == c2 && r2 < r1 && r2 == r3 && c3 > c2) || (r1 == r2 && c1 > c2 && c2 == c3 && r3 > r2)) {   //|-型
                    lineZhe.rotation = 90;
                  
                } else if((r1 == r2 && c2 > c1 && c2 == c3 && r3 > r2) || (c1 == c2 && r1 > r2 && r2 == r3 && c3 < c2)) {  //-|型
                    lineZhe.rotation = 180;
                
                } else {   //_|型
                    lineZhe.rotation = 270;
                  
                }
            }

        }
        //画完线清空路径数组
        this.route.length = 0;
        this.minRoadPoint = 10000;
        var len: number = lineList.length;
        for(var i: number = 0;i < len;i++) {
            lineList[i].recycle();
        }


    }
        
    //计算出最短的线路
    private theShortest(r1: number,c1: number,r2: number,c2: number,r3: number,c3: number,r4: number,c4: number): void {
        //越靠近下或右的值越大，越大的值只要不超过自身取绝对值越小
        var count: number = 0;
        count = Math.abs(r2 - r1) + Math.abs(r3 - r2) + Math.abs(r4 - r3) + Math.abs(c2 - c1) + Math.abs(c3 - c2) + Math.abs(c4 - c3);
        //当前数小于上一次的数就把当前的值赋给路径数组,如果大于就不去管它了我们只需要最短路径点即可。
        if(count <= this.minRoadPoint) {
//            this.route[0] = { x: c1,y: r1 };
//            this.route[1] = { x: c2,y: r2 };
//            this.route[2] = { x: c3,y: r3 };
//            this.route[3] = { x: c4,y: r4 };
               this.route.length = 0;
               this.saveLinePath(r1,c1,r2,c2);
               this.route.pop();
               this.saveLinePath(r2,c2,r3,c3);
               this.route.pop();
               this.saveLinePath(r3,c3,r4,c4);
            //上一次的数等于当前的数以便下一次计算
            this.minRoadPoint = count;
        }
    }
        
    //点击重新排列
    public sortBlock(): void { 
        //获取现存的方块
        var tempBlockArr:Array<BlockUI> = new Array<BlockUI>();
        var block:BlockUI;
        for(var i: number = 0;i < this.rowMax;i++) {
            for(var j: number = 0;j < this.colMax;j++) {
                block = this.blockArr[i][j];
                if(block != null) {
                    tempBlockArr.push(block);
                }
            }
        }
        //打乱顺序
        ArrayTool.randomArr(tempBlockArr);
        //交换皮肤和tempMap
        var len:number = tempBlockArr.length/2;
        var blockA:BlockUI;
        var blockB:BlockUI;
        for(var i: number = 0;i < len;i+=2) {
             blockA = tempBlockArr[i];
             blockB = tempBlockArr[i+1];
             var temp = blockA.skinID;
             blockA.setSkin(blockB.skinID);
             blockB.setSkin(temp);
             
             temp = this.tempMap[blockA.row][blockA.col];
             this.tempMap[blockA.row][blockA.col] = this.tempMap[blockB.row][blockB.col];
             this.tempMap[blockB.row][blockB.col] = temp;
        }
    }
    
    //检查方块是否消除完毕
    public checkGameOver(): Boolean {
        for(var i: number = 0;i < this.rowMax;i++) {
            for(var j: number = 0;j < this.colMax;j++) {
                if(this.tempMap[i][j] > 0) {
                    return false;
                }
            }
        }
        return true;
    }
    
    //点击提示
    public tishi() {
        this.oldTarget && this.selectOld.hide();
        this.newTarget && this.selectNew.hide();
        this.oldTarget = null;
        this.newTarget = null;
        this.isSelect = false;
        if(this.bangzhu()) {
            egret.log("提示方块:" , this.oldTarget.row, this.oldTarget.col, this.newTarget.row, this.newTarget.col);
            this.selectOld.play(this.oldTarget);
            this.selectNew.play(this.newTarget);
      
        }
    }
    
    //帮助找到两个通路的方块
    public bangzhu(): boolean {
   
        for(var i: number = 0;i < this.rowMax;i++) {   //i,j当前方块行列
            for(var j: number = 0;j < this.colMax;j++) {
                if(this.tempMap[i][j] > 0) {
                    //每一个方块遍历每一个元素
                    for(var m: number = i;m < this.rowMax;m++) {  //m,n检测的方块行列
                        var n: number;
                        if(m == i) {   //m=i，同一行，则检查的是自己，所以列+1
                            n = j + 1;
                        }
                        else {
                            n = 0;
                        }
                        for(;n < this.colMax;n++) {
                            if(this.tempMap[m][n] > 0) {
                                var obj1: BlockUI = this.blockArr[i][j];
                                var obj2: BlockUI = this.blockArr[m][n];
                                //检查两者是否通路
                                if(obj1.skinID == obj2.skinID) {
                                    if(this.checkRoad(obj1,obj2)) {
                                        //只提示两个方块不记录线路
                                        this.route.length = 0;
                                        this.minRoadPoint = 10000;
                                        this.oldTarget = obj1;
                                        this.newTarget = obj2;
                                        return true;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return false;
    }
    
    ///////////////////////////////////////////////////
    ///-----------------[网络处理]----------------------
    ///////////////////////////////////////////////////
    
    //--------------------[发送]----------------------
    
    //发送弹幕
    public sendBarrage(msg:string): void {
        var json = {"msg":msg};
        this.socket.sendMessage(NetConst.C2S_barrage,json);
    }
    
    //发送地图
    public sendUpMap(): void {
        egret.log("无可消除，发送重排");
        var json = { "mapData":this.tempMap};
        this.socket.sendMessage(NetConst.C2S_upMap,json);
    }
    
    //发送消除，pos是二维数组
    public sendEliminate(blockA:BlockUI, blockB:BlockUI): void {
            var json = { "pos": [[blockA.row,blockA.col],[blockB.row,blockB.col]] };
            this.socket.sendMessage(NetConst.C2S_eliminate,json);
            
    }
    
    //发送用户使用道具
    public sendUserPro(type: string) {
        var json = {"type": type};
        egret.log("使用道具:" + type);
        this.socket.sendMessage(NetConst.C2S_usePro,json, this.CB_userPro, this);
        
        switch(type){
            case "disturb":   //打乱，暂停当前操作，并重置地图
                var num:number = parseInt(this.skillLabel0.text);
                num--;
                num = num>0?num:0;
                this.skillLabel0.text = num.toString();
                break;
            case "ice":   //冻结，暂停当前操作，直到冰冻时间结束。可能有多个冰冻连续施放，需要重置冰冻时间。
                var num: number = parseInt(this.skillLabel1.text);
                num--;
                num = num > 0 ? num : 0;
                this.skillLabel1.text = num.toString();
                break;
            case "find":   //提示
                var num: number = parseInt(this.skillLabel2.text);
                num--;
                num = num > 0 ? num : 0;
                this.skillLabel2.text = num.toString();
                break;
        }
        
    }
    
    //发送道具回调函数
    private CB_userPro(data){
        var bSuccess: Boolean = data.bSuccess;
        var chance:number = data.chance;
        egret.log("使用道具回调:",bSuccess,chance);
    }
    
    //--------------------[接收]----------------------
    
    //游戏结束
    public revGameOver(data): void {
        var rank: number = data.rank;  //前三名玩家ID
        egret.log("游戏结束，排名" + rank);
        this.showResult(data);
    }

    //玩家被使用道具
    public revPro(data): void {
        var type: string = data.type;  //道具类型
        var mapData = data.mapData;    //道具使用后影响的位置
        var time:number = data.time;   //ice时间
        
        egret.log("被使用道具:",type, time);
        console.log("被使用道具:",mapData);
        
        switch(type){
            case "disturb":   //打乱，暂停当前操作，并重置地图
                this.deConfigListener();
                MapManager.getInstance().level[this.curLevel - 1] = mapData;
                this.resetGame();
                this.createMap();
                this.configListener();
            break;
            case "ice":   //冻结，暂停当前操作，直到冰冻时间结束。可能有多个冰冻连续施放，需要重置冰冻时间。
                this.deConfigListener();
                this.skillIce.visible = true;
                this.blockGroup.addChild(this.skillIce);
                var self:GameScene = this;
                egret.Tween.removeTweens(this.skillIce);
                egret.Tween.get(this.skillIce).wait(time).call(function(){
                    self.skillIce.parent && self.skillIce.parent.removeChild(self.skillIce);
                    self.configListener();
                });
            break;
            case "find":   //提示
                this.tishi();
            break;
        }
    }
    
    
    
    
    
    


    
    
}









