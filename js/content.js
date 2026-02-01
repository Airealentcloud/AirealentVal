/* ===== ALL CONTENT & VARIATIONS ===== */
const Content = {
    // Chase messages when trying to click No
    chaseMessages: {
        en: [
            "You can't say no to love!",
            "Love always wins!",
            "Nice try!",
            "I'm faster than you think \u{1F60F}",
            "Just say YES!",
            "Even your finger knows YES is the answer!",
            "Your heart says YES, listen to it!",
            "{sender} is watching \u{1F440}",
            "You're only making it harder for yourself!",
            "The universe says YES!",
            "Stop running from love \u{1F602}",
            "You know you want to say YES!"
        ],
        pid: [
            "You no fit say No o!",
            "Love go win!",
            "See as you dey try \u{1F602}",
            "Your heart don talk \u2014 na YES!",
            "I fast pass you \u{1F60F}",
            "Just talk YES abeg!",
            "{sender} dey watch you \u{1F440}",
            "Na wa for you o!",
            "Stop to dey run from love!",
            "Even your finger sabi say na YES!"
        ]
    },

    // Messages when No button disappears
    noDisappearMessages: {
        en: [
            "You can't run from love! \u{1F60F}",
            "The universe has spoken \u2014 it's YES! \u{1F495}",
            "See? You two are destined!",
            "Your finger knows better than to reject {sender} \u{1F602}"
        ],
        pid: [
            "You no fit run from love! \u{1F60F}",
            "Universe don talk \u2014 na YES! \u{1F495}",
            "You see am? Na destiny! \u{1F602}",
            "Even your finger wise pass you \u{1F602}"
        ]
    },

    // YES response variations - Male to Female
    m2f: {
        en: [
            {
                lines: [
                    { text: "She said YES! \u{1F389}", style: "heading" },
                    { text: "{val} agreed to be {sender}'s Val!", style: "normal" },
                    { text: "Now {val}... {sender} has a small request...", style: "normal" },
                    { text: "Buy me a house \u{1F3E0}", style: "demand" },
                    { text: "If house is too much, buy me land. I don't want iPhone \u{1F624}", style: "demand" }
                ]
            },
            {
                lines: [
                    { text: "Awwn my baby \u{1F970}", style: "heading" },
                    { text: "{val}, now let's plan our future...", style: "normal" },
                    { text: "{sender} is not asking for much. Just your love...", style: "normal" },
                    { text: "...and a plot of land in Abuja \u{1F60F}", style: "demand" },
                    { text: "Follow The AI-Powered Realtor to start planning \u{1F495}", style: "normal" }
                ]
            },
            {
                lines: [
                    { text: "YES! Perfect Match! \u{1F495}", style: "heading" },
                    { text: "Other guys are asking for iPhone, PS5, designer...", style: "normal" },
                    { text: "{sender}? He just wants to own property with you \u{1F3E0}", style: "normal" },
                    { text: "A man with vision \u{1F440}", style: "demand" },
                    { text: "Follow us and let's make it happen", style: "normal" }
                ]
            },
            {
                lines: [
                    { text: "{val} said YES to {sender}! \u{1F389}", style: "heading" },
                    { text: "This Valentine, {sender} doesn't want:", style: "normal" },
                    { text: "\u274C Perfume", style: "crossed" },
                    { text: "\u274C Sneakers", style: "crossed" },
                    { text: "\u274C PlayStation", style: "crossed" },
                    { text: "\u2705 Just LAND. Abuja land. It appreciates like his love for you \u{1F4C8}", style: "check" }
                ]
            }
        ],
        pid: [
            {
                lines: [
                    { text: "E don happen! \u{1F389}", style: "heading" },
                    { text: "{val} don gree be {sender} Val!", style: "normal" },
                    { text: "Now... buy me house o \u{1F3E0}", style: "demand" },
                    { text: "If house too cost, land dey!", style: "demand" },
                    { text: "I no wan iPhone abeg \u{1F624}", style: "demand" }
                ]
            },
            {
                lines: [
                    { text: "Awwn baby mi! \u{1F970}", style: "heading" },
                    { text: "{val}, make we plan our future...", style: "normal" },
                    { text: "{sender} no dey ask for plenty. Just your love...", style: "normal" },
                    { text: "...and plot of land for Abuja \u{1F60F}", style: "demand" }
                ]
            }
        ]
    },

    // YES response variations - Female to Male
    f2m: {
        en: [
            {
                lines: [
                    { text: "He said YES! \u{1F389}", style: "heading" },
                    { text: "{val} agreed to be {sender}'s Val!", style: "normal" },
                    { text: "Good boy \u{1F60C}", style: "normal" },
                    { text: "Now... buy me a house \u{1F3E0}", style: "demand" },
                    { text: "If house is too much, buy me land. I don't want iPhone \u{1F624}", style: "demand" },
                    { text: "Follow this page so you know where to buy \u{1F447}", style: "normal" }
                ]
            },
            {
                lines: [
                    { text: "Correct answer! \u{1F495}", style: "heading" },
                    { text: "{val}, this Valentine, {sender} doesn't want:", style: "normal" },
                    { text: "\u274C Flowers (they die)", style: "crossed" },
                    { text: "\u274C Chocolate (she'll eat and forget)", style: "crossed" },
                    { text: "\u274C iPhone (it depreciates)", style: "crossed" },
                    { text: "\u2705 LAND. Land appreciates. Like her love for you \u{1F60F}", style: "check" },
                    { text: "Follow The AI-Powered Realtor \u{1F447}", style: "normal" }
                ]
            },
            {
                lines: [
                    { text: "Smart man! \u{1F970}", style: "heading" },
                    { text: "{val}, let {sender} show you what she really wants...", style: "normal" },
                    { text: "A house in Maitama? Too much?", style: "normal" },
                    { text: "Okay, Gwarinpa? Still too much?", style: "normal" },
                    { text: "Fine. Just follow this page and start saving \u{1F602}\u{1F3E0}", style: "demand" }
                ]
            },
            {
                lines: [
                    { text: "YES! Finally! \u{1F495}", style: "heading" },
                    { text: "{val}, {sender}'s friends' boyfriends are buying bags and shoes...", style: "normal" },
                    { text: "But {sender}? She has sense. She wants PROPERTY \u{1F3E0}", style: "demand" },
                    { text: "Abuja land today, mansion tomorrow \u{1F4C8}", style: "normal" },
                    { text: "Follow and start planning \u{1F447}", style: "normal" }
                ]
            },
            {
                lines: [
                    { text: "He said YES! \u{1F389}", style: "heading" },
                    { text: "{sender} told us to tell you...", style: "normal" },
                    { text: "Babe, my love language is Acts of Service...", style: "normal" },
                    { text: "...specifically, the act of buying me land in Abuja \u{1F624}\u{1F3E0}", style: "demand" },
                    { text: "Follow The AI-Powered Realtor", style: "normal" }
                ]
            }
        ],
        pid: [
            {
                lines: [
                    { text: "E don happen! \u{1F389}", style: "heading" },
                    { text: "{val} don gree! Good boy \u{1F60C}", style: "normal" },
                    { text: "Now... buy me house o \u{1F3E0}", style: "demand" },
                    { text: "If house too cost, land dey!", style: "demand" },
                    { text: "Follow this page make you sabi where to buy \u{1F447}", style: "normal" }
                ]
            },
            {
                lines: [
                    { text: "Correct answer! \u{1F495}", style: "heading" },
                    { text: "{val}, {sender} no wan flower wey go die...", style: "normal" },
                    { text: "She wan LAND. Land dey appreciate like her love \u{1F60F}", style: "demand" }
                ]
            }
        ]
    },

    // Random demand prefixes
    demandPrefixes: {
        en: [
            "According to {sender}'s calculations...",
            "Based on your love level...",
            "If you truly love {sender}...",
            "To prove you're serious...",
            "{sender}'s mother said to ask for...",
            "The way economy is going...",
            "Before 2025 ends...",
            "As a serious partner...",
            "Since you said YES..."
        ],
        pid: [
            "According to {sender} calculation...",
            "Based on your love level...",
            "If you truly love {sender}...",
            "{sender} mama say make I ask for...",
            "The way economy dey go...",
            "Since you don talk YES..."
        ]
    },

    // Property demands
    propertyDemands: [
        "Buy me 2 plots in Gwarinpa \u{1F3E0}",
        "I need a duplex with swimming pool",
        "Penthouse in Maitama or nothing \u{1F624}",
        "Just 1 plot in Apo... I'm a simple person",
        "3 bedroom flat. Furnished. With gen.",
        "Land in Asokoro. Yes, I know what I said.",
        "Semi-detached duplex. BQ inclusive.",
        "Buy the land, I'll build the love \u{1F3D7}\u{FE0F}\u{1F495}",
        "Mansion in Katampe. Dream big or go home.",
        "Plot of land + engagement ring. In that order.",
        "Terrace duplex in Jahi. Final answer.",
        "4 bedroom bungalow. I like one floor.",
        "Land in Lugbe. Affordable love \u{1F602}"
    ],

    // Funny conditions
    funnyConditions: {
        en: [
            "If house is too much, land is fine.",
            "I don't want iPhone. I said what I said \u{1F624}",
            "No excuses this Valentine.",
            "I've been patient long enough.",
            "Other people's partners are buying property o \u{1F440}",
            "Rent is not love. Ownership is love.",
            "Love me in hectares, not in watts \u26A1\u{1F3E0}",
            "Buy now, thank me later \u{1F4C8}"
        ],
        pid: [
            "If house too cost, land go do.",
            "I no wan iPhone. Na wetin I talk \u{1F624}",
            "No excuse this Valentine o.",
            "I don patient enough.",
            "Other people partner don dey buy property o \u{1F440}",
            "Rent no be love. Ownership na love.",
            "Buy now, thank me later \u{1F4C8}"
        ]
    },

    // Quiz questions
    quiz: {
        en: [
            {
                question: "How long have you been with your Val?",
                options: [
                    "Just met \u{1F440}",
                    "Less than 1 year",
                    "1-2 years",
                    "3+ years",
                    "It's complicated \u{1F605}"
                ]
            },
            {
                question: "What has your Val bought you before?",
                options: [
                    "Food only \u{1F354}",
                    "Small gifts sometimes \u{1F381}",
                    "Big things \u{1F4B0}",
                    "Nothing yet \u{1F624}"
                ]
            },
            {
                question: "Where do you want to live in Abuja?",
                options: [
                    "Maitama (I have standards)",
                    "Asokoro (I know my worth)",
                    "Gwarinpa (I'm realistic)",
                    "Anywhere with good light and water \u{1F602}",
                    "I just need roof and love"
                ]
            },
            {
                question: "How serious is your Val?",
                options: [
                    "Very serious \u{1F48D}",
                    "We're getting there",
                    "Still testing waters",
                    "I'm the serious one \u{1F624}"
                ]
            }
        ],
        pid: [
            {
                question: "How long you don dey with your Val?",
                options: [
                    "We just meet \u{1F440}",
                    "No reach 1 year",
                    "1-2 years",
                    "3+ years",
                    "E complicated \u{1F605}"
                ]
            },
            {
                question: "Wetin your Val don buy for you before?",
                options: [
                    "Food only \u{1F354}",
                    "Small small gift \u{1F381}",
                    "Big things \u{1F4B0}",
                    "Nothing at all \u{1F624}"
                ]
            },
            {
                question: "Where you wan live for Abuja?",
                options: [
                    "Maitama (I get standard)",
                    "Asokoro (I know my worth)",
                    "Gwarinpa (I dey realistic)",
                    "Anywhere wey light and water dey \u{1F602}",
                    "I just need roof and love"
                ]
            },
            {
                question: "How serious your Val be?",
                options: [
                    "Very serious \u{1F48D}",
                    "We dey go there",
                    "Still dey test water",
                    "Na me be the serious one \u{1F624}"
                ]
            }
        ]
    },

    // Quiz result mapping
    getQuizDemand(answers) {
        // answers is array of indices [q1, q2, q3, q4]
        const duration = answers[0]; // 0-4
        const gifts = answers[1];    // 0-3
        const location = answers[2]; // 0-4
        const serious = answers[3];  // 0-3

        // High-end demand
        if (duration >= 3 && gifts <= 1 && location <= 1) {
            return {
                demand: "Your Val OWES you a mansion in Maitama! No excuses! \u{1F624}",
                property: "Duplex in Maitama with swimming pool"
            };
        }
        // Just met, realistic
        if (duration === 0 && location >= 3) {
            return {
                demand: "Start small \u2014 1 plot in Lugbe. Love will grow with the land \u{1F602}",
                property: "1 plot of land in Lugbe"
            };
        }
        // Generous partner, mid area
        if (gifts >= 2 && location === 2) {
            return {
                demand: "Your Val is ready! Time for that duplex in Gwarinpa \u{1F3E0}",
                property: "Semi-detached duplex in Gwarinpa"
            };
        }
        // Serious but nothing bought
        if (serious <= 1 && gifts === 3) {
            return {
                demand: "All that seriousness and no property? Time to change that! \u{1F624}",
                property: "3 bedroom flat in Asokoro. Furnished."
            };
        }
        // Complicated
        if (duration === 4) {
            return {
                demand: "Your situation is complicated but your property goals shouldn't be \u{1F602}",
                property: "Land in Apo. Simple and straightforward."
            };
        }
        // Long relationship
        if (duration >= 2) {
            return {
                demand: "After all these years, you deserve prime property!",
                property: "Terrace duplex in Jahi. BQ inclusive."
            };
        }
        // Default
        return {
            demand: "Love is great, but land in Abuja is greater \u{1F60F}",
            property: "Plot of land in Gwarinpa"
        };
    }
};
