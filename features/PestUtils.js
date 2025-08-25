import config from "../config"

register("chat", () => {
    if (!config.pestSetSpawn) return
    ChatLib.command("setspawn")
}).setCriteria(/.+! \d ൠ Pest have spawned in Plot - .+!/)