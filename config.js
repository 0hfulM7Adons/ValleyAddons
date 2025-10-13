import {
    @ButtonProperty,
    @CheckboxProperty,
    Color,
    @ColorProperty,
    @PercentSliderProperty,
    @SelectorProperty,
    @SwitchProperty,
    @TextProperty,
    @Vigilant,
    @SliderProperty,
    @NumberProperty,
} from '../Vigilance/index';

@Vigilant("ValleyAddons", "§5Valley Addons",  {
    getCategoryComparator: () => (a, b) => {
        const categories = ['General', 'Auto Refill', 'Dungeons', 'Run Splits', 'Blood', 'Phase 1', 'Phase 2', 'Phase 3', 'Phase 5', 'Location Messages'];
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    },
    getSubcategoryComparator: () => (a, b) => {
        const subcategories = ['General', 'Picture on Screen', 'Rag Axe Display', 'Reaper Display', 'Pests', 'Pearls', 'Jerries', 'TNT', 'Decoys', 'Dungeon Warp Cooldown',
            'Dupe Class', 'Potion Bag', 'Item Highlight', 'Keys', 'Hide Players', 'Invincibility', 'Explo Shot', 'Colors', 'Br', 'Blood Camp', 'Crystal', 'Predev', 
            'Pad', 'Distance', 'Pillar Explode', 'Start Timer', 'Tick Timer', 'Timestamps', 'Melody', 'Leap Notification', 'Pre 4', 'Drag Prio', 'Relic Spawn Timer', 
            'Relics', 'Location Messages'
        ];
        return subcategories.indexOf(a.getValue()[0].attributesExt.subcategory) - subcategories.indexOf(b.getValue()[0].attributesExt.subcategory)
    }
})

class Settings {

    pictureOnScreenGui = new Gui()
    p3StartTimerGui = new Gui()
    goldorTickTimerGui = new Gui()
    dungeonWarpCooldownGui = new Gui()
    runSplitsGui = new Gui()
    campSplitsGui = new Gui()
    invincibilityDisplayGui = new Gui()
    ragDisplayGui = new Gui()
    reaperDisplayGui = new Gui()
    relicSpawnTimerGui = new Gui()
    dragonSpawnTimerGui = new Gui()
    crystalSpawnTimerGui = new Gui()
    padTickTimerGui = new Gui()
    pillarExplodeGui = new Gui()
    distanceToLedgeGui = new Gui()
    leapNotificationGui = new Gui()
    melodyWarningGui = new Gui()

    /*
    GENERAL
    */

    // General

    @TextProperty({
        name: "Custom Prefix",
        description: "Custom prefix for all chat messages\n&11 &22 &33 &44 &55 &66 &77 &88 &99 &00 &aa &bb &cc &dd &ee &ff\n&r&kk&r &ll&r &mm&r &nn&r &oo &rr",
        category: "General",
        subcategory: "General",
        placeholder: "&f[&5VLYADS&f]"
    })
    customPrefix = "&f[&5VLYADS&f]";

    @SwitchProperty({
        name: "Compact Hoppity's Messages",
        description: "Turns the three lines when you find an egg into one to make it easier if you got a new or a dupe",
        category: "General",
        subcategory: "General"
    })
    compactHoppity = false;

    @SwitchProperty({
        name: "Slayer Miniboss Alert",
        description: "Shows a notification when a slayer miniboss spawns",
        category: "General",
        subcategory: "General"
    })
    slayerMiniAlert = false;

    // Picture on Screen

    @SwitchProperty({
        name: "Picture on Screen",
        description: "Puts a picture on your screen\nName it [pictureOnScreen.png] and put it in the [Valley Addons/assets] folder",
        category: "General",
        subcategory: "Picture on Screen"
    })
    pictureOnScreen = false

    @ButtonProperty({
        name: "Move Picture on Screen",
        description: "Moves the picture on your screen",
        category: "General",
        subcategory: "Picture on Screen",
        placeholder: "Move"
    })
    MovePictureOnScreenGui() {
        this.pictureOnScreenGui.open()
    }

    // Rag Axe

    @SwitchProperty({
        name: "Rag Axe Display",
        description: "Shows time left on ragnarock axe ability",
        category: "General",
        subcategory: "Rag Axe Display"
    })
    ragDisplay = false;

