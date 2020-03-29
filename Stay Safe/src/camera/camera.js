// class for following a given object

export class Camera {
    constructor(lvl, target, speed){
        this.lvl = lvl;
        this.target = target;
        this.spd = speed;
        this.x = 0;
        this.y = 0;
       
    }
    
    changeTarget(new_target){
        this.target = new_target;
    }

    incrementTowards(goal, value, tolerence){
        if (goal-tolerence > value){
           return value + this.spd; 
        } else if (goal+tolerence < value){
            return value - this.spd;
        } else {
            return value;
        }
    }

    // wants the canvas context
    move(){
        let targetX = this.target.x-200;
        let targetY = this.target.y-150;
        const tolerence = 10;

        if (Math.sqrt((targetX-this.x)**2+(targetY-this.y)**2) > tolerence**2){
            this.spd = 4;
        } else {
            this.spd = 1;
        }

        this.x = this.incrementTowards(targetX, this.x, tolerence);
        this.y = this.incrementTowards(targetY, this.y, tolerence);

        this.lvl.getCurrentLevel().sx = this.x;
        this.lvl.getCurrentLevel().sy = this.y; 
    }
}