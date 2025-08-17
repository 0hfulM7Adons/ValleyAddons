import config from "../config"

export const sound = register("command", (...args) => {

    if (!args) {
        ChatLib.chat(`${config.customPrefix} &cPlease provide a sound name: /sound [sound] <volume> <pitch>`)
    } else if (args.length == 1) {
        World.playSound(args[0], 1, 1)
    } else if (args.length == 2) {
        World.playSound(args[0], args[1], 1)
    } else {
        World.playSound(args[0], args[1], args[2])
    }
    
}).setName("sound")