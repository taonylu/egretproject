/**
*  功    能：游戏场景
*  内    容： 
*  作    者：羊力大仙
*  生成日期：2015/10/23
*  修改日期：
*  修改日志：
*/
class GameScene extends BaseScene{
    
    //------------------[游戏UI]--------------------
    private scoreLabel: eui.Label;  //分数文本
    private tempScore: number;      //分数缓存
    
    //------------------[游戏对象]--------------------
    private gameGroup: eui.Group = new eui.Group();               //游戏容器
    private lineSprite: egret.Sprite = new egret.Sprite();        //划线容器
    private gameWinUI: GameWinUI = new GameWinUI();               //游戏胜利面板
    private rankUI: RankUI = new RankUI();                        //排行榜面板
    private blockPool: ObjectPool = ObjectPool.getPool(BlockUI.NAME,10); //方块对象池
    private boomPool: ObjectPool = ObjectPool.getPool(BoomUI.NAME,10);   //炸弹对象池
    private selectOld: SelectUI = new SelectUI(); //选择框动画，第一个对象
    private selectNew: SelectUI = new SelectUI(); //选择框动画，第二个对象
    
    //------------------[地图数据]--------------------
    private blockTypeNum:number = 10;    //方块的数量种类
    private blockNum:number=0;           //当前关卡方块数量
    private blockData:Array<number> = new Array<number>();  //方块的类型数组，用于判断方块皮肤
    private tempMap:Array<any> = new Array<any>();          //临时地图，存放本关的地图数据的拷贝
    private blockArr: Array<BlockUI> = new Array<BlockUI>();//方块数组，用于存放Block实例
    private rowMax: number = 6;      //地图最大行
    private colMax: number = 7;      //地图最大列
    private blockWidth: number = 74; //方块宽
    private blockHeight: number = 80;//方块高
    
    //------------------[游戏状态]--------------------
    private isSelect:Boolean = false;      //是否已经选择了一个方块
    private oldTarget: BlockUI;            //第一次点击的方块
    private newTarget: BlockUI;            //第二次点击的方块
    private score: number = 0;             //得分
    public curLevel: number = 0;        //当前关卡
    
    //------------------[寻路数据]--------------------
    private minRoadPoint:number = 10000;   //路径数
    private route:Array<Object> = new Array<Object>(); //记录路径

    
	public constructor() {
        super();
        this.skinName = "resource/myskins/GameSceneSkin.exml";
	}
	
    public componentCreated(): void {
        super.componentCreated();
        this.onEnable();
        this.initView();
    }

    public onEnable(): void {
        this.setScoreLabel(0);
        this.configListeners();
    }
    
    public onRemove(): void {
        this.deConfigListeners();
    }
    
    private initView(): void {
        this.gameGroup.touchEnabled = true;
        this.gameGroup.touchChildren = true;
        
        this.gameGroup.addChild(this.lineSprite);
        this.lineSprite.touchChildren = false;
        this.lineSprite.touchEnabled = false;
        this.lineSprite.width = this.gameGroup.width;
        this.lineSprite.height = this.gameGroup.height;
    }
    
    private configListeners(): void {
        
    }
    
    private deConfigListeners(): void {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
    }
    
    private setScoreLabel(score:number): void {
        this.tempScore = score;
        this.score = score;
        if(this.inited) {
            this.scoreLabel.text = this.tempScore.toString();
        }
    }
    
    //显示排行榜
    public showRank(json): void {
        this.gameWinUI.hide();
        this.rankUI.show(this);
        this.rankUI.rank(json);
    }
    