    @ButtonProperty({
        name: "Move Rag Axe Display",
        description: "Scroll to change scale, middle click to reset",
        category: "General",
        subcategory: "Rag Axe Display",
        placeholder: "Move"
    })
    MoveRagDisplayGui() {
        this.ragDisplayGui.open()
    };

    // Pests

    @SwitchProperty({
        name: "Set Spawn",
        description: "Sets your spawn point in the garden when pests spawn",
        category: "General",
        subcategory: "Pests"
    })
    pestSetSpawn = false;

    /*
    AUTO REFILL
    */

    // Pearls

    @SwitchProperty({
        name: "Auto Refill Pearls",
        description: "Automatically refills your stack of ender pearls when you have less than a specific threshold",
        category: "Auto Refill",
        subcategory: "Pearls"
    })
    autoRefillPearls = false;

    @SliderProperty({
        name: "Auto Refill Pearls Threshold",
        description: "Refills pearls when stack size goes under this number",
        category: "Auto Refill",
        subcategory: "Pearls",
        min: 1,
        max: 16
    })
    autoRefillPearlsThreshold = 8;

    // Jerries

    @SwitchProperty({
        name: "Auto Refill Jerries",
        description: "Automatically refills your stack of inflatable jerries when you have less than a specific threshold",
        category: "Auto Refill",
        subcategory: "Jerries"
    })
    autoRefillJerries = false;

    @SliderProperty({
        name: "Auto Refill Jerries Threshold",
        description: "Refills jerries when stack size goes under this number",
        category: "Auto Refill",
        subcategory: "Jerries",
        min: 1,
        max: 64
    })
    autoRefillJerriesThreshold = 32;

    // TNT

    @SwitchProperty({
        name: "Auto Refill TNT",
        description: "Automatically refills your stack of superboom tnt when you have less than a specific threshold",
        category: "Auto Refill",
        subcategory: "TNT"
    })
    autoRefillTnt = false;

    @SliderProperty({
        name: "Auto Refill TNT Threshold",
        description: "Refills jerries when stack size goes under this number",
        category: "Auto Refill",
        subcategory: "TNT",
        min: 1,
        max: 64
    })
    autoRefillTntThreshold = 32;

    // Decoys

    @SwitchProperty({
        name: "Auto Refill Decoys",
        description: "Automatically refills your stack of decoys when you have less than a specific threshold",
        category: "Auto Refill",
        subcategory: "Decoys"
    })
    autoRefillDecoys = false;

    @SliderProperty({
        name: "Auto Refill Decoys Threshold",
        description: "Refills decoys when stack size goes under this number",
        category: "Auto Refill",
        subcategory: "Decoys",
        min: 1,
        max: 64
    })
    autoRefillDecoysThreshold = 32;

    /*
    DUNGEONS
    */

    // Keys

    @SwitchProperty({
        name: "Wither and Blood Key Alert",
        description: "Shows text on screen when wither and blood key are dropped",
        category: "Dungeons",
        subcategory: "Keys"
    })
    witherBloodKeys = false;

    // Dungeon Warp Cooldown

    @SwitchProperty({
        name: "Dungeon Warp Cooldown",
        description: "Shows time before you can go into the next dungeon",
        category: "Dungeons",
        subcategory: "Dungeon Warp Cooldown"
    })
    dungeonWarpCooldown = false;

    @ButtonProperty({
        name: "Move Dungeon Warp Cooldown",
        description: "Scroll to change scale, middle click to reset",
        category: "Dungeons",
        subcategory: "Dungeon Warp Cooldown",
        placeholder: "Move"
    })
    MoveDungeonWarpCooldownGui() {
        this.dungeonWarpCooldownGui.open()
    };

    // Explo Shot

    @SwitchProperty({
        name: "Explo Shot Message",
        description: "Shows explosive shot damage per enemy",
        category: "Dungeons",
        subcategory: "Explo Shot"
    })
    exploShot = false;

    // Dupe Class
    
    @SwitchProperty({
        name: "Duplicate Class Warning",
        description: "Shows a title and plays a sound if there is a duplicate class",
        category: "Dungeons",
        subcategory: "Dupe Class"
    })
    dupeClass = false

