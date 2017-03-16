var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * App主类
 * @author chenkai
 * @since 2016/12/18
 */
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        return _super.apply(this, arguments) || this;
    }
    /**
     * 发送通知
     * @name 通知名
     * @body 通知消息
     */
    App.sendNotification = function (name, body) {
        if (body === void 0) { body = null; }
        App.getInstance().sendNotification(name, body);
    };
    Object.defineProperty(App, "VersionManager", {
        /**版本管理*/
        get: function () {
            return VersionManager.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "DataCenter", {
        /**数据中心*/
        get: function () {
            return DataCenter.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "ArrayTool", {
        /**数组工具类*/
        get: function () {
            return ArrayTool.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "NumberTool", {
        /**数字工具类*/
        get: function () {
            return NumberTool.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "StringTool", {
        /**字符串工具*/
        get: function () {
            return StringTool.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "ObjectPool", {
        /**对象池*/
        get: function () {
            return ObjectPool.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "Http", {
        /**Http请求*/
        get: function () {
            return Http.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "Socket", {
        /**Socket*/
        get: function () {
            return ClientSocket.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "ResUtils", {
        /**资源加载类*/
        get: function () {
            return ResUtils.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "StageUtils", {
        /**舞台管理类*/
        get: function () {
            return StageUtils.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "PanelManager", {
        /**弹框管理类*/
        get: function () {
            return PanelManager.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "SceneManager", {
        /**场景管理类*/
        get: function () {
            return SceneManager.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "LayerManager", {
        /**图层管理类*/
        get: function () {
            return LayerManager.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "Sound", {
        /**声音管理类*/
        get: function () {
            return SoundManager.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "DeviceUtils", {
        /**设备管理类*/
        get: function () {
            return DeviceUtils.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "BluemoonSDK", {
        /**蓝月亮SDK*/
        get: function () {
            return BluemoonSDK.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "WxContent", {
        /**微信分享*/
        get: function () {
            return WxContent.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    return App;
}(puremvc.Facade));
__reflect(App.prototype, "App");
//# sourceMappingURL=App.js.map