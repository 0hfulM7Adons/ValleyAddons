import config from "../config"
import { registerWhen } from "../../BloomCore/utils/Utils"
import Dungeon from "../../BloomCore/dungeons/Dungeon"
import { getClass, ArmorStand } from "../util/util"

let witherDropped = false
let bloodDropped = false
let wither = new Text("&8&lWither Key Dropped").setScale(2).setShadow(true)
let blood = new Text("&4&lBlood Key Dropped").setScale(2).setShadow(true)

register("worldLoad", () => {
    bloodOpened = false
    witherDropped = false
    bloodDropped = false
})

register("chat", () => {
    bloodOpened = true
}).setCriteria(/\[BOSS\] The Watcher: .+/)

register("tick", () => {
    if (!config.witherBloodKeys) return
    if (!Dungeon.inDungeon) return
    if (getClass() != "Archer" && getClass() != "Mage") return
    
    const entities = World.getAllEntitiesOfType(ArmorStand)
    for (let i = 0; i < entities.length; ++i) {
        let entity = entities[i]
        if (entity.getName().includes("Wither Key")) {
            if (!witherDropped) {
                witherDropped = true
                World.playSound("random.orb", 2, 0.5)
            }
        } else if (entity.getName().includes("Blood Key")) {
            if (!bloodDropped) {
                bloodDropped = true
                World.playSound("random.orb", 2, 0.5)
            }
        }
    }
})

registerWhen(register("renderOverlay", () => {
    wither.draw((Renderer.screen.getWidth() - wither.getWidth()) / 2, (Renderer.screen.getHeight() - wither.getHeight()) / 2 - 50)
}), () => witherDropped)

registerWhen(register("renderOverlay", () => {
    blood.draw((Renderer.screen.getWidth() - blood.getWidth()) / 2, (Renderer.screen.getHeight() - blood.getHeight()) / 2 - 50)
}), () => bloodDropped)

register("chat", () => {
    setTimeout(() => {
        witherDropped = false
    }, 500)
}).setCriteria("has obtained Wither Key!").setContains()

register("chat", () => {
    setTimeout(() => {
        witherDropped = false
    }, 500)
}).setCriteria("A Wither Key was picked up!")

register("chat", () => {
    setTimeout(() => {
        bloodDropped = false
    }, 500)
}).setCriteria("has obtained Blood Key!").setContains()

register("chat", () => {
    setTimeout(() => {
        bloodDropped = false
    }, 500)
}).setCriteria("A Blood Key was picked up!")