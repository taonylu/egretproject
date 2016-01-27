//封装了一个对象
function Hello(){
	var name;

	this.setName = function(_name){
		name = _name;
	}

	getName:funtion(){
		return name;
	}
}

module.exports = Hello;