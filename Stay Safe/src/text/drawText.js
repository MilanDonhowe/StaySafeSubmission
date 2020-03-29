// draw pixel text on screen :)

export function DrawText(lvl, x, y, msg, size, color){
    let ctx = lvl.getCurrentLevel().context;
    ctx.save();
    ctx.font = size + "px grossTerminal";
    ctx.fillStyle = color;//"#faf1ed";
    ctx.fillText(msg, x-lvl.getCurrentLevel().sx, y-lvl.getCurrentLevel().sy);
    ctx.restore();
}
