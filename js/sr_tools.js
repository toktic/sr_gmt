var db = {
	// Generate a random race
	gen_race: function()
	{
		var r = roll.dval(100), res;

		switch (true)
		{
			case (r < 40):
				res = 'Human';
				break;

			case (r < 65):
				res = 'Ork';
				break;

			case (r < 80):
				res = 'Elf';
				break;

			case (r < 95):
				res = 'Dwarf';
				break;

			default:
				res = 'Troll';
		}

		return res;
	},

	get_base_attributes: function (rating)
	{
		var res = {};

		switch (rating)
		{
			case 0:
				res.attributes = {body: 3, agility: 3, reaction: 2, strength: 2, will: 3, logic: 2, intuition: 3, charisma: 2};
				break;

			case 1:
				res.attributes = {body: 3, agility: 3, reaction: 3, strength: 2, will: 3, logic: 3, intuition: 3, charisma: 2};
				break;

			case 2:
				res.attributes = {body: 3, agility: 3, reaction: 3, strength: 3, will: 3, logic: 3, intuition: 4, charisma: 2};
				break;

			case 3:
				res.attributes = {body: 4, agility: 3, reaction: 3, strength: 3, will: 3, logic: 3, intuition: 4, charisma: 3};
				break;

			case 4:
				res.attributes = {body: 4, agility: 4, reaction: 3, strength: 3, will: 4, logic: 3, intuition: 4, charisma: 3};
				break;

			case 5:
				res.attributes = {body: 4, agility: 4, reaction: 4, strength: 4, will: 4, logic: 3, intuition: 5, charisma: 3};
				break;

			case 6:
				res.attributes = {body: 5, agility: 4, reaction: 5, strength: 4, will: 5, logic: 3, intuition: 5, charisma: 3};
				break;

			default:
				console.log('ERROR: get_base_attributes() with no professional rating');
				break;
		}

		return res;
	},

	get_type_adjustments: function (type, rating)
	{
		var res = {
			attributes: {body: 0, agility: 0, reaction: 0, strength: 0, will: 0, logic: 0, intuition: 0, charisma: 0},
			skills: {},
			knowledge_skills: {},
			qualities: {
				positive: [],
				negative: []
			},
			weapons: [],
			armor: [],
			augmentations: [],
			gear: [],
			commlink: 1
		};

		switch (type)
		{
			case 'civilian':
				res.skills.Perception = 2 + rating;
				break;

			case 'thug':
				res.attributes.reaction = 1;
				res.attributes.strength = 1;
				res.skills.Blades = 2 + rating;
				res.skills.Clubs = 2 + rating;
				res.skills.Intimidation = 2 + rating;
				res.skills['Unarmed Combat'] = 2 + rating;
				res.weapons.push('Club');
				res.weapons.push('Knife');
				break;

			case 'ganger':
				res.attributes.body = 1;
				res.attributes.agility = 1;
				res.attributes.strength = 2;
				res.attributes.logic = -1;
				res.attributes.charisma = 1;
				res.skills.Blades = 3 + rating;
				res.skills.Clubs = 2 + rating;
				res.skills.Etiquette = 2 + rating;
				res.skills.Intimidation = 3 + rating;
				res.skills.Pistols = 3 + rating;
				res.skills['Unarmed Combat'] = 2 + rating;
				res.qualities.positive.push('Toughness');
				res.armor.push('Armor Vest');
				res.weapons.push('Browning Ultra-Power');
				res.weapons.push('Knife');
				break;

			case 'corpsec':
				res.attributes.body = 1;
				res.attributes.agility = 1;
				res.attributes.reaction = 1;
				res.attributes.logic = -1;
				res.attributes.intuition = -1;
				res.attributes.charisma = 1;
				res.skills.Automatics = 1 + rating;
				res.skills.Etiquette = (rating * 2);
				res.skills.Perception = rating;
				res.skills.Pistols = 2 + rating;
				res.skills.Running = 3 + Math.floor(rating / 2);
				res.skills['Unarmed Combat'] = 1 + rating;
				res.armor.push('Armor Jacket');
				res.weapons.push('Colt Cobra TZ-120');
				res.weapons.push('Fichetti Security 600');
				res.weapons.push('Stun Baton');
				res.commlink = 3;
				break;

			case 'police':
				res.attributes.reaction = 1;
				res.attributes.logic = -1;
				res.attributes.intuition = -1;
				res.skills.Clubs = 2 + rating;
				res.skills.Perception = rating;
				res.skills.Pistols = 3 + Math.floor(rating / 2);
				res.skills.Running = 1 + Math.floor(rating / 2);
				res.skills['Unarmed Combat'] = 1 + rating;
				res.knowledge_skills['Law Enforcement'] = 1 + rating;
				res.knowledge_skills['Local Crime'] = rating;
				res.armor.push('Armor Jacket');
				res.weapons.push('Defiance EX Shocker');
				res.weapons.push('Stun Baton');
				res.gear.push({
					name: 'Sunglasses',
					rating: 2,
					augments: ['Image link', 'Smartlink']
				});
				res.gear.push('Jazz (2)');
				res.commlink = 3;
				break;

			case 'mob':
				res.attributes.agility = 1;
				res.attributes.reaction = 1;
				res.attributes.strength = 1;
				res.skills.Automatics = 1 + rating;
				res.skills.Blades = 1 + rating;
				res.skills.Intimidation = 2 + rating;
				res.skills.Perception = Math.floor(rating / 2);
				res.skills.Pistols = rating;
				res.skills['Unarmed Combat'] = 2 + rating;
				res.qualities.positive.push('Toughness');
				res.armor.push('Lined Coat');
				res.weapons.push('Knife');
				res.weapons.push('Ceska Black Scorpion');
				res.commlink = 3;
				break;

			case 'htr':
				res.attributes.body = 2;
				res.attributes.agility = 1;
				res.attributes.reaction = 1;
				res.attributes.logic = 1;
				res.skills.Blades = 2 + rating;
				res.skills.Clubs = 2 + rating;
				res.skills['Unarmed Combat'] = 2 + rating;
				res.skills.Gymnastics = 1 + rating;
				res.skills.Running = 1 + rating;
				res.skills.Swimming = 1 + rating;
				res.skills.Etiquette = 3 + Math.ceil(rating / 2);
				res.skills.Automatics = rating * 2 - 1;
				res.skills.Longarms = rating * 2 - 1;
				res.skills.Pistols = rating * 2 - 1;
				res.skills.Perception = 3 + Math.ceil(rating / 2);
				res.skills.Sneaking = 1 + rating;
				res.armor.push('Full body armor');
				res.armor.push('Full helmet');
				res.armor.push('Chemical Seal');
				res.weapons.push('Ares Alpha');
				res.weapons.push('Ares Predator V');
				res.commlink = rating - 1;
				res.augmentations.push({
					name: 'Cybereyes',
					rating: 2,
					augments: ['Flare Compensation', 'Image link', 'Smartlink', 'Thermographic vision']
				});

				if (rating > 2)
				{
					res.augmentations.push({
						name: 'Muscle Augmentation',
						rating: Math.ceil(rating / 3)
					});
					res.augmentations.push({
						name: 'Muscle Toner',
						rating: Math.ceil(rating / 3)
					});
					res.augmentations.push({
						name: 'Wired Reflexes',
						rating: Math.ceil(rating / 3)
					});
				}
				break;

			case 'specops':
				res.attributes.body = 1;
				res.attributes.agility = 2;
				res.attributes.strength = 1;
				res.attributes.logic = 1;
				res.attributes.intuition = 1;
				res.attributes.charisma = 1;
				res.skills.Blades = 2 + rating;
				res.skills.Clubs = 2 + rating;
				res.skills['Unarmed Combat'] = 2 + rating;
				res.skills.Gymnastics = 1 + rating;
				res.skills.Running = 1 + rating;
				res.skills.Swimming = 1 + rating;
				res.skills.Sneaking = rating;
				res.skills.Disguise = rating;
				res.skills.Palming = rating;
				res.skills.Demolitions = 1 + rating;
				res.skills.Automatics = rating + 3;
				res.skills.Longarms = rating + 3;
				res.skills.Pistols = rating + 3;
				res.skills.Perception = 1 + rating;
				res.armor.push('Full body armor');
				res.armor.push('Full helmet');
				res.armor.push('Chemical Seal');
				res.gear.push('Grapple Gun');
				res.gear.push('Smoke Grenade (2)');
				res.gear.push('Thermal Smoke Grenade (2)');
				res.weapons.push({
					name: 'HK 227',
					ammo: 'APDS'
				});
				res.commlink = rating - 1;

				if (rating > 0)
				{
					res.augmentations.push({
						name: 'Muscle Augmentation',
						rating: Math.ceil(rating / 2)
					});
					res.augmentations.push({
						name: 'Muscle Toner',
						rating: Math.ceil(rating / 2)
					});
					res.augmentations.push({
						name: 'Synaptic Booster',
						rating: Math.ceil(rating / 2)
					});
				}
				break;

			case 'cultist':
				res.attributes.body = -1;
				res.attributes.strength = -1;
				res.attributes.logic = 1;
				res.attributes.intuition = 1;
				res.attributes.will = 2;
				res.skills.Blades = 1 + rating;
				res.skills.Clubs = 1 + rating;
				res.skills.Running = 1 + rating;
				res.skills.Perception = 1 + rating;
				res.skills.Intimidation = 2 + rating;
				res.weapons.push('Club');
				res.weapons.push('Knife');
				break;
		}

		return res;
	},

	// Adjustments if a standard LT, or mage, or decker, etc
	get_special_adjustments: function (special_type, base_type, rating)
	{
		var res = {
			professional_description: '',
			attributes: {body: 0, agility: 0, reaction: 0, strength: 0, will: 0, logic: 0, intuition: 0, charisma: 0},
			skills: {},
			knowledge_skills: {},
			qualities: {
				positive: [],
				negative: []
			},
			weapons: [],
			armor: [],
			augmentations: [],
			gear: [],
			special: {}
		};

		if (special_type === 'LT')
		{
			switch (base_type)
			{
				case 'civilian':
					res.professional_description = 'Civilian';
					res.attributes.will = 1;
					res.skills.Leadership = 3;
					break;

				case 'thug':
					res.professional_description = 'Thug';
					res.attributes.agility = 1;
					res.attributes.strength = 1;
					res.attributes.logic = 1;
					res.skills.Clubs = 1;
					res.skills.Intimidation = 2;
					res.skills.Pistols = 3;
					res.skills['Unarmed Combat'] = 1;
					res.weapons.push('Colt America L36');
					break;

				case 'ganger':
					res.professional_description = 'Gang Member';
					res.attributes.reaction = 1;
					res.attributes.will = 1;
					res.attributes.logic = 1;
					res.attributes.intuition = 1;
					res.attributes.charisma = 1;
					res.skills.Etiquette = 3 + rating;
					res.skills.Leadership = 2;
					res.skills['Unarmed Combat'] = 3 + rating;
					res.augmentations.push('Spur');
					res.armor.push('Armor Jacket');
					break;

				case 'corpsec':
					res.professional_description = 'Corporate Security';
					res.attributes.agility = 1;
					res.attributes.logic = 1;
					res.attributes.intuition = 1;
					res.skills.Clubs = 1 + rating;
					res.skills.Perception = 2 + rating;
					res.skills.Leadership = 1 + rating;
					res.skills.Sneaking = rating;
					res.skills.Intimidation = 1 + rating;
					res.gear.push({
						name: 'Sunglasses',
						rating: 2,
						augments: ['Image link', 'Smartlink', 'Thermographic Vision']
					});
					res.gear.push('Smoke Grenade (2)');
					break;

				case 'police':
					res.professional_description = 'Law Enforcement';
					res.attributes.agility = 1;
					res.attributes.logic = 1;
					res.attributes.intuition = 1;
					res.attributes.charisma = 1;
					res.skills.Automatics = 1 + rating;
					res.skills.Blades = 3 + rating;
					res.skills.Clubs = 3 + rating;
					res.skills['Unarmed Combat'] = 3 + rating;
					res.skills.Perception = 2 + rating;
					res.skills.Leadership = 2 + rating;
					res.skills.Sneaking = rating;
					res.skills.Intimidation = 1 + rating;
					res.augmentations.push({
						name: 'Cybereyes',
						rating: 2,
						augments: ['Flare Compensation', 'Image link', 'Smartlink', 'Thermographic vision', 'Low-light Vision']
					});
					break;

				case 'mob':
					res.professional_description = 'Organized Crime';
					res.attributes.reaction = 1;
					res.attributes.will = 1;
					res.attributes.logic = 1;
					res.attributes.charisma = 1;
					res.skills.Etiquette = 3 + rating;
					res.skills.Leadership = 2;
					res.skills['Unarmed Combat'] = 3 + rating;
					res.armor.push('Armor Jacket');
					res.augmentations.push('Spur');
					res.gear.push('Jazz (2)');
					res.gear.push('Novacoke (2)');
					break;

				case 'htr':
					res.professional_description = 'High Threat Response';
					res.attributes.agility = 1;
					res.attributes.reaction = 1;
					res.attributes.strength = 1;
					res.attributes.will = 1;
					res.skills['Heavy Weapons'] = 3 + rating;
					res.skills.Demolitions = rating;
					break;

				case 'specops':
					res.professional_description = 'Special Operations';
					res.attributes.reaction = 1;
					res.attributes.strength = 1;
					res.attributes.logic = 1;
					res.attributes.will = 1;
					res.skills.Demolitions = 2 + rating;
					res.qualities.positive.push('Toughness');
					res.weapons.push('Enfield AS-7');
					break;

				case 'cultist':
					res.professional_description = 'Cultist';
					res.attributes.body = 2;
					res.attributes.intuition = 1;
					res.attributes.charisma = 2;
					res.skills.Automatics = rating;
					res.weapons.push('Steyr TMP');
					break;
			}
		}

		if (special_type === 'Adept')
		{
			// What kind of adept?
			var improved_skill, bonus_weapon;

			switch (base_type)
			{
				default:
				case 'civilian':
				case 'police':
					improved_skill = 'Pistols';
					bonus_weapon = 'Remington Roomsweeper';
					break;

				case 'cultist':
				case 'ganger':
					improved_skill = 'Longarms';
					bonus_weapon = 'Enfield AS-7';
					break;

				case 'corpsec':
					improved_skill = 'Automatics';
					bonus_weapon = 'FN HAR';
					break;

				case 'mob':
					improved_skill = 'Automatics';
					bonus_weapon = 'AK-97';
					break;

				case 'htr':
					improved_skill = 'Automatics';
					bonus_weapon = 'FN P93 Praetor';
					break;

				case 'specops':
					improved_skill = 'Longarms';
					bonus_weapon = 'Cavalier Arms Crockett EBR';
			}

			// Attributes
			res.attributes.reaction = 1;
			res.attributes.strength = 1;

			// Skills
			res.skills.Arcana = rating + 2;
			res.skills.Blades = rating + 2;
			res.skills[improved_skill] = rating + 2;

			// Qualities
			res.qualities.positive.push('Adept');

			// Weapon
			res.weapons.push(bonus_weapon);

			if (rating > 4)
			{
				res.weapons.push({
					name: 'Weapon Focus',
					base_name: 'Katana',
					force: rating - 4
				});
			}
			else
			{
				res.weapons.push('Katana');
			}

			if (rating > 3)
			{
				res.gear.push({
					name: 'Qi Focus',
					force: (rating - 3) * 2, // 4:2, 5:4, 6:6, 7:8
					power: 'Improved Strength',
					type: 'Improve Attribute',
					attribute: 'strength',
					rating: rating - 3
				});
			}

			// Specials : Spells
			res.special.Magic = 2 + rating;

			if (res.special.Magic > 6)
			{
				res.special.Initiate = res.special.Magic - 6;
				res.special.Magic = 6;
			}

			res.special.powers = [];

			switch (rating)
			{
				default:
				case 1:
					res.special.powers.push(
						{
							name: 'Improved Reflexes',
							rating: 1
						},
						{
							name: 'Improved Ability',
							type: 'ability',
							rating: 1,
							ability: improved_skill
						},
						{
							name: 'Improved Physical Attribute',
							type: 'attribute',
							rating: 1,
							attribute: 'Agility'
						}
					);
					break;

				case 2:
					res.special.powers.push(
						{
							name: 'Improved Reflexes',
							rating: 1
						},
						{
							name: 'Improved Ability',
							rating: 1,
							ability: improved_skill
						},
						{
							name: 'Improved Physical Attribute',
							rating: 2,
							attribute: 'Agility'
						}
					);
					break;

				case 3:
					res.special.powers.push(
						{
							name: 'Improved Reflexes',
							rating: 2
						},
						{
							name: 'Improved Ability',
							rating: 1,
							ability: improved_skill
						},
						{
							name: 'Improved Physical Attribute',
							rating: 2,
							attribute: 'Agility'
						}
					);
					break;

				case 4:
					res.special.powers.push(
						{
							name: 'Improved Reflexes',
							rating: 2
						},
						{
							name: 'Improved Ability',
							rating: 3,
							ability: improved_skill
						},
						{
							name: 'Improved Physical Attribute',
							rating: 2,
							attribute: 'Agility'
						}
					);
					break;

				case 5:
					res.special.powers.push(
						{
							name: 'Improved Reflexes',
							rating: 2
						},
						{
							name: 'Improved Ability',
							rating: 3,
							ability: improved_skill
						},
						{
							name: 'Improved Physical Attribute',
							rating: 3,
							attribute: 'Agility'
						}
					);
					break;

				case 6:
					res.special.powers.push(
						{
							name: 'Improved Reflexes',
							rating: 3
						},
						{
							name: 'Improved Ability',
							rating: 3,
							ability: improved_skill
						},
						{
							name: 'Improved Physical Attribute',
							rating: 3,
							attribute: 'Agility'
						}
					);
					break;
			}
		}

		if (special_type === 'Mage')
		{
			// Attributes
			res.attributes.will = 1;
			res.attributes.logic = 1;

			// Skills
			res.skills.Assessing = rating + 2;
			res.skills['Astral Combat'] = rating + 1;
			res.skills.Summoning = rating + 1;
			res.skills.Banishing = rating + 1;
			res.skills.Binding = rating + 1;
			res.skills.Counterspelling = rating + 2;
			res.skills.Spellcasting = rating + 2;

			// Qualities
			res.qualities.positive.push('Magician (Hermetic)');
			if (rating > 3)
			{
				res.qualities.positive.push({
					name: 'Focused Concentration',
					rating: rating - 2
				});
			}

			// Gear
			res.gear.push('Psyche (2)');
			res.gear.push('Reagents (10)');
			res.gear.push({
				name: 'Spellcasting focus (Combat)',
				rating: rating
			});

			if (rating > 4)
			{
				res.gear.push({
					name: 'Power focus (Combat)',
					rating: rating - 3
				});
			}

			// Specials : Spells
			res.special.Magic = (rating < 2) ? 2 : rating;
			res.special.spells = ['Powerbolt', 'Silence', 'Stunball'];
			switch (rating)
			{
				case 6:
					res.special.spells.push('Armor', 'Agony');
				case 5:
					res.special.spells.push('Clairvoyance', 'Improved Invisibility');
				case 4:
					res.special.spells.push('Increase Reflexes', 'Combat Sense');
				case 3:
					res.special.spells.push('Heal');
				case 2:
					res.special.spells.push('Detect Life');
				case 1:
					res.special.spells.push('Physical Barrier');
				default:
					break;
			}
		}

		if (special_type === 'Decker')
		{
			// Attributes
			if (rating < 3)
			{
				res.attributes.body = -1;
				res.attributes.agility = -1;
				res.attributes.strength = -1;
				res.attributes.logic = 1;
				res.attributes.intuition = 1;
			}
			else if (rating < 5)
			{
				res.attributes.agility = -1;
				res.attributes.strength = -1;
				res.attributes.logic = 1;
				res.attributes.intuition = 1;
				res.attributes.will = 1;
			}
			else
			{
				res.attributes.logic = 2;
				res.attributes.intuition = 1;
				res.attributes.will = 1;
			}

			// Skills
			res.skills.Computer = rating + 1;
			res.skills.Cybercombat = rating + 2;
			res.skills['Electronic Warfare'] = rating + 2;
			res.skills.Hacking = rating + 2;

			if (['corpsec', 'htr', 'mob', 'specops'].includes(base_type))
			{
				res.skills.Leadership = rating;
				res.skills.Hardware = rating + 1;
				res.skills.Software = rating + 1;
			}

			if (['htr', 'specops'].includes(base_type))
			{
				res.skills.Demolitions = rating;
			}

			// Augmentations & Drugs
			if (rating > 5)
			{
				res.augmentations.push({
					name: 'Cerebellum Booster',
					rating: rating - 4
				});
			}

			if (rating >= 4)
			{
				res.augmentations.push({
					name: 'Cerebral Booster',
					rating: rating - 3
				});
				res.gear.push('Psyche (2)');
			}

			if (rating > 2)
			{
				res.augmentations.push('Datajack');
			}
			else
			{
				res.gear.push('Trodes');
			}

			// Deck
			switch (rating)
			{
				case 6:
				case 5:
					res.gear.push({
						name: 'Shiawase Cyber-5',
						type: 'cyberdeck',
						rating: 5,
						programs: ['Armor', 'Biofeedback', 'Decryption', 'Encryption', 'Fork', 'Hammer', 'Lockdown']
					});
					break;

				case 4:
				case 3:
					res.gear.push({
						name: 'Hermes Chariot',
						type: 'cyberdeck',
						rating: 2,
						programs: ['Armor', 'Decryption', 'Encryption', 'Fork', 'Hammer']
					});
					break;

				default:
					res.gear.push({
						name: 'Erika MCD-1',
						type: 'cyberdeck',
						rating: 1,
						programs: ['Armor', 'Baby Monitor', 'Fork']
					});
			}
		}

		return res;
	},

	get_metatype_adjustment: function (race)
	{
		var res = {
			attributes: {body: 0, agility: 0, reaction: 0, strength: 0, will: 0, logic: 0, intuition: 0, charisma: 0},
			augmentations: []
		};

		switch (race)
		{
			case 'Human':
				break;

			case 'Elf':
				res.attributes.agility = 1;
				res.attributes.charisma = 2;
				break;

			case 'Dwarf':
				res.attributes.body = 2;
				res.attributes.reaction = -1;
				res.attributes.strength = 2;
				res.attributes.will = 1;
				break;

			case 'Ork':
				res.attributes.body = 3;
				res.attributes.strength = 2;
				res.attributes.logic = -1;
				res.attributes.charisma = -1;
				break;

			case 'Troll':
				res.attributes.body = 4;
				res.attributes.agility = -1;
				res.attributes.strength = 4;
				res.attributes.logic = -1;
				res.attributes.intuition = -1;
				res.attributes.charisma = -2;
				res.augmentations.push('Troll Dermal Deposits');
				break;

			default:
				console.log('ERROR: get_metatype_adjustment() with no known metatype');
				res = false;
				break;
		}

		return res;
	},

	get_weapon_attributes: function (weapon)
	{
		var name = weapon.name;

		var data = {
			name: name, // Display name of the weapon: Knife, Ares Predator V, etc.
			type: '', // Display type of the weapon: Light Pistol, SMG, etc.
			ability: '', // Linked ability: Blades, Automatics, etc.
			acc: '',
			acc_modified: '', // Modifier to conditionally apply due to smartlink, laser sight, etc.
			dv: '', // Damage Value
			damage_type: 'P', // Physical, Stun, Stun(electrical)
			damage_attribute: null, // If damage is linked to STR instead of bullet type
			ap: 0,
			modes: '',
			rc: 0, // Base recoil compensation
			rc_modified: 0, // Conditional recoil compensation
			ammo_count: 0,
			reload: 'c', // Clip, Internal Magazine, etc.
			ammo_type: '', // Assume normal ammo unless specified
			reach: 0
		};

		if (weapon.hasOwnProperty('ammo'))
		{
			data.ammo_type = weapon.ammo;
		}

		if (weapon.name === 'Weapon Focus' && weapon.hasOwnProperty('base_name'))
		{
			name = weapon.base_name;
			data.name = weapon.base_name + ' weapon focus';
			data.force = weapon.force;
		}

		switch (name)
		{
			case 'Knife':
				data.type = 'Melee';
				data.ability = 'Blades';
				data.acc = 5;
				data.dv = 1;
				data.damage_attribute = 'strength';
				data.ap = -1;
				break;

			case 'Katana':
				data.type = 'Melee';
				data.ability = 'Blades';
				data.acc = 7;
				data.dv = 3;
				data.damage_attribute = 'strength';
				data.ap = -3;
				data.reach = 1;
				break;

			case 'Spur':
				data.type = 'Melee';
				data.ability = 'Unarmed Combat';
				data.acc = 'Physical';
				data.dv = 3;
				data.damage_attribute = 'strength';
				data.ap = -2;
				break;

			case 'Club':
				data.type = 'Melee';
				data.ability = 'Clubs';
				data.acc = 4;
				data.dv = 3;
				data.damage_attribute = 'strength';
				data.reach = 1;
				break;

			case 'Stun Baton':
				data.type = 'Melee';
				data.ability = 'Clubs';
				data.acc = 4;
				data.dv = 9;
				data.damage_type = 'S(e)';
				data.ap = -5;
				data.reach = 1;
				break;

			case 'Defiance EX Shocker':
				data.type = 'Taser';
				data.ability = 'Pistols';
				data.acc = 4;
				data.dv = 9;
				data.damage_type = 'S(e)';
				data.ap = -5;
				data.modes = 'SS';
				data.ammo_count = 4;
				data.reload = 'm';
				break;

			case 'Colt America L36':
				data.type = 'Light Pistol';
				data.ability = 'Pistols';
				data.acc = 7;
				data.dv = 7;
				data.modes = 'SA';
				data.ammo_count = 11;
				data.reload = 'c';
				break;

			case 'Fichetti Security 600':
				data.type = 'Light Pistol';
				data.ability = 'Pistols';
				data.acc = 6;
				data.acc_modified = 7;
				data.dv = 7;
				data.modes = 'SA';
				data.rc_modified = 1;
				data.ammo_count = 30;
				data.reload = 'c';
				break;

			case 'Ares Predator V':
				data.type = 'Heavy Pistol';
				data.ability = 'Pistols';
				data.acc = 5;
				data.acc_modified = 7;
				data.dv = 8;
				data.ap = -1;
				data.modes = 'SA';
				data.ammo_count = 15;
				data.reload = 'c';
				break;

			case 'Browning Ultra-Power':
				data.type = 'Heavy Pistol';
				data.ability = 'Pistols';
				data.acc = 5;
				data.acc_modified = 6;
				data.dv = 8;
				data.ap = -1;
				data.modes = 'SA';
				data.ammo_count = 10;
				data.reload = 'c';
				break;

			case 'Remington Roomsweeper':
				data.type = 'Heavy Pistol';
				data.ability = 'Pistols';
				data.acc = 4;
				data.dv = 7;
				data.ap = -1;
				data.modes = 'SA';
				data.ammo_count = 8;
				data.reload = 'm';
				break;

			case 'Ceska Black Scorpion':
				data.type = 'Machine Pistol';
				data.ability = 'Automatics';
				data.acc = 5;
				data.dv = 6;
				data.modes = 'SA/BF';
				data.rc_modified = 1;
				data.ammo_count = 35;
				data.reload = 'c';
				break;

			case 'Steyr TMP':
				data.type = 'Machine Pistol';
				data.ability = 'Automatics';
				data.acc = 4;
				data.dv = 7;
				data.modes = 'SA/BF/FA';
				data.ammo_count = 30;
				data.reload = 'c';
				break;

			case 'Colt Cobra TZ-120':
				data.type = 'SMG';
				data.ability = 'Automatics';
				data.acc = 4;
				data.acc_modified = 5;
				data.dv = 7;
				data.modes = 'SA/BF/FA';
				data.rc = 2;
				data.rc_modified = 3;
				data.ammo_count = 32;
				data.reload = 'c';
				break;

			case 'FN P93 Praetor':
				data.type = 'SMG';
				data.ability = 'Automatics';
				data.acc = 6;
				data.dv = 8;
				data.modes = 'SA/BF/FA';
				data.rc = 1;
				data.rc_modified = 2;
				data.ammo_count = 50;
				data.reload = 'c';
				break;

			case 'HK 227':
				data.type = 'SMG';
				data.ability = 'Automatics';
				data.acc = 5;
				data.acc_modified = 7;
				data.dv = 7;
				data.modes = 'SA/BF/FA';
				data.rc_modified = 1;
				data.ammo_count = 28;
				data.reload = 'c';
				break;

			case 'AK-97':
				data.type = 'Assault Rifle';
				data.ability = 'Automatics';
				data.acc = 5;
				data.dv = 10;
				data.ap = -2;
				data.modes = 'SA/BF/FA';
				data.ammo_count = 38;
				data.reload = 'c';
				break;

			case 'Ares Alpha':
				data.type = 'Assault Rifle';
				data.ability = 'Automatics';
				data.acc = 5;
				data.acc_modified = 7;
				data.dv = 11;
				data.ap = -2;
				data.modes = 'SA/BF/FA';
				data.rc = 2;
				data.ammo_count = 42;
				data.reload = 'c';
				break;

			case 'FN HAR':
				data.type = 'Assault Rifle';
				data.ability = 'Automatics';
				data.acc = 5;
				data.acc_modified = 6;
				data.dv = 10;
				data.ap = -2;
				data.modes = 'SA/BF/FA';
				data.rc = 2;
				data.ammo_count = 35;
				data.reload = 'c';
				break;

			case 'Cavalier Arms Crockett EBR':
				data.type = 'Sniper Rifle';
				data.ability = 'Longarms';
				data.acc = 6;
				data.dv = 12;
				data.ap = -3;
				data.modes = 'SA/BF';
				data.rc_modified = 1;
				data.ammo_count = 20;
				data.reload = 'c';
				break;

			case 'Enfield AS-7':
				data.type = 'Shotgun';
				data.ability = 'Longarms';
				data.acc = 4;
				data.acc_modified = 5;
				data.dv = 13;
				data.ap = -1;
				data.modes = 'SA/BF';
				data.ammo_count = 10;
				data.reload = 'c';
				break;
		}

		return data;
	}
};