    @TextProperty({
        name: "Duplicate Class Warning Sound",
        description: "Sound used for Duplicate Class Warning",
        category: "Dungeons",
        subcategory: "Dupe Class",
        placeholder: "note.pling"
    })
    dupeClassSound = "note.pling"

    // Potion Bag

    @SwitchProperty({
        name: "Auto Open Potion Bag",
        description: "Opens the potion bag as soon as you load into the dungeon",
        category: "Dungeons",
        subcategory: "Potion Bag"
    })
    autoOpenPotionBag = false;

    // Item Highlight

    @SwitchProperty({
        name: "Dungeon Item Highlight",
        description: "Highlights item secrets and shows when you're in range",
        category: "Dungeons",
        subcategory: "Item Highlight"
    })
    itemHighlight = false;

    // Hide Players

    @SwitchProperty({
        name: "Hide Players After Leap",
        description: "Hides players after leaping",
        category: "Dungeons",
        subcategory: "Hide Players"
    })
    hidePlayersAfterLeap = false;

    @SwitchProperty({
        name: "Only Hide In Boss",
        description: "Only hides players after leap in boss",
        category: "Dungeons",
        subcategory: "Hide Players"
    })
    onlyHideInBoss = false;

    // Invincibility

    @SwitchProperty({
        name: "Bonzo, Phoenix, and Spirit Messages",
        description: "Announces when bonzo mask, phoenix pet, and spirit mask proc",
        category: "Dungeons",
        subcategory: "Invincibility"
    })
    maskPhoenixMsg = false;

    @TextProperty({
        name: "Bonzo Mask Text",
        description: "Text used for Bonzo Mask Message",
        category: "Dungeons",
        subcategory: "Invincibility",
        placeholder: "Bonzo's Mask Procced!"
    })
    maskText = "Bonzo's Mask Procced!";

    @TextProperty({
        name: "Phoenix Text",
        description: "Text used for Phoenix Message",
        category: "Dungeons",
        subcategory: "Invincibility",
        placeholder: "Phoenix Procced!"
    })
    phoenixText = "Phoenix Procced!"

    @TextProperty({
        name: "Spirit Mask Text",
        description: "Text used for Spirit Mask Message",
        category: "Dungeons",
        subcategory: "Invincibility",
        placeholder: "Spirit Mask Procced!"
    })
    spiritText = "Spirit Mask Procced!"

    @SwitchProperty({
        name: "Invincibility Display",
        description: "Shows the availability of invincibility items",
        category: "Dungeons",
        subcategory: "Invincibility",
    })
    invincibilityDisplay = false;

    @ButtonProperty({
        name: "Move Invincibility Display",
        description: "Scroll to change scale, middle click to reset",
        category: "Dungeons",
        subcategory: "Invincibility",
        placeholder: "Move"
    })
    MoveinvincibilityDisplayGui() {
        this.invincibilityDisplayGui.open()
    };

    @SelectorProperty({
        name: "Invincibility Display Mode",
        description: "Choose when to show the invincibility display",
        category: "Dungeons",
        subcategory: "Invincibility",
        options: [
            "Always",
            "Only in Boss",
            "Only in P3"
        ]
    })
    invincibilityDisplayMode = 0;

    @SwitchProperty({
        name: "Disable During Pre 4",
        description: "Does not send the bonzo, phoenix, and spirit messages if you are doing pre 4 as berserker",
        category: "Dungeons",
        subcategory: "Invincibility"
    })
    pre4Disable = false

    /*
    RUN SPLITS
    */

    // General

    @SwitchProperty({
        name: "Run Splits",
        description: "Shows run splits with real time and server time \nMajority credit to Bloom",
        category: "Run Splits",
        subcategory: "General"
    })
    runSplits = false;

    @SelectorProperty({
        name: "Run Splits Display Mode",
        description: "Changes if run splits shows server time or difference between real and server time",
        category: "Run Splits",
        subcategory: "General",
        options: [
            "Server Time",
            "Time Difference"
        ]
    })
    runSplitsMode = 0;

    @ButtonProperty({
        name: "Move Run Splits",
        description: "Scroll to change scale, middle click to reset",
        category: "Run Splits",
        subcategory: "General",
        placeholder: "Move"
    })
    MoveRunSplitsGui() {
        this.runSplitsGui.open()
    };

