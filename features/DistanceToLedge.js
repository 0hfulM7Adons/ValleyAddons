import config from "../config"
import { data } from "../util/data"
import { getClass, regions, isPlayerInBox } from "../util/util"
import { registerWhen } from "../../BloomCore/utils/Utils"

let text = new Text("").setScale(2).setShadow(true).setAlign("CENTER")

register("chat", (message) => {
    if (!config.distanceToLedge) return;
    if (getClass() != "Archer" && getClass() != "Mage") return;
    if (message == "[BOSS] Storm: Pathetic Maxor, just like expected.") display.register();
    if (message == "[BOSS] Storm: I should have known that I stood no chance.") display.unregister();
}).setCriteria("${message}")

const display = register("renderOverlay", () => {
    if (!isPlayerInBox(...regions.p2)) return;
    const dist = (75 - Player.getZ()).toFixed(3);
    text.setString(dist);
    text.setScale(data.distanceToLedge.scale);
    text.draw(data.distanceToLedge.x, data.distanceToLedge.y);
})

register("worldLoad", () => {
    display.unregister();
})

const exampleHud = register("renderOverlay", () => {
    text.setString("12.345");
    text.setScale(data.distanceToLedge.scale);
    text.draw(data.distanceToLedge.x, data.distanceToLedge.y);
}).unregister();

registerWhen(register("dragged", (dx, dy, x, y, bn) => {
    const checkClose = register("GuiClosed", () => {
        checkClose.unregister();
        exampleHud.unregister();
    })
    exampleHud.register();
    if (bn == 2) return;
    data.distanceToLedge.x = x;
    data.distanceToLedge.y = y;
    data.save();
}), () => config.distanceToLedgeGui.isOpen())

register("scrolled", (x, y, dir) => {
    if (!config.distanceToLedgeGui.isOpen()) return;
    if (dir == 1) data.distanceToLedge.scale += 0.05;
    else data.distanceToLedge.scale -= 0.05;
    data.save();
})

register("guiMouseClick", (x, y, bn) => {
    if (!config.distanceToLedgeGui.isOpen() || bn != 2) return;
    data.distanceToLedge.x = Renderer.screen.getWidth() / 2;
    data.distanceToLedge.y = Renderer.screen.getHeight() / 2 + 10;
    data.distanceToLedge.scale = 1;
    data.save();
})