import config from "../config"

let rabbitFound
let isDupe
let dupeTxt
let perks

register("chat", (event) => {
    if (!config.compactHoppity) return
    cancel(event)
}).setCriteria(/^HOPPITY'S HUNT You found a Chocolate [^\s]+ Egg .+!/)

register("chat", (event) => {
    if (!config.compactHoppity) return
    let message = ChatLib.getChatMessage(event, true)
    rabbitFound = message.substring(21)
    cancel(event)
}).setCriteria(/.{4}HOPPITY'S HUNT You found .+ \(.{4}\w+\)!/)

register("chat", (dupe, perks, event) => {
    if (!config.compactHoppity) return
    let message = ChatLib.getChatMessage(event, true)
    isDupe = dupe == "DUPLICATE" ? true : false
    if (isDupe) {
        dupeTxt = message.substring(0, 23)
        perks = message.substring(24)
    }
    else {
        dupeTxt = message.substring(0, 17)
        perks = message.substring(18)
    }
    cancel(event)
    let compactMsg = `${dupeTxt} ${rabbitFound} ${perks}`
    ChatLib.chat(compactMsg)
}).setCriteria(/^(DUPLICATE|NEW) RABBIT! (.+)/)

register("chat", (event) => {
    if (!config.compactHoppity) return
    cancel(event)
}).setCriteria("HOPPITY'S HUNT You found a Hitman Egg!")