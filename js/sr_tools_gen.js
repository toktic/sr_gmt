var gen = {
	type_options: ['civilian', 'thug', 'ganger', 'corpsec', 'police', 'cultist', 'htr', 'specops', 'mob'],

	random_type: function()
	{
		return this.type_options[roll.dval(this.type_options.length - 1)];
	},

	_merge_adjustments: function(base, adjust)
	{
		var i;

		if (!base.hasOwnProperty('professional_description') && adjust.hasOwnProperty('professional_description'))
		{
			base.professional_description = adjust.professional_description;
		}

		if (adjust.hasOwnProperty('attributes'))
		{
			// Adjust all attributes
			base.attributes.strength += (adjust.attributes.hasOwnProperty('strength')) ? adjust.attributes.strength : 0;
			base.attributes.agility += (adjust.attributes.hasOwnProperty('agility')) ? adjust.attributes.agility : 0;
			base.attributes.reaction += (adjust.attributes.hasOwnProperty('reaction')) ? adjust.attributes.reaction : 0;
			base.attributes.body += (adjust.attributes.hasOwnProperty('body')) ? adjust.attributes.body : 0;
			base.attributes.charisma += (adjust.attributes.hasOwnProperty('charisma')) ? adjust.attributes.charisma : 0;
			base.attributes.logic += (adjust.attributes.hasOwnProperty('logic')) ? adjust.attributes.logic : 0;
			base.attributes.intuition += (adjust.attributes.hasOwnProperty('intuition')) ? adjust.attributes.intuition : 0;
			base.attributes.will += (adjust.attributes.hasOwnProperty('will')) ? adjust.attributes.will : 0;

			// Make sure all attributes are at least 1, we don't care about actual upper caps for now.
			base.attributes.strength = (base.attributes.strength < 1) ? 1 : base.attributes.strength;
			base.attributes.agility = (base.attributes.agility < 1) ? 1 : base.attributes.agility;
			base.attributes.reaction = (base.attributes.reaction < 1) ? 1 : base.attributes.reaction;
			base.attributes.body = (base.attributes.body < 1) ? 1 : base.attributes.body;
			base.attributes.charisma = (base.attributes.charisma < 1) ? 1 : base.attributes.charisma;
			base.attributes.logic = (base.attributes.logic < 1) ? 1 : base.attributes.logic;
			base.attributes.intuition = (base.attributes.intuition < 1) ? 1 : base.attributes.intuition;
			base.attributes.will = (base.attributes.will < 1) ? 1 : base.attributes.will;
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
			adjustments = db.get_special_adjustments('LT', options.professional_type, options.professional_rating);
			this._merge_adjustments(mook, adjustments);
			mook.special.is_lt = true;
		}

		if (options.is_decker)
		{
			adjustments = db.get_special_adjustments('Decker', options.professional_type, options.professional_rating);
			this._merge_adjustments(mook, adjustments);
			mook.special.is_decker = true;
		}

		if (options.is_adept)
		{
			adjustments = db.get_special_adjustments('Adept', options.professional_type, options.professional_rating);
			this._merge_adjustments(mook, adjustments);
			mook.special.is_adept = true;
		}

		if (options.is_mage)
		{
			adjustments = db.get_special_adjustments('Mage', options.professional_type, options.professional_rating);
			this._merge_adjustments(mook, adjustments);
			mook.special.is_mage = true;
		}

		return mook;
	}
};
