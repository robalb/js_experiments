
let Game = {
  currentState: 0,
  init: function(canvasId, states){
    this.canvas = document.getElementById(canvasId)
    this.ctx = this.canvas.getContext('2d')
    
    this._states = states
    
    let resizeHandler = function(){
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      console.log('canvas size updated')
    }
    this._bindedResizeHandler = resizeHandler.bind(this)
    window.addEventListener('resize', this._bindedResizeHandler, false);
    this._bindedResizeHandler()
    
    let loopHandler = function(){
      this._states.loop.call(this)
      window.requestAnimationFrame(this._bindedLoopHandler)
    }
    this._bindedLoopHandler = loopHandler.bind(this)
  },
  start: function(state){
    switch(state){
      case 'boot':
        if(this.currentState === 0) {this.currentState++; this._states.boot.call(this)}
        else console.log('state already executed')
        break;
      case 'setup':
        if(this.currentState === 1) {this.currentState++; this._states.setup.call(this)}
        else console.log('state already executed',this.currentState)
        break;
      case 'loop':
        if(this.currentState === 2) {this.currentState++; this._bindedLoopHandler()}
        else console.log('state already executed')
        break;
      default: 
        console.log('state not found')
    }
  }
}


document.addEventListener('DOMContentLoaded', main );
function main(){
  Game.init('canvas_bg',
    {
      boot: boot,
      setup: setup,
      loop: loop
    }
  )
  Game.start('boot');
}
/* here we load resources, and draw initial loading/debug graphic */
function boot(){

  this.ctx.strokeStyle = 'blue';
  this.ctx.lineWidth = '5';
  this.ctx.strokeRect(0, 0, window.innerWidth, window.innerHeight);
  //this.ctx.font = "30px Comic Sans MS";
  this.ctx.font = "30px Monospace";
  this.ctx.fillStyle = "blue";
  this.ctx.textAlign = "center";
  this.ctx.fillText("loading", this.canvas.width/2, this.canvas.height/2 );
  
  this.start('setup')
}

/* here we initialize the variables we are going to need */
function setup(){
  
  
  this.start('loop')
}

/* this function is executed 60 times per second */
function loop(){
  

  
}




 
