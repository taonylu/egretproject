/**
 * 游戏场景
 * @author 
 *
 */
class GameScene extends BaseScene{
    
    //------------------[网络]------------------
    public socket: ClientSocket;

    //---------------[游戏UI]-----------------
    private skill0Btn:eui.Image;  //技能按钮 打乱
    private skill1Btn:eui.Image;  //冰冻
    private skill2Btn:eui.Image;  //提示
    
    private blockPool: ObjectPool = ObjectPool.getPool(BlockUI.NAME,10); //方块对象池
    private boomPool: ObjectPool = ObjectPool.getPool(BoomUI.NAME,10);   //炸弹对象池
    private selectOld: SelectUI = new SelectUI(); //选择框动画，第一个对象
    private selectNew: SelectUI = new SelectUI(); //选择框动画，第二个对象
    private lineSprite: egret.Sprite;             //画线容器
    
    //------------------[地图数据]--------------------
    private blockGroup: eui.Group;        //方块容器
    private blockTypeNum: number = 11;    //方块的数量种类
    private blockNum: number = 0;         //当前关卡方块数量
    private blockData: Array<number> = new Array<number>();  //方块的类型数组，用于判断方块皮肤ID后缀数字,"block" + blockData[i]
    private tempMap: Array<any> = new Array<any>();          //临时地图，二维数组，存放本关的地图数据的拷贝
    private blockArr: Array<any> = new Array<any>();         //方块数组，二维数组，用于存放Block实例
    private rowMax: number = 8;      //地图最大行
    private colMax: number = 7;      //地图最大列
    private blockWidth: number = 64; //方块宽
    private blockHeight: number = 64;//方块高
    private mapStartY: number = 0;   //方块起始位置
    private mapStartX: number = 0;
    
    //------------------[游戏变量]--------------------
    private isSelect: Boolean = false;      //是否已经选择了一个方块
    private oldTarget: BlockUI;             //第一次点击的方块
    private newTarget: BlockUI;             //第二次点击的方块
    private score: number = 0;              //得分
    private curLevel: number = 1;           //当前关卡
    //private gameTimer: egret.Timer;       //计时器
    //private timeLimit: number = 10;       //计时时间限制
    public totalScore: number = 0;          //总分
    
    //------------------[寻路数据]--------------------
    private minRoadPoint: number = 10000;               //路径数
    private route: Array<Object> = new Array<Object>(); //记录路径
    private _stage: egret.Stage;                        //舞台stage
    
    
    
    
	public constructor() {
        super("GameSceneSkin");
 
	}
	
    public componentCreated(): void {
        super.componentCreated();

        this.initView();        //初始化界面参数
        this.initLineSprite();  //初始化画线容器
    }

    public onEnable(): void {
        
        this.startGame();
    }

    public onRemove(): void {
        //清理地图
        MapManager.getInstance().level = null;
    }
    
    private startGame(): void {
        this.curLevel = 1;
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
        this.configListener();
    }
    
