import config from "../config"
import Dungeon from "../../BloomCore/dungeons/Dungeon"

let bagOpened = false

register("worldLoad", () => {
    bagOpened = false
})

register("tick", () => {
    if (!config.autoOpenPotionBag) return
    if (Dungeon.inDungeon && !bagOpened) {
        ChatLib.chat(`${config.customPrefix} &aOpening potion bag.`)
        ChatLib.command("potionbag")
        bagOpened = true
    }
})