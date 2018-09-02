document.addEventListener('DOMContentLoaded', function(){

   // Obtain a reference to the canvas element using its id.
   const htmlCanvas = document.getElementById('canvas_bg'),
   // Obtain a graphics context on the canvas element for drawing.
    context = htmlCanvas.getContext('2d');

   // Register an event listener to call the resizeCanvas() function 
   // each time the window is resized.
   window.addEventListener('resize', resizeCanvas, false);
   // Draw canvas border for the first time.
   resizeCanvas();

   // Runs each time the DOM window resize event fires.
   // Resets the canvas dimensions to match window,
   // then draws the new borders accordingly.
   function resizeCanvas() {
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
   
   
   // Record the mouse position when it moves.
   htmlCanvas.addEventListener('mousemove', function(e) {
      context.fillStyle = "#000000";
      context.fillRect (e.clientX, e.clientY, 4, 4);
   });



})