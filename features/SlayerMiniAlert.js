import config from "../config"

let text = new Text("&cMiniboss").setScale(3).setShadow(true)

register("chat", (mini) => {
    if (!config.slayerMiniAlert) return
    text.setString(`&c${mini}`)
    notification.register()
    setTimeout(() => {
        notification.unregister()
    }, 1000)
}).setCriteria(/SLAYER MINI-BOSS ([\D]+) has spawned!/)

const notification = register("renderOverlay", () => {
    text.draw((Renderer.screen.getWidth() - text.getWidth()) / 2, (Renderer.screen.getHeight() - text.getHeight()) / 2 - 50)
}).unregister()