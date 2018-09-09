'use strict'

document.addEventListener('DOMContentLoaded', function(){

   const canvas = document.getElementById('canvas_bg')
   const context = canvas.getContext('2d')
   
   //dwitter short variables
   let c = canvas,
   x = context,
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

   class Ball {
      constructor(){
         this.radius = 16
         this.x = w/2
         this.y = h/2
/*          this.vx = ( (Math.random()*2) >1 ? -1 :1)*(Math.random()*5)+0.1
         this.vy = ( (Math.random()*2) >1 ? -1 :1)*(Math.random()*5)+0.1 */
         this.vx = 8 + (Math.random()*8)
         this.vy = 8 - (Math.random()*16)
         this.acceleration = .99
      }
      respawn(){
         this.x = w/2
         this.y = h/2
         this.vx = 10 + (Math.random()*8)
         this.vy = 10 - (Math.random()*20)
      }
      draw(){
         x.fillStyle = 'hsl(1, 0%, 100%)'
         x.beginPath();
         x.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
         x.closePath();
         x.fill();
      }
   }
   
   class Particle {
      constructor(x, y){
         this.x = x
         this.y = y
         this.size = 5 + Math.random()*20
         this.life = 2 + Math.random()*40
         this.maxLife = this.life
      }
      regenerate(x, y){
         this.x = x + 5 - Math.random()*10
         this.y = y + 5 - Math.random()*20
         this.size = 5 + Math.random()*10
         this.life = 2 + Math.random()*40
         this.maxLife = this.life
      }
      draw(){
         let lightness = (this.life*100)/this.maxLife-40
         x.beginPath();
         x.fillStyle = 'hsl(1, 0%, '+lightness+'%)'
         x.rect(this.x, this.y, this.size, this.size)
         x.closePath();
         x.fill()
      }
   }
   //instantiate ball
   let ball = new Ball()
   //instantiate particles
   let tray = []
   for(let i = 0; i< 200; i++){
      tray[i] = new Particle(ball.x, ball.y)
   }
   
   let rectHeight = 80
   let rectWidth = 20
   
   let inGame = true
   let humanScore = 0
   let aiScore = 0
   let time = 0

   /* --------------[ end setup ]-------------*/
   setTimeout(u, 200);
   function u(){
   /* --------------[ loop ]-------------*/
   
   //clear screen
   x.clearRect(rectWidth, 0, w, h);
   x.beginPath();
   x.fillStyle = 'rgba(0,0,0,0.4)'
   x.rect(0, 0, rectWidth, h);
   x.closePath();
   x.fill();
   //draw tray
   if(inGame){
      tray.forEach(particle=>{
         particle.draw()
         particle.life--
         if(particle.life <= 1){
            particle.regenerate(ball.x, ball.y)
         }
      })
   }
   //draw ball
   ball.draw()
   //move ball
   ball.x += ball.vx
   ball.y += ball.vy
   //display scores
   if(!inGame){
      //ontext.font = "30px Comic Sans MS";
      x.font = "30px Monospace";
      x.textAlign = "center";
      let light = time/10*6 +20
      x.fillStyle = 'hsl(1, 0%, '+light+'%)'
      x.fillText(humanScore+" - "+aiScore, w/2, h/2 );
      time ++
      if(time > 60){
         inGame = true
         ball.respawn()
         tray.forEach(particle=>particle.regenerate(ball.x, ball.y) )
      }
   }
   //the positions relative to which the rectangles are drawn
   let trackedMouseY = mouseY
   if(trackedMouseY >= (h - rectHeight/2))trackedMouseY = (h - rectHeight/2)
   let trackedBallY = ball.y
   if(trackedBallY >= (h - rectHeight/2))trackedBallY = (h - rectHeight/2)
   //draw rectanlges
   if(trackedMouseY < rectHeight/2)trackedMouseY = rectHeight/2  
   if(inGame){
      x.fillStyle = 'hsl(1, 0%, 100%)'
      x.beginPath();
      //ai rectangle
      x.rect(w - 20, trackedBallY - (rectHeight/2) + 10, rectWidth, rectHeight)
      //player rectangle
      x.rect(0, trackedMouseY-(rectHeight/2), rectWidth, rectHeight)
      x.fill()
      x.closePath();
   }
   //collisions check
   //up/down borders
   if(ball.y+ball.radius >= h || ball.y-ball.radius <= 0 ) ball.vy = -ball.vy
   //ai side
   if(ball.x+ball.radius >= w-20){
      //accelerate and randomize angle
      ball.vx += .4 + Math.random()
      ball.vy += .4 + Math.random()
      ball.vx = -ball.vx
   }
   //player side
   if(inGame && ball.x-ball.radius <= 20){
      if(trackedMouseY-(rectHeight/2)-ball.radius < ball.y && trackedMouseY+(rectHeight/2)+ball.radius > ball.y){
         ball.vx = -ball.vx
         //accelerate and randomize angle
         ball.vx += .4 + Math.random()
         ball.vy += .4 + Math.random()
      }else{
         inGame = false
         aiScore ++
         time = 0
      }
   }

   /* --------------[ end loop ]-------------*/  
   window.requestAnimationFrame(u)
   }
   

})
