(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();
//var background = new Image();
//background.src = "./images/kirby backround.png"
//background.onload = function(){
  //  ctx.drawImage(background,0,0)}


var canvas = document.querySelector("canvas"),
ctx = canvas.getContext("2d"),
  width = window.innerWidth,
  height = window.innerHeight,
  player = {
      x: width / 2,
      y: height - 5,
      width : 15,
      height : 15,
    speed : 3,
    velX : 0,
    velY : 0,
    jumping : false 
  };
  keys = [];
  friction = 0.8;
  gravity = 0.3;
 



canvas.width = width;
canvas.height = height;






// drawing small red box
function update(){
  
// check keys
if (keys[38]) {
    
    //up arrow
    if(!player.jumping){
        player.jumping = true;
        player.velY = -player.speed*2
    } 
}

if (keys[39]){
        //right arrow
        if(player.velX < player.speed){
            player.velX++;
        }
    }
    if (keys[37]) {
        //left arrow
        if(player.velX > -player.speed) {
            player.velX--
        }
    
    }

    player.velY += gravity
    player.velX *= friction;
    player.x += player.velX
    player.y += player.velY

    if(player.x >= width-player.width){
        player.x = width-player.width;
    }
    else if (player.x <= 0){
        player.x = 0
    }
    if(player.y >= height-player.height){
        player.y = height - player.height;
        player.jumping = false
        player.velY = 0
    }




    ctx.clearRect(0,0,width,height);

    
    ctx.fillStyle = "red";

    ctx.fillRect (player.x, player.y, player.width, player.height);

    drawPlatform()
    detectCollision()
//runs through loop again
    requestAnimationFrame(update);
}
let platform = {
    x: 420,
    y: window.innerHeight - 50,
    height: 50,
    width: 200,
}
function drawPlatform() {
    ctx.fillStyle = "pink"

    ctx.fillRect(platform.x,platform.y,platform.width,platform.height)

} 
function detectCollision(){

    
    
    if (player.x < platform.x + platform.width &&
       player.x + player.width > platform.x &&
       player.y < platform.y + platform.height &&
       player.y + player.height > platform.y) {
        // collision detected!
        console.log(player.y, platform.y-player.height)
        //Hitting block from top
        if(player.y <= platform.y - player.height + 10 && player.y >= platform.y - player.height - 10){ //the player landed on it
            player.y = platform.y - player.height
            player.jumping = false
            player.velY = 0
        }else if(player.x + player.width >= platform.x && player.x <= platform.x - 5) { //Hitting the right side
            player.x = platform.x - player.width
            console.log(player.x)
            player.velX = 0
        }

        console.log(player, platform)
    }
}
document.body.addEventListener('keydown', function(e) {
    keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function(e){
    
    keys[e.keyCode] = false;

})


window.addEventListener("load", function(){
    update();
});



// collision checking for obstacles