    // Colors

    @TextProperty({
        name: "Real Time Color (inactive)",
        category: "Run Splits",
        subcategory: "Colors",
        placeholder: "&a"
    })
    rti = "&a";

    @TextProperty({
        name: "Real Time Color (ongoing)",
        category: "Run Splits",
        subcategory: "Colors",
        placeholder: "&a"
    })
    rto = "&a";

    @TextProperty({
        name: "Real Time Color (complete)",
        category: "Run Splits",
        subcategory: "Colors",
        placeholder: "&a"
    })
    rtc = "&a";

    @TextProperty({
        name: "Server Time Color (inactive)",
        category: "Run Splits",
        subcategory: "Colors",
        placeholder: "&7"
    })
    sti = "&7";

    @TextProperty({
        name: "Server Time Color (ongoing)",
        category: "Run Splits",
        subcategory: "Colors",
        placeholder: "&7"
    })
    sto = "&7";

    @TextProperty({
        name: "Server Time Color (complete)",
        category: "Run Splits",
        subcategory: "Colors",
        placeholder: "&7"
    })
    stc = "&7";

    @TextProperty({
        name: "Parentheses Color (inactive)",
        category: "Run Splits",
        subcategory: "Colors",
        placeholder: "&8"
    })
    pi = "&8";

    @TextProperty({
        name: "Parentheses Color (ongoing)",
        category: "Run Splits",
        subcategory: "Colors",
        placeholder: "&8"
    })
    po = "&8";

    @TextProperty({
        name: "Parentheses Color (complete)",
        category: "Run Splits",
        subcategory: "Colors",
        placeholder: "&8"
    })
    pc = "&8";

    /*
    BLOOD
    */

    // Br

    @SwitchProperty({
        name: "Blood Rush Splits",
        description: "Tells you how long it took to clear each room on blood rush if you are archer or mage",
        category: "Blood",
        subcategory: "Br"
    })
    bloodRushSplits = false;

    @SwitchProperty({
        name: "Show On Every Class",
        description: "Shows Blood Rush Splits on every class instead of just Archer and Mage",
        category: "Blood",
        subcategory: "Br"
    })
    showOnEveryClass = false;

    // Blood Camp

    @SwitchProperty({
        name: "Blood Camp Helper",
        description: "Shows watcher move time and time to kill remaining blood mobs \nShows alert when watcher dialogue appears and if Diamante Giant is detected \nFixes SBE Blood Opened split when blood is entered before the door is opened",
        category: "Blood",
        subcategory: "Blood Camp"
    })
    bloodCampHelper = false

    @SwitchProperty({
        name: "Show On Every Class",
        description: "Shows blood camp information even if you aren't mage\nReccomended to keep this off unless you're doing comp runs or smth",
        category: "Blood",
        subcategory: "Blood Camp"
    })
    campAllClasses = false;

    @SwitchProperty({
        name: "Show Blood Camp Splits On Screen",
        description: "Shows watcher move timer and remaining mobs killed timer as you are blood camping",
        category: "Blood",
        subcategory: "Blood Camp"
    })
    campSplits = false

    @SwitchProperty({
        name: "Hide Splits in Boss",
        description: "Hides the blood camp splits when you enter boss",
        category: "Blood",
        subcategory: "Blood Camp"
    })
    hideCampSplitsInBoss = false

    @ButtonProperty({
        name: "Move Blood Camp Splits",
        description: "Scroll to change scale, middle click to reset",
        category: "Blood",
        subcategory: "Blood Camp",
        placeholder: "Move"
    })
    MoveCampSplitsGui() {
        this.campSplitsGui.open()
    };

    /*
    Phase 1
    */

    // Crystal

    @SwitchProperty({
        name: "Crystal Spawn Timer",
        description: "Shows when the second set of crystals will spawn",
        category: "Phase 1",
        subcategory: "Crystal"
    })
    crystalSpawnTimer = false;

    @ButtonProperty({
        name: "Move Crystal Spawn Timer",
        description: "Scroll to change scale, middle click to reset",
        category: "Phase 1",
        subcategory: "Crystal",
        placeholder: "Move"
    })
    MoveCrystalSpawnTimerGui() {
        this.crystalSpawnTimerGui.open()
    };

