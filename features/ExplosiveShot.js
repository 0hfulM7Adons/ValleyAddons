import { formatNumber } from "../util/util"
import config from "../config"

register("chat", (enemies, totalDamage) => {
    if (!config.exploShot) return
    let dmg = Number(totalDamage.replaceAll(",", ""))
    let unitdmg = formatNumber(dmg / enemies)
    ChatLib.chat(`${config.customPrefix} &aExplosive shot did &e${unitdmg} &adamage per enemy.`)
}).setCriteria(/Your Explosive Shot hit (\d+) enemies for ([\d,\.]+) damage./)