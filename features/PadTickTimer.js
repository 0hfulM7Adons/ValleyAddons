import config from "../config"
import { data } from "../util/data"
import { S32PacketConfirmTransaction } from "../util/util"
import { registerWhen } from "../../BloomCore/utils/Utils"

let ticks = 0;
let deathTime = 0;
let timeText = new Text('').setScale(2).setShadow(true).setAlign('CENTER').setColor(Renderer.GOLD);
let deathText = new Text('').setScale(2).setShadow(true).setAlign('CENTER').setColor(Renderer.DARK_PURPLE);

register("chat", () => {
    if (!config.padTickTimer) return;
    ticks = 0
    tickCounter.register()
    timer.register();
}).setCriteria("[BOSS] Storm: Pathetic Maxor, just like expected.")

register("chat", () => {
    ticks = 0
    tickCounter.unregister()
    timer.unregister();
}).setCriteria("[BOSS] Storm: I should have known that I stood no chance.")

register("chat", () => {
    if (!config.stormDeathTime) return;
    deathTime = ticks;
    ChatLib.chat(`${config.customPrefix} &aStorm died at &e${(ticks / 20).toFixed(2)}s&a.`)
    timeDisplay.register();
    setTimeout(() => {
        timeDisplay.unregister();
    }, 2000)
}).setCriteria("⚠ Storm is enraged! ⚠")

const timer = register("renderOverlay", () => {
    let timeLeft = ticks / 20
    timeText.setString(timeLeft.toFixed(2))
    timeText.setScale(data.padTickTimer.scale)
    timeText.draw(data.padTickTimer.x, data.padTickTimer.y)
}).unregister();

const timeDisplay = register("renderOverlay", () => {
    let text = (deathTime / 20).toFixed(2);
    deathText.setString(text);
    deathText.setScale(data.padTickTimer.scale);
    deathText.draw(data.padTickTimer.x, data.padtickTimer.y + 40 * data.padTickTimer.scale);
}).unregister();

const tickCounter = register("packetReceived", () => {
    ticks++;
}).setFilteredClass(S32PacketConfirmTransaction).unregister()

register("worldUnload", () => {
    ticks = 0;
    tickCounter.unregister();
    timer.unregister();
})

registerWhen(register("renderOverlay", () => {
    timeText.setString("1.00")
    timeText.setScale(data.padTickTimer.scale)
    timeText.draw(data.padTickTimer.x, data.padTickTimer.y)
}), () => config.padTickTimerGui.isOpen())

registerWhen(register("dragged", (dx, dy, x, y, bn) => {
    if (bn == 2) return
    data.padTickTimer.x = x
    data.padTickTimer.y = y
    data.save()
}), () => config.padTickTimerGui.isOpen())

register("scrolled", (x, y, dir) => {
    if (!config.padTickTimerGui.isOpen()) return
    if (dir == 1) data.padTickTimer.scale += 0.05
    else data.padTickTimer.scale -= 0.05
    data.save()
})

register("guiMouseClick", (x, y, bn) => {
    if (!config.padTickTimerGui.isOpen() || bn != 2) return
    data.padTickTimer.x = Renderer.screen.getWidth() / 2
    data.padTickTimer.y = Renderer.screen.getHeight() / 2 + 10
    data.padTickTimer.scale = 1
    data.save()
})