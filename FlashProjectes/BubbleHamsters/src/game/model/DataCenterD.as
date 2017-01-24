package src.game.model 
{
	/**
	 * 数据中心
	 * @author rikimaru
	 * @since 2017/1/23
	 */
	public class DataCenterD 
	{
		
		
		
		/**单例*/
		private static var instance:DataCenterD;
		/**获取单例*/
		public static function getInstance():DataCenterD {
			if (instance == null) {
				instance = new DataCenterD();
			}
			return instance;
		}
	}

}