    @SwitchProperty({
        name: "Crystal Place Timer",
        description: "Times how long it took to place the crystal after picking it up",
        category: "Phase 1",
        subcategory: "Crystal"
    })
    crystalPlaceTimer = false;

    // Predev

    @SwitchProperty({
        name: "Predev Timer",
        description: "Tells you how long it took to complete predev",
        category: "Phase 1",
        subcategory: "Predev"
    })
    predevTimer = false;

    /*
    Phase 2
    */

    // Pad

    @SwitchProperty({
        name: "Pad Tick Timer",
        description: "Shows when the pad will cause the pillar to crush",
        category: "Phase 2",
        subcategory: "Pad"
    })
    padTickTimer = false;

    @SwitchProperty({
        name: "First Crush Death Time",
        description: "Sends the time storm gets enraged after the first crush",
        category: "Phase 2",
        subcategory: "Pad"
    })
    stormDeathTime = false;

    @ButtonProperty({
        name: "Move Pad Tick Timer",
        description: "Scroll to change scale, middle click to reset",
        category: "Phase 2",
        subcategory: "Pad",
        placeholder: "Move"
    })
    MovePadTickTimerGui() {
        this.padTickTimerGui.open()
    };

    // Distance

    @SwitchProperty({
        name: "Show Distance to Ledge",
        description: "Shows how far you are from the ledge at yellow pillar so you don't fall off",
        category: "Phase 2",
        subcategory: "Distance"
    })
    distanceToLedge = false;

    @ButtonProperty({
        name: "Move Distance to Ledge",
        description: "Scroll to change scale, middle click to reset",
        category: "Phase 2",
        subcategory: "Distance",
        placeholder: "Move"
    })
    MoveDistanceToLedgeGui() {
        this.distanceToLedgeGui.open()
    };

    // Pillar Explode

    @SwitchProperty({
        name: "Pillar Explode Timer",
        description: "Shows when the pillar will explode after Storm is crushed",
        category: "Phase 2",
        subcategory: "Pillar Explode"
    })
    pillarExplode = false;

    @ButtonProperty({
        name: "Move Pillar Explode Timer",
        description: "Scroll to change scale, middle click to reset",
        category: "Phase 2",
        subcategory: "Pillar Explode",
        placeholder: "Move"
    })
    MovePillarExplodeTimerGui() {
        this.pillarExplodeGui.open()
    };

    /*
    Phase 3
    */

    // Start Timer

    @SwitchProperty({
        name: "P3 Start Timer",
        description: "Shows time until P3 starts from when Storm dies",
        category: "Phase 3",
        subcategory: "Start Timer"
    })
    p3StartTimer = false;

    @ButtonProperty({
        name: "Move P3 Start Timer",
        description: "Scroll to change scale, middle click to reset",
        category: "Phase 3",
        subcategory: "Start Timer",
        placeholder: "Move"
    })
    MoveP3StartTimerGui() {
        this.p3StartTimerGui.open()
    };

    // Timestamps

    @SwitchProperty({
        name: "Terminal Timestamps",
        description: "Shows what time each terminal, device, or lever was completed",
        category: "Phase 3",
        subcategory: "Timestamps"
    })
    terminalTimestamps = false;

    // Melody

    @SwitchProperty({
        name: "Melody Warning",
        description: "Shows the progress of whoever has melody on your screen",
        category: "Phase 3",
        subcategory: "Melody"
    })
    melodyWarning = false;

    @SwitchProperty({
        name: "Show class instead of name",
        description: "Shows the class in bold text instead of the player's name",
        category: "Phase 3",
        subcategory: "Melody"
    })
    melodyClass = false;

    @ButtonProperty({
        name: "Move Melody Warning",
        description: "Scroll to change scale, middle click to reset",
        category: "Phase 3",
        subcategory: "Melody",
        placeholder: "Move"
    })
    MoveMelodyWarningGui() {
        this.melodyWarningGui.open()
    };

    // Tick Timer

    @SwitchProperty({
        name: "Goldor Tick Timer",
        description: "Shows a timer for Goldor death ticks",
        category: "Phase 3",
        subcategory: "Tick Timer"
    })
    goldorTickTimer = false;

    @SwitchProperty({
        name: "Show Total Term Time",
        description: "Shows the terminal time counting up instead of counting down from 3 seconds",
        category: "Phase 3",
        subcategory: "Tick Timer"
    })
    totalTermTime = false;

    @ButtonProperty({
        name: "Move Goldor Tick Timer",
        description: "Scroll to change scale, middle click to reset",
        category: "Phase 3",
        subcategory: "Tick Timer",
        placeholder: "Move"
    })
    MoveGoldorTickTimerGui() {
        this.goldorTickTimerGui.open()
    };

    // Leap Notification

    @SwitchProperty({
        name: "Leap Notification",
        description: "Shows when all players have leaped to you on pre enters",
        category: "Phase 3",
        subcategory: "Leap Notification"
    })
    leapNotification = false;

    @ButtonProperty({
        name: "Move Leap Notification",
        description: "Scroll to change scale, middle click to reset",
        category: "Phase 3",
        subcategory: "Leap Notification",
        placeholder: "Move"
    })
    MoveLeapNotificationGui() {
        this.leapNotificationGui.open()
    };

    // Pre 4

    @SwitchProperty({
        name: "Pre 4 Notifier",
        description: "Shows a title and plays a sound when pre 4 is completed",
        category: "Phase 3",
        subcategory: "Pre 4"
    })
    pre4Notifier = false;

    @TextProperty({
        name: "Pre 4 Notifier Sound",
        description: "Sound used for Pre 4 Notifier",
        category: "Phase 3",
        subcategory: "Pre 4",
        placeholder: "note.harp"
    })
    pre4NotifierSound = "note.harp";

    /*
    Phase 5
    */

    // Drag Prio

    @SwitchProperty({
        name: "Dragon Spawn Timer",
        description: "Dragon spawn timer that syncs with server lag",
        category: "Phase 5",
        subcategory: "Drag Prio"
    })
    dragonSpawnTimer = false;
    
    @ButtonProperty({
        name: "Move Dragon Spawn Timer",
        description: "Scroll to change scale, middle click to reset",
        category: "Phase 5",
        subcategory: "Drag Prio",
        placeholder: "Move"
    })
    MoveDragonSpawnTimerGui() {
        this.dragonSpawnTimerGui.open()
    };

    @SelectorProperty({
        name: "Healer Debuff Team",
        description: "Changes whether dragon spawn timer shows arch or bers dragon if you are healer",
        category: "Phase 5",
        subcategory: "Drag Prio",
        options: [
            "Arch Team",
            "Bers Team"
        ]
    })
    healerTeam = 0;

    // Relic Spawn Timer

    @SwitchProperty({
        name: "Relic Spawn Timer",
        description: "Shows time until relics spawn, NOT accurate with server lag",
        category: "Phase 5",
        subcategory: "Relic Spawn Timer"
    })
    relicSpawnTimer = false;

    @TextProperty({
        name: "Relic Spawn Timer Amount",
        description: "Since relic spawn is so rng, choose your own time... \nDefault is 42",
        category: "Phase 5",
        subcategory: "Relic Spawn Timer",
        placeholder: "42"
    })
    relicSpawnTimerAmt = "42"

    @SwitchProperty({
        name: "Relic Spawn Timer Progress Bar",
        description: "Shows a progress bar until relic spawns instead of a number",
        category: "Phase 5",
        subcategory: "Relic Spawn Timer",
    })
    relicProgressBar = false;

    @ButtonProperty({
        name: "Move Relic Spawn Timer",
        description: "Scroll to change scale, middle click to reset",
        category: "Phase 5",
        subcategory: "Relic Spawn Timer",
        placeholder: "Move"
    })
    MoveRelicSpawnTimerGui() {
        this.relicSpawnTimerGui.open()
    };

    // Relics

    @SwitchProperty({
        name: "Relic Timer",
        description: "Shows time it took to place your relic",
        category: "Phase 5",
        subcategory: "Relics"
    })
    relicTimer = false;

    @SwitchProperty({
        name: "Show Relic Pick Up Time",
        description: "Calculates how long it took to pick up the relic after it spawned",
        category: "Phase 5",
        subcategory: "Relics"
    })
    relicPickupTime = false;

