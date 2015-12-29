/**
*  功    能：游戏管理类
*  内    容： 
*  作    者：羊力大仙
*  生成日期：2015/10/22
*  修改日期：
*  修改日志：
*/
class GameManager implements ISocketHand{
    
    public homeScene: HomeScene= new HomeScene();     //主页场景
    public levelScene: LevelScene = new LevelScene(); //选关场景
    public gameScene: GameScene = new GameScene();    //游戏场景
    
    public titleUI: TitleUI = new TitleUI();          //顶部标题(鱼、星星数量)
    
    //启动游戏
    public startup(): void {
        ClientSocket.getInstance().IP = GameConst.IP;
        ClientSocket.getInstance().port = GameConst.Port;
        ClientSocket.getInstance().setSocketHand(this);
        LayerManager.getInstance().runScene(this.homeScene);
    }
    
    //开始游戏
    public startGame(levelNum:number): void {
        LayerManager.getInstance().runScene(this.gameScene);
        this.gameScene.starGame(levelNum);
    }
    
    //连接成功
    public onSocketConnect(): void {
        
    }
    
    //连接失败
    public onSocketError(): void {
        
    }
    
    //连接关闭
    public onSocketClose(): void {
       
    }
    
    //连接超时
    public onSocketConnectTimeOver(): void {
        
    }
    
    //接收数据
    public onSocketData(json): void {
        switch(json.cmd) {
            case NetConst.SUBMIT_SCORE:
                this.gameScene.showRank(json);
                break;
        }
    }
    
    //提交分数
    public sendSubmit(score:number): void {
        var json = JsonManager.submit;
        json.cmd = NetConst.SUBMIT_SCORE;
        json.userid = 1000;
        json.gameid = 1000;
        json.score = score;
        json.username = NumberTool.getRandomInt(0,10000).toString();
        ClientSocket.getInstance().send(json);
    }
    
    
    
    
    
    private static instance: GameManager;
    public static getInstance(): GameManager {
        if(this.instance == null) {
            this.instance = new GameManager();
        }
        return this.instance;
    }
}
