import config from "../config"
import { getDistance, getClass, Zombie, Giant } from "../util/util"
import { data } from "../util/data"
import { registerWhen } from "../../BloomCore/utils/Utils"
import DmapDungeon from "../components/DmapDungeon"
import { componentToRealCoords } from "../components/MapUtils"

let dialogueSaid = false
let moveTime
let bloodStarted
let bloodCleared
let watcherX
let watcherZ
let text = new Text("&cFirst four mobs spawned!").setScale(2).setShadow(true)
let diamanteWarning = new Text("&bDiamante Giant Detected!").setScale(2).setShadow(true)
let inBoss = false
let alerted = false
let showText = false
let showAlert = false

const skullOwner = ["4c95c9e0-bfdc-3d28-8103-292523e20c43", "43aab0f2-c709-370f-9035-2b4fe27b8a07", "14a579e7-d36c-3f5c-9c2b-1051d4691df3", "e67afce3-2a07-3cd1-b18d-9adc9ef7823f", "a596d89d-1d83-37a9-a4d1-e3c67e842635", "7e1cdb5f-a951-3913-bcb1-74cbd6221897", "cd56ef4f-6b7a-3c75-a165-b227e1dbc84f"]
const bloodMessages = ["[BOSS] The Watcher: Ah, you've finally arrived.", "[BOSS] The Watcher: Ah, we meet again...", "[BOSS] The Watcher: So you made it this far... interesting.", "[BOSS] The Watcher: You've managed to scratch and claw your way here, eh?", "[BOSS] The Watcher: I'm starting to get tired of seeing you around here...", "[BOSS] The Watcher: Oh... hello?", "[BOSS] The Watcher: Things feel a little more roomy now, eh?"]
const bossMessages = ["[BOSS] Bonzo: Gratz for making it this far, but I'm basically unbeatable.", "[BOSS] Scarf: This is where the journey ends for you, Adventurers.", "[BOSS] The Professor: I was burdened with terrible news recently...", "[BOSS] Thorn: Welcome Adventurers! I am Thorn, the Spirit! And host of the Vegan Trials!", "[BOSS] Livid: Welcome, you've arrived right on time. I am Livid, the Master of Shadows.", "[BOSS] Sadan: So you made it all the way here... Now you wish to defy me? Sadan?!", "[BOSS] Maxor: WELL! WELL! WELL! LOOK WHO'S HERE!"]

function isWatcher(e) {
    let nbt = new EntityLivingBase(e?.getEntity()).getItemInSlot(4)?.getNBT()?.toString()
    if (nbt) {
        for (let texture of skullOwner) {
            if (nbt.includes(texture)) {
                return true
            }
        }
    }
    return false
}

function correctClass() {
    let playerClass = getClass()
    if (config.campAllClasses) return true
    else {
        if (playerClass == "Mage") return true
    }
    return false
}

// BLOOD OPENED

register("chat", (message) => {
    if (!config.bloodCampHelper || !correctClass()) return
    if (!bloodMessages.includes(message)) return
    bloodStarted = Date.now()
    playerClass = getClass()

    let bloodRoom = DmapDungeon.getRoomFromName("Blood")
    if (!bloodRoom) {
        setTimeout(() => {
            bloodRoom = DmapDungeon.getRoomFromName("Blood")
        }, 2000)
    }
    const bloodCoords = componentToRealCoords(bloodRoom.center)
    watcherX = bloodCoords[0]
    watcherZ = bloodCoords[1]
}).setCriteria("${message}")

// DIALOGUE APPEARS

register("chat", () => {
    if (!config.bloodCampHelper || !correctClass()) return
    World.playSound("random.orb", 2, 0)
    showText = true
    setTimeout(() => {
        showText = false
    }, 2000)
    setTimeout(() => {
        dialogueSaid = true
    }, 500)
}).setCriteria("[BOSS] The Watcher: Let's see how you can handle this.")

registerWhen(register("renderOverlay", () => {
    text.draw((Renderer.screen.getWidth() - text.getWidth()) / 2, (Renderer.screen.getHeight() - text.getHeight()) / 2 - 50)
}), () => showText)

// LOOKING FOR MOVE

