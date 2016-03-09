/**
*  文 件 名：BaseScene.ts
*  功    能：场景基类
*  内    容：将场景自适应到容器的100%
*  作    者：Rikimaru
*  生成日期：2015/9/10
*  修改日期：2016/3/8
*  修改日志：
*/
var BaseScene = (function (_super) {
    __extends(BaseScene, _super);
    function BaseScene(skinName) {
        _super.call(this);
        //other
        this.inited = false; //组件初始化完毕
        this.$allowUpdate = false; //允许使用update
        this.$allowFixedUpdate = false; //允许使用fixedUpdate
        this.percentWidth = 100;
        this.percentHeight = 100;
        this.touchEnabled = false;
        this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.componentCreated, this);
        this.skinName = skinName;
    }
    var d = __define,c=BaseScene,p=c.prototype;
    /**组件创建完毕并添加到舞台时触发
     *  组件皮肤在主题json已经加载完毕，所以在this.skinName=skinName时组件是已经创建完毕的
     *  组件addChild到舞台时，会触发eui.UIEvent.CREATION_COMPLETE，无需等待创建完毕
     *  触发顺序：Complete，createdChildren,CREATION_COMPLETE，三个都能访问组件，可以获取x，y，但是不能获取width，height
     *  Complete未添加到舞台也会触发，createdChildren,CREATION_COOMPLETE只有添加到舞台后才触发
     *  只有CREATION_COOMPLETE后执行this.validateNow()，才能获取组件宽度
     */
    p.componentCreated = function () {
        this.removeEventListener(eui.UIEvent.CREATION_COMPLETE, this.componentCreated, this);
        this.inited = true;
    };
    /**组建创建完毕的情况下，添加到舞台时执行*/
    p.onEnable = function () {
    };
    /**每帧执行，基于当前帧率*/
    p.update = function () {
    };
    /**每帧执行，基于当前系统时间*/
    p.fixedUpdate = function () {
    };
    /**移除界面时执行*/
    p.onRemove = function () {
        this.allowUpdate = false;
    };
    /**销毁界面时执行*/
    p.onDestroy = function () {
    };
    d(p, "allowUpdate"
        ,function () {
            return this.$allowUpdate;
        }
        //设置允许update
        ,function (bUpdate) {
            this.$allowUpdate = bUpdate;
            if (bUpdate) {
                this.$previous = egret.getTimer();
                this.$accTime = 0;
                this.$dt = 1000 / GameConst.stage.frameRate;
                this.addEventListener(egret.Event.ENTER_FRAME, this.onUpdateHandler, this);
            }
            else {
                this.removeEventListener(egret.Event.ENTER_FRAME, this.onUpdateHandler, this);
            }
        }
    );
    d(p, "allowFixedUpdate"
        ,function () {
            return this.$allowFixedUpdate;
        }
        //设置允许fixedUpdate
        ,function (bFixedUpdate) {
            this.$allowFixedUpdate = bFixedUpdate;
        }
    );
    //每帧执行
    p.onUpdateHandler = function () {
        this.update();
        //基于时间片的更新
        if (this.$allowFixedUpdate) {
            this.$curTime = egret.getTimer();
            this.$passTime = this.$curTime - this.$previous;
            this.$previous = this.$curTime;
            this.$accTime += this.$passTime;
            while (this.$accTime >= this.$dt) {
                this.fixedUpdate();
                this.$accTime -= this.$dt;
            }
        }
    };
    return BaseScene;
})(eui.Component);
egret.registerClass(BaseScene,'BaseScene');
