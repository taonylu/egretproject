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
    public boomGroup:eui.Group;       //炸弹层
    
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
    public bulletList:Array<Bullet> = new Array<Bullet>();           //子弹
    private itemList:Array<BaseItem> = new Array<BaseItem>();        //道具
    
    private generateTimer:egret.Timer = new egret.Timer(1000);       //生成坦克计时器
    
    
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
        this.startGenerateTimer();
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
        this.moveBullet();      //移动子弹
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
        var levelData: LevelData = mapManager.levelList[mapManager.curLevel-1];
        var mapData = levelData.mapData;
        this.mapList = ArrayTool.copy2DArr(mapData);
        
        //创建地图
        var gameFactory: GameFactory = GameFactory.getInstance();
        var tileType: number;
        for(var i = 0;i < this.rowMax;i++) {
            for(var j = 0;j < this.colMax;j++) {
                tileType = mapData[i][j];
                if(tileType != 0) {
                    var tile = gameFactory.getTile(tileType);
                    tile.x = j * this.tileWidth + this.halfWidth;
                    tile.y = i * this.tileHeight + this.halfHeight;
                    tile.row = i;
                    tile.col = j;
                    if(tileType == TileEnum.river){
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
        var levelData:LevelData = mapManager.levelList[mapManager.curLevel-1];
        var birthPos = levelData.friendBirthPos;
        for(var i=0;i<userNum;i++){
            var player: PlayerTank = <PlayerTank>GameFactory.getInstance().getTank(TankEnum.player);
            player.y = birthPos[i][1]*this.tileWidth + this.tileWidth/2;
            player.x = birthPos[i][0]*this.tileHeight + this.tileWidth/2;
            player.openid = userManager.userList[i].openid;
            player.setPlayerNo(i+1); //p1 p2
            this.tankGroup.addChild(player);
            this.playerTankList.push(player);
        }
    }
    
    //移动玩家坦克
    private movePlayerTank(){
        var len = this.playerTankList.length;
        var player:BaseTank;
        var enemy:BaseTank;
        var otherPlayer:BaseTank;
        for(var i=0;i<len;i++){
            player = this.playerTankList[i];
            //射击
            player.updateShootCount();
            //坦克碰撞检测
            var enemyLen = this.enemyTankList.length;
            for(var j=0;j<enemyLen;j++){
                enemy = this.enemyTankList[j];
                if(player.checkCollision(enemy)){
                    return;
                }
            }
            var playerLen = this.playerTankList.length;
            for(var j = 0;j < playerLen;j++) {
                otherPlayer = this.playerTankList[j];
                if(otherPlayer != player && player.checkCollision(otherPlayer)) {
                    return;
                }
            }
            
            //地形碰撞检测
            if(this.getCollioseTile(player).length == 0 && this.checkEdge(player) == false) {
                
                player.move();
            }
        }
    }   
    
    //移动敌方坦克
    private moveEnemyTank(){
        var len = this.enemyTankList.length;
        var enemy:BaseTank;
        var player:BaseTank
        var otherEnemy:BaseTank;
        for(var i=0;i<len;i++){
            enemy = this.enemyTankList[i];
            //射击
            enemy.shoot();
            //坦克碰撞检测
            var playerLen = this.playerTankList.length;
            for(var j = 0;j < playerLen;j++) {
                player = this.playerTankList[j];
                if(enemy.checkCollision(player)) {
                    enemy.autoTurn();
                    return;
                }
            }
            var enemyLen = this.enemyTankList.length;
            for(var j = 0;j < enemyLen;j++) {
                otherEnemy = this.enemyTankList[j];
                if(otherEnemy != enemy && enemy.checkCollision(otherEnemy)) {
                    enemy.autoTurn();
                    return;
                }
            }
            //地形碰撞检测
            if(this.getCollioseTile(enemy).length == 0 && this.checkEdge(enemy) == false){
                enemy.autoMove();
            }else{ //遇到障碍，随机一个方向，优先往下
                enemy.autoTurn();
                this.modifyTankTurn(enemy);
            }
        }
    }
    
    //移动自己子弹
    private moveBullet(){
        var len = this.bulletList.length;
        var bullet:Bullet;
        for(var i=len-1;i>=0;i--){
            bullet = this.bulletList[i];
            
            //边界检测
            if(this.checkEdge(bullet)){
                this.playBoom(bullet);
                this.bulletList.splice(i,1);
                bullet.recycle();
                continue;
            }
            
            //判断子弹击中障碍物
            var collisionTileList = this.getCollioseTile(bullet);
            for(var j = 0;j < collisionTileList.length;j++){
                collisionTileList[j].beAttacked(bullet);
            }
            if(collisionTileList.length > 0){
                this.playBoom(bullet);
                bullet.recycle();
                this.bulletList.splice(i,1);
                continue;
            }
            
            //判断子弹击中敌方坦克
            if(bullet.type == TankEnum.player){
                var tankLen = this.enemyTankList.length;
                for(var j = tankLen - 1;j >= 0;j--) {
                    var tank: BaseTank = this.enemyTankList[j];
                    if(tank.checkCollision(bullet)) {
                        this.playBoom(bullet);
                        bullet.recycle();
                        this.bulletList.splice(i,1);
                        if(tank.beAttacked(bullet)){
                            tank.recycle();
                            this.enemyTankList.splice(j,1);
                            this.playTankBoom(tank);
                        }
                        break;  //跳出循环
                    }
                } 
            //判断子弹击中我方坦克
            }else{
                var tankLen = this.playerTankList.length;
                for(var j = tankLen - 1;j >= 0;j--) {
                    var tank: BaseTank = this.playerTankList[j];
                    if(tank.checkCollision(bullet)) {
                        this.playBoom(bullet);
                        bullet.recycle();
                        this.bulletList.splice(i,1);
                        if(tank.beAttacked(bullet)) {
                            tank.recycle();
                            this.playerTankList.splice(j,1);
                            this.playTankBoom(tank);
                        }
                        break;  //跳出循环
                    }
                } 
            }
            //子弹未击中坦克或者障碍物，或者超过边界
            bullet.move();
        }
    }
    
    //坦克转向碰到障碍物，且下一步目的地行走的地形为空，允许一定的碰撞偏差，让坦克转向成功
    private modifyTankTurn(tank:BaseTank){
        if(this.getCollioseTile(tank).length > 0) {
            var curCol = Math.floor(tank.x / this.tileWidth);
            var curRow = Math.floor(tank.y / this.tileHeight);
            var nextCol = curCol;
            var nextRow = curRow;
            var direction = tank.direction;
            if(direction == DirectionEnum.up) {
                nextRow -= 1;
            } else if(direction == DirectionEnum.down) {
                nextRow += 1;
            } else if(direction == DirectionEnum.left) {
                nextCol -= 1;
            } else if(direction == DirectionEnum.right) {
                nextCol += 1;
            }
            if(this.tileList[curRow][curCol] != null && this.tileList[curRow][curCol].canWalk == true){ //当前地形是障碍物，例如墙，修正位置会产生bug
                return;
            }
            if(curRow != nextRow || curCol != nextCol) {
                if(nextRow >= 0 && nextRow < this.rowMax && nextCol >= 0 && nextCol < this.colMax) {
                    var tile = this.tileList[nextRow][nextCol];
                    if(tile == null || tile.canWalk == true) {
                        tank.x = curCol * this.tileWidth + this.halfWidth + tank.speedX;
                        tank.y = curRow * this.tileHeight + this.halfHeight + tank.speedY;
                    }
                }
            }
        }
    }
    
    //播放爆炸动画
    private playBoom(bullet:Bullet){
        var boom:Boom = GameFactory.getInstance().getBoom();
        boom.x = bullet.x;
        boom.y = bullet.y;
        this.boomGroup.addChild(boom);
        boom.playBoom();
    }
    
    //播放坦克爆炸效果
    private playTankBoom(tank:BaseTank){
        var tankBoom: TankBoom = GameFactory.getInstance().getTankBoom();
        tankBoom.x = tank.x;
        tankBoom.y = tank.y;
        this.boomGroup.addChild(tankBoom);
        tankBoom.playBoom();
    }
    
    /**
     * 边界检测
     * @target 检测对象
     * @return 返回是否超越边界
     */ 
    private checkEdge(target):boolean{
        var nextX = target.x + target.speedX;
        var nextY = target.y + target.speedY;
        if(nextX - target.hitHalfWidth < 0){
            return true;
        } else if(nextX + target.hitHalfWidth > this.mapWidth){
            return true;
        }
        if(nextY - target.hitHalfWidth < 0 ){
            return true;
        } else if(nextY + target.hitHalfWidth > this.mapHeight){
            return true;
        }
        return false;
    }
    
    
    /**
     * 获取碰撞的地形
     * @target 检测对象
     * @return 返回碰撞的地形
     */ 
    private getCollioseTile(target){
        //碰撞的地形列表
        var collisionTileList = [];
        //获取坐标所在行列
        var col: number = Math.floor(target.x/this.tileWidth);
        var row: number = Math.floor(target.y/this.tileWidth);
       //获取四周的地形
        var tileList = this.getRoundTile(row,col);
        //判断是否碰撞地形
        var len = tileList.length;
        for(var i=0;i<len;i++){
            var tile = tileList[i];
            if(tile != null){  
                //子弹碰撞了地形
                if(target instanceof Bullet && tile.canHit){
                    if(tile.checkCollision(target)){
                        collisionTileList.push(tile);
                    }
                //坦克碰撞地形
                } else if((target instanceof Bullet) == false && tile.canWalk == false){
                    if(tile.checkCollision(target)) {
                        collisionTileList.push(tile);
                    }
                }  
            }
        }
        return collisionTileList;
    }
    
    //获取四周格子列表
    private getRoundTile(row:number, col:number){
        
        var tileList = [];
        //当前格子，子弹碰撞时需要，坦克移动时不需要
        tileList.push(this.tileList[row][col]);
        
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
    
    //开始生成坦克计时
    private startGenerateTimer(){
        this.generateTimer.addEventListener(egret.TimerEvent.TIMER, this.onGenerateTank, this);
        this.generateTimer.reset();
        this.generateTimer.start();
    }
    
    //生成坦克
    private onGenerateTank(){
        //获取当前坦克数量，判断上限
        var mapManager:MapManager = MapManager.getInstance();
        var levelData:LevelData = mapManager.levelList[mapManager.curLevel-1];
        var tankLimit = levelData.tankLimit;
        //测试
        tankLimit = 1;
        if(this.enemyTankList.length >= tankLimit){
            return;
        }
        //获取坦克剩余数量，随机生成
        var tankList = levelData.tankList;
        if(tankList.length > 0){
            var tankeType = tankList.pop();
        }else{
            return;
        }
        //获取坦克生成点，并在该点生成坦克
        var enemyBirthPos = levelData.enemyBirthPos;
        var birthPos = enemyBirthPos[NumberTool.getRandomInt(0,enemyBirthPos.length-1)];
        var tank:BaseTank = GameFactory.getInstance().getTank(tankeType);
        tank.x = birthPos[0] + this.halfWidth;
        tank.y = birthPos[1] + this.halfHeight;
        tank.autoTurn();
        this.tankGroup.addChild(tank);
        this.enemyTankList.push(tank);
    }
    
    //停止生成坦克
    private stopGenerateTimer(){
        this.generateTimer.removeEventListener(egret.TimerEvent.TIMER,this.onGenerateTank,this);
        this.generateTimer.stop();
    }
    
    //发送游戏结束
    public sendGameOver(){
        this.socket.sendMessage("gameOver");
    }
    
    //接收用户操作
    public revAction(data) {
        //console.log("rev action:",data);
        var actionType = data.actionType;
        var openid: string = data.openid;
        
        //获取用户tank
        for(var i=0;i<this.playerTankList.length;i++){
            var tank:BaseTank = this.playerTankList[i];
            if(tank.openid == openid){
                if(actionType == ActionEnum.shoot){
                    tank.shoot();
                }else{
                    tank.actionHandler(actionType); 
                    this.modifyTankTurn(tank);
                }
            }
        }
    }
    
}









