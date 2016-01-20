/**
 * 游戏场景
 * @author 
 *
 */
class GameScene extends BaseScene{
    
    //------------------[网络]------------------
    public socket: ClientSocket;

    //---------------[游戏UI]-----------------
    private blockPool: ObjectPool = ObjectPool.getPool(BlockUI.NAME,10); //方块对象池
    private boomPool: ObjectPool = ObjectPool.getPool(BoomUI.NAME,10);   //炸弹对象池
    private selectOld: SelectUI = new SelectUI(); //选择框动画，第一个对象
    private selectNew: SelectUI = new SelectUI(); //选择框动画，第二个对象
    
    private headGroup:eui.Group;    //进度头像Group
    private gameHeadUIList:Array<GameHeadUI> = new Array<GameHeadUI>();  //进度头像列表
    
    private lineSuPool:ObjectPool = ObjectPool.getPool(LineSu.NAME,10);  //连线
    private lineZhePool: ObjectPool = ObjectPool.getPool(LineZhe.NAME,4);
    
    private skillUIList: Array<SkillUI> = new Array<SkillUI>();   //道具面板列表
    private skillIce: eui.Image;    //冰冻特效
    private skillGroup:eui.Group;       //技能Group
    private skillIntroGroup:eui.Group;  //技能介绍Group
    private skillCount:number = 0;      //技能使用次数，用于显示技能面板
    
