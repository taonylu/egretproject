/**
 * App主类
 * @author chenkai
 * @date 2016/12/18
 */
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        _super.apply(this, arguments);
    }
    var d = __define,c=App,p=c.prototype;
    d(App, "View"
        /**获取视图模块*/
        ,function () {
            return View.getInstance();
        }
    );
    d(App, "VersionManager"
        /**版本管理*/
        ,function () {
            return VersionManager.getInstance();
        }
    );
    d(App, "DataCenter"
        /**数据中心*/
        ,function () {
            return DataCenter.getInstance();
        }
    );
    d(App, "ArrayTool"
        /**数组工具类*/
        ,function () {
            return ArrayTool.getInstance();
        }
    );
    d(App, "NumberTool"
        /**数字工具类*/
        ,function () {
            return NumberTool.getInstance();
        }
    );
    d(App, "StringTool"
        /**字符串工具*/
        ,function () {
            return StringTool.getInstance();
        }
    );
    d(App, "MessageCenter"
        /**事件管理类*/
        ,function () {
            return MessageCenter.getInstance();
        }
    );
    d(App, "ObjectPool"
        /**对象池*/
        ,function () {
            return ObjectPool.getInstance();
        }
    );
    d(App, "Http"
        /**Http请求*/
        ,function () {
            return Http.getInstance();
        }
    );
    d(App, "Socket"
        /**Socket*/
        ,function () {
            return ClientSocket.getInstance();
        }
    );
    d(App, "ResUtils"
        /**资源加载类*/
        ,function () {
            return ResUtils.getInstance();
        }
    );
    d(App, "StageUtils"
        /**舞台管理类*/
        ,function () {
            return StageUtils.getInstance();
        }
    );
    d(App, "PanelManager"
        /**弹框管理类*/
        ,function () {
            return PanelManager.getInstance();
        }
    );
    d(App, "SceneManager"
        /**场景管理类*/
        ,function () {
            return SceneManager.getInstance();
        }
    );
    d(App, "LayerManager"
        /**图层管理类*/
        ,function () {
            return LayerManager.getInstance();
        }
    );
    d(App, "Sound"
        /**声音管理类*/
        ,function () {
            return SoundManager.getInstance();
        }
    );
    d(App, "DeviceUtils"
        /**设备管理类*/
        ,function () {
            return DeviceUtils.getInstance();
        }
    );
    d(App, "BluemoonSDK"
        /**蓝月亮SDK*/
        ,function () {
            return BluemoonSDK.getInstance();
        }
    );
    d(App, "WxContent"
        /**微信分享*/
        ,function () {
            return WxContent.getInstance();
        }
    );
    return App;
}(SingleClass));
egret.registerClass(App,'App');