    public starGame(levelNum:number): void {
        console.log("start level:" + levelNum);
        this.resetGame();
        this.setScoreLabel(0);
        this.curLevel = levelNum;
        //引用原始地图的数据
        this.tempMap = MapManager.getInstance()["level" + levelNum];
        
        if(this.tempMap == null) {
            this.quitGame();
            return;
        }
        
         this.tempMap =  ArrayTool.copy2DArr(this.tempMap);
         
        //获得当前地图的方块数量
        for (var i:number = 0; i<this.rowMax; i++)
        {
            for (var j:number = 0; j<this.colMax; j++)
            {
                if (this.tempMap[i][j] > 0)
                {
                    this.blockNum++;
                }
            }
        }
        
        //根据方块数量创建编号
        this.initBlockData(this.blockNum);
        //地图有了、方块数量有了、方块编号有了,接下来创建方块;
        var index:number = 0;
        for (var i=0; i<this.rowMax; i++)
        {
            for (var j = 0; j<this.colMax; j++)
            {
                if (this.tempMap[i][j] > 0)
                {
                    var block:BlockUI = this.blockPool.getObject();
                    block.setSkin(this.blockData[index]);
                    block.type = this.blockData[index];
                    block.row = i;
                    block.col = j;
                    block.name = i + "_" + j;
                    block.x = j*(this.blockWidth+1);
                    block.y = i*(this.blockHeight+1);
                    block.index = index;
                    this.gameGroup.addChild(block);
                    this.blockArr.push(block);
                    index++;
                }
            }
        }                 
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
    }
    
    public quitGame(): void {
        this.resetGame();
        LayerManager.getInstance().runScene(GameManager.getInstance().levelScene);
    }
    
    //初始化方块数据
    public initBlockData(blockNum:number):void {
        //方块数量除以2只创建一半编号另一半是相同的。
        for (var i:number = 0; i < blockNum/2; i++)
        {
            var date:number = NumberTool.getRandomInt(1,this.blockTypeNum);
            this.blockData.push(date,date);  
        }
        //随机排序数组
        ArrayTool.randomArr(this.blockData);
    }
    
    //点击
    private onTouchTap(e:egret.TouchEvent): void {   
        if(e.target instanceof BlockUI) {
            this.checkBlock(e.target);
        }
    }
        
