/**
 * 20分数字
 * @author 
 *
 */
class Score20 extends BaseItem {
    public static NAME: string = "Score20";
    public constructor() {
        super("gameSheet_json.num20");
    }

    public recycle() {
        this.hide();
        ObjectPool.getPool(Score20.NAME).returnObject(this);
    }
}
