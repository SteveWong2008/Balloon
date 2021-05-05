var ball, database, position;
var bg;
var hotairballoonImg, hotairballoon

function preload(){
    bg = loadImage("cityImage.png");
    hotairballoonImg = loadAnimation("hotairballoon1.png","hotairballoon2.png","hotairballoon3.png")
}

function setup(){
    database = firebase.database();
    console.log(database);    
    createCanvas(1000,500);
    ball = createSprite(250,250,10,10);
    ball.addAnimation("hotair",hotairballoonImg)
    ball.scale = 0.4
    ball.shapeColor = "red";
    var ballposition = database.ref('Ball/Position');
    ballposition.on("value",readPosition,showError);
    
}

function draw(){
    background(bg);
    if(position !== undefined){
    if(keyDown(LEFT_ARROW)){
        writePosition(-3,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(3,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-3);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+3);
    }
    drawSprites();
    }
}

function writePosition(x,y){
    database.ref('Ball/Position').set({
        'x':position.x + x,
        'y':position.y + y
    })
}

function readPosition(data){
    position = data.val();
    console.log(position.x)
    ball.x = position.x
    ball.y = position.y
}

function showError(){
    console.log("error in writing to the database")
}


