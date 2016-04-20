/**
 * 游戏场景
 * @author 
 *
 */
class GameScene extends BaseScene{
    private socket:ClientSocket;
    
    private topTileGroup:eui.Group;   //上层地形层
    private footTileGroup:eui.Group;  //下层地形层
    private tankGroup:eui.Group;      //坦克层
    public bulletGroup:eui.Group;     //子弹层
    
    private mapList;           //当前地图二维数组，存储地图数字
    private tileList;          //地形数组，存储BaseItem
    private rowMax:number;     //地图行列最大值
    private colMax:number; 
    private tileWidth:number;  //地图块高宽
    private tileHeight:number;
    private mapWidth:number;   //地图整个高宽
    private mapHeight:number;
    public halfWidth:number;   //地图块一半高宽
    public halfHeight:number;
    
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
        MapManager.getInstance().curLevel = 1;
        this.resetGame();
        this.startGame();
    }

    public onRemove(): void {
        
    }
    
    public startGame(){
        this.createMap();
        this.createPlayer();
        this.configListeners();
    }
    
    public nextLevel(){
        this.resetGame();
        this.startGame();
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
        //socket
        this.socket = ClientSocket.getInstance();
        //初始化地图数据
        var mapManager:MapManager = MapManager.getInstance();
        this.rowMax = mapManager.rowMax;
        this.colMax = mapManager.colMax;
        this.tileWidth = mapManager.tileWidth;
        this.tileHeight = mapManager.tileHeight;
        this.halfWidth = mapManager.halfWidth;
        this.halfHeight = mapManager.halfHeight;
        this.mapWidth = this.colMax*this.tileWidth;
        this.mapHeight = this.rowMax*this.tileHeight;
        //初始化地形数组
        this.tileList = [];
        for(var i = 0;i < this.rowMax;i++) {
            this.tileList[i] = [];
            for(var j = 0;j < this.colMax;j++) {
                this.tileList[i][j] = null;
            }
        }
    }
    
    //创建地图
    private createMap() {
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
                    tile.x = j * this.tileWidth + this.halfWidth;
                    tile.y = i * this.tileHeight + this.halfHeight;
                    tile.row = i;
                    tile.col = j;
                    if(tileType == TileEnum.speed || tileType == TileEnum.river){
                        this.footTileGroup.addChild(tile);
                    }else{
                        this.topTileGroup.addChild(tile);
                    }
                    this.tileList[i][j] = tile;
                }
            }
        }
    }
    
    //初始化玩家
    private createPlayer() {
        var userManager:UserManager = UserManager.getInstance();
        var userNum:number = userManager.getUserNum();
        var mapManager:MapManager = MapManager.getInstance();
        var createPos = mapManager.createPos;
        for(var i=0;i<userNum;i++){
            var player: BaseTank = GameFactory.getInstance().getTank(TankEnum.player);
            player.y = createPos[i][0]*this.tileWidth + this.tileWidth/2;
            player.x = createPos[i][1]*this.tileHeight + this.tileWidth/2;
            player.openid = userManager.userList[i].openid;
            this.tankGroup.addChild(player);
            this.playerTankList.push(player);
        }
    }
    
    //移动玩家坦克
    private movePlayerTank(){
        var len = this.playerTankList.length;
        var tank:PlayerTank;
        for(var i=0;i<len;i++){
            tank = this.playerTankList[i];
            if(this.getCollioseTile(tank) == null && this.checkEdge(tank) == false){
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
        var nextX = target.x + target.speedX;
        var nextY = target.y + target.speedY;
        if(nextX - this.halfWidth < 0){
            return true;
        } else if(nextX + this.halfWidth > this.mapWidth){
            return true;
        }
        if(nextY - this.halfHeight <= 0 ){
            return true;
        } else if(nextY + this.halfHeight >= this.mapHeight){
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
        var col: number = Math.floor(target.x/this.tileWidth);
        var row: number = Math.floor(target.y/this.tileWidth);
       //获取四周的地形
        var tileList = this.getRoundTile(row,col);
        //判断是否碰撞地形
        var len = tileList.length;
        var tile:BaseTile
        for(var i=0;i<len;i++){
            tile = tileList[i];
            if(tile != null && tile.type >= TileEnum.wall){  //不可行走地形
                if(Math.abs(nextX - tile.x) < this.tileWidth && Math.abs(nextY - tile.y) < this.tileHeight){
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
    
    //发送游戏结束
    public sendGameOver(){
        this.socket.sendMessage("gameOver");
    }
    
    //接收用户操作
    public revAction(data) {
        console.log("rev action:",data);
        var actionType: string = data.actionType;
        var openid: string = data.openid;
        
        //获取用户tank
        for(var i=0;i<this.playerTankList.length;i++){
            var tank:BaseTank = this.playerTankList[i];
            if(tank.openid == openid){
                tank.setDirection(actionType);
            }
        }
    }
    
}









