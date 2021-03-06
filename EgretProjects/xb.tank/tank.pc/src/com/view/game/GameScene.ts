/**
 * 游戏场景
 * @author 
 *
 */
class GameScene extends BaseScene{
    private socket:ClientSocket;
    private snd: SoundManager = SoundManager.getInstance(); //声音播放
    
    private topTileGroup:eui.Group;   //上层地形层
    private footTileGroup:eui.Group;  //下层地形层
    private tankGroup:eui.Group;      //坦克层
    public bulletGroup:eui.Group;     //子弹层
    public boomGroup:eui.Group;       //炸弹层
    public itemGroup:eui.Group;       //道具层
    private topGroup:eui.Group;       //顶层
    
    private stageLabel:eui.BitmapLabel;//第几关
    private enemyNumGroup: eui.Group;  //敌人数量图标
    private playerLifeGroup: eui.Group;//玩家生命图标 
    private enemyNumIconList: Array<EnemyNumIcon> = new Array<EnemyNumIcon>();  //敌人图标数组
    private p1Label:eui.Label;      //游戏右边p1,p2文本
    private p2Label:eui.Label;
    private p1LifeLabel:eui.Label;  //剩余生命
    private p2LifeLabel:eui.Label;
    private p1Icon:eui.Image;       //剩余生命图标
    private p2Icon:eui.Image;
    private gameOverIcon:eui.Image; //GameOver图标
    private initGameOverPos:egret.Point = new egret.Point(); //GameOver图标初始位置
    
    private mapList;           //当前地图二维数组，存储地图数字
    private tileList;          //地形数组
    private rowMax:number;     //地图行列最大值
    private colMax:number; 
    private tileWidth:number;  //地图块高宽
    private tileHeight:number;
    private mapWidth:number;   //地图整个高宽
    private mapHeight:number;
    public halfWidth:number;   //地图块一半高宽
    public halfHeight:number;
    private campRoundList = [[12,5],[11,5],[11,6],[11,7],[12,7]];  //基地周围的坐标，用于手动设置基地周围砖块为一半
    
    private playerTankList:Array<BaseTank> = new Array<BaseTank>();  //我方坦克
    private enemyTankList:Array<BaseTank> = new Array<BaseTank>();   //敌方坦克
    public bulletList:Array<Bullet> = new Array<Bullet>();           //子弹
    private itemList:Array<BaseItem> = new Array<BaseItem>();        //道具
    
    private generateTimer:egret.Timer = new egret.Timer(2000);       //生成坦克计时器
    private armorTimer:egret.Timer = new egret.Timer(1000);          //基地护甲计时
    private pauseTimer:egret.Timer = new egret.Timer(1000);          //暂停计时
    private waveTimer:egret.Timer = new egret.Timer(1000);           //波数计时器
    private bPlayerPause:boolean = false;                            //暂定道具标志
    private bEnemyPause:boolean = false;
    
    private gameStatus:GameStatus = GameStatus.waiting;   //游戏状态
    private totalScore = [0,0];                           //玩家总分数
    private playerLife = [0,0];                           //玩家生命
    private powerList = [1,1];                            //玩家枪威力，临时增加，用于保存到下一关
    
    private killList;                 //本关击杀坦克记录，二维数组 [玩家][坦克类型] = 击杀数
    private totalKillList;            //总击杀坦克记录，二维数组 [玩家][坦克类型] = 击杀数
    private wave:number = 0;          //第几波
    private bEndLess:boolean = false; //无尽模式
    private waveLabel:eui.BitmapLabel;//第几波
    
