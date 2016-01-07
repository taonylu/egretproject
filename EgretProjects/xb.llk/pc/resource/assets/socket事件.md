# socket事件

屏幕和手机端的链接一样，通过search参数来区分，如果不写，默认是screen

- ?type=screen
- ?type=phone


## screen - 发送给服务器

暂无



## screen - 接受服务器事件

- `loginComplete` 登陆完成
	**参数：**
	- `status:Number` 是否授权成功 1 0
	- `msg:String` 信息
	
	**参数：**
	- `status:Number` 各种参数，

- `userJoin` 有新的用户加入

	**参数：**

	- `avatar：string` // 用户头像
	- `name : string` // 用户名  
	- `id : string` // 用户id

- `userQuit` 用户退出

	**参数：**

	- `id`

- `gameStart` 游戏开始

	**参数：**

	- `mapData：Array` // 地图信息
	- `luckyUser: String` // 随机选中的用户的id

- `eliminate` 玩家有消除动作

	**参数：**

	- `id : String` // 用户id
	- `pos：Array`  // 当用户是luckyuser的时候才有 ，用户消除的位置 ，二维数组？

- `pro` 道具（只对luckyuser出现）

	**参数：**

	- `type：String` // ice、disturb两张类型
	- `mapData：Array` // 如果是disturb类型，就会给到新的地图信息

- `luckyMap` 幸运用户的地图因为没有可以消除的，系统自动更换

	**参数：**

	- `mapdata：Array`

- `gameOver` 游戏结束

	**参数：**

	- `winners：Array` //前三名玩家的ID



## user - 发送给服务器的信息

- `upMap` 无法消除，前端重新排位，并把最新地图发送服务器
	
	**参数：**
	- `mapData:Array`  地图信息

- `eliminate` 玩家消除

	**参数：**

	- `pos：Array` //用户消除的位置，二维数组？

- `usePro` 玩家使用道具

	**参数：**

	- `type:String` // ice、disturb、find 3种类型

	**返回值：**

	- `status：Number` // 是否使用成功 1 0
	- `change:Number` // 该道具剩余次数


## user - 接受服务器信息

- `userInfo` 进入页面，得到自己的信息

	**参数：**
	- `id:String` 用户ID
	- `avatar:String` 用户头像
	- `name:String` 用户
	
- `mapData` 获取新地图，每一个小关过后，就会获取新地图

	**参数：**
	- `mapdata:Array` 地图信息


- `pro` 被施放道具

	**参数：**

	- `type：String`  // ice、disturb两种类型
	- `mapData：Array` // 如果是disturb并且是luckyuser，才会返回新的地图

- `gameOver` 游戏结束

	**参数：**

	- `rank:Number` // 你的排名
