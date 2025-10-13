import config from "../config"
import { data } from "../util/data"
import { S32PacketConfirmTransaction } from "../util/util"
import { registerWhen } from "../../BloomCore/utils/Utils"

let timeText = new Text('').setScale(1).setShadow(true).setAlign('CENTER').setColor(Renderer.LIGHT_PURPLE);
let ticks = 0;

register("chat", (message) => {
    if (!config.crystalSpawnTimer) return;
    if (message != "[BOSS] Maxor: THAT BEAM! IT HURTS! IT HURTS!!" && message != "[BOSS] Maxor: YOU TRICKED ME!") return;
    ticks = 34;
    tickCounter.register();
    display.register();
}).setCriteria("${message}")

const tickCounter = register("packetReceived", () => {
    if (--ticks <= 0) {
        tickCounter.unregister();
        display.unregister();
    }
}).setFilteredClass(S32PacketConfirmTransaction).unregister();

const display = register("renderOverlay", () => {
    let timeLeft = (ticks / 20).toFixed(2);

    timeText.setString(timeLeft);
    timeText.setScale(data.crystalSpawnTimer.scale);
    timeText.draw(data.crystalSpawnTimer.x, data.crystalSpawnTimer.y);
}).unregister();

const exampleHud = register("renderOverlay", () => {
    timeText.setString("2.00")
    timeText.setScale(data.crystalSpawnTimer.scale)
    timeText.draw(data.crystalSpawnTimer.x, data.crystalSpawnTimer.y)
}).unregister();

registerWhen(register("dragged", (dx, dy, x, y, bn) => {
    const checkClose = register("GuiClosed", () => {
        checkClose.unregister();
        exampleHud.unregister();
    })
    exampleHud.register();
    if (bn == 2) return;
    data.crystalSpawnTimer.x = x;
    data.crystalSpawnTimer.y = y;
    data.save();
}), () => config.crystalSpawnTimerGui.isOpen())

register("scrolled", (x, y, dir) => {
    if (!config.crystalSpawnTimerGui.isOpen()) return;
    if (dir == 1) data.crystalSpawnTimer.scale += 0.05;
    else data.crystalSpawnTimer.scale -= 0.05;
    data.save();
})

register("guiMouseClick", (x, y, bn) => {
    if (!config.crystalSpawnTimerGui.isOpen() || bn != 2) return;
    data.crystalSpawnTimer.x = Renderer.screen.getWidth() / 2;
    data.crystalSpawnTimer.y = Renderer.screen.getHeight() / 2 + 10;
    data.crystalSpawnTimer.scale = 1;
    data.save();
})