// here's the idea--actually just have everything encapsulated as a pair
import {Sprite} from "kontra";

export class StationaryObject {
    constructor (x, y, size, color, type, animation=null){
        this.type = type;
        if (animation != null){
            this.trigger = Sprite({
                x:x,
                y:y,
                width:size,
                height:size,
                animations:animation
            });
            this.trigger.playAnimation('idle');
        } else {
            this.trigger = Sprite({
                x: x,
                y: y,
                width: size,
                height: size,
                color: color
            });
        }
    }


    playAnimation(title){
        this.trigger.playAnimation(title);
    }

    triggerCollidesWith(spr){
        return this.trigger.collidesWith(spr);
    }
}