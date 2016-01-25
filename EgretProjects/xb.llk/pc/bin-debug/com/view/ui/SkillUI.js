/**
 * 游戏场景，谁对谁施放了技能
 * @author
 *
 */
var SkillUI = (function (_super) {
    __extends(SkillUI, _super);
    function SkillUI() {
        _super.call(this, "SkillUISkin");
    }
    var d = __define,c=SkillUI,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.staticLabel0.visible = false;
        this.staticLabel1.visible = false;
        this.staticLabel2.visible = false;
    };
    /**
     * @headImg0  施放道具玩家头像
     * @headImg1 被施放道具玩家头像
     * @toolName 道具名称
     */
    p.setSkill = function (headImg0, headImg1, toolName) {
        this.staticLabel0.visible = true;
        this.staticLabel1.visible = true;
        this.staticLabel2.visible = true;
        this.toolLabel.text = toolName;
        headImg0.width = 80;
        headImg0.height = 80;
        headImg1.width = 80;
        headImg1.height = 80;
        this.headGroup0.addChild(headImg0);
        this.headGroup1.addChild(headImg1);
    };
    //清理文本和移除头像
    p.clear = function () {
        this.toolLabel.text = "";
        this.staticLabel0.visible = false;
        this.staticLabel1.visible = false;
        this.staticLabel2.visible = false;
        var headImg;
        if (this.headGroup0.numChildren > 0) {
            headImg = this.headGroup0.getChildAt(0);
            headImg.parent && headImg.parent.removeChild(headImg);
            headImg = null;
        }
        if (this.headGroup1.numChildren > 0) {
            headImg = this.headGroup1.getChildAt(0);
            headImg.parent && headImg.parent.removeChild(headImg);
            headImg = null;
        }
    };
    return SkillUI;
})(BaseUI);
egret.registerClass(SkillUI,'SkillUI');
