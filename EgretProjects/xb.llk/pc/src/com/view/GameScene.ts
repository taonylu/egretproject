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
        this.resetGame();
        this.createMap();
    }
    
    ///////////////////////////////////////////////////
    ///-----------------[游戏UI]----------------------
    ///////////////////////////////////////////////////
    private initView(): void {
        this._stage = GameConst.stage;
        //this.mapStartX = (this._stage.stageWidth - this.blockWidth * this.colMax) / 2;
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
        var mapData = MapManager.getInstance().level;
        
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
                    block.name = i + "_" + j;
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

    //初始化方块数据
    public initBlockData(blockNum: number): void {
        //方块数量除以2只创建一半编号另一半是相同的。
        for(var i: number = 0;i < blockNum / 2;i++) {
            var date: number = NumberTool.getRandomInt(1,this.blockTypeNum); //1-方块总数
            this.blockData.push(date,date);
        }
        //随机排序数组
        ArrayTool.randomArr(this.blockData);
    }

    
    //删除指定两个方块
    private cancelBlock(blockA:BlockUI, blockB:BlockUI):void{
        //画线
        this.lineSprite.graphics.lineStyle(5,0xff0000);
        
        var x1: number = blockA.col * this.blockWidth + this.blockWidth / 2;
        var y1: number = blockA.row * this.blockHeight + this.blockHeight / 2;
        var x2: number = blockB.col * this.blockWidth + this.blockWidth / 2;
        var y2: number = blockB.row * this.blockHeight + this.blockHeight / 2;
        
        this.lineSprite.graphics.moveTo(x1,y1);
        this.lineSprite.graphics.lineTo(x2,y2);
     
        //画完线清空路径数组
        this.lineSprite.graphics.endFill();

        //清理路线
        var self: GameScene = this;
        setTimeout(function(): void {
            self.lineSprite.graphics.clear();
        },300);
        
        
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
    }
    
    ///////////////////////////////////////////////////
    ///-----------------[网络处理]----------------------
    ///////////////////////////////////////////////////

    
    
    
    //玩家消除动作
    public revEliminate(data): void {
        var id: string = data.id; //用户id
        var pos: any = data.pos;  //消除的位置
        
        egret.log("玩家消除方块:",id,pos);
        
        if(id == UserManager.getInstance().luckyUser){
            var blockA: BlockUI = this.blockArr[pos[0][0]][pos[0][1]];
            var blockB: BlockUI = this.blockArr[pos[1][0]][pos[1][1]];
            if(blockA && blockB) {
                this.cancelBlock(blockA,blockB);
            }
        }
        
    }
    
    //过关后，接收新关卡数据
    public revMapData(data):void{
        var mapData = data.mapdata;
        
        egret.log("下一关");
        
        //重置地图数据，进入下一关
        MapManager.getInstance().level = mapData;
        this.nextLevel();
    }
    
    //本次关卡无可消除，则由用户手机更新地图后，发送到大屏幕，大屏幕接收后更新地图
    public revluckyMap(data):void{
        var mapData = data.mapdata;
        
        egret.log("玩家无可消除，重排地图");
        
        //更新操作同下一关。都是重置界面。特效方面可能不同
        MapManager.getInstance().level = mapData;
        this.nextLevel();
    }


    //使用道具(大屏幕)
    public revPro(data): void {
        var type: string = data.type;  //道具类型
        var mapData = data.mapdata;    //道具使用后影响的位置
        
        egret.log("使用道具:" + type);
        
        if(type == "1"){  //打乱
            MapManager.getInstance().level = mapData;
            this.nextLevel();
        }else if(type == "2"){  //冻结
            
        }else if(type == "3"){  //提示
            
        }
    }

    //幸运用户的地图因为没有可以消除的，系统自动更换
    public revLuckyMap(data): void {
        var mapData: any = data.mapdata;  //地图数据
    }
    
    //游戏结束
    public revGameOver(data): void {
        var winners: any = data.winners;  //前三名玩家ID
        egret.log("游戏结束，前三名ID：" + winners[0],winners[1],winners[2]);
    }
    
    
    
    


    
    
}









