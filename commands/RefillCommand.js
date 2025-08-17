import config from "../config"

export const refillCommand = register("command", () => {

    const pearlStack = Player.getInventory().getItems().find(a => a?.getName() == "§fEnder Pearl");
    const jerryStack = Player.getInventory().getItems().find(a => a?.getName() == "§fInflatable Jerry");

    ChatLib.chat(`${config.customPrefix} &aRefilling Pearls and Jerries!`);

    let delay = 2000;

    if (!pearlStack) {
        ChatLib.command(`gfs ender_pearl 16`);
    } else {
        const toGive = 16 - pearlStack.getStackSize();
        if (toGive == 0) {
            delay = 0;
        } else {
            ChatLib.command(`gfs ender_pearl ${toGive}`);
        }
    }
    setTimeout(() => {
        if (!jerryStack) {
            ChatLib.command(`gfs inflatable_jerry 64`);
        } else {
            const toGive = 64 - jerryStack.getStackSize();
            ChatLib.command(`gfs inflatable_jerry ${toGive}`);
        }
    }, delay);

}).setName("refill").setAliases(["fillmevalley", "fmv"])

export const enderPearlCommand = register("command", () => {

    const pearlStack = Player.getInventory().getItems().find(a => a?.getName() == "§fEnder Pearl");

    if (!pearlStack) {
        ChatLib.chat(`${config.customPrefix} &aGetting Ender Pearls!`);
        return ChatLib.command(`gfs ender_pearl 16`);
    }

    const toGive = 16 - pearlStack.getStackSize();
    if (toGive == 0) {
        return ChatLib.chat(`${config.customPrefix} &cEnder Pearl Stack Full!`);
    }

    ChatLib.chat(`${config.customPrefix} &aGetting Ender Pearls!`);
    ChatLib.command(`gfs ender_pearl ${toGive}`);

}).setName("ep")

export const inflatableJerriesCommand = register("command", () => {

    const jerryStack = Player.getInventory().getItems().find(a => a?.getName() == "§fInflatable Jerry");

    if (!jerryStack) {
        ChatLib.chat(`${config.customPrefix} &aGetting Jerries!`);
        return ChatLib.command(`gfs inflatable_jerry 64`);
    }

    const toGive = 64 - jerryStack.getStackSize();
    if (toGive == 0) {
        return ChatLib.chat(`${config.customPrefix} &cJerry Stack Full!`);
    }

    ChatLib.chat(`${config.customPrefix} &aGetting Jerries!`);
    ChatLib.command(`gfs inflatable_jerry ${toGive}`);
    
}).setName("ij")