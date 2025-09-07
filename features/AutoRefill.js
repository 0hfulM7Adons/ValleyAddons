import config from "../config"

register("step", () => {
    if (!config.autoRefillPearls) return
    const pearlStack = Player.getInventory()?.getItems()?.find(a => a?.getName() == "§fEnder Pearl")

    if (pearlStack) {
        let stackSize = pearlStack.getStackSize()
        if (stackSize < config.autoRefillPearlsThreshold) {
            const toGive = 16 - stackSize
            ChatLib.chat(`${config.customPrefix} &aGetting Ender Pearls!`)
            ChatLib.command(`gfs ender_pearl ${toGive}`, false)
        }
    }
}).setDelay(4)

register("step", () => {
    if (!config.autoRefillJerries) return
    const jerryStack = Player.getInventory()?.getItems()?.find(a => a?.getName() == "§fInflatable Jerry")

    if (jerryStack) {
        let stackSize = jerryStack.getStackSize()
        if (stackSize < config.autoRefillJerriesThreshold) {
            const toGive = 64 - stackSize
            setTimeout(() => {
                ChatLib.chat(`${config.customPrefix} &aGetting Jerries!`)
                ChatLib.command(`gfs inflatable_jerry ${toGive}`, false)
            }, 1000)
        }
    }
}).setDelay(4)

register("step", () => {
    if (!config.autoRefillTnt) return
    const tntStack = Player.getInventory()?.getItems()?.find(a => a?.getName() == "§9Superboom TNT")

    if (tntStack) {
        let stackSize = tntStack.getStackSize()
        if (stackSize < config.autoRefillTntThreshold) {
            const toGive = 64 - stackSize
            setTimeout(() => {
                ChatLib.chat(`${config.customPrefix} &aGetting TNT!`)
                ChatLib.command(`gfs superboom_tnt ${toGive}`, false)
            }, 2000)
        }
    }
}).setDelay(4)

register("step", () => {
    if (!config.autoRefillDecoys) return
    const decoyStack = Player.getInventory()?.getItems()?.find(a => a?.getName() == "§aDecoy")

    if (decoyStack) {
        let stackSize = decoyStack.getStackSize()
        if (stackSize < config.autoRefillDecoysThreshold) {
            const toGive = 64 - stackSize
            setTimeout(() => {
                ChatLib.chat(`${config.customPrefix} &aGetting Decoys!`)
                ChatLib.command(`gfs decoy ${toGive}`, false)
            }, 3000)
        }
    }
}).setDelay(4)