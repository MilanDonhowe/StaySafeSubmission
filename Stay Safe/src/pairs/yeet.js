import {StationaryObject} from "./pair.js";
import {DrawText} from "../text/drawText";

export class CrazyGameWinObject extends StationaryObject{
    drawSelf(lvl){
        let ctx = lvl.context;
        let sx = lvl.sx;
        let sy = lvl.sy;

        // design-pattern because i don't know how to properly extend constructors :)))))))))))) AHHHHHHH
        if (this.tf === undefined){
            this.tf = 0;
            this.dx = 2;
        }
        if (this.MLG === undefined){
            this.MLG = 64;
        }

        this.tf += this.dx;
        if (this.tf >= 360 || this.tf <= 0){
            this.dx *= -1;
        }
        // let's go gamers
        ctx.save();
        // pls let this look cool canvas gods 🙏
        //ctx.transform(this.tf, this.tf, this.tf, this.tf, 0, 0);

        ctx.fillStyle = "#00";
        ctx.translate(this.trigger.x-sx+32, this.trigger.y-sy+32);
        ctx.rotate(Math.PI*(this.tf/180));

        ctx.translate(-(this.trigger.x-sx+32), -(this.trigger.y-sy+32));
        let clamp = (val) => {return Math.max(0, Math.min(255, val))};
        ctx.fillStyle = "rgb(" + String(clamp(this.tf)) + ", 40,40)";
        ctx.fillRect(this.trigger.x-sx, this.trigger.y-sy, this.MLG, this.MLG);

        ctx.restore();
    }

    playAnimation(ctx){
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, 800, 800);

        DrawText({getCurrentLevel: () => {return {sx:0, sy:0, context:ctx};}}, 32, 32, 
        "Yay you won!  Game made by Milan for the \"Stay Safe!\" 48 hour game jam.", 15, "#FFFFFF");
        DrawText({getCurrentLevel: () => {return {sx:0, sy:0, context:ctx};}}, 32, 96, 
        "Font used was \"terminal-grotesque\" by raphael bastide", 15, "#FFFFFF");
        //alert("yay you won!  Game made by Milan for the \"Stay Safe! 48 hour game jam.\"\nFont used was \"terminal-grotesque\" by raphael bastide");
    }

    checkWin(player, game, ctx){
        if (this.trigger.collidesWith(player.getCurrentChild())){
            //epic animation time
            
            game.stop();
            let ID = setInterval(() => {
                this.MLG++;
                this.drawSelf({sx:0, sy:0, context:ctx});
                if (this.MLG > 500){
                    clearInterval(ID);
                    this.playAnimation(ctx);
                }
            }, 5);
        }
    }
}
