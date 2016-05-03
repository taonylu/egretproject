/**
 * 敌方数量图标
 * @author
 *
 */
var EnemyNumIcon = (function (_super) {
    __extends(EnemyNumIcon, _super);
    function EnemyNumIcon() {
        _super.call(this);
        this.bitmapData = RES.getRes("game_enemyNum_png");
    }
    var d = __define,c=EnemyNumIcon,p=c.prototype;
    return EnemyNumIcon;
}(egret.Bitmap));
egret.registerClass(EnemyNumIcon,'EnemyNumIcon');
