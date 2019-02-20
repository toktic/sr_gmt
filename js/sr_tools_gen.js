var gen = {
	type_options: ['civilian', 'thug', 'ganger', 'corpsec', 'police', 'cultist', 'htr', 'specops', 'mob'],

	random_type: function()
	{
		return this.type_options[roll.dval(this.type_options.length - 1)];
	},

	_merge_adjustments: function(base, adjust)
	{
		var i, attributes = ['body', 'agility', 'reaction', 'strength', 'will', 'logic', 'intuition', 'charisma'];

		if (!base.hasOwnProperty('professional_description') && adjust.hasOwnProperty('professional_description'))
		{
			base.professional_description = adjust.professional_description;
		}

		if (adjust.hasOwnProperty('attributes'))
		{
			var racial = false;

			if (base.hasOwnProperty('race'))
				racial = db.get_metatype_adjustment(base.race);

			attributes.forEach(function(att)
			{
				if (adjust.attributes.hasOwnProperty(att))
				{
					base.attributes[att] += adjust.attributes[att];

					if (racial)
					{
						// Racial Minimum
						base.attributes[att] = Math.max(racial.min_attributes[att], base.attributes[att]);

						// Racial Maximum
						base.attributes[att] = Math.min(racial.max_attributes[att], base.attributes[att]);
					}
				}
			});
		}

		if (adjust.hasOwnProperty('skills'))
		{
			for (i in adjust.skills)
			{
				if (i && base.skills.hasOwnProperty(i))
				{
					base.skills[i] = Math.max(base.skills[i], adjust.skills[i]);
				}
				else
				{
					base.skills[i] = adjust.skills[i];
				}
			}
		}

		if (adjust.hasOwnProperty('qualities'))
		{
			adjust.qualities.positive.forEach(function (item) {
				if (typeof item === 'object' || !base.qualities.positive.includes(item))
				{
					base.qualities.positive.push(item);
				}
			});

			adjust.qualities.negative.forEach(function (item) {
				if (typeof item === 'object' || !base.qualities.negative.includes(item))
				{
					base.qualities.negative.push(item);
				}
			});
		}

		if (adjust.hasOwnProperty('armor'))
		{
			base.armor = adjust.armor;
		}

		if (adjust.hasOwnProperty('weapons'))
		{
			adjust.weapons.forEach(function (item) {
				if (typeof item === 'object' || !base.weapons.includes(item))
				{
					base.weapons.push(item);
				}
			});
		}

		if (adjust.hasOwnProperty('augmentations'))
		{
			adjust.augmentations.forEach(function (item) {
				if (typeof item === 'object' || !base.augmentations.includes(item))
				{
					base.augmentations.push(item);
				}
			});
		}

		if (adjust.hasOwnProperty('gear'))
		{
			adjust.gear.forEach(function (item) {
				if (typeof item === 'object' || !base.gear.includes(item))
				{
					base.gear.push(item);
				}
			});
		}

		if (adjust.hasOwnProperty('special'))
		{
			base.special = $.extend({}, base.special, adjust.special);
			// If we have a magic rating, remove any augmentations
			if (adjust.special.hasOwnProperty('Magic'))
			{
				base.augmentations = [];
			}
		}

		if (adjust.hasOwnProperty('commlink'))
		{
			if (adjust.commlink > base.commlink)
			{
				base.commlink = adjust.commlink;
			}
		}

		return base;
	},

	mob: function(options)
	{
		if (options === undefined)
		{
			options = {};
		}

		options = $.extend({}, {
			size: roll.dval(10),
			professional_rating: roll.dval(5) - 1,
			professional_type: this.type_options[roll.dval(this.type_options.length - 1)],
			all_race: false,
			include_special: (roll.dval(10) > 6),
			include_lt: false,
			include_adept: false,
			include_mage: false,
			include_decker: false
		}, options);

		var mob = [], mob_options = {
			professional_rating: options.professional_rating,
			professional_type: options.professional_type
		};

		if (options.all_race !== false)
		{
			mob_options.race = options.all_race;
		}

		// If we want to include one of the specials, but haven't set which one, choose one at random
		var mook_count = options.size;

		if (options.include_special)
		{
			mook_count = options.size = 1;

			if (!options.include_lt && !options.include_adept && !options.include_mage && !options.include_decker)
			{
				var i = roll.dval(10);

				switch (true)
				{
					case (i < 6):
						options.include_lt = true;
						break;
					case (i < 8):
						options.include_decker = true;
						break;
					case (i < 10):
						options.include_adept = true;
						break;
					default:
						options.include_mage = true;
						break;
				}
			}

			var this_special = $.clone(mob_options);

			if (options.include_lt)
			{
				this_special.is_lt = true;
			}
			else if (options.include_decker)
			{
				this_special.is_decker = true;
			}
			else if (options.include_adept)
			{
				this_special.is_adept = true;
			}
			else if (options.include_mage)
			{
				this_special.is_mage = true;
			}

			mob.push(this.mook(this_special));
		}

		for (mook_count; mook_count > 0; mook_count--)
		{
			mob.push(this.mook(mob_options));
		}

		return mob;
	},

	mook: function(options)
	{
		if (options === undefined)
		{
			options = {};
		}

		options = $.extend({}, {
			name: 'Mook #' + roll.dval(10) + roll.dval(10) + roll.dval(10),
			gender: false, // false for random
			race: false,
			professional_rating: -1,
			professional_type: false,
			is_lt: false,
			is_adept: false,
			is_mage: false,
			is_decker: false,
			is_johnson: false,
			is_gunbunny: false,
			is_samurai: false,
			is_tank: false,
			is_shaman: false,
			is_contact: false,
			contact: false, // {connection rating, loyalty rating, type} || false
			notes: null
		}, options);

		var mook = {
			name: options.name,
			attributes: {body: 0, agility: 0, reaction: 0, strength: 0, will: 0, logic: 0, intuition: 0, charisma: 0},
			skills: {},
			knowledge_skills: {},
			qualities: {
				positive: [],
				negative: []
			},
			weapons: [],
			armor: [],
			gear: [],
			augmentations: [],
			special: {},
			commlink: 1,
			created: new Date().toJSON(),
			professional_type: options.professional_type
		};

		// Pull in copies from global settings
		mook.condition_monitor = storage.setting('condition_monitor');
		mook.wound_penalty = storage.setting('wound_penalty');

		// If we don't have a gender, assign a binary gender.
		// Will limiting gender to a binary decision piss off some people? Probably yes.
		// However, the author is not spending time developing a fully politically correct gender-determination system at this time.
		// If you really want to hear how the author feels about the situation, buy him a beer
		if (options.gender !== 'Male' && options.gender !== 'Female')
		{
			if (options.is_contact)
			{
				// Even split
				if (roll.dval(2) === 2)
				{
					mook.gender = 'Female';
				}
				else
				{
					mook.gender = 'Male';
				}
			}
			else
			{
				// Probably not so even
				if (roll.dval(10) >= 9)
				{
					mook.gender = 'Female';
				}
				else
				{
					mook.gender = 'Male';
				}
			}
		}
		else
		{
			mook.gender = options.gender;
		}

		// If we don't have a professional rating, then generate a random one from 0-4
		if (options.professional_rating === -1)
		{
			options.professional_rating = roll.dval(5) - 1;
		}

		mook.professional_rating = options.professional_rating;

		var rating_baseline = db.get_base_attributes(options.professional_rating);

		this._merge_adjustments(mook, rating_baseline);

		// If we don't have a race, generate one
		if (options.race === false)
		{
			options.race = db.gen_race();
		}

		mook.race = options.race;
		// Get the attribute adjustments from race and apply them
		var racial_baseline = db.get_metatype_adjustment(options.race);

		this._merge_adjustments(mook, racial_baseline);

		// If we don't have a professional type and we aren't a contact, then generate one
		if (options.professional_type === false)
		{
			if (options.is_contact === false)
			{
				options.professional_type = this.type_options[roll.dval(this.type_options.length - 1)];
			}
		}

		if (options.is_contact === false)
		{
			mook.professional_type = options.professional_type;

			switch (mook.professional_type)
			{
				case 'civilian':
					mook.professional_description = 'Civilian';
					break;
				case 'thug':
					mook.professional_description = 'Thug';
					break;
				case 'ganger':
					mook.professional_description = 'Gang Member';
					break;
				case 'corpsec':
					mook.professional_description = 'Corporate Security';
					break;
				case 'police':
					mook.professional_description = 'Law Enforcement';
					break;
				case 'cultist':
					mook.professional_description = 'Cultist';
					break;
				case 'htr':
					mook.professional_description = 'High Threat Response';
					break;
				case 'specops':
					mook.professional_description = 'Special Operations';
					break;
				case 'mob':
					mook.professional_description = 'Organized Crime';
					break;
			}
		}

		// Contacts do not have type adjustments, but everyone else does
		if (options.is_contact)
		{
			// TODO I need to deal with generating contacts!
			// This needs to include some stat adjustments for their rating, plus their type of contact-ness and other helpful things.
		}
		else
		{
			var type_adjustments = db.get_type_adjustments(options.professional_type, options.professional_rating);
			this._merge_adjustments(mook, type_adjustments);
		}

		// Is this a special type? [LT, adept, mage, decker]
		var adjustments;

		if (options.is_lt)
		{
			adjustments = db.get_special_adjustments('LT', options);
			this._merge_adjustments(mook, adjustments);
			mook.special.is_lt = true;
		}

		if (options.is_decker)
		{
			adjustments = db.get_special_adjustments('Decker', options);
			this._merge_adjustments(mook, adjustments);
			mook.special.is_decker = true;
		}

		if (options.is_adept)
		{
			adjustments = db.get_special_adjustments('Adept', options);
			this._merge_adjustments(mook, adjustments);
			mook.special.is_adept = true;
		}

		if (options.is_mage)
		{
			adjustments = db.get_special_adjustments('Mage', options);
			this._merge_adjustments(mook, adjustments);
			mook.special.is_mage = true;
		}

		if (options.is_shaman)
		{
			adjustments = db.get_special_adjustments('Shaman', options);
			this._merge_adjustments(mook, adjustments);
			mook.special.is_tank = true;
		}

		if (options.is_tank)
		{
			adjustments = db.get_special_adjustments('Tank', options);
			this._merge_adjustments(mook, adjustments);
			mook.special.is_tank = true;
		}

		if (options.is_samurai)
		{
			adjustments = db.get_special_adjustments('Samurai', options);
			this._merge_adjustments(mook, adjustments);
			mook.special.is_tank = true;
		}

		if (options.is_gunbunny)
		{
			adjustments = db.get_special_adjustments('Gunbunny', options);
			this._merge_adjustments(mook, adjustments);
			mook.special.is_tank = true;
		}

		if (options.is_johnson)
		{
			adjustments = db.get_special_adjustments('Johnson', options);
			this._merge_adjustments(mook, adjustments);
			mook.special.is_tank = true;
		}

		// If this is a Troll who has certain augmentations, they need to lose the Troll Dermal Deposits
		if (mook.race === 'Troll')
		{
			var skin_augments = ['Dermal Plating', 'Orthoskin'];

			var augment = mook.augmentations.filter(function (aug)
			{
				return skin_augments.includes(aug.name);
			});

			if (augment.length > 0)
			{
				augment = mook.augmentations.filter(function (aug)
				{
					return aug.name !== 'Troll Dermal Deposits';
				});
				mook.augmentations = augment;
			}
		}

		return mook;
	},

	matrix_host: function(options)
	{
		if (options === undefined)
		{
			options = {};
		}

		options = $.extend({}, {
			// matrix_host: false, // False, or a host rating
			// matrix_host_mode: 'Secure', // Ratings order; Secure: FADS, Data: DFAS, Hidden: SFAD
			notes: null
		}, options);

		// TODO make the rest of this useful later
	},

	_corp_name_combine_word: [
		'aim',
		'arm',
		'ash',
		'auto',
		'block',
		'bright',
		'caption',
		'com',
		'down',
		'dream',
		'fund',
		'gate',
		'green',
		'hydro',
		'lion',
		'mark',
		'max',
		'motor',
		'plastic',
		'point',
		'scope',
		'strong',
		'sun',
		'thermo',
		'wood',
		'works'
	],

	_corp_name_modifier_word: [
		'Ace',
		'Action',
		'Advanced',
		'Anchor',
		'Apparel',
		'Aquatic',
		'Atlas',
		'Boulder',
		'Broadcasting',
		'Collective',
		'Construction',
		'Eagle',
		'Electric',
		'Entertainment',
		'Financial',
		'Financial',
		'Global',
		'Gold',
		'Golden',
		'Green',
		'International',
		'Investigative',
		'Lender',
		'Machine',
		'Master',
		'Media',
		'Network',
		'New World',
		'Old World',
		'Research',
		'Robotic',
		'Stone',
		'Visual',
		'Wireless'
	],

	_corp_name_final_word: [
		'Agriculture',
		'Analysis',
		'Analytics',
		'Collective',
		'Construction',
		'Consumables',
		'Corporation',
		'Entertainment',
		'Financial',
		'Global',
		'Group',
		'Holdings',
		'Incorporated',
		'Industries',
		'International',
		'Investigations',
		'Network',
		'Press',
		'Processing',
		'Productions',
		'Reporting',
		'Research',
		'Robotics',
		'Security',
		'Systems',
		'Technologies',
		'Works'
	],

	initials: function(count)
	{
		if (count === undefined)
		{
			count = roll.dval(3);
		}

		var l = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		var a = '.-/+';
		var ret = [];

		for (var i = 1; i <= count; i++)
		{
			ret.push(l[roll.dval(l.length) - 1])
		}

		if (roll.dval(5) === 5)
		{
			i = a[roll.dval(a.length) - 1];
			return ret.join(i);
		}
		else
		{
			return ret.join('');
		}
	},

	combine_words: function()
	{
		var i, j, k;

		do {
			i = roll.dval(this._corp_name_combine_word.length);
			j = roll.dval(this._corp_name_combine_word.length);
		} while (i === j);

		k = this._corp_name_combine_word[i - 1] + this._corp_name_combine_word[j - 1];
		return k[0].toUpperCase() + k.slice(1);
	},

	corp_name: function(options)
	{
		if (options === undefined)
		{
			options = {};
		}

		options = $.extend({}, {
			format: null,
			notes: null,
			subsidiary: null // Subsidiary of '___'
		}, options);

		var corp = {name: ''}, name_parts = [];
		var formats = ['double', 'initials', 'triple', 'initials double'];

		if (options.format === null)
		{
			options.format = formats[roll.dval(formats.length) - 1];
		}

		switch(options.format)
		{
			case 'double':
				if (roll.dval(2) === 2)
				{
					name_parts.push(this._corp_name_modifier_word[roll.dval(this._corp_name_modifier_word.length) - 1]);
				}
				else
				{
					name_parts.push(this.combine_words());
				}
				break;

			case 'initials':
				name_parts.push(this.initials());
				break;

			case 'triple':
				if (roll.dval(2) === 2)
				{
					name_parts.push(this.combine_words());
					name_parts.push(this._corp_name_modifier_word[roll.dval(this._corp_name_modifier_word.length) - 1]);
				}
				else
				{
					name_parts.push(this._corp_name_modifier_word[roll.dval(this._corp_name_modifier_word.length) - 1]);
					name_parts.push(this.combine_words());
				}
				break;

			case 'initials double':
				name_parts.push(this.initials());
				name_parts.push(this._corp_name_modifier_word[roll.dval(this._corp_name_modifier_word.length) - 1]);
				break;

			default:
				console.log('ERROR: corp_name() with unknown format', options.format);
				return;
		}

		// Generate the final word
		name_parts.push(this._corp_name_final_word[roll.dval(this._corp_name_final_word.length) - 1]);

		corp.name = name_parts.join(' ');

		return corp;
	}
};
