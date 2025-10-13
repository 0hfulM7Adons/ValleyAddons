import config from "../config"
import { data } from "../util/data"
import { S32PacketConfirmTransaction } from "../util/util"
import { registerWhen } from "../../BloomCore/utils/Utils"

let timeText = new Text('').setScale(1).setShadow(true).setAlign('CENTER');
let ticks = 0;

register("chat", () => {
    if (!config.relicSpawnTimer) return;
    ticks = parseInt(config.relicSpawnTimerAmt);
    tickCounter.register();
    display.register();
}).setCriteria("[BOSS] Necron: All this, for nothing...")

const tickCounter = register("packetReceived", () => {
    if (--ticks <= 0) {
        tickCounter.unregister()
        display.unregister();
    }
}).setFilteredClass(S32PacketConfirmTransaction).unregister();

register("worldLoad", () => {
    tickCounter.unregister();
    ticks = 0;
})

const display = register("renderOverlay", () => {
    if (config.relicProgressBar) {
        let msg = "&8[";
        for (let i = 0; i < config.relicSpawnTimerAmt; ++i) {
            if (i < ticks) {
                if (ticks > 2) msg += "&a|";
                else msg += "&c|";
            }
            else msg += "&7|";
        }
        msg += "&8]";
        timeText.setString(msg);
    } else {
        let timeLeft = "";
        if (ticks > 7) timeLeft = "&a";
        else timeLeft = "&c";
        timeLeft += (ticks / 20).toFixed(2);
        timeText.setString(timeLeft);
    }
    
    timeText.setScale(data.relicSpawnTimer.scale);
    timeText.draw(data.relicSpawnTimer.x, data.relicSpawnTimer.y);
}).unregister();

const exampleHud = register("renderOverlay", () => {
    timeText.setString("2.00");
    timeText.setScale(data.relicSpawnTimer.scale);
    timeText.draw(data.relicSpawnTimer.x, data.relicSpawnTimer.y);
}).unregister();

registerWhen(register("dragged", (dx, dy, x, y, bn) => {
    const checkClose = register("GuiClosed", () => {
        checkClose.unregister();
        exampleHud.unregister();
    })
    exampleHud.register();
    if (bn == 2) return;
    data.relicSpawnTimer.x = x;
    data.relicSpawnTimer.y = y;
    data.save();
}), () => config.relicSpawnTimerGui.isOpen())

register("scrolled", (x, y, dir) => {
    if (!config.relicSpawnTimerGui.isOpen()) return;
    if (dir == 1) data.relicSpawnTimer.scale += 0.05;
    else data.relicSpawnTimer.scale -= 0.05;
    data.save();
})

register("guiMouseClick", (x, y, bn) => {
    if (!config.relicSpawnTimerGui.isOpen() || bn != 2) return;
    data.relicSpawnTimer.x = Renderer.screen.getWidth() / 2;
    data.relicSpawnTimer.y = Renderer.screen.getHeight() / 2 + 10;
    data.relicSpawnTimer.scale = 1;
    data.save();
})

register('command', () => {
    ticks = parseInt(config.relicSpawnTimerAmt);
    tickCounter.register();
}).setName("testrelic")