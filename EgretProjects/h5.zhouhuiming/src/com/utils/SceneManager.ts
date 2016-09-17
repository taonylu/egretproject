/**
 * 场景管理类
 * @author 
 *
 */
class SceneManager {
    public sceneA: SceneA;
    public sceneB: SceneB;
    public sceneC: SceneC;
    public sceneD:SceneD;
    public scrollScene:ScrollScene;
    
    constructor(){
        this.sceneA = new SceneA();
        this.sceneB = new SceneB();
        this.sceneC = new SceneC();
        this.sceneD = new SceneD();
        this.scrollScene = new ScrollScene();
    }
	
}
