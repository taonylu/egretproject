/**
 *
 * @author
 *
 */
var ResultScene = (function (_super) {
    __extends(ResultScene, _super);
    function ResultScene() {
        _super.call(this, "ResultSceneSkin");
    }
    var d = __define,c=ResultScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        if (this.dataBuffer != null) {
            this.setResult(this.dataBuffer);
        }
    };
    p.setResult = function (data) {
        this.dataBuffer = data;
        if (this.inited == false) {
            return;
        }
        var wave = data.wave;
        var heroRank = data.heroRank;
        var p1Openid = data.p1Openid;
        var p2Openid = data.p2Openid;
        var p1KillRank = data.p1KillRank;
        var p2KillRank = data.p2KillRank;
        var p1Kill = data.p1Kill;
        var p2Kill = data.p2Kill;
        console.log("test1");
        this.waveLabel.text = wave + "";
        this.heroRankLabel.text = heroRank + "";
        this.killLabel.text = "";
        this.killRankLabel.text = "";
        console.log("test2");
        if (GameConst.gameConfig.openid == p1Openid) {
            this.killLabel.text = p1Kill + "";
            this.killRankLabel.text = p1KillRank + "";
        }
        else if (GameConst.gameConfig.openid == p2Openid) {
            this.killLabel.text = p2Kill + "";
            this.killRankLabel.text = p2KillRank + "";
        }
        console.log("test3");
    };
    return ResultScene;
}(BaseScene));
egret.registerClass(ResultScene,'ResultScene');
