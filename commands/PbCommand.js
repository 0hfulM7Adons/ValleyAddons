import config from "../config"
import { data } from "../util/data"

export const pb = register("command", () => {

    let lines = [
        ` `,
        `${config.customPrefix} &d&lPersonal Bests:`,
        `&aPredev: &e${data.predevTimer.pb}s`,
        `&aPurple Relic: &e${data.relicTimer.Purple}s`,
        `&aBlue Relic: &e${data.relicTimer.Blue}s`,
        `&aRed Relic: &e${data.relicTimer.Red}s`,
        `&aGreen Relic: &e${data.relicTimer.Green}s`,
        `&aOrange Relic: &e${data.relicTimer.Orange}s`,
        `&aCrystal Place: &e${data.crystalPlaceTimer.pb}s`,
        `&aKuudra: &e${data.kuudraPB.pb}s`,
        ` `
    ]

    lines.forEach(line => {
        ChatLib.chat(line)
    })
    
}).setName("valleypbs")