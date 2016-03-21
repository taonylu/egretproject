/**
 * 游戏背景，山，天空，草地
 * @author
 *
 */
var GameBg = (function (_super) {
    __extends(GameBg, _super);
    function GameBg() {
        _super.call(this, "GameBgSkin");
        this.skySpeed = -0.1;
        this.hillSpeed = -0.5;
        this.grassSpeed = -2;
    }
    var d = __define,c=GameBg,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.reset();
    };
    p.render = function () {
        //this.sky.x += this.skySpeed;
        //this.sky0.x += this.skySpeed;
        //this.hill.x += this.hillSpeed;
        //this.hill0.x += this.hillSpeed;
        this.grass.x += this.grassSpeed;
        this.grass0.x += this.grassSpeed;
        //        if(this.sky.x < -this.sky.width){
        //            this.sky.x = this.sky0.x + this.sky0.width;
        //        }else if(this.sky0.x < -this.sky0.width) {
        //            this.sky0.x = this.sky.x + this.sky.width;
        //        }
        //        if(this.hill.x < -this.hill.width) {
        //            this.hill.x = this.hill0.x + this.hill0.width;
        //        }else if(this.hill0.x < -this.hill0.width) {
        //            this.hill0.x = this.hill.x + this.hill.width;
        //        }
        if (this.grass.x < -this.grass.width) {
            this.grass.x = this.grass0.x + this.grass0.width;
        }
        else if (this.grass0.x < -this.grass0.width) {
            this.grass0.x = this.grass.x + this.grass.width;
        }
    };
    p.reset = function () {
        this.sky.x = 0;
        this.hill.x = 0;
        this.grass.x = 0;
        this.sky0.x = this.sky.width;
        this.hill0.x = this.hill.width;
        this.grass0.x = this.grass.width;
    };
    return GameBg;
}(BaseUI));
egret.registerClass(GameBg,'GameBg');