    //检查方块是否相连
    private checkBlock(block:BlockUI): void {
        if (this.isSelect)
        {
            //记录老对象
            this.oldTarget = this.newTarget;
            this.selectOld.play(this.oldTarget);
        }
        //记录新对象;
        this.newTarget = block;
        this.selectNew.play(this.newTarget);
        if (this.isSelect)
        {
            //两次点击不是同一个方块，且他们是同一类型的图片便可开始扫描是否通路
            if(this.newTarget != this.oldTarget && this.newTarget.type == this.oldTarget.type) {
                //通路检查
                if(this.checkRoad(this.oldTarget,this.newTarget)) {
                    //画线
                    this.linkRoad();
                    //爆炸效果
                    var boom1: BoomUI = this.boomPool.getObject();
                    var boom2: BoomUI = this.boomPool.getObject();
                    this.gameGroup.addChild(boom1);
                    this.gameGroup.addChild(boom2);
                    boom1.play(this.newTarget);
                    boom2.play(this.oldTarget);
                    //两方块的消失
                    this.oldTarget.hide();
                    this.newTarget.hide();
                    this.tempMap[this.oldTarget.row][this.oldTarget.col] = 0;
                    this.tempMap[this.newTarget.row][this.newTarget.col] = 0;
                    this.blockArr[this.oldTarget.index] = null;
                    this.blockArr[this.newTarget.index] = null;
                    this.oldTarget = this.newTarget = null;
                    //声音
                    //得分
                    this.setScoreLabel(this.score += 20);
                    //隐藏选择框
                    this.selectOld.hide();
                    this.selectNew.hide();
                    this.isSelect = false;
                    
                    //检查游戏是否结束
                    if(this.checkGameOver())
                    {
                        this.gameWin();
                    }
                    return;
                //两个相同类型方块不能相连，则取消选择
                }else{
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
    private checkRoad(oldTarget:BlockUI,newTarget:BlockUI):Boolean
    {
        console.log("checkRoad...");
        var r1:number = oldTarget.row;
        var c1:number = oldTarget.col;
        var r2:number = newTarget.row;
        var c2:number = newTarget.col;
        var result:Boolean=false;
        //两者处于同一行
        if (r1 == r2)
        {
            //直线扫描
            if (this.lineCheck(r1,c1,r2,c2))
            {
                //直线是最短路径不需要计算直接传给路径数组
                this.route.push({x:c1,y:r1},{x:c2,y:r2});
                return true;
            }
            //同一行两折点扫描
            for(var i:number = 0; i< this.rowMax;i++)
            {
                //两者上或下同时为0垂直扫描3条线
                if(this.tempMap[i][c1]==0&&this.tempMap[i][c2]==0)
                {
                    if(this.lineCheck(r1,c1,i,c1)&&this.lineCheck(i,c1,i,c2)&&this.lineCheck(i,c2,r2,c2))
                    {
                        //route.push({x:c1,y:r1},{x:c1,y:i},{x:c2,y:i},{x:c2,y:r2});
                        //两折点需要计算出最短路径
                        this.theShortest(r1,c1,i,c1,i,c2,r2,c2);
                        result =  true;
                    }
                }
            }
        }
        else if (c1 == c2)
        {
            //两者处于同一列
            if (this.lineCheck(r1,c1,r2,c2))
            {
                //直线是最短路径不需要计算直接传给路径数组
                this.route.push({x:c1,y:r1},{x:c2,y:r2});
                return true;
            }
            //同一列两折点扫描
            for(i = 0; i< this.colMax;i++)
            {
                //两者前或后同时为0横向扫描3条线
                if(this.tempMap[r1][i]==0&&this.tempMap[r2][i]==0)
                {
                    if(this.lineCheck(r1,c1,r1,i)&&this.lineCheck(r1,i,r2,i)&&this.lineCheck(r2,i,r2,c2))
                    {
                        //route.push({x:c1,y:r1},{x:i,y:r1},{x:i,y:r2},{x:c2,y:r2});
                        //两折点需要计算出最短路径
                        this.theShortest(r1,c1,r1,i,r2,i,r2,c2);
                        result =  true;
                    }
                }
            }
        }
        else
        {
            //不在同一行也不在同一列拐角处必须为0
            //第二个对象那一行第一个对象那一列拐角扫描
            if(this.tempMap[r2][c1]==0)
            {
                if(this.lineCheck(r1,c1,r2,c1)&&this.lineCheck(r2,c1,r2,c2))
                {
                    //一折拐角没有最短路径直接传给数组不需要计算
                    this.route.push({x:c1,y:r1},{x:c1,y:r2},{x:c2,y:r2});
                    return true;
                }
            }
            //第一个对象那一行第二个对象那一列拐角扫描
            if(this.tempMap[r1][c2]==0)
            {
                if(this.lineCheck(r1,c1,r1,c2)&&this.lineCheck(r2,c2,r1,c2))
                {
                    //一折拐角没有最短路径直接传给数组不需要计算
                    this.route.push({x:c1,y:r1},{x:c2,y:r1},{x:c2,y:r2});
                    return true;
                }
            }
            //两折点综合扫描
            //横向扫描
            for(i = 0; i< this.colMax;i++)
            {
                //两者前或后同时为0横向扫描3条线
                if(this.tempMap[r1][i]==0&&this.tempMap[r2][i]==0)
                {
                    if(this.lineCheck(r1,c1,r1,i)&&this.lineCheck(r1,i,r2,i)&&this.lineCheck(r2,i,r2,c2))
                    {
                        //route.push({x:c1,y:r1},{x:i,y:r1},{x:i,y:r2},{x:c2,y:r2});
                        //两折点需要计算出最短路径
                        this.theShortest(r1,c1,r1,i,r2,i,r2,c2);
                        result =  true;
                    }
                }
            }
            //垂直扫描
            for(i= 0; i< this.rowMax;i++)
            {
                //两者上或下同时为0垂直扫描3条线
                if(this.tempMap[i][c1]==0&&this.tempMap[i][c2]==0)
                {
                    if(this.lineCheck(r1,c1,i,c1)&&this.lineCheck(i,c1,i,c2)&&this.lineCheck(i,c2,r2,c2))
                    {
                        //route.push({x:c1,y:r1},{x:c1,y:i},{x:c2,y:i},{x:c2,y:r2});
                        //两折点需要计算出最短路径
                        this.theShortest(r1,c1,i,c1,i,c2,r2,c2);
                        result =  true;
                    }
                }
            }
        }
        return result;
    }
        
    //直线检查函数
    private lineCheck(r1:number,c1:number,r2:number,c2:number):Boolean
    {
        //两者处于同一行
        if (r1 == r2)
        {
            //前者大于后者就交换位置
            if (c1 > c2)
            {
                var t:number = c1;
                c1 = c2;
                c2 = t;
            }
            //两者相邻就直接消除
            if (c1 + 1 == c2)
            {
                return true;
            }
            //不相邻就搜索两者之间是否通路不对自身进行搜索
            for (var i:number = c1+1; i<c2; i++)
            {
                if (this.tempMap[r1][i] > 0)
                {
                    return false;
                }
            }
            return true;
        }
        else if (c1 == c2)
        {
            //两者处于同一列
            //前者大于后者就交换位置
            if (r1 > r2)
            {
                t = r1;
                r1 = r2;
                r2 = t;
            }
            //两者相邻就直接消除
            if (r1 + 1 == r2)
            {
                return true;
            }
            //不相邻就搜索两者之间是否通路不对自身进行搜索
            for (i = r1+1; i<r2; i++)
            {
                if (this.tempMap[i][c1] > 0)
                {
                    return false;
                }
            }
            return true;
        }
        return false;
    }
        
    //画线函数
    private linkRoad():void
    {
        this.lineSprite.graphics.lineStyle(5,0xff0000);
        //挨个对比
        var len: number = this.route.length - 1;
        for(var i:number = 0; i<len; i++)
        {
            //每次取出前两个
            var obj1:Object = this.route[i];
            var obj2:Object = this.route[i+1];
            
            var x1: number = obj1["x"] * this.blockWidth + this.blockWidth / 2;
            var y1: number = obj1["y"] * this.blockHeight + this.blockHeight / 2;
            var x2: number = obj2["x"] * this.blockWidth + this.blockWidth / 2;
            var y2: number = obj2["y"] * this.blockHeight + this.blockHeight / 2;
            this.lineSprite.graphics.moveTo(x1,y1);
            this.lineSprite.graphics.lineTo(x2,y2);
            //如果是在同一行则画横线
//            if(obj1["y"] == obj2["y"])
//            {
//                //取得最小列数和最大列数
//                var minCol:number=Math.min(obj1["x"],obj2["x"]);
//                var maxCol:number=Math.max(obj1["x"],obj2["x"])
//                for(var col:number=minCol;col<maxCol;col++){
                    //创建闪电
//                    var light:Lightning = this.lightningPool.getObject();
//                    light.playMC();
//                    light.rotation = 0;
//                    light.x=col*cellWidth+cellWidth/2;
//                    light.y=obj1["y"]*cellWidth + cellWidth/2;
//                    this.addChild(light);
                    
                    
//                }
//            }
//            else if(obj1["x"] == obj2["x"])
//            {
//                //如果是在同一列则画竖线
//                var minRow:number=Math.min(obj1["y"],obj2["y"]);
//                var maxRow:number=Math.max(obj1["y"],obj2["y"])
//                for(var row:number = minRow;row<maxRow;row++){
//                    //创建闪电
//                    light= this.lightningPool.getObject();
//                    light.playMC();
//                    light.rotation=90;
//                    light.y=row*cellWidth+cellWidth/2;
//                    light.x=obj1["x"]*cellWidth +cellWidth/2;
//                    this.addChild(light);
//                }
//            }
        }
        //画完线清空路径数组
        this.lineSprite.graphics.endFill();
        this.route.length=0;
        this.minRoadPoint = 10000;
        var self: GameScene = this;
        setTimeout(function(): void {
            self.lineSprite.graphics.clear();
        },300);
    }
        
    //计算出最短的线路
    private theShortest(r1:number,c1:number,r2:number,c2:number,r3:number,c3:number,r4:number,c4:number):void
    {
        //越靠近下或右的值越大，越大的值只要不超过自身取绝对值越小
        var count:number = 0;
        count = Math.abs(r2-r1) + Math.abs(r3-r2) + Math.abs(r4-r3) + Math.abs(c2-c1) + Math.abs(c3-c2) + Math.abs(c4-c3);
        //当前数小于上一次的数就把当前的值赋给路径数组,如果大于就不去管它了我们只需要最短路径点即可。
        if(count <= this.minRoadPoint){
            this.route[0] = {x:c1,y:r1};
            this.route[1] = {x:c2,y:r2};
            this.route[2] = {x:c3,y:r3};
            this.route[3] = {x:c4,y:r4};
            //上一次的数等于当前的数以便下一次计算
            this.minRoadPoint = count;
        }
    }
        
    //点击提示
    public tishi(): void { 
        //this.oldTarget && this.oldTarget.setSelect(false);
        //this.newTarget && this.newTarget.setSelect(false);
        //this.oldTarget = null;
        //this.newTarget = null;
        //if(this.bangzhu()) {
        //    console.log("tishi success...");
        //    this.oldTarget.startFlash();
        //    this.newTarget.startFlash();
        //}
    }
        
    //点击重新排列
    public sortBlock(): void { 
        //打乱编号
        ArrayTool.randomArr(this.blockData);
        var index:number = 0;
        var len: number = this.blockArr.length;
        var block: BlockUI;
        //挨个检查没消除的方块进行洗牌
        for(var i:number = 0; i<len;i++)
        {
            block = this.blockArr[i];
            if(block!=null)
            {
                block.setSkin(this.blockData[block.index]);
                block.type = this.blockData[block.index];
            }
        }
    }
    
    //检查方块是否消除完毕
    public checkGameOver():Boolean
    {
        for(var i:number = 0; i<this.rowMax; i++)
        {
            for(var j:number = 0; j<this.colMax; j++)
            {
                if(this.tempMap[i][j]>0)
                {
                    return false;
                }
            }
        }
        return true;
    }
    
    //游戏完成
    public gameWin(): void { 
        console.log("game win");
        this.deConfigListeners();
        this.gameWinUI.show(this);
        this.gameWinUI.setScoreLabel(this.score);
    }
        
    //游戏失败
    public gameLose(): void { 
//        this.gameScene.stopTimer();
//        this.gameScene.showSubmitPanel();
    }
        
    //重置游戏
    public resetGame(): void { 
        //清理剩余方块
        var len: number = this.blockArr.length;
        for(var i: number = 0;i < len;i++) { 
            if(this.blockArr[i] != null) { 
                this.blockArr[i].hideImmediately();
            }
        }
        this.blockArr.length = 0;
        //重置参数
        this.isSelect = false;
        this.oldTarget = null;
        this.newTarget = null;
        this.minRoadPoint = 10000;
        this.route.length = 0;
        this.blockNum = 0;
        this.blockData.length = 0;
        this.tempMap = null;
        this.score = 0;
        //隐藏组件
        this.selectOld.hide();
        this.selectNew.hide();
        this.gameWinUI.hide();
        this.rankUI.hide();
    }
    
    
}












