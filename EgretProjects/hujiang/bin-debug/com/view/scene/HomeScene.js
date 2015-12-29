/**
 *
 * @author
 * 主页场景
 */
var HomeScene = (function (_super) {
    __extends(HomeScene, _super);
    function HomeScene() {
        _super.call(this, "resource/myskin/scene/HomeSceneSkin.exml");
        this.turnAngle = 60; //旋转角度
        this.turnTime = 1500; //旋转角度的时间
        this.figureList = []; //人物数组
        this.curFigureIndex = 0; //当前动画人物索引
    }
    var d = __define,c=HomeScene;p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.figureList.push(this.figure1, this.figure2, this.figure3, this.figure4);
        this.figure1.parent.removeChild(this.figure1);
        this.figure2.parent.removeChild(this.figure2);
        this.figure3.parent.removeChild(this.figure3);
        this.scanInitY = this.scan.y;
    };
    p.onEnable = function () {
        this.scan.y = this.scanInitY;
        this.ringAnimFront();
        //this.figureAnim();
        this.zw.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.zw.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    };
    p.onRemove = function () {
        //移除旋转动画
        egret.Tween.removeAllTweens();
        this.ring1.rotation = 0;
        this.ring2.rotation = 0;
        this.ring3.rotation = 0;
        this.ring4.rotation = 0;
        //移除时间监听
        this.onTouchEnd();
    };
    //手指按在指纹上
    p.onTouchBegin = function () {
        this.scanAnim();
        var self = this;
        this.timeoutID = setTimeout(function () {
            self.nextScene();
        }, 1000);
    };
    //手指离开指纹
    p.onTouchEnd = function () {
        clearTimeout(this.timeoutID);
    };
    //下一场景
    p.nextScene = function () {
        LayerManager.getInstance().runScene(GameManager.getInstance().roleScene);
    };
    //ring向前旋转
    p.ringAnimFront = function () {
        var self = this;
        egret.Tween.get(this.ring1).to({ rotation: this.turnAngle }, this.turnTime);
        egret.Tween.get(this.ring2).to({ rotation: -this.turnAngle }, this.turnTime);
        egret.Tween.get(this.ring3).to({ rotation: -this.turnAngle }, this.turnTime);
        egret.Tween.get(this.ring4).to({ rotation: -this.turnAngle }, this.turnTime);
        egret.Tween.get(this.ring5).to({ rotation: -this.turnAngle / 3 }, this.turnTime).call(function () {
            self.ringAnimBack();
        });
    };
    //ring向后旋转
    p.ringAnimBack = function () {
        var self = this;
        egret.Tween.get(this.ring1).to({ rotation: -this.turnAngle }, this.turnTime);
        egret.Tween.get(this.ring2).to({ rotation: this.turnAngle }, this.turnTime);
        egret.Tween.get(this.ring3).to({ rotation: this.turnAngle }, this.turnTime);
        egret.Tween.get(this.ring4).to({ rotation: this.turnAngle }, this.turnTime);
        egret.Tween.get(this.ring5).to({ rotation: this.turnAngle / 3 }, this.turnTime).call(function () {
            self.ringAnimFront();
        });
    };
    //人物缩放动画  由于缩放动画有问题，所以这里去掉了
    p.figureAnim = function () {
        var self = this;
        var image = this.figureList[this.curFigureIndex];
        this.curFigureIndex++;
        if (this.curFigureIndex >= this.figureList.length) {
            this.curFigureIndex = 0;
        }
        image.alpha = 0;
        image.scaleX = 0.5;
        image.scaleY = 0.5;
        egret.Tween.get(image).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 1000, egret.Ease.backOut).call(function () {
            //self.figureAnim();
        });
    };
    //扫描光标动画
    p.scanAnim = function () {
        var self = this;
        egret.Tween.get(this).wait(150).call(function () {
            self.scan.y += 50;
            if (self.scan.y > self.scanInitY + 150) {
                self.scan.y = self.scanInitY;
            }
            self.scanAnim();
        });
    };
    return HomeScene;
})(BaseScene);
egret.registerClass(HomeScene,"HomeScene");
