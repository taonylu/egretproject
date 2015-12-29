/**
*  文 件 名：RankJSON.ts
*  功    能： 提交分数JSON
*  内    容：
*  作    者： 羊力大仙
*  生成日期：2015/9/14
*  修改日期：2015/9/14
*  修改日志：
*/
var RankJSON = (function () {
    function RankJSON() {
        this.cmd = 1003;
        this.len = 0;
        this.name = [];
        this.score = [];
    }
    var __egretProto__ = RankJSON.prototype;
    __egretProto__.getJSONString = function () {
        //测试
        this.json = {
            "cmd": this.cmd,
            "len": this.len,
            "name": [this.name[0], this.name[1]],
            "score": [this.score[0], this.score[1]]
        };
        return JSON.stringify(this.json);
    };
    __egretProto__.readData = function (json) {
        this.json = json;
        this.cmd = this.json.cmd;
        this.len = this.json.len;
        for (var i = 0; i < this.len; i++) {
            this.name[i] = StringTool.mixUnicodeToCh(this.json.name[i]);
            this.score[i] = this.json.score[i];
        }
    };
    return RankJSON;
})();
RankJSON.prototype.__class__ = "RankJSON";
