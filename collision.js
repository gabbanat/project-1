(function () {
 
  var requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();

var canvas = document.querySelector("canvas"),
  ctx = canvas.getContext("2d"),
  width = window.innerWidth,
  height = window.innerHeight / 2,
  player = init(),
  keys = [],
  friction = 0.8,
  gravity = 0.5;

var boxes = [];

boxes.push({
  //Ground
  x: 100,
  y: height - 50, //This makes the ground
  width: width-500,
  height: 50,
});

for (let i = 0; i < 25; i++) {

    if(i === 25 - 1){
        let finish = {
            x: i * 300 + 500, //space between blocks
            y: canvas.height /2,
            width: 75, //range between 120 and 170
            height: 500,

        } 
    boxes.push(finish);
    } else{
  //twenty blocks
  let box = {
    x: i * 300 + 500, //space between blocks
    y: Math.random() * canvas.height + 150,
    width: Math.random() * 60 + 90, //range between block sizes
    height: 30,
}
  if(Math.floor(Math.random()*10) % 2 === 0 || Math.floor(Math.random()*10) % 3 === 0)  {
    if(box.y >= canvas.height/2) {
       box.dy = -2;
       box.top =box.y-(0.25+0.25*Math.random())*height;
       box.bottom = box.y;
    }
    
    else  {
      box.dy = 2;
      box.top = box.y;
      box.bottom = box.y+(0.3+0.3*Math.random())*height;
    }
    //console.log(box)
  }
  
boxes.push(box);}
}

let boxesCopy = [...boxes].map(box => {return {...box} });

function init (){
    keys=[];  
    return player =   {
        x: width / 2 -300,
        y: height - 100,
        width: 25,
        height: 25,
        speed: 6,
        velX: 0,
        velY: 0,
        jumping: false,
        grounded: false,
        direction: "r"  
    };
}
const startPlatform = new Image();
  startPlatform.src = "./images/startPlatform.png"

const endBlock = new Image ();
endBlock.src = "./images/flag.png"

const platform2 = new Image();
platform2.src = "./images/new platform.png";

const background = new Image ()
background.src="./images/SFIWU.png"
let bckx = 0
const background1 = new Image ()
background1.src="./images/SFIWU.png"
let bckx1 = width 
canvas.width = width;
canvas.height = height;
const charImageR = new Image();
charImageR.src = "./images/Boshy.png";
const charImageL = new Image();
charImageL.src = "./images/boshy left.png";


const audio = new Audio()
 audio.src="./worldMusic.mp3"
 audio.volume = 0.005
 
 
 
 function update() {
   audio.play()
   
   


    // check keys
    if (keys[38] || keys[32] || keys[87]) {
        // up arrow or space
        if (!player.jumping && player.grounded) {
            player.jumping = true;
            player.grounded = false;
            player.velY = -player.speed * 2;
        }
    }
    if (keys[39] || keys[68]) {
        // right arrow
        if (player.velX < player.speed) {
            player.direction = "r";
            if (player.x < canvas.width * 0.6) {
                player.velX += 7;
                
            } else {
                bckx-=3
                bckx1-=3
                if(bckx < -width) bckx = width-3;
                if(bckx1 < -width) bckx1 = width-3;
                boxes.forEach((box) => {
                    box.x -= 7;
                    
        });
      }
    }
}
  if (keys[37] || keys[65]) {
      // left arrow
    if (player.velX > -player.speed) {
        player.direction = "l";
      if (player.x > canvas.width * 0.33) {
          player.velX -= 7;
          
      } else {
        bckx+=3
        bckx1+=3
        if(bckx > width) bckx = 3-width;
        if(bckx1 > width) bckx1 = 3-width;
        boxes.forEach((box) => {
          box.x += 7;
          
        });
      }
    }
}

  player.velX *= friction;
  player.velY += gravity;
  
  ctx.clearRect(0, 0, width, height);

  ctx.drawImage(background, bckx, 0, width, height)
  ctx.drawImage(background1, bckx1, 0, width, height)
  

  //ctx.fillStyle = "black";
  ctx.beginPath();

  player.grounded = false;
  for (var i = 0; i < boxes.length; i++) {
     // ctx.rect(boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);
     // boxes[4] 
    if(boxes[i].dy) { // should be if box.dy
       //console.log(boxes[i])
      boxes[i].y +=boxes[i].dy
      if(boxes[i].y < boxesCopy[i].top) {
         boxes[i].dy = 1.5;
      } else if(boxes[i].y > boxesCopy[i].bottom) {
        boxes[i].dy = -1.5;
      } 
    }
     if(i === boxes.length -1 )  {
        // platform 2 is the same as "finish line ()" (future)
        ctx.drawImage(endBlock ,boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height)
     } else if(i === 0) {
     ctx.drawImage(startPlatform,boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height)

     } 
     else{
     ctx.drawImage(platform2,boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height)
    }
    var dir = colCheck(player, boxes[i], i);

    if (dir === "l" || dir === "r") {
      player.velX = 0;
      player.jumping = false;
    } else if (dir === "b") {
      player.grounded = true;
      player.jumping = false;
    } else if (dir === "t") {
      player.velY *= -1;
    }
  }

  if (player.grounded) {
    player.velY = 0;
  }
  if (player.y > (canvas.height)) {
      player = init();
      alert("game over")
      boxes = [...boxesCopy].map(box => {return {...box} })
  
     
  }
  player.x += player.velX;
  player.y += player.velY;

  ctx.fill();
  if (player.direction === "r")
    ctx.drawImage(charImageR, player.x, player.y, player.width, player.height);
  else
    ctx.drawImage(charImageL, player.x, player.y, player.width, player.height);
  requestAnimationFrame(update);
}

function colCheck(shapeA, shapeB, index) {
  // get the vectors to check against
  var vX = shapeA.x + shapeA.width / 2 - (shapeB.x + shapeB.width / 2),
    vY = shapeA.y + shapeA.height / 2 - (shapeB.y + shapeB.height / 2),
    // add the half widths and half heights of the objects
    hWidths = shapeA.width / 2 + shapeB.width / 2,
    hHeights = shapeA.height / 2 + shapeB.height / 2,
    colDir = null;

  // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
  if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
    //this is collion is tru

    if(index === boxes.length -1){    
      // once collion occured w/ last obj... reload page and message you win.

      window.location.reload()
      alert("You Win!")
    
    }

    // figures out on which side we are colliding (top, bottom, left, or right)
    var oX = hWidths - Math.abs(vX),
      oY = hHeights - Math.abs(vY);
    if (oX >= oY) {
      if (vY > 0) {
        colDir = "t";
        shapeA.y += oY;
      } else {
        colDir = "b";
        shapeA.y -= oY;
      }
    } else {
      if (vX > 0) {
        colDir = "l";
        shapeA.x += oX;
      } else {
        colDir = "r";
        shapeA.x -= oX;
      }
    }
  }
  return colDir;
}

document.body.addEventListener("keydown", function (e) {
  keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function (e) {
  keys[e.keyCode] = false;
});

window.addEventListener("load", function () {
  update();
});
