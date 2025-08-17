import config from "../config"
import { data } from "../util/data"
import { S32PacketConfirmTransaction } from "../util/util"
import { registerWhen } from "../../BloomCore/utils/Utils"

let barrierTicks = 0
let timeText = new Text('').setScale(2).setShadow(true).setAlign('CENTER').setColor(Renderer.GREEN)
let isTimerActive = false

register("chat", () => {
    if (!config.totalTermTime) barrierTicks = 60
    tickCounter.register()
    isTimerActive = true
}).setCriteria("[BOSS] Goldor: Who dares trespass into my domain?")

register("chat", () => {
    barrierTicks = 0
    tickCounter.unregister()
    isTimerActive = false
}).setCriteria("The Core entrance is opening!")

registerWhen(register("renderOverlay", () => {
    const timeLeft = barrierTicks / 20
    if (!config.totalTermTime) {
        timeText.setString((barrierTicks > 40 ? "§a" : barrierTicks > 20 ? "§6" : "§c") + timeLeft.toFixed(2))
    } else {
        const currTick = barrierTicks % 60
        timeText.setString((currTick < 20 ? "§a" : currTick < 40 ? "§6" : "§c") + timeLeft.toFixed(2))
    }
    timeText.setScale(data.goldorTickTimer.scale)
    timeText.draw(data.goldorTickTimer.x, data.goldorTickTimer.y)
}), () => config.goldorTickTimer && isTimerActive)

const tickCounter = register("packetReceived", () => {
    if (!config.totalTermTime) {
        barrierTicks--
        if (barrierTicks <= 0) barrierTicks = 60
    } else {
        barrierTicks++
    }
}).setFilteredClass(S32PacketConfirmTransaction).unregister()

registerWhen(register("worldUnload", () => {
    barrierTicks = 0
    tickCounter.unregister()
    isTimerActive = false
}), () => config.goldorTickTimer)

registerWhen(register("renderOverlay", () => {
    timeText.setString("3.00")
    timeText.setScale(data.goldorTickTimer.scale)
    timeText.draw(data.goldorTickTimer.x, data.goldorTickTimer.y)
}), () => config.goldorTickTimerGui.isOpen())

registerWhen(register("dragged", (dx, dy, x, y, bn) => {
    if (bn == 2) return
    data.goldorTickTimer.x = x
    data.goldorTickTimer.y = y
    data.save()
}), () => config.goldorTickTimerGui.isOpen())

register("scrolled", (x, y, dir) => {
    if (!config.goldorTickTimerGui.isOpen()) return
    if (dir == 1) data.goldorTickTimer.scale += 0.05
    else data.goldorTickTimer.scale -= 0.05
    data.save()
})

register("guiMouseClick", (x, y, bn) => {
    if (!config.goldorTickTimerGui.isOpen() || bn != 2) return
    data.goldorTickTimer.x = Renderer.screen.getWidth() / 2
    data.goldorTickTimer.y = Renderer.screen.getHeight() / 2 + 10
    data.goldorTickTimer.scale = 1
    data.save()
})