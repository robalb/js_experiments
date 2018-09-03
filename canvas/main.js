document.addEventListener('DOMContentLoaded', function(){

   // Obtain a reference to the canvas element using its id.
   const htmlCanvas = document.getElementById('canvas_bg'),
   // Obtain a graphics context on the canvas element for drawing.
    context = htmlCanvas.getContext('2d');
    
   let c = htmlCanvas,
   x = context
   h = 0,//height
   w = 0,//width
   t = 0,//elapsed time
   mouseX = 0,
   mouseY = 0,
   S = Math.sin,
   C = Math.cos,
   T = Math.tan,  
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
      redraw();
   }
   


   // Display custom canvas. In this case it's a blue, 5 pixel 
   // border that resizes along with the browser window.
   function redraw() {
     context.strokeStyle = 'blue';
     context.lineWidth = '5';
     context.strokeRect(0, 0, window.innerWidth, window.innerHeight);
   }
   
   let r = Math.floor(Math.random()*254),
      g = Math.floor(Math.random()*254),
      b = Math.floor(Math.random()*254)
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

   class Star {
      constructor(){
         this.area = 20
         this.x = w/2
         this.y = h/2
         this.vx = ( (Math.random()*2) >1 ? -1 :1)*(Math.random()*5)+0.1
         this.vy = ( (Math.random()*2) >1 ? -1 :1)*(Math.random()*5)+0.1
         this.radius = 0
         this.maxRadius = (Math.random()*2)+1
         this.acceleration = 1 + (this.maxRadius)/100
         this.lightness = Math.random()*100
      }
      draw(){
         x.beginPath();
         x.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
         x.closePath();
         x.fillStyle = 'hsl(234, 40%, '+this.lightness+'%)'
         x.fill();
      }
   }
   //create 10 stars
   let stars = []
   for(let i=0;i< 1000; i++) stars[i] = new Star()
      
   /* --------------[ end setup ]-------------*/
   setTimeout(u, 500);
   function u(){
   /* --------------[ loop ]-------------*/
   
   //clear screen
   x.clearRect(0, 0, w, h);
   x.beginPath();
   //draw and move every star
   for(let star of stars){
      star.draw()
      //move
      star.x += star.vx
      star.y += star.vy
      //accelerate

      star.vx *= star.acceleration
      star.vy *= star.acceleration
      //increase size
      if(star.radius < star.maxRadius) star.radius += 0.02
      //move star back to center when it reaches the borders
      if(star.x+star.radius >= w || star.x-star.radius <= 0 ||
      star.y+star.radius >= h || star.y-star.radius <= 0){
         star.x = w/2
         star.y = h/2
         star.radius = 0
         star.vx = ( (Math.random()*2) >1 ? -1 :1)*(Math.random()*5)+0.1
         star.vy = ( (Math.random()*2) >1 ? -1 :1)*(Math.random()*5)+0.1
      }
   }

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