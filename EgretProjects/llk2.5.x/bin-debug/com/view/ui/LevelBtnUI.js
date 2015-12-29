/**
*  功    能： 选关按钮
*  内    容：
*  作    者：羊力大仙
*  生成日期：2015/10/23
*  修改日期：
*  修改日志：
*/
var LevelBtnUI = (function (_super) {
    __extends(LevelBtnUI, _super);
    function LevelBtnUI() {
        _super.call(this);
        this.levelNum = 0;
        this.skinName = "resource/myskins/LevelBtnUISkin.exml";
        this.touchChildren = false;
    }
    var d = __define,c=LevelBtnUI;p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.levelNumLabel.touchEnabled = false;
        this.titleLabel.touchEnabled = false;
        this.fishLabel.touchEnabled = false;
        this.starLabel.touchEnabled = false;
        this.setLevelNumLabel(this.tempLevelNum);
        this.setTitleLabel(this.tempTitle);
        this.setFishLabel(this.tempFishNum);
        this.setStarLabel(this.tempStarNum);
    };
    p.setLevelNumLabel = function (levelNum) {
        this.tempLevelNum = levelNum;
        this.levelNum = levelNum;
        if (this.inited) {
            this.levelNumLabel.text = "-" + this.tempLevelNum + "-";
        }
    };
    p.setTitleLabel = function (title) {
        this.tempTitle = title;
        if (this.inited) {
            this.titleLabel.text = this.tempTitle;
        }
    };
    p.setFishLabel = function (fishNum) {
        this.tempFishNum = fishNum;
        if (this.inited) {
            this.fishLabel.text = this.tempFishNum.toString();
        }
    };
    p.setStarLabel = function (starNum) {
        this.tempStarNum = starNum;
        if (this.inited) {
            this.starLabel.text = this.tempStarNum.toString();
        }
    };
    return LevelBtnUI;
})(BaseUI);
egret.registerClass(LevelBtnUI,"LevelBtnUI");
