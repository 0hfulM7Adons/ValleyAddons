import { data } from "./data"

const checkFirstInstall = () => {
    if (!data.firstInstall) return
    data.firstInstall = false
    data.save()
    
    const msgs = [
        "&aThank you for installing &5&lValley Addons&r&a!",
        "",
        "&aTo get started, run the &5/valley &acommand.",
        "&aCredits to Bloom, Azured, Soshimee, litdab, and eatplastic",
        "&afor inspiration/reference for some features"
    ]
    ChatLib.chat(`&f&m${ChatLib.getChatBreak(" ")}`)
    msgs.forEach(a => ChatLib.chat(ChatLib.getCenteredText(a)))
    ChatLib.chat(`&f&m${ChatLib.getChatBreak(" ")}`)
}

const firstInstallTrigger = register("tick", () => {
    checkFirstInstall()
    firstInstallTrigger.unregister()
})