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
    };
    /**
     * @headImg0  施放道具玩家头像
     * @headImg1 被施放道具玩家头像
     * @toolName 道具名称
     */
    p.setSkill = function (headImg0, headImg1, toolName) {
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
        var headImg = this.headGroup0.getChildAt(0);
        if (headImg) {
            headImg.parent && headImg.parent.removeChild(headImg);
            headImg = null;
        }
        headImg = this.headGroup1.getChildAt(0);
        if (headImg) {
            headImg.parent && headImg.parent.removeChild(headImg);
            headImg = null;
        }
    };
    return SkillUI;
})(BaseUI);
egret.registerClass(SkillUI,'SkillUI');
