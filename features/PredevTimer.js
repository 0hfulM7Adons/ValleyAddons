import config from "../config"
import { data } from "../util/data" 
import { getClass, getDistance } from "../util/util"

let enterBoss
let at3Dev = false
let counting = false

register("chat", () => {
    if (getClass() != "Healer" || !config.predevTimer) return
    enterBoss = Date.now()
    counting = true
}).setCriteria("[BOSS] Maxor: WELL! WELL! WELL! LOOK WHO'S HERE!")

register("tick", () => {
    if (getClass() != "Healer" || !config.predevTimer || !counting) return
    if (!at3Dev && getDistance(Player.getX(), Player.getZ(), 1, 77) <= 3) {
        at3Dev = true
        return
    }
})

register("chat", () => {
    if (getClass() != "Healer" || !config.predevTimer || !counting) return
    if (!at3Dev) {
        ChatLib.chat(`${config.customPrefix} &cPredev not completed.`)
    } else {
        const time = parseFloat(((Date.now() - enterBoss) / 1000).toFixed(2))
        let msg = `${config.customPrefix} &aPredev completed in &e${time}s&a.`
        if (time < data.predevTimer.pb) {
            data.predevTimer.pb = time
            data.save()
            msg += " &d&l(PB)"
        }
        new Message(new TextComponent(msg).setHover("show_text", `&dPersonal Best: &a${data.predevTimer.pb}s`)).chat()
        at3Dev = false
    }
    counting = false
}).setCriteria(/You have teleported to .+/)

register("worldLoad", () => {
    at3Dev = false
    counting = false
})