	public constructor() {
        super("GameSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        this.initView();
    }

    public onEnable(): void {
        window["changeBgColor"](GameConst.color2);
        this.nextLevel();   //下一关
    }

    public onRemove(): void {
        
    }
    
    public nextLevel() {
        this.gameStatus = GameStatus.waiting;
        //第一关需要重置地图
        var map: MapManager = MapManager.getInstance();
        if(map.curLevel == 1) {
            this.initMap();     //初始化地图
            this.initKillList();  //初始化击杀列表
            this.waveLabel.text = "";   //波数文本清理
            this.totalScore = [0,0];  //玩家分数清零
            this.powerList = [1,1];   //玩家枪威力初始化
        }
        //判断无尽关卡
        if(map.curLevel >= map.levelLimit && this.bEndLess == false){
            this.bEndLess = true;
            this.wave = 1;
            this.waveLabel.text = "WAVE." + this.wave;
            this.startWaveTimer();
        }else {
            this.bEndLess = false;
        }
        //第几关
        this.stageLabel.text = map.curLevel + "";
        //开始游戏
        this.resetGame();
        this.startGame();
        this.gameStatus = GameStatus.gameing;
    }
    
    public startGame(){
        this.snd.play(this.snd.start_stage);
        this.createMap();            //创建地图
        this.setEnemyNumIcon();      //设置敌方生命
        this.setPlayerIcon();        //设置玩家生命
        this.initPlayer();           //创建我方坦克
        this.configListeners();      //监听移动和碰撞检测
        this.startGenerateTimer();   //生成坦克计时器
    }
    
    public resetGame() {
        this.resetGameValue();     //重置游戏变量
        this.resetGameOverIcon();  //重置游戏结束图标
        this.clearEnemyNumIcon();  //清理敌方生命图标
        this.clearPlayerIcon();    //清理玩家生命
        this.clearEnemyTank();     //清理敌方坦克
        this.clearPlayerTank();    //清理我方坦克
        this.clearBullet();        //清理子弹
        this.clearItem();          //清理道具
        this.clearTile();          //清理地形
    }
    
    public gameOver(){
        console.log("game over");
        if(this.gameStatus != GameStatus.gameing){  //防止多次触发gameover
            return;
        }
        
        this.gameStatus = GameStatus.gameover;
        this.snd.play(this.snd.lose); //播放失败音效
        this.playGameOverAnim();      //播放游戏结束图标
        this.stopWaveTimer();         //停止波数计时
        //等待一段时间，显示结果页面
        var self:GameScene = this;
        egret.Tween.get(this).wait(2000).call(function() {
            self.sendGameOver();
        });
    }
    
    public gameWin(){
        console.log("game win");
        if(this.gameStatus != GameStatus.gameing){ //防止游戏结束后，捡到炸弹或其他情况导致重复触发gameover
            return;
        }
        if(this.bEndLess){ //无尽模式，重置新的levelData
            this.nextWave();
        }else{
            this.gameStatus = GameStatus.gameover;
            //临时增加，保存枪威力
            for(var i=0;i<this.playerTankList.length;i++){
                var tank: PlayerTank = <PlayerTank>this.playerTankList[i];
                this.powerList[tank.playerNo-1] = tank.power;
            }
            //等待一段时间，显示结果页面
            var self: GameScene = this;
            egret.Tween.get(this).wait(2000).call(function() {
                self.deConfigListeners();     //停止移动和碰撞检测
                self.stopGenerateTimer();     //停止生成坦克计时
                self.stopArmorTimer();        //停止基地护甲计时
                self.stopPauseTimer();        //停止暂停道具计时
                self.backTankLife();          //计算场上坦克生命
                self.clearPlayerTank();       //提前清理坦克
                self.clearEnemyTank();
                LayerManager.getInstance().runScene(GameManager.getInstance().resultScene);
                var data = {
                    "killList": self.killList,
                    "totalKillList": self.totalKillList,
                    "totalScore":self.totalScore,
                    "stage": MapManager.getInstance().curLevel,
                    "wave": self.wave,
                    "historyScore": GameConst.historyScore
                };
                GameManager.getInstance().resultScene.setResult(data,false);
            });
        }
    }
    
    //下一波
    private nextWave(){
        this.wave += 1;
        this.waveLabel.text = "WAVE." + this.wave;
        MapManager.getInstance().getEndLessLevelData(this.wave);
        this.startWaveTimer();
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
        this.updateShoot();
    }
    
    //初始化地图
    private initMap(){
        MapManager.getInstance().initalize();  //因为地图levelData某些引用数据在游戏中被改变，这里每次都重置一次
    }
    
    //初始化击杀列表
    private initKillList(){
        this.killList = [];
        this.totalKillList = [];
        for(var i = 0;i < 4;i++) {
            this.killList[i] = [];
            this.totalKillList[i] = [];
            for(var j=0;j<4;j++){
                this.killList[i][j] = 0;
                this.totalKillList[i][j] = 0;
            }
        }
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
        this.mapList = [];
        for(var i = 0;i < this.rowMax;i++) {
            this.tileList[i] = [];
            this.mapList[i] = [];
            for(var j = 0;j < this.colMax;j++) {
                this.tileList[i][j] = null;
                this.mapList[i][j] = 0;
            }
        }
        //初始化gameOver图片位置
        this.initGameOverPos.x = this.gameOverIcon.x;
        this.initGameOverPos.y = this.gameOverIcon.y;
    }
    
    //重置游戏变量
    private resetGameValue(){
        //重置标志位
        this.bPlayerPause = false;
        this.bEnemyPause = false;
        //重置本关击杀列表
        for(var i=0;i<2;i++){
            for(var j=0;j<4;j++){
                this.killList[i][j] = 0;
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
        //设置基地周边的墙
        this.setCampWall();
    }
    
    //基地附近的砖块是只有一半的，因为地图编辑器没做一半的砖块,这里取基地固定位置，然后手动设置砖块为一半
    private setCampWall(){
        var camp: Camp = this.tileList[12][6];
        if(camp == null){
            return;
        }
        var len = this.campRoundList.length;
        for(var i = 0;i < len;i++) {
            var p = this.campRoundList[i];
            //清理原有非砖块地形
            var tile: BaseTile = this.tileList[p[0]][p[1]];
            if(tile != null && tile.type != TileEnum.wall) {
                tile.recycle();
                //新建地形
                var wall: Wall = GameFactory.getInstance().getTile(TileEnum.wall);
                wall.x = p[1] * this.tileWidth + this.halfWidth;
                wall.y = p[0] * this.tileHeight + this.halfHeight;
                wall.row = p[0];
                wall.col = p[1];
                this.footTileGroup.addChild(wall);
                this.tileList[p[0]][p[1]] = wall;
                this.mapList[p[0]][p[1]] = TileEnum.wall;
            }
        }
        //设置地形为一半
        this.tileList[camp.row][camp.col - 1] && this.tileList[camp.row][camp.col - 1].setTileHalf(3);
        this.tileList[camp.row - 1][camp.col - 1] && this.tileList[camp.row - 1][camp.col - 1].setTileHalf(5);
        this.tileList[camp.row - 1][camp.col] && this.tileList[camp.row - 1][camp.col].setTileHalf(1);
        this.tileList[camp.row - 1][camp.col + 1] && this.tileList[camp.row - 1][camp.col + 1].setTileHalf(4);
        this.tileList[camp.row][camp.col + 1] && this.tileList[camp.row][camp.col + 1].setTileHalf(2);
    }
    
    //基地附近为钢铁
    private setCampSteel(){
        var camp: Camp = this.tileList[12][6];
        if(camp == null) {
            return;
        }
        var len = this.campRoundList.length;
        for(var i=0;i<len;i++){
            var p = this.campRoundList[i];
            //清理原有地形
            var tile: BaseTile = this.tileList[p[0]][p[1]];
            if(tile != null){
                tile.recycle();
            }
            //新建地形
            var steel:Steel = GameFactory.getInstance().getTile(TileEnum.steel);
            steel.x = p[1] * this.tileWidth + this.halfWidth;
            steel.y = p[0] * this.tileHeight + this.halfHeight;
            steel.row = p[0];
            steel.col = p[1];
            this.footTileGroup.addChild(steel);
            this.tileList[p[0]][p[1]] = steel;
            this.mapList[p[0]][p[1]] = TileEnum.steel;
        }
        //设置地形为一半
        this.tileList[camp.row][camp.col - 1].setTileHalf(3);
        this.tileList[camp.row - 1][camp.col - 1].setTileHalf(5);
        this.tileList[camp.row - 1][camp.col].setTileHalf(1);
        this.tileList[camp.row - 1][camp.col + 1].setTileHalf(4);
        this.tileList[camp.row][camp.col + 1].setTileHalf(2);
    }
    
    //清理基地附近地形
    private setCampNothing(){
        var camp: Camp = this.tileList[12][6];
        if(camp == null) {
            return;
        }
        var len = this.campRoundList.length;
        for(var i = 0;i < len;i++) {
            var p = this.campRoundList[i];
            //清理原有地形
            var tile: BaseTile = this.tileList[p[0]][p[1]];
            if(tile != null) {
                tile.recycle();
            }
            this.tileList[p[0]][p[1]] = null;
            this.mapList[p[0]][p[1]] = 0;
        }
    }
    
    //初始化玩家
    private initPlayer(){
        var life1 = this.playerLife[0];
        var life2 = this.playerLife[1];
        var userNum =UserManager.getInstance().getUserNum();
        
        if(userNum >= 1){   //单人
            if(life1 >= 1) {
                this.createPlayer(1);
                this.reducePlayerIcon(1);
            } else if(life2 >= 2) {   //临时增加，借命
                this.createPlayer(1);
                this.reducePlayerIcon(2);
            }
        }
        
        if(userNum == 2){  //双人
            if(life2 >= 1) {
                this.createPlayer(2);
                this.reducePlayerIcon(2);
            } else if(life1 >= 1) { //临时增加，借命
                this.createPlayer(2);
                this.reducePlayerIcon(1);
            }
        }
        
    }
    
    //创建玩家
    private createPlayer(playerNo:number) {
        var userManager:UserManager = UserManager.getInstance();
        var userNum:number = userManager.getUserNum();
        var mapManager:MapManager = MapManager.getInstance();
        var levelData:LevelData = mapManager.levelList[mapManager.curLevel-1];
        var birthPos = levelData.friendBirthPos;
        var player: PlayerTank = <PlayerTank>GameFactory.getInstance().getTank(TankEnum.player);
        player.y = birthPos[playerNo-1][1]*this.tileWidth + this.tileWidth/2;
        player.x = birthPos[playerNo-1][0]*this.tileHeight + this.tileWidth/2;
        player.openid = userManager.userList[playerNo-1].openid;
        player.setPlayerNo(playerNo); //p1 p2
        this.tankGroup.addChild(player);
        this.playerTankList.push(player);
        player.playShield(player.birthShieldTime);
        
        //临时增加，恢复上一关枪威力
        player.setPower(this.powerList[playerNo - 1]);
    }
    
    //设置敌人图标数量
    private setEnemyNumIcon(){
        if(this.bEndLess){
            
        }else{
            var levelData: LevelData = MapManager.getInstance().getCurLevelData();
            var tankList = levelData.tankList;
            var enemyNum = tankList.length;
            var row = Math.ceil(enemyNum / 2); //一行2个，判断右几行
            for(var i = 0;i < row;i++) {
                for(var j = 0;j < 2;j++) {  //1行2个图标
                    if((i * 2 + j) >= enemyNum) {  //奇数坦克时，会创建多余的
                        return;
                    }
                    var enemyIcon: EnemyNumIcon = new EnemyNumIcon();
                    enemyIcon.x = enemyIcon.width * j + 3 * j; //3行列间隔
                    enemyIcon.y = enemyIcon.height * i + 3 * i;
                    this.enemyNumIconList.push(enemyIcon);
                    this.enemyNumGroup.addChild(enemyIcon);
                }
            }
        }
        
    }
    
    //清理敌人数量图标
    private clearEnemyNumIcon(){
        var len = this.enemyNumIconList.length;
        for(var i=0;i<len;i++){
            var enemyIcon = this.enemyNumIconList[i];
            enemyIcon.parent && enemyIcon.parent.removeChild(enemyIcon);
        }
        this.enemyNumIconList.length = 0;
    }
    
    //减少一个敌人数量图标，返回敌人数量是否为0
    private reduceEnemyNumIcon(){
        var len = this.enemyNumIconList.length;
        if(len > 0){
            var enemyIcon = this.enemyNumIconList.pop();
            enemyIcon.parent && enemyIcon.parent.removeChild(enemyIcon);
        }
    }
    
    //设置玩家生命图标
    private setPlayerIcon(){
        if(MapManager.getInstance().curLevel == 1){  //只需要设置一次
            var userNum = UserManager.getInstance().getUserNum();
            var playerLife = MapManager.getInstance().playerSet.life;
            
            if(userNum >= 1) {  //1个玩家
                this.p1Label.visible = true;
                this.p1LifeLabel.visible = true;
                this.p1Icon.visible = true;
                this.p1LifeLabel.text = playerLife + "";
                this.playerLife = [playerLife,0];
            }
            if(userNum == 2) { //2个玩家
                this.p2Label.visible = true;
                this.p2LifeLabel.visible = true;
                this.p2Icon.visible = true;
                this.p2LifeLabel.text = playerLife + "";
                this.playerLife = [playerLife,playerLife];
            }
        }
    }
    
    //减少玩家生命文本
    private reducePlayerIcon(playerNo:number,reduceLife:number=1){
        if(playerNo == 1){
            this.playerLife[0] -= reduceLife;
            this.p1LifeLabel.text = this.playerLife[0] + "";
        }else if(playerNo == 2){
            this.playerLife[1] -= reduceLife;
            this.p2LifeLabel.text = this.playerLife[1] + "";
        }
    }
    
    //检查玩家是否全死
    private checkPlayerAllDie():boolean{
        var userNum = UserManager.getInstance().getUserNum();
        if(userNum == 1){
            var life = this.playerLife[0];
            if(life <= 0 && this.playerTankList.length == 0){ //生命文本为<=0并且在场没有我方坦克
                return true;
            }
        }else if(userNum ==2){
            var life1 = this.playerLife[0];
            var life2 = this.playerLife[1];
            if(life1 <= 0 && life2 <= 0 && this.playerTankList.length == 0) {
                return true;
            }
        }
        return false;
    }
    
    //清理游戏玩家生命图标
    private clearPlayerIcon(){
        if(MapManager.getInstance().curLevel == 1){ //只需清理一次
            this.p1Label.visible = false;
            this.p2Label.visible = false;
            this.p1LifeLabel.visible = false;
            this.p2LifeLabel.visible = false;
            this.p1Icon.visible = false;
            this.p2Icon.visible = false;
            this.p1LifeLabel.text = "0";
            this.p2LifeLabel.text = "0";
        }
    }
    
    //检查地方坦克是否全部击毁
    private checkEnemyAllDie():boolean{
        //已生成坦克和剩余坦克都为0，则坦克全灭
        if(this.enemyTankList.length ==0 && this.enemyNumIconList.length == 0){
            return true;
        }
        return false;
    }
    
    //重置游戏结束图标
    private resetGameOverIcon(){
        this.gameOverIcon.x = this.initGameOverPos.x;
        this.gameOverIcon.y = this.initGameOverPos.y;
        this.gameOverIcon.visible = false;
    }
    
    //播放游戏结束图标动画
    private playGameOverAnim(){
        this.gameOverIcon.visible = true;
        egret.Tween.get(this.gameOverIcon).to({y:this.initGameOverPos.y - 400},1000);
    }
    
    //清理敌方坦克
    private clearEnemyTank(){
        var len = this.enemyTankList.length;
        for(var i=0;i<len;i++){
            var tank:BaseTank = this.enemyTankList[i];
            tank.recycle();
        }
        this.enemyTankList.length = 0;
    }
    
    //清理我方坦克
    private clearPlayerTank(){
        var len = this.playerTankList.length;
        for(var i=0;i<len;i++){
            var tank:BaseTank = this.playerTankList[i];
            tank.recycle();
        }
        this.playerTankList.length = 0;
    }
    
    //游戏结束时，检查坦克剩余生命，将场上的坦克生命加回去
    private backTankLife(){
        var len = this.playerTankList.length;
        for(var i=0;i<len;i++){
            var tank:PlayerTank = (<PlayerTank>this.playerTankList[i]);
            this.reducePlayerIcon(tank.playerNo, -1);
        }
    }
    
    //清理子弹
    private clearBullet(){
        var len = this.bulletList.length;
        for(var i=0;i<len;i++){
            var bullet:Bullet = this.bulletList[i];
            bullet.recycle();
        }
        this.bulletList.length = 0;
    }
    
    //清理道具
    private clearItem(){
        var len = this.itemList.length;
        for(var i=0;i<len;i++){
            var item:BaseItem = this.itemList[i];
            item.recycle();
        }
        this.itemList.length = 0;
    }
    
    //清理地形
    private clearTile(){
        for(var i=0;i<this.rowMax;i++){
            for(var j=0;j<this.colMax;j++){
                var tile:BaseTile = this.tileList[i][j];
                tile && tile.recycle();
                this.tileList[i][j] = null;
                this.mapList[i][j] = 0;
            }
        }  
    }
    
    //移动玩家坦克
    private movePlayerTank(){
        if(this.bPlayerPause) {
            return;
        } 
        var len = this.playerTankList.length;
        var player:BaseTank;
        var enemy:BaseTank;
        var otherPlayer:BaseTank;
        for(var i=0;i<len;i++){
            player = this.playerTankList[i];
            //我方坦克和敌方坦克碰撞检测
            var enemyLen = this.enemyTankList.length;
            for(var j=0;j<enemyLen;j++){
                enemy = this.enemyTankList[j];
                if(player.checkCollision(enemy) == false){
                    if(player.checkNextCollision(enemy)){
                        return;
                    }
                }
            }
            //我方坦克和我方坦克碰撞检测
            var playerLen = this.playerTankList.length;
            for(var j = 0;j < playerLen;j++) {
                otherPlayer = this.playerTankList[j];
                if(otherPlayer != player) {
                    if(player.checkCollision(otherPlayer) == false) {
                        if(player.checkNextCollision(otherPlayer)) {
                            return;
                        }
                    }
                }
            }
            //地形碰撞检测
            if(this.getCollioseTile(player).length == 0 && this.checkEdge(player) == false) {
                player.move();
            }else{
                
            }
            
            //道具碰撞
            var itemLen = this.itemList.length;
            for(var j=itemLen-1;j>=0;j--){
                var item:BaseItem = this.itemList[j];
                if(item.checkCollision(player)){
                    if(this.checkItemEffect(item,player)){
                        //播放声音
                        this.snd.play(this.snd.gift);
                        //显示得分
                        this.playScoreLabel(item, 500, (<PlayerTank>player).playerNo);  //一个道具500分，暂时写死
                        //移除道具
                        this.itemList.splice(j,1);
                        item.recycle(); 
                        //如果是炸弹，则判断是否游戏结束
                        if(item.type == ItemEnum.boom) {  
                            if(this.checkEnemyAllDie()) {
                                this.gameWin();
                                return;
                            }
                        }
                    }
                }
            }
        }
    }   
    
    //移动敌方坦克
    private moveEnemyTank(){
        if(this.bEnemyPause){
            return;
        } 
        var len = this.enemyTankList.length;
        var enemy:BaseTank;
        var player:BaseTank
        var otherEnemy:BaseTank;
        for(var i=0;i<len;i++){
            enemy = this.enemyTankList[i];
            //射击
            enemy.shoot();
            //我方坦克和敌方坦克
            var playerLen = this.playerTankList.length;
            for(var j = 0;j < playerLen;j++) {
                player = this.playerTankList[j];
                if(enemy.checkCollision(player) == false) {
                    if(enemy.checkNextCollision(player)){
                        enemy.autoTurn();
                        enemy = null;
                        break;
                    }
                }
            }
            if(enemy == null){
                continue;
            }
            //敌方坦克和敌方坦克
            var enemyLen = this.enemyTankList.length;
            for(var j = 0;j < enemyLen;j++) {
                otherEnemy = this.enemyTankList[j];
                if(otherEnemy != enemy) {
                    if(enemy.checkCollision(otherEnemy) == false){
                        if(enemy.checkNextCollision(otherEnemy)){
                            enemy.autoTurn();
                            enemy = null;
                            break;
                        }
                    }
                }
            }
            if(enemy == null){
                continue;
            }
            
            //地形碰撞检测
            if(this.getCollioseTile(enemy).length == 0 && this.checkEdge(enemy) == false){
                enemy.autoMove();
            }else{ //遇到障碍，随机一个方向，优先往下
                enemy.autoTurn();
                this.modifyTankTurn(enemy);
            }
            
            //道具碰撞
            var itemLen = this.itemList.length;
            for(var j = itemLen - 1;j >= 0;j--) {
                var item: BaseItem = this.itemList[j];
                if(item.checkCollision(enemy)) {
                    if(this.checkItemEffect(item,enemy)) {
                        //播放声音
                        this.snd.play(this.snd.gift);
                        //移除道具
                        this.itemList.splice(j,1);
                        item.recycle();
                        //如果是炸弹，则判断是否游戏结束
                        if(item.type == ItemEnum.boom){  
                            if(this.checkPlayerAllDie()){
                                this.gameOver();
                                return;
                            }
                            //坦克重生
                            this.initPlayer();
                        }
                    }
                }
            }
        }
    }
    
    //刷新玩家射击时间
    private updateShoot(){
        var len = this.playerTankList.length;
        for(var i = 0;i < len;i++) {
            var player = this.playerTankList[i];
            player.updateShootCount();
        }
    }
    
    //移动自己子弹
    private moveBullet(){
        var len = this.bulletList.length;
        var bullet:Bullet;
        var bHit:boolean = false;  //临时增加爱，用于判断是否击中地形中的小块
        for(var i=len-1;i>=0;i--){
            bullet = this.bulletList[i];
            bHit = false;
            
            //判断子弹击中障碍物
            var collisionTileList = this.getCollioseTile(bullet);
            for(var j = 0;j < collisionTileList.length;j++){
                var tile:BaseTile = collisionTileList[j];
                if(tile.type == TileEnum.wall){
                    bHit = tile.beAttacked(bullet);
                    if(tile.life <= 0){
                        this.mapList[tile.row][tile.col] = 0;
                        this.tileList[tile.row][tile.col] = null;
                        tile.recycle();
                    }
                } else if(tile.type == TileEnum.steel){
                    bHit = tile.beAttacked(bullet);
                    if(tile.life <= 0) {
                        this.mapList[tile.row][tile.col] = 0;
                        this.tileList[tile.row][tile.col] = null;
                        tile.recycle();
                    }
                    this.snd.play(this.snd.fire_reach_wall);
                } else if(tile.type == TileEnum.camp){
                    if(this.gameStatus == GameStatus.gameing && tile.beAttacked(bullet)){
                        this.snd.play(this.snd.tank_boom);
                        this.playBoom(bullet);
                        this.playTankBoom(tile.x,tile.y);
                        bullet.recycle();
                        this.bulletList.splice(i,1);
                        (<Camp>tile).setGameOver();
                        this.gameOver();
                        return;
                    }
                }
            }
            if(bHit){
                bullet.owner.bulletCount--;   //临时增加，用于计算子弹射出数目
                this.playBoom(bullet);
                bullet.recycle();
                this.bulletList.splice(i,1);
                continue;  //子弹已销毁，跳过本次循环
            }
            
            //判断子弹和子弹碰撞
            var jLen = this.bulletList.length;
            for(var j=i-1;j>=0;j--){
                var jBullet:Bullet = this.bulletList[j];
                if(bullet != jBullet){
                    if(bullet.checkCollision(jBullet)){
                        bullet.owner.bulletCount--; //临时增加，用于计算子弹射出数目
                        jBullet.owner.bulletCount--;
                        bullet.recycle();
                        this.bulletList.splice(i,1);
                        jBullet.recycle();
                        this.bulletList.splice(j,1);
                        i--;  //销毁了两颗子弹，子弹数组减少了2
                        bullet = null;
                        break;
                    } 
                }
            }
            if(bullet == null){
                continue;  //子弹已销毁，则跳过本次循环
            }
            
            //边界检测
            if(this.checkEdge(bullet)) {
                if(bullet.type == TankEnum.player) {  //我方坦克击中边界，播放音效
                    this.snd.play(this.snd.fire_reach_wall);
                }
                bullet.owner.bulletCount--; //临时增加，用于计算子弹射出数目
                this.playBoom(bullet);
                this.bulletList.splice(i,1);
                bullet.recycle();
                continue;  //子弹已销毁，跳过本次循环
            }
            
            //判断子弹击中敌方坦克
            if(bullet.type == TankEnum.player){
                var tankLen = this.enemyTankList.length;
                for(var j = tankLen - 1;j >= 0;j--) {
                    var tank: BaseTank = this.enemyTankList[j];
                    if(bullet.checkCollision(tank)) {
                        //掉落道具判断
                        if(tank.isHaveItem){
                            tank.isHaveItem = false;
                            this.clearItem(); //道具不能同时存在多个
                            this.createItem();
                            this.snd.play(this.snd.gift);
                        }
                        //击毁，销毁坦克
                        if(tank.beAttacked(bullet)){
                            //声音
                            this.snd.play(this.snd.tank_boom);
                            //显示得分
                            this.playScoreLabel(tank,tank.type * 100,(<PlayerTank>bullet.owner).playerNo);
                            //移除坦克
                            tank.recycle();
                            this.enemyTankList.splice(j,1);
                            this.playTankBoom(tank.x, tank.y);
                            //记录击杀数
                            var playerNo = (<PlayerTank>bullet.owner).playerNo;
                            this.killList[playerNo-1][tank.type-1] +=1;  //玩家1-2，坦克类型1-4，-1是数组下标
                            this.totalKillList[playerNo-1][tank.type-1] += 1;
                            //敌方坦克全灭
                            if(this.checkEnemyAllDie()){
                                //销毁子弹
                                bullet.owner.bulletCount--; //临时增加，用于计算子弹射出数目
                                this.playBoom(bullet);
                                bullet.recycle();
                                this.bulletList.splice(i,1);
                                this.gameWin();
                                return;
                            }
                        //未击毁坦克，则改变坦克形态
                        }else{
                            tank.playMoveAnim();
                            this.bEnemyPause && tank.stop();
                        }
                        //击中，销毁子弹
                        bullet.owner.bulletCount--; //临时增加，用于计算子弹射出数目
                        this.playBoom(bullet);
                        bullet.recycle();
                        this.bulletList.splice(i,1);
                        break;  //跳出循环
                    }
                } 
            //判断子弹击中我方坦克
            }else{
                var tankLen = this.playerTankList.length;
                for(var j = tankLen - 1;j >= 0;j--) {
                    var tank: BaseTank = this.playerTankList[j];
                    if(bullet.checkCollision(tank)) {
                        //击毁判断
                        if(tank.beAttacked(bullet)) {
                            //声音
                            this.snd.play(this.snd.tank_boom);
                            //移除坦克
                            this.powerList[(<PlayerTank>tank).playerNo - 1] = 1;
                            tank.actionHandler(ActionEnum.stopMove);
                            tank.recycle();
                            this.playerTankList.splice(j,1);
                            this.playTankBoom(tank.x, tank.y);
                            //我方坦克全灭
                            if(this.checkPlayerAllDie()){
                                //销毁子弹
                                bullet.owner.bulletCount--; //临时增加，用于计算子弹射出数目
                                this.playBoom(bullet);
                                bullet.recycle();
                                this.bulletList.splice(i,1);
                                this.gameOver();
                                return;
                            }
                            //坦克重生
                            var playerNo = (<PlayerTank>tank).playerNo;
                            var life1 = this.playerLife[0];
                            var life2 = this.playerLife[1];
                            if(playerNo == 1){
                                if(life1 >=1){  
                                    this.createPlayer(1);
                                    this.reducePlayerIcon(1);
                                }else if(life2 >= 1){   //临时增加，借命
                                    this.createPlayer(1);
                                    this.reducePlayerIcon(2);
                                }
                            }else if(playerNo == 2){
                                if(life2 >= 1){
                                    this.createPlayer(2);
                                    this.reducePlayerIcon(2);
                                }else if(life1 >= 1){
                                    this.createPlayer(2);
                                    this.reducePlayerIcon(1);
                                }
                            }   
                        }
                        //销毁子弹
                        bullet.owner.bulletCount--; //临时增加，用于计算子弹射出数目
                        this.playBoom(bullet);
                        bullet.recycle();
                        this.bulletList.splice(i,1);
                        break;  //跳出循环
                    }
                } 
            }
            //子弹移动
            bullet.move();
        }
    }
    
    //创建道具
    private createItem(){
        //根据地图道具配置随机生成道具类型
        var mapMananger:MapManager = MapManager.getInstance();
        var levelData = mapMananger.levelList[mapMananger.curLevel - 1];
        var itemType:ItemEnum = levelData.getRandomItem();
        var item:BaseItem = GameFactory.getInstance().getItem(itemType);
        //获取地图空位置
        var emptyTileList = [];
        var len = this.mapList.length;
        for(var i=0;i<this.rowMax;i++){
            for(var j=0;j<this.colMax;j++){
                if(this.mapList[i][j] == 0){
                    emptyTileList.push([i,j]);
                }
            }
        }
        //随机空位置，防止道具
        var emptyPos = emptyTileList[NumberTool.getRandomInt(0, emptyTileList.length-1)];
        item.y = emptyPos[0]*this.tileWidth + this.halfWidth;
        item.x = emptyPos[1]*this.tileWidth + this.halfWidth;
        item.startFlash();
        this.itemGroup.addChild(item);
        this.itemList.push(item);
    }
    
    //道具生效，返回道具是否生效
    private checkItemEffect(item:BaseItem, tank:BaseTank):boolean{
        if(item.type == ItemEnum.shield){   //护盾
            if(tank.type == TankEnum.player){
                var player: PlayerTank = <PlayerTank>tank;
                player.playShield(player.itemShieldTime);
            }else{
                return false;
            }
        }else if(item.type == ItemEnum.gun){  //直接升级到3
            tank.setPower(3);
        }else if(item.type == ItemEnum.star){ //升1级
            tank.setPower(tank.power + 1);
        }else if(item.type == ItemEnum.armor){ //基地护甲
            if(tank.type == TankEnum.player){
                this.setCampSteel();
                this.startArmorTimer();
            } else{
                this.setCampNothing();
                this.stopArmorTimer();
            }
        }else if(item.type == ItemEnum.life){ //生命增加
            if(tank.type == TankEnum.player){
                this.snd.play(this.snd.gift_life);
                this.reducePlayerIcon((<PlayerTank>tank).playerNo,-1);
            }else{
                return false;
            }
        }else if(item.type == ItemEnum.boom){ //炸弹
            this.snd.play(this.snd.gift_bomb);
            if(tank.type == TankEnum.player){
                var len = this.enemyTankList.length;
                var playerNO = (<PlayerTank>tank).playerNo;
                for(var i=0;i<len;i++){
                    var tank:BaseTank = this.enemyTankList[i];
                    this.killList[playerNO-1][tank.type-1] += 1; //增加拾取炸弹炸死的敌军，也算击杀数
                    tank.recycle();
                    this.playTankBoom(tank.x,tank.y);
                }
                this.enemyTankList.length = 0;
            }else{
                var len = this.playerTankList.length;
                for(var i=0;i<len;i++){
                    var tank:BaseTank = this.playerTankList[i];
                    tank.recycle();
                    this.playTankBoom(tank.x,tank.y);
                    //this.reducePlayerIcon((<PlayerTank>tank).playerNo);
                }
                this.powerList = [1,1];
                this.playerTankList.length = 0;
            }
        }else if(item.type == ItemEnum.pause){ //暂定
            if(tank.type == TankEnum.player){
                this.bEnemyPause = true;
                this.startPauseTimer();
                var len = this.enemyTankList.length;
                for(var i=0;i<len;i++){
                    var tank:BaseTank = this.enemyTankList[i];
                    tank.stop();
                }
            }else{
                this.bPlayerPause = true;
                this.startPauseTimer();
                var len = this.playerTankList.length;
                for(var i = 0;i < len;i++) {
                    var tank: BaseTank = <PlayerTank>this.playerTankList[i];
                    (<PlayerTank>tank).pause();
                }
            }
        }
        return true;
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
            //当前地形是障碍物，例如墙，修正转向位置会产生bug，会卡在墙里。除非额外判断16小砖的位置
            if(this.tileList[curRow][curCol] != null && this.tileList[curRow][curCol].canWalk == false){ 
                return;
            }
            if(curRow != nextRow || curCol != nextCol) {
                if(nextRow >= 0 && nextRow < this.rowMax && nextCol >= 0 && nextCol < this.colMax) {
                    var tile = this.tileList[nextRow][nextCol];
                    if(tile == null || tile.canWalk == true) {
                        var tempX = tank.x;
                        var tempY = tank.y;
                        tank.x = curCol * this.tileWidth + this.halfWidth + tank.speedX;
                        tank.y = curRow * this.tileHeight + this.halfHeight + tank.speedY;
                        //临时增加，防止敌方坦克在修改位置时，发生穿过我方坦克的问题
                        var len = this.playerTankList.length;  
                        for(var i=0;i<len;i++){
                            var playerTank:BaseTank = this.playerTankList[i];
                            if(tank != playerTank && tank.checkCollision(playerTank)){
                                tank.x = tempX;
                                tank.y = tempY;
                                break;
                            }
                        }
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
    
    //显示得分
    private playScoreLabel(target, score:number, playerNo:number){
        var scoreLabel:ScoreLabel = GameFactory.getInstance().getScoreLabel();
        scoreLabel.x = target.x;
        scoreLabel.y = target.y;
        scoreLabel.setScoreLabel(score);
        this.topGroup.addChild(scoreLabel);
        //得分
        this.totalScore[playerNo-1] += score;
    }
    
    //播放坦克爆炸效果
    private playTankBoom(xPos, yPos){
        var tankBoom: TankBoom = GameFactory.getInstance().getTankBoom();
        tankBoom.x = xPos;
        tankBoom.y = yPos;
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
        var self:GameScene = this;
        var flash:Flash = GameFactory.getInstance().getFlash();
        flash.x = birthPos[0]*this.tileWidth + this.halfWidth;
        flash.y = birthPos[1] * this.tileWidth + this.halfHeight;
        this.tankGroup.addChild(flash);
        flash.playAnim();
        egret.Tween.get(this).wait(1200).call(function(){
            var tank: BaseTank = GameFactory.getInstance().getTank(tankeType);
            tank.x = birthPos[0] * self.tileWidth + self.halfWidth;
            tank.y = birthPos[1] * self.tileWidth + self.halfHeight;
            if(Math.random() < (levelData.itemNum / (tankList.length + 1))) {
                levelData.itemNum --;
                tank.isHaveItem = true;
            }
            tank.autoTurn();
            self.bEnemyPause && tank.stop();
            self.tankGroup.addChild(tank);
            self.enemyTankList.push(tank); 
            self.reduceEnemyNumIcon();
        });
        
    }
    
    //停止生成坦克
    private stopGenerateTimer(){
        this.generateTimer.removeEventListener(egret.TimerEvent.TIMER,this.onGenerateTank,this);
        this.generateTimer.stop();
    }
    
    //开始基地护甲计时
    private startArmorTimer(){
        this.armorTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onArmorComplete, this);
        this.armorTimer.repeatCount = MapManager.getInstance().itemSet.armor;
        this.armorTimer.reset();
        this.armorTimer.start();
    }
    
    //基地护甲计时结束
    private onArmorComplete(){
        this.stopArmorTimer();
        this.setCampWall();
    }
    
    //停止护甲计时
    private stopArmorTimer(){
        this.armorTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onArmorComplete,this);
        this.armorTimer.stop();
    }
    
    //暂定计时
    private startPauseTimer(){
        this.pauseTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onPauseComplete, this);
        this.pauseTimer.repeatCount = MapManager.getInstance().itemSet.pause;
        this.pauseTimer.reset();
        this.pauseTimer.start();
    }
    
    //暂定计时结束
    private onPauseComplete(){
        this.stopPauseTimer();
        if(this.bEnemyPause){
            var len = this.enemyTankList.length;
            for(var i=0;i<len;i++){
                var tank: BaseTank = this.enemyTankList[i];
                tank.playMoveAnim();
            }
        }
        if(this.bPlayerPause){
            var len = this.playerTankList.length;
            for(var i=0;i<len;i++){
                var tank:BaseTank = this.playerTankList[i];
                (<PlayerTank>tank).resume();
            }
        }
        this.bPlayerPause = false;
        this.bEnemyPause = false;
        
    }
    
    //停止暂定计时
    private stopPauseTimer(){
        this.pauseTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onPauseComplete,this);
        this.pauseTimer.stop();
    }
    
    //开始波数计时
    private startWaveTimer(){
        this.waveTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onWaveComplete, this);
        this.waveTimer.repeatCount = MapManager.getInstance().endless_refreshTime;
        this.waveTimer.reset();
        this.waveTimer.start();
    }
    
    //计时结束
    private onWaveComplete(){
        this.nextWave();
    }
    
    //停止波数计时
    private stopWaveTimer(){
        this.waveTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onWaveComplete,this);
        this.waveTimer.stop();
    }
    
    //发送游戏结束
    public sendGameOver(){
        var userNum = UserManager.getInstance().getUserNum();
        var p1Kill = 0;
        var p2Kill = 0;
        var p1Score = 0;
        var p2Score = 0;
        var p1Openid = "";
        var p2Openid = "";
        for(var i=0;i<4;i++){
            p1Kill += this.totalKillList[0][i];
            p2Kill += this.totalKillList[1][i];
        } 
        if(userNum >= 1){
            p1Openid = UserManager.getInstance().userList[0].openid;
            p1Score = this.totalScore[0];
        }
        if(userNum == 2){
            p2Openid = UserManager.getInstance().userList[1].openid;
            p2Score = this.totalScore[1];
        }
        var data = {p1Kill:p1Kill, p2Kill:p2Kill,p1Score:p1Score,p2Score:p2Score,wave:this.wave,p1Openid:p1Openid,
                    p2Openid:p2Openid,stage:MapManager.getInstance().curLevel};
        console.log("send gameOver:",data);
        this.socket.sendMessage("gameOver",data);
    }
    
    //接收游戏结束
    public revGameOver(json){
        console.log("revGameOver:",json);
        this.deConfigListeners();     //停止移动和碰撞检测
        this.stopGenerateTimer();     //停止生成坦克计时
        this.stopArmorTimer();        //停止基地护甲计时
        this.stopPauseTimer();        //停止暂停道具计时
        this.clearPlayerTank();       //清理坦克，防止接收action时，会有声音
        this.clearEnemyTank();
        LayerManager.getInstance().runScene(GameManager.getInstance().resultScene);
        var data = json;   
        var success = json.success;
        var gameData = {
            "killList": this.killList,                  //本关击杀
            "totalKillList": this.totalKillList,        //总击杀
            "stage": MapManager.getInstance().curLevel, //关卡数
            "wave": this.wave,                          //波数
            "totalScore": this.totalScore,              //总分
            "historyScore": data.historyScore,          //历史最高分
            "heroRank": data.heroRank,                  //英雄榜
            "p1KillRank": data.p1KillRank,              //p1击杀榜
            "p2KillRank": data.p2KillRank,              //p2击杀榜
            "success": json.success                      //是否成功
        };
        GameManager.getInstance().resultScene.setResult(gameData,true);
    }
    
    //接收用户操作
    public revAction(data) {
        //console.log("rev action:",data);
        var actionType = data.actionType;
        var openid: string = data.openid;
        
        if(this.gameStatus == GameStatus.waiting){
            return;
        }
        
        if(this.bPlayerPause && actionType != ActionEnum.shoot && actionType != ActionEnum.stopShoot){
            return;
        }
        
        //获取用户tank
        for(var i=0;i<this.playerTankList.length;i++){
            var tank:BaseTank = this.playerTankList[i];
            if(tank.openid == openid){
                if(actionType == ActionEnum.shoot){
                    tank.shoot();
                }else if(actionType == ActionEnum.stopShoot){
                    tank.stopShoot();
                }else{
                    tank.actionHandler(actionType); 
                    this.modifyTankTurn(tank);
                }
            }
        }
    }
    
}









