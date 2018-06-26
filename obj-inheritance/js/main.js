
/*
Function Car()

__proto__: function {
    //all the Function stuff
}
prototype:{
    dumpData: function dumpData(){...}
    constructor: function Car(){}
    __proto__: Object{
        //all the object stuff
    }
}



*/


function Car(a,b){
    this.a = a || "z";
    this.b = b || "z";
}
Car.prototype.dumpData = function(){
    return this.a+" "+this.b;
}





/*
a: "aa1",
b: "bb1",
__proto__: {
​​
    constructor: function Car(),
    ​​
    dumpData: function dumpData(),
    ​​
    __proto__: Object {
        //all the Object stuff
    }

}
*/
var car1 = new Car("aa1","bb1");

/*
a: "aa2",
b: "bb2",
__proto__: {
​​
    constructor: function Car(),
    ​​
    dumpData: function dumpData(),
    ​​
    __proto__: Object {
        //all the Object stuff
    }

}
*/
var car2 = new Car("aa2","bb2");

let a = 2;
console.log(a);
