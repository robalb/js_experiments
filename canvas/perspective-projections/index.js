
import {Game} from './modules/gameStates.js';


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
  
  setTimeout( ()=> this.start('setup'), 500)
  
}

/* here we initialize the variables we are going to need */
function setup(){
  
  this.wheelZoom = 0
  this.controls = {
    w: false,
    a: false,
    s: false,
    d: false
  }
  
  this.cameraRelativeX = 0
  this.cameraRelativeY = 0
  this.cameraRelativeAngleX = 0
  this.cameraRelativeAngleY = 0
  
  this.canvas.addEventListener('mousemove', function(e) {
    Game.mouseX = e.clientX
    Game.mouseY = e.clientY
  });
  this.canvas.addEventListener('touchmove', function(e) {
    Game.mouseX = e.touches[0].pageX
    Game.mouseY = e.touches[0].pageY
  })

  
  let MouseWheelHandler = e =>{
    // cross-browser wheel delta
    var e = window.event || e; // old IE support
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    console.log(this.wheelZoom )
    
    this.wheelZoom += delta
    return false;
  }
  // IE9, Chrome, Safari, Opera
  this.canvas.addEventListener("mousewheel", MouseWheelHandler, false);
  // Firefox
  this.canvas.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
  
  
  this.canvas.requestPointerLock = this.canvas.requestPointerLock ||
                          this.canvas.mozRequestPointerLock;

  document.exitPointerLock = document.exitPointerLock ||
                           document.mozExitPointerLock;

  function lockChangeAlert() {
    if (document.pointerLockElement === Game.canvas ||
        document.mozPointerLockElement === Game.canvas) {
      console.log('The pointer lock status is now locked');
      document.addEventListener("mousemove", updatePosition, false);
    } else {
      console.log('The pointer lock status is now unlocked');  
      document.removeEventListener("mousemove", updatePosition, false);
    }
  }
  
  function updatePosition(e) {
  Game.cameraRelativeAngleX += e.movementX;
  Game.cameraRelativeAngleY += e.movementY;
  
  }

  this.canvas.onclick = function() {
    Game.canvas.requestPointerLock();
  }
  document.addEventListener('pointerlockchange', lockChangeAlert, false);
  document.addEventListener('mozpointerlockchange', lockChangeAlert, false);

  window.addEventListener("keydown", onKeyDown, false);
  window.addEventListener("keyup", onKeyUp, false);

  function onKeyDown(event) {
    let key = String.fromCharCode(event.keyCode).toLowerCase()
    if(Game.controls.hasOwnProperty(key))Game.controls[key] = true
  }
  
  function onKeyUp(event) {
    let key = String.fromCharCode(event.keyCode).toLowerCase()
    if(Game.controls.hasOwnProperty(key))Game.controls[key] = false
  }

  this.start('loop')
}

/* this function is executed 60 times per second */
function loop(){
  
 //clear the screen
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  
  //CONFIGURATION
  //pianta
  let piantaBottomMargin = 100
  let c1LeftMargin = 20
  let c2RightMargin = 20
  let piantaZoom = 8
  //alzato prospettico 
  let alzatoBottomMargin = 20
  let orizzonteHeight = this.mouseY * 2
  
  /* CANVAS COORDS SYSTEM
  
  0 ----------- canvasW
  |
  |
  |
  canvasH
  
  */
  let canvasW = this.canvas.width
  let canvasH = this.canvas.height
  
  
  /* PIANTA COORDS SYSTEM
  
           piantaH 
              |
              |
  ° -piantaW  |  piantaW °
              |
   -----------0-----------
  */
  let piantaW = canvasW/4
  let piantaH = canvasH - piantaBottomMargin
  //return a canvas coord relative to the pianta
  let px = x => piantaW + x /piantaZoom;
  let py = y => piantaH - y /piantaZoom;
  //basic geometric utility functions
  let pPoint = (x, y) => this.ctx.fillRect(px(x-1), py(y+1), 2, 2)
  
  class PShape{
    constructor(points){
      this.points = points
    }
    draw(){
      Game.ctx.moveTo(px(this.points[0].x), py(this.points[0].y))
        for(let i=1; i< this.points.length; i++){
          Game.ctx.lineTo(px(this.points[i].x), py(this.points[i].y))
        }
    }
    perspectiveDraw(cx,cy, z=200){
      let p1 = project(this.points[0].x, this.points[0].y, cx, cy-z)
      Game.ctx.moveTo(ax(p1.x), ay(p1.y+z))
      for(let i=1; i< this.points.length; i++){
        let pi = project(this.points[i].x, this.points[i].y , cx, cy-z)
        Game.ctx.lineTo(ax(pi.x), ay(pi.y+z))
      }
    }
    rotate(cx, cy, angle){
      this.points.forEach(point=> rotatePoint(cx, cy, angle, point))
    }
  }
  class PPoint{
    constructor(x, y, z=200){
      this.x = x
      this.y = y
      this.z = z
      this.cameraY = -(piantaW - c2RightMargin)
    }
    draw(){
      pPoint(this.x, this.y)
    }
    perspectiveDraw(cx,cy, z){
      
      if(this.y>this.cameraY){
        let pi = project(this.x, this.y , cx, cy-this.z)
        aPoint(pi.x, pi.y+this.z)
      }
    }
    rotate(cx, cy, angle){
      let p = {
        x:this.x,
        y:this.y
      }
      rotatePoint(cx, cy, angle, p)
      this.x = p.x
      this.y = p.y
    }
  }

  /* ALZATO COORDS SYSTEM
           alzatoH 
              |
              |
  ° -alzatoW  |   alzatoW °
              |
   -----------0-----------
  */
  let alzatoW = canvasW/4
  let alzatoH = orizzonteHeight
  //return a canvas coord relative to the alzato
  let ax = x => alzatoW + x + alzatoW*2
  let ay = y => canvasH - alzatoBottomMargin - y
  //basic geometric utility functions
  let aPoint = (x, y) => this.ctx.fillRect(ax(x-1), ay(y+1), 2, 2)
  
  //magic conversion from pianta to alzato
  let project = (px, py, cx, cy, z=0) => {
    
    let x = px*cx/(cx+py)
    
    let y = cy*(x - px -py)/-(cx + px + py)

    
    return {
      x:x,
      y:y
    }
    
  }
  //magic point rotation
  //TODO: make this procedural
  function rotatePoint(cx, cy, angle, p){

    let s = Math.sin(angle);
    let c = Math.cos(angle);

    // translate point back to origin:
    p.x -= cx;
    p.y -= cy;

    // rotate point
    let xnew = p.x * c - p.y * s;
    let ynew = p.x * s + p.y * c;

    // translate point back:
    p.x = xnew + cx;
    p.y = ynew + cy;
    
  }

  /*
    setup linees for pianta and alzato prospettico
  */
  this.ctx.lineWidth = '2';
  //screen divisor
  this.ctx.beginPath();
  this.ctx.strokeStyle = "white";
  this.ctx.moveTo(canvasW/2, 0)
  this.ctx.lineTo(canvasW/2, canvasH)
  this.ctx.stroke()
  //-- PIANTA --
  this.ctx.beginPath();
  this.ctx.strokeStyle = "hsl(0, 0%, 40%)";
  //linea orizzontale = linea di terra
  this.ctx.moveTo(px(-1*piantaW), py(0))
  this.ctx.lineTo(px(piantaW), py(0))
  this.ctx.stroke() 

  //linees connecting c1 and c2 to osservatore
  let osservatorePX = px(0)
  let osservatorePY = py( -1*(piantaW - c2RightMargin) )
  this.ctx.beginPath();
  this.ctx.fillStyle = "hsl(10, 60%, 6%)"
  this.ctx.moveTo(px(-1*piantaW + c1LeftMargin), py(0))
  this.ctx.lineTo(osservatorePX, osservatorePY)
  this.ctx.lineTo(px(piantaW - c2RightMargin), py(0))
  this.ctx.lineTo(px(-1*piantaW + c1LeftMargin), py(0))
  this.ctx.fill()
  this.ctx.stroke()
    //c1 and c2
  this.ctx.fillStyle = "yellow"
  pPoint(-1*piantaW + c1LeftMargin, 0)
  pPoint(piantaW - c2RightMargin, 0)
  //line connecting punto di vista to punto principale
  this.ctx.beginPath();
  this.ctx.setLineDash([2, 10]);
  this.ctx.moveTo(px(0), osservatorePY)
  this.ctx.lineTo(px(0), py(0))
  this.ctx.stroke()
  this.ctx.closePath()
  this.ctx.setLineDash([]);
  //-- ALZATO PROSPETTICO --
  this.ctx.beginPath();
  this.ctx.strokeStyle = "hsl(0, 0%, 40%)";
  //linea orizzontale
  this.ctx.moveTo(ax(-1*alzatoW),ay(0))
  this.ctx.lineTo(ax(alzatoW), ay(0))
  //linea d'orizzonte
  this.ctx.moveTo(ax(-1*alzatoW),ay(alzatoH))
  this.ctx.lineTo(ax(alzatoW), ay(alzatoH)) 
  this.ctx.stroke()
  //c1 and c2
  this.ctx.fillStyle = "yellow"
  aPoint(-1*alzatoW + c1LeftMargin, alzatoH)
  aPoint(alzatoW - c2RightMargin, alzatoH)
  
  //ACTUAL STUFF
  
  
  
  //controls
  if(this.controls.w)this.cameraRelativeX -= 0.8
  if(this.controls.s)this.cameraRelativeX += 0.8
  if(this.controls.a)this.cameraRelativeY += 0.8
  if(this.controls.d)this.cameraRelativeY -= 0.8
  
  
  
  this.ctx.beginPath();
  this.ctx.strokeStyle = "orange"
  this.ctx.fillStyle = "orange"
  aPoint(0, 10)
  
  let PPoints = []
  let PShapes = [
   /*  new PShape([
      new PPoint(-1*alzatoW + 20 , 10),
      new PPoint(-1*alzatoW +20, 100),
      new PPoint(alzatoW -20, 100)
    ]),

    new PShape([
      new PPoint(-150, 20),
      new PPoint(150, 20),
      new PPoint(150, 320),
      new PPoint(-150, 320),
      new PPoint(-150, 20),
    ]) */
  ]
  

  
  //let distanceFromQPlane = this.mouseX /2 //- 2000 //grid goes trough spectator, into an inverse perspective world
  let distanceFromQPlane = this.cameraRelativeX*15
  let gridAmount = 1.001 // 1.001 => only the square outline 
  let spacing = piantaW/gridAmount*2
/*   for(let i=0; i<gridAmount; i++){
    PShapes.push(
      new PShape([
        //vertical linees
        new PPoint(spacing * i -piantaW, distanceFromQPlane),
        new PPoint(spacing * i -piantaW, spacing*gridAmount + distanceFromQPlane)
      ])
    )
    PShapes.push(
      new PShape([
        //horizzontal linees
        new PPoint(-piantaW, i*spacing +distanceFromQPlane),
        new PPoint(piantaW,i*spacing +distanceFromQPlane)
      ])
    ) 
  } */
  
  let pointsPerLine = 20
  let Xspacing = 10
  
  for(let i=0; i< pointsPerLine; i++){
    for(let j=0; j< pointsPerLine; j++){
      for(let k=0; k< pointsPerLine; k++){
        PPoints.push(
          new PPoint(-piantaW + k*Xspacing , distanceFromQPlane + j*Xspacing, i*Xspacing)
        )
      }
    }
  }
  
  
  
  
  PPoints.forEach(point => point.rotate(0, -py( piantaW - c2RightMargin )+0.001, 100 + this.cameraRelativeAngleX/200)) 
  PPoints.forEach(point => {
    point.x += this.cameraRelativeY*25
    point.y += this.cameraRelativeX*15
  }) 
  PPoints.forEach(point => point.draw()) 
  PPoints.forEach(point => point.perspectiveDraw(alzatoW+c1LeftMargin, alzatoH, 160)) 
  
  
  PShapes.forEach(shape => shape.rotate(0, -py( piantaW - c2RightMargin )+0.001, 100 + this.mouseX /500)) 
  
  PShapes.forEach(shape => {
    shape.draw()
    for(let i=0; i< 4; i++){
      shape.perspectiveDraw(alzatoW+c1LeftMargin, alzatoH, i*160)
    }
  })
  this.ctx.stroke()
  
  
}





 
