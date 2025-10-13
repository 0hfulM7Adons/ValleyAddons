import config from "../config"
import { getDistance, getClass, Zombie, Giant, skullOwner, bloodMessages, bossMessages } from "../util/util"
import { data } from "../util/data"
import DmapDungeon from "../components/DmapDungeon"
import { componentToRealCoords } from "../components/MapUtils"
import { registerWhen } from "../../BloomCore/utils/Utils"

let moveTime;
let bloodStarted;
let bloodCleared;
let watcherX;
let watcherZ;
let text = new Text("&cFirst four mobs spawned!").setScale(2).setShadow(true);
let diamanteWarning = new Text("&bDiamante Giant Detected!").setScale(2).setShadow(true);
let alerted = false;

function isWatcher(e) {
    let nbt = new EntityLivingBase(e?.getEntity()).getItemInSlot(4)?.getNBT()?.toString();
    if (nbt) {
        for (let texture of skullOwner) {
            if (nbt.includes(texture)) {
                return true;
            }
        }
    }
    return false;
}

function correctClass() {
    let playerClass = getClass();
    if (config.campAllClasses) return true;
    else {
        if (playerClass == "Mage") return true;
    }
    return false;
}

// BLOOD OPENED

register("chat", (message) => {
    if (!config.bloodCampHelper || !correctClass()) return;
    if (!bloodMessages.includes(message)) return;
    bloodStarted = Date.now();

    diamanteListener.register();
    if (config.campSplits) splitsDisplay.register();

    findBlood.register();
}).setCriteria("${message}")

const findBlood = register("tick", () => {
    let bloodRoom = DmapDungeon.getRoomFromName("Blood");
    if (bloodRoom) {
        const bloodCoords = componentToRealCoords(bloodRoom.center);
        watcherX = bloodCoords[0];
        watcherZ = bloodCoords[1];
        findBlood.unregister();
    }
}).unregister();

// DIALOGUE APPEARS

register("chat", () => {
    if (!config.bloodCampHelper || !correctClass()) return;
    World.playSound("random.orb", 2, 0);
    dialogueDisplay.register();
    setTimeout(() => {
        dialogueDisplay.unregister();
    }, 2000)
    setTimeout(() => {
        moveListener.register();
    }, 500)
}).setCriteria("[BOSS] The Watcher: Let's see how you can handle this.")

const dialogueDisplay = register("renderOverlay", () => {
    text.draw((Renderer.screen.getWidth() - text.getWidth()) / 2, (Renderer.screen.getHeight() - text.getHeight()) / 2 - 50);
}).unregister();

// LOOKING FOR MOVE

const moveListener = register("tick", () => {
    if (!correctClass() || !config.bloodCampHelper) return;
    let entities = World.getAllEntitiesOfType(Zombie);
    for (let e of entities) {
        if (isWatcher(e)) {
            if (getDistance(e.getRenderX(), e.getRenderZ(), watcherX, watcherZ) > 2) {
                moveTime = Date.now();
                ChatLib.chat(`${config.customPrefix} &aWatcher moved at &e${((moveTime - bloodStarted) / 1000).toFixed(3)}s&a.`);
                moveListener.unregister();
            }
        }
    }
}).unregister();

// CAMP FINISHED

register("chat", () => {
    if (!config.bloodCampHelper || !correctClass()) return;
    bloodCleared = Date.now();
    ChatLib.chat(`${config.customPrefix} &aRemaining blood mobs took &e${((bloodCleared - moveTime) / 1000).toFixed(3)}s&a`);
}).setCriteria("[BOSS] The Watcher: You have proven yourself. You may pass.")

register("chat", (message) => {
    if (!config.hideCampSplitsInBoss) return;
    if (bossMessages.includes(message)) splitsDisplay.unregister();
}).setCriteria("${message}")

register("worldLoad", () => {
    dialogueDisplay.unregister();
    moveListener.unregister();
    diamanteListener.unregister();
    alertDisplay.unregister();
    splitsDisplay.unregister();
    moveTime = null;
    bloodStarted = null;
    bloodCleared = null;
})

// LOOKING FOR DIAMANTE

const diamanteListener = register("tick", () => {
    if (alerted || !correctClass || !config.bloodCampHelper) return
    let entities = World.getAllEntitiesOfType(Giant);
    for (let e of entities) {
        if (new EntityLivingBase(e?.getEntity()).getItemInSlot(3)?.getNBT()?.toString()?.includes("diamond_chestplate")) {
            alerted = true;
            alertDisplay.register();
            World.playSound("random.orb", 2, 0);
            setTimeout(() => {
                alertDisplay.unregister();
            }, 2000)
        }
    }
}).unregister();

const alertDisplay = register("renderOverlay", () => {
    diamanteWarning.draw((Renderer.screen.getWidth() - diamanteWarning.getWidth()) / 2, (Renderer.screen.getHeight() - diamanteWarning.getHeight()) / 2 - 100);
}).unregister();

// SPLITS

let splitMsg = new Text("&cWatcher Move: \n&4Remaining Mobs Killed: ").setShadow(true);

const splitsDisplay = register("renderOverlay", () => {
    let split1, split2;
    if (!moveTime) {
        split1 = ((Date.now() - bloodStarted) / 1000).toFixed(2);
        splitMsg.setString(`&cWatcher Move: &e${split1}s \n&4Remaining Mobs Killed: `);
    } else if (!bloodCleared) {
        split2 = ((Date.now() - moveTime) / 1000).toFixed(2);
        splitMsg.setString(`&cWatcher Move: &e${((moveTime - bloodStarted) / 1000).toFixed(2)}s \n&4Remaining Mobs Killed: &e${split2}s`);
    } else {
        splitMsg.setString(`&cWatcher Move: &e${((moveTime - bloodStarted) / 1000).toFixed(2)}s \n&4Remaining Mobs Killed: &e${((bloodCleared - moveTime) / 1000).toFixed(2)}s`);
    }
    splitMsg.setScale(data.campSplits.scale);
    splitMsg.draw(data.campSplits.x, data.campSplits.y);
}).unregister();

const exampleHud = register("renderOverlay", () => {
    splitMsg.setString("&cWatcher Move: \n&4Remaining Mobs Killed: ")
    splitMsg.setScale(data.campSplits.scale)
    splitMsg.draw(data.campSplits.x, data.campSplits.y)
}).unregister();

registerWhen(register("dragged", (dx, dy, x, y, bn) => {
    const checkClose = register("GuiClosed", () => {
        checkClose.unregister();
        exampleHud.unregister();
    })
    exampleHud.register();
    if (bn == 2) return;
    data.campSplits.x = x;
    data.campSplits.y = y;
    data.save();
}), () => config.campSplitsGui.isOpen())

register("scrolled", (x, y, dir) => {
    if (!config.campSplitsGui.isOpen()) return;
    if (dir == 1) data.campSplits.scale += 0.05;
    else data.campSplits.scale -= 0.05;
    data.save();
})

register("guiMouseClick", (x, y, bn) => {
    if (!config.campSplitsGui.isOpen() || bn != 2) return;
    data.campSplits.x = 0;
    data.campSplits.y = 0;
    data.campSplits.scale = 1;
    data.save();
})