/** EVIL OBJECT */
import {StationaryObject} from "./pair";
export class rustCloud extends StationaryObject{

    drawSelf(){
        this.trigger.update();
        this.trigger.render();
    }

    clamp(val, min, max){
        return Math.max(min, Math.min(max, val));
    }

    distanceToObject(player, tileEngine){
        let spr = player.getCurrentChild();
        let distance = Math.sqrt( (spr.x - this.trigger.x)**2 + (spr.y - this.trigger.y)**2 );
        if (distance < 240 ){
            //draw cool line and start decrementing health from player :)
            let ctx = tileEngine.context;
            ctx.beginPath();
            ctx.lineWidth = 3;
            ctx.moveTo(this.trigger.x-tileEngine.sx+32, this.trigger.y-tileEngine.sy+32);
            ctx.lineTo(spr.x-tileEngine.sx+32, spr.y-tileEngine.sy+32);

            // draw distance text
            

            ctx.save();
            if (distance < 120){
                player.health -= 1;
                ctx.strokeStyle = "#fe0000";
                ctx.fillStyle = "#fe0000";
            } else {
                ctx.strokeStyle = "#000000";
                ctx.fillStyle = "#000000";
            }
            //ctx.rotate(Math.atan( ( spr.x  - this.trigger.x ) / ( spr.y - this.trigger.y ) ));
            ctx.textAlign = "center";
            ctx.font = "12px grossTerminal";
            ctx.fillText(
                (this.clamp((distance-120)/8, 0, 6)).toFixed(2), 
                ((spr.x-tileEngine.sx)+(this.trigger.x-tileEngine.sx))/2, /* x cord */
                ((spr.y-tileEngine.sy)+(this.trigger.y-tileEngine.sy))/2  /* y cord */
            ); 
            ctx.stroke();
            ctx.restore();



            ctx.lineWidth = 1;

        }
    }
    updatePosition(lvl){
        if (this.dir === undefined){
            this.dir = 1;
        }
        if (lvl.checkCollision(this.trigger)){
            this.dir *= -1;
        }
        this.trigger.x += this.dir;
    }
}
