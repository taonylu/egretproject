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
    /**启动app*/
    p.startup = function () {
        App.SceneManager.register("HomeScene", HomeScene);
        App.SceneManager.open("HomeScene");
    };
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
    d(App, "EventManager"
        /**事件管理类*/
        ,function () {
            return EventManager.getInstance();
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
    return App;
}(BaseApp));
egret.registerClass(App,'App');