var roll = {
	dval: function(dice)
	{
		return Math.floor(Math.random() * dice + 1);
	},

	d: function(count, options)
	{
		if (options === undefined)
		{
			options = {};
		}

		options = $.extend({}, {
			pre_edge: false
		}, options);

		var hits = 0, i, v, e, res = {
			glitch: false,
			crit_glitch: false
		};

		var rolls = [];

		for (i = count; i > 0; i--)
		{
			v = this.dval(6);
			rolls.push(v);
			hits += (v >= 5) ? 1 : 0;
			if (v === 6 && options.pre_edge)
			{
				e = this.d(1, {pre_edge: true});
				hits += e.hits;
				rolls = rolls.concat(e.rolls);
			}
		}

		res.hits = hits;

		res.rolls = rolls.sort(function (a, b)
		{
			return a - b;
		});

		res.misses = rolls.filter(function (i) {return i === 1}).length;

		if (res.misses >= Math.ceil(count / 2))
		{
			if (hits === 0)
			{
				res.crit_glitch = true;
			}
			else
			{
				res.glitch = true;
			}
		}

		return res;
	},

	half: function(pool, down)
	{
		if (down)
		{
			return Math.floor(pool / 2);
		}
		return Math.ceil(pool / 2);
	},

	random_attribute: function ()
	{
		switch(this.dval(2))
		{
			case 1:
				return this.random_mental_attribute();
			default:
				return this.random_physical_attribute();
		}
	},

	random_mental_attribute: function ()
	{
		switch(this.dval(4))
		{
			case 1:
				return 'will';
			case 2:
				return 'logic';
			case 3:
				return 'intuition';
			default:
				return 'charisma';
		}
	},

	random_physical_attribute: function ()
	{
		switch(this.dval(4))
		{
			case 1:
				return 'body';
			case 2:
				return 'agility';
			case 3:
				return 'reaction';
			default:
				return 'strength';
		}
	}
};

