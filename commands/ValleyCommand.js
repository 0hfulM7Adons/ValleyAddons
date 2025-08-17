import config from "../config"

export const valleyCommand = register("command", () => {
    return config.openGUI()
}).setName("valley")