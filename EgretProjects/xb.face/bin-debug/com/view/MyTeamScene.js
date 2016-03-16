/**
 * 我的团队页面
 * @author
 *
 */
var MyTeamScene = (function (_super) {
    __extends(MyTeamScene, _super);
    function MyTeamScene() {
        _super.call(this, "MyTeamSceneSkin");
    }
    var d = __define,c=MyTeamScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
    };
    p.onEnable = function () {
    };
    p.onRemove = function () {
    };
    p.showTeam = function () {
        wx.downloadImage({
            serverId: "",
            isShowProgressTips: 1,
            success: function (res) {
                var localId = res.localId; // 返回图片下载后的本地ID
                //self.showPic(localId);
            }
        });
    };
    return MyTeamScene;
})(BaseScene);
egret.registerClass(MyTeamScene,'MyTeamScene');