    public configListener(){
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
        this.skill0Btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSkill0, this);
        this.skill1Btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onSkill1,this);
        this.skill2Btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onSkill2,this);
    }
    
    public deConfigListener(){
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
        this.skill0Btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onSkill0,this);
        this.skill1Btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onSkill1,this);
        this.skill2Btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onSkill2,this);
    }
    
    //打乱对手
    private onSkill0(){
        
    }
    
    //冰冻对手
    private onSkill1(){
        
    }
    
    //重排自己
    private onSkill2(){
        
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
    
    private initLineSprite() {
        //初始变量
        this.lineSprite = new egret.Sprite();
        this.lineSprite.x = this.mapStartX;
        this.lineSprite.y = this.mapStartY;
        this.lineSprite.width = this._stage.stageWidth;
        this.lineSprite.height = this._stage.stageHeight;
        this.lineSprite.touchChildren = false;
        this.lineSprite.touchEnabled = false;
        this.blockGroup.addChild(this.lineSprite);
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

        //获得当前地图的方块数量
//        for(var i: number = 0;i < this.rowMax;i++) {
//            for(var j: number = 0;j < this.colMax;j++) {
//                if(this.tempMap[i][j] > 0) {
//                    this.blockNum++;
//                }
//            }
//        }

        //创建方块
        var index: number = 0; //已经生成的方块数
        for(var i = 0;i < this.rowMax;i++) {
            for(var j = 0;j < this.colMax;j++) {
                if(this.tempMap[i][j] > 0) {
                    var block: BlockUI = this.blockPool.getObject();
                    block.setSkin(this.tempMap[i][j]);
                    block.row = i;
                    block.col = j;
                    block.x = this.mapStartX + j * (this.blockWidth + 1);
                    block.y = this.mapStartY + i * (this.blockHeight + 1) - this._stage.stageHeight;
                    this.blockGroup.addChild(block);
                    this.blockArr[block.row][block.col] = block;
                    egret.Tween.get(block).to({ y: (this.mapStartY + i * (this.blockHeight + 1)) },500);
                    index++;
                }
            }
        }
    }

    //根据方块数量，随机相同数量成对的方块皮肤，并打乱顺序
    public initBlockData(blockNum: number): void {
        //方块数量除以2只创建一半编号另一半是相同的。
        for(var i: number = 0;i < blockNum / 2;i++) {
            var date: number = NumberTool.getRandomInt(1,this.blockTypeNum); //1-方块总数
            this.blockData.push(date,date);
        }
        //随机排序数组
        ArrayTool.randomArr(this.blockData);
    }
    
    //点击方块
    private onTouchTap(e: egret.TouchEvent): void {
        if(e.target instanceof BlockUI) {
            this.checkBlock(e.target);
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
                    //this.setScoreText(this.score += 20);
                    //隐藏选择框
                    this.selectOld.hide();
                    this.selectNew.hide();
                    this.isSelect = false;

                    //检查游戏是否结束
                    if(this.checkGameOver()) {
                       this.nextLevel();
                    }
                    
                    //检查地图上是否有能相连的方块，如果没有，则重新排列
//                    if(this.bangzhu() == false){
//                        this.sortBlock();
//                    }
                    
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
                this.route.push({ x: c1,y: r1 },{ x: c2,y: r2 });
                return true;
            }
            //同一行两折点扫描
            for(var i: number = 0;i < this.rowMax;i++) {
                //两者上或下同时为0垂直扫描3条线
                if(this.tempMap[i][c1] == 0 && this.tempMap[i][c2] == 0) {
                    if(this.lineCheck(r1,c1,i,c1) && this.lineCheck(i,c1,i,c2) && this.lineCheck(i,c2,r2,c2)) {
                        //route.push({x:c1,y:r1},{x:c1,y:i},{x:c2,y:i},{x:c2,y:r2});
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
                this.route.push({ x: c1,y: r1 },{ x: c2,y: r2 });
                return true;
            }
            //同一列两折点扫描
            for(i = 0;i < this.colMax;i++) {
                //两者前或后同时为0横向扫描3条线
                if(this.tempMap[r1][i] == 0 && this.tempMap[r2][i] == 0) {
                    if(this.lineCheck(r1,c1,r1,i) && this.lineCheck(r1,i,r2,i) && this.lineCheck(r2,i,r2,c2)) {
                        //route.push({x:c1,y:r1},{x:i,y:r1},{x:i,y:r2},{x:c2,y:r2});
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
                    this.route.push({ x: c1,y: r1 },{ x: c1,y: r2 },{ x: c2,y: r2 });
                    return true;
                }
            }
            //第一个对象那一行第二个对象那一列拐角扫描
            if(this.tempMap[r1][c2] == 0) {
                if(this.lineCheck(r1,c1,r1,c2) && this.lineCheck(r2,c2,r1,c2)) {
                    //一折拐角没有最短路径直接传给数组不需要计算
                    this.route.push({ x: c1,y: r1 },{ x: c2,y: r1 },{ x: c2,y: r2 });
                    return true;
                }
            }
            //两折点综合扫描
            //横向扫描
            for(i = 0;i < this.colMax;i++) {
                //两者前或后同时为0横向扫描3条线
                if(this.tempMap[r1][i] == 0 && this.tempMap[r2][i] == 0) {
                    if(this.lineCheck(r1,c1,r1,i) && this.lineCheck(r1,i,r2,i) && this.lineCheck(r2,i,r2,c2)) {
                        //route.push({x:c1,y:r1},{x:i,y:r1},{x:i,y:r2},{x:c2,y:r2});
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
                        //route.push({x:c1,y:r1},{x:c1,y:i},{x:c2,y:i},{x:c2,y:r2});
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
        
    //画线函数
    private linkRoad(): void {
        this.lineSprite.graphics.lineStyle(5,0xff0000);
        //挨个对比
        var len: number = this.route.length - 1;
        for(var i: number = 0;i < len;i++) {
            //每次取出前两个
            var obj1: Object = this.route[i];
            var obj2: Object = this.route[i + 1];

            var x1: number = obj1["x"] * this.blockWidth + this.blockWidth / 2;
            var y1: number = obj1["y"] * this.blockHeight + this.blockHeight / 2;
            var x2: number = obj2["x"] * this.blockWidth + this.blockWidth / 2;
            var y2: number = obj2["y"] * this.blockHeight + this.blockHeight / 2;
            this.lineSprite.graphics.moveTo(x1,y1);
            this.lineSprite.graphics.lineTo(x2,y2);

        }
        //画完线清空路径数组
        this.lineSprite.graphics.endFill();
        this.route.length = 0;
        this.minRoadPoint = 10000;
        var self: GameScene = this;
        setTimeout(function(): void {
            self.lineSprite.graphics.clear();
        },300);
    }
        
    //计算出最短的线路
    private theShortest(r1: number,c1: number,r2: number,c2: number,r3: number,c3: number,r4: number,c4: number): void {
        //越靠近下或右的值越大，越大的值只要不超过自身取绝对值越小
        var count: number = 0;
        count = Math.abs(r2 - r1) + Math.abs(r3 - r2) + Math.abs(r4 - r3) + Math.abs(c2 - c1) + Math.abs(c3 - c2) + Math.abs(c4 - c3);
        //当前数小于上一次的数就把当前的值赋给路径数组,如果大于就不去管它了我们只需要最短路径点即可。
        if(count <= this.minRoadPoint) {
            this.route[0] = { x: c1,y: r1 };
            this.route[1] = { x: c2,y: r2 };
            this.route[2] = { x: c3,y: r3 };
            this.route[3] = { x: c4,y: r4 };
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
        if(this.bangzhu()) {
            egret.log("提示方块:" , this.oldTarget.row, this.oldTarget.col, this.newTarget.row, this.newTarget.col);
           // this.oldTarget.startFlash();
           // this.newTarget.startFlash();
      
        }
    }
    
    //帮助找到两个通路的方块
    private bangzhu(): boolean {
        for(var i: number = 0;i < this.rowMax - 1;i++) {   //i,j当前方块行列
            for(var j: number = 0;j < this.colMax - 1;j++) {
                if(this.tempMap[i][j] > 0) {
                    //每一个方块遍历每一个元素
                    for(var m: number = i;m < this.rowMax - 1;m++) {  //m,n检测的方块行列
                        var n: number;
                        if(m == i) {   //m=i，同一行，则检查的是自己，所以列+1
                            n = j + 1;
                        }
                        else {
                            n = 0;
                        }
                        for(;n< this.colMax-1;n++) {
                            if(this.tempMap[m][n] > 0) {
                                var obj1: BlockUI = this.blockArr[i][j];
                                var obj2: BlockUI = this.blockArr[m][n];
                                //检查两者是否通路
                                if(obj1.skinID == obj2.skinID) {
                                    if(this.checkRoad(obj1,obj2)) {
                                        //只提示两个方块不记录线路
                                        this.route.length = 0;
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
        this.socket.sendMessage(NetConst.C2S_usePro,json);
    }
    
    //--------------------[接收]----------------------
    
    //游戏结束
    public revGameOver(data): void {
        var rank: number = data.rank;  //前三名玩家ID
        egret.log("游戏结束，排名" + rank);
    }
    
    //过关后，接收新关卡数据
    public revMapData(data): void {
        var mapData = data.mapdata;
        egret.log("下一关" );
        //重置地图数据，进入下一关
        MapManager.getInstance().level = mapData;
        this.nextLevel();
    }

    //使用道具
    public revPro(data): void {
        var type: string = data.type;  //道具类型
        var mapData = data.mapData;    //道具使用后影响的位置
        
        egret.log("被使用道具:",type);
        
        if(type == "1"){  //打乱
            MapManager.getInstance().level = mapData;
            this.nextLevel();
        }else if(type == "2"){  //冻结
            
        }else if(type == "3"){  //提示
            
        }
    }
    
    //玩家自己施放道具返回
    public revUserPro(data){
        var status: number = data.status; // 是否使用成功 1 0
        var change: number = data.change; // 该道具剩余次数
        egret.log("玩家使用道具返回:",status, change);    
    }
    
    
    
    
    
    


    
    
}









