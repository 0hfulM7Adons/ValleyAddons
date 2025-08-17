import config from "../config"
import { data } from "../util/data"
import { S32PacketConfirmTransaction } from "../util/util"
import { registerWhen } from "../../BloomCore/utils/Utils"

let text = new Text("").setScale(1).setShadow(true).setAlign("CENTER").setColor(Renderer.RED)
let reaperActive
let soundPlayed = false
let ticks = 0

register("packetReceived", () => {
    if (!reaperActive) return
    ticks--
    if (ticks <= 0) reaperActive = false
}).setFilteredClass(S32PacketConfirmTransaction)

register("soundPlay", () => {
    soundPlayed = true
}).setCriteria("mob.zombie.remedy")

register("tick", () => {
    if (!soundPlayed || !config.reaperDisplay) return
    const armor = Player.armor?.getChestplate()?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")?.getString("id")
    let color = Player.armor?.getChestplate()?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("display")?.getInteger("color")
    if (armor == "REAPER_CHESTPLATE" && color == 16711680) {
        reaperActive = true
        soundPlayed = false
        ticks = 120
    }
})

registerWhen(register("renderOverlay", () => {
    const remaining = (ticks / 20).toFixed(2)

    text.setString(remaining)
    text.setScale(data.reaperDisplay.scale)
    text.draw(data.reaperDisplay.x, data.reaperDisplay.y)
}), () => config.reaperDisplay && reaperActive)

registerWhen(register("renderOverlay", () => {
    text.setString("6.00")
    text.setScale(data.reaperDisplay.scale)
    text.draw(data.reaperDisplay.x, data.reaperDisplay.y)
}), () => config.reaperDisplayGui.isOpen())

registerWhen(register("dragged", (dx, dy, x, y, bn) => {
    if (bn == 2) return
    data.reaperDisplay.x = x
    data.reaperDisplay.y = y
    data.save()
}), () => config.reaperDisplayGui.isOpen())

register("scrolled", (x, y, dir) => {
    if (!config.reaperDisplayGui.isOpen()) return
    if (dir == 1) data.reaperDisplay.scale += 0.05
    else data.reaperDisplay.scale -= 0.05
    data.save()
})

register("guiMouseClick", (x, y, bn) => {
    if (!config.reaperDisplayGui.isOpen() || bn != 2) return
    data.reaperDisplay.x = Renderer.screen.getWidth() / 2
    data.reaperDisplay.y = Renderer.screen.getHeight() / 2 + 10
    data.reaperDisplay.scale = 1
    data.save()
})