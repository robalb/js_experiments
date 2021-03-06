document.addEventListener('DOMContentLoaded', function(){

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

   class Ball {
      constructor(){
         this.radius = 2
         this.x = w/2
         this.y = h/2
/*          this.vx = ( (Math.random()*2) >1 ? -1 :1)*(Math.random()*5)+0.1
         this.vy = ( (Math.random()*2) >1 ? -1 :1)*(Math.random()*5)+0.1 */
         this.vx = 8
         this.vy = 8
         this.color = Math.random()*100
         this.acceleration = .99
      }
      draw(){
         x.beginPath();
         x.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
         x.closePath();
         x.fillStyle = 'hsl('+this.color+', 40%, 70%)'
         x.fill();
      }
   }
   //instantiate ball
   let ball = new Ball()
      
   /* --------------[ end setup ]-------------*/
   setTimeout(u, 500);
   function u(){
   /* --------------[ loop ]-------------*/
   
   //clear screen
   //x.clearRect(0, 0, w, h);
   //x.beginPath();

   ball.draw()
   //move
   ball.x += ball.vx
   ball.y += ball.vy

   
   if(ball.x+ball.radius >= w || ball.x-ball.radius <= 0 ) ball.vx = -ball.vx
   if(ball.y+ball.radius >= h || ball.y-ball.radius <= 0 ) ball.vy = -ball.vy

   /* --------------[ end loop ]-------------*/  
   t++
   window.requestAnimationFrame(u)
   }
   

})


// for(i=0;i<2e2;i++)x.fillStyle=`hsla(${i*2+t*99},99%,50%)`,x.fillRect((w/2)+S(t)*9*i,(h/2)+C(t)*9*i,C(t)*i*C(i+t),S(t)*i*C(i+t))
 

/*
 --------------[ setup ]-------------
   let pointA = {
      x:Math.floor(Math.random()*w),
      y:Math.floor(Math.random()*h),
      
   }
   let pointB = {
      x:Math.floor(Math.random()*w),
      y:Math.floor(Math.random()*h)
   }
   let pointC = {
      x: 0,
      y: 0
   }
--------------[ loop ]-------------
//clear old poly
x.clearRect(0, 0, w, h);
x.beginPath();
//update vertex to cursor coords
pointC.x = mouseX
pointC.y = mouseY
//draw new poly
x.strokeStyle = 'rgba(0,0,0,1)'
x.lineWidth = 1
x.beginPath()
x.moveTo(pointA.x,pointA.y)
x.lineTo(pointB.x,pointB.y)
x.lineTo(pointC.x,pointC.y)
x.lineTo(pointA.x,pointA.y)
x.closePath()
x.stroke()

window.requestAnimationFrame(u)

*/