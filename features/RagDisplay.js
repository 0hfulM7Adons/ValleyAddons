import config from "../config"
import { data } from "../util/data"
import { S32PacketConfirmTransaction, C09PacketHeldItemChange } from "../util/util"
import { registerWhen } from "../../BloomCore/utils/Utils"

let text = new Text("").setScale(1).setShadow(true).setAlign("CENTER").setColor(Renderer.YELLOW);
let ticks = 0;

register("soundPlay", (pos, name, vol, pitch) => {
    if (!config.ragDisplay) return;
    if (vol != 1 && pitch != 1.4920635223388672) return;
    if (!Player?.getHeldItem()?.getName()?.includes("Ragnarock")) return;
    tickCounter.register();
    display.register();
    ticks = 200;
}).setCriteria("mob.wolf.howl")

const tickCounter = register("packetReceived", (packet) => {
    if (packet.func_148890_d() > -1) return;

    if (--ticks <= 0) {
        tickCounter.unregister();
        display.unregister();
    }
}).setFilteredClass(S32PacketConfirmTransaction).unregister()

register("worldLoad", () => {
    ticks = 0;
    tickCounter.unregister();
    display.unregister();
})

const display = register("renderOverlay", () => {
    const remaining = (ticks / 20).toFixed(2);

    text.setString(remaining);
    text.setScale(data.ragDisplay.scale);
    text.draw(data.ragDisplay.x, data.ragDisplay.y);
}).unregister();

const exampleHud = register("renderOverlay", () => {
    text.setString("10.00");
    text.setScale(data.ragDisplay.scale);
    text.draw(data.ragDisplay.x, data.ragDisplay.y);
}).unregister();

registerWhen(register("dragged", (dx, dy, x, y, bn) => {
    const checkClose = register("GuiClosed", () => {
        checkClose.unregister();
        exampleHud.unregister();
    })
    exampleHud.register();
    if (bn == 2) return;
    data.ragDisplay.x = x;
    data.ragDisplay.y = y;
    data.save();
}), () => config.ragDisplayGui.isOpen())

register("scrolled", (x, y, dir) => {
    if (!config.ragDisplayGui.isOpen()) return;
    if (dir == 1) data.ragDisplay.scale += 0.05;
    else data.ragDisplay.scale -= 0.05;
    data.save();
})

register("guiMouseClick", (x, y, bn) => {
    if (!config.ragDisplayGui.isOpen() || bn != 2) return;
    data.ragDisplay.x = Renderer.screen.getWidth() / 2;
    data.ragDisplay.y = Renderer.screen.getHeight() / 2 - 20;
    data.ragDisplay.scale = 1;
    data.save();
})