var gen = {
	type_options: ['civilian', 'thug', 'ganger', 'corpsec', 'police', 'cultist', 'htr', 'specops', 'mob'],
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
			adjust.armor.forEach(function (item) {
				if (typeof item === 'object' || !base.armor.includes(item))
				{
					base.armor.push(item);
				}
			});
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
			professional_type: options.professional_type
		};

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

var render = {
	templates: null,

	mook: function($target, data, options)
	{
		if (options === undefined)
		{
			options = {};
		}

		options = $.extend({}, {
			mode: 'display'
		}, options);

		console.log('render.mook()', data);

		switch (options.mode)
		{
			default:
			case 'display':
				this.mook_for_view($target, data, options);
				break;
			case 'action':
				this.mook_for_action($target, data, options);
				break;
			case 'edit':
				this.mook_for_edit($target, data, options);
				break;
			case 'print':
				this.mook_for_print($target, data, options);
				break;
		}
	},

	mook_for_print: function($target, data, options)
	{
		// TODO for now, just use the existing one
		this.mook_for_view($target, data, options);
	},

	mook_for_edit: function($target, data, options)
	{
		// TODO for now, just use the existing one
		this.mook_for_view($target, data, options);
	},

	mook_for_action: function($target, data, options)
	{
		// TODO for now, just use the existing one
		this.mook_for_view($target, data, options);
	},

	mook_for_view: function($target, data, options)
	{
		// Given a target, nuke all contents and make a pretty rendering attached to the target
		// will need to calculate augmented attributes, limits, and damage resistance pool
		var i, $mook = render.get_template('render__display_npc');

		$target.empty().append($mook);

		// Fill in the name
		$mook.find('.npc_name').html(data.name);

		// Fill in the description
		var description = data.gender + ' ' + data.race + ', Rating ' + data.professional_rating + ' ' + data.professional_description;

		if (data.special.is_lt)
			description += ' Lieutenant';
		if (data.special.is_decker)
			description += ' Decker';
		if (data.special.is_adept)
			description += ' Physical Adept';
		if (data.special.is_mage)
			description += ' Magician';

		$mook.find('.npc_description').html(description);

		// Base Attributes
		var augmented_attributes = this.calc_augmented_attributes(data);
		var base_attributes = ['body', 'agility', 'reaction', 'strength', 'will', 'logic', 'intuition', 'charisma'];

		base_attributes.forEach(function (i)
		{
			var a = data.attributes[i];
			if (augmented_attributes[i] !== data.attributes[i])
			{
				a += ' (' + augmented_attributes[i] + ')';
			}
			$mook.find('.attribute_values .attribute_value.' + i).html(a);
		});

		// Essence
		// Working around display issues of whole numbers vs repeating numbers
		if (augmented_attributes.essence % 1 === 0)
		{
			$mook.find('.attribute_values .attribute_value.essence').html(augmented_attributes.essence);
		}
		else if ((augmented_attributes.essence * 10) % 1 === 0)
		{
			$mook.find('.attribute_values .attribute_value.essence').html(augmented_attributes.essence.toFixed(1));
		}
		else
		{
			$mook.find('.attribute_values .attribute_value.essence').html(augmented_attributes.essence.toFixed(2));
		}

		// Set/Hide Magic
		if (data.special.hasOwnProperty('Magic'))
		{
			$mook.find('.attribute_values .attribute_value.magic').html(data.special.Magic);
		}
		else
		{
			$mook.find('.attribute_name.magic, .attribute_value.magic').hide();
		}

		// Initiative
		var initiative = this.calc_initiative(data, augmented_attributes);

		var init_display = initiative.base + ' ';

		if (initiative.base !== initiative.base_augmented)
		{
			init_display += '(' + initiative.base_augmented + ') ';
		}

		init_display += '+ ' + initiative.dice + 'D6';

		if (initiative.base !== initiative.base_augmented)
		{
			init_display += ' (' + initiative.dice_augmented + 'D6)';
		}

		$mook.find('.information .initiative .value').html(init_display);

		if (data.special.is_decker === true)
		{
			initiative = this.calc_initiative(data, augmented_attributes, 'matrix');
			$mook.find('.information .matrix_initiative .value').html('Data Processing + ' + initiative.base + ' + ' + initiative.dice + 'D6');
		}
		else
		{
			$mook.find('.information .matrix_initiative').hide();
		}

		if (data.special.is_mage === true)
		{
			initiative = this.calc_initiative(data, augmented_attributes, 'astral');
			$mook.find('.information .astral_initiative .value').html(initiative.base + ' + ' + initiative.dice + 'D6');
		}
		else
		{
			$mook.find('.information .astral_initiative').hide();
		}

		// Condition Monitor
		var cm = data.attributes.body > data.attributes.will ? data.attributes.body : data.attributes.will;

		$mook.find('.information .condition_monitor .value').html(8 + roll.half(cm));

		// Limits
		var limits = this.calc_limits(data.attributes, augmented_attributes);

		var limit_display = '';

		if (limits.physical === limits.physical_aug)
			limit_display += 'Physical ' + limits.physical + ', ';
		else
			limit_display += 'Physical ' + limits.physical + ' (' + limits.physical_aug + '), ';

		if (limits.mental === limits.mental_aug)
			limit_display += 'Mental ' + limits.mental + ', ';
		else
			limit_display += 'Mental ' + limits.mental + ' (' + limits.mental_aug + '), ';

		if (limits.social === limits.social_aug)
			limit_display += 'Social ' + limits.social;
		else
			limit_display += 'Social ' + limits.social + ' (' + limits.social_aug + ')';

		$mook.find('.information .limits .value').html(limit_display);

		// Qualities
		if (data.qualities.positive.length === 0 && data.qualities.negative.length === 0)
		{
			$mook.find('.information .qualities').hide();
		}
		else
		{
			$mook.find('.information .qualities .value').html(data.qualities.positive.concat(data.qualities.negative).join(', '));
		}

		// Initiate Grade
		if (data.special.hasOwnProperty('Initiate'))
		{
			$mook.find('.information .initiate_grade .value').html(data.special.Initiate);
		}
		else
		{
			$mook.find('.information .initiate_grade').hide();
		}

		// Skills
		var skills = [], improved_skills = [], improved_rating = 0;
		// TODO This only really accounts for 1 improved ability, but that's all that is generated right now

		if (data.special.is_adept === true)
		{
			for (i in data.special.powers)
			{
				var improved_power = data.special.powers[i];

				if (improved_power.name === 'Improved Ability')
				{
					improved_skills.push(improved_power.ability);

					improved_rating = improved_rating < improved_power.rating ? improved_power.rating : improved_rating;
				}
			}
		}

		for (var skill in data.skills)
		{
			if (improved_skills.includes(skill))
				skills.push(skill + ' ' + data.skills[skill] + ' (' + (data.skills[skill] + improved_rating) + ')');

			if (data.skills[skill] > 0)
				skills.push(skill + ' ' + data.skills[skill]);
		}

		$mook.find('.information .skills .value').html(skills.join(', '));

		// Augmentations
		if (data.augmentations.length)
		{
			var augments = [], augment, aug;

			for (i in data.augmentations)
			{
				aug = data.augmentations[i];

				if (aug === 'Spur')
				{
					augments.push('Retractable Spur');
					continue;
				}

				if (typeof aug === 'string')
				{
					augments.push(aug);
					continue;
				}

				augment = aug.name;

				if (aug.hasOwnProperty('rating'))
				{
					augment += ' ' + aug.rating;
				}

				if (aug.hasOwnProperty('augments'))
				{
					augment += ' (' + aug.augments.join(', ') + ')';
				}

				augments.push(augment);
			}

			$mook.find('.information .augments .value').html(augments.join(', '));
		}
		else
		{
			$mook.find('.information .augments').hide();
		}

		// Armor & Damage Resistance
		// The PQ Toughness grants 1 bonus soak die
		var soak = (data.qualities.positive.includes('Toughness')) ? 1 : 0;

		soak += augmented_attributes.body;

		if (data.augmentations.includes('Troll Dermal Deposits'))
		{
			soak++;
		}

		if (data.armor.includes('Full body armor'))
		{
			var armor = 'Full Body Armor (15)';

			soak += 15;

			if (data.armor.includes('Full helmet'))
			{
				armor += ', Helmet (+3)';
				soak += 3;
			}

			if (data.armor.includes('Chemical Seal'))
			{
				armor += ' w/ chemical seal';
			}

			$mook.find('.information .armor .value').html(armor);
		}
		else if (data.armor.includes('Armor Jacket'))
		{
			$mook.find('.information .armor .value').html('Armor Jacket (12)');
			soak += 12;
		}
		else if (data.armor.includes('Lined Coat'))
		{
			$mook.find('.information .armor .value').html('Lined Coat (9)');
			soak += 9;
		}
		else if (data.armor.includes('Armor Vest'))
		{
			$mook.find('.information .armor .value').html('Armor Vest (9)');
			soak += 9;
		}
		else
		{
			$mook.find('.information .armor').hide();
		}

		$mook.find('.information .damage_resistance .value').html(soak);

		// Weapons & Gear & Commlink
		var gear = [], melee = [], ranged = [], entry_text, entry;

		for (i in data.weapons)
		{
			// clone object
			var weapon, weapon_stats;

			if (typeof data.weapons[i] === 'string')
			{
				weapon = {
					name: data.weapons[i]
				}
			}
			else
			{
				weapon = $.extend({}, data.weapons[i]);
			}

			weapon_stats = db.get_weapon_attributes(weapon);

			if (weapon_stats.type === 'Melee')
				melee.push(weapon_stats);
			else
				ranged.push(weapon_stats);
		}

		for (i in melee)
		{
			entry = melee[i];

			entry_text = [entry.ability];

			if (entry.hasOwnProperty('force'))
				entry_text.push('Force ' + entry.force);

			if (entry.acc_modified !== '')
				entry_text.push('Acc ' + entry.acc + ' (' + entry.acc_modified + ')');
			else
				entry_text.push('Acc ' + entry.acc);

			entry_text.push('Reach ' + entry.reach);

			if (entry.damage_attribute === 'strength')
				entry_text.push('DV (STR + ' + entry.dv + ')' + entry.damage_type);
			else
				entry_text.push('DV ' + entry.dv + entry.damage_type);

			if (entry.ap !== 0)
				entry_text.push('AP ' + entry.ap);

			gear.push('<div>' + entry.name + ' [' + entry_text.join(', ') + ']</div>');
		}

		// Cyber-implanted Spur is a special case
		if (data.augmentations.includes('Spur'))
		{
			entry = db.get_weapon_attributes({name: 'Spur'});

			entry_text = [entry.ability];

			if (entry.hasOwnProperty('force'))
				entry_text.push('Force ' + entry.force);

			if (limits.physical === limits.physical_aug)
				entry_text.push('Acc ' + limits.physical);
			else
				entry_text.push('Acc ' + limits.physical + ' (' + limits.physical_aug + ')');

			entry_text.push('Reach ' + entry.reach);

			if (entry.damage_attribute === 'strength')
				entry_text.push('DV (STR + ' + entry.dv + ')' + entry.damage_type);
			else
				entry_text.push('DV ' + entry.dv + entry.damage_type);

			if (entry.ap !== 0)
				entry_text.push('AP ' + entry.ap);

			gear.push('<div>Cyber Spur [' + entry_text.join(', ') + ']</div>');
		}

		for (i in ranged)
		{
			entry = ranged[i];

			entry_text = [entry.type];

			if (entry.acc_modified !== '')
				entry_text.push('Acc ' + entry.acc + ' (' + entry.acc_modified + ')');
			else
				entry_text.push('Acc ' + entry.acc);

			if (entry.damage_attribute === 'strength')
				entry_text.push('DV (STR + ' + entry.dv + ')' + entry.damage_type);
			else
				entry_text.push('DV ' + entry.dv + entry.damage_type);

			if (entry.ap !== 0)
				entry_text.push('AP ' + entry.ap);

			entry_text.push(entry.modes);

			if (entry.rc < entry.rc_modified)
				entry_text.push('RC ' + entry.rc + ' (' + entry.rc_modified + ')');
			else
				entry_text.push('RC ' + entry.dv);

			entry_text.push(entry.ammo_count + '(' + entry.reload + ')');

			if (entry.ammo_type !== '')
				entry_text.push('w/' + entry.ammo_type + ' ammo');

			gear.push('<div>' + entry.name + ' [' + entry_text.join(', ') + ']</div>');
		}

		// Gear
		var simple_gear = [], complex_gear = [];

		for (i in data.gear)
		{
			if (typeof data.gear[i] === 'string')
			{
				simple_gear.push(data.gear[i]);
				continue;
			}

			if (data.gear[i].type === 'cyberdeck')
			{
				switch (data.gear[i].rating)
				{
					default:
					case 1:
						complex_gear.push('Erika MCD-1 cyberdeck (DR 1, Atts 4 3 2 1, Programs 1)');
						break;
					case 2:
						complex_gear.push('Hermes Chariot cyberdeck (DR 2, Atts 5 4 3 2, Programs 2)');
						break;
					case 5:
						complex_gear.push('Shiawase Cyber-5 cyberdeck (DR 5, Atts 8 7 6 5, Programs 5)');
						break;
				}
			}

			if (data.gear[i].name === 'Qi Focus')
			{
				complex_gear.push('Qi Focus (Force ' + data.gear[i].force + ', ' + data.gear[i].power + ' ' + data.gear[i].rating + ')');
			}
		}

		for (i in complex_gear)
		{
			gear.push("<div>" + complex_gear[i] + "</div>");
		}

		if (simple_gear.length > 0)
		{
			gear.push("<div>" + simple_gear.join(', ') + "</div>");
		}

		// Commlink
		var commlink = '';

		switch (data.commlink)
		{
			default:
			case 1:
				commlink = 'Meta Link';
				break;
			case 2:
				commlink = 'Sony Emperor';
				break;
			case 3:
				commlink = 'Renraku Sensei';
				break;
			case 4:
				commlink = 'Erika Elite';
				break;
			case 5:
				commlink = 'Hermes Ikon';
				break;
			case 6:
				commlink = 'Transys Avalon';
		}

		commlink += ' commlink (DR ' + data.commlink + ')';

		commlink = '<div>' + commlink + '</div>';

		gear.push(commlink);

		$mook.find('.information .gear .value').html(gear.join(''));

		// Adept Powers
		if (data.special.is_adept === true)
		{
			var powers = [], power;

			for (i in data.special.powers)
			{
				power = data.special.powers[i].name;

				if (data.special.powers[i].hasOwnProperty('ability'))
				{
					power += ' (' + data.special.powers[i].ability + ')';
				}

				if (data.special.powers[i].hasOwnProperty('attribute'))
				{
					power = 'Improved ' + data.special.powers[i].attribute;
				}

				power += ' ' + data.special.powers[i].rating;

				powers.push(power);
			}

			$mook.find('.information .powers .value').html(powers.join(', '));
		}
		else
		{
			$mook.find('.information .powers').hide();
		}

		// Mage spells
		if (data.special.is_mage === true)
		{
			$mook.find('.information .spells .value').html(data.special.spells.join(', '));
		}
		else
		{
			$mook.find('.information .spells').hide();
		}

		// Decker Programs
		if (data.special.is_decker === true)
		{
			// Find the deck in the gear, get the programs from it
			var deck;

			for (i in data.gear)
			{
				if (data.gear[i].hasOwnProperty('type') && data.gear[i].type === 'cyberdeck')
				{
					deck = data.gear[i];
				}
			}

			$mook.find('.information .programs .value').html(deck.programs.join(', '));
		}
		else
		{
			$mook.find('.information .programs').hide();
		}
	},

	calc_augmented_attributes: function(data)
	{
		var attr = $.extend({}, data.attributes);

		attr.essence = 6;

		// Muscle Augmentation
		data.augmentations.forEach(function (aug)
		{
			var name = aug;

			if (aug.hasOwnProperty('name'))
				name = aug.name;

			switch (name)
			{
				case 'Muscle Augmentation':
					attr.strength += aug.rating;
					attr.essence -= aug.rating * 0.2;
					break;

				case 'Muscle Toner':
					attr.agility += aug.rating;
					attr.essence -= aug.rating * 0.2;
					break;

				case 'Cerebellum Booster':
					attr.intuition += aug.rating;
					attr.essence -= aug.rating * 0.2;
					break;

				case 'Cerebral Booster':
					attr.logic += aug.rating;
					attr.essence -= aug.rating * 0.2;
					break;

				case 'Wired Reflexes':
					attr.reaction += aug.rating;
					if (aug.rating === 1)
						attr.essence -= 2;
					else if (aug.rating === 2)
						attr.essence -= 3;
					else if (aug.rating === 3)
						attr.essence -= 5;
					break;

				case 'Synaptic Booster':
					attr.reaction += aug.rating;
					attr.essence -= aug.rating * 0.5;
					break;

				case 'Spur':
					attr.essence -= 0.3;
					break;
			}
		});

		if (data.special.hasOwnProperty('powers'))
		{
			data.special.powers.forEach(function (power)
			{
				switch (power.name)
				{
					case 'Improved Reflexes':
						attr.reaction += power.rating;
						break;

					case 'Improved Physical Attribute':
						attr[power.attribute.toLowerCase()] += power.rating;
						break;
				}
			});

			// Also look through the gear section for Qi Foci
			for (var i in data.gear)
			{
				if (data.gear[i].hasOwnProperty('name') && data.gear[i].name === 'Qi Focus')
				{
					var focus = data.gear[i];

					if (focus.hasOwnProperty('type') && focus.type === 'Improve Attribute')
					{
						attr[focus.attribute] += focus.rating;
					}
				}
			}
		}

		// No cyber-zombies
		if (attr.essence <= 0)
		{
			attr.essence = 0.1;
		}

		return attr;
	},

	calc_initiative: function (data, augmented_attributes, mode)
	{
		var base = data.attributes.reaction + data.attributes.intuition;

		var base_aug = augmented_attributes.reaction + augmented_attributes.intuition;

		var dice = 1;

		var dice_aug = 1;

		if (mode === 'astral')
		{
			base = data.attributes.intuition * 2;
			base_aug = augmented_attributes.intuition * 2;
			dice = 2;
		}
		else if (mode === 'matrix')
		{
			// The display is difference because it is deck-config dependant
			base = data.attributes.intuition;
			base_aug = augmented_attributes.intuition;
			dice = 4;
		}
		else
		{
			data.augmentations.forEach(function (aug)
			{
				switch (aug.name)
				{
					case 'Wired Reflexes':
					case 'Synaptic Booster':
						dice_aug += aug.rating;
						break;
				}
			});

			if (data.special.hasOwnProperty('powers'))
			{
				data.special.powers.forEach(function (power)
				{
					switch (power.name)
					{
						case 'Improved Reflexes':
							dice_aug += power.rating;
							break;
					}
				});
			}
		}

		return {
			base: base,
			base_augmented: base_aug,
			dice: dice,
			dice_augmented: dice_aug
		}
	},

	calc_limits: function(attr, aug)
	{
		return {
			physical: Math.ceil((attr.strength * 2 + attr.reaction + attr.body) / 3),
			physical_aug: Math.ceil((aug.strength * 2 + aug.reaction + aug.body) / 3),
			mental: Math.ceil((attr.logic * 2 + attr.intuition + attr.will) / 3),
			mental_aug: Math.ceil((aug.logic * 2 + aug.intuition + aug.will) / 3),
			social: Math.ceil((attr.charisma * 2 + attr.will + aug.essence) / 3),
			social_aug: Math.ceil((aug.charisma * 2 + aug.will + aug.essence) / 3)
		}
	},

	get_templates: function()
	{
		render.templates = $('div[template_holder]').detach();
	},

	get_template: function(template)
	{
		var ret = $(render.templates).find('div[template="' + template + '"]').clone();

		if (!ret.length)
		{
			console.warn('Failed to locate template "' + template + '"');
			return null;
		}

		ret.removeAttr('template');

		return ret;
	},

	equalize_widths: function($elems)
	{
		var widest = 0;

		$elems.each(function()
		{
			widest = $(this).width() > widest ? $(this).width() : widest;
		}).width(widest);
	}
};

