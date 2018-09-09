'use strict'

document.addEventListener('DOMContentLoaded', function(){

   const canvas = document.getElementById('canvas_bg')
   const context = canvas.getContext('2d')
   
   //dwitter short variables
   let c = canvas,
   ctx = context,
   w = 0,
   h = 0,
   mouseX = 0,
   mouseY = 0
   
   // Resets the canvas dimensions to match the window size
   //each time the DOM window resize event fires.
   window.addEventListener('resize', resizeCanvas, false);
   resizeCanvas();
   function resizeCanvas() {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
   }
   
   // Display a blue, 5 pixel border for canvas size debugging purpose
   function drawDebugBorder() {
      context.strokeStyle = 'blue';
      context.lineWidth = '5';
      context.strokeRect(0, 0, window.innerWidth, window.innerHeight);
   }
   drawDebugBorder();
   
   // Record the mouse position when it moves.
   canvas.addEventListener('mousemove', function(e) {
      mouseX = e.clientX
      mouseY = e.clientY
   });
   canvas.addEventListener('touchmove', function(e) {
      mouseX = e.touches[0].pageX
      mouseY = e.touches[0].pageY
   })
   
   /* 
   useful variables:
   c: the canvas element
   x: A 2D context for that canvas.
   w: Canvas width.
   h: Canvas height.
   mouseX
   mouseY
   */
   /* --------------[ setup ]-------------*/
   let distance = 80
   let pointDistance = 5
   let margin = 30
   let points = (w - margin*2)/pointDistance
   let i = -points/2
   /* --------------[ end setup ]-------------*/
   setTimeout(u, 200);
   function u(){
   /* --------------[ loop ]-------------*/



   //clear screen
   //ctx.clearRect(0, 0, w, h);
   ctx.beginPath();
   ctx.strokeStyle = 'rgb(0,0,0)'
   ctx.lineWidth = '1';
   
   
   let f = x=> x*x + 100*x -212
   
   //for(var i= -points/2; i< points/2; i++){
      let x = i
      let y = f(x)
      
      ctx.moveTo(x*pointDistance+margin+points*pointDistance/2, 0)
      ctx.lineTo(y*pointDistance+margin+points*pointDistance/2, h)
   //}
   
   i++
   if(i>points/2){
      i=-points/2
         ctx.clearRect(0, 0, w, h);
   }
   
   ctx.stroke()

   /* --------------[ end loop ]-------------*/  
   window.requestAnimationFrame(u)
   }
   

})
