import {init, GameLoop, load, on, imageAssets, Quadtree, SpriteSheet, Sprite} from "kontra";
import {PlayerController} from "./player/player";
import {levelController} from "./levels/level";
import {Camera} from "./camera/camera";
import {StationaryObject} from "./pairs/pair";
import {rustCloud} from "./pairs/evil";
import {DrawText, DrawTextDelayed} from "./text/drawText";
import {CrazyGameWinObject} from "./pairs/yeet";


let {canvas, context} = init();

// Setup levels :)
let lvlManager = new levelController(1);


// Setup player objects
let player = new PlayerController();
const playerObjSize = 64;
//player.addChild(96, 96, 32, 32, "#fc03c2");

// Setup Camera
let view = new Camera(lvlManager, player.getCurrentChild());

let staticObjects = [];

// TODO: add to Dynamic object array --> NEVER MIND, NO TIME, CRUNCH HOURS FELLAS

let backgroundSprite = null;

let gameWIN = new CrazyGameWinObject(1425, 490, 64, "#d87af5", "winObject");
//let gameWIN = new CrazyGameWinObject(192, 128, 64, "#d87af5", "winObject");

let rusty = null;
let rustyMove = null;
let rustyMove2 = null;
let rustyMove3 = null;

// Quadtree Setup
let Tree = Quadtree();

const totalAssets = 1;
let assetsLoaded = 0; 
on('assetLoaded', (asset, url) => {
    assetsLoaded++;
    // inform player
    context.fillText("Loading assets: " + assetsLoaded + " out of " + totalAssets, 200, 200);    
});

load(
    'assets/placeholderTileset.png',
    'assets/active_robot_walk.png',
    'assets/deactived_robot.png',
    'assets/dead_robot.png',
    'assets/background.png',
    'assets/EVIL.png',
    'assets/bomb.png'
).then(function(assets){

    // background sprite
    backgroundSprite = Sprite({
        x:0,
        y:0,
        width:1600,
        height:1600,
        image: imageAssets['assets/background.png'] 
    });

    // create sprite sheets

    let bomb_sprite = SpriteSheet({
        image: imageAssets['assets/bomb.png'],
        frameWidth: 64,
        frameHeight: 64,
        animations: {
            idle:{
                frames: 0
            },
            explosion: {
                frames: '0..6',
                frameRate:10,
                loop:false
            }
        }
    })

    let deactivated_robot = SpriteSheet({
        image: imageAssets['assets/deactived_robot.png'],
        frameWidth: 64,
        frameHeight: 64,
        animations: {
            idle: {
                frames:0
            },
            wakeUp:{
                frames:'0..7',
                frameRate:8,
                loop:false
            }
        }
    });

    let rustMonsterSpr = SpriteSheet({
        image: imageAssets['assets/EVIL.png'],
        frameWidth: 64,
        frameHeight: 64,
        animations:{
            idle: {
                frames:'0..5',
                frameRate:5,
                loop:true
            }
        }
    });

    rusty = new rustCloud(100, 480, 64, "#a88d32", "rustCloud", rustMonsterSpr.animations);
    rustyMove = new rustCloud(600, 1032, 64, "#a88d32", "rustCloud", rustMonsterSpr.animations);
    rustyMove2 = new rustCloud(1132, 800, 64, "#a88d32", "rustCloud", rustMonsterSpr.animations);
    rustyMove3 = new rustCloud(900, 365, 64, "#a88d32", "rustCloud", rustMonsterSpr.animations);

    let spriteSheetWalk = SpriteSheet({
        image: imageAssets['assets/active_robot_walk.png'],
        frameWidth: 64,
        frameHeight: 64,
        animations: {
            idleFront:{
                frames: 0
            },
            idleBack:{
                frames: 13
            },
            walkForward:{
                frames:'0..6',
                frameRate: 17,
                loop: true
            },
            walkBackward:{
                frames: '7..13',
                frameRate: 17,
                loop: true
            }

        }
    });

    let spriteSheetDie = SpriteSheet({
        image: imageAssets['assets/dead_robot.png'],
        frameWidth: 64,
        frameHeight: 64,
        animations:{
            die: {
                frames: '0..11',
                frameRate: 3,
                loop: false
            }
        }
    });

    player.loadAnimation(spriteSheetWalk.animations);

    player.addChild(128, 128, 64, 64);

    //staticObjects.push(new StationaryObject(128, 128, 64, "green", "ROBOT", deactivated_robot.animations));
    //staticObjects.push(new StationaryObject(256, 256, 64, "green", "ROBOT", deactivated_robot.animations));
    staticObjects.push(new StationaryObject(690, 400, 64, "#422e2c", "BOMB", bomb_sprite.animations));
    staticObjects.push(new StationaryObject(532, 1100, 64, "green", "BOMB", bomb_sprite.animations));

    lvlManager.addLevel(64, 64, 25, 19, {
       firstgid: 1,
       image: imageAssets['assets/placeholderTileset.png'] 
    }, "collision", [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 3, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 3, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 3, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 4, 4, 0, 0, 0, 3, 1, 2, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 2, 0, 0, 3, 1, 1, 2, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 2, 0, 0, 3, 1, 1, 2, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 3, 1, 1, 1, 2, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 3, 1, 1, 1, 1, 2, 0, 0, 0, 0, 5, 5, 5, 5, 1, 1, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 3, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 3, 1, 0, 0, 1,
        1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 3, 1, 1, 1, 1,
        1, 2, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
        1, 2, 0, 0, 1, 1, 1, 1, 1, 1, 1, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
        1, 2, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
        1, 2, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
        1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
        1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    ]);   // start the game :)
    
    lvlManager.addObjects(player.children);
    lvlManager.addObjects([rusty.trigger, backgroundSprite, rustyMove.trigger, rustyMove2.trigger, rustyMove3.trigger, gameWIN.trigger]);
    for (let i=0; i < staticObjects.length; i++){
        lvlManager.addObjects([staticObjects[i].trigger]);
    }

    

    loop.start();
}).catch(function(err){
    console.log(err);
    alert("Uhhh... the assets didn't load--I blame webpack");
});




let loop = GameLoop({
    update: function(dt){

        // update object positions, check collisions, etc.
        // update the child objects of the player controller
        player.updatePosition(lvlManager, view);
        rustyMove.updatePosition(lvlManager);
        rustyMove2.updatePosition(lvlManager);
        //rustyMove3.updatePosition(lvlManager);

        // Tree.add(player.getCurrentChild());
        for (let i=0; i < staticObjects.length; i++){
            if (staticObjects[i].triggerCollidesWith(player.getCurrentChild())){
                switch(staticObjects[i].type){
                    case "ROBOT":
                        //staticObjects[i].playAnimation("wakeUp")
                        //setTimeout(function(){
                            lvlManager.addObjects([player.addChild(staticObjects[i].trigger.x, staticObjects[i].trigger.y, staticObjects[i].trigger.width, staticObjects[i].trigger.height)]);
                        //}, 1000);
                        break;
                    case "BOMB":
                        player.destroyCurrentChild(lvlManager);
                        //staticObjects.splice(i, 1);
                        staticObjects[i].trigger.playAnimation('explosion');
                        staticObjects.splice(i, 1);
                        //setTimeout(function(staticObjects, i) {staticObjects.splice(i, 1);}, 500);
                        break;
                    default:
                        console.log("invalid static object type detected");
                }
            }
        }

        gameWIN.checkWin(player, loop, lvlManager.getCurrentLevel().context);

        // move camera (tileEngineCamera technically)
        view.move();
    },
    render: function(dt){
        
        backgroundSprite.render();
        
        // render current level
        lvlManager.renderCurrentLevel();
        
        // draw text test
        DrawText(lvlManager, 64, 64, "ESCAPE --STAY ALIVE", 20, "#faf1ed");
        DrawText(lvlManager, 50, 440, "KEEP YOUR DISTANCE", 16, "#faf1ed");
        // render pair objects
        for (let i=0; i < staticObjects.length; i++){
            staticObjects[i].trigger.update();
            staticObjects[i].trigger.render();
        }


        gameWIN.drawSelf(lvlManager.getCurrentLevel());

        rusty.drawSelf();
        rustyMove.drawSelf();
        rustyMove2.drawSelf();
        rustyMove3.drawSelf();
        rustyMove3.distanceToObject(player, lvlManager.getCurrentLevel());
        rustyMove2.distanceToObject(player, lvlManager.getCurrentLevel());
        rusty.distanceToObject(player, lvlManager.getCurrentLevel());
        rustyMove.distanceToObject(player, lvlManager.getCurrentLevel());

        // call rendering function here
        //player.getCurrentChild();
        player.renderChildren(dt);


        // draw health/power bar
        let sx = lvlManager.getCurrentLevel().sx;
        let sy = lvlManager.getCurrentLevel().sy;
        let ctx = lvlManager.getCurrentLevel().context

        // omg this is jank as fuck
        DrawText({getCurrentLevel: () => {return {sx:0, sy:0, context:ctx};}}, 440, 90, "POWER:", 15, "#FFFFFF");

        ctx.save();
        ctx.fillStyle = "#5b575b";
        ctx.fillRect(440, 100, 50, 220);
        ctx.fillStyle = "rgb(" + String(155+(100-player.health))  + " , " + String(79+player.health) + ", 0)";
        ctx.fillRect(450, 110, 30, 2*player.health);
        ctx.restore();




        // debugging text
        //context.font = "12px sans-serif";
        //context.fillText("Current index: " + player.childIndex + "\nPlayer Health: " + player.health + " x: " + 
        //player.getCurrentChild().x + " y: " + player.getCurrentChild().y, 50, 50);

    }
});