var storage = {
	initialize_storage: function()
	{
		// Set up any expected things in localStorage
		localStorage.build_id = build_id;

		// // Cast of Shadows
		// What tab ID were we last snowing?
		localStorage.cast_tab_id = null;

		// What character ID did we last create?
		localStorage.cast_character_id = 1;

		// What tab did we show last?
		localStorage.cast_current_tab = null;

		// What tabs are there?
		localStorage.cast_tabs = JSON.stringify([
			{
				tab_id: 1,
				name: 'Full Cast',
				order: 1,
				characters: [] // This is an array of {character_id, order} objects
			}
		]);

		localStorage.cast_characters = JSON.stringify([]);

		localStorage.cast_character_template = JSON.stringify({
			character_id: null,
			type: '',
			data: null
		});
	},

	// Return an array of tabs with their name, tab ID, and display ordering
	get_tabs: function()
	{
		var stored_tabs = JSON.parse(localStorage.cast_tabs);

		stored_tabs.forEach(function(tab)
		{
			tab.href = tab.name.replace(/( )/g, '_').replace(/\W/g, '');
		});

		stored_tabs.sort(function (a, b)
		{
			return a.order - b.order;
		});

		return stored_tabs;
	},

	// Return the currently displayed tab ID
	get_current_tab: function()
	{
	},

	// Get information about a tab
	get_tab: function(tab_id)
	{
	},

	// Update a given tab, also for adding a new tab
	set_tab: function(tab_id, name, order)
	{
		// If the order isn't the same as the existing tabs, update other tabs to match?
		var stored_tabs = JSON.parse(localStorage.cast_tabs);

		var lower_order, upper_order, change_direction = false;

		stored_tabs.forEach(function(tab)
		{
			if (tab_id === tab.tab_id)
			{
				if (name !== null && name !== tab.name)
				{
					tab.name = name;
				}

				if (Number.isInteger(order) && order !== tab.order)
				{
					upper_order = Math.max(tab.order, order);
					lower_order = Math.min(tab.order, order);
					change_direction = (tab.order > order) ? 1 : -1;
					tab.order = order;
				}
			}
		});

		if (change_direction !== false)
		{
			stored_tabs.forEach(function(tab)
			{
				if (tab_id !== tab.tab_id && tab.order >= lower_order && tab.order <= upper_order)
				{
					tab.order += change_direction;
				}
			});
		}

		localStorage.cast_tabs = JSON.stringify(stored_tabs);
	},

	// Delete a given tab from storage
	delete_tab: function(tab_id)
	{
		if (tab_id === 1)
			return;

		var stored_tabs = JSON.parse(localStorage.cast_tabs), new_tabs = [];

		stored_tabs.forEach(function(tab)
		{
			if (tab.tab_id !== tab_id)
				new_tabs.push(tab);
		});

		localStorage.cast_tabs = JSON.stringify(new_tabs);
	},

	generate_character_id: function()
	{
	},

	// Return the ID of the newly created tab
	create_tab: function(tab_name)
	{
		// Find the highest tab ID now
		var tab_id = 1, sort_order, stored_tabs = JSON.parse(localStorage.cast_tabs);

		sort_order = stored_tabs.length + 1;

		stored_tabs.forEach(function(tab)
		{
			tab_id = Math.max(tab_id, tab.tab_id);
		});

		tab_id++;

		stored_tabs.push({
			tab_id: tab_id,
			name: tab_name,
			order: sort_order,
			characters: []
		});

		localStorage.cast_tabs = JSON.stringify(stored_tabs);

		return tab_id;
	}
};

