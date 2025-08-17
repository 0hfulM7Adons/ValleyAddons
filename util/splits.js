const splitInfo = {
    F1: [
        {
            name: "&4Blood Open",
            start: /^\[NPC\] Mort: Here, I found this map when I first entered the dungeon.$/,
            end: /^\[BOSS\] The Watcher: Ah, you've finally arrived.$/
        },
        {
            name: "&cBlood Clear",
            end: /^\[BOSS\] The Watcher: You have proven yourself. You may pass.$/
        },
        {
            name: "&dPortal",
            end: /^\[BOSS\] Bonzo: Gratz for making it this far, but I'm basically unbeatable\.$/
        },
        {
            name: "&9Boss Entry",
            start: /^\[NPC\] Mort: Here, I found this map when I first entered the dungeon.$/,
            end: /^\[BOSS\] Bonzo: Gratz for making it this far, but I'm basically unbeatable\.$/
        },
        {
            name: "&cFirst Kill",
            end: /^\[BOSS\] Bonzo: Oh noes, you got me\.\. what ever will I do\?!$/
        },
        {
            name: "&cSecond Kill",
            end: /^\[BOSS\] Bonzo: Alright, maybe I'm just weak after all\.\.$/
        },
        {
            name: "&eEnd Dialogue"
        }
    ],
    F2: [
        {
            name: "&4Blood Open",
            start: /^\[NPC\] Mort: Here, I found this map when I first entered the dungeon.$/,
            end: /^\[BOSS\] The Watcher: Ah, we meet again...$/
        },
        {
            name: "&cBlood Clear",
            end: /^\[BOSS\] The Watcher: You have proven yourself. You may pass.$/
        },
        {
            name: "&dPortal",
            end: /^\[BOSS\] Scarf: This is where the journey ends for you, Adventurers\.$/
        },
        {
            name: "&9Boss Entry",
            start: /^\[NPC\] Mort: Here, I found this map when I first entered the dungeon.$/,
            end: /^\[BOSS\] Scarf: This is where the journey ends for you, Adventurers\.$/
        },
        {
            name: "&cUndeads",
            end: /^\[BOSS\] Scarf: Those toys are not strong enough I see\.$/
        },
        {
            name: "&bScarf"
        }
    ],
    F3: [
        {
            name: "&4Blood Open",
            start: /^\[NPC\] Mort: Here, I found this map when I first entered the dungeon.$/,
            end: /^\[BOSS\] The Watcher: So you made it this far... interesting.$/
        },
        {
            name: "&cBlood Clear",
            end: /^\[BOSS\] The Watcher: You have proven yourself. You may pass.$/
        },
        {
            name: "&dPortal",
            end: /^\[BOSS\] The Professor: I was burdened with terrible news recently\.\.\.$/
        },
        {
            name: "&9Boss Entry",
            start: /^\[NPC\] Mort: Here, I found this map when I first entered the dungeon.$/,
            end: /^\[BOSS\] The Professor: I was burdened with terrible news recently\.\.\.$/
        },
        {
            name: "&9Guardians",
            end: /^\[BOSS\] The Professor: Oh\? You found my Guardians' one weakness\?$/
        },
        {
            name: "&ePhase 1",
            end: /^\[BOSS\] The Professor: I see\. You have forced me to use my ultimate technique\.$/
        },
        {
            name: "&bPhase 2"
        }
    ],
    F4: [
        {
            name: "&4Blood Open",
            start: /^\[NPC\] Mort: Here, I found this map when I first entered the dungeon.$/,
            end: /^\[BOSS\] The Watcher: You've managed to scratch and claw your way here, eh\?$/
        },
        {
            name: "&cBlood Clear",
            end: /^\[BOSS\] The Watcher: You have proven yourself. You may pass.$/
        },
        {
            name: "&dPortal",
            end: /^\[BOSS\] Thorn: Welcome Adventurers! I am Thorn, the Spirit! And host of the Vegan Trials!$/
        },
        {
            name: "&9Boss Entry",
            start: /^\[NPC\] Mort: Here, I found this map when I first entered the dungeon.$/,
            end: /^\[BOSS\] Thorn: Welcome Adventurers! I am Thorn, the Spirit! And host of the Vegan Trials!$/
        },
        {
            name: "&eDialogue",
            end: /^\[BOSS\] Thorn: Dance! Dance with my Spirit animals! And may you perish in a delightful way!$/
        },
        {
            name: "&bThorn Kill"
        }
    ],
    F5: [
        {
            name: "&4Blood Open",
            start: /^\[NPC\] Mort: Here, I found this map when I first entered the dungeon.$/,
            end: /^\[BOSS\] The Watcher: I'm starting to get tired of seeing you around here...$/
        },
        {
            name: "&cBlood Clear",
            end: /^\[BOSS\] The Watcher: You have proven yourself. You may pass.$/
        },
        {
            name: "&dPortal",
            end: /^\[BOSS\] Livid: Welcome, you've arrived right on time\. I am Livid, the Master of Shadows\.$/
        },
        {
            name: "&9Boss Entry",
            start: /^\[NPC\] Mort: Here, I found this map when I first entered the dungeon.$/,
            end: /^\[BOSS\] Livid: Welcome, you've arrived right on time\. I am Livid, the Master of Shadows\.$/
        },
        {
            name: "&eStart Dialogue",
            end: /^\[BOSS\] Livid: I respect you for making it to here, but I'll be your undoing\.$/
        },
        {
            name: "&cLivid Kill",
            end: /^\[BOSS\] \w+ Livid: Impossible! How did you figure out which one I was\?!$/
        },
        {
            name: "&eEnd Dialogue"
        },
        {
            name: "&aBoss",
            start: /^\[BOSS\] Livid: Welcome, you've arrived right on time\. I am Livid, the Master of Shadows\.$/
        }
    ],
    F6: [
        {
            name: "&4Blood Open",
            start: /^\[NPC\] Mort: Here, I found this map when I first entered the dungeon.$/,
            end: /^\[BOSS\] The Watcher: Oh.. hello\?$/
        },
        {
            name: "&cBlood Clear",
            end: /^\[BOSS\] The Watcher: You have proven yourself. You may pass.$/
        },
        {
            name: "&dPortal",
            end: /^\[BOSS\] Sadan: So you made it all the way here\.\.\. Now you wish to defy me\? Sadan\?!$/
        },
        {
            name: "&9Boss Entry",
            start: /^\[NPC\] Mort: Here, I found this map when I first entered the dungeon.$/,
            end: /^\[BOSS\] Sadan: So you made it all the way here\.\.\. Now you wish to defy me\? Sadan\?!$/
        },
        {
            name: "&6Terracottas",
            end: /^\[BOSS\] Sadan: ENOUGH!$/
        },
        {
            name: "&dGiants",
            end: /^\[BOSS\] Sadan: You did it\. I understand now, you have earned my respect\.$/
        },
        {
            name: "&cSadan"
        }
    ],
    F7: [
        {
            name: "&4Blood Open",
            start: /^\[NPC\] Mort: Here, I found this map when I first entered the dungeon.$/,
            end: /^\[BOSS\] The Watcher: Things feel a little more roomy now, eh\?/
        },
        {
            name: "&cBlood Clear",
            end: /^\[BOSS\] The Watcher: You have proven yourself. You may pass.$/
        },
        {
            name: "&dPortal",
            end: /^\[BOSS\] Maxor: WELL! WELL! WELL! LOOK WHO'S HERE!$/
        },
        {
            name: "&9Boss Entry",
            start: /^\[NPC\] Mort: Here, I found this map when I first entered the dungeon.$/,
            end: /^\[BOSS\] Maxor: WELL! WELL! WELL! LOOK WHO'S HERE!$/
        },
        {
            name: "&5Maxor",
            end: /^\[BOSS\] Storm: Pathetic Maxor, just like expected\.$/
        },
        {
            name: "&3Storm",
            end: /^\[BOSS\] Goldor: Who dares trespass into my domain\?$/
        },
        {
            name: "&eTerminals",
            end: /^The Core entrance is opening!$/
        },
        {
            name: "&6Goldor",
            end: /^\[BOSS\] Necron: You went further than any human before, congratulations\.$/
        },
        {
            name: "&cNecron"
        }
    ],
    M7: [
        {
            name: "&4Blood Open",
            start: /^\[NPC\] Mort: Here, I found this map when I first entered the dungeon.$/,
            end: /^\[BOSS\] The Watcher: Things feel a little more roomy now, eh\?/
        },
        {
            name: "&cBlood Clear",
            end: /^\[BOSS\] The Watcher: You have proven yourself. You may pass.$/
        },
        {
            name: "&dPortal",
            end: /^\[BOSS\] Maxor: WELL! WELL! WELL! LOOK WHO'S HERE!$/
        },
        {
            name: "&9Boss Entry",
            start: /^\[NPC\] Mort: Here, I found this map when I first entered the dungeon.$/,
            end: /^\[BOSS\] Maxor: WELL! WELL! WELL! LOOK WHO'S HERE!$/
        },
        {
            name: "&5Maxor",
            end: /^\[BOSS\] Storm: Pathetic Maxor, just like expected\.$/
        },
        {
            name: "&3Storm",
            end: /^\[BOSS\] Goldor: Who dares trespass into my domain\?$/
        },
        {
            name: "&eTerminals",
            end: /^The Core entrance is opening!$/
        },
        {
            name: "&6Goldor",
            end: /^\[BOSS\] Necron: You went further than any human before, congratulations\.$/
        },
        {
            name: "&cNecron",
            end: /^\[BOSS\] Necron: All this, for nothing\.\.\.$/
        },
        {
            name: "&4Dragons"
        }
    ]
}

export default splitInfo