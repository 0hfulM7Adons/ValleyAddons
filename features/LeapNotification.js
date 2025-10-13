import Dungeon from "../../BloomCore/dungeons/Dungeon"
import config from "../config"
import { data } from "../util/data"
import { bossMessages } from "../util/util"
import { registerWhen } from "../../BloomCore/utils/Utils"

let text = new Text('').setScale(3).setShadow(true).setAlign('CENTER');
let playersLeaped = [];
let p5Started = false;

const sectionRegions = [
    [90, 111, 106, 145, 50, 123],
    [17, 108, 106, 145, 121, 143],
    [-2, 20, 106, 145, 51, 142],
    [-1, 191, 26, 145, 29, 58],
    [3, 128, 5, 48, 0, 140]

    // x1, x2, y1, y2, z1, z2
]

const eeSpots = {
    ee2: {x: 58, y: 109, z: 131, r: 1},
    ee3: {x: 2, y: 109, z: 104, r: 1},
    core: {x: 54.5, y: 115, z: 50.5, r: 1},
    relic: {x: 54.5, y: 5, z: 76.5, r: 3}
}

function inBox(player, region) {
    let [x, y, z] = [player.getRenderX(), player.getRenderY(), player.getRenderZ()];
    if (x >= region[0] && x <= region[1] && y >= region[2] && y <= region[3] && z >= region[4] && z <= region[5]) return true;
    return false;
}

function getSection(player) {
    if (!player) return 0;

    for (let i = 0; i < 5; ++i) {
        if (inBox(player, sectionRegions[i])) return i + 1;
    }
    return 0;
}

function leapListener(section) {
    for (let p of Dungeon.party) {
        if (p == Player.getName()) continue;
        let player = World.getPlayerByName(p);
        if (!player) continue;
        if (getSection(player) == section) {
            if (!playersLeaped.includes(p)) playersLeaped.push(p);
        }
    }
}

function eeSpot() {
    if (inRange(eeSpots.ee2)) return 2;
    else if (inRange(eeSpots.ee3)) return 3;
    else if (inRange(eeSpots.core)) return 4;
    else if (inRange(eeSpots.relic) && !p5Started) return 5;
    else return 0;
}

function inRange(spot) {
    let [x, y, z] = [Player.getX(), Player.getY(), Player.getZ()];
    let distX = Math.abs(spot.x - x);
    let distY = Math.abs(spot.y - y);
    let distZ = Math.abs(spot.z - z);
    if (distX < spot.r && distY < 2 && distZ < spot.r) return true;
    return false;
}

register("chat", () => {
    p5Started = true;
}).setCriteria("[BOSS] Necron: All this, for nothing...")

register("worldLoad", () => {
    p5Started = false;
    locationListener.unregister();
    display.unregister();
})

register("chat", (message) => {
    if (bossMessages.includes(message)) locationListener.register();
}).setCriteria("${message}")

const locationListener = register("tick", () => {
    if (!config.leapNotification) return;
    if (eeSpot() > 0) {
        leapListener(eeSpot());
        display.register();
    } else {
        playersLeaped = [];
        display.unregister();
    }
}).unregister();

const display = register("renderOverlay", () => {
    if (!config.leapNotification) return;
    if (eeSpot() == 3) text.setString(`${playersLeaped.length > 2 ? "&9" : "&4"}${playersLeaped.length}&9/3 Players Leaped`);
    else text.setString(`${playersLeaped.length > 3 ? "&9" : "&4"}${playersLeaped.length}&9/4 Players Leaped`);
    
    text.setScale(data.leapNotification.scale);
    text.draw(data.leapNotification.x, data.leapNotification.y);
}).unregister();

const exampleHud = register("renderOverlay", () => {
    text.setString(`&94/4 Players Leaped`);
    text.setScale(data.leapNotification.scale);
    text.draw(data.leapNotification.x, data.leapNotification.y);
}).unregister();

registerWhen(register("dragged", (dx, dy, x, y, bn) => {
    const checkClose = register("GuiClosed", () => {
        checkClose.unregister();
        exampleHud.unregister();
    })
    exampleHud.register();
    if (bn == 2) return;
    data.leapNotification.x = x;
    data.leapNotification.y = y;
    data.save();
}), () => config.leapNotificationGui.isOpen())

register("scrolled", (x, y, dir) => {
    if (!config.leapNotificationGui.isOpen()) return;
    if (dir == 1) data.leapNotification.scale += 0.05;
    else data.leapNotification.scale -= 0.05;
    data.save();
})

register("guiMouseClick", (x, y, bn) => {
    if (!config.leapNotificationGui.isOpen() || bn != 2) return;
    data.leapNotification.x = Renderer.screen.getWidth() / 2;
    data.leapNotification.y = Renderer.screen.getHeight() / 2 - 200;
    data.leapNotification.scale = 3;
    data.save();
})