/**
 * 弹框接口
 * @author chenkai
 * @date 2016/12/18
 */
interface IBaseUI {
	/**显示到舞台*/
	onEnable();
	/**从舞台移除*/
	onRemove();
	/**重置*/
	onReset();
	/**销毁*/
	onDestory();
}