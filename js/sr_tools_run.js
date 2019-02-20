var run = {
	_employer_type: [
		'Secret Society',
		'Political or Activist Group',
		'Government',
		'Minor Corporation',
		'A Corporation',
		'AA Corporation',
		'AAA Corporation',
		'Criminal Syndicate',
		'Magical Group',
		'Private Individual',
		'Exotic'
	],

	_employer_sub_type: {
		'Secret Society': [
			'Black Lodge',
			'Human Nation'
		],
		'Political or Activist Group': [
			'Humanis Policlub',
			'Mothers of Metahumans',
			'Sons of Sauron'
		],
		'Government': [
			'Govenor',
			'Senator',
			'Local Department'
		],
		'Minor Corporation': [],
		'A Corporation': [],
		'AA Corporation': [],
		'AAA Corporation': [
			'Ares Macrotechnology',
			'Aztechnology',
			'EVO Corporation',
			'Horizon Group',
			'Mitsuhama Computer Technologies',
			'NeoNET',
			'Renraku Computer Systems',
			'Saeder-Krupp Heavy Industries',
			'Shiawase Corporation',
			'Wuxing Incorporated'
		],
		'Criminal Syndicate': [
			'Koshari',
			'Mafia',
			'Triad',
			'Yakuza',
			'Vory'
		],
		'Magical Group': [
			'Illuminates of the New Dawn',
			'Draco Foundation'
		],
		'Private Individual': [],
		'Exotic': [
			'AI',
			'Dragon',
			'Free Spirit'
		]
	},

	_run_type:['Datasteal', 'Assassination', 'Destruction', 'Extraction', 'Insertion', 'Misdirection', 'Protection', 'Delivery'],

	_run_sub_type: {
		Datasteal: [
			'Prototype Object',
			'Research',
			'Hidden Records'
		],

		Assassination: [
			'Politician',
			'Corporate Management',
			'Whistleblower'
		],

		Destruction: [
			'Vehicle',
			'Public Infrastructure',
			'Private Residence',
			'Corporate Property'
		],
		Extraction: [
			'Scientist',
			'Mole',
			'Hostage',
			'Artist',
			'Test Subject'
		],
		Insertion: [
			'Mole'
		],
		Misdirection: [
			'Draw Security',
			'Plant Evidence',
			'Create Illusion'
		],
		Protection: [
			'Rescue Hostage',
			'Prevent Extraction',
			'Prevent Destruction'
		],
		Delivery: [
			'Creature', // Lab creature, pet of someone important, pet that ate data
			'Equipment' // Something magical, something toxic
		]
	},

	_objectives: [
		{
			run_type: 'Extraction',
			run_sub_type: 'Mole',
			title: 'Rescue mole before their discovery', // Print-ready title of some type
			motivation: '', // Why is the employer doing this? Print-ready
			target: {

				// Maybe flag for needing to generate a company?
				// Or generate special NPCs for it?
			},
			pay: {
				base: 1000,
				increment: 500
			},
			karma: 2,
			street_cred: 0,
			noteriety: 0,
			timeline: '2 days'
		},
		{
			run_type: 'Datasteal',
			title: 'Steal prototype commlink model', // Print-ready title of some type
			motivation: "Employer wants early access to the commlink's physical dimensions in order to start making accessories before any competition",
			target: {

				// Maybe flag for needing to generate a company?
				// Or generate special NPCs for it?
			},
			pay: {
				base: 2000,
				increment: 100
			},
			karma: 2,
			street_cred: 0,
			noteriety: 0,
			timeline: '72 hours'
		}
	],

	_twists: [
		{
			run_type: 'Delivery', // If present or set, limits where the twist can be
			run_sub_type: 'Creature', // If present or set, limits where the twist can be
			is_main: false, // If true, this means it can be a required twist
			is_push: false, // If true, this means it can be included when Pushing the Envelope
			title: '', // Print-ready, what is going on
			notes: '', // Notes to the GM on what is going on
			is_separate_scene: false, // If true, will be included as it's own scene in the write-up
			pay: { // Only really included in the mission pay when this is a required twist, it is ignored when an optional twist
				base: 500, // Add this to the base pay
				increment: 25
			}
		},
		{
			is_push: true, // If true, this means it can be included when Pushing the Envelope
			title: 'Troll Partakes Kamikaze', // Print-ready, what is going on
			notes: 'As the party is travelling, they encounter a Troll ganger who has gotten their first taste of the drug Kamikaze. In a drug-fueled haze, the Troll decides to take on the PCs in combat.',
			is_separate_scene: true,
			npcs: [
				{
					name: 'TPK Troll',
					race: 'Troll',
					professional_type: 'ganger',
					notes: "This troll has just taken a dose of Kamikaze and has decided to forcefully eject the PCs from the gang's turf, or maybe just kill them outright. Negotiations are not likely to happen."
				}
			]
		}
	],

	get_run_type: function ()
	{
		var i = roll.dval(this._run_type.length) - 1;

		return this._run_type[i];
	}
};
