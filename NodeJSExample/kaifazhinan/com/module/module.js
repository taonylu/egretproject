//封装了一个对象
function Hello(){
	var name;

	this.setName = function(_name){
		name = _name;
	}

	this.getName = function(){
		return name;
	}
}

module.exports = Hello;   //require后， var hello = new Hello ，区别于下方：两次new的不是相同的对象
//exports.Hello = Hello   //var hello = require(..module.js)，单例

