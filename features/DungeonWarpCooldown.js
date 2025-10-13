import config from "../config"
import { data } from "../util/data"
import { registerWhen } from "../../BloomCore/utils/Utils"

let text = new Text("").setScale(1).setShadow(true)
let startTime
let onCooldown = false

register("chat", () => {
    if (!onCooldown) {
        startTime = Date.now();
        onCooldown = true;
        display.register();
    }
}).setCriteria(/^-*>newLine<-.*(\w+) entered (\w+\s+)?The Catacombs, Floor (\w+)!->newLine<-*$/)

const display = register("renderOverlay", () => {
    const remaining = (30 - (Date.now() - startTime ?? 0) / 1000).toFixed(2)
    if (remaining < 0) {
        onCooldown = false;
        display.unregister();
        return;
    }
    text.setString(`&5Warp Cooldown: &f${remaining}s`);
    text.setScale(data.dungeonWarpCooldown.scale);
    text.draw(data.dungeonWarpCooldown.x, data.dungeonWarpCooldown.y);
}).unregister()

const exampleHud = register("renderOverlay", () => {
    text.setString("&5Warp Cooldown: &f30.00s")
    text.setScale(data.dungeonWarpCooldown.scale)
    text.draw(data.dungeonWarpCooldown.x, data.dungeonWarpCooldown.y)
}).unregister();

registerWhen(register("dragged", (dx, dy, x, y, bn) => {
    const checkClose = register("GuiClosed", () => {
        checkClose.unregister();
        exampleHud.unregister();
    })
    exampleHud.register();
    if (bn == 2) return;
    data.dungeonWarpCooldown.x = x;
    data.dungeonWarpCooldown.y = y;
    data.save();
}), () => config.dungeonWarpCooldownGui.isOpen())

register("scrolled", (x, y, dir) => {
    if (!config.dungeonWarpCooldownGui.isOpen()) return;
    if (dir == 1) data.dungeonWarpCooldown.scale += 0.05;
    else data.dungeonWarpCooldown.scale -= 0.05;
    data.save();
})

register("guiMouseClick", (x, y, bn) => {
    if (!config.dungeonWarpCooldownGui.isOpen() || bn != 2) return;
    data.dungeonWarpCooldown.x = 0;
    data.dungeonWarpCooldown.y = 0;
    data.dungeonWarpCooldown.scale = 1;
    data.save();
})