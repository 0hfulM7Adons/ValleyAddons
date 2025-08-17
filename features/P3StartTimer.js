import config from "../config"
import { data } from "../util/data"
import { S32PacketConfirmTransaction } from "../util/util"
import { registerWhen } from "../../BloomCore/utils/Utils"

let timeText = new Text('').setScale(1).setShadow(true).setAlign('CENTER').setColor(Renderer.YELLOW)
let ticks = 0

const tickCounter = register("packetReceived", () => {
    ticks--
    if (ticks <= 0) tickCounter.unregister()
}).setFilteredClass(S32PacketConfirmTransaction).unregister()

register("chat", () => {
    ticks = 104
    tickCounter.register()
}).setCriteria("[BOSS] Storm: I should have known that I stood no chance.")

registerWhen(register("renderOverlay", () => {
    const remaining = (ticks / 20).toFixed(2)
    if (remaining <= 0) return

    timeText.setString(remaining)
    timeText.setScale(data.p3StartTimer.scale)
    timeText.draw(data.p3StartTimer.x, data.p3StartTimer.y)
}), () => config.p3StartTimer)

registerWhen(register("renderOverlay", () => {
    timeText.setString("5.20")
    timeText.setScale(data.p3StartTimer.scale)
    timeText.draw(data.p3StartTimer.x, data.p3StartTimer.y)
}), () => config.p3StartTimerGui.isOpen())

registerWhen(register("dragged", (dx, dy, x, y, bn) => {
    if (bn == 2) return
    data.p3StartTimer.x = x
    data.p3StartTimer.y = y
    data.save()
}), () => config.p3StartTimerGui.isOpen())

register("scrolled", (x, y, dir) => {
    if (!config.p3StartTimerGui.isOpen()) return
    if (dir == 1) data.p3StartTimer.scale += 0.05
    else data.p3StartTimer.scale -= 0.05
    data.save()
})

register("guiMouseClick", (x, y, bn) => {
    if (!config.p3StartTimerGui.isOpen() || bn != 2) return
    data.p3StartTimer.x = Renderer.screen.getWidth() / 2
    data.p3StartTimer.y = Renderer.screen.getHeight() / 2 + 10
    data.p3StartTimer.scale = 1
    data.save()
})