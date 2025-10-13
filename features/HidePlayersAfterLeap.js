import config from "../config"
import { EntityPlayer } from "../util/util"

let inBoss = false

register("chat", () => {
    inBoss = true;
}).setCriteria("[BOSS] Maxor: WELL! WELL! WELL! LOOK WHO'S HERE!")

register("chat", () => {
    if (!config.hidePlayersAfterLeap) return
    if (config.onlyHideInBoss) {
        if (inBoss) {
            hidePlayers.register();
            setTimeout(() => {
                hidePlayers.unregister();
            }, 2000)
        }
    } else {
        hidePlayers.register();
        setTimeout(() => {
            hidePlayers.unregister();
        }, 2000)
    }
}).setCriteria(/You have teleported to .+/)

const hidePlayers = register("renderEntity", (entity, pos, pt, event) => {
    if (entity.getEntity() instanceof EntityPlayer) {
        let entityName = entity.getName()
        if (entityName !== Player.getName()){
            cancel(event)
        }
    }
}).unregister();

register("worldLoad", () => {
    hidePlayers.unregister();
})