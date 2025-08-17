import config from "../config"
import { data } from "../util/data"
import { S32PacketConfirmTransaction } from "../util/util"
import { registerWhen } from "../../BloomCore/utils/Utils"

let text = new Text("").setScale(1).setShadow(true).setAlign("CENTER").setColor(Renderer.YELLOW)
let ticks = 0
let soundPlayed = false
let casted = false

register("packetReceived", () => {
    if (ticks <= 0) return
    ticks--
    if (ticks < 140) {
        casted = false
        soundPlayed = false
    }
}).setFilteredClass(S32PacketConfirmTransaction)

register("soundPlay", () => {
    soundPlayed = true
}).setCriteria("mob.wolf.howl")

registerWhen(register("actionBar", (event) => {
    let msg = ChatLib.getChatMessage(event).removeFormatting()
    if (msg.includes("CASTING") && !msg.includes("CASTING IN") && !casted) {
        casted = true
        ticks = 200
    }
}), () => config.ragDisplay)

register("worldLoad", () => {
    ticks = 0
    soundPlayed = false
    casted = false
})

registerWhen(register("renderOverlay", () => {
    const remaining = (ticks / 20).toFixed(2)

    text.setString(remaining)
    text.setScale(data.ragDisplay.scale)
    text.draw(data.ragDisplay.x, data.ragDisplay.y)
}), () => config.ragDisplay && ticks > 0)

registerWhen(register("renderOverlay", () => {
    text.setString("10.00")
    text.setScale(data.ragDisplay.scale)
    text.draw(data.ragDisplay.x, data.ragDisplay.y)
}), () => config.ragDisplayGui.isOpen())

registerWhen(register("dragged", (dx, dy, x, y, bn) => {
    if (bn == 2) return
    data.ragDisplay.x = x
    data.ragDisplay.y = y
    data.save()
}), () => config.ragDisplayGui.isOpen())

register("scrolled", (x, y, dir) => {
    if (!config.ragDisplayGui.isOpen()) return
    if (dir == 1) data.ragDisplay.scale += 0.05
    else data.ragDisplay.scale -= 0.05
    data.save()
})

register("guiMouseClick", (x, y, bn) => {
    if (!config.ragDisplayGui.isOpen() || bn != 2) return
    data.ragDisplay.x = Renderer.screen.getWidth() / 2
    data.ragDisplay.y = Renderer.screen.getHeight() / 2 - 20
    data.ragDisplay.scale = 1
    data.save()
})