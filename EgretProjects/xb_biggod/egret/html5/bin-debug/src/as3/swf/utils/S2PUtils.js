var egret;
(function (egret) {
    var S2PUtils = (function () {
        function S2PUtils() {
        }
        var __egretProto__ = S2PUtils.prototype;
        /**
         * 从对象取值
         * @param source
         * @param target
         *
         */
        S2PUtils.TransFromObject = function (target, source) {
            for (var key in source) {
                target[key] = source[key];
            }
        };
        /**
         * 还原显示对象的transform属性
         * @param dis
         * @param po
         *
         */
        S2PUtils.SetTransform = function (dis, po) {
            S2PUtils.SetMatrixAndColorTransform(dis, po);
        };
        S2PUtils.SetMatrixAndColorTransform = function (dis, po) {
            if (null == po || null == dis) {
                return;
            }
            if (!(dis instanceof egret.DisplayObject)) {
                return;
            }
            dis.x = po.tx;
            dis.y = po.ty;
            dis.scaleX = po.sx;
            dis.scaleY = po.sy;
            dis.rotation = po.r;
            //var m:Matrix = new egret.Matrix(po.m.a, po.m.b, po.m.c, po.m.d, po.m.tx, po.m.ty);
            //// 现在在引擎里matrix的功能有一些问题，设置matrix之后显示对象的缩放功能即失效了。matrix与x,y,scaleX,scaleY等属性没有关联上。
            //dis.transform.matrix = m;/* 注意： 设置matrix的方式不会改变显示对象的x,y,scaleX,scaleY等属性。 x y值会影响输入文本*/
            //dis.x = m.tx;// 设置matrix之后我再设置下x，否则x值不会改变
            //dis.y = m.ty;// 设置matrix之后我再设置下x，否则y值不会改变
            //// 从matrix计算旋转与缩放 - 有问题，在rotation为90时，计算的scaleX为0，无法显示显示对象。
            ////dis.scaleX = m.a / Math.cos(Math.atan(m.b/m.a));
            ////dis.scaleY = m.d / Math.cos(Math.atan(m.b/m.a));
            ////dis.rotation = Math.atan(m.b/m.a)*180/Math.PI;
            ////dis.x = m.tx;
            ////dis.y = m.ty;
            if (null != po.color) {
                var colorTF = new egret.ColorTransform(po.color.rm, po.color.gm, po.color.bm, po.color.am, po.color.ro, po.color.go, po.color.bo, po.color.ao);
                dis.transform.colorTransform = colorTF;
                dis.alpha = po.color.am;
            }
        };
        return S2PUtils;
    })();
    egret.S2PUtils = S2PUtils;
    S2PUtils.prototype.__class__ = "egret.S2PUtils";
})(egret || (egret = {}));