function view_cast()
{
	var $container = $('.main_content').empty();

	var $template = render.get_template('cast_of_shadows');

	var tabs_added = 0;

	$container.append($template);

	var tabs = storage.get_tabs();

	console.log('tabs', tabs);

	tabs.forEach(function(tab)
	{
		tabs_added++;

		var $href = $('<a>' + tab.name + '</a>').attr('href', '#' + tab.href);

		var $li = $('<li/>').append($href);

		$template.find('ul.cast_tabs').append($li);

		var $div = $('<div/>', {id: tab.href}).appendTo($template.find('.cast_of_shadows'));

		// TODO Need to add all the character IDs to the tab so they can be filled out too
		$div.addClass('cast_tab').prop('characters', tab.characters);

		// TODO Need a section to let you copy in characters from the main tab
		$div.append($("<div/>").html(tab.name)).append("TODO Add a way to copy in cast members");

		// Add a row for editing this tab to the introduction edit area
		var $row_template = render.get_template('edit_tab_row');

		$row_template.appendTo($template.find('.edit_tab_wrapper'));

		$row_template.find('#tab_name').val(tab.name);

		// Check will save the name
		$row_template.find('button.tab_edit').button();

		$row_template.find('button.tab_edit').click(function ()
		{
			console.log('edit tab name', tab.tab_id, $row_template.find('#tab_name').val());

			var tab_name = $row_template.find('#tab_name').val().replace(/\W/g, '');

			if (tab.name !== tab_name && tab_name !== '')
			{
				storage.set_tab(tab.tab_id, tab_name);
				view_cast();
			}
		});

		// Up arrow moves tab up
		$row_template.find('button.tab_up').button();

		if (tabs_added > 1)
		{
			$row_template.find('button.tab_up').click(function ()
			{
				console.log('move tab up', tab.tab_id);
				storage.set_tab(tab.tab_id, null, (tab.order - 1));
				view_cast();
			});
		}
		else
		{
			$row_template.find('button.tab_up').button('disable');
		}

		// Down moves down
		$row_template.find('button.tab_down').button();

		if (tabs_added < tabs.length)
		{
			$row_template.find('button.tab_down').click(function ()
			{
				console.log('move tab down', tab.tab_id);
				storage.set_tab(tab.tab_id, null, (tab.order + 1));
				view_cast();
			});
		}
		else
		{
			$row_template.find('button.tab_down').button('disable');
		}

		// Don't allow the main tab to be deleted
		$row_template.find('button.delete_tab').button();

		if (tab.tab_id !== 1)
		{
			$row_template.find('button.delete_tab').click(function ()
			{
				console.log('delete tab', tab.tab_id);
				storage.delete_tab(tab.tab_id);
				view_cast();
			});
		}
		else
		{
			$row_template.find('button.delete_tab').button('disable');
		}
	});

	$template.tabs();

	// Be able to add a tab
	$template.find('button.add_tab').button().click(function()
	{
		var tab_name = $('.cast_of_shadows #add_tab_name').val();

		if (tab_name === '')
		{
			console.log('blank');
			return;
		}

		console.log('create tab!');

		storage.create_tab(tab_name);

		view_cast();
	});

	/*
	Get the list of tabs from a function
	-    function should also convert all strings into href-able strings
	for each tab
	-    add an li+href to the ul.cast_tabs
	-    append a div#id to div.cast_of_shadows
	TODO add the content that lets you edit tabs too.
	 */
}

