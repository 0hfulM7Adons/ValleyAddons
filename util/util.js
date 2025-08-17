export const Zombie = Java.type("net.minecraft.entity.monster.EntityZombie")
export const Giant = Java.type("net.minecraft.entity.monster.EntityGiantZombie")
export const EnderCrystal = Java.type("net.minecraft.entity.item.EntityEnderCrystal")
export const EntityPlayer = Java.type("net.minecraft.entity.player.EntityPlayer")
export const EntityItem = Java.type("net.minecraft.entity.item.EntityItem")
export const ArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand")
export const MouseEvent = Java.type("net.minecraftforge.client.event.MouseEvent");

export const S32PacketConfirmTransaction = Java.type("net.minecraft.network.play.server.S32PacketConfirmTransaction")
export const C09PacketHeldItemChange = Java.type("net.minecraft.network.play.client.C09PacketHeldItemChange")

export const RenderUtils = Java.type("me.odinmain.utils.render.RenderUtils");
export const ColorUtils = Java.type("me.odinmain.utils.render.Color");
export const AxisAlignedBB = Java.type("net.minecraft.util.AxisAlignedBB");
export const javaColor = Java.type("java.awt.Color")
export const Vec3 = Java.type("net.minecraft.util.Vec3")

export const START_MSG = "[NPC] Mort: Here, I found this map when I first entered the dungeon.";

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