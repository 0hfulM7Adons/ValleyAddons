import config from '../config'
import { registerWhen } from "../../BloomCore/utils/Utils"

let text = new Text('').setScale(2).setShadow(true).setAlign('CENTER').setColor(Renderer.YELLOW)
let startTime
let name
let action
let place
let timesPlayed = 0

register("chat", (n, a, p) => {
    if (!config.locationNotif) return
    name = n
    action = a
    place = p
    startTime = Date.now()
    timesPlayed = 0

    if (p.toLowerCase().includes("ss")) messagesSent.ss[0] = true
    if (p.toLowerCase().includes("ee2")) messagesSent.ee2[0] = true
    if (p.toLowerCase().includes("high ee2")) messagesSent.highee2[0] = true
    if (p.toLowerCase().includes("ee3")) messagesSent.ee3[0] = true
    if (p.toLowerCase().includes("core")) messagesSent.core[0] = true
    if (p.toLowerCase().includes("goldor tunnel")) messagesSent.tunnel[0] = true
    if (p.toLowerCase().includes("2 safespot")) messagesSent.safespot2[0] = true
    if (p.toLowerCase().includes("3 safespot")) messagesSent.safespot3[0] = true
}).setCriteria(/Party >.* (\w+): (At|Inside) (.+)/)

registerWhen(register("renderOverlay", () => {
    const remaining = (1500 - (Date.now() - startTime ?? 0))
    if (remaining < 0) return

    text.setString(`${name} is ${action} ${place}!`)
    text.draw(Renderer.screen.getWidth() / 2, Renderer.screen.getHeight() / 2 - 50)

    let timesToPlay = parseInt(config.locationNotifRepeatAmount)
    if (timesPlayed < timesToPlay) {
        World.playSound(config.locationSound, 2, 2)
        timesPlayed++
    }

}), () => config.locationNotif && startTime && name != Player.getName())

const inRange = (arr) => {
    let x = Player.getX()
    let y = Player.getY()
    let z = Player.getZ()
    if (x >= arr[1][0] && x <= arr[1][1]) {
        if (y >= arr[2][0] && y <= arr[2][1]) {
            if (z >= arr[3][0] && z <= arr[3][1]) {
                return true
            }
        }
    }
    return false
}

const inRadius = (arr) => {
    let x = Player.getX()
    let y = Player.getY()
    let z = Player.getZ()
    if (y >= arr[2][0] && y <= arr[2][1]) {
        let dist = Math.sqrt((x - arr[1]) ** 2 + (z - arr[3]) ** 2)
        if (dist < arr[4]) return true
    }
    return false
}

let messagesSent = {
    'ss': [true, [107, 110], [120, 121], [93, 95]],
    'ee2': [true, [57, 59], [109, 110], [130, 132]],
    'highee2': [true, [59, 62], [132, 133], [138, 140]],
    'ee3': [true, [1, 3], [109, 110], [103, 106]],
    'core': [true, [53, 56], [114, 115], [51, 54]],
    'tunnel': [true, [52, 57], [113, 115], [55, 58]],
    'safespot2': [true, [46, 49], [109, 109], [121.987, 121.988]],
    'safespot3': [true, [18, 19], [121, 126], [91, 99]]
}

register('chat', () => {
    messagesSent.ss[0] = false
}).setCriteria("[BOSS] Storm: I'd be happy to show you what that's like!")

register('chat', () => {
    messagesSent.ee2[0] = false
    messagesSent.highee2[0] = false
    messagesSent.ee3[0] = false
    messagesSent.core[0] = false
    messagesSent.tunnel[0] = false
    messagesSent.safespot2[0] = false
    messagesSent.safespot3[0] = false
}).setCriteria("[BOSS] Goldor: Who dares trespass into my domain?")

register('chat', () => {
    messagesSent.ee2[0] = true
    messagesSent.highee2[0] = true
    messagesSent.ee3[0] = true
    messagesSent.core[0] = true
    messagesSent.tunnel[0] = true
    messagesSent.safespot2[0] = true
    messagesSent.safespot3[0] = true
}).setCriteria("The Core entrance is opening!")

register('tick', () => {
    if (!messagesSent.ss[0] && config.ssCoord && inRange(messagesSent.ss)) {
        ChatLib.command('pc At SS!')
        messagesSent.ss[0] = true
        return
    }

    if (!messagesSent.ee2[0] && config.ee2Coord && inRange(messagesSent.ee2)) {
        ChatLib.command('pc At EE2!')
        messagesSent.ee2[0] = true
        return
    }

    if (!messagesSent.highee2[0] && config.ee2Coord && inRange(messagesSent.highee2)) {
        ChatLib.command('pc At High EE2!')
        messagesSent.highee2[0] = true
        return
    }

    if (!messagesSent.ee3[0] && config.ee3Coord && inRange(messagesSent.ee3)) {
        ChatLib.command('pc At EE3!')
        messagesSent.ee3[0] = true
        return
    }

    if (!messagesSent.core[0] && config.coreCoord && inRange(messagesSent.core)) {
        ChatLib.command('pc At Core!')
        messagesSent.core[0] = true
        return
    }

    if (!messagesSent.tunnel[0] && config.tunnelCoord && inRange(messagesSent.tunnel)) {
        ChatLib.command('pc Inside Goldor Tunnel!')
        messagesSent.tunnel[0] = true
        return
    }

    if (!messagesSent.safespot2[0] && config.safespot2Coord && inRange(messagesSent.safespot2)) {
        ChatLib.command('pc At 2 Safespot!')
        messagesSent.safespot2[0] = true
        return
    }

    if (!messagesSent.safespot3[0] && config.safespot3Coord && inRange(messagesSent.safespot3)) {
        ChatLib.command('pc At 3 Safespot!')
        messagesSent.safespot3[0] = true
        return
    }

})

register('worldLoad', () => {
    messagesSent = {
        'ss': [true, [107, 110], [120, 121], [93, 95]],
        'ee2': [true, [57, 59], [109, 110], [130, 132]],
        'highee2': [true, [59, 62], [132, 133], [138, 140]],
        'ee3': [true, [1, 3], [109, 110], [103, 106]],
        'core': [true, [53, 56], [114, 115], [51, 54]],
        'tunnel': [true, [52, 57], [113, 115], [55, 58]],
        'safespot2': [true, [46, 49], [109, 109], [121.987, 121.988]],
        'safespot3': [true, [18, 19], [121, 126], [91, 99]]
    }
})