function view_generator()
{
	var $container = $('.main_content').empty();

	var $template = render.get_template('minion_generator_section');

	var current_npc;

	$container.append($template);

	$template.find('.section_tabs').tabs();

	$template.find('button').button();

	$template.find('#generate_minion').on('click', function ()
	{
		var options = {};

		if ($('.main_content #minion_generator input[name="name"]').val())
		{
			options['name'] = $('.main_content #minion_generator input[name="name"]').val();
		}

		$('.main_content #minion_generator select').each(function ()
		{
			var option = $(this).attr('name');

			var value = $(this).find(':selected').val();

			if (option === 'is_special')
			{
				switch (value)
				{
					case 'is_lt':
					case 'is_decker':
					case 'is_adept':
					case 'is_mage':
						options[value] = true;
						break;
				}
			}
			else if (option === 'professional_rating')
			{
				if (value !== '')
				{
					options[option] = parseInt(value);
				}
			}
			else
			{
				if (value != '')
				{
					options[option] = value;
				}
			}
		});

		current_npc = gen.mook(options);

		render.mook($template.find('#generated_results'), current_npc);

		$template.find('#discard_minion').button('enable');

		$template.find('#add_to_cast').button('enable');
	});

	$template.find('#discard_minion').button('disable').click(function ()
	{
		$template.find('#generated_results').empty();

		$template.find('#discard_minion').button('disable');

		$template.find('#add_to_cast').button('disable');
	});

	$template.find('#add_to_cast').button('disable').click(function ()
	{
		// $template.find('#generated_results').empty();
		// $template.find('#discard_minion').button('disable');
		// $template.find('#add_to_cast').button('disable');
	});

	// TODO add a reset button to the form to reset all the values to default. Could just call view_generator()

	// TODO want a button that adds the generated mook to the cast as well as a specified tab
	render.equalize_widths($template.find('.section_tabs #minion_generator .input_row label[equalize]'));
}

