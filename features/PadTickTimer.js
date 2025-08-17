import config from "../config"
import { data } from "../util/data"
import { S32PacketConfirmTransaction } from "../util/util"
import { registerWhen } from "../../BloomCore/utils/Utils"

let ticks = 0
let timeText = new Text('').setScale(2).setShadow(true).setAlign('CENTER').setColor(Renderer.GOLD)
let isTimerActive = false

register("chat", () => {
    ticks = config.totalStormTime ? 0 : 20
    tickCounter.register()
    isTimerActive = true
}).setCriteria("[BOSS] Storm: Pathetic Maxor, just like expected.")

register("chat", () => {
    ticks = 0
    tickCounter.unregister()
    isTimerActive = false
}).setCriteria("[BOSS] Storm: I should have known that I stood no chance.")

registerWhen(register("renderOverlay", () => {
    let timeLeft = ticks / 20
    timeText.setString(timeLeft.toFixed(2))
    timeText.setScale(data.padTickTimer.scale)
    timeText.draw(data.padTickTimer.x, data.padTickTimer.y)
}), () => config.padTickTimer && isTimerActive)

const tickCounter = register("packetReceived", () => {
    if (!config.totalStormTime) {
        ticks--
        if (ticks <= 0) ticks = 20
    } else {
        ticks++
    }
}).setFilteredClass(S32PacketConfirmTransaction).unregister()

registerWhen(register("worldUnload", () => {
    ticks = 0
    tickCounter.unregister()
    isTimerActive = false
}), () => config.padTickTimer)

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