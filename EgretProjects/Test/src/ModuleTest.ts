/**
 *
 * @author 
 *
 */
module ModuleTest {
	
    export function run(){  //只能使用public函数walk
        instance.walk();
    };
    
    //export instance.father;  //public属性无法使用
    
    class Person {
          constructor(){
          };
          
          private nickName:string = "Peter";
          protected age:number = 18;
          public father:string = "Davi";
          
          private run(){
              console.log("run");
          }
          
          protected jump() {
              console.log("jump");
          }
          
          public walk() {
              console.log("walk");
          }
          
    }
    var instance: Person = new Person();
}
