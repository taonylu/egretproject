/**
 *
 * @author
 *
 */
var HTMLText = (function () {
    function HTMLText() {
        var gameDiv = document.getElementById("gameDiv");
        this.myText = document.createElement("p");
        this.myText.style.border = "0px";
        this.myText.style.backgroundColor = "transparent";
        this.myText.style.position = "absolute";
        this.myText.style.fontSize = "25px";
        this.myText.style.display = "none";
        gameDiv.appendChild(this.myText);
    }
    var d = __define,c=HTMLText,p=c.prototype;
    p.setValue = function (value) {
        this.myText.style.display = "inline";
        this.myText.innerHTML = value;
    };
    p.setPosition = function (_x, _y) {
        this.myText.style.left = _x + "px";
        this.myText.style.top = _y + "px";
    };
    p.hide = function () {
        this.myText.style.display = "none";
    };
    return HTMLText;
}());
egret.registerClass(HTMLText,'HTMLText');