    private resultGroup:eui.Group;      //结果Group
    private gameOverBg:eui.Rect;        //游戏结束黑色背景
    private gameOverText:eui.Image;     //游戏结束文字
    private nameLabelList:Array<eui.Label> = new Array<eui.Label>();  //结果面板昵称文本数组
    private resultHeadList:Array<eui.Group> = new Array<eui.Group>(); //结果头像Group数组
    private resultTimeList:Array<eui.Label> = new Array<eui.Label>(); //结果时间文本
    
    
    //------------------[地图数据]--------------------
    private blockGroup: eui.Group;        //方块容器
    private blockNum: number = 0;         //当前关卡方块数量
    private blockData: Array<number> = new Array<number>();  //方块的类型数组，用于判断方块皮肤ID后缀数字,"block" + blockData[i]
    private tempMap: Array<any> = new Array<any>();          //临时地图，二维数组，存放本关的地图数据的拷贝
    private blockArr: Array<any> = new Array<any>();         //方块数组，二维数组，用于存放Block实例
    private rowMax: number = 10;      //地图最大行
    private colMax: number = 9;      //地图最大列
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
        this.initView(); 
    }

    public onEnable(): void {
        this.startGame();
    }

    public onRemove(): void {
        
    }
    
    public reset(){
        
    }
    
    private startGame(): void {
        //初始化
        this.curLevel = 1;
        this.skillCount = 0;
        this.blockTotal = MapManager.getInstance().getBlockNum();
        this.hideResutl();
        this.initGameHead();
        this.createMap();
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
        //技能显示面板
        for(var i:number=0;i<4;i++){
            this.skillUIList.push(this["skillUI" + i]);
        } 
        //进度头像
        for(var i:number=0;i<this.userMax;i++){  //人数8人
            this.gameHeadUIList.push(new GameHeadUI());
        }
        for(var i:number=0;i<this.userMax;i++){  //结果昵称文本和头像Group
            this.nameLabelList.push(this["nameLabel" + i]);
            this.resultHeadList.push(this["resultHead" + i]);
            this.resultTimeList.push(this["resultTimeLabel" + i]);
        }
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
            gameHeadUI.x = 0;
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
            // 头像y / 进度条总长 = 消除方块数/总方块数
            gameHeadUI.x = userVO.cancelBloukNum/this.blockTotal*this.headGroup.width;
        }
    }
    
    //游戏结束，显示结果
    private showResult(data){
        this.skillGroup.visible = false;
        this.skillIntroGroup.visible = false;
        this.gameOverBg.visible = true;
        this.gameOverText.visible = true;
        this.resultGroup.visible = true;
        
        //显示排名
        for(var i:number=0;i<this.userMax;i++){
            this.nameLabelList[i].text = "";
            this.resultTimeList[i].text = "";
            if(data.winners[i] != null){
                var uid:string = data.winners[i].uid;
                var spend:number = data.winners[i].spend;
                var userVO:UserVO = UserManager.getInstance().getUser(uid);
                if(userVO){
                    this.nameLabelList[i].text = userVO.name;
                    var bm:egret.Bitmap = new egret.Bitmap(userVO.headBmd);
                    bm.width = 65;
                    bm.height = 65;
                    this.resultHeadList[i].addChild(bm);
                    
                    if(spend > 0){
                        var min: number = Math.floor(spend / 1000 / 60);
                        var sec: number = Math.floor(spend / 1000 % 60);
                        this.resultTimeList[i].text = min + ":" + sec;
                    }else{
                        this.resultTimeList[i].text = "0";
                    }
                    
                }
            }
        }
        
    }
    
    //隐藏游戏结束
    private hideResutl(){
        this.skillGroup.visible = true;
        this.skillIntroGroup.visible = true;
        this.gameOverBg.visible = false;
        this.gameOverText.visible = false;
        this.resultGroup.visible = false;
        
        //删除头像
        for(var i: number = 0;i < this.userMax;i++) {
            if(this.resultHeadList[i].numChildren > 0){
                var headImg: egret.DisplayObject = this.resultHeadList[i].getChildAt(0);
                headImg && headImg.parent && headImg.parent.removeChild(headImg);
            }
            
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
                    egret.Tween.get(block).to({ y: (this.mapStartY + i * this.blockHeight )},500);
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
    private saveLinePath(r1,c1,r2,c2) {
        if(r1 == r2) { //同行
            if(c1 > c2) {
                for(var i: number = c1;i >= c2;i--) {
                    this.route.push({ x: i,y: r1 });
                }
            } else {
                for(var i: number = c1;i <= c2;i++) {
                    this.route.push({ x: i,y: r1 });
                }
            }

        } else if(c1 == c2) {
            if(r1 > r2) {
                for(var i: number = r1;i >= r2;i--) {
                    this.route.push({ x: c1,y: i });
                }
            } else {
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
            
            if(i+1 == len){
                break;
            }

            var c1: number = obj1["x"];
            var r1: number = obj1["y"];
            var c2: number = obj2["x"];
            var r2: number = obj2["y"];

            console.log(r1,c1,r2,c2);

            if(c1 == c2 && (obj3 == null || c2 == c3)) {  //同列
                var lineSu: LineSu = this.lineSuPool.getObject();
                lineSu.rotation = 0;
                lineSu.x = c2 * this.blockWidth + this.blockWidth / 2;
                lineSu.y = r2* this.blockHeight + this.blockHeight/2;
                lineList.push(lineSu);
                this.blockGroup.addChild(lineSu);
                console.log("同列");
            } else if(r1 == r2 && (obj3 == null || r2 == r3)) {  //同行
                var lineSu: LineSu = this.lineSuPool.getObject();
                lineSu.rotation = 90;
                lineSu.x = c2 * this.blockWidth + this.blockWidth / 2;
                lineSu.y = r2 * this.blockHeight + this.blockHeight / 2;
                lineList.push(lineSu);
                this.blockGroup.addChild(lineSu);
                console.log("同行");
            } else if(obj3) { //折线
                var lineZhe: LineZhe = this.lineZhePool.getObject();
                lineZhe.x = c2 * this.blockWidth + this.blockWidth / 2;
                lineZhe.y = r2 * this.blockHeight + this.blockHeight / 2;
                this.blockGroup.addChild(lineZhe);
                lineList.push(lineZhe);
                if((c1 == c2 && r2 > r1 && r2 == r3 && c3 > c2) || (r1 == r2 && c1 > c2 && c2 == c3 && r3 < r2)) {  // L型
                    lineZhe.rotation = 0;
                    console.log("L");
                } else if((c1 == c2 && r2 < r1 && r2 == r3 && c3 > c2) || (r1 == r2 && c1 > c2 && c2 == c3 && r3 > r2)) {   //|-型
                    lineZhe.rotation = 90;
                    console.log("|-");
                } else if((r1 == r2 && c2 > c1 && c2 == c3 && r3 > r2) || (c1 == c2 && r1 > r2 && r2 == r3 && c3 < c2)) {  //-|型
                    lineZhe.rotation = 180;
                    console.log("-|");
                } else {   //_|型
                    lineZhe.rotation = 270;
                    console.log("_|");
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
    
    //点击提示
    public tishi() {
        this.oldTarget && this.selectOld.hide();
        this.newTarget && this.selectNew.hide();
        this.oldTarget = null;
        this.newTarget = null;
        this.isSelect = false;
        if(this.bangzhu()) {
            egret.log("提示方块:",this.oldTarget.row,this.oldTarget.col,this.newTarget.row,this.newTarget.col);
            this.selectOld.play(this.oldTarget);
            this.selectNew.play(this.newTarget);

        }
    }
    
    //帮助找到两个通路的方块
    private bangzhu(): boolean {
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


    //玩家消除动作
    public revEliminate(data): void {
        var uid: string = data.uid; //用户id
        var pos: any = data.pos;  //消除的位置
        
        egret.log("玩家消除方块:",uid,pos);
        
        //计算用户消除和头像移动
        (<UserVO>UserManager.getInstance().userList[uid]).cancelBloukNum+=2; //一次消除2个方块
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
        var time = data.time;          //冰冻时间
        
        egret.log("使用道具:" + from, to, type, mapData,time);
        egret.log("是否大屏幕:", UserManager.getInstance().luckyUser == to);
        //道具效果
        var toolName:string = "";
        switch(type){
            case "disturb":  //相当于重置地图，特效可能不同
                toolName = "打乱";
                if(UserManager.getInstance().luckyUser == to){
                    MapManager.getInstance().level[this.curLevel - 1] = mapData;
                    this.resetGame();
                    this.createMap();
                }
            break;
            case "ice":  //冻结  3秒后解冻
                toolName = "冻结";
                if(UserManager.getInstance().luckyUser == to){
                    this.skillIce.visible = true;
                    var self: GameScene = this;
                    egret.Tween.removeTweens(this.skillIce);
                    egret.Tween.get(this.skillIce).wait(time).call(function() {
                        self.skillIce.visible = false;
                    });
                }
            break;
            case "find":  //提示
                toolName = "提示";
                if(UserManager.getInstance().luckyUser == to) {
                    this.tishi();
                }
            break;
        }

        
        //大屏幕显示道具信息
        if(toolName != "" && UserManager.getInstance().getUser(from).headBmd && UserManager.getInstance().getUser(to).headBmd){
            var img0: egret.Bitmap = new egret.Bitmap(UserManager.getInstance().getUser(from).headBmd );
            var img1: egret.Bitmap = new egret.Bitmap(UserManager.getInstance().getUser(to).headBmd);
            var index:number = this.skillCount%4;
            this.skillUIList[index].setSkill(img0,img1,toolName);
            this.skillCount++;
        }
        
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
        var rankLast:number = data.rankLast; //结果页面显示时间
        egret.log("游戏结束");
        
        //TODO 返回首页?还是在游戏界面进行某些显示？
        this.showResult(data);
        
        var self:GameScene = this;
        
        egret.Tween.get(this).wait(rankLast).call(function(){
            self.resetGame();
            UserManager.getInstance().clear();
            LayerManager.getInstance().runScene(GameManager.getInstance().homeScene);
        },this);
    }
    
    


    
    
}










