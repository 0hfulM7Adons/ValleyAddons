import config from "../config"
import { START_MSG, regions, isPlayerInBox } from "../util/util"
import { data } from "../util/data"
import { registerWhen } from "../../BloomCore/utils/Utils"

let inPre4 = false
let inBoss = false
let inP3 = false
let bonzopop
let phoenixpop
let spiritpop
let phoenixEquipped = false
let bonzocd = 180

let text = new Text("").setScale(1).setShadow(true)

const lines = [
    `&aBonzo's Mask`,
    `&aSpirit Mask`,
    `&aPhoenix`
]

register("chat", () => {

    display.register();

}).setCriteria(START_MSG)

const phaseCheck = register("chat", (message) => {

    if (message === "[BOSS] Maxor: WELL! WELL! WELL! LOOK WHO'S HERE!") {
        inBoss = true;
    }

    if (message === "[BOSS] Goldor: Who dares trespass into my domain?") {
        inP3 = true;
        if (isPlayerInBox(...regions.s4)) inPre4 = true;
    }

    if (message === "The Core entrance is opening!") {
        inP3 = false;
    }

    if (/.+ completed a device! .+/.test(message)) {
        inPre4 = false;
    }

}).setCriteria("${message}")

const maskCheck = register("chat", (message) => {

    if (/^Your (?:\S+ )?Bonzo's Mask saved your life!$/.test(message)) {
        bonzopop = Date.now();
        getBonzoCd();
        if ((config.pre4Disable && inPre4) || !config.maskPhoenixMsg) return;
        ChatLib.command(`pc ${config.maskText}`);
    }

    if (message === "Your Phoenix Pet saved you from certain death!") {
        phoenixpop = Date.now();
        if ((config.pre4Disable && inPre4) || !config.maskPhoenixMsg) return;
        ChatLib.command(`pc ${config.phoneixText}`);
    }

    if (message === "Second Wind Activated! Your Spirit Mask saved your life!") {
        spiritpop = Date.now();
        if ((config.pre4Disable && inPre4) || !config.maskPhoenixMsg) return;
        ChatLib.command(`pc ${config.spiritText}`);
    }

}).setCriteria("${message}")

const petCheck = register("chat", (message) => {

    const AUTO_REGEX = /Autopet equipped your \[Lvl [0-9]+\] ([\D]+)( ✦)?! VIEW RULE/;
    const MANUAL_REGEX = /You summoned your (\D+)!/;

    const match1 = message.match(AUTO_REGEX);
    const match2 = message.match(MANUAL_REGEX);

    if (match1) {
        if (match1[1].includes("Phoenix")) phoenixEquipped = true;
        else phoenixEquipped = false;
    }

    if (match2) {
        if (match2[1].includes("Phoenix")) phoenixEquipped = true;
        else phoenixEquipped = false;
    }

}).setCriteria("${message}")

const display = register("renderOverlay", () => {

    if (!config.invincibilityDisplay) return;

    if (config.invincibilityDisplayMode == 1 && !inBoss) return
    if (config.invincibilityDisplayMode == 2 && !inP3) return
    if (bonzopop) {
        const bonzoRemaining = (bonzocd - (Date.now() - bonzopop ?? 0) / 1000).toFixed(2)
        if (bonzoRemaining <= 0) {
            bonzopop = null
        } else lines[0] = `&cBonzo's Mask &8(&7${bonzoRemaining}s&8)`
    } else { 
        if (Player.getInventory()?.getStackInSlot(39)?.getName()?.includes("Bonzo's")) lines[0] = `&eBonzo's Mask`
        else lines[0] = `&aBonzo's Mask`
    }
    if (spiritpop) {
        const spiritRemaining = (30 - (Date.now() - spiritpop ?? 0) / 1000).toFixed(2)
        if (spiritRemaining <= 0) {
            spiritpop = null
        } else lines[1] = `&cSpirit Mask &8(&7${spiritRemaining}s&8)`
    } else {
        if (Player.getInventory()?.getStackInSlot(39)?.getName()?.includes("Spirit")) lines[1] = `&eSpirit Mask`
        else lines[1] = `&aSpirit Mask`
    }
    if (phoenixpop) {
        const phoenixRemaining = (60 - (Date.now() - phoenixpop ?? 0) / 1000).toFixed(2)
        if (phoenixRemaining <= 0) {
            phoenixpop = null
        } else lines[2] = `&cPhoenix &8(&7${phoenixRemaining}s&8)`
    } else {
        if (phoenixEquipped) lines[2] = `&ePhoenix`
        else lines[2] = `&aPhoenix`
    }

    let msg = ""
    lines.forEach(l => {
        msg += `${l}\n`
    })

    text.setString(msg)
    text.setScale(data.invincibilityDisplay.scale)
    text.draw(data.invincibilityDisplay.x, data.invincibilityDisplay.y)

}).unregister()

function getBonzoCd() {
    if (!Player.getInventory()?.getStackInSlot(39)?.getName()?.includes("Bonzo's")) return
    let nbt = Player.getInventory()?.getStackInSlot(39)?.getNBT()?.toString()?.removeFormatting()
    const match = nbt.match(/Cooldown: (\d+)s/);
    if (match) {
        const cooldown = parseInt(match[1], 10);
        bonzocd = cooldown
    }
    return ChatLib.chat("cooldown not found")
}

registerWhen(register("renderOverlay", () => {
    text.setString(`&aBonzo's Mask\n&aSpirit Mask\n&aPhoenix`)
    text.setScale(data.invincibilityDisplay.scale)
    text.draw(data.invincibilityDisplay.x, data.invincibilityDisplay.y)
}), () => config.invincibilityDisplayGui.isOpen())

registerWhen(register("dragged", (dx, dy, x, y, bn) => {
    if (bn == 2) return
    data.invincibilityDisplay.x = x
    data.invincibilityDisplay.y = y
    data.save()
}), () => config.invincibilityDisplayGui.isOpen())

register("scrolled", (x, y, dir) => {
    if (!config.invincibilityDisplayGui.isOpen()) return
    if (dir == 1) data.invincibilityDisplay.scale += 0.05
    else data.invincibilityDisplay.scale -= 0.05
    data.save()
})

register("guiMouseClick", (x, y, bn) => {
    if (!config.invincibilityDisplayGui.isOpen() || bn != 2) return
    data.invincibilityDisplay.x = Renderer.screen.getWidth() / 2
    data.invincibilityDisplay.y = Renderer.screen.getHeight() / 2 + 10
    data.invincibilityDisplay.scale = 1
    data.save()
})

register("worldLoad", () => {
    inPre4 = false
    inBoss = false
    inP3 = false
    bonzopop = null
    spiritpop = null
    phoenixpop = null
    lines[0] = `&aBonzo's Mask`
    lines[1] = `&aSpirit Mask`
    lines[2] = `&aPhoenix`

    display.unregister();
})