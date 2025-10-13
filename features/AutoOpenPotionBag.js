import config from "../config"

let bagOpened = false

register("worldLoad", () => {
    bagOpened = false;
})

register("chat", () => {
    if (!config.autoOpenPotionBag) return
    if (!bagOpened) {
        ChatLib.chat(`${config.customPrefix} &aOpening potion bag.`);
        ChatLib.command("potionbag");
        bagOpened = true;
    }
}).setCriteria(/\w+ is now ready!/)