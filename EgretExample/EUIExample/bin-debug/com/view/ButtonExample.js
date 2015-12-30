/**
 *
 * @author
 *
 */
var ButtonExample = (function (_super) {
    __extends(ButtonExample, _super);
    function ButtonExample() {
        _super.call(this);
        this.toggleBtns = [];
        this.skinName = "resource/myskin/ButtonTestSkin.exml";
    }
    var d = __define,c=ButtonExample;p=c.prototype;
    //-----------------------测试按钮-----------------
    //1 普通按钮
    //2 复选框
    //3 单选按钮 单选按钮组
    //4 状态切换按钮
    p.test = function () {
        GameConst.main.addChild(this);
        //1 default.thm.json中skins.Button存在时，才能在代码里新建Button
        //因为Button的逻辑代码与皮肤相关，例如皮肤exml中必须有Button逻辑代码里对应ID的组件
        var btn = new eui.Button();
        btn.labelDisplay = RES.getRes("test_jpg");
        btn.icon = RES.getRes("test_jpg");
        this.addChild(btn);
        //2 复选框
        var check = new eui.CheckBox();
        check.x = 100;
        check.y = 0;
        console.log(check.selected);
        check.selected = true; //设置为已勾选
        this.addChild(check);
        //3 单选按钮
        var radioGroup = new eui.RadioButtonGroup();
        radioGroup.addEventListener(eui.UIEvent.CHANGE, this.radioChangeHandler, this);
        var rdb = new eui.RadioButton();
        rdb.label = "选择我1";
        rdb.value = 145;
        rdb.group = radioGroup;
        this.addChild(rdb);
        var rdb2 = new eui.RadioButton();
        rdb2.y = 30;
        rdb2.label = "选择我2";
        rdb2.value = 272;
        rdb2.selected = true; //默认选项
        rdb2.group = radioGroup;
        this.addChild(rdb2);
        for (var i = 0; i < 4; i++) {
            var toggleBtn = new eui.ToggleButton();
            toggleBtn.label = i + 1 + "";
            toggleBtn.y = 100;
            toggleBtn.width = 80;
            toggleBtn.height = 60;
            toggleBtn.x = 20 + i * 80;
            toggleBtn.addEventListener(eui.UIEvent.CHANGE, this.toggleChangeHandler, this);
            this.toggleBtns.push(toggleBtn);
            this.addChild(toggleBtn);
        }
    };
    p.radioChangeHandler = function (evt) {
        var radioGroup = evt.target;
        console.log(radioGroup.selectedValue);
    };
    p.toggleChangeHandler = function (evt) {
        for (var i = 0; i < this.toggleBtns.length; i++) {
            var btn = this.toggleBtns[i];
            btn.selected = (btn == evt.target);
        }
    };
    return ButtonExample;
})(eui.Component);
egret.registerClass(ButtonExample,"ButtonExample");
