/**
 * 游戏场景
 * @author 
 *
 */
class GameScene extends BaseScene{
    
    //------------------[网络]------------------
    public socket: ClientSocket;

    //---------------[游戏UI]-----------------
    private skillUIList:Array<SkillUI> = new Array<SkillUI>();   //道具面板列表
    
    private blockPool: ObjectPool = ObjectPool.getPool(BlockUI.NAME,10); //方块对象池
    private boomPool: ObjectPool = ObjectPool.getPool(BoomUI.NAME,10);   //炸弹对象池
    private selectOld: SelectUI = new SelectUI(); //选择框动画，第一个对象
    private selectNew: SelectUI = new SelectUI(); //选择框动画，第二个对象
    private lineSprite: egret.Sprite;             //画线容器
    
    private headGroup:eui.Group;    //进度头像Group
    private gameHeadUIList:Array<GameHeadUI> = new Array<GameHeadUI>();  //进度头像列表
    
    //------------------[地图数据]--------------------
    private blockGroup: eui.Group;        //方块容器
    private blockTypeNum: number = 11;    //方块的数量种类
    private blockNum: number = 0;         //当前关卡方块数量
    private blockData: Array<number> = new Array<number>();  //方块的类型数组，用于判断方块皮肤ID后缀数字,"block" + blockData[i]
    private tempMap: Array<any> = new Array<any>();          //临时地图，二维数组，存放本关的地图数据的拷贝
    private blockArr: Array<any> = new Array<any>();         //方块数组，二维数组，用于存放Block实例
    private rowMax: number = 8;      //地图最大行
    private colMax: number = 7;      //地图最大列
    private blockWidth: number = 80; //方块宽
    private blockHeight: number = 80;//方块高
    private mapStartY: number = 0;   //方块起始位置
    private mapStartX: number = 0;
    
