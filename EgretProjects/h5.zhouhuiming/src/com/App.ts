/**
 * 游戏主类 
 * @author 
 *
 */
class App {
    public static sndMgr:SoundManager;
    public static layerMgr:LayerManager;
    public static sceneMgr:SceneManager;
    
	public static init(root:Main){
        StageUtil.stage = root.stage;
    	
        this.sndMgr = new SoundManager();
        
        this.layerMgr = new LayerManager();
        this.layerMgr.init(root);
        
        this.sceneMgr = new SceneManager();
        
        this.layerMgr.runScene(this.sceneMgr.sceneA);
	}
}
