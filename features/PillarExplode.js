import config from "../config"
import { data } from "../util/data"
import { S32PacketConfirmTransaction } from "../util/util"
import { registerWhen } from "../../BloomCore/utils/Utils"

let ticks = 0
let text = new Text("").setScale(2).setShadow(true).setAlign("CENTER")

register("chat", (message) => {
    if (message == "[BOSS] Storm: Oof" || message == "[BOSS] Storm: Ouch, that hurt!") {
        ticks = 20
        tickCounter.register()
    }
}).setCriteria("${message}")

const tickCounter = register("packetReceived", () => {
    ticks--
    if (ticks <= 0) tickCounter.unregister()
}).setFilteredClass(S32PacketConfirmTransaction).unregister()

registerWhen(register("renderOverlay", () => {
    let timeLeft = (ticks / 20).toFixed(2)
    text.setString(((ticks > 6) ? "&a" : "&c") + timeLeft)
    text.setScale(data.pillarExplode.scale)
    text.draw(data.pillarExplode.x, data.pillarExplode.y)
}), () => config.pillarExplode && ticks > 0)

register("worldUnload", () => {
    ticks = 0
    tickCounter.unregister()
})

registerWhen(register("renderOverlay", () => {
    text.setString("1.00")
    text.setScale(data.pillarExplode.scale)
    text.draw(data.pillarExplode.x, data.pillarExplode.y)
}), () => config.pillarExplodeGui.isOpen())

registerWhen(register("dragged", (dx, dy, x, y, bn) => {
    if (bn == 2) return
    data.pillarExplode.x = x
    data.pillarExplode.y = y
    data.save()
}), () => config.pillarExplodeGui.isOpen())

register("scrolled", (x, y, dir) => {
    if (!config.pillarExplodeGui.isOpen()) return
    if (dir == 1) data.pillarExplode.scale += 0.05
    else data.pillarExplode.scale -= 0.05
    data.save()
})

register("guiMouseClick", (x, y, bn) => {
    if (!config.pillarExplodeGui.isOpen() || bn != 2) return
    data.pillarExplode.x = Renderer.screen.getWidth() / 2
    data.pillarExplode.y = Renderer.screen.getHeight() / 2 + 10
    data.pillarExplode.scale = 1
    data.save()
})