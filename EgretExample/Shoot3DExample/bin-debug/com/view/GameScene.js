/**
 * 游戏场景
 * @author
 *
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this, "GameSceneSkin");
        this.canMoveList = new Array();
        this.treeList = new Array();
        this.fl = 250;
    }
    var d = __define,c=GameScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.stageWidth = GameConst.stage.stageWidth;
        this.stageHeight = GameConst.stage.stageHeight;
    };
    p.onEnable = function () {
        this.createTree();
        this.configListeners();
    };
    p.onRemove = function () {
    };
    p.configListeners = function () {
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
    };
    p.deConfigListeners = function () {
    };
    p.onEnterFrame = function () {
        this.updateElement();
    };
    p.onTouchMove = function () {
    };
    p.createTree = function () {
        for (var i = 0; i < 2; i++) {
            var tree = new Tree();
            //tree.xpos = Math.random()*this.stageWidth;
            //tree.ypos = Math.random()*this.treeGroup.height;
            tree.z = Math.random() * 100;
            //tree.xpos = 100;
            //tree.ypos = 100;
            this.treeGroup.addChild(tree);
            this.canMoveList.push(tree);
        }
        this.sortDeepIndex();
    };
    p.updateElement = function () {
        var len = this.canMoveList.length;
        var element;
        for (var i = 0; i < len; i++) {
            element = this.canMoveList[i];
            element.update();
        }
    };
    p.sortDeepIndex = function () {
        var len = this.canMoveList.length;
        for (var i = 0; i < len; i++) {
            for (var j = i + 1; j < len; j++) {
                var a = this.canMoveList[i];
                var b = this.canMoveList[j];
                console.log(a.z, b.z, this.treeGroup.getChildIndex(a), this.treeGroup.getChildIndex(b));
                if ((a.z > b.z) && (this.treeGroup.getChildIndex(a) > this.treeGroup.getChildIndex(b))) {
                    this.treeGroup.swapChildren(a, b);
                }
                console.log(a.z, b.z, this.treeGroup.getChildIndex(a), this.treeGroup.getChildIndex(b));
            }
        }
    };
    return GameScene;
})(BaseScene);
egret.registerClass(GameScene,'GameScene');
