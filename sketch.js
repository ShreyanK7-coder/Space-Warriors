var bg,bgimg
var ss,ssimg
var alien,a1,a2,a3,a4,a5,a6,a7,a9,a10
var laser
var aliengroup,lasergroup
var score = 0
var gamestate = "play"
var edges
var invisSprite
var fc = 0
function preload(){
    bgimg = loadImage("./Assets/bg3.png")
    ssimg = loadImage("Assets/ss2.png")
    a1 = loadImage("Assets/a1.png")
    a2 = loadImage("Assets/a2.png")
    a3 = loadImage("Assets/a3.png")
    a4 = loadImage("Assets/a4.png")
    a5 = loadImage("Assets/a5.png")
    a6 = loadImage("Assets/a6.png")
    a7 = loadImage("Assets/a7.png")
    a9 = loadImage("Assets/a9.png")
    a10 = loadImage("Assets/a10.png")
}

function setup(){
    createCanvas(1900,950)
    ss = createSprite(80,400)
    ss.addImage(ssimg)
    ss.scale = 0.3
    edges = createEdgeSprites()
    lasergroup=new Group()
    aliengroup=new Group()
    invisSprite = createSprite(155,500,10,1000)
    invisSprite.visible = 0
}

function draw(){
    background(bgimg)
    drawSprites()
    textSize(30)
    text("Score: "+score,50,50)
    text("Arrow keys or W and A to move, spacebar to shoot.",1200,50)
    text("Made by shreyanK7-coder",1500,900)
    if(gamestate === "play"){
        if(keyDown("W")||keyDown(UP_ARROW)){
            ss.y-=8
        }
        if(keyDown("S")||keyDown(DOWN_ARROW)){
            ss.y+=8
        }
        ss.collide(edges)
        if (keyDown("space")){
            console.log(fc)
            spawnlaser()
        }
        spawnalien()
        lasergroup.isTouching(aliengroup,destroyAlien) 
        if (aliengroup.isTouching(ss)||aliengroup.isTouching(edges[0])){
            gamestate = "stop"
        }
    }
    if(gamestate === "stop"){
        gameover()
    }
}

function spawnlaser(){
    console.log(fc)
    if (frameCount-fc>20){    
        laser=createSprite(175,ss.y,60,5)
        laser.shapeColor = rgb(0,255,255)
        laser.velocityX = 10
        laser.lifetime= width/10
        lasergroup.add(laser)
        fc = frameCount
    }
}

function spawnalien(){
    if(frameCount%80===0){
        var ran = random(100,850)
        alien = createSprite(1900,ran)
        alien.scale = 0.3
        var ranVel = random(10,30)
        alien.velocityX = -ranVel
        var ranImg = Math.round(random(1,9))
        switch(ranImg){
            case 1:
                alien.addImage(a1)
                break
            case 2:
                alien.addImage(a2)
                break
            case 3:
                alien.addImage(a3)
                break
            case 4:
                alien.addImage(a4)
                break
            case 5:
                alien.addImage(a5)
                break
            case 6:
                alien.addImage(a6)
                break
            case 7:
                alien.addImage(a7)
                break
            case 8:
                alien.addImage(a9)
                break
            case 9:
                alien.addImage(a10)
                break
        }
        alien.lifetime = width/ranVel
        aliengroup.add(alien)
    }
}

function destroyAlien(laser,alien){
    alien.destroy()
    lasergroup.destroyEach()
    score += 10
}
function gameover(){
    aliengroup.destroyEach()
    swal({
        title:"G A M E  O V E R",
        text:"The aliens have infiltrated our base",
        imageUrl:"Assets/a3.png",
        imageSize:"150x150",
        confirmButtonText:"Try Again"
        },
        function(isConfirm){
            if (isConfirm){
                location.reload()
            }
        }
    )
}
