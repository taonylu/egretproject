/**
*  文 件 名：SubmitScoreJSON.ts
*  功    能： 提交分数JSON
*  内    容：
*  作    者： 羊力大仙
*  生成日期：2015/9/14
*  修改日期：2015/9/14
*  修改日志：
*/
var SubmitScoreJSON = (function () {
    function SubmitScoreJSON() {
        this.cmd = 1002;
    }
    var __egretProto__ = SubmitScoreJSON.prototype;
    __egretProto__.getJSONString = function () {
        this.json = {
            "cmd": this.cmd,
            "name": this.name,
            "score": this.score
        };
        return JSON.stringify(this.json);
    };
    __egretProto__.readData = function (json) {
        this.json = json;
        this.cmd = this.json.cmd;
        this.name = this.json.name;
        this.score = this.json.score;
    };
    return SubmitScoreJSON;
})();
SubmitScoreJSON.prototype.__class__ = "SubmitScoreJSON";
