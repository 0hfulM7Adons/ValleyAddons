import config from "../config"

let lastCompleted = [0, 7]
let gateBlown = false
let phaseStarted = null
let sectionStarted = null

const newSection = () => {
    sectionStarted = Date.now()
    gateBlown = false
    lastCompleted = [0, 7]
}

register("chat", () => {
    if (!config.terminalTimestamps) return
    phaseStarted = Date.now()
    sectionStarted = Date.now()
}).setCriteria("[BOSS] Goldor: Who dares trespass into my domain?")

register("chat", (name, action, object, completed, total, event) => {
    if (!config.terminalTimestamps || !phaseStarted) return
    completed = parseInt(completed)
    total = parseInt(total)
    let timeSection = ((Date.now() - sectionStarted) / 1000).toFixed(2)
    let timePhase = ((Date.now() - phaseStarted) / 1000).toFixed(2)
    let message = ChatLib.getChatMessage(event, true)
    let formattedName = message.substring(0, name.length + 6)
    cancel(event)
    ChatLib.chat(`${formattedName} &a${action} ${object}! (&c${completed}&a/${total}) &8(&7${timeSection}s &8| &7${timePhase}s&8)`)
    if (completed < lastCompleted[0] || (completed == total && gateBlown)) return newSection()
    lastCompleted = [completed, total]
}).setCriteria(/(\w+) (activated|completed) (a terminal|a device|a lever)! \((\d)\/(\d)\)/)

register("chat", (event) => {
    if (!config.terminalTimestamps || !phaseStarted) return
    let timeSection = ((Date.now() - sectionStarted) / 1000).toFixed(2)
    let timePhase = ((Date.now() - phaseStarted) / 1000).toFixed(2)
    cancel(event)
    ChatLib.chat(`&aThe gate has been destroyed! &8(&7${timeSection}s &8| &7${timePhase}s&8)`)
    if (lastCompleted[0] == lastCompleted[1]) newSection()
    else gateBlown = true
}).setCriteria("The gate has been destroyed!")

register("chat", (event) => {
    if (!config.terminalTimestamps) return
    phaseStarted = null
    sectionStarted = null
}).setCriteria("The Core entrance is opening!")

register("worldLoad", () => {
    lastCompleted = [0, 7]
    gateBlown = false
    phaseStarted = null
    sectionStarted = null
})