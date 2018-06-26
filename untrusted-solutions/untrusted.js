/**
* my solutions to http://alexnisnevich.github.io/untrusted/
*
*/


/*
* level 2
*/
//line 14
maze = new ROT.Map.DividedMaze(1,1);
//line 34
map.placeObject(8,5, 'exit');


/*
* level 3
*/
// line 15
for (y = 10; y <= map.getHeight() - 3; y++) {
  map.placeObject(3, y, 'block');//changed 5 into 3
  map.placeObject(map.getWidth() - 5, y, 'block');
}

for (x = 5; x <= map.getWidth() - 5; x++) {
  map.placeObject(x, 10, 'block');
  map.placeObject(x, map.getHeight() - 3, 'block');
}


/*
* level 4
*/
//line 22
map.placeObject(map.getWidth()-5, map.getHeight() - 5, 'exit');


/*
* level 5
* the code at line 34 overwrites the random function, reducing the range of numbers generated.
* just reach the end by staying on the right border and then on the bottom border, where mines are
* not generated
*/
//line 34
getRandomInt = function(min,max){
max -=4
return Math.floor(Math.random() * (max - min + 1)) + min;
}


/*
*level 6
* the moveTorward method is overwritten so that the drone walks always to the left
* instead of following the player.
*/
//line 58
moveToward = o=>o.move('left')


/*
* level 7
* just phone to change the color
*/
//line 22
   var player = map.getPlayer();
   map.gp = map.gp==undefined?0:map.gp+1;
   var arrayColor = ['f00','ff0','0f0','f00','ff0','00f']
   player.setColor('#'+arrayColor[map.gp]);


/*
* level 8
* spam the phone button to regenerate the map and move to the right everytime the new map has
* some space in front of you
*/
//line 101 
"generateForest"


/*
* level 9
* walk on the boat, then call the phone callback and walk up on the water. the boat will follow you
*/
//line 48
player.setPhoneCallback(_=>raftDirection = 'up')


/*
* level 10
*/
// line 47
//line 59
//line 71


/*
* level 11
* this is the code of the homing drones applied to the robot.
* simply press the r button while standing near the purple door to receive the key
*/
//line 35
obj = me;
var target = obj.findNearest('player');
var leftDist = obj.getX() - target.x;
var upDist = obj.getY() - target.y;

var direction;
if (upDist == 0 && leftDist == 0) {
   return;
} if (upDist > 0 && upDist >= leftDist) {
   direction = 'up';
} else if (upDist < 0 && upDist < leftDist) {
   direction = 'down';
} else if (leftDist > 0 && leftDist >= upDist) {
   direction = 'left';
} else {
   direction = 'right';
}

if (obj.canMove(direction)) {
   obj.move(direction);
}


/*
* level 12
* this code overwrite the phoneCallback to change the direction of the robot.
* press the phone button to rotate the direction of the robot. press r to move the robot
* press the phone button twice before moving the first time, to avoid 'undefined variable' errors
*/
//line 24
   if(me.canMove(map.globalDirection)) {
      me.move(map.globalDirection);
   }
}
});    
player.setPhoneCallback(_=>{
let directions = ['up','right','down','left']
map.globalDirection = directions[map.globalPos]
map.globalPos++
if(!map.globalPos||map.globalPos>3){
map.globalPos=0


/*
* level 13
* in this level the same code used in level 12 is still good
*/
//line 30
   if(me.canMove(map.globalDirection)) {
      me.move(map.globalDirection);
   }
}
});    
player.setPhoneCallback(_=>{
let directions = ['up','right','down','left']
map.globalDirection = directions[map.globalPos]
map.globalPos++
if(!map.globalPos||map.globalPos>3){
map.globalPos=0


/*
* level 14 
* the code injected at line 47 allows to pass trought every greenLock without a key.
* first, get the top-left yellow key, and exit trought the top left room
* then get the top right blue key, and exit trought the top right room
* finally, get in the bottom right room, then move to the bottom-left, collect the key and leave
*/
//line 47
'greenKey');return![]}else if(true){//


/*
* level 15
* this code overwrites the first onCollision method replacing it with an enpty one  
*/
//line 32
)},'onCollision': _=>{//


/*
* level 16
* this level can easily be passed by regenerating the level until you
* find a laser pattern that doesn't block the way to the exit. (spam the execute button)
* i got it after around 10 refreshes
* 
* The serious way to do it is this:
* (toggle the phone to change color)
*/
//line 46
        var ctx = map.getCanvasContext();
        ctx.beginPath();
        ctx.strokeStyle = color;//changed 'white' into color
        ctx.lineWidth = 5;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
//line 57
player.setPhoneCallback(_=>{
 let colors = ['red', 'yellow', 'teal'];
 map.tc = (map.tc==undefined||map.tc>2)?0:map.tc+1
 player.setColor(colors[map.tc])
})


/*
* level 17
* not sure about this code.
*/


/*
*level 18
*/
//line 50
map.defineObject('bridge', {
   'symbol': '-',
   'color': '#f06',
   'impassable': true
});
player.move("up");
var x = player.getX();
var y = player.getY() + 1;
for(let i=0;i<10;i++){
   map.placeObject(x+i, y, 'bridge');
}


/*
*level 20
*/
//line 97
   map.defineObject('deadlyRay', {
        'type': 'dynamic',
        'symbol': '█',
        'color': 'yellow',
        'interval': 100,
        'projectile': true,
        'behavior': function (me) {
            me.move('up');
        }
    });
    map.placeObject(Math.floor(map.getWidth()/2), map.getHeight() - 4, 'block');
    map.getPlayer().setPhoneCallback(function(){
      for (var x = 0; x < map.getWidth(); x++) {
          map.placeObject(x, map.getHeight() - 5, 'deadlyRay');
      }
    });