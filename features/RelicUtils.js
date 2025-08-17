import config from "../config"
import { isPlayerInBox, MouseEvent, RenderUtils, ColorUtils, AxisAlignedBB, javaColor } from "../util/util"

let relic
const relicCoords = {
    Green: [49, 7, 44, 85, 255, 85],
    Red: [51, 7, 42, 255, 85, 85],
    Purple: [54, 7, 41, 255, 85, 255],
    Orange: [57, 7, 42, 255, 170, 0],
    Blue: [59, 7, 44, 85, 255, 255]
}

register("chat", (name, relicPicked) => {
    if (!config.highlightCauldron && !config.blockRelicClicks) return
    if (name != Player.getName()) return
    relic = relicPicked

    rcListener.register();
    lcListener.register();
}).setCriteria(/(\w+) picked the Corrupted (\w+) Relic!/)

register("renderWorld", () => {
    if (!config.highlightCauldron) return;
    if (!relic) return
    drawHighlight(relic)
})

register(MouseEvent, (event) => {
    if (!relic || !config.blockRelicClicks) return
    const btn = event.button
    const btnState = event.buttonstate

    if ((btn !== 0 && btn !== 1) || !btnState) return

    const la = Player.lookingAt()

    if (!la || !(la instanceof Block)) return

    const [x, y, z] = [la.getX(), la.getY(), la.getZ()];
    const blockClicked = World.getBlockAt(x, y, z).type.getRegistryName()
    if ((blockClicked != 'minecraft:cauldron' && blockClicked != 'minecraft:anvil') || (!Player.getHeldItem()?.getName()?.includes('Relic') && !Player.getHeldItem()?.getName()?.includes('SkyBlock Menu'))) return

    if (!checkCauldron(relic, x, y, z)) {
        ChatLib.chat(`${config.customPrefix} &cWrong cauldron, silly!`)
        cancel(event)
    }
    
})

const rcListener = register('playerInteract', (action, pos) => {
    if (action.toString() != "RIGHT_CLICK_BLOCK") return
    const [x, y, z] = [pos.getX(), pos.getY(), pos.getZ()]

    if (!checkCauldron(relic, x, y, z)) return;
    if (Player.getHeldItemIndex() !== 8) return;

    relic = null;
    rcListener.unregister();
    lcListener.unregister();
}).unregister()

const lcListener = register('hitBlock', (block) => {
    const [x, y, z] = [block.x, block.y, block.z]

    if (!checkCauldron(relic, x, y, z)) return;
    if (Player.getHeldItemIndex() !== 8) return;

    relic = null;
    rcListener.unregister();
    lcListener.unregister();
}).unregister()

// returns T or F
function checkCauldron(relic, x, y, z) {
    if (relicCoords[relic][0] == x && (relicCoords[relic][1] == y || relicCoords[relic][1] == (y + 1)) && relicCoords[relic][2] == z) return true
    return false
}

function drawHighlight(relic) {
    const x = relicCoords[relic][0]
    const y = relicCoords[relic][1]
    const z = relicCoords[relic][2]
    const r = relicCoords[relic][3]
    const g = relicCoords[relic][4]
    const b = relicCoords[relic][5]

    let box = new AxisAlignedBB(x, y, z, x + 1, y + 1, z + 1);
    let color = new ColorUtils(javaColor.RGBtoHSB(r, g, b, null), 255 * 255);
    RenderUtils.INSTANCE.drawFilledAABB(box, color, false);
}

register(MouseEvent, (event) => {
    if (!config.blockSBMenu) return

    const btn = event.button
    const btnState = event.buttonstate

    if ((btn !== 0 && btn !== 1) || !btnState) return
    if (!isPlayerInBox(44, 65, 5, 8, 40, 50)) return

    if (Player.getHeldItemIndex() == 8) cancel(event)
    
})

register("worldLoad", () => {
    relic = null
})