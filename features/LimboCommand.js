const spam = register("tick", () => {
    ChatLib.command(" ")
}).unregister()

register("command", () => {
    spam.register()
}).setName("limbo")

register("worldLoad", () => {
    spam.unregister()
})