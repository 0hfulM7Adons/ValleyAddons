import config from "../config"

register("chat", () => {
    if (!config.pestSetSpawn) return
    ChatLib.command("setspawn")
}).setCriteria(/YUCK! \d ൠ Pest have spawned in Plot - .+!/)