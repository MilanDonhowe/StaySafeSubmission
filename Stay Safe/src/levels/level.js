// holds level data
import {TileEngine} from 'kontra';

/* GENERALIZED CLASS */

/* Control which level we are on, swapping between tile engine objects as needed */
export class levelController {
    
    constructor(number_of_levels){
        this.size = number_of_levels;
        this.levels = [];
        this.level_index = 0;
    }

    getCurrentLevel(){
        return this.levels[this.level_index];
    }

    addObjects(obs){
        for(let i=0; i<obs.length; i++){
            this.getCurrentLevel().addObject(obs[i]);
        }
    }

    addLevel(tw, th, w, h, tileset_obj, lvl_name, map_data){
        let lvl = new TileEngine({
            tilewidth: tw,
            tileheight: th,
            width: w,
            height: h,
            tilesets: [tileset_obj],
            layers:[{
                name:lvl_name,
                data: map_data
            }]
        });
        this.levels.push(lvl);
    }

    editLevelData(index, val){
        this.getCurrentLevel().layers[0].data[index] = val;
//        this.getCurrentLevel().setLayer("collision", [0]);
    }

    nextLevel(){
        this.level_index++;
        //TODO: add cool tranisiton effect
    }

    checkCollision(obj, layer="collision"){
        // call check collision method of current tileSetEngine object
        return this.levels[this.level_index].layerCollidesWith("collision", obj);
    }

    renderCurrentLevel(){
        this.levels[this.level_index].renderLayer("collision");
    }
}