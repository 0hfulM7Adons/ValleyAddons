import config from "../config"
import { data } from "../util/data"
import { S32PacketConfirmTransaction } from "../util/util"
import { registerWhen } from "../../BloomCore/utils/Utils"

let barrierTicks = 0
let timeText = new Text('').setScale(2).setShadow(true).setAlign('CENTER').setColor(Renderer.GREEN)

register("chat", () => {
    if (!config.totalTermTime) barrierTicks = 60;
    tickCounter.register();
    display.register();
}).setCriteria("[BOSS] Goldor: Who dares trespass into my domain?")

register("chat", () => {
    barrierTicks = 0;
    tickCounter.unregister();
    display.unregister();
}).setCriteria("The Core entrance is opening!")

const display = register("renderOverlay", () => {
    const timeLeft = barrierTicks / 20;
    if (!config.totalTermTime) {
        timeText.setString((barrierTicks > 40 ? "§a" : barrierTicks > 20 ? "§6" : "§c") + timeLeft.toFixed(2));
    } else {
        const currTick = barrierTicks % 60;
        timeText.setString((currTick < 20 ? "§a" : currTick < 40 ? "§6" : "§c") + timeLeft.toFixed(2));
    }
    timeText.setScale(data.goldorTickTimer.scale);
    timeText.draw(data.goldorTickTimer.x, data.goldorTickTimer.y);
}).unregister();

const tickCounter = register("packetReceived", () => {
    if (!config.totalTermTime) {
        if (--barrierTicks <= 0) barrierTicks = 60;
    } else {
        barrierTicks++;
    }
}).setFilteredClass(S32PacketConfirmTransaction).unregister();

register("worldLoad", () => {
    barrierTicks = 0;
    tickCounter.unregister();
    display.unregister();
})

const exampleHud = register("renderOverlay", () => {
    timeText.setString("3.00");
    timeText.setScale(data.goldorTickTimer.scale);
    timeText.draw(data.goldorTickTimer.x, data.goldorTickTimer.y);
}).unregister();

registerWhen(register("dragged", (dx, dy, x, y, bn) => {
    const checkClose = register("GuiClosed", () => {
        checkClose.unregister();
        exampleHud.unregister();
    })
    exampleHud.register();
    if (bn == 2) return;
    data.goldorTickTimer.x = x;
    data.goldorTickTimer.y = y;
    data.save();
}), () => config.goldorTickTimerGui.isOpen())

register("scrolled", (x, y, dir) => {
    if (!config.goldorTickTimerGui.isOpen()) return;
    if (dir == 1) data.goldorTickTimer.scale += 0.05;
    else data.goldorTickTimer.scale -= 0.05;
    data.save();
})

register("guiMouseClick", (x, y, bn) => {
    if (!config.goldorTickTimerGui.isOpen() || bn != 2) return;
    data.goldorTickTimer.x = Renderer.screen.getWidth() / 2;
    data.goldorTickTimer.y = Renderer.screen.getHeight() / 2 + 10;
    data.goldorTickTimer.scale = 1;
    data.save();
})