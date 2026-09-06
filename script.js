/**
 * BAR CONNECTIONS — Production Engine (Neubrutalist Edition)
 * The Mixologist's Relational Deduction Puzzle Game
 * Standalone, Static-Host Architecture (GitHub Pages Ready)
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. CANONICAL PUZZLE DATASET (Curated Sampling of Master Shifts)
     ========================================================================== */
  const PUZZLE_DATABASE = [
    {
      id: 'specimen-1',
      title: 'The House Spec',
      subtitle: 'Core Archetypes & Glassware',
      groups: [
        {
          tier: 1,
          category: 'CLASSIC SOUR FAMILY',
          tierLabel: 'Foundations',
          items: ['DAIQUIRI', 'MARGARITA', 'GIMLET', 'WHISKEY SOUR'],
          explanation: 'The Sour is mixology\'s cornerstone template: strong spirit balanced with fresh citrus (lime or lemon) and a sweetening agent.',
          clue: 'Drinks sharing the holy trinity of spirit, citrus, and sugar.'
        },
        {
          tier: 2,
          category: 'STEMMED SERVICE GLASSWARE',
          tierLabel: 'Technique',
          items: ['COUPE', 'NICK & NORA', 'MARTINI', 'FLUTE'],
          explanation: 'Vessels with elevated stems that prevent the guest\'s hand from warming the chilled, un-iced drink bowl during service.',
          clue: 'Vessels engineered to protect drink temperature via an elevated stem.'
        },
        {
          tier: 3,
          category: 'EQUAL-PARTS ARCHITECTURE (1:1:1)',
          tierLabel: 'Structure',
          items: ['NEGRONI', 'BOULEVARDIER', 'LAST WORD', 'PAPER PLANE'],
          explanation: 'Masterpieces where every component carries identical volume, proving balance through equal botanical weights.',
          clue: 'Cocktails proportioned with exact equal ounces for every ingredient.'
        },
        {
          tier: 4,
          category: 'REFRIGERATE AFTER OPENING',
          tierLabel: 'Master Lore',
          items: ['SWEET VERMOUTH', 'LILLET BLANC', 'DRY VERMOUTH', 'PUNT E MES'],
          explanation: 'Fortified and aromatized wines contain wine bases that oxidize rapidly at room temp. Professional bars keep them chilled.',
          clue: 'Wine-based modifiers that spoil if left on a warm backbar shelf.'
        }
      ]
    },
    {
      id: 'specimen-2',
      title: 'Behind the Stick',
      subtitle: 'Tools, Ice & Thermodynamics',
      groups: [
        {
          tier: 1,
          category: 'TWO-PIECE COCKTAIL SHAKERS',
          tierLabel: 'Foundations',
          items: ['BOSTON', 'TIN-ON-TIN', 'FRENCH', 'SPEED TIN'],
          explanation: 'Two-piece shaker systems favored by craft bartenders for rapid sealing, thermal conductivity, and instant separation.',
          clue: 'Two-piece shaker vessels without built-in strainer lids.'
        },
        {
          tier: 2,
          category: 'FAST-MELTING / HIGH DILUTION ICE',
          tierLabel: 'Technique',
          items: ['CRUSHED', 'PEBBLE', 'NUGGET', 'SHAVED'],
          explanation: 'High surface-area ice designed to rapidly chill and deliberately dilute strong, high-sugar Tiki drinks, Juleps, and Cobblers.',
          clue: 'Ice cuts crafted specifically to melt rapidly and provide high dilution.'
        },
        {
          tier: 3,
          category: 'BAR STRAINERS',
          tierLabel: 'Structure',
          items: ['HAWTHORNE', 'JULEP', 'FINE MESH', 'CONICAL'],
          explanation: 'Specialized filtering tools: Hawthorne springs catch ice crystals; Julep strainers fit mixing glasses; mesh traps pulp.',
          clue: 'Station implements used to separate liquid from spent ice and fruit solids.'
        },
        {
          tier: 4,
          category: 'CITRUS PREPARATION TOOLS',
          tierLabel: 'Master Lore',
          items: ['CHANNEL KNIFE', 'Y-PEELER', 'ELBOW PRESS', 'CITRUS REAMER'],
          explanation: 'Mise-en-place tools used to harvest fresh citrus juices and express essential oils without extracting bitter white pith.',
          clue: 'Station implements dedicated exclusively to processing lemons, limes, and oranges.'
        }
      ]
    },
    {
      id: 'specimen-3',
      title: 'Aperitivo & Botanicals',
      subtitle: 'Amaro, Anise & Essential Oils',
      groups: [
        {
          tier: 1,
          category: 'RED APERITIVO LIQUEURS',
          tierLabel: 'Foundations',
          items: ['CAMPARI', 'APEROL', 'SELECT', 'CAPPELETTI'],
          explanation: 'Bittersweet Italian aperitivi infused with gentian, rhubarb, and citrus peel that define the modern Spritz and Negroni.',
          clue: 'Bright crimson bittersweet Italian aperitifs.'
        },
        {
          tier: 2,
          category: 'SPIRITS THAT "LOUCHE" WITH WATER',
          tierLabel: 'Technique',
          items: ['ABSINTHE', 'PASTIS', 'OUZO', 'RAKI'],
          explanation: 'Anise-heavy botanical spirits whose insoluble essential oils precipitate when diluted with chilled water, turning milky white.',
          clue: 'Botanical spirits that turn cloudy when chilled water is introduced.'
        },
        {
          tier: 3,
          category: 'CITRUS PEEL GARNISH CUTS',
          tierLabel: 'Structure',
          items: ['EXPRESSED TWIST', 'CITRUS SWATH', 'HORSE\'S NECK', 'FLAMED PEEL'],
          explanation: 'Technical cuts of citrus zest manipulated over cocktail surface tension to release aromatic limonene oils across the drink.',
          clue: 'Methods of cutting and manipulating citrus peel for aromatic top notes.'
        },
        {
          tier: 4,
          category: 'HISTORIC PRE-PROHIBITION SYRUPS',
          tierLabel: 'Master Lore',
          items: ['GOMME SYRUP', 'ORGEAT', 'FALERNUM', 'GRENADINE'],
          explanation: 'Traditional sweeteners: gum arabic for texture, almond/rose for Mai Tais, ginger/clove for punch, and real pomegranate.',
          clue: 'Complex historic sweeteners offering body, oil, and spice beyond refined sugar.'
        }
      ]
    },
    {
      id: 'specimen-4',
      title: 'Thermodynamics & Agitation',
      subtitle: 'Stirring, Texture & Aromatics',
      groups: [
        {
          tier: 1,
          category: 'ALWAYS STIRRED, NEVER SHAKEN',
          tierLabel: 'Foundations',
          items: ['MANHATTAN', 'MARTINI', 'VIEUX CARRÉ', 'HANKY PANKY'],
          explanation: 'Drinks built entirely from spirits and aromatized wines must be stirred to preserve crystal clarity, dense mouthfeel, and zero aeration.',
          clue: 'Spirit-forward classics whose silky mouthfeel demands a barspoon rather than a shaker.'
        },
        {
          tier: 2,
          category: 'SPECIALIZED SHAKING TECHNIQUES',
          tierLabel: 'Technique',
          items: ['DRY SHAKE', 'REVERSE DRY SHAKE', 'WHIP SHAKE', 'ROLLING'],
          explanation: 'Agitation methods tailored for texture: dry shaking emulsifies albumin; whip shaking with crushed ice chills without over-diluting.',
          clue: 'Special mechanical maneuvers behind the stick designed to produce texture.'
        },
        {
          tier: 3,
          category: 'BITTERS ESSENTIAL TO CANON CLASSICS',
          tierLabel: 'Structure',
          items: ['ANGOSTURA', 'PEYCHAUD\'S', 'ORANGE BITTERS', 'BOKER\'S'],
          explanation: 'Potent aromatic tinctures: Angostura anchors Old Fashioneds, Peychaud\'s defines Sazeracs, and orange bitters complete the 19th-century Martini.',
          clue: 'Concentrated botanical alcohol dashes that anchor legendary recipes.'
        },
        {
          tier: 4,
          category: 'CAUSES OF A "FLAT" COCKTAIL',
          tierLabel: 'Master Lore',
          items: ['WARM GLASS', 'OVER-DILUTION', 'STALE JUICE', 'EXHAUSTED SODA'],
          explanation: 'Service diagnosis: warm glasses melt ice prematurely, stale juice loses vibrant acidity, and flat soda extinguishes effervescence.',
          clue: 'Station errors that ruin the crispness and vitality of a served drink.'
        }
      ]
    },
    {
      id: 'specimen-5',
      title: 'Terroir & Fermentation',
      subtitle: 'Agave, Cane & Grain Geographies',
      groups: [
        {
          tier: 1,
          category: 'MEXICAN AGAVE DISTILLATES',
          tierLabel: 'Foundations',
          items: ['TEQUILA', 'MEZCAL', 'RAICILLA', 'BACANORA'],
          explanation: 'Protected Denominations of Origin distilled from cooked agave hearts throughout Jalisco, Oaxaca, Sonora, and neighboring states.',
          clue: 'Spirits born from the harvested piñas of Mexican agave.'
        },
        {
          tier: 2,
          category: 'RUM REGIONAL STYLES',
          tierLabel: 'Technique',
          items: ['AGRICOLE', 'JAMAICAN HIGH-ESTER', 'DEMERARA', 'CACHAÇA'],
          explanation: 'Sugarcane spirits classified by origin: fresh cane juice from Martinique & Brazil versus heavy pot-still molasses from Jamaica & Guyana.',
          clue: 'Cane spirits differentiated by terroir, fermentation style, and still design.'
        },
        {
          tier: 3,
          category: 'DRINKS TOPPED WITH GINGER BEER (BUCKS)',
          tierLabel: 'Structure',
          items: ['MOSCOW MULE', 'DARK \'N STORMY', 'LONDON BUCK', 'EL DIABLO'],
          explanation: 'The Buck family: spirit plus fresh citrus (usually lime) lengthened with effervescent, spicy ginger beer in a highball or copper mug.',
          clue: 'Refreshing highballs lengthened specifically with effervescent ginger beer.'
        },
        {
          tier: 4,
          category: 'WHISKEY STATUTORY PRODUCTION TERMS',
          tierLabel: 'Master Lore',
          items: ['BOTTLED-IN-BOND', 'SINGLE MALT', 'BARREL PROOF', 'SOUR MASH'],
          explanation: 'Strict legal definitions governed by distilling laws regarding bonded warehouses, single-facility batches, and undiluted bottling.',
          clue: 'Federal and international legal classifications printed on whiskey labels.'
        }
      ]
    },
    {
      id: 'specimen-6',
      title: 'Golden Age Pioneers',
      subtitle: '19th-Century Tomes & Historic Saloons',
      groups: [
        {
          tier: 1,
          category: 'JERRY THOMAS 1862 SPEC RECIPES',
          tierLabel: 'Foundations',
          items: ['BLUE BLAZER', 'JAPANESE COCKTAIL', 'BRANDY CRUSTA', 'TOM AND JERRY'],
          explanation: 'Iconic original recipes codified in the first published cocktail book, "How to Mix Drinks" by Jerry Thomas.',
          clue: 'Pioneering concoctions recorded in the world\'s first cocktail guide.'
        },
        {
          tier: 2,
          category: 'WARM COCKTAIL SERVICE VESSELS',
          tierLabel: 'Technique',
          items: ['TODDY GLASS', 'IRISH COFFEE MUG', 'CERAMIC PUNCH CUP', 'PEWTER TANKARD'],
          explanation: 'Heavy-walled or handled heat-tempered drinkware engineered to safely present steaming grogs and toddies.',
          clue: 'Insulated or handled drinkware engineered for hot liquid service.'
        },
        {
          tier: 3,
          category: 'RICH UNREFINED CANE SWEETENERS',
          tierLabel: 'Structure',
          items: ['TURBINADO SYRUP', 'DEMERARA SYRUP', 'PANELA SYRUP', 'MUSCOVADO SYRUP'],
          explanation: 'Unbleached, high-molasses syrups that contribute dark mineral warmth, body, and unctuous mouthfeel.',
          clue: 'Dark syrups packed with natural molasses minerals rather than pure white sweetness.'
        },
        {
          tier: 4,
          category: 'HOTELS THAT BIRTHED CANON COCKTAILS',
          tierLabel: 'Master Lore',
          items: ['WALDORF-ASTORIA', 'HOFFMAN HOUSE', 'HOTEL NACIONAL', 'RAFFLES HOTEL'],
          explanation: 'Gilded age international luxury hotels whose head bartenders created drinks that entered cocktail immortality.',
          clue: 'Legendary hospitality houses with signature drinks named in their honor.'
        }
      ]
    },
    {
      id: 'specimen-7',
      title: 'Polynesian Escapism',
      subtitle: 'Mid-Century Exoticism & Rhum Logic',
      groups: [
        {
          tier: 1,
          category: 'CANONICAL DONN BEACH CREATIONS',
          tierLabel: 'Foundations',
          items: ['ZOMBIE', 'COBRA\'S FANG', 'NAVY GROG', 'THREE DOTS AND A DASH'],
          explanation: 'Complex multi-rum benchmarks engineered with citrus and spices by Don the Beachcomber in Hollywood.',
          clue: 'Layered rum and spice masterpieces designed by the father of Polynesian pop.'
        },
        {
          tier: 2,
          category: 'TIKI ICE & SWIZZLE IMPLEMENTS',
          tierLabel: 'Technique',
          items: ['BOIS LÉLÉ', 'LEWIS BAG', 'ICE MALLET', 'FLASH BLENDER'],
          explanation: 'Physical mechanical tools required to crush ice, aerate tropical blends, and spin crushed-ice swizzles.',
          clue: 'Bar equipment specifically utilized to pulverize ice and whip tropical concoctions.'
        },
        {
          tier: 3,
          category: 'TROPICAL SPICE LIQUEURS & EXTRACTS',
          tierLabel: 'Structure',
          items: ['ALLSPICE DRAM', 'FALERNUM', 'ORANGE CURACAO', 'VANILLA EXTRACT'],
          explanation: 'Aromatic, spiced liqueurs and concentrates that provide the savory undertones essential to balanced rum punches.',
          clue: 'Spiced and citrus modifiers that define exotic tropical drink templates.'
        },
        {
          tier: 4,
          category: 'CANONICAL RUM BLEND COMPONENTS',
          tierLabel: 'Master Lore',
          items: ['OVERPROOF DEMERARA', 'JAMAICAN POT STILL', 'SPANISH COLUMN STILL', 'MARTINIQUE AGRICOLE'],
          explanation: 'Contrasting regional rums combined within a single spec to synthesize a multi-dimensional rum profile.',
          clue: 'Contrasting regional distillates combined to build complex layered rum foundations.'
        }
      ]
    },
    {
      id: 'specimen-8',
      title: 'Effervescence & Champagne',
      subtitle: 'Carbonation Science & Stemware Bubbles',
      groups: [
        {
          tier: 1,
          category: 'CLASSIC SPARKLING COCKTAILS',
          tierLabel: 'Foundations',
          items: ['FRENCH 75', 'BELLINI', 'AIRMAIL', 'CHAMPAGNE COCKTAIL'],
          explanation: 'Heritage recipes lengthened and carbonated with sparkling wine to provide acidity, sparkle, and celebratory lift.',
          clue: 'Canon cocktails built around effervescent sparkling wine.'
        },
        {
          tier: 2,
          category: 'EFFERVESCENCE RETENTION HABITS',
          tierLabel: 'Technique',
          items: ['PRE-CHILLED GLASS', 'GENTLE FLUTE POUR', 'TILTED STEM ANGLE', 'UNSTIRRED FINISH'],
          explanation: 'Service habits that minimize turbulence to preserve dissolved carbon dioxide gas in the glass.',
          clue: 'Pouring and handling practices designed to avoid releasing bubbles prematurely.'
        },
        {
          tier: 3,
          category: 'FRENCH FLORAL & HERBAL CORDIALS',
          tierLabel: 'Structure',
          items: ['ST-GERMAIN', 'BÉNÉDICTINE', 'CHAMBORD', 'YELLOW CHARTREUSE'],
          explanation: 'Sweet, highly concentrated botanical elixirs of French origin used to scent wine-based cocktails.',
          clue: 'Historic sweet French botanical and berry cordials.'
        },
        {
          tier: 4,
          category: 'CHAMPAGNE PRESSURE & CRU ZONES',
          tierLabel: 'Master Lore',
          items: ['MONTAGNE DE REIMS', 'CÔTE DES BLANCS', 'VALLÉE DE LA MARNE', 'CÔTE DES BAR'],
          explanation: 'The primary viticultural sub-regions of the Champagne AOC in northern France where base grapes are grown.',
          clue: 'The terroir sub-districts that produce the premier sparkling wines of France.'
        }
      ]
    },
    {
      id: 'specimen-9',
      title: 'The Botanist’s Cabinet',
      subtitle: 'Juniper Distillates & Essential Terpenes',
      groups: [
        {
          tier: 1,
          category: 'GIN HISTORIC CLASSIFICATIONS',
          tierLabel: 'Foundations',
          items: ['LONDON DRY', 'OLD TOM', 'GENEVER', 'PLYMOUTH'],
          explanation: 'Statutory and traditional styles of gin reflecting different sweetness, grain bases, and distillation guidelines.',
          clue: 'The four historic legal and regional iterations of juniper spirit.'
        },
        {
          tier: 2,
          category: 'BOTANICAL EXTRACTION METHODS',
          tierLabel: 'Technique',
          items: ['VAPOR INFUSION', 'MACERATION', 'VACUUM DISTILLATION', 'BOUQUET GARNI'],
          explanation: 'Methods through which essential botanical oils, terpene molecules, and aromatics are transferred into neutral spirit.',
          clue: 'Technical distillation procedures used to infuse aromatics into ethanol.'
        },
        {
          tier: 3,
          category: 'CORE GIN BOTANICAL BLEND',
          tierLabel: 'Structure',
          items: ['JUNIPER BERRY', 'CORIANDER SEED', 'ANGELICA ROOT', 'ORRIS ROOT'],
          explanation: 'The foundational botanical holy quartet behind almost every classical London Dry recipe.',
          clue: 'The indispensable botanical matrix forming the backbone of standard gin.'
        },
        {
          tier: 4,
          category: 'BRITISH MILITARY RATION LIQUIDS',
          tierLabel: 'Master Lore',
          items: ['PLYMOUTH NAVY GIN', 'PUSSER\'S RUM', 'LIME CORDIAL', 'TONIC WATER'],
          explanation: 'Liquids issued or consumed by the British Royal Navy as rations, scurvy antidotes, or anti-malarial medicine.',
          clue: 'Drink rations and therapeutic elixirs commissioned for the British Admiralty.'
        }
      ]
    },
    {
      id: 'specimen-10',
      title: 'Bitter Roots & Amari',
      subtitle: 'Gentian, Rhubarb & Alpine Herbs',
      groups: [
        {
          tier: 1,
          category: 'ICONIC COMMERCIAL AMARI',
          tierLabel: 'Foundations',
          items: ['FERNET-BRANCA', 'AMARO NONINO', 'AMARO MONTENEGRO', 'CYNAR'],
          explanation: 'Italian bittersweet potable amari featuring proprietary macerations of roots, barks, and botanicals.',
          clue: 'Benchmark Italian bitter herbal spirits consumed after dinner.'
        },
        {
          tier: 2,
          category: 'APÉRITIF CITRUS MANIPULATIONS',
          tierLabel: 'Technique',
          items: ['FLAMED ORANGE PEEL', 'DISCARDED TWIST', 'PINCHED LEMON WHEEL', 'HALF MOON SLICE'],
          explanation: 'Specific cuts and expressions of fresh citrus zest designed to deposit essential oils without over-acidifying bitter drinks.',
          clue: 'Citrus garnish preparations applied to perfume aperitivi.'
        },
        {
          tier: 3,
          category: 'BITTERING ROOT & BARK AGENTS',
          tierLabel: 'Structure',
          items: ['GENTIAN ROOT', 'CINCHONA BARK', 'RHUBARB ROOT', 'QUASSIA WOOD'],
          explanation: 'Potent botanical bittering agents providing the sharp alkaloid bitterness required for digestion and palate cleansing.',
          clue: 'Dry barks and roots that impart intense herbal bitterness.'
        },
        {
          tier: 4,
          category: 'ALPINE BOTANICAL EXTRACTS',
          tierLabel: 'Master Lore',
          items: ['GENÈPI', 'WORMWOOD', 'PINE BUDS', 'ACHILLEA'],
          explanation: 'Wild, high-altitude herbs harvested along the European Alps to formulate herbaceous mountain amari and digestifs.',
          clue: 'High-elevation mountain flora harvested for alpine herbal liqueurs.'
        }
      ]
    },
    {
      id: 'specimen-11',
      title: 'Acid Science',
      subtitle: 'Brix, Citrus & Super Juices',
      groups: [
        {
          tier: 1,
          category: 'FRESH BAR JUICES (ORGANIC ACIDS)',
          tierLabel: 'Foundations',
          items: ['LIME JUICE', 'LEMON JUICE', 'GRAPEFRUIT JUICE', 'ORANGE JUICE'],
          explanation: 'Primary freshly squeezed citrus juices that supply titratable acidity, aroma, and water volume to sours.',
          clue: 'Standard fresh fruit squeezes providing raw natural cocktail sourness.'
        },
        {
          tier: 2,
          category: 'SUPER JUICE EXTRACTION PROCESS',
          tierLabel: 'Technique',
          items: ['PEEL CITRIC MACERATION', 'OLEO-CITRATE EXTRACTION', 'WATER BLENDING', 'FINE STRAINING'],
          explanation: 'The procedural methodology popularized by Kevin Kos to dramatically extend citrus juice yields via peel extraction.',
          clue: 'The physical steps involved in producing sustainable, acid-adjusted super juice.'
        },
        {
          tier: 3,
          category: 'DRY ACID CRYSTALS & POWDERS',
          tierLabel: 'Structure',
          items: ['CITRIC ACID POWDER', 'MALIC ACID POWDER', 'TARTARIC ACID POWDER', 'ASCORBIC ACID POWDER'],
          explanation: 'Pure food-grade crystalline chemical acids dissolved into spirits or clarifying juices to adjust sourness without added dilution.',
          clue: 'Crystalline sour powders used to acid-adjust liquids without introducing extra juice volume.'
        },
        {
          tier: 4,
          category: 'ACID-FORWARD FERMENTED SHRUBS',
          tierLabel: 'Master Lore',
          items: ['APPLE CIDER VINEGAR', 'CHAMPAGNE VINEGAR', 'RED WINE VINEGAR', 'RICE WINE VINEGAR'],
          explanation: 'Acetic acid bases traditionally macerated with sugar and fruit to create historical colonial drinking shrubs.',
          clue: 'Acetic vinegars deployed in colonial shrubs and oxymels.'
        }
      ]
    },
    {
      id: 'specimen-12',
      title: 'Highball Architecture',
      subtitle: 'Carbonation Pressure & Long Drinks',
      groups: [
        {
          tier: 1,
          category: 'ICONIC TWO-INGREDIENT HIGHBALLS',
          tierLabel: 'Foundations',
          items: ['GIN AND TONIC', 'SCOTCH AND SODA', 'SEVEN AND SEVEN', 'CUBA LIBRE'],
          explanation: 'Elemental long drinks pairing a spirit base with an effervescent soda or tonic over ice in tall glassware.',
          clue: 'Simple, timeless two-part long drinks served over ice.'
        },
        {
          tier: 2,
          category: 'HIGHBALL ICE CARVING FORMATS',
          tierLabel: 'Technique',
          items: ['ICE SPEAR', 'COLLINS COLUMN', 'STACKED CUBES', 'CRACKED BLOCK'],
          explanation: 'Tall, dense shapes of clear ice sculpted to fit highball vessels and chill drinks while minimizing carbonation loss.',
          clue: 'Elongated ice cuts sculpted specifically for tall Collins glasses.'
        },
        {
          tier: 3,
          category: 'CARBONATED BAR MIXERS',
          tierLabel: 'Structure',
          items: ['CLUB SODA', 'INDIAN TONIC', 'GINGER ALE', 'BITTER LEMON'],
          explanation: 'Commercially carbonated soft mixers containing varying levels of carbon dioxide, minerality, and quinine.',
          clue: 'Bottled sparkling mixers used to lengthen spirits.'
        },
        {
          tier: 4,
          category: 'JAPANESE HIGHBALL SERVICE RITUALS',
          tierLabel: 'Master Lore',
          items: ['THIRTEEN STIRS', 'CHILLED WHISKY POUR', 'NO-ICE TOUCH', 'REFRIGERATED CAN'],
          explanation: 'Meticulous micro-steps developed in Japanese cocktail culture to ensure maximum carbonation retention in highballs.',
          clue: 'Precision steps championed by Tokyo highball specialists.'
        }
      ]
    },
    {
      id: 'specimen-13',
      title: 'The Clarification Lab',
      subtitle: 'Milk Washing, Agar & Centrifuges',
      groups: [
        {
          tier: 1,
          category: 'HISTORIC MILK PUNCH INGREDIENTS',
          tierLabel: 'Foundations',
          items: ['WHOLE MILK', 'BLACK TEA', 'LEMON PEEL', 'RUM BLEND'],
          explanation: 'The classic building blocks of 18th-century clarified milk punches recorded by Benjamin Franklin and Mary Rockett.',
          clue: 'Original components of historic English curd-clarified milk punches.'
        },
        {
          tier: 2,
          category: 'MECHANICAL LIQUID CLARIFICATION',
          tierLabel: 'Technique',
          items: ['CENTRIFUGATION', 'FREEZE-THAW AGAR', 'COFFEE FILTERING', 'PECTINEX ENZYME'],
          explanation: 'Modern bar laboratory methods used to strip solid particulates and haze from fruit juices and cocktails.',
          clue: 'Modern laboratory practices applied to make cloudy liquids crystal clear.'
        },
        {
          tier: 3,
          category: 'DAIRY PROTEIN COMPONENTS',
          tierLabel: 'Structure',
          items: ['CASEIN CURD', 'WHEY PROTEIN', 'ALPHA-LACTALBUMIN', 'MILK FAT GLOBLES'],
          explanation: 'Biological milk fractions responsible for binding bitter tannins and astringent polyphenols during milk washing.',
          clue: 'Dairy protein elements that bind harsh compounds when milk curdles.'
        },
        {
          tier: 4,
          category: 'FAT-WASHING OIL BASES',
          tierLabel: 'Master Lore',
          items: ['BROWN BUTTER', 'SESAME OIL', 'DUCK FAT', 'COCONUT OIL'],
          explanation: 'Rich lipids steeped into spirits and frozen solid, leaving luxurious mouthfeel and fat-soluble flavors behind.',
          clue: 'Oils and fats melted into alcohol and skimmed away to leave silky flavor.'
        }
      ]
    },
    {
      id: 'specimen-14',
      title: 'The Modern Classics',
      subtitle: 'The 2000s New York Cocktail Revival',
      groups: [
        {
          tier: 1,
          category: 'MILK & HONEY (NYC) MODERN CLASSICS',
          tierLabel: 'Foundations',
          items: ['PENICILLIN', 'GOLD RUSH', 'MIDNIGHT STINGER', 'MAID COCKTAIL'],
          explanation: 'Modern recipes formulated by Sasha Petraske, Sam Ross, and the Milk & Honey crew that achieved global canon status.',
          clue: 'Contemporary classic drinks originating from Sasha Petraske\'s legendary bar.'
        },
        {
          tier: 2,
          category: 'PEATED SCOTCH FLOAT MANEUVERS',
          tierLabel: 'Technique',
          items: ['BARSPOON INVERSION', 'SLOW POUR OVER BOWL', 'ATOMIZER SPRAY', 'SURFACE DRIZZLE'],
          explanation: 'Physical maneuvers used to suspend a smoky aromatic layer of peated Islay Scotch across the surface of a cocktail.',
          clue: 'Techniques used to float a layer of peated whisky on top of a drink.'
        },
        {
          tier: 3,
          category: 'MODERN CLASSIC INVENTOR INGREDIENTS',
          tierLabel: 'Structure',
          items: ['HONEY-GINGER SYRUP', 'MEZCAL SPLIT-BASE', 'CUCUMBER WHEELS', 'CHERRY HEERING'],
          explanation: 'Signature ingredients that define 21st-century modern classics like the Penicillin, Division Bell, and Gordon\'s Cup.',
          clue: 'Hallmark flavoring agents of the early 2000s cocktail renaissance.'
        },
        {
          tier: 4,
          category: 'NYC REVIVAL COCKTAIL SANCTUARIES',
          tierLabel: 'Master Lore',
          items: ['MILK & HONEY', 'DEATH & CO', 'PUDDLE THEATER', 'FLATIRON LOUNGE'],
          explanation: 'Landmark Manhattan cocktail bars opened between 1999 and 2006 that restored craft mixology standards.',
          clue: 'Early 2000s Lower Manhattan bars that ignited the modern craft movement.'
        }
      ]
    },
    {
      id: 'specimen-15',
      title: 'Sugar, Brix & Syrups',
      subtitle: 'Specific Gravity & Dissolution Dynamics',
      groups: [
        {
          tier: 1,
          category: 'STANDARD SIMPLE SYRUP RATIOS',
          tierLabel: 'Foundations',
          items: ['1:1 SIMPLE', '2:1 RICH SIMPLE', '3:2 BALANCED', 'COLD-PROCESSED'],
          explanation: 'Standard weight-to-volume formulations of white sugar dissolved in water to modulate sweetness and viscosity.',
          clue: 'Standard numeric syrup proportions of sugar to water.'
        },
        {
          tier: 2,
          category: 'HOT SYRUP MAKING EQUIPMENT',
          tierLabel: 'Technique',
          items: ['SOUS VIDE BATH', 'INDUCTION BURNER', 'MAGNETIC STIRRER', 'BRIX REFRACTOMETER'],
          explanation: 'Precision heating, dissolving, and measuring tools utilized to maintain stable, crystal-free sugar syrups.',
          clue: 'Lab tools used to control syrup temperature and measure sugar density.'
        },
        {
          tier: 3,
          category: 'NATURAL NON-CANE SWEETENERS',
          tierLabel: 'Structure',
          items: ['AGAVE NECTAR', 'MAPLE SYRUP', 'WILDFLOWER HONEY', 'BIRCH SYRUP'],
          explanation: 'Plant- and flower-derived liquid sweeteners carrying organic acids, floral terpenes, and distinct regional flavors.',
          clue: 'Sweet tree saps, cacti concentrates, and flower nectars.'
        },
        {
          tier: 4,
          category: 'OLEO SACCHARUM MECHANICS',
          tierLabel: 'Master Lore',
          items: ['CITRUS ZEST', 'GRANULATED SUGAR', 'OSMOTIC PRESSURE', 'VACUUM SEALING'],
          explanation: 'The osmotic process where dry hygroscopic sugar draws aromatic essential oils out of citrus peel vacuoles over time.',
          clue: 'Elements that generate oil-sugar syrup through osmotic extraction.'
        }
      ]
    },
    {
      id: 'specimen-16',
      title: 'The Solera Cellar',
      subtitle: 'Jerez Fortification, Flor & Oxidation',
      groups: [
        {
          tier: 1,
          category: 'DRY SHERRY STYLES (UNDER FLOR)',
          tierLabel: 'Foundations',
          items: ['FINO', 'MANZANILLA', 'AMONTILLADO', 'PALO CORTADO'],
          explanation: 'Dry Andalusian fortified wines that mature either fully or partially beneath a biological veil of living flor yeast.',
          clue: 'Dry Spanish sherries aged under or transitionally through flor yeast.'
        },
        {
          tier: 2,
          category: 'SHERRY SERVICE & CELLAR TOOLS',
          tierLabel: 'Technique',
          items: ['VENENCIA', 'COPA DE JEREZ', 'CELLAR BUNG', 'SAMPLE CANISTER'],
          explanation: 'Traditional Andalusian tools, such as the flexible silver cup venencia used to draw sherry directly through flor.',
          clue: 'Specialized tools used to extract and taste sherry from barrels.'
        },
        {
          tier: 3,
          category: 'OXIDATIVE / SWEET SHERRIES',
          tierLabel: 'Structure',
          items: ['OLOROSO', 'PEDRO XIMÉNEZ', 'MOSCATEL', 'CREAM SHERRY'],
          explanation: 'Heavily oxidized or sun-dried grape wines showcasing raisiny richness, walnut notes, and high natural sugar.',
          clue: 'Dark, rich sherries exposed intentionally to oxygen or made from sun-dried grapes.'
        },
        {
          tier: 4,
          category: 'SHERRY TRIANGLE WINEMAKING TOWNS',
          tierLabel: 'Master Lore',
          items: ['JEREZ DE LA FRONTERA', 'SANLÚCAR DE BARRAMEDA', 'EL PUERTO DE SANTA MARÍA', 'TREBUJENA'],
          explanation: 'The geographic municipalities in Cadiz, Spain, that form the historic Sherry Production Zone.',
          clue: 'The Andalusian coastal and inland towns that comprise the Sherry Triangle.'
        }
      ]
    },
    {
      id: 'specimen-17',
      title: 'Agave & Smoke',
      subtitle: 'Oaxacan Palenques & Pit Ovens',
      groups: [
        {
          tier: 1,
          category: 'WILD & CULTIVATED AGAVE VARIETALS',
          tierLabel: 'Foundations',
          items: ['ESPADÍN', 'TOBALÁ', 'TEPEXTATE', 'ARROQUEÑO'],
          explanation: 'Different botanical species of Agave harvested after decades of maturation to produce artisanal mezcals.',
          clue: 'Wild and cultivated agave plants harvested for traditional mezcal.'
        },
        {
          tier: 2,
          category: 'ANCESTRAL PALENQUE EQUIPMENT',
          tierLabel: 'Technique',
          items: ['EARTHEN PIT OVEN', 'TAHONA STONE', 'COPPER STILL', 'CLAY POT STILL'],
          explanation: 'Pre-industrial equipment used to bake agave piñas with volcanic rock, crush fibers, and distill low-proof mezcal.',
          clue: 'Primitive rustic implements found in artisanal mezcal distilleries.'
        },
        {
          tier: 3,
          category: 'AGAVE COCKTAILS WITH SPICY PROFILES',
          tierLabel: 'Structure',
          items: ['PICANTE DE LA CASA', 'SMOKY JALAPEÑO MARGARITA', 'OAXACAN DEAD', 'SIERRA NORTE'],
          explanation: 'Modern tequila and mezcal cocktails engineered around habanero, jalapeño, or capsicum spice balance.',
          clue: 'Agave drinks featuring deliberate chili heat and herbal smoke.'
        },
        {
          tier: 4,
          category: 'TEQUILA NOM STATUTORY CODES',
          tierLabel: 'Master Lore',
          items: ['NOM NUMBER', 'CRT SEAL', '100% PURO DE AGAVE', 'HECHO EN MÉXICO'],
          explanation: 'Compulsory regulatory marks enforced by the Consejo Regulador del Tequila verifying authentic distillery origins.',
          clue: 'Mandatory legal markings printed on certified Mexican tequila bottles.'
        }
      ]
    },
    {
      id: 'specimen-18',
      title: 'Ice Physics & Crystal Clarity',
      subtitle: 'Directional Freezing & Thermal Mass',
      groups: [
        {
          tier: 1,
          category: 'CLEAR ICE RETAIL FORMATS',
          tierLabel: 'Foundations',
          items: ['LARGE ROCK CUBE', 'LONG HIGHBALL SPEAR', 'ICE SPHERE', 'CRACKED PRISM'],
          explanation: 'Commercial clear ice geometric cuts deployed in craft cocktail programs to control dilution and visual presentation.',
          clue: 'Dense, crystal-clear ice shapes placed into cocktail glassware.'
        },
        {
          tier: 2,
          category: 'DIRECTIONAL FREEZING PHENOMENA',
          tierLabel: 'Technique',
          items: ['INSULATED COOLER', 'TOP-DOWN ADVANCING FRONT', 'SOLUTE DISPLACEMENT', 'BOTTOM CLOUDY CORE'],
          explanation: 'The physical thermodynamic process whereby water freezes from top to bottom, pushing trapped gases into a sacrificial lower zone.',
          clue: 'Mechanisms through which pure water freezes clear by driving air downward.'
        },
        {
          tier: 3,
          category: 'ICE CARVING HAND TOOLS',
          tierLabel: 'Structure',
          items: ['JAPANESE ICE SAW', 'THREE-PRONG ICE PICK', 'HEAVY DEBA KNIFE', 'ANVIL MALLET'],
          explanation: 'Sharp hand tools utilized by mixologists to break 300-pound Clinebell blocks into bar-ready cubes.',
          clue: 'Blades and picks designed for carving crystal ice blocks behind the bar.'
        },
        {
          tier: 4,
          category: 'ICE MELTING HEAT CONCEPTS',
          tierLabel: 'Master Lore',
          items: ['LATENT HEAT OF FUSION', 'SPECIFIC HEAT CAPACITY', 'EQUILIBRIUM TEMPERATURE', 'SURFACE WATER SHINE'],
          explanation: 'Thermodynamic principles governing how solid ice absorbs energy from alcohol and water to induce chilling and dilution.',
          clue: 'Physical physics terms describing how ice chills a cocktail.'
        }
      ]
    },
    {
      id: 'specimen-19',
      title: 'Albumin & Emulsions',
      subtitle: 'Egg Whites, Aquafaba & Velvety Heads',
      groups: [
        {
          tier: 1,
          category: 'CLASSIC EGG WHITE SOURS',
          tierLabel: 'Foundations',
          items: ['PISCO SOUR', 'CLOVER CLUB', 'WHITE LADY', 'RAMOS GIN FIZZ'],
          explanation: 'Historical recipes crowned with a thick, dense meringue-like foam created through shaken egg white protein.',
          clue: 'Historic drinks that require egg white to create a luscious head of foam.'
        },
        {
          tier: 2,
          category: 'FOAM AGITATION STEPS',
          tierLabel: 'Technique',
          items: ['ROOM TEMP DRY SHAKE', 'SPRING REMOVAL WHIP', 'HARD ICE CHILL', 'STRAINING SLOW POUR'],
          explanation: 'Mechanical shaking protocols that untangle and cross-link globular proteins before ice chills the emulsion.',
          clue: 'Shaking routines designed to denature and trap air inside liquid proteins.'
        },
        {
          tier: 3,
          category: 'VEGAN FOAMING AGENTS',
          tierLabel: 'Structure',
          items: ['CHICKPEA AQUAFABA', 'METHYLCELLULOSE', 'SOY PROTEIN ISOLATE', 'FEE FOAM'],
          explanation: 'Plant-based alternatives rich in saponins or proteins that mimic egg white foam without animal products.',
          clue: 'Plant-derived substitutes used to generate thick cocktail foam.'
        },
        {
          tier: 4,
          category: 'BITTERS DROPS ON FOAM PATTERNS',
          tierLabel: 'Master Lore',
          items: ['TOOTHPICK SWIRL', 'THREE DOT LINE', 'HEART CHAIN', 'ATOMIZER LOGO'],
          explanation: 'Aromatic garnishing patterns painted across foam heads to mask the sulfurous wet-dog aroma of raw egg.',
          clue: 'Decorative bitter designs drawn into egg foam to add scent.'
        }
      ]
    },
    {
      id: 'specimen-20',
      title: 'The Peat & The Pot',
      subtitle: 'Malted Barley, Hebrides & Islay Smoke',
      groups: [
        {
          tier: 1,
          category: 'ISLAY PEATED DISTILLERIES',
          tierLabel: 'Foundations',
          items: ['LAPHROAIG', 'ARDBEG', 'BOWMORE', 'LAGAVULIN'],
          explanation: 'Historic Scottish coastal distilleries on the Isle of Islay revered for intensely smoky, medicinal, iodized single malts.',
          clue: 'World-famous Scottish distilleries known for peaty smoke.'
        },
        {
          tier: 2,
          category: 'WHISKY TASTING / NOSING TOOLS',
          tierLabel: 'Technique',
          items: ['GLENCAIRN GLASS', 'COPITA STEM', 'WATER DROP PIPETTE', 'WATCH GLASS COVER'],
          explanation: 'Tasting glassware engineered with tapered rims to concentrate whisky aromas without burning the olfactory senses.',
          clue: 'Specialized glassware and pipettes crafted for smelling and evaluating neat spirits.'
        },
        {
          tier: 3,
          category: 'WHISKY FLAVOR CONGENERS',
          tierLabel: 'Structure',
          items: ['PHENOLS', 'LACTONES', 'ESTERS', 'VANILLIN'],
          explanation: 'Chemical aromatic compounds created during fermentation, peat drying, and barrel aging that define Scotch flavor.',
          clue: 'Chemical flavor molecules that produce fruit, smoke, and vanilla in whisky.'
        },
        {
          tier: 4,
          category: 'SCOTCH REGIONAL AOCS',
          tierLabel: 'Master Lore',
          items: ['SPEYSIDE', 'HIGHLANDS', 'LOWLANDS', 'CAMPBELTOWN'],
          explanation: 'The protected geographic whisky regions of Scotland, each with traditional historical stylistic profiles.',
          clue: 'The legally defined regional districts of Scotch whisky production.'
        }
      ]
    },
    {
      id: 'specimen-21',
      title: 'Bourbon & The Mash Bill',
      subtitle: 'Corn, Rye, Wheat & Charred Virgin Oak',
      groups: [
        {
          tier: 1,
          category: 'STRAIGHT RYE WHISKEY CREATIONS',
          tierLabel: 'Foundations',
          items: ['SAZERAC', 'BROOKLYN', 'MONTE CARLO', 'TORONTO'],
          explanation: 'Spicy, spirit-forward classic cocktails that call specifically for American straight rye whiskey as their backbone.',
          clue: 'Stirred whiskey cocktails anchored traditionally by rye\'s spicy kick.'
        },
        {
          tier: 2,
          category: 'BARREL CHAR GRADES',
          tierLabel: 'Technique',
          items: ['CHAR NUMBER ONE', 'CHAR NUMBER TWO', 'CHAR NUMBER THREE', 'ALLIGATOR CHAR FOUR'],
          explanation: 'The depth of flame exposure applied to American white oak staves, converting wood sugars into caramel and charcoal filters.',
          clue: 'Levels of fiery burn applied to the insides of bourbon barrels.'
        },
        {
          tier: 3,
          category: 'AMERICAN MASH BILL GRAINS',
          tierLabel: 'Structure',
          items: ['YELLOW DENT CORN', 'MALTED BARLEY', 'PLUMP WINTER WHEAT', 'DANK RYE GRAIN'],
          explanation: 'The agricultural cereal grain recipes ground and cooked to produce different styles of American bourbon and rye.',
          clue: 'The four foundational grains cooked in American whiskey mash tuns.'
        },
        {
          tier: 4,
          category: 'LEGAL BOURBON STATUTES',
          tierLabel: 'Master Lore',
          items: ['51 PERCENT CORN', 'CHARRED NEW OAK', 'MAX 125 ENTRY PROOF', 'NO ADDED FLAVORING'],
          explanation: 'Strict United States federal legal requirements governing what can be labeled and sold as Straight Bourbon.',
          clue: 'Federal statutory mandates governing American bourbon production.'
        }
      ]
    },
    {
      id: 'specimen-22',
      title: 'Savory & Vegetal Pours',
      subtitle: 'Brine, Celery, Umami & Garden Herbs',
      groups: [
        {
          tier: 1,
          category: 'CANONICAL BRINY & SAVORY SIPS',
          tierLabel: 'Foundations',
          items: ['DIRTY MARTINI', 'BLOODY MARY', 'BULL SHOT', 'RED SNAPPER'],
          explanation: 'Savory cocktail classics built around saline brine, tomato acid, or beef consommé instead of sweet fruit.',
          clue: 'Cocktails featuring savory, briny, or salty foundations.'
        },
        {
          tier: 2,
          category: 'HERB EXTRACTION / BRUISING MOVES',
          tierLabel: 'Technique',
          items: ['GENTLE BASIL SLAP', 'LIGHT MINT PRESS', 'OIL-EXPRESSING RUB', 'NO-SHRED MUDDLE'],
          explanation: 'Physical handling techniques that express aromatic essential oils from tender herbs without releasing bitter chlorophyll.',
          clue: 'Gentle handling habits that release herb scent without bruising out bitterness.'
        },
        {
          tier: 3,
          category: 'SAVORY LIQUID ENHANCERS',
          tierLabel: 'Structure',
          items: ['OLIVE BRINE', 'WORCESTERSHIRE SAUCE', 'CELERY BITTERS', 'SALINE SOLUTION'],
          explanation: 'Saline and umami modulators dropped into cocktails to enhance palate perception and suppress bitter astringency.',
          clue: 'Salty and fermented dashes that lend savory depth to cocktails.'
        },
        {
          tier: 4,
          category: 'BOTANICAL AQUAVIT SPICES',
          tierLabel: 'Master Lore',
          items: ['CARAWAY SEED', 'DILL SEED', 'FENNEL SEED', 'STAR ANISE'],
          explanation: 'The predominant herbal and botanical distillates that legally characterize Scandinavian aquavits.',
          clue: 'Spices required to distill authentic Scandinavian aquavit.'
        }
      ]
    },
    {
      id: 'specimen-23',
      title: 'The Punch Bowl',
      subtitle: 'Community Hospitality & Flowing Bowls',
      groups: [
        {
          tier: 1,
          category: 'HISTORIC PUNCH ESSENTIALS',
          tierLabel: 'Foundations',
          items: ['SPIRIT BASE', 'CITRUS JUICE', 'SWEET SUGAR', 'WATER DILUTION'],
          explanation: 'The core elements of traditional punch: spirit, sour, sweet, and water, with spice used as an optional accent.',
          clue: 'Core foundational elements of traditional 17th-century punch.'
        },
        {
          tier: 2,
          category: 'PUNCH BOWL CHILLING METHODS',
          tierLabel: 'Technique',
          items: ['BUNDT PAN ICE RING', 'SOLID ICE BLOCK', 'FROZEN FRUIT SPHERE', 'FLOAT EMBEDDED ICE'],
          explanation: 'Massive blocks of ice deployed in punch bowls to keep shared volumes chilled for hours without rapid waterlogging.',
          clue: 'Large-scale ice forms used to keep punch bowls cold without instant melting.'
        },
        {
          tier: 3,
          category: 'HISTORIC SHARED PUNCH BOWLS',
          tierLabel: 'Structure',
          items: ['REGENT\'S PUNCH', 'FISH HOUSE PUNCH', 'CHATHAM ARTILLERY PUNCH', 'PHILADELPHIA PUNCH'],
          explanation: 'Legendary communal American and British punch formulations that fueled historic clubs and state dinners.',
          clue: 'Historic, potent bowl punches brewed for clubs and militias.'
        },
        {
          tier: 4,
          category: 'COMMUNAL PUNCH WARE',
          tierLabel: 'Master Lore',
          items: ['SILVER LADLE', 'CRYSTAL BOWL', 'MATCHING CUPS', 'CHAMBER STAND'],
          explanation: 'Ornate presentation hardware designed in the 18th century to display and ladle communal concoctions.',
          clue: 'Table hardware dedicated to serving punch to large gatherings.'
        }
      ]
    },
    {
      id: 'specimen-24',
      title: 'Monastic Elixirs',
      subtitle: 'Secret Manuscripts & Alchemical Herbs',
      groups: [
        {
          tier: 1,
          category: 'MONASTIC BOTANICAL LIQUEURS',
          tierLabel: 'Foundations',
          items: ['GREEN CHARTREUSE', 'BÉNÉDICTINE', 'YELLOW CHARTREUSE', 'TÜRK\'S ELIXIR'],
          explanation: 'Herbal elixirs created or inspired by religious orders holding centuries-old secret botanical manuscripts.',
          clue: 'Herbal liqueurs formulated in ancient European abbeys and monasteries.'
        },
        {
          tier: 2,
          category: 'BARTENDER LIQUEUR RINSES',
          tierLabel: 'Technique',
          items: ['GLASS COATING SWIRL', 'DISCARD POUR-OFF', 'ATOMIZED COATING', 'BOTTOM DROP SINK'],
          explanation: 'Methods used to coat the inside walls of a chilled cocktail glass with an assertive liqueur without over-sweetening.',
          clue: 'Techniques used to perfume a glass interior with potent herbal spirits.'
        },
        {
          tier: 3,
          category: 'HERBS REPORTED IN CHARTREUSE',
          tierLabel: 'Structure',
          items: ['LEMON BALM', 'HYSSOP', 'PEPPERMINT', 'THYME'],
          explanation: 'Recognized aromatic culinary and medicinal herbs among the 130 secret plants macerated by Carthusian monks.',
          clue: 'Known green culinary herbs steeped into monastic elixirs.'
        },
        {
          tier: 4,
          category: 'CHARTREUSE PRODUCTION HUBS',
          tierLabel: 'Master Lore',
          items: ['VOIRON', 'AIGUEBELLE', 'FOURVOIRIE', 'ENTRE-DEUX-GUIERS'],
          explanation: 'Historic French distilleries and towns where the Carthusian Order distilled their legendary green spirit.',
          clue: 'French sites where Carthusian monks built and moved their historic distilleries.'
        }
      ]
    },
    {
      id: 'specimen-25',
      title: 'The Dash & The Bitters',
      subtitle: 'Tinctures, Pipettes & High-Proof Infusions',
      groups: [
        {
          tier: 1,
          category: 'CANONICAL AROMATIC COCKTAIL BITTERS',
          tierLabel: 'Foundations',
          items: ['ANGOSTURA AROMATIC', 'PEYCHAUD\'S RED', 'REGAN\'S ORANGE NO. 6', 'FEE BROTHERS OLD FASHION'],
          explanation: 'Ubiquitous commercial aromatic bitter bottles that rest on virtually every professional craft backbar.',
          clue: 'The most recognizable commercial bitters bottles in the cocktail world.'
        },
        {
          tier: 2,
          category: 'PRECISION BITTERS DISPENSERS',
          tierLabel: 'Technique',
          items: ['JAPANESE DASH BOTTLE', 'GLASS MEDICINE DROPPER', 'ATOMIZER NOZZLE', 'DASHER INSERT TOP'],
          explanation: 'Specialized dispensing hardware engineered to release uniform drops or vapor mists without splashing.',
          clue: 'Dispensers designed to measure consistent dashes and drops.'
        },
        {
          tier: 3,
          category: 'BITTERS INFUSION SOLVENTS',
          tierLabel: 'Structure',
          items: ['GRAIN NEUTRAL SPIRIT', 'OVERPROOF BOURBON', 'NAVY RUM BASE', 'WATER-ALCOHOL MIX'],
          explanation: 'High-proof liquid carriers (ethanol and water) capable of extracting both polar and non-polar botanical flavor compounds.',
          clue: 'High-proof spirits used to extract deep flavor from bitter roots.'
        },
        {
          tier: 4,
          category: 'ANGOSTURA HISTORIC TRIVIA',
          tierLabel: 'Master Lore',
          items: ['OVERSIZED LABEL', 'PORT OF SPAIN', 'J.G.B. SIEGERT', 'ROYAL WARRANT COAT'],
          explanation: 'Historical markers and design quirks defining the House of Angostura, born in Venezuela and bottled in Trinidad.',
          clue: 'Unique design and historical trivia traits tied to Angostura bitters.'
        }
      ]
    },
    {
      id: 'specimen-26',
      title: 'Neutral Grain & Cold Purity',
      subtitle: 'Column Stills, Charcoal & Sub-Zero Service',
      groups: [
        {
          tier: 1,
          category: 'CLASSIC VODKA COCKTAIL ANCHORS',
          tierLabel: 'Foundations',
          items: ['COSMOPOLITAN', 'MOSCOW MULE', 'ESPRESSO MARTINI', 'BLOODY MARY'],
          explanation: 'Massively popular international drinks that rely on clean vodka to elevate citrus, ginger, coffee, or tomato flavors.',
          clue: 'Major cocktail classics engineered around a neutral vodka canvas.'
        },
        {
          tier: 2,
          category: 'SUB-ZERO SPIRIT STORAGE',
          tierLabel: 'Technique',
          items: ['FREEZER CHEST BOTTLE', 'FROSTED STEMWARE', 'MINUS TWENTY CHILL', 'GEL VISCOSITY POUR'],
          explanation: 'Storing high-proof neutral spirits below zero to increase liquid density and yield a velvety, syrup-like mouthfeel.',
          clue: 'Freezer practices that make high-proof neat spirits thick and viscous.'
        },
        {
          tier: 3,
          category: 'VODKA DISTILLATION CROPS',
          tierLabel: 'Structure',
          items: ['STARCHY POTATO', 'WINTER WHEAT', 'SWEET CORN', 'PLUMP RYE'],
          explanation: 'Base agricultural agricultural crops fermented to produce neutral ethanol, each imparting subtle textural nuances.',
          clue: 'The primary starches and grains fermented to distill vodka.'
        },
        {
          tier: 4,
          category: 'VODKA PURIFICATION MEDIA',
          tierLabel: 'Master Lore',
          items: ['SILVER BIRCH CHARCOAL', 'QUARTZ SAND BED', 'CELLULOSE MEMBRANE', 'BONE CHARCOAL FILTER'],
          explanation: 'Filtration media through which raw distillate is passed to strip impurities, fatty acids, and sharp odors.',
          clue: 'Filtering materials used in vodka rectifying houses to polish spirit.'
        }
      ]
    },
    {
      id: 'specimen-27',
      title: 'The Fizz & The Collins',
      subtitle: 'Long Aerated Classics & Syphons',
      groups: [
        {
          tier: 1,
          category: 'CANONICAL COLLINS & FIZZ REPERTOIRE',
          tierLabel: 'Foundations',
          items: ['TOM COLLINS', 'JOHN COLLINS', 'GIN FIZZ', 'SILVER FIZZ'],
          explanation: 'Refreshing tall sour classics shaken with citrus and topped with sparkling soda water over fresh ice.',
          clue: 'Refreshing shaken sours lengthened with effervescent soda in tall glasses.'
        },
        {
          tier: 2,
          category: 'RAMOS GIN FIZZ SOUFFLÉ LIFT',
          tierLabel: 'Technique',
          items: ['TWELVE MINUTE CHILL', 'SLOW SODA POUR CENTER', 'TUBE ELEVATION', 'HEAD PAST RIM'],
          explanation: 'Meticulous techniques used to raise a rigid, pillar-like protein foam cylinder straight above the rim of a Collins glass.',
          clue: 'Techniques used to make a Ramos Gin Fizz rise cleanly above the glass rim.'
        },
        {
          tier: 3,
          category: 'BOTANICAL FIZZ PERFUMES',
          tierLabel: 'Structure',
          items: ['ORANGE FLOWER WATER', 'ROSE WATER SPRAY', 'LAVENDER ESSENCE', 'CARDAMOM MIST'],
          explanation: 'Delicate floral distillates dropped in minute quantities into aerated drinks to provide an uplifting floral crown.',
          clue: 'Aromatic flower waters dropped into classic fizzes.'
        },
        {
          tier: 4,
          category: 'SODA DISPENSING PRESSURE TOOLS',
          tierLabel: 'Master Lore',
          items: ['SELTZER SIPHON', 'CO2 CHARGER BULB', 'BAR GUN MANIFOLD', 'VINTAGE GLASS SIPHON'],
          explanation: 'Hardware used to carbonate and dispense pressurized seltzer water with force to mix and lift drinks.',
          clue: 'Pressurized vessels and cartridges built to blast seltzer water into drinks.'
        }
      ]
    },
    {
      id: 'specimen-28',
      title: 'Low-Proof Balance',
      subtitle: 'Sherry, Port, Vermouth & The Shim',
      groups: [
        {
          tier: 1,
          category: 'HISTORIC LOW-ABV / SHIM SIPS',
          tierLabel: 'Foundations',
          items: ['ADONIS', 'BAMBOO', 'CORONATION', 'AMERICANO'],
          explanation: 'Refined 19th-century classics constructed with fortified wines and amari without any high-proof base spirit.',
          clue: 'Gentle, low-proof classic cocktails built without 40% spirits.'
        },
        {
          tier: 2,
          category: 'VERMOUTH OXIDATION CHECKS',
          tierLabel: 'Technique',
          items: ['ARGON GAS BLANKET', 'WINE VACUUM STOPPER', 'REFRIGERATOR CELLAR', 'FOUR WEEK DISCARD'],
          explanation: 'Cellar and bar habits required to prevent delicate aromatized wine bases from becoming sour, stale, and vinegar-like.',
          clue: 'Bar practices designed to keep open vermouth bottles from oxidizing.'
        },
        {
          tier: 3,
          category: 'PORT WINE AGING CLASSIFICATIONS',
          tierLabel: 'Structure',
          items: ['RUBY PORT', 'TAWNY PORT', 'COLHEITA PORT', 'VINTAGE PORT'],
          explanation: 'Protected Portuguese fortified wines aged in wooden casks or bottles, offering sweetness and rich tannins.',
          clue: 'The traditional aging categories of Douro Valley Port wine.'
        },
        {
          tier: 4,
          category: 'AROMATIZED WINE HERBAL INGREDIENTS',
          tierLabel: 'Master Lore',
          items: ['ARTEMISIA WORMWOOD', 'CHAMOMILE FLOWER', 'CARDAMOM POD', 'CORIANDER FRUIT'],
          explanation: 'Key aromatic botanicals steeped into neutral wine mistelle to produce Italian and French vermouths.',
          clue: 'Key dried botanicals that give vermouth its complex aromatic personality.'
        }
      ]
    },
    {
      id: 'specimen-29',
      title: 'Molasses & Ferment',
      subtitle: 'Dunder Pits, Ester Spikes & Cane Juice',
      groups: [
        {
          tier: 1,
          category: 'TROPICAL RUM COCKTAIL CORNERSTONES',
          tierLabel: 'Foundations',
          items: ['PIÑA COLADA', 'MAI TAI', 'PLANTER\'S PUNCH', 'JUNGLE BIRD'],
          explanation: 'Foundational rum classics demonstrating rum\'s synergy with pineapple, lime, campari, and orgeat.',
          clue: 'Celebrated tropical drinks built to showcase regional rums.'
        },
        {
          tier: 2,
          category: 'POT STILL DISTILLATION FRACTIONS',
          tierLabel: 'Technique',
          items: ['FORESHOTS HEAD', 'HEARTS COLLECTION', 'TAILS CUT-OFF', 'RECTIFYING GOOSENECK'],
          explanation: 'The sequential fractions cut during batch distillation to isolate delicious ethanol while rejecting foul toxins.',
          clue: 'The operational cuts made during batch pot still distillation.'
        },
        {
          tier: 3,
          category: 'JAMAICAN RUM HIGHER ESTERS',
          tierLabel: 'Structure',
          items: ['ETHYL BUTYRATE', 'ETHYL ACETATE', 'ISOAMYL ACETATE', 'ETHYL HEXANOATE'],
          explanation: 'Volatile aromatic organic esters that produce the ripe banana, overripe pineapple, and funky hogo note in Jamaican rums.',
          clue: 'Chemical ester molecules that generate funk and fruit in high-ester rum.'
        },
        {
          tier: 4,
          category: 'RUM MARQUE CODES',
          tierLabel: 'Master Lore',
          items: ['DOK HIGH ESTER', 'HLCF MARQUE', 'LROK PROFILE', 'TECA DIAMOND'],
          explanation: 'Historic estate distillery codes (such as Hampden Estate) denoting specific ester concentration ranges.',
          clue: 'Distillery classification marks indicating ester funk levels in Jamaican rum.'
        }
      ]
    },
    {
      id: 'specimen-30',
      title: 'Thermal Dynamics',
      subtitle: 'Equilibrium Curves, Chilling & Water Volume',
      groups: [
        {
          tier: 1,
          category: 'SHAKEN SOUR DESIRED FINISH METRICS',
          tierLabel: 'Foundations',
          items: ['SUB-ZERO CHILL', 'TWENTY PERCENT DILUTION', 'MICRO-AIR BUBBLE HEAD', 'RAPID SURFACE FROST'],
          explanation: 'The technical sensory traits achieved when a citrus sour is shaken vigorously with dense, cold ice cubes.',
          clue: 'The physical target outcomes of a properly shaken cocktail.'
        },
        {
          tier: 2,
          category: 'STIRRING ERGONOMIC POSTURES',
          tierLabel: 'Technique',
          items: ['OUTER WALL PUSH', 'FLUID SILENT REVOLUTION', 'NO-SPLASH SWIRL', 'FINGER-PIVOT ROLL'],
          explanation: 'Hand mechanics used by skilled bartenders to revolve the teardrop spoon smoothly around a mixing glass.',
          clue: 'Spoon-handling habits that produce silent, smooth stirring revolutions.'
        },
        {
          tier: 3,
          category: 'PHYSICS OF COCKTAIL THERMODYNAMICS',
          tierLabel: 'Master Lore',
          items: ['THERMAL EQUILIBRIUM', 'DILUTION AS CONDENSATION', 'CHILLING CANNOT OCCUR WITHOUT DILUTION', 'HEAT TRANSFER RATE'],
          explanation: 'Fundamental laws of cocktail physics proven by Dave Arnold: a drink cannot chill with ice without melting water.',
          clue: 'The thermodynamic laws that link cocktail chilling with ice dilution.'
        },
        {
          tier: 4,
          category: 'MIXING GLASS GEOMETRY',
          tierLabel: 'Structure',
          items: ['SEAMLESS WALLS', 'HEAVY BASE PLINTH', 'BEVELED POUR SPOUT', 'STRAIGHT CYLINDRICAL RISE'],
          explanation: 'Physical design specifications of professional Japanese and European crystal cocktail stirring beakers.',
          clue: 'Structural design traits of heavy crystal mixing glasses.'
        }
      ]
    },
    {
      id: 'specimen-31',
      title: 'Smoke, Peat & Char',
      subtitle: 'Fire, Phenols & Lignin Breakdown',
      groups: [
        {
          tier: 1,
          category: 'NATURALLY SMOKY CLASSIC SPIRITS',
          tierLabel: 'Foundations',
          items: ['ISLAY SCOTCH', 'OAXACAN MEZCAL', 'RAUCHBIER LIQUEUR', 'PEATED IRISH WHISKEY'],
          explanation: 'Spirits whose agricultural raw materials (malt or agave) are exposed directly to peat, oak, or beechwood smoke.',
          clue: 'Spirits endowed with smoke directly from kiln or pit firing.'
        },
        {
          tier: 2,
          category: 'BAR SMOKING APPLICATION METHODS',
          tierLabel: 'Technique',
          items: ['SMOKING GUN HOSE', 'TORCHED WOOD BOARD CLOCHE', 'IN-BOTTLE SMOKE CAP', 'CHARRED CINNAMON QUILL'],
          explanation: 'Techniques used to capture combustion vapors from spices, chips, or barrel staves inside a presentation glass.',
          clue: 'Techniques used to introduce live wood smoke into cocktail glassware.'
        },
        {
          tier: 3,
          category: 'SMOKE AROMA COMPOUNDS',
          tierLabel: 'Structure',
          items: ['GUAIACOL', 'SYRINGOL', 'EUGENOL', 'CREOSOL'],
          explanation: 'Aromatic phenolic compounds generated through thermal decomposition of wood lignin during combustion.',
          clue: 'Chemical molecules responsible for woody, campfire, and medicinal smoke notes.'
        },
        {
          tier: 4,
          category: 'FLAMING DRINK PERFORMANCE RISKS',
          tierLabel: 'Master Lore',
          items: ['BLUE BLAZER PULL', 'OVERPROOF RUM FLOAT IGNITION', 'FLAMED ABSINTHE SPOON', 'VOLCANO CRATER BOWL'],
          explanation: 'Historic flaming cocktail routines that demand extreme precision to prevent burns and backbar fires.',
          clue: 'Legendary theatrical drink spectacles involving live alcohol flames.'
        }
      ]
    },
    {
      id: 'specimen-32',
      title: 'Bean & Pod',
      subtitle: 'Espresso, Cacao, Vanilla & Roasted Lipids',
      groups: [
        {
          tier: 1,
          category: 'COFFEE COCKTAIL BENCHMARKS',
          tierLabel: 'Foundations',
          items: ['ESPRESSO MARTINI', 'IRISH COFFEE', 'BLACK RUSSIAN', 'WHITE RUSSIAN'],
          explanation: 'Legendary drinks pairing dark roasted coffee, cold brew, or coffee liqueurs with rich spirits and cream.',
          clue: 'Famous cocktails celebrating the flavors of brewed coffee.'
        },
        {
          tier: 2,
          category: 'HEAVY CREAM SERVICE MANEUVERS',
          tierLabel: 'Technique',
          items: ['LIGHT SHAKE AERATION', 'WARMED BARSPOON FLOAT', 'CHILLED VISCOUS LAYER', 'COLLAR FLOAT POUR'],
          explanation: 'Techniques used to float lightly whipped double cream across the surface of a steaming Irish Coffee.',
          clue: 'Techniques used to float a soft collar of cream on top of a drink.'
        },
        {
          tier: 3,
          category: 'ROASTED BOTANICAL CORDIALS',
          tierLabel: 'Structure',
          items: ['KAHLÚA', 'TIÁ MARÍA', 'CRÈME DE CACAO', 'GALLIANO RISTRETTO'],
          explanation: 'Sweet cordials infused with roasted coffee beans, cacao nibs, or dark vanilla to add dessert complexity.',
          clue: 'Commercial dessert cordials flavored with coffee and cacao.'
        },
        {
          tier: 4,
          category: 'COFFEE EXTRACTION PHASES',
          tierLabel: 'Master Lore',
          items: ['CREMA FOAM', 'HEART EXTRACTION', 'BODY MIDDLE', 'BITTER TAIL'],
          explanation: 'The sequential liquid fractions expressed during an espresso shot pulled under 9 bars of machine pressure.',
          clue: 'The layers and phases extracted during a fresh shot of espresso.'
        }
      ]
    },
    {
      id: 'specimen-33',
      title: 'The Zero-Proof Bar',
      subtitle: 'Botanical Distillates & Non-Alcoholic Formulations',
      groups: [
        {
          tier: 1,
          category: 'NON-ALCOHOLIC SPIRIT PIONEERS',
          tierLabel: 'Foundations',
          items: ['SEEDLIP', 'LYRE\'S', 'GHIA', 'MONDAY ZERO'],
          explanation: 'Trailblazing non-alcoholic brands that formulate distilled botanicals and bitter aperitifs without ethanol.',
          clue: 'Pioneering commercial zero-proof spirit brands.'
        },
        {
          tier: 2,
          category: 'ZERO-PROOF PRESERVATION STEPS',
          tierLabel: 'Technique',
          items: ['COLD REFRIGERATION', 'POTASSIUM SORBATE DROP', 'CITRIC PRESERVATION', 'MICRO-BATCH RUN'],
          explanation: 'Methods used to protect water-based zero-proof syrups and spirits from bacterial growth without alcohol.',
          clue: 'Preservation steps required to keep non-alcoholic liquids from spoiling.'
        },
        {
          tier: 3,
          category: 'NON-ALCOHOLIC MOUTHFEEL BUILDERS',
          tierLabel: 'Structure',
          items: ['XANTHAN GUM', 'GLYCERIN DROP', 'ARABIC GUM POWDER', 'TANNIN POWDER'],
          explanation: 'Food-grade hydrocolloids and plant gums added to water-based drinks to replicate the physical body of ethanol.',
          clue: 'Textural gums used to mimic the weight and viscosity of alcohol.'
        },
        {
          tier: 4,
          category: 'HISTORIC TEMPERANCE DRINK RECIPES',
          tierLabel: 'Master Lore',
          items: ['SHIRLEY TEMPLE', 'ROY ROGERS', 'ARNOLD PALMER', 'CINDERELLA'],
          explanation: 'Classic mid-century non-alcoholic drinks formulated for family dining rooms and golf clubhouses.',
          clue: 'Famous mid-century mocktails named after celebrities and athletes.'
        }
      ]
    },
    {
      id: 'specimen-34',
      title: 'Cobblers & Swizzles',
      subtitle: 'The Julep Strain, Muddled Fruit & Crushed Ice',
      groups: [
        {
          tier: 1,
          category: 'CRUSHED ICE TALL GLASS CLASSICS',
          tierLabel: 'Foundations',
          items: ['SHERRY COBBLER', 'MINT JULEP', 'BERMUDA RUM SWIZZLE', 'QUEEN\'S PARK SWIZZLE'],
          explanation: 'Refreshing drinks filled to the brim with crushed ice, fruit decorations, and aromatized herbs.',
          clue: 'Historic drinks served over mountains of finely crushed ice.'
        },
        {
          tier: 2,
          category: 'SWIZZLE STICK TWO-HAND ROLL',
          tierLabel: 'Technique',
          items: ['PALM RUB SPIN', 'SUBMERGED PRONGS', 'FROST JACKET FORMATION', 'UPWARD TRAVEL PULL'],
          explanation: 'The physical friction motion of rolling a wooden swizzle stick between two open palms to freeze the outside of the glass.',
          clue: 'The two-handed palm friction technique used to spin a swizzle stick.'
        },
        {
          tier: 3,
          category: 'COBBLER FRESH FRUIT GARNISH CROWNS',
          tierLabel: 'Structure',
          items: ['FRESH BERRIES', 'ORANGE SLICES', 'MINT SPRIG BOUQUET', 'DUSTED POWDERED SUGAR'],
          explanation: 'The lavish visual presentation that historically defined Victorian Cobblers in 19th-century America.',
          clue: 'Lush fruit and herbal garnishes decorating the top of a cobbler.'
        },
        {
          tier: 4,
          category: 'JULEP CUP METAL ALLOYS',
          tierLabel: 'Master Lore',
          items: ['SOLID STERLING SILVER', 'PEWTER ALLOY', 'STAINLESS STEEL', 'SILVER-PLATED COPPER'],
          explanation: 'Conductive metals forged to build authentic Kentucky Derby julep cups that frost over instantly on contact with ice.',
          clue: 'Metals used to forge traditional Kentucky mint julep cups.'
        }
      ]
    },
    {
      id: 'specimen-35',
      title: 'Stemware & Senses',
      subtitle: 'Vessel Geometry, Olfactory Release & Rim Geometry',
      groups: [
        {
          tier: 1,
          category: 'UNSTEMMED COCKTAIL GLASSWARE',
          tierLabel: 'Foundations',
          items: ['DOUBLE OLD FASHIONED', 'COLLINS GLASS', 'HIGHBALL TUMBLER', 'ROCKS GLASS'],
          explanation: 'Heavy flat-bottomed glassware designed for drinks served directly over ice or built without long stems.',
          clue: 'Stemless glasses designed for drinks served on or over ice.'
        },
        {
          tier: 2,
          category: 'GLASS RIM POLISHING PRACTICES',
          tierLabel: 'Technique',
          items: ['MICROFIBER LINEN CLOTH', 'STEAM VAPOR EXPIRATION', 'BASE-ONLY HOLDING', 'NO-THUMB INTERIOR TOUCH'],
          explanation: 'Service mechanics used to polish crystal glassware to a brilliant shine without leaving fingerprints or cloth lint.',
          clue: 'Polishing habits that keep glassware spotless without smudges.'
        },
        {
          tier: 3,
          category: 'SENSORY GLASSWARE MECHANICS',
          tierLabel: 'Structure',
          items: ['CHIMNEY CONVERGENCE', 'FLARING RIM LIP', 'SURFACE AREA EXPOSURE', 'BOWL HEADSPACE'],
          explanation: 'Geometric features that control how vapor escapes, directing aromas either straight to the nose or into the room.',
          clue: 'Geometric angles of a glass that control aroma concentration.'
        },
        {
          tier: 4,
          category: 'LEAD CRYSTAL COMPOSITIONS',
          tierLabel: 'Master Lore',
          items: ['LEAD OXIDE', 'BARIUM CARBONATE', 'POTASSIUM SILICATE', 'TITANIUM DIOXIDE'],
          explanation: 'Mineral compounds blended into silica sand to produce ultra-thin, highly refractive luxury crystal glassware.',
          clue: 'Mineral elements blended to manufacture ultra-fine crystal barware.'
        }
      ]
    },
    {
      id: 'specimen-36',
      title: 'Eaux-de-Vie & Fruit Brandies',
      subtitle: 'Charentais Stills, Orangeries & Pomace',
      groups: [
        {
          tier: 1,
          category: 'DISTILLED FRUIT SPIRIT FAMILIES',
          tierLabel: 'Foundations',
          items: ['COGNAC', 'ARMAGNAC', 'CALVADOS', 'KIRSCHWASSER'],
          explanation: 'Renowned European spirits distilled directly from fermented fruit (grapes, cider apples, or cherries).',
          clue: 'Distillates born from fermented fruits rather than cereal grains.'
        },
        {
          tier: 2,
          category: 'CHARENTAIS STILL ARCHITECTURE',
          tierLabel: 'Technique',
          items: ['COPPER BOILER POT', 'ONION DOME HEAD', 'SWAN NECK PIPE', 'WINE PRE-HEATER VESSEL'],
          explanation: 'The components of the double-distillation copper pot still strictly mandated for Cognac distillation in France.',
          clue: 'The anatomical parts of the traditional Cognac copper pot still.'
        },
        {
          tier: 3,
          category: 'ITALIAN GRAPPA POMACE VARIETIES',
          tierLabel: 'Structure',
          items: ['NEBBIOLO POMACE', 'SANGIOVESE POMACE', 'MOSCATO POMACE', 'CORVINA POMACE'],
          explanation: 'Fermented grape skins, pulp, and seeds discarded from Italian winemaking and distilled into fiery grappa.',
          clue: 'Grape skin waste from famous Italian wines distilled into grappa.'
        },
        {
          tier: 4,
          category: 'COGNAC STATUTORY AGING LABELS',
          tierLabel: 'Master Lore',
          items: ['VS TWO YEARS', 'VSOP FOUR YEARS', 'XO TEN YEARS', 'XXO FOURTEEN YEARS'],
          explanation: 'Official French legal minimum barrel-aging designations verified by the BNIC for Cognac barrels.',
          clue: 'French legal aging classifications printed on Cognac labels.'
        }
      ]
    },
    {
      id: 'specimen-37',
      title: 'Yeast & Fermentation',
      subtitle: 'Saccharomyces, Wild Brett & Wash Tuns',
      groups: [
        {
          tier: 1,
          category: 'FERMENTED WASH BASES',
          tierLabel: 'Foundations',
          items: ['BARLEY WASH', 'MOLASSES MASH', 'COOKED AGAVE MOSTO', 'GRAPE MUST'],
          explanation: 'Sweet, sugary liquids ready for yeast inoculation to produce the low-proof beer or wine destined for distillation.',
          clue: 'The un-distilled alcoholic broths and beers that feed distillation stills.'
        },
        {
          tier: 2,
          category: 'FERMENTATION TEMPERATURE CHECKS',
          tierLabel: 'Technique',
          items: ['COOLING JACKET VALVE', 'BRIX ATTENUATION READ', 'YEAST CELL VIABILITY TEST', 'HYDROMETER PLUNGE'],
          explanation: 'Daily cellar protocols performed by distillers to prevent runaway fermentation heat from killing active yeast.',
          clue: 'Cellar checks used to monitor yeast health and sugar conversion.'
        },
        {
          tier: 3,
          category: 'WILD & CULTIVATED DISTILLERY MICROBES',
          tierLabel: 'Structure',
          items: ['SACCHAROMYCES CEREVISIAE', 'BRETTANOMYCES YEAST', 'LACTOBACILLUS BACTERIA', 'PICHIA ISOLATE'],
          explanation: 'Microorganisms responsible for converting sugar into ethanol and complex sour organic acids during fermentation.',
          clue: 'The yeast and bacterial species that produce alcohol and flavor.'
        },
        {
          tier: 4,
          category: 'JAMAICAN MUCK HOLE ADDITIONS',
          tierLabel: 'Master Lore',
          items: ['CANE TRASH BAGASSE', 'SPENT DISTILLERY LEES', 'DUNDER CONCENTRATE', 'FERMENTING BACTERIAL BED'],
          explanation: 'Decomposing organic cane waste used in Jamaican dunder pits to generate volatile organic acids and funk.',
          clue: 'Substances dumped into traditional Jamaican dunder muck pits.'
        }
      ]
    },
    {
      id: 'specimen-38',
      title: 'Tropical Garnishing Arts',
      subtitle: 'Banana Leaves, Flaming Shells & Orchid Logic',
      groups: [
        {
          tier: 1,
          category: 'EXOTIC TROPICAL GARNISH BASICS',
          tierLabel: 'Foundations',
          items: ['PINEAPPLE FROND', 'EDIBLE ORCHID', 'GRAPEFRUIT PEEL HALF-FLAG', 'FRESH MINT FOREST'],
          explanation: 'The flamboyant green and floral flourishes that define the visual spectacle of classic Tiki drinks.',
          clue: 'Vibrant foliage and flowers crowning tropical cocktails.'
        },
        {
          tier: 2,
          category: 'GARNISH STABILITY PINNING',
          tierLabel: 'Technique',
          items: ['BAMBOO KNOT PICK', 'COCKTAIL UMBRELLA SPEAR', 'LIME CRATER ANCHOR', 'CUBE RETAINING WEDGE'],
          explanation: 'Mechanics used to firmly anchor lavish citrus decorations, spent lime half-shells, and berries over crushed ice.',
          clue: 'Picks and anchors that prevent elaborate garnishes from tipping over.'
        },
        {
          tier: 3,
          category: 'EDIBLE FLOWER TAXONOMY',
          tierLabel: 'Structure',
          items: ['DENDROBIUM ORCHID', 'BORAGE BLOSSOM', 'NASTURTIUM FLOWER', 'VIOLA PETAL'],
          explanation: 'Non-toxic botanical blossoms safe for cocktail service that add aroma and color without imparting poison.',
          clue: 'Botanical flowers approved for food and drink presentation.'
        },
        {
          tier: 4,
          category: 'FLAMING SHELL FUEL BASES',
          tierLabel: 'Master Lore',
          items: ['CROUTON SPREAD CRATER', 'SUGAR CUBE EXTRACT SOAK', 'OVERPROOF DEMERARA 151', 'CINNAMON DUST POOF'],
          explanation: 'Combustion elements assembled inside an upturned spent lime half-shell to hold a stable fire on top of a drink.',
          clue: 'Materials used to safely fuel a floating flame inside a spent lime shell.'
        }
      ]
    },
    {
      id: 'specimen-39',
      title: 'Saline, Minerals & Umami',
      subtitle: 'Ionization, Bitterness Suppression & Flavor Pop',
      groups: [
        {
          tier: 1,
          category: 'SALT-CRUSTED COCKTAIL GLASS RIMS',
          tierLabel: 'Foundations',
          items: ['MARGARITA', 'PALOMA', 'SALTY DOG', 'MICHELADA'],
          explanation: 'Drinks classically presented with half or full rims coated in mineral salt to heighten citrus acidity.',
          clue: 'Classic cocktails served with a rim of granular salt.'
        },
        {
          tier: 2,
          category: 'SALINE DROPPER PROPORTIONS',
          tierLabel: 'Technique',
          items: ['TWENTY PERCENT SALINE SOLUTION', 'FOUR TO ONE WATER WEIGHT', 'MICRO DROPPER DOSING', 'EVEN EYE-DROPPER DISCHARGE'],
          explanation: 'The standard bar formulation for 20% saline solution: 20 grams of salt dissolved in 80 grams of pure water.',
          clue: 'The recipe and delivery system for backbar saline drops.'
        },
        {
          tier: 3,
          category: 'MINERAL SALTS USED AT THE BAR',
          tierLabel: 'Structure',
          items: ['MALDON FLAKE SALT', 'BLACK LAVA SEA SALT', 'PINK HIMALAYAN SALT', 'KOSHER COARSE SALT'],
          explanation: 'Specialty culinary salts harvested from sea flats or rock deposits chosen for grain texture and mineral crunch.',
          clue: 'Finishing salts deployed on cocktail rims for crunch and flavor.'
        },
        {
          tier: 4,
          category: 'SALT FLAVOR ENHANCEMENT SCIENCE',
          tierLabel: 'Master Lore',
          items: ['SODIUM ION RECEPTOR BLOCK', 'BITTERNESS SUPPRESSION', 'SWEETNESS AMPLIFICATION', 'SALIVARY GLAND TRIGGER'],
          explanation: 'The biological mechanism where sodium ions selectively block tongue receptors for bitterness, making sweetness and acid shine.',
          clue: 'How salt scientifically tricks taste buds into perceiving less bitterness.'
        }
      ]
    },
    {
      id: 'specimen-40',
      title: 'Volstead & The Underground',
      subtitle: 'Bathtub Gin, Rum Rows & Speakeasy Slang',
      groups: [
        {
          tier: 1,
          category: 'AUTHENTIC PROHIBITION-ERA CREATIONS',
          tierLabel: 'Foundations',
          items: ['BEE\'S KNEES', 'LAST WORD', 'SCOFFLAW', 'MARY PICKFORD'],
          explanation: 'Drinks invented between 1920 and 1933 that utilized sweet honey, maraschino, or grenadine to mask illicit spirits.',
          clue: 'Cocktails born during the American Prohibition era.'
        },
        {
          tier: 2,
          category: 'ILLICIT BATHTUB GIN RECTIFYING',
          tierLabel: 'Technique',
          items: ['INDUSTRIAL SPIRIT WASH', 'JUNIPER OIL STIRRING', 'WATER TANK DILUTION', 'CHARCOAL BED DE-DENATURING'],
          explanation: 'Crude methods deployed by speakeasy operators to blend industrial redistillate with commercial flavoring oils.',
          clue: 'Crude bootleg methods used to flavor industrial alcohol during Prohibition.'
        },
        {
          tier: 3,
          category: 'PROHIBITION EXILE BARTENDER HAUNTS',
          tierLabel: 'Structure',
          items: ['HARRY\'S NEW YORK BAR PARIS', 'EL FLORIDITA HAVANA', 'AMERICAN BAR SAVOY LONDON', 'SLOPPY JOE\'S HAVANA'],
          explanation: 'International hotel bars across Europe and Cuba that hired top American bartenders who fled the Volstead Act.',
          clue: 'Foreign bars that flourished by hiring exiled American bartenders during Prohibition.'
        },
        {
          tier: 4,
          category: 'AMERICAN PROHIBITION ENFORCEMENT TERMS',
          tierLabel: 'Master Lore',
          items: ['VOLSTEAD ACT', 'EIGHTEENTH AMENDMENT', 'RUM-RUNNING CUTTER', 'MEDICINAL WHISKEY SCRIPT'],
          explanation: 'Legal statutes and historical mechanisms that governed the ban and prescription loopholes of alcohol from 1920-1933.',
          clue: 'Official terms and laws associated with the American federal alcohol ban.'
        }
      ]
    },
    {
      id: 'specimen-41',
      title: 'Japanese Technique',
      subtitle: 'The Hard Shake, Ice Diamonds & Polished Steel',
      groups: [
        {
          tier: 1,
          category: 'JAPANESE THREE-PIECE COCKTAILS',
          tierLabel: 'Foundations',
          items: ['SIDE CAR', 'WHITE LADY', 'BAMBOO COCKTAIL', 'MILLION DOLLAR'],
          explanation: 'Classic Western recipes refined and championed by Japanese masters in Ginza bar rooms using three-piece cobbler shakers.',
          clue: 'Classics canonized in Japan\'s Ginza cocktail district.'
        },
        {
          tier: 2,
          category: 'KAZUO UYEDA HARD SHAKE MECHANICS',
          tierLabel: 'Technique',
          items: ['THREE-POINT ARC MOTION', 'WRIST SNAP TWIST', 'INTERNAL ICE ROLLING', 'CONTROLLED CORNER AERATION'],
          explanation: 'The physical, rhythmic movement developed by Kazuo Uyeda to roll ice gently within a cobbler shaker without shattering.',
          clue: 'The precision wrist and arm motions defining the Japanese Hard Shake.'
        },
        {
          tier: 3,
          category: 'JAPANESE BAR IMPLEMENT CRAFTSMANSHIP',
          tierLabel: 'Structure',
          items: ['YUKIWA COBBLER SHAKER', 'BIRDY AERATION TIN', 'HAND-TWISTED BARSPOON', 'DIAMOND-CARVED ROCKS GLASS'],
          explanation: 'Precision-engineered bar tools manufactured in Japan featuring micro-polished interiors and weighted balance.',
          clue: 'Precision steel and glass bar tools manufactured by Japanese artisans.'
        },
        {
          tier: 4,
          category: 'HAND-CARVED ICE JEWELS',
          tierLabel: 'Master Lore',
          items: ['ICE DIAMOND FACET', 'ICE SPHERE ROUNDING', 'OCTAGONAL PRISM', 'CHISELED CUBE STEP'],
          explanation: 'Sculpted forms cut directly from clear ice blocks by Japanese bartenders during service using small pairing knives.',
          clue: 'Jewel-like geometric shapes carved by hand from clear ice blocks.'
        }
      ]
    },
    {
      id: 'specimen-42',
      title: 'Modernist Chemistry',
      subtitle: 'Rotovaps, Sonicators & Refractometers',
      groups: [
        {
          tier: 1,
          category: 'MODERNIST BAR TECHNIQUE PRODUCTS',
          tierLabel: 'Foundations',
          items: ['CLARIFIED JUICE', 'ROTARY DISTILLATE', 'RAPID INFUSION', 'CARBONATED BOTTLE'],
          explanation: 'Finished modern cocktail components born from laboratory technology adapted for behind-the-bar service.',
          clue: 'High-tech liquid preparations created using modernist culinary equipment.'
        },
        {
          tier: 2,
          category: 'ROTARY EVAPORATOR CONTROLS',
          tierLabel: 'Technique',
          items: ['WATER BATH TEMPERATURE', 'VACUUM PUMP PRESSURE', 'ROTATION SPEED RPM', 'CONDENSER COIL CHILL'],
          explanation: 'Operational controls set on a laboratory rotovap to boil delicate botanicals at room temperature without burning.',
          clue: 'Operating settings adjusted on a laboratory rotary evaporator.'
        },
        {
          tier: 3,
          category: 'HIGH-PRESSURE NITROUS INFUSION',
          tierLabel: 'Structure',
          items: ['WHIPPER CANISTER', 'N2O CHARGER BULB', 'RAPID PRESSURE RELEASE', 'POROUS BOTANICAL RUPTURE'],
          explanation: 'Using a cream whipper charged with nitrous oxide to instantly force high-proof spirit into botanical plant cells.',
          clue: 'Steps involved in rapid nitrous-oxide cocktail infusion.'
        },
        {
          tier: 4,
          category: 'MODERN BAR LAB CHEMICALS',
          tierLabel: 'Master Lore',
          items: ['PECTINEX ULTRA SP-L', 'LIQUID NITROGEN', 'CALCIUM LACTATE GLUCONATE', 'SODIUM ALGINATE'],
          explanation: 'Enzymes, cryogenic fluids, and hydrocolloids used in modernist cocktail bars to clarify juices and spherify liquids.',
          clue: 'Chemical reagents and enzymes utilized in avant-garde cocktail kitchens.'
        }
      ]
    },
    {
      id: 'specimen-43',
      title: 'The Daisy Family',
      subtitle: 'Pre-Prohibition Sours with Liqueur Sweets',
      groups: [
        {
          tier: 1,
          category: 'HISTORIC DAISY ANCHOR COCKTAILS',
          tierLabel: 'Foundations',
          items: ['MARGARITA DAISY', 'BRANDY DAISY', 'GIN DAISY', 'WHISKEY DAISY'],
          explanation: 'The classic Daisy template: spirit, fresh citrus, and a modifying cordial or liqueur providing the sugar balance.',
          clue: 'Drinks stemming from the Victorian Daisy family.'
        },
        {
          tier: 2,
          category: 'CRUSTA & DAISY SUGAR EDGING',
          tierLabel: 'Technique',
          items: ['CITRUS WETTING RIM', 'GRANULAR ROLL DIP', 'CRYSTAL COLLAR SCRAPE', 'EXCESS SUGAR TAP-OFF'],
          explanation: 'The delicate physical steps required to apply an even sugar rim along the edge of a stemmed glass.',
          clue: 'The careful steps used to coat a glass rim with an even sugar crust.'
        },
        {
          tier: 3,
          category: 'DAISY CORDIAL SWEETENERS',
          tierLabel: 'Structure',
          items: ['TRIPLE SEC CURACAO', 'YELLOW CHARTREUSE', 'GRENADINE CORDIAL', 'MARASCHINO LIQUEUR'],
          explanation: 'Flavor-dense liqueurs deployed in Daisies in place of simple sugar to supply aromatic body alongside sweetness.',
          clue: 'Liqueurs used to sweeten Daisies instead of plain sugar syrup.'
        },
        {
          tier: 4,
          category: 'BRANDY CRUSTA ORIGINAL SPECS',
          tierLabel: 'Master Lore',
          items: ['ENTIRE LEMON PEEL LINING', 'SUGAR CRUSTED RIM', 'JOSEPH SANTINI 1850', 'NEW ORLEANS JEWEL SALOON'],
          explanation: 'Historical markers and specs defining the Brandy Crusta, invented by Joseph Santini in New Orleans as the ancestor of the Sidecar.',
          clue: 'Historical details and inventors behind the Brandy Crusta.'
        }
      ]
    },
    {
      id: 'specimen-44',
      title: 'Fruit Crèmes & Cordials',
      subtitle: 'Sugar Saturation, Fruit Maceration & Kirsch',
      groups: [
        {
          tier: 1,
          category: 'CLASSIC CRÈME LIQUEURS',
          tierLabel: 'Foundations',
          items: ['CRÈME DE CASSIS', 'CRÈME DE VIOLETTE', 'CRÈME DE MENTHE', 'CRÈME DE PÊCHE'],
          explanation: 'High-sugar French and European fruit and floral cordials (with no actual dairy cream) defined by deep saturation.',
          clue: 'Traditional European fruit and herb crèmes packed with sugar.'
        },
        {
          tier: 2,
          category: 'FRUIT COCKTAIL MUDDLING HABITS',
          tierLabel: 'Technique',
          items: ['BOTTOM FLAT PRESS', 'SKIN EXTRACTION CRACK', 'SEED NON-CRUSH MOVE', 'PULP JUICE RELEASE'],
          explanation: 'Muddling techniques used on fresh berries and citrus wedges to liberate fresh juices without cracking bitter seeds.',
          clue: 'Proper muddler mechanics that crush fruit flesh without pulverizing seeds.'
        },
        {
          tier: 3,
          category: 'EUROPEAN CRÈME COMPLIANCE CODES',
          tierLabel: 'Structure',
          items: ['MINIMUM 250 GRAMS SUGAR', 'ZERO DAIRY REQUISITE', 'NATURAL FRUIT MACERATION', 'NEUTRAL ALCOHOL BASE'],
          explanation: 'European Union legal statutory requirements governing what qualifies to be labeled as a genuine "Crème" liqueur.',
          clue: 'Statutory rules governing what makes a liqueur an authentic "Crème".'
        },
        {
          tier: 4,
          category: 'CANONICAL CRÈME DRINKS',
          tierLabel: 'Master Lore',
          items: ['AVIATION', 'KIR ROYALE', 'GRASSHOPPER', 'BRAMBLE'],
          explanation: 'Celebrated classic and modern-classic cocktails whose distinctive color and flavor depend upon a fruit or herb crème.',
          clue: 'Famous colorful cocktails anchored by specific crème liqueurs.'
        }
      ]
    },
    {
      id: 'specimen-45',
      title: 'Oak Chemistry & Aging',
      subtitle: 'Lignin, Vanillin, Tannins & Climate Cycling',
      groups: [
        {
          tier: 1,
          category: 'BARREL-AGED CLASSIC DRINKS',
          tierLabel: 'Foundations',
          items: ['OAK-AGED NEGRONI', 'BARREL MANHATTAN', 'SOLERA SAZERAC', 'RESTED VIEUX CARRÉ'],
          explanation: 'Stirred, spirit-forward classic cocktails that benefit from resting in small charred oak barrels to marry flavors.',
          clue: 'Classic cocktails that bartenders rest in oak casks before service.'
        },
        {
          tier: 2,
          category: 'BARREL CURING & MAINTENANCE STEPS',
          tierLabel: 'Technique',
          items: ['HOT WATER SWELLING', 'LEAK HOOP TIGHTENING', 'SPIRIT RINSE DRAIN', 'SULFUR CANDLE WICK'],
          explanation: 'Physical cooperage routines performed by bartenders to swell oak staves and prevent barrel leaks prior to filling.',
          clue: 'Maintenance steps needed to swell wood staves and seal small barrels.'
        },
        {
          tier: 3,
          category: 'OAK EXTRACTED WOOD CHEMICALS',
          tierLabel: 'Structure',
          items: ['VANILLIN', 'WOOD LACTONE', 'HYDROLYZABLE TANNIN', 'FURFURAL CARAMEL'],
          explanation: 'Chemical flavor molecules transferred directly from roasted wood staves into aging spirits over time.',
          clue: 'Flavor molecules extracted directly out of wood barrels into alcohol.'
        },
        {
          tier: 4,
          category: 'WAREHOUSE RICKHOUSE THERMODYNAMICS',
          tierLabel: 'Master Lore',
          items: ['UPPER TIER HEAT EXPANSION', 'WINTER OAK CONTRACTION', 'ANGEL\'S SHARE EVAPORATION', 'SUMMER PRESSURE INJECTION'],
          explanation: 'The seasonal expansion and contraction dynamics inside multi-story aging rickhouses that force whiskey in and out of oak.',
          clue: 'Climate dynamics inside Kentucky rickhouses that drive spirit into oak.'
        }
      ]
    }
  ];

  /* ==========================================================================
     2. SOUND SYNTHESIZER (Web Audio API)
     ========================================================================== */
  class SoundEngine {
    constructor() {
      this.ctx = null;
      this.isMuted = false;
      this.initialized = false;
    }

    init() {
      if (this.initialized) return;
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
          this.initialized = true;
        }
      } catch (e) {
        console.warn('AudioContext init bypassed:', e);
      }
    }

    toggleMute() {
      this.isMuted = !this.isMuted;
      return this.isMuted;
    }

    resumeContext() {
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
    }

    playSelect() {
      if (this.isMuted || !this.ctx) return;
      this.resumeContext();
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const now = this.ctx.currentTime;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.04);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.04);
      } catch (e) {}
    }

    playDeselect() {
      if (this.isMuted || !this.ctx) return;
      this.resumeContext();
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const now = this.ctx.currentTime;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(220, now + 0.04);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.04);
      } catch (e) {}
    }

    playNearMiss() {
      if (this.isMuted || !this.ctx) return;
      this.resumeContext();
      try {
        const notes = [440, 554.37];
        const now = this.ctx.currentTime;
        notes.forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          const start = now + idx * 0.07;
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, start);
          gain.gain.setValueAtTime(0.09, start);
          gain.gain.exponentialRampToValueAtTime(0.001, start + 0.14);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(start);
          osc.stop(start + 0.14);
        });
      } catch (e) {}
    }

    playMistake() {
      if (this.isMuted || !this.ctx) return;
      this.resumeContext();
      try {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(50, now + 0.2);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.2);
      } catch (e) {}
    }

    playSolvedGroup() {
      if (this.isMuted || !this.ctx) return;
      this.resumeContext();
      try {
        const chord = [523.25, 659.25, 783.99, 1046.5];
        const now = this.ctx.currentTime;
        chord.forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          const startTime = now + idx * 0.05;
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, startTime);
          gain.gain.setValueAtTime(0.1, startTime);
          gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.32);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(startTime);
          osc.stop(startTime + 0.32);
        });
      } catch (e) {}
    }

    playVictory() {
      if (this.isMuted || !this.ctx) return;
      this.resumeContext();
      try {
        const fanfare = [392, 523.25, 659.25, 783.99, 1046.5, 1318.5];
        const now = this.ctx.currentTime;
        fanfare.forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          const start = now + idx * 0.07;
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, start);
          gain.gain.setValueAtTime(0.12, start);
          gain.gain.exponentialRampToValueAtTime(0.001, start + 0.45);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(start);
          osc.stop(start + 0.45);
        });
      } catch (e) {}
    }
  }

  /* ==========================================================================
     3. PERSISTENCE STORAGE LAYER
     ========================================================================== */
  class GameStorage {
    constructor() {
      this.STORAGE_KEY = 'bar_connections_v3';
      this.data = this.load();
    }

    load() {
      const defaultState = {
        version: 3,
        played: 0,
        wins: 0,
        currentStreak: 0,
        maxStreak: 0,
        lastDailyDate: null,
        dailyCompleted: false,
        dailyResult: null,
        shiftRecords: {},
        codexUnlocked: {},
        guessDist: { '0': 0, '1': 0, '2': 0, '3': 0 },
        soundMuted: false,
        activeSession: null
      };

      try {
        const raw = localStorage.getItem(this.STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          return { ...defaultState, ...parsed };
        }
      } catch (e) {
        console.warn('Storage read fallback:', e);
      }
      return defaultState;
    }

    save() {
      try {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
      } catch (e) {
        console.warn('Storage write failed:', e);
      }
    }

    saveActiveSession(sessionData) {
      this.data.activeSession = sessionData;
      this.save();
    }

    clearActiveSession() {
      this.data.activeSession = null;
      this.save();
    }

    recordWin(puzzleId, mistakesUsed, isDaily, groups) {
      this.data.played += 1;
      this.data.wins += 1;
      this.data.currentStreak += 1;
      if (this.data.currentStreak > this.data.maxStreak) {
        this.data.maxStreak = this.data.currentStreak;
      }

      const key = String(mistakesUsed);
      if (this.data.guessDist[key] !== undefined) {
        this.data.guessDist[key] += 1;
      }

      const todayStr = new Date().toISOString().slice(0, 10);
      if (isDaily) {
        this.data.lastDailyDate = todayStr;
        this.data.dailyCompleted = true;
        this.data.dailyResult = { won: true, mistakesUsed, timestamp: Date.now() };
      }

      this.data.shiftRecords[puzzleId] = {
        status: 'won',
        mistakesUsed: mistakesUsed,
        timestamp: Date.now()
      };

      groups.forEach(g => {
        this.data.codexUnlocked[g.category] = {
          tier: g.tier,
          tierLabel: g.tierLabel,
          items: g.items,
          explanation: g.explanation,
          unlockedAt: Date.now()
        };
      });

      this.clearActiveSession();
    }

    recordLoss(puzzleId, isDaily, groups) {
      this.data.played += 1;
      this.data.currentStreak = 0;

      const todayStr = new Date().toISOString().slice(0, 10);
      if (isDaily) {
        this.data.lastDailyDate = todayStr;
        this.data.dailyCompleted = true;
        this.data.dailyResult = { won: false, mistakesUsed: 4, timestamp: Date.now() };
      }

      this.data.shiftRecords[puzzleId] = {
        status: 'lost',
        mistakesUsed: 4,
        timestamp: Date.now()
      };

      groups.forEach(g => {
        this.data.codexUnlocked[g.category] = {
          tier: g.tier,
          tierLabel: g.tierLabel,
          items: g.items,
          explanation: g.explanation,
          unlockedAt: Date.now()
        };
      });

      this.clearActiveSession();
    }
  }

  /* ==========================================================================
     4. GAME ENGINE CONTROLLER
     ========================================================================== */
  class BarConnectionsGame {
    constructor() {
      this.sound = new SoundEngine();
      this.storage = new GameStorage();

      this.currentPuzzle = null;
      this.isDailyMode = true;
      this.remainingCards = [];
      this.selectedCards = [];
      this.solvedGroups = [];
      this.mistakesRemaining = 4;
      this.maxMistakes = 4;
      this.isGameOver = false;
      this.historyGuesses = [];
      this.hintsUsed = 0;
      this.hintIndex = 0;
      this.previousView = 'menu-view';

      this.cacheDOMElements();
      this.bindEvents();
      this.syncDailyStatusOnHub();
      this.checkAndRestoreSession();
    }

    cacheDOMElements() {
      this.dom = {
        btnHomeMenu: document.getElementById('btn-home-menu'),
        btnSound: document.getElementById('btn-sound'),
        soundOnIcon: document.querySelector('.sound-on-icon'),
        soundOffIcon: document.querySelector('.sound-off-icon'),
        btnHowToPlay: document.getElementById('btn-how-to-play'),
        btnStats: document.getElementById('btn-stats'),
        btnCodex: document.getElementById('btn-codex'),

        menuView: document.getElementById('menu-view'),
        gameView: document.getElementById('game-view'),
        archiveView: document.getElementById('archive-view'),
        codexView: document.getElementById('codex-view'),

        menuBtnDaily: document.getElementById('menu-btn-daily'),
        dailyCardTag: document.getElementById('daily-card-tag'),
        dailyCardTitle: document.getElementById('daily-card-title'),
        dailyCardSub: document.getElementById('daily-card-sub'),
        menuBtnArchive: document.getElementById('menu-btn-archive'),
        archiveCardSub: document.getElementById('archive-card-sub'),
        menuBtnCodex: document.getElementById('menu-btn-codex'),
        codexCardSub: document.getElementById('codex-card-sub'),

        btnBackToOrigin: document.getElementById('btn-back-to-origin'),
        backDestinationLabel: document.getElementById('back-destination-label'),
        puzzleBadge: document.getElementById('puzzle-badge'),
        puzzleTitle: document.getElementById('puzzle-title'),
        puzzleSubtitle: document.getElementById('puzzle-subtitle'),
        mistakesIndicator: document.getElementById('mistakes-indicator'),
        toastContainer: document.getElementById('toast-container'),

        solvedGroupsContainer: document.getElementById('solved-groups-container'),
        cardsGrid: document.getElementById('cards-grid'),

        btnShuffle: document.getElementById('btn-shuffle'),
        btnDeselect: document.getElementById('btn-deselect'),
        btnHint: document.getElementById('btn-hint'),
        btnSubmit: document.getElementById('btn-submit'),

        archiveList: document.getElementById('archive-list'),
        archiveMasteryBadge: document.getElementById('archive-mastery-badge'),
        codexGrid: document.getElementById('codex-grid'),
        codexFilters: document.getElementById('codex-filters'),
        codexProgressBadge: document.getElementById('codex-progress-badge'),
        modalOverlay: document.getElementById('modal-overlay'),

        modalHowToPlay: document.getElementById('modal-how-to-play'),
        modalStats: document.getElementById('modal-stats'),
        modalGameOver: document.getElementById('modal-game-over'),
        modalClue: document.getElementById('modal-clue'),
        clueModalText: document.getElementById('clue-modal-text'),
        modalLoreDetail: document.getElementById('modal-lore-detail'),
        loreModalTier: document.getElementById('lore-modal-tier'),
        loreModalTitle: document.getElementById('lore-modal-title'),
        loreModalItems: document.getElementById('lore-modal-items'),
        loreModalDesc: document.getElementById('lore-modal-desc'),

        statPlayed: document.getElementById('stat-played'),
        statWinRate: document.getElementById('stat-win-rate'),
        statCurrentStreak: document.getElementById('stat-current-streak'),
        statMaxStreak: document.getElementById('stat-max-streak'),
        statRank: document.getElementById('stat-rank'),
        statRankDesc: document.getElementById('stat-rank-desc'),
        guessDistGraph: document.getElementById('guess-distribution-graph'),

        verdictRank: document.getElementById('verdict-rank'),
        verdictHeadline: document.getElementById('verdict-headline'),
        verdictSub: document.getElementById('verdict-sub'),
        gameOverCategories: document.getElementById('game-over-categories'),
        btnNextShift: document.getElementById('btn-next-shift'),
        btnShare: document.getElementById('btn-share'),
        btnReplayShift: document.getElementById('btn-replay-shift'),
        btnReviewCodex: document.getElementById('btn-review-codex'),
        btnReturnMenuFromGameOver: document.getElementById('btn-return-menu-from-gameover')
      };

      if (this.storage.data.soundMuted) {
        this.sound.isMuted = true;
        this.dom.soundOnIcon.classList.add('hidden');
        this.dom.soundOffIcon.classList.remove('hidden');
        this.dom.btnSound.setAttribute('aria-pressed', 'true');
        this.dom.btnSound.setAttribute('aria-label', 'Unmute Sound');
      }
    }

    bindEvents() {
      const unlockAudio = () => {
        this.sound.init();
        window.removeEventListener('click', unlockAudio);
        window.removeEventListener('touchstart', unlockAudio);
      };
      window.addEventListener('click', unlockAudio, { once: true });
      window.addEventListener('touchstart', unlockAudio, { once: true });

      this.dom.btnSound.addEventListener('click', () => {
        const muted = this.sound.toggleMute();
        this.storage.data.soundMuted = muted;
        this.storage.save();
        this.dom.soundOnIcon.classList.toggle('hidden', muted);
        this.dom.soundOffIcon.classList.toggle('hidden', !muted);
        this.dom.btnSound.setAttribute('aria-pressed', muted ? 'true' : 'false');
        this.dom.btnSound.setAttribute('aria-label', muted ? 'Unmute Sound' : 'Mute Sound');
      });

      this.dom.btnHomeMenu.addEventListener('click', () => {
        this.showMenuView();
      });

      this.dom.btnBackToOrigin.addEventListener('click', () => {
        if (this.previousView === 'archive-view') {
          this.openArchiveView();
        } else {
          this.showMenuView();
        }
      });

      this.dom.menuBtnDaily.addEventListener('click', () => {
        this.previousView = 'menu-view';
        this.initDailyPuzzle();
      });

      this.dom.menuBtnArchive.addEventListener('click', () => {
        this.openArchiveView();
      });

      this.dom.menuBtnCodex.addEventListener('click', () => {
        this.openCodexView();
      });

      this.dom.btnHowToPlay.addEventListener('click', () => this.openModal(this.dom.modalHowToPlay));
      
      this.dom.btnStats.addEventListener('click', () => {
        this.renderStats();
        this.openModal(this.dom.modalStats);
      });

      this.dom.btnCodex.addEventListener('click', () => {
        this.openCodexView();
      });

      document.querySelectorAll('[data-close-modal]').forEach(btn => {
        btn.addEventListener('click', () => this.closeAllModals());
      });

      document.querySelectorAll('.close-panel-btn, .panel-back-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const panelId = btn.getAttribute('data-close');
          const panel = document.getElementById(panelId);
          if (panel) {
            panel.classList.add('hidden');
            panel.setAttribute('aria-hidden', 'true');
          }
          this.syncDailyStatusOnHub();
        });
      });

      this.dom.modalOverlay.addEventListener('click', () => this.closeAllModals());

      this.dom.btnShuffle.addEventListener('click', () => this.shuffleCards());
      this.dom.btnDeselect.addEventListener('click', () => this.deselectAllCards());
      this.dom.btnHint.addEventListener('click', () => this.requestBartenderHint());
      this.dom.btnSubmit.addEventListener('click', () => this.submitGuess());

      this.dom.btnNextShift.addEventListener('click', () => this.advanceToNextShift());
      this.dom.btnShare.addEventListener('click', () => this.shareResults());
      this.dom.btnReplayShift.addEventListener('click', () => {
        this.closeAllModals();
        this.loadPuzzle(this.currentPuzzle, this.isDailyMode, true);
      });
      this.dom.btnReviewCodex.addEventListener('click', () => {
        this.closeAllModals();
        this.openCodexView();
      });
      this.dom.btnReturnMenuFromGameOver.addEventListener('click', () => {
        this.closeAllModals();
        this.showMenuView();
      });

      this.dom.codexFilters.addEventListener('click', (e) => {
        const pill = e.target.closest('.filter-pill');
        if (!pill) return;
        this.dom.codexFilters.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.renderCodex(pill.getAttribute('data-filter'));
      });

      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.closeAllModals();
          this.dom.archiveView.classList.add('hidden');
          this.dom.archiveView.setAttribute('aria-hidden', 'true');
          this.dom.codexView.classList.add('hidden');
          this.dom.codexView.setAttribute('aria-hidden', 'true');
        } else if (!this.dom.gameView.classList.contains('hidden') && !this.isGameOver) {
          this.handleGridKeyboardNav(e);
        }
      });
    }

    showMenuView() {
      this.dom.gameView.classList.add('hidden');
      this.dom.gameView.setAttribute('aria-hidden', 'true');
      this.dom.archiveView.classList.add('hidden');
      this.dom.archiveView.setAttribute('aria-hidden', 'true');
      this.dom.codexView.classList.add('hidden');
      this.dom.codexView.setAttribute('aria-hidden', 'true');

      this.dom.menuView.classList.remove('hidden');
      this.dom.menuView.setAttribute('aria-hidden', 'false');
      this.closeAllModals();
      this.syncDailyStatusOnHub();
    }

    showGameView(fromView = 'menu-view') {
      this.previousView = fromView;
      this.dom.backDestinationLabel.textContent = fromView === 'archive-view' ? 'Cellar' : 'Menu';
      
      this.dom.menuView.classList.add('hidden');
      this.dom.menuView.setAttribute('aria-hidden', 'true');
      this.dom.archiveView.classList.add('hidden');
      this.dom.archiveView.setAttribute('aria-hidden', 'true');
      this.dom.codexView.classList.add('hidden');
      this.dom.codexView.setAttribute('aria-hidden', 'true');

      this.dom.gameView.classList.remove('hidden');
      this.dom.gameView.setAttribute('aria-hidden', 'false');
    }

    openArchiveView() {
      this.renderArchive();
      this.dom.archiveView.classList.remove('hidden');
      this.dom.archiveView.setAttribute('aria-hidden', 'false');
    }

    openCodexView() {
      this.renderCodex();
      this.dom.codexView.classList.remove('hidden');
      this.dom.codexView.setAttribute('aria-hidden', 'false');
    }

    syncDailyStatusOnHub() {
      const todayStr = new Date().toISOString().slice(0, 10);
      const isDailyCompletedToday = (this.storage.data.lastDailyDate === todayStr && this.storage.data.dailyCompleted);
      const activeSession = this.storage.data.activeSession;

      if (activeSession && activeSession.isDaily && !activeSession.isGameOver) {
        this.dom.dailyCardTag.textContent = 'SHIFT IN PROGRESS';
        this.dom.dailyCardTitle.textContent = 'Resume Today\'s Service';
        this.dom.dailyCardSub.textContent = `Chances remaining: ${activeSession.mistakesRemaining} • Solved: ${activeSession.solvedGroupCategories.length}/4`;
      } else if (isDailyCompletedToday) {
        const res = this.storage.data.dailyResult;
        this.dom.dailyCardTag.textContent = 'SERVICE CONCLUDED';
        this.dom.dailyCardTitle.textContent = res && res.won ? 'Shift Mastered' : 'Shift Spilled';
        this.dom.dailyCardSub.textContent = `Completed for ${todayStr}. Tap to review specs or replay.`;
      } else {
        this.dom.dailyCardTag.textContent = 'TODAY\'S SERVICE';
        this.dom.dailyCardTitle.textContent = 'Daily Shift Specimen';
        this.dom.dailyCardSub.textContent = 'Curated daily challenge for professional mixologists.';
      }

      const masteredCount = Object.values(this.storage.data.shiftRecords).filter(r => r.status === 'won').length;
      this.dom.archiveCardSub.textContent = `${PUZZLE_DATABASE.length} Curated Shifts • ${masteredCount}/${PUZZLE_DATABASE.length} Mastered`;
      const unlockedSpecs = Object.keys(this.storage.data.codexUnlocked).length;
      const totalSpecs = PUZZLE_DATABASE.reduce((sum, puzzle) => sum + puzzle.groups.length, 0);
      this.dom.codexCardSub.textContent = `Knowledge Vault • ${unlockedSpecs}/${totalSpecs} Specs Decoded`;
    }

    checkAndRestoreSession() {
      const session = this.storage.data.activeSession;
      if (session && !session.isGameOver && session.puzzleId) {
        const puzzle = PUZZLE_DATABASE.find(p => p.id === session.puzzleId);
        if (puzzle) {
          this.restoreActiveSession(puzzle, session);
          return;
        }
      }
      this.showMenuView();
    }

    getDailyPuzzleForToday() {
      const now = new Date();
      const startOfYear = new Date(now.getFullYear(), 0, 0);
      const diff = now - startOfYear;
      const oneDay = 1000 * 60 * 60 * 24;
      const dayOfYear = Math.floor(diff / oneDay);
      const puzzleIndex = dayOfYear % PUZZLE_DATABASE.length;
      return PUZZLE_DATABASE[puzzleIndex];
    }

    initDailyPuzzle() {
      const dailyPuzzle = this.getDailyPuzzleForToday();
      const session = this.storage.data.activeSession;

      if (session && session.puzzleId === dailyPuzzle.id && !session.isGameOver) {
        this.restoreActiveSession(dailyPuzzle, session);
      } else {
        this.loadPuzzle(dailyPuzzle, true, false);
      }
      this.showGameView('menu-view');
    }

    loadPuzzle(puzzle, isDaily = false, forceFresh = false) {
      this.currentPuzzle = puzzle;
      this.isDailyMode = isDaily;
      this.selectedCards = [];
      this.solvedGroups = [];
      this.mistakesRemaining = this.maxMistakes;
      this.isGameOver = false;
      this.historyGuesses = [];
      this.hintsUsed = 0;
      this.hintIndex = 0;

      this.dom.puzzleBadge.textContent = isDaily ? 'DAILY SHIFT SPECIMEN' : `CELLAR SHIFT #${PUZZLE_DATABASE.findIndex(p => p.id === puzzle.id) + 1}`;
      this.dom.puzzleTitle.textContent = puzzle.title;
      this.dom.puzzleSubtitle.textContent = puzzle.subtitle;

      let allItems = [];
      puzzle.groups.forEach(group => {
        allItems.push(...group.items);
      });
      this.remainingCards = this.shuffleArray([...allItems]);

      this.renderMistakes();
      this.renderSolvedGroups();
      this.renderCardsGrid();
      this.updateActionButtons();

      if (!forceFresh) {
        this.persistActiveSession();
      }
    }

    restoreActiveSession(puzzle, session) {
      this.currentPuzzle = puzzle;
      this.isDailyMode = Boolean(session.isDaily);
      this.remainingCards = [...session.remainingCards];
      this.selectedCards = [...(session.selectedCards || [])];
      this.mistakesRemaining = session.mistakesRemaining !== undefined ? session.mistakesRemaining : 4;
      this.historyGuesses = session.historyGuesses || [];
      this.hintsUsed = session.hintsUsed || 0;
      this.hintIndex = session.hintIndex || 0;
      this.isGameOver = false;

      this.solvedGroups = [];
      if (Array.isArray(session.solvedGroupCategories)) {
        session.solvedGroupCategories.forEach(catName => {
          const matched = puzzle.groups.find(g => g.category === catName);
          if (matched) this.solvedGroups.push(matched);
        });
      }

      this.dom.puzzleBadge.textContent = this.isDailyMode ? 'DAILY SHIFT SPECIMEN' : `CELLAR SHIFT #${PUZZLE_DATABASE.findIndex(p => p.id === puzzle.id) + 1}`;
      this.dom.puzzleTitle.textContent = puzzle.title;
      this.dom.puzzleSubtitle.textContent = puzzle.subtitle;

      this.renderMistakes();
      this.renderSolvedGroups();
      this.renderCardsGrid();
      this.updateActionButtons();
      this.showGameView('menu-view');
      this.showToast('Resumed active shift station.');
    }

    persistActiveSession() {
      if (this.isGameOver || !this.currentPuzzle) return;

      this.storage.saveActiveSession({
        puzzleId: this.currentPuzzle.id,
        isDaily: this.isDailyMode,
        remainingCards: this.remainingCards,
        selectedCards: this.selectedCards,
        solvedGroupCategories: this.solvedGroups.map(g => g.category),
        mistakesRemaining: this.mistakesRemaining,
        historyGuesses: this.historyGuesses,
        hintsUsed: this.hintsUsed,
        hintIndex: this.hintIndex,
        isGameOver: false,
        timestamp: Date.now()
      });
    }

    shuffleArray(array) {
      const copy = [...array];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    }

    renderMistakes() {
      this.dom.mistakesIndicator.innerHTML = '';
      for (let i = 0; i < this.maxMistakes; i++) {
        const pip = document.createElement('span');
        pip.className = 'pip';
        if (i >= this.mistakesRemaining) {
          pip.classList.add('lost');
        }
        pip.setAttribute('title', `Chance ${i + 1}`);
        this.dom.mistakesIndicator.appendChild(pip);
      }
    }

    renderSolvedGroups() {
      this.dom.solvedGroupsContainer.innerHTML = '';
      this.solvedGroups.forEach(group => {
        const banner = document.createElement('div');
        banner.className = `solved-banner tier-${group.tier}`;
        banner.setAttribute('tabindex', '0');
        banner.setAttribute('role', 'button');
        banner.setAttribute('aria-label', `View details for solved group: ${group.category}`);
        
        banner.innerHTML = `
          <div class="solved-header-row">
            <span class="solved-tier-badge">${this.escapeHTML(group.tierLabel)}</span>
            <span class="solved-view-lore-hint" aria-hidden="true">Spec Details →</span>
          </div>
          <h3 class="solved-group-title">${this.escapeHTML(group.category)}</h3>
          <p class="solved-items-list">${this.escapeHTML(group.items.join(' • '))}</p>
        `;

        banner.addEventListener('click', () => this.openLoreDetailModal(group));
        banner.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.openLoreDetailModal(group);
          }
        });

        this.dom.solvedGroupsContainer.appendChild(banner);
      });
    }

    renderCardsGrid() {
      this.dom.cardsGrid.innerHTML = '';
      this.remainingCards.forEach((item, index) => {
        const tile = document.createElement('button');
        tile.className = 'card-tile';
        tile.setAttribute('type', 'button');
        tile.setAttribute('data-card', item);
        tile.setAttribute('data-index', index);
        tile.setAttribute('role', 'gridcell');

        const isSelected = this.selectedCards.includes(item);
        tile.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
        tile.setAttribute('tabindex', '0');
        
        if (isSelected) {
          tile.classList.add('selected');
        }

        tile.innerHTML = `<span class="card-text">${this.escapeHTML(item)}</span>`;
        tile.addEventListener('click', () => this.handleCardTap(item, tile));
        this.dom.cardsGrid.appendChild(tile);
      });
    }

    handleCardTap(item, tileElement) {
      if (this.isGameOver) return;

      const idx = this.selectedCards.indexOf(item);
      if (idx > -1) {
        this.selectedCards.splice(idx, 1);
        tileElement.classList.remove('selected');
        tileElement.setAttribute('aria-pressed', 'false');
        this.sound.playDeselect();
      } else {
        if (this.selectedCards.length >= 4) {
          this.showToast('Select 4 cards maximum.');
          this.sound.playDeselect();
          return;
        }
        this.selectedCards.push(item);
        tileElement.classList.add('selected');
        tileElement.setAttribute('aria-pressed', 'true');
        this.sound.playSelect();
      }

      this.updateActionButtons();
      this.persistActiveSession();
    }

    handleGridKeyboardNav(e) {
      const activeElement = document.activeElement;
      if (!activeElement || !activeElement.classList.contains('card-tile')) return;

      const tiles = Array.from(this.dom.cardsGrid.querySelectorAll('.card-tile'));
      const currentIndex = tiles.indexOf(activeElement);
      if (currentIndex === -1) return;

      let targetIndex = -1;
      const cols = 4;

      switch (e.key) {
        case 'ArrowRight':
          if (currentIndex < tiles.length - 1) targetIndex = currentIndex + 1;
          break;
        case 'ArrowLeft':
          if (currentIndex > 0) targetIndex = currentIndex - 1;
          break;
        case 'ArrowDown':
          if (currentIndex + cols < tiles.length) targetIndex = currentIndex + cols;
          break;
        case 'ArrowUp':
          if (currentIndex - cols >= 0) targetIndex = currentIndex - cols;
          break;
        default:
          return;
      }

      if (targetIndex !== -1 && tiles[targetIndex]) {
        e.preventDefault();
        tiles[targetIndex].focus();
      }
    }

    updateActionButtons() {
      const count = this.selectedCards.length;
      this.dom.btnSubmit.disabled = count !== 4 || this.isGameOver;
      this.dom.btnDeselect.disabled = count === 0 || this.isGameOver;
    }

    deselectAllCards() {
      if (this.selectedCards.length === 0) return;
      this.selectedCards = [];
      this.dom.cardsGrid.querySelectorAll('.card-tile').forEach(t => {
        t.classList.remove('selected');
        t.setAttribute('aria-pressed', 'false');
      });
      this.sound.playDeselect();
      this.updateActionButtons();
      this.persistActiveSession();
    }

    shuffleCards() {
      if (this.remainingCards.length <= 1) return;
      this.remainingCards = this.shuffleArray(this.remainingCards);
      this.sound.playSelect();
      this.renderCardsGrid();
      this.persistActiveSession();
    }

    requestBartenderHint() {
      if (this.isGameOver) return;

      const unsolved = this.currentPuzzle.groups.filter(g => 
        !this.solvedGroups.some(sg => sg.category === g.category)
      );

      if (unsolved.length === 0) return;

      const target = unsolved[this.hintIndex % unsolved.length];
      this.hintIndex++;
      this.hintsUsed++;

      this.dom.clueModalText.textContent = target.clue;
      this.sound.playNearMiss();
      this.openModal(this.dom.modalClue);
      this.persistActiveSession();
    }

    openLoreDetailModal(group) {
      this.dom.loreModalTier.textContent = group.tierLabel;
      this.dom.loreModalTier.className = `solved-tier-badge tier-${group.tier}`;
      this.dom.loreModalTitle.textContent = group.category;
      this.dom.loreModalItems.textContent = group.items.join(' • ');
      this.dom.loreModalDesc.textContent = group.explanation;
      this.openModal(this.dom.modalLoreDetail);
    }

    submitGuess() {
      if (this.selectedCards.length !== 4 || this.isGameOver) return;

      const signature = [...this.selectedCards].sort().join('|');
      if (this.historyGuesses.includes(signature)) {
        this.showToast('Combination already attempted!');
        this.sound.playDeselect();
        this.shakeSelectedTiles();
        return;
      }
      this.historyGuesses.push(signature);

      let matchedGroup = null;
      let nearMissGroup = null;

      for (const group of this.currentPuzzle.groups) {
        if (this.solvedGroups.some(sg => sg.category === group.category)) continue;

        let matchCount = 0;
        for (const card of this.selectedCards) {
          if (group.items.includes(card)) {
            matchCount++;
          }
        }

        if (matchCount === 4) {
          matchedGroup = group;
          break;
        } else if (matchCount === 3) {
          nearMissGroup = group;
        }
      }

      if (matchedGroup) {
        this.handleCorrectGuess(matchedGroup);
      } else {
        this.handleIncorrectGuess(nearMissGroup);
      }
    }

    handleCorrectGuess(group) {
      this.sound.playSolvedGroup();
      this.solvedGroups.push(group);

      const selectedTiles = this.dom.cardsGrid.querySelectorAll('.card-tile.selected');
      selectedTiles.forEach(tile => tile.classList.add('pop-out'));

      setTimeout(() => {
        this.remainingCards = this.remainingCards.filter(c => !group.items.includes(c));
        this.selectedCards = [];
        this.renderSolvedGroups();
        this.renderCardsGrid();
        this.updateActionButtons();

        if (this.solvedGroups.length === 4) {
          this.handleVictory();
        } else {
          this.persistActiveSession();
        }
      }, 300);
    }

    handleIncorrectGuess(nearMissGroup) {
      this.mistakesRemaining -= 1;
      this.renderMistakes();
      this.shakeSelectedTiles();

      if (nearMissGroup) {
        this.sound.playNearMiss();
        this.showToast('One away! 3 of 4 match.');
      } else {
        this.sound.playMistake();
        this.showToast('No matching spec. Watch for distractors.');
      }

      this.persistActiveSession();

      if (this.mistakesRemaining <= 0) {
        setTimeout(() => this.handleDefeat(), 500);
      }
    }

    shakeSelectedTiles() {
      const selected = this.dom.cardsGrid.querySelectorAll('.card-tile.selected');
      selected.forEach(t => {
        t.classList.add('shake');
        setTimeout(() => t.classList.remove('shake'), 360);
      });
    }

    handleVictory() {
      this.isGameOver = true;
      this.sound.playVictory();

      const mistakesUsed = this.maxMistakes - this.mistakesRemaining;
      this.storage.recordWin(this.currentPuzzle.id, mistakesUsed, this.isDailyMode, this.currentPuzzle.groups);

      setTimeout(() => {
        const headlines = ['FLAWLESS POUR', 'EXCELLENT BALANCE', 'SOLID SHIFT', 'SAVED AT LAST CALL'];
        const ranks = ['Clean Sweep', 'Expert Mixologist', 'Senior Bartender', 'Shift Survivor'];

        this.dom.verdictRank.textContent = ranks[mistakesUsed] || 'Shift Completed';
        this.dom.verdictHeadline.textContent = headlines[mistakesUsed] || 'Service Concluded';
        this.dom.verdictSub.textContent = mistakesUsed === 0
          ? 'Zero mistakes. Unrivaled recipe recall and station precision.'
          : `Shift mastered with ${mistakesUsed} spilled chance${mistakesUsed > 1 ? 's' : ''}.`;

        this.renderGameOverCategories();
        this.openModal(this.dom.modalGameOver);
        this.syncDailyStatusOnHub();
      }, 420);
    }

    handleDefeat() {
      this.isGameOver = true;
      this.sound.playMistake();
      this.storage.recordLoss(this.currentPuzzle.id, this.isDailyMode, this.currentPuzzle.groups);

      this.solvedGroups = [...this.currentPuzzle.groups];
      this.remainingCards = [];
      this.renderSolvedGroups();
      this.renderCardsGrid();

      this.dom.verdictRank.textContent = 'STATION OVERWHELMED';
      this.dom.verdictHeadline.textContent = 'Shift Spilled';
      this.dom.verdictSub.textContent = 'Every error refines your instincts. Review the house specs:';

      this.renderGameOverCategories();
      this.openModal(this.dom.modalGameOver);
      this.syncDailyStatusOnHub();
    }

    renderGameOverCategories() {
      this.dom.gameOverCategories.innerHTML = '';
      this.currentPuzzle.groups.forEach(g => {
        const card = document.createElement('div');
        card.className = `solved-banner tier-${g.tier}`;
        card.innerHTML = `
          <div class="solved-header-row">
            <span class="solved-tier-badge">${this.escapeHTML(g.tierLabel)}</span>
          </div>
          <h4 class="solved-group-title">${this.escapeHTML(g.category)}</h4>
          <p class="solved-items-list">${this.escapeHTML(g.items.join(' • '))}</p>
        `;
        this.dom.gameOverCategories.appendChild(card);
      });
    }

    advanceToNextShift() {
      this.closeAllModals();
      const currentIndex = PUZZLE_DATABASE.findIndex(p => p.id === this.currentPuzzle.id);
      const nextIndex = (currentIndex + 1) % PUZZLE_DATABASE.length;
      const nextPuzzle = PUZZLE_DATABASE[nextIndex];
      this.loadPuzzle(nextPuzzle, false, true);
      this.showGameView('archive-view');
    }

    shareResults() {
      const mistakesUsed = this.maxMistakes - this.mistakesRemaining;
      const tierEmojis = { 1: '🟨', 2: '🟩', 3: '🟧', 4: '🟪' };
      
      let grid = '';
      this.currentPuzzle.groups.forEach(g => {
        grid += (tierEmojis[g.tier] || '🍸').repeat(4) + '\n';
      });

      const text = `Bar Connections 🍸\n${this.currentPuzzle.title}\nResult: ${mistakesUsed}/4 Mistakes\n\n${grid}Test your bar instincts: https://tileworksgamesstudio.github.io/86/`;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          this.showToast('Shift ticket copied!');
        }).catch(() => {
          this.showToast('Clipboard copy unavailable.');
        });
      } else {
        this.showToast('Clipboard not supported.');
      }
    }

    renderArchive() {
      this.dom.archiveList.innerHTML = '';
      const masteredCount = Object.values(this.storage.data.shiftRecords).filter(r => r.status === 'won').length;
      this.dom.archiveMasteryBadge.textContent = `${masteredCount} / ${PUZZLE_DATABASE.length} Mastered`;

      const activeSession = this.storage.data.activeSession;

      PUZZLE_DATABASE.forEach((puzzle, idx) => {
        const record = this.storage.data.shiftRecords[puzzle.id];
        const isActiveThisShift = activeSession && activeSession.puzzleId === puzzle.id && !activeSession.isGameOver;

        const card = document.createElement('div');
        card.className = 'archive-shift-card';
        card.setAttribute('role', 'listitem');
        card.setAttribute('tabindex', '0');

        let statusHTML = '';
        if (isActiveThisShift) {
          statusHTML = '<span class="archive-status-badge in-progress">In Progress</span>';
        } else if (record) {
          if (record.status === 'won') {
            statusHTML = `<span class="archive-status-badge completed">Mastered (${record.mistakesUsed} err)</span>`;
          } else {
            statusHTML = '<span class="archive-status-badge failed">Spilled</span>';
          }
        } else {
          statusHTML = '<span class="archive-status-badge">Open Shift</span>';
        }

        card.innerHTML = `
          <div class="archive-card-meta">
            <span class="archive-num">SHIFT #${idx + 1}</span>
            <h3 class="archive-name">${this.escapeHTML(puzzle.title)}</h3>
            <p class="archive-sub">${this.escapeHTML(puzzle.subtitle)}</p>
          </div>
          ${statusHTML}
        `;

        const selectShift = () => {
          this.dom.archiveView.classList.add('hidden');
          this.dom.archiveView.setAttribute('aria-hidden', 'true');

          if (isActiveThisShift) {
            this.restoreActiveSession(puzzle, activeSession);
          } else {
            this.loadPuzzle(puzzle, false, true);
          }
          this.showGameView('archive-view');
        };

        card.addEventListener('click', selectShift);
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            selectShift();
          }
        });

        this.dom.archiveList.appendChild(card);
      });
    }

    renderCodex(filter = 'all') {
      const unlocked = this.storage.data.codexUnlocked;
      const totalDisciplines = PUZZLE_DATABASE.reduce((sum, p) => sum + p.groups.length, 0);
      const unlockedCount = Object.keys(unlocked).length;

      this.dom.codexProgressBadge.textContent = `${unlockedCount} / ${totalDisciplines} Unlocked`;
      this.dom.codexGrid.innerHTML = '';

      let allEntries = [];
      PUZZLE_DATABASE.forEach(p => {
        p.groups.forEach(g => {
          if (!allEntries.some(e => e.category === g.category)) {
            allEntries.push(g);
          }
        });
      });

      if (filter !== 'all') {
        allEntries = allEntries.filter(e => e.tierLabel.toLowerCase().includes(filter.toLowerCase()));
      }

      allEntries.forEach(entry => {
        const isUnlocked = Boolean(unlocked[entry.category]);
        const card = document.createElement('div');
        card.className = `codex-card ${isUnlocked ? '' : 'locked'}`;

        if (isUnlocked) {
          card.innerHTML = `
            <div class="codex-card-header">
              <span class="solved-tier-badge tier-${entry.tier}">${this.escapeHTML(entry.tierLabel)}</span>
            </div>
            <h3 class="codex-title">${this.escapeHTML(entry.category)}</h3>
            <div class="codex-items">${this.escapeHTML(entry.items.join(' • '))}</div >
            <p class="codex-body">${this.escapeHTML(entry.explanation)}</p>
          `;
        } else {
          card.innerHTML = `
            <div class="codex-card-header">
              <span class="solved-tier-badge">UNDISCOVERED</span>
            </div>
            <h3 class="codex-title" style="color: var(--text-muted);">Confidential House Spec</h3>
            <p class="codex-body">Solve this connection in the Daily Shift or Archive Cellar to unlock its specs.</p>
          `;
        }

        this.dom.codexGrid.appendChild(card);
      });
    }

    renderStats() {
      const d = this.storage.data;
      this.dom.statPlayed.textContent = d.played;
      const winRate = d.played > 0 ? Math.round((d.wins / d.played) * 100) : 0;
      this.dom.statWinRate.textContent = `${winRate}%`;
      this.dom.statCurrentStreak.textContent = d.currentStreak;
      this.dom.statMaxStreak.textContent = d.maxStreak;

      const ranks = [
        { min: 0, title: 'Barback Apprentice', desc: 'Learning fundamental recipes, ice chemistry, and station mechanics.' },
        { min: 2, title: 'Junior Bartender', desc: 'Developing speed, shaker posture, and stemware recall.' },
        { min: 4, title: 'Cocktail Specialist', desc: 'Understands equal-parts balance, dilution curves, and aromatized modifiers.' },
        { min: 6, title: 'Head Bartender', desc: 'Superior pattern recognition, troubleshooting station errors, and master balance.' },
        { min: 8, title: 'Master Beverage Director', desc: 'Unmatched cocktail lore, chemistry, and sensory architecture.' }
      ];

      let currentRank = ranks[0];
      for (const r of ranks) {
        if (d.wins >= r.min) currentRank = r;
      }
      this.dom.statRank.textContent = currentRank.title;
      this.dom.statRankDesc.textContent = currentRank.desc;

      this.dom.guessDistGraph.innerHTML = '';
      const maxVal = Math.max(1, ...Object.values(d.guessDist));

      ['0', '1', '2', '3'].forEach(errKey => {
        const count = d.guessDist[errKey] || 0;
        const pct = Math.max(14, Math.round((count / maxVal) * 100));

        const row = document.createElement('div');
        row.className = 'dist-row';
        row.innerHTML = `
          <span class="dist-label">${errKey} Err</span>
          <div class="dist-bar-track">
            <div class="dist-bar-fill" style="width: ${count > 0 ? pct : 12}%">${count}</div>
          </div>
        `;
        this.dom.guessDistGraph.appendChild(row);
      });
    }

    showToast(message) {
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.textContent = message;

      this.dom.toastContainer.appendChild(toast);

      setTimeout(() => {
        toast.classList.add('toast-fadeout');
        setTimeout(() => toast.remove(), 220);
      }, 2400);
    }

    openModal(modalElement) {
      this.dom.modalOverlay.classList.remove('hidden');
      this.dom.modalOverlay.setAttribute('aria-hidden', 'false');
      modalElement.classList.remove('hidden');
      modalElement.setAttribute('aria-hidden', 'false');

      const focusable = modalElement.querySelector('button:not([disabled])');
      if (focusable) focusable.focus();
    }

    closeAllModals() {
      this.dom.modalOverlay.classList.add('hidden');
      this.dom.modalOverlay.setAttribute('aria-hidden', 'true');
      document.querySelectorAll('.modal-dialog').forEach(m => {
        m.classList.add('hidden');
        m.setAttribute('aria-hidden', 'true');
      });
    }

    escapeHTML(str) {
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }
  }

  // Launch Engine on DOM Load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new BarConnectionsGame());
  } else {
    new BarConnectionsGame();
  }
})();