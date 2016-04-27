/**
 * 游戏常量
 * @author
 *
 */
var GameConst = (function () {
    function GameConst() {
    }
    var d = __define,c=GameConst,p=c.prototype;
    return GameConst;
}());
egret.registerClass(GameConst,'GameConst');
//坦克 0玩家 1普通 2快速 3强化 4超级强化
var TankEnum;
(function (TankEnum) {
    TankEnum[TankEnum["player"] = 0] = "player";
    TankEnum[TankEnum["normal"] = 1] = "normal";
    TankEnum[TankEnum["fast"] = 2] = "fast";
    TankEnum[TankEnum["strong"] = 3] = "strong";
    TankEnum[TankEnum["super"] = 4] = "super";
})(TankEnum || (TankEnum = {}));
//道具 0隐身，1枪，2星星，3基地护甲，4命，5手雷，6暂停
var ItemEnum;
(function (ItemEnum) {
    ItemEnum[ItemEnum["alpha"] = 0] = "alpha";
    ItemEnum[ItemEnum["gun"] = 1] = "gun";
    ItemEnum[ItemEnum["star"] = 2] = "star";
    ItemEnum[ItemEnum["armor"] = 3] = "armor";
    ItemEnum[ItemEnum["life"] = 4] = "life";
    ItemEnum[ItemEnum["boom"] = 5] = "boom";
    ItemEnum[ItemEnum["pause"] = 6] = "pause";
})(ItemEnum || (ItemEnum = {}));
//地形
var TileEnum;
(function (TileEnum) {
    TileEnum[TileEnum["grass"] = 1] = "grass";
    TileEnum[TileEnum["wall"] = 2] = "wall";
    TileEnum[TileEnum["steel"] = 3] = "steel";
    TileEnum[TileEnum["river"] = 4] = "river";
})(TileEnum || (TileEnum = {}));
//坦克行为
var ActionEnum;
(function (ActionEnum) {
    ActionEnum[ActionEnum["up"] = 0] = "up";
    ActionEnum[ActionEnum["down"] = 1] = "down";
    ActionEnum[ActionEnum["left"] = 2] = "left";
    ActionEnum[ActionEnum["right"] = 3] = "right";
    ActionEnum[ActionEnum["stopMove"] = 4] = "stopMove";
    ActionEnum[ActionEnum["stopShoot"] = 5] = "stopShoot";
    ActionEnum[ActionEnum["shoot"] = 6] = "shoot";
})(ActionEnum || (ActionEnum = {}));
//坦克方向
var DirectionEnum;
(function (DirectionEnum) {
    DirectionEnum[DirectionEnum["up"] = 0] = "up";
    DirectionEnum[DirectionEnum["down"] = 1] = "down";
    DirectionEnum[DirectionEnum["left"] = 2] = "left";
    DirectionEnum[DirectionEnum["right"] = 3] = "right";
})(DirectionEnum || (DirectionEnum = {}));
