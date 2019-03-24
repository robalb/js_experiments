class Input{
  constructor(id, ev, callback){
    this.id = id
    this.ev = ev
    this.callback = callback
    this.el = document.getElementById(id)
    this.el.addEventListener(this.ev, this.callback)
  }
  remove(){
    this.el.removeEventListener(this.ev, this.callback)
  }
}

document.addEventListener('DOMContentLoaded', function(){

  let toggleButtonEl = document.getElementById('toggle-options');
  let optionsEl = document.getElementById('options');
  let isVisible = true;
  toggleButtonEl.addEventListener('click', ()=> {
    if(isVisible){ 
      isVisible = false
      optionsEl.style.display = 'none';
    }else{
      isVisible = true;
      optionsEl.style.display = 'block';
    }
  })
  let options = {}
  let input1 = new Input('input1', 'change', ()=>{
    options.input1 = document.getElementById('input1').value
  })
  let input2 = new Input('input2', 'change', ()=>{
    options.input2 = document.getElementById('input2').value
  })
  let input3 = new Input('input3', 'click', ()=>{
    console.log(options)
  })
  
   const htmlCanvas = document.getElementById('canvas_bg')
   const context = htmlCanvas.getContext('2d')
    
   let c = htmlCanvas,
   x = context,
   t = 0,
   S = Math.sin,
   C = Math.cos,
   T = Math.tan,
   w = 0,
   h = 0,
   mouseX = 0,
   mouseY = 0,
   R = (r=0,g=0,b=0,a=1) => `rgba(${r},${g},${b},${a})`
 
   // Register an event listener to call the resizeCanvas() function 
   // each time the window is resized.
   window.addEventListener('resize', resizeCanvas, false);
   // Draw canvas border for the first time.
   resizeCanvas();
   // Runs each time the DOM window resize event fires.
   // Resets the canvas dimensions to match window,
   // then draws the new borders accordingly.
   function resizeCanvas() {
      w = window.innerWidth
      h = window.innerHeight
      htmlCanvas.width = window.innerWidth;
      htmlCanvas.height = window.innerHeight;
   }
   
   // Display custom canvas. In this case it's a blue, 5 pixel 
   // border that resizes along with the browser window.
   function drawSetup() {
      context.strokeStyle = 'blue';
      context.lineWidth = '5';
      context.strokeRect(0, 0, window.innerWidth, window.innerHeight);
      //context.font = "30px Comic Sans MS";
      context.font = "30px Monospace";
      context.fillStyle = "blue";
      context.textAlign = "center";
      context.fillText("loading", w/2, h/2 ); 
   }
   drawSetup();
   
   // Record the mouse position when it moves.
   htmlCanvas.addEventListener('mousemove', function(e) {
      mouseX = e.clientX
      mouseY = e.clientY
   });
   
   /* executed 20 times per second
   useful variables:
   u(t) is called 60 times per second.
   t: Elapsed time in seconds.
   S: Shorthand for Math.sin.
   C: Shorthand for Math.cos.
   T: Shorthand for Math.tan.
   R: Function that generates rgba-strings, usage ex.: R(255, 255, 255, 0.5)
   c: A 1920x1080 canvas.
   x: A 2D context for that canvas.
   
   w: Canvas width.
   h: Canvas height.
   mouseX: Doesn't need explanations.
   mouseY: 
   */
   /* --------------[ setup ]-------------*/

   /* --------------[ end setup ]-------------*/
  setTimeout(u, 500);
  function u(){
  /* --------------[ loop ]-------------*/
    x.beginPath();
    x.fillStyle = 'rgba(0,0,0,1)'
    x.rect(0, 0, w, h);
    x.closePath();
    x.fill();
    
    x.fillStyle = 'rgba(255,255,255,1)'
    x.strokeStyle = 'rgba(255,255,255,1)'
    x.lineWidth = '1';
    
    let particleRadius = 5
    let maxAmplitude = 100
    let angularOffset = options.input2/ w/8
    let particlesOnScreen = w
    
    let amplitude = h/2>maxAmplitude ? maxAmplitude : h/2
    
    x.beginPath();
    x.moveTo(0, h/2 + S(t)* amplitude)
    
    for(let i=1; i< particlesOnScreen; i++){
      x.lineTo(i, h/2 + S(t +i*angularOffset)*amplitude)
    }
    x.stroke()

  /* --------------[ end loop ]-------------*/  
  t+= .020
  window.requestAnimationFrame(u)
  }
   

})
