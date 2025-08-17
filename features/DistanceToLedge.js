import config from "../config"
import { data } from "../util/data"
import { registerWhen } from "../../BloomCore/utils/Utils"
import { getClass, regions, isPlayerInBox } from "../util/util"

let show = false
let text = new Text("").setScale(2).setShadow(true).setAlign("CENTER")

register("chat", () => {
    show = true
}).setCriteria("[BOSS] Storm: Pathetic Maxor, just like expected.")

register("chat", () => {
    show = false
}).setCriteria("[BOSS] Storm: I should have known that I stood no chance.")

registerWhen(register("renderOverlay", () => {
    if (!isPlayerInBox(...regions.p2)) return
    const dist = (75 - Player.getZ()).toFixed(3)
    text.setString(dist)
    text.setScale(data.distanceToLedge.scale)
    text.draw(data.distanceToLedge.x, data.distanceToLedge.y)
}), () => config.distanceToLedge && show && (getClass() == "Archer" || getClass() == "Mage"))

register("worldLoad", () => {
    show = false
})

registerWhen(register("renderOverlay", () => {
    text.setString("12.345")
    text.setScale(data.distanceToLedge.scale)
    text.draw(data.distanceToLedge.x, data.distanceToLedge.y)
}), () => config.distanceToLedgeGui.isOpen())

registerWhen(register("dragged", (dx, dy, x, y, bn) => {
    if (bn == 2) return
    data.distanceToLedge.x = x
    data.distanceToLedge.y = y
    data.save()
}), () => config.distanceToLedgeGui.isOpen())

register("scrolled", (x, y, dir) => {
    if (!config.distanceToLedgeGui.isOpen()) return
    if (dir == 1) data.distanceToLedge.scale += 0.05
    else data.distanceToLedge.scale -= 0.05
    data.save()
})

register("guiMouseClick", (x, y, bn) => {
    if (!config.distanceToLedgeGui.isOpen() || bn != 2) return
    data.distanceToLedge.x = Renderer.screen.getWidth() / 2
    data.distanceToLedge.y = Renderer.screen.getHeight() / 2 + 10
    data.distanceToLedge.scale = 1
    data.save()
})