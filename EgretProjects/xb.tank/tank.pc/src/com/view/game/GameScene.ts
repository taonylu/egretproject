/**
 * 游戏场景
 * @author 
 *
 */
class GameScene extends BaseScene{
    private tileGroup:eui.Group;   //地形层
    public bulletGroup:eui.Group;  //子弹层
    
    private mapList;           //当前地图二维数组，存储地图数字
    private tileList;          //地形数组，存储BaseItem
    private rowMax:number;     //地图行列最大值
    private colMax:number; 
    private tileWidth:number;  //地图块高宽
    private tileHeight:number;
    private mapWidth:number;   //地图整个高宽
    private mapHeight:number;
    
    private playerTankList:Array<BaseTank> = new Array<BaseTank>();  //我方坦克
    private enemyTankList:Array<BaseTank> = new Array<BaseTank>();   //敌方坦克
    public playerBulletList:Array<Bullet> = new Array<Bullet>();     //我方子弹
    public enemyBulletList:Array<Bullet> = new Array<Bullet>();      //敌方子弹
    private itemList:Array<BaseItem> = new Array<BaseItem>();        //道具
    
    
	public constructor() {
        super("GameSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        this.initView();
    }

    public onEnable(): void {
        
  
    }

    public onRemove(): void {
        
    }
    
    public startGame(){
        this.initMap();
        this.initPlayer();
        this.configListeners();
    }
    
    public nextLevel(){
        
    }
    
    public gameOver(){
        
    }
    
    public resetGame(){
        
    }
    
    private configListeners(){
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    }
    
    private deConfigListeners(){
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    }
    
    //每帧执行
    private onEnterFrame(){
        this.movePlayerTank();  //移动自己坦克
        this.moveEnemyTank();   //移动敌方坦克
    }
    
    //初始化界面
    private initView() {
        //初始化地图数据
        this.rowMax = MapManager.getInstance().rowMax;
        this.colMax = MapManager.getInstance().colMax;
        this.tileWidth = MapManager.getInstance().tileWidth;
        this.tileHeight = MapManager.getInstance().tileHeight;
        //初始化地形数组
        this.tileList = [];
        for(var i = 0;i < this.rowMax;i++) {
            this.tileList[i] = [];
            for(var j = 0;j < this.colMax;j++) {
                this.tileList[i][j] = null;
            }

        }

    }
    
    //初始化地图
    private initMap() {
        //获取地图数据
        var mapManager: MapManager = MapManager.getInstance();
        var levelData: LevelData = mapManager.levelList[mapManager.curLevel];
        var mapData = levelData.mapData;
        this.mapList = ArrayTool.copy2DArr(mapData);
        
        //创建地图
        var gameFactory: GameFactory = GameFactory.getInstance();
        var tileType: number;
        for(var i = 0;i < this.rowMax;i++) {
            for(var j = 0;j < this.colMax;j++) {
                tileType = mapData[i][j];
                if(tileType != 0) {
                    var tile: BaseTile = gameFactory.getTile(tileType);
                    tile.setType(tileType);
                    tile.x = j * this.tileWidth;
                    tile.y = i * this.tileHeight;
                    this.tileGroup.addChild(tile);
                    this.tileList[i][j] = tile;
                }
            }
        }
    }
    
    //初始化玩家
    private initPlayer() {

    }
    
    //移动玩家坦克
    private movePlayerTank(){
        var len = this.playerTankList.length;
        var tank:PlayerTank;
        for(var i=0;i<len;i++){
            tank = this.playerTankList[i];
            if(this.getCollioseTile(tank) == null){
                tank.move();
            }
        }
    }   
    
    //移动敌方坦克
    private moveEnemyTank(){
        var len = this.enemyTankList.length;
        var tank:BaseTank;
        for(var i=0;i<len;i++){
            tank = this.enemyTankList[i];
            if(this.getCollioseTile(tank) == null){
                tank.move();
            }
        }
    }
    
    //移动自己子弹
    private movePlayerBullet(){
        var len = this.playerBulletList.length;
        var bullet:Bullet;
        for(var i=len-1;i>=0;i--){
            bullet = this.playerBulletList[i];
            
            //边界检测
            
            //判断子弹击中障碍物
            var tile = this.getCollioseTile(bullet);
            if(tile.beAttacked(bullet)){  //子弹击中有效，则移除子弹
                bullet.recycle();
                this.playerBulletList.splice(i,1);
                continue;  //跳出循环
            }
            
            //判断子弹击中坦克
            var tankLen = this.enemyTankList.length;
            for(var j=tankLen-1;j>=0;j--){
                var tank:BaseTank = this.enemyTankList[tankLen];
                if(tank.beAttacked(bullet)){
                    bullet.recycle();
                    this.playerBulletList.splice(i,1);
                    break;  //跳出循环
                }
            }  
        }
    }
    
    /**
     * 边界检测
     * @target 检测对象
     * @return 返回是否超越边界
     */ 
    private checkEdge(target):boolean{
        var halfWidth = target.width/2;
        var halfHeight = target.height/2;
        if(target.x - halfWidth < 0){
            return true;
        } else if(target.x + halfWidth > this.mapWidth){
            return true;
        }
        if(target.y + halfHeight > this.mapHeight){
            return true;
        }else if(target.y - halfHeight < 0){
            return true;
        }
        return false;
    }
    
    
    /**
     * 获取碰撞的地形
     * @target 检测对象
     * @return 返回碰撞的地形
     */ 
    private getCollioseTile(target):BaseTile{
        //下一步坐标
        var nextX = target.x + target.speedX;
        var nextY = target.y + target.speedY;
        //获取坐标所在行列
        var row: number = Math.floor(nextX/this.tileWidth);
        var col: number = Math.floor(nextY/this.tileWidth);
       //获取四周的地形
        var tileList = this.getRoundTile(row,col);
        //判断是否碰撞地形
        var len = tileList.length;
        var tile:BaseTile
        for(var i=0;i<len;i++){
            tile = tileList[i];
            if(tile != null && tile.type >= TileEnum.wall){  //不可行走地形
                if(target.getBounds().intersects(tile.getBounds())){
                    return tile;
                }
            }
        }
        return null;
    }
    
    //获取四周格子列表
    private getRoundTile(row:number, col:number){
        var tileList = [];

        if(row-1>=0){ //上方格子
            tileList.push(this.tileList[row-1][col]);
            if(col - 1 >= 0) { //左上格子
                tileList.push(this.tileList[row - 1][col-1]);
            }
            if(col + 1 < this.colMax) { //右上格子
                tileList.push(this.tileList[row - 1][col + 1]);
            }
        }

        if(col-1>=0){ //左边格子
            tileList.push(this.tileList[row][col-1]);
        }
        if(col+1<this.colMax){  //右边格子
            tileList.push(this.tileList[row][col+1]);
        }

        if(row+1<this.rowMax){  //下方格子
            tileList.push(this.tileList[row+1][col]);
            if(col - 1 >= 0) { //左下格子
                tileList.push(this.tileList[row + 1][col - 1]);
            }
            if(col + 1 < this.colMax) { //右下格子
                tileList.push(this.tileList[row + 1][col + 1]);
            }
        }
        return tileList;
    }
    
    
    
}









