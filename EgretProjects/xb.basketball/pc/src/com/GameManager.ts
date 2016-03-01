/**
 * 游戏管理类
 * @author  陈凯
 *
 */
class GameManager {
    public homeScene: HomeScene = new HomeScene();  //主页场景
    public gameScene: GameScene = new GameScene();  //游戏场景
    
    public messageBox:MessageBox = new MessageBox();//提示框
    
    public socket:ClientSocket = ClientSocket.getInstance();
    
    //获取单例
    private static instance: GameManager;
    public static getInstance(): GameManager {
        if(this.instance == null) {
            this.instance = new GameManager();
        }
        return this.instance;
    }
    
    //启动游戏框架
    public startup(main: Main): void {

        //配置Layer
        GameConst.stage = main.stage;
        LayerManager.getInstance().initialize(main);
        
        //跳转场景
        LayerManager.getInstance().runScene(this.homeScene);
        
        //配置socket
        this.socket.homeScene = this.homeScene;
        this.socket.gameScene = this.gameScene;
        this.socket.startConnect();
        
        if(GameConst.isDebug){
            this.onConnect();
        }
    }
    
    ///////////////////////////////////////////
    //----------------[发送数据]---------------
    ///////////////////////////////////////////
    
    ///////////////////////////////////////////
    //----------------[接收数据]---------------
    ///////////////////////////////////////////
    //链接成功
    public onConnect() {
        //提交房间号
        this.homeScene.submitRid();
    }
    
    //断开链接
    public onDisconnect() {
        this.messageBox.showMessage("网页连接已断开");
    }

    public onError() {
        this.messageBox.showMessage("连接网页错误");
    }
}