function view_contact()
{
	var $container = $('.main_content').empty();

	$container.html('view the contact generator');
}

function view_run()
{
	var $container = $('.main_content').empty();

	$container.html('view the run generator');
}

function view_settings()
{
	var $container = $('.main_content').empty();

	var $template = render.get_template('settings');

	$container.append($template);

	$container.find('button').button();

	// Need to give it a hard-coded ID only after the template is cloned
	$container.find('.delete_localstorage_dialog').attr('id', 'delete_localstorage_dialog');

	$container.find('#delete_localstorage_dialog').dialog({
		autoOpen: false,
		modal: true,
		title: 'Frag the World!',
		width: 500,
		buttons: [
			{
				text: "Ok",
				click: function() {
					localStorage.clear();
					storage.initialize_storage();
					$( this ).dialog( "close" );
				}
			},
			{
				text: "Cancel",
				click: function() {
					$( this ).dialog( "close" );
				}
			}
		]
	});

	$container.find('#delete_localstorage').on('click', function ()
	{
		$('#delete_localstorage_dialog').dialog("open");
	});
}

function view_intro()
{
	var $container = $('.main_content').empty();

	var template = render.get_template('main_screen');

	$container.append(template);
}

function setup_controls()
{
	render.get_templates();

	// Set up the roll controls in the top bar
	$('.top_bar button').button();

	$('.top_bar .numbers button').addClass('smaller_button');

	$('.top_bar .numbers button').on('click', function ()
	{
		var dice = $(this).attr('roll'), options = {}, addition = '\n';

		var timestamp = new Date();

		addition += timestamp.toLocaleTimeString() + '; pool of ' + dice + '\n';

		if ($('.top_bar_roller #explode').is(':checked'))
		{
			options.pre_edge = true;
		}

		var results = roll.d(dice, options);

		addition += results.rolls.join(', ') + '\n' + results.hits;

		addition += (results.hits === 1) ? ' hit' : ' hits';

		// Our roller marks it as either a glitch or a critical glitch, not both
		if (results.crit_glitch)
		{
			addition += ', CRITICAL GLITCH!';
		}
		else if (results.glitch)
		{
			addition += ', glitch roll.';
		}

		update_results_text(addition);
	});

	var results_text = '';

	$('textarea#roll_results').html(results_text);

	function update_results_text(text)
	{
		results_text = results_text + "\n" + text;

		$('textarea#roll_results').html(results_text);

		if ($('textarea#roll_results').length)
		{
			$('textarea#roll_results').scrollTop($('textarea#roll_results')[0].scrollHeight - $('textarea#roll_results').height());
		}

		$('.top_bar .numbers button').blur();
	}

	// Set up the buttons in the menu
	$('.menu button').button();

	$('.menu .cast').on('click', view_cast);

	$('.menu .minion').on('click', view_generator);

	$('.menu .contact').on('click', view_contact).hide(); // TODO Hidden until I have it working

	$('.menu .run').on('click', view_run).hide(); // TODO Hidden until I have it working

	$('.menu .settings').on('click', view_settings);

	$('.top_bar .title').on('click', view_intro);

	$('.top_bar .version').text('Version - ' + build_id);

	view_intro();

	// Initialization checks
	if (!localStorage)
	{
		// TODO prettyify
		alert('Your browser is too old to run this utility. Please upgrade.');
	}

	var $build_mismatch_dialog = $('.build_mismatch_nuke_storage').dialog({
		autoOpen: false,
		modal: true,
		title: 'Fatal Version Mismatch',
		width: 500,
		buttons: [
			{
				text: "Ok",
				click: function() {
					localStorage.clear();
					storage.initialize_storage();
					$( this ).dialog( "close" );
				}
			},
			{
				text: "Cancel",
				click: function() {
					$( this ).dialog( "close" );
				}
			}
		]
	});

	if (localStorage.build_id && localStorage.build_id !== build_id)
	{
		$build_mismatch_dialog.find('[software_version]').html('Version ' + build_id);

		$build_mismatch_dialog.find('[stored_version]').html('Version ' + localStorage.build_id);

		// TODO make this link actually work and point to the 'right' place.
		$build_mismatch_dialog.find('[link]').html($('<a/>').attr('href', download_url).text(download_url));

		// TODO remove this line when the above is done
		$build_mismatch_dialog.find('[link]').detach();

		$('.build_mismatch_nuke_storage').dialog('open');
	}
}

var build_id = '0.3a';

var download_url = 'http://google.com';