    //------------------[游戏变量]--------------------
    private isSelect: Boolean = false;      //是否已经选择了一个方块
    private oldTarget: BlockUI;             //第一次点击的方块
    private newTarget: BlockUI;             //第二次点击的方块
    private score: number = 0;              //得分
    private curLevel: number = 1;           //当前关卡
    public totalScore: number = 0;          //总分
    private userMax: number = 8;            //用户最大数量
    private blockTotal:number = 0;          //3个关卡所有方块总数
    
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
        
    }
    
    private startGame(): void {
        this.curLevel = 1;
        this.createMap();
        this.initGameHead();
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
        this.blockNum = 0;
        this.blockData.length = 0;
        this.tempMap = null;
        //隐藏组件
        this.selectOld.hide();
        this.selectNew.hide();
    }
    
    private gameOver(): void { 
        console.log("game over");

    }
    
    //下一关
    public nextLevel(): void {
        this.curLevel++;
        this.resetGame();
        this.createMap();
    }
    
    ///////////////////////////////////////////////////
    ///-----------------[游戏UI]----------------------
    ///////////////////////////////////////////////////
    private initView(): void {
        this._stage = GameConst.stage;
        //方块
        for(var i:number=0;i<this.rowMax;i++){
            this.blockArr.push(new Array<BlockUI>());
        }
        //技能显示面板 测试
        for(var i:number=0;i<4;i++){
            this.skillUIList.push(this["skillUI" + i]);
        } 
        //进度头像
        for(var i:number=0;i<this.userMax;i++){  //人数8人
            this.gameHeadUIList.push(new GameHeadUI());
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
    
    //初始化用户进度头像
    private initGameHead(){
        var userList = UserManager.getInstance().userList;
        var index:number= 0;   //游戏进度头像计数
        var userVO:UserVO;     //用户信息
        var gameHeadUI:GameHeadUI; //游戏进度头像
        for(var key in userList){
            userVO = userList[key];
            gameHeadUI = this.gameHeadUIList[index];
            index++;
            gameHeadUI.setHeadBmd(userVO.headBmd);
            userVO.gameHeadUI = gameHeadUI;
            this.headGroup.addChild(gameHeadUI);
        }
    }
    
    //玩家消除一次，则游戏进度头像移动
    private moveGameHead(uid:string){
        var userVO:UserVO = UserManager.getInstance().userList[uid];
        if(userVO){
            var gameHeadUI:GameHeadUI = userVO.gameHeadUI;
            gameHeadUI.y = userVO.cancelBloukNum/this.blockTotal*(this.headGroup.width - gameHeadUI.width);
        }
    }
    
    ///////////////////////////////////////////////////
    ///-----------------[游戏逻辑]----------------------
    ///////////////////////////////////////////////////
    
    //创建地图
    private createMap(): void {
        //引用原始地图的数据
        var mapData = MapManager.getInstance().level[this.curLevel - 1]; //关卡1-3 ，数组下标0-2
        
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
    
    //删除指定两个方块
    private cancelBlock(blockA:BlockUI, blockB:BlockUI):void{
        
        if(this.checkRoad(blockA,blockB)) {
            //画线
            this.linkRoad();

            //爆炸效果
            var boom1: BoomUI = this.boomPool.getObject();
            var boom2: BoomUI = this.boomPool.getObject();
            boom1.play(blockA);
            boom2.play(blockB);
            //两方块的消失
            blockA.hide();
            blockB.hide();
            this.tempMap[blockA.row][blockA.col] = 0;
            this.tempMap[blockB.row][blockB.col] = 0;
            this.blockArr[blockA.row][blockA.col] = null;
            this.blockArr[blockB.row][blockB.col] = null;
            
            //检查游戏是否结束
            if(this.checkGameOver()) {
                this.nextLevel();
            }
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
    
    ///////////////////////////////////////////////////
    ///-----------------[网络处理]----------------------
    ///////////////////////////////////////////////////


    //玩家消除动作
    public revEliminate(data): void {
        var uid: string = data.uid; //用户id
        var pos: any = data.pos;  //消除的位置
        
        egret.log("玩家消除方块:",uid,pos);
        
        //计算用户消除和头像移动
        (<UserVO>UserManager.getInstance().userList[uid]).cancelBloukNum++;
        this.moveGameHead(uid);
        
        //大屏用户消除
        if(uid == UserManager.getInstance().luckyUser){
            var blockA: BlockUI = this.blockArr[pos[0][0]][pos[0][1]];
            var blockB: BlockUI = this.blockArr[pos[1][0]][pos[1][1]];
            if(blockA && blockB) {
                this.cancelBlock(blockA,blockB);
            }
        }
        
    }

    //使用道具(大屏幕)
    public revPro(data): void {
        var from:string = data.from;   //施放道具的玩家uid
        var to:string = data.to;       //被施放道具的玩家uid
        var type: string = data.type;  //道具类型
        var mapData = data.mapData;    //道具使用后影响的位置
        
        egret.log("使用道具:" + type);
        //道具效果
        var toolName:string = "";
        if(type == "1"){  //打乱
            toolName = "打乱";
            //相当于重置地图，特效可能不同
            MapManager.getInstance().level = mapData;
            this.nextLevel();
        }else if(type == "2"){  //冻结
            toolName = "冻结";
        }else if(type == "3"){  //提示
            
        }
        
        //大屏幕显示道具信息  暂时用第一栏显示
       // var img0: egret.Bitmap = (<UserVO>UserManager.getInstance().userList[from]).headImg;
       // var img1: egret.Bitmap = (<UserVO>UserManager.getInstance().userList[to]).headImg;
       // this.skillUIList[0].setSkill(img0,img1,toolName);
    }

    //幸运用户的地图因为没有可以消除的，系统自动更换
    public revLuckyMap(data): void {
        var mapData: any = data.mapData;  //地图数据
        //重置地图
        MapManager.getInstance().level [this.curLevel-1]= mapData;
        this.resetGame();
        this.createMap();
    }
    
    //游戏结束
    public revGameOver(data): void {
        var winners: any = data.winners;  //前三名玩家ID
        egret.log("游戏结束，前三名ID：" + winners[0],winners[1],winners[2]);
        
        //TODO 返回首页?还是在游戏界面进行某些显示？
        //LayerManager.getInstance().runScene(GameManager.getInstance().homeScene);
    }
    
    
    
    


    
    
}









