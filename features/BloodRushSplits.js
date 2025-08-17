import config from "../config"
import { getClass } from "../util/util"
import DmapDungeon from "../components/DmapDungeon"

let runStarted = null
let rooms = []
let roomTimes = []
let inBr = false
let messageSent = false
let omitRooms = ["Entrance", "Fairy", "Blood"]

register("chat", () => {
    if (!config.bloodRushSplits) return
    runStarted = Date.now()
    roomTimes.push(0)
    inBr = true
}).setCriteria("[NPC] Mort: Here, I found this map when I first entered the dungeon.")

register("chat", () => {
    if (!config.bloodRushSplits) return
    if (!config.showOnEveryClass && getClass() != "Archer" && getClass() != "Mage") return
    roomTimes.push(Date.now() - runStarted)
}).setCriteria(/.+ opened a WITHER door!/)

register("chat", () => {
    if (!config.bloodRushSplits || messageSent) return
    if (!config.showOnEveryClass && getClass() != "Archer" && getClass() != "Mage") return
    roomTimes.push(Date.now() - runStarted)
    const bloodRoute = DmapDungeon.dungeonMap.getRoomsTo(DmapDungeon.getRoomFromName("Entrance"), DmapDungeon.getRoomFromName("Blood"), false)
    if (bloodRoute) {
        addRooms(bloodRoute)
    }
    let message = `\n${config.customPrefix} &4&lBlood Rush Splits: `
    for (let i = 0; i < rooms.length; ++i) {
        let individualTime = ((roomTimes[i + 1] - roomTimes[i]) / 1000).toFixed(2)
        message += `\n&a${rooms[i]}: &e${individualTime}s `
    }
    message += "\n"
    ChatLib.chat(message)
    inBr = false
    messageSent = true
}).setCriteria("The BLOOD DOOR has been opened!")

register("worldLoad", () => {
    runStarted = null
    rooms = []
    roomTimes = []
    inBr = false
    messageSent = false
})

register("command", () => {
    const bloodRoute = DmapDungeon.dungeonMap.getRoomsTo(DmapDungeon.getRoomFromName("Entrance"), DmapDungeon.getRoomFromName("Blood"), false)
    bloodRoute.forEach(room => {
        if (!omitRooms.includes(room.name)) rooms.push(room.name)
    })
}).setName("bloodrushrooms")

function addRooms(route) {
    for (let i = 1; i < route.length - 1; ++i) {
        if (!route[i].name.includes("Fairy")) route[i + 1].name.includes("Fairy") ? rooms.push(`${route[i].name} + Fairy`) : rooms.push(route[i].name)
    }
}