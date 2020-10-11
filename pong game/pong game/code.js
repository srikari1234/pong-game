var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":[],"propsByKey":{}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

//create the ball, playerPaddle and computerPaddle as sprite objects
var ball = createSprite(200,200,10,10);
var playerPaddle = createSprite(380,200,10,70);
var computerPaddle = createSprite(10,200,10,70);
var cscore = 0;
var pscore = 0;
var gameState = "serve"; 
 
 
function draw() {
  //clear the screen
background("white");

//place info text in the center
  if (gameState === "serve") {
    text("Press Space to Serve",150,180);
  }
   text(cscore,180,20);
  text(pscore,215,20) ;


    
  
  
  //make the player paddle move with the mouse's y position
  playerPaddle.y = World.mouseY;
  
  //AI for the computer paddle
  //make it move with the ball's y position
  computerPaddle.y = ball.y;
  
  //create edge boundaries
  //make the ball bounce with the top and the bottom edges
  createEdgeSprites();
  ball.bounceOff(topEdge);
  ball.bounceOff(bottomEdge);
  
  //make the ball bounce off the paddles
  ball.bounceOff(playerPaddle);
  ball.bounceOff(computerPaddle);
  
  //serve the ball when space is pressed
  if (keyDown("space")) {
   serve();
  }
  
 
 //reset the ball to the centre if it crosses the screen
  if(ball.x > 400 || ball.x <0) {
    if (ball.x>400) {
      cscore = cscore+1 ;
    }
    if (ball.x<0) {
      pscore = pscore+1 ;
    }
    
    reset();
    gameState="serve";
  }
  if (pscore===2 || cscore===2) {
    gameState = "over";
    text("GAMEOVER",170,160); 
    text("press R to restart",150,180);  
  }
  
  if (keyDown("r") && gameState==="over") {
    gameState="serve";
    cscore=0;
    pscore=0;                              
  }
  drawnet();
  //draw the sprites on the screen
  drawSprites();
}
function drawnet(){
  for (var num = 0; num < 400; num=num+20) {
  line(200,num, 200, num+10)}
}
function serve(){
   ball.velocityY = 3;
    ball.velocityX = 4; 
}
function reset(){
  ball.x = 200;
    ball.y = 200;
    ball.velocityX = 0;
    ball.velocityY = 0;
}
// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
