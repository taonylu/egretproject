
/*JS对象测试
1. 对象的定义
2. 对象的使用
3. 继承
4. 接口
5. 重载
6. 多态
7. 内部类
8. 对象的public,protected,private
9. 判断对象类型
10. JS调用另一个JS，所有的JS都是全局的..
*/


//1.对象的定义
function Person(name,age){
    this.name = name;   //单独的属性副本，引用类型friends不会在多个实例间共享
    this.age = age;
    this.friends = [];
}

Person.prototype = {      //原型的属性方法会被实例间共享，但是实例重新赋值属性和方法后，会屏蔽原型属性。
    constructor:Person,   //重新指向Person，不然无法正确判断实例类型
    color:"yellow",       //多个实例共享color，p1 color重新赋值后，不会改变p2 color
    //friends:[],         //多个实例间会共享friends，p1 friends赋值后，会改变p2 friends，但是p1 friends=[]后则不会再改变p2 friends。
    sayName:function(){   //共享的函数，sayName在多个实例间共享，节约内存
        console.log(this.name);
    }
}

Person.prototype.getAge = function(){  //返回值不需要定义
    return this.age;
}

//一个文件内，可以定义多个类
function Cat(){
    this.name;
    this.age;
}

//2.对象的使用
/*
var p1 = new Person("peter",15);
p1.sayName();  //peter
*/

//3.对象的继承
/*
function Father(){
    this.name = "father";
    this.age = 66;
}

Father.prototype = {
    constructor:Father,
    sayName:function(){
       console.log(this.name);
    }
}

function Son(){
    this.name = "Son";
}

Son.prototype = new Father();

//Son.prototype.sayName = function(){  //重命名方法一定要放在 Son.prototype = new Father() 之后
///    console.log("Son sayname");
//}

var son = new Son();
son.sayName();  //Son
console.log(son.age);   //66
*/

//4. 接口
//没有接口

//5. 重载
//没有重载，后定义的会覆盖前面定义

//6. 多态
//支持, constructor来判断类型

//7. 内部类
/*
function OutClass(){
    this.name = "OutClass";
    function InClass(){
        this.name = "InClass";
    }
    this.inClass = new InClass();
    this.sayInClassName = function(){
        console.log(this.inClass.name);
    }
}

var outClass = new OutClass();
outClass.sayInClassName();
*/

//8. 对象的public protected private
//貌似没有

//9.判断对象类型
/*
var p2 = new Person("peter",15);
console.log(p2 instanceof  Person); //true
console.log(p2 instanceof  Object); //true
*/