register("tick", () => {
    if (!dialogueSaid || !correctClass() || !config.bloodCampHelper) return
    let entities = World.getAllEntitiesOfType(Zombie)
    for (let e of entities) {
        if (isWatcher(e)) {
            if (getDistance(e.getRenderX(), e.getRenderZ(), watcherX, watcherZ) > 2) {
                dialogueSaid = false
                moveTime = Date.now()
                ChatLib.chat(`${config.customPrefix} &aWatcher moved at &e${((moveTime - bloodStarted) / 1000).toFixed(3)}s&a.`)
            }
        }
    }
})

// CAMP FINISHED

register("chat", () => {
    if (!config.bloodCampHelper || !correctClass()) return
    bloodCleared = Date.now()
    ChatLib.chat(`${config.customPrefix} &aRemaining blood mobs took &e${((bloodCleared - moveTime) / 1000).toFixed(3)}s&a`)
}).setCriteria("[BOSS] The Watcher: You have proven yourself. You may pass.")

register("chat", (message) => {
    if (!config.hideCampSplitsInBoss) return
    if (bossMessages.includes(message)) inBoss = true
}).setCriteria("${message}")

register("worldLoad", () => {
    dialogueSaid = false
    alerted = false
    inBoss = false
    moveTime = null
    bloodStarted = null
    bloodCleared = null
})

// LOOKING FOR DIAMANTE

register("tick", () => {
    if (alerted || !correctClass || !config.bloodCampHelper) return
    let entities = World.getAllEntitiesOfType(Giant)
    for (let e of entities) {
        if (new EntityLivingBase(e?.getEntity()).getItemInSlot(3)?.getNBT()?.toString()?.includes("diamond_chestplate")) {
            alerted = true
            showAlert = true
            World.playSound("random.orb", 2, 0)
            setTimeout(() => {
                showAlert = false
            }, 2000)
        }
    }
})

registerWhen(register("renderOverlay", () => {
    diamanteWarning.draw((Renderer.screen.getWidth() - diamanteWarning.getWidth()) / 2, (Renderer.screen.getHeight() - diamanteWarning.getHeight()) / 2 - 100)
}), () => showAlert)

// SPLITS

let splitMsg = new Text("&cWatcher Move: \n&4Remaining Mobs Killed: ").setShadow(true)

registerWhen(register("renderOverlay", () => {
    let split1, split2
    if (!moveTime) {
        split1 = ((Date.now() - bloodStarted) / 1000).toFixed(2)
        splitMsg.setString(`&cWatcher Move: &e${split1}s \n&4Remaining Mobs Killed: `)
        splitMsg.setScale(data.campSplits.scale)
        splitMsg.draw(data.campSplits.x, data.campSplits.y)
    } else if (!bloodCleared) {
        split2 = ((Date.now() - moveTime) / 1000).toFixed(2)
        splitMsg.setString(`&cWatcher Move: &e${((moveTime - bloodStarted) / 1000).toFixed(2)}s \n&4Remaining Mobs Killed: &e${split2}s`)
        splitMsg.setScale(data.campSplits.scale)
        splitMsg.draw(data.campSplits.x, data.campSplits.y)
    } else {
        splitMsg.setString(`&cWatcher Move: &e${((moveTime - bloodStarted) / 1000).toFixed(2)}s \n&4Remaining Mobs Killed: &e${((bloodCleared - moveTime) / 1000).toFixed(2)}s`)
        splitMsg.setScale(data.campSplits.scale)
        splitMsg.draw(data.campSplits.x, data.campSplits.y)
    }
}), () => config.bloodCampHelper && config.campSplits && bloodStarted && !inBoss && correctClass())

registerWhen(register("renderOverlay", () => {
    splitMsg.setString("&cWatcher Move: \n&4Remaining Mobs Killed: ")
    splitMsg.setScale(data.campSplits.scale)
    splitMsg.draw(data.campSplits.x, data.campSplits.y)
}), () => config.campSplitsGui.isOpen())

registerWhen(register("dragged", (dx, dy, x, y, bn) => {
    if (bn == 2) return
    data.campSplits.x = x
    data.campSplits.y = y
    data.save()
}), () => config.campSplitsGui.isOpen())

register("scrolled", (x, y, dir) => {
    if (!config.campSplitsGui.isOpen()) return
    if (dir == 1) data.campSplits.scale += 0.05
    else data.campSplits.scale -= 0.05
    data.save()
})

register("guiMouseClick", (x, y, bn) => {
    if (!config.campSplitsGui.isOpen() || bn != 2) return
    data.campSplits.x = 0
    data.campSplits.y = 0
    data.campSplits.scale = 1
    data.save()
})