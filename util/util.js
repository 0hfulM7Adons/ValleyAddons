export const Zombie = Java.type("net.minecraft.entity.monster.EntityZombie")
export const Giant = Java.type("net.minecraft.entity.monster.EntityGiantZombie")
export const EnderCrystal = Java.type("net.minecraft.entity.item.EntityEnderCrystal")
export const EntityPlayer = Java.type("net.minecraft.entity.player.EntityPlayer")
export const EntityItem = Java.type("net.minecraft.entity.item.EntityItem")
export const ArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand")
export const MouseEvent = Java.type("net.minecraftforge.client.event.MouseEvent");

export const S32PacketConfirmTransaction = Java.type("net.minecraft.network.play.server.S32PacketConfirmTransaction")
export const C09PacketHeldItemChange = Java.type("net.minecraft.network.play.client.C09PacketHeldItemChange")
export const S2APacketParticles = Java.type("net.minecraft.network.play.server.S2APacketParticles")

export const RenderUtils = Java.type("me.odinmain.utils.render.RenderUtils");
export const ColorUtils = Java.type("me.odinmain.utils.render.Color");
export const AxisAlignedBB = Java.type("net.minecraft.util.AxisAlignedBB");
export const javaColor = Java.type("java.awt.Color")
export const Vec3 = Java.type("net.minecraft.util.Vec3")

export const START_MSG = "[NPC] Mort: Here, I found this map when I first entered the dungeon.";
export const skullOwner = ["4c95c9e0-bfdc-3d28-8103-292523e20c43", "43aab0f2-c709-370f-9035-2b4fe27b8a07", "14a579e7-d36c-3f5c-9c2b-1051d4691df3", "e67afce3-2a07-3cd1-b18d-9adc9ef7823f", "a596d89d-1d83-37a9-a4d1-e3c67e842635", "7e1cdb5f-a951-3913-bcb1-74cbd6221897", "cd56ef4f-6b7a-3c75-a165-b227e1dbc84f"];
export const bloodMessages = ["[BOSS] The Watcher: Ah, you've finally arrived.", "[BOSS] The Watcher: Ah, we meet again...", "[BOSS] The Watcher: So you made it this far... interesting.", "[BOSS] The Watcher: You've managed to scratch and claw your way here, eh?", "[BOSS] The Watcher: I'm starting to get tired of seeing you around here...", "[BOSS] The Watcher: Oh... hello?", "[BOSS] The Watcher: Things feel a little more roomy now, eh?"];
export const bossMessages = ["[BOSS] Bonzo: Gratz for making it this far, but I'm basically unbeatable.", "[BOSS] Scarf: This is where the journey ends for you, Adventurers.", "[BOSS] The Professor: I was burdened with terrible news recently...", "[BOSS] Thorn: Welcome Adventurers! I am Thorn, the Spirit! And host of the Vegan Trials!", "[BOSS] Livid: Welcome, you've arrived right on time. I am Livid, the Master of Shadows.", "[BOSS] Sadan: So you made it all the way here... Now you wish to defy me? Sadan?!", "[BOSS] Maxor: WELL! WELL! WELL! LOOK WHO'S HERE!"];
export const RUN_END_CRITERIA = /^\s*☠ Defeated (.+) in 0?([\dhms ]+?)\s*(\(NEW RECORD!\))?$/

export const removeUnicode = (string) => typeof(string) !== "string" ? "" : string.replace(/[^\u0000-\u007F]/g, "")

export function getDistance(x1, z1, x2, z2) {
    return Math.sqrt((x1 - x2) ** 2 + (z1 - z2) ** 2)
}

export function formatNumber(number) {
    let format = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    let ind = format.indexOf(".")
    if (ind > -1) return format.substring(0, ind)
    else return format
}

export function formatMinutes(num, showMins) {
    let mins = Math.floor(num / 60)
    if (showMins && mins >= 1) {
        let secs = num % 60
        return `${mins}m ${(Math.round(secs * 100) / 100).toFixed(2)}s`
    } else return `${(Math.round(num * 100) / 100).toFixed(2)}s`
}

export function getClass() {
    let index = TabList?.getNames()?.findIndex(line => line?.includes(Player.getName()))
    if (index == -1) return
    let match = TabList?.getNames()[index]?.removeFormatting()?.match(/.+ \((.+) .+\)/)
    if (!match) return "EMPTY"
    return match[1];
}

export function getClassByName(playerName) {
    let index = TabList?.getNames()?.findIndex(line => line?.toLowerCase()?.includes(playerName?.toLowerCase()));
    if (index == -1) return;
    
    let match = TabList?.getNames()[index]?.removeFormatting().match(/(?:\[\d+\]\s*)?(.+?) \((\w+)/);
    if (!match) return "EMPTY";
    
    return removeUnicode(match[2]).trim(); 
}

export function isPlayerInBox(x1, x2, y1, y2, z1, z2) {
    const x = Player.getX();
    const y = Player.getY();
    const z = Player.getZ();

    return (x >= Math.min(x1, x2) && x <= Math.max(x1, x2) &&
            y >= Math.min(y1, y2) && y <= Math.max(y1, y2) &&
            z >= Math.min(z1, z2) && z <= Math.max(z1, z2));
}

export const regions = {
    p1: [42, 105, 220, 230, 12, 84],
    p2: [20, 85, 163, 213, 0, 107],
    gpad: [20, 42, 170, 172, 0, 22],
    pillars: [33, 60, 165, 195, 31, 76],
    ppillar: [87, 114, 163, 172, 31, 76],
    ppad: [87, 127, 163, 172, 85, 107],
    ypad: [21, 52, 165, 177, 85, 107],
    s1: [89, 113, 106, 143, 30, 122],
    s2: [19, 111, 106, 143, 121, 145],
    s3: [-6, 20, 106, 143, 50, 143],
    s4: [-2, 89, 106, 143, 30, 51],
    drop: [36, 73, 58, 96, 95, 122],
    mid: [46, 63, 58, 96, 68, 85],
    p5: [14, 99, 5, 8, 52, 134]
}