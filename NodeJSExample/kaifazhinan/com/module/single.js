


var name = "peter";



function setName(_name){
	name = _name;
}

function getName(){
	return name;
}

//1. 使用setName修改name后，外部获取single.name仍然是初始值peter
//   因为exports是一个对象，提供有限的访问接口，exports.name是新建的动态属性
//2. exports必须写在定义后面
exports.name = name;   
exports.setName = setName;
exports.getName = getName; //获取的是修改后的name

