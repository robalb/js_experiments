var module = function(){
  // configuration, change things here
  var config = {
    CSS:{
     classes:{
       hover:'hover',
       active:'current',
       jsEnabled:'js'
     },
     ids:{
       container:'maincontainer'
     } 
    },
    timeout:2000,
    userID:'chrisheilmann'
  };
 
  // start of main code
  // TODO: this will call the private metohod that creates all the callbacks and ui listeners.
  function init(){
    // check if the first argument is an object
    var a = arguments;
    if(isObj(a[ 0 ])){
      var cfg = a[ 0 ];
 
      // loop through arguments and alter the configuration
      for(var i in cfg){
        setConfig(config,i,cfg[i]);
      }
    }
  };
 
  function setConfig(o,p,v){
    // loop through all the properties of he object
    for(var i in o){
      // when the value is an object call this function recursively
      if(isObj(o[i])){
        setConfig(o[i],p,v);
 
      // otherwise compare properties and set their value accordingly
      } else {
        if(i === p){o[p] = v;};
      }
    }
  };
 
  // tests if a parameter is an object (and not an array)
  function isObj(o){
    return (typeof o === 'object' && typeof o.splice !== 'function');
  }
  // ... more methods and other code ...
  // make init a public method
  return {
    init:init
  };
}();
module.init({
    //TODO: this will initialize the main module with php received data as parameters
  container:'header',
  'timeout':1000
});