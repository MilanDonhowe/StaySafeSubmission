import {Sprite, initKeys, keyPressed} from "kontra";


/**
    * Objects the player can control
    * If controlled object dies
    * Control keyboard input for player (movement, etc.)
*/

export class PlayerController {
    constructor(hp=100, ind=0, spd=1){
        initKeys(); 
        this.health = hp;
        this.childIndex = ind;
        this.speed = spd;
        this.moving = 0;
        this.children = [];
        this.animes = null;
    }

    loadAnimation(animations){
        this.animes = animations;
    }


    //creates new controllable sprite object for the player
    addChild(x, y, width, height){
        let child = Sprite({
            x:x,
            y:y,
            width:width,
            height:height,
            anchor: {x:0, y:0},
            animations: this.animes 
        });
        this.children.push(child);
        return child;
    }

    // CHANGE CONTROLLED OBJECT
    changeChild(deltaIndex){
        this.childIndex = Math.max(0, Math.min(this.childIndex+deltaIndex, this.children.length-1));
    }

    changeAnimation(animation){
        this.getCurrentChild().animation = animation;
    }

    // Render each child object
    renderChildren(){
        for (let i=0; i < this.children.length; i++){
            // change animation loop and frame if not moving
            this.children[i].render();
        }
    }

    getCurrentChild(){
        return this.children[this.childIndex];
    } 

    destroyCurrentChild(lvl){
        this.children.splice(this.childIndex, 1);
        // check for game-over
        this.childIndex = 0;
        this.addChild(128, 128, 64, 64);
        lvl.addObjects([this.getCurrentChild()]);
        return;
    }

    updatePosition(lvl, cam){
        // scrolling through child control

        this.moving = 0;
   
        if (keyPressed('j')){
            this.changeChild(1);
        }
        if (keyPressed('k')){
            this.changeChild(-1);
        }

        // movement for current child
        let current = this.getCurrentChild(); 

        cam.changeTarget(current);        


        if (keyPressed('w')){
            this.moving = 1;
            current.y -= this.speed;
            if(lvl.checkCollision(current)){
                current.y += this.speed;
            }
        }
        if (keyPressed('s')){
            this.moving = 2;
            current.y += this.speed;
            if(lvl.checkCollision(current)){
                current.y -= this.speed;
            }
        }
        if (keyPressed('a')){
            this.moving = 2;
            current.x -= this.speed;
            if(lvl.checkCollision(current)){
                current.x += this.speed;
            }
        }
        if (keyPressed('d')){
            this.moving = 2;
            current.x += this.speed;
            if(lvl.checkCollision(current)){
                current.x -= this.speed;
            }
        }


        switch(this.moving){
            case 2:
                if (current.currentAnimation != "walkForward"){
                    current.playAnimation("walkForward");
                }
                break;
            case 1:
                if (current.currentAnimation != "walkBackward"){
                    current.playAnimation("walkBackward");
                }
                break;
            case 0:
            default:
                current.playAnimation("idleFront");
                break;
        }
        //current.playAnimation('idleFront');

        current.update();

        if (this.health <= 0){
            this.health = 100;
            this.destroyCurrentChild(lvl);
        }

    }
}