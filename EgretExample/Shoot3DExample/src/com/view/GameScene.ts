/**
 * 游戏场景
 * @author 
 *
 */
class GameScene extends BaseScene{
    private canMoveList:Array<BaseElement> = new Array<BaseElement>();
    
    private treeList:Array<Tree> = new Array<Tree>();
    private treeGroup:eui.Group;
    
    private fl:number = 250;
    private stageWidth:number;
    private stageHeight:number;
    
	public constructor() {
        super("GameSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        
        this.stageWidth = GameConst.stage.stageWidth;
        this.stageHeight = GameConst.stage.stageHeight;
    }

    public onEnable(): void {
        this.createTree();
        this.configListeners();
    }

    public onRemove(): void {
        
    }
    
    private configListeners(){
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove,this);
    }
    
    private deConfigListeners(){
        
    }
    
    private onEnterFrame() {
        this.updateElement();
    }
    
    private onTouchMove(){
        
    }
    
    public createTree(){
        for(var i=0;i<2;i++){
            var tree:Tree = new Tree();
            //tree.xpos = Math.random()*this.stageWidth;
            //tree.ypos = Math.random()*this.treeGroup.height;
            tree.z = Math.random()*100;
            //tree.xpos = 100;
            //tree.ypos = 100;
            this.treeGroup.addChild(tree);    
            this.canMoveList.push(tree);
        }
        this.sortDeepIndex();
    }

    private updateElement(){
        var len: number = this.canMoveList.length;
        var element:BaseElement;
        for(var i=0;i<len;i++){
            element = this.canMoveList[i];
            element.update();
        }
    }
    
    private sortDeepIndex(){
        var len: number = this.canMoveList.length;
        for(var i = 0;i < len;i++) {
            for(var j=i+1;j<len;j++){
                var a: BaseElement = this.canMoveList[i];
                var b: BaseElement = this.canMoveList[j];
                console.log(a.z,b.z,this.treeGroup.getChildIndex(a),this.treeGroup.getChildIndex(b));
                if((a.z > b.z) && (this.treeGroup.getChildIndex(a) > this.treeGroup.getChildIndex(b)) ) {
                    this.treeGroup.swapChildren(a,b);
                }
                console.log(a.z,b.z,this.treeGroup.getChildIndex(a),this.treeGroup.getChildIndex(b));
            }   
        }
    }
    
}

