    @SwitchProperty({
        name: "Show Every Relic",
        description: "Shows relic time for all five relics (might clog chat)",
        category: "Phase 5",
        subcategory: "Relics"
    })
    showEveryRelic = false

    @SwitchProperty({
        name: "Block Wrong Relic Clicks",
        description: "Prevents you from placing your relic in the wrong cauldron and dying",
        category: "Phase 5",
        subcategory: "Relics"
    })
    blockRelicClicks = false;

    @SwitchProperty({
        name: "Highlight Correct Cauldron",
        description: "Highlights the corresponding cauldron to the relic you picked up",
        category: "Phase 5",
        subcategory: "Relics"
    })
    highlightCauldron = false;

    @SwitchProperty({
        name: "Show Highlight Through Blocks",
        description: "Shows the correct relic cauldron through blocks",
        category: "Phase 5",
        subcategory: "Relics"
    })
    cauldronPhase = false;

    /*
    Location Messages
    */

    // General

    @SwitchProperty({
        name: "Location Notifications",
        description: "Shows a title and plays a sound when a party member sends a location message \nCredit to litdab (posmsg)",
        category: "Location Messages",
        subcategory: "General"
    })
    locationNotif = false;

    @TextProperty({
        name: "Location Notification Sound",
        description: "Sound used for Location Notification Sound",
        category: "Location Messages",
        subcategory: "General",
        placeholder: "note.harp"
    })
    locationSound = "note.harp";

    @TextProperty({
        name: "Location Notification Sound Times to Play",
        description: "Choose how many times the location notification sound plays",
        category: "Location Messages",
        subcategory: "General",
        placeholder: "1"
    })
    locationNotifRepeatAmount = "1";

    // Location Messages

    @SwitchProperty({
        name: "SS Nearby Message",
        category: "Location Messages",
        subcategory: "Location Messages"
    })
    ssCoord = false;

    @SwitchProperty({
        name: "Pre Enter 2 Nearby Message",
        category: "Location Messages",
        subcategory: "Location Messages"
    })
    ee2Coord = false;

    @SwitchProperty({
        name: "Pre Enter 3 Nearby Message",
        category: "Location Messages",
        subcategory: "Location Messages"
    })
    ee3Coord = false;
    
    @SwitchProperty({
        name: "At Core Message",
        category: "Location Messages",
        subcategory: "Location Messages"
    })
    coreCoord = false;

    @SwitchProperty({
        name: "Inside Tunnel Message",
        category: "Location Messages",
        subcategory: "Location Messages"
    })
    tunnelCoord = false;

    @SwitchProperty({
        name: "At 2 Safespot Message",
        category: "Location Messages",
        subcategory: "Location Messages"
    })
    safespot2Coord = false;

    @SwitchProperty({
        name: "At 3 Safespot Message",
        category: "Location Messages",
        subcategory: "Location Messages"
    })
    safespot3Coord = false;

    constructor() {

        this.initialize(this);
        
        const lines1 = [
            "",
            "&4Don't type in the search bar because vigilance is trash",
            "",
            "&7/ep - fills your stack of ender pearls",
            "&7/ij - fills your stack of inflatable jerries",
            "&7/refill - refills both ender pearls and inflatable jerries",
            "&7/rotate &d[pitch] [yaw]&7 - rotates you to specified pitch and yaw",
            "&7/sound &d[sound] <volume> <pitch>&7 - plays &d[sound]&7 with &d<volume>&7 and &d<pitch>",
            "&7/valleypbs - shows all of your personal bests",
            "",
            "&4NOTE: A LOT of the features do not work without Mort and Boss messages. Make sure to not have them disabled.",
            ""
        ]

        const lines2 = [
            "",
            "To customize the color of the times on the splits, put in the minecraft color code",
            "To customize the color of the names of the splits (Maxor, Storm, etc.), you have to go to util/splits.js",
            "&11 &22 &33 &44 &55 &66 &77 &88 &99 &00 &aa &bb &cc &dd &ee &ff\n&r&kk&r &ll&r &mm&r &nn&r &oo &rr",
            ""
        ]

        const commands = lines1.join("\n")
        const splitsInfo = lines2.join("\n")

        this.setCategoryDescription("General", commands)
        this.setCategoryDescription("Run Splits", splitsInfo)

    }
}

export default new Settings()