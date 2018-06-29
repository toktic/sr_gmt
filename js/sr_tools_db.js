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

	get_base_attributes: function(rating)
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

	get_type_adjustments: function(type, rating)
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
			armor: '',
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
				res.armor ='Armor Vest';
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
				res.armor = 'Armor Jacket';
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
				res.armor = 'Armor Jacket';
				res.weapons.push('Defiance EX Shocker');
				res.weapons.push('Stun Baton');
				res.gear.push({
					name: 'Sunglasses',
					rating: 2,
					augments: ['Image link', 'Smartlink', 'Low-light Vision']
				});
				res.gear.push({
					name: 'Jazz',
					quantity: 2
				});
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
				res.armor = 'Lined Coat';
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
				res.armor = 'Full Body Armor w/ Helmet & Chemical Seal';
				res.weapons.push('Ares Alpha');
				res.weapons.push('Ares Predator V');
				res.commlink = rating - 1;
				res.augmentations.push({
					name: 'Cybereyes',
					rating: 2,
					augments: ['Flare Compensation', 'Image link', 'Smartlink', 'Thermographic vision', 'Low-light Vision']
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
				res.armor = 'Full Body Armor w/ Helmet & Chemical Seal';
				res.gear.push({
					name: 'Grapple Gun'
				});
				res.gear.push({
					name: 'Smoke Grenade',
					quantity: 2
				});
				res.gear.push({
					name: 'Thermal Smoke Grenade',
					quantity: 2
				});
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
	get_special_adjustments: function(special_type, base_type, rating)
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
			armor: '',
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
					res.augmentations.push({name:'Cyber Spur'});
					res.armor = 'Armor Jacket';
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
						name: 'Goggles',
						rating: 2,
						augments: ['Image link', 'Smartlink', 'Thermographic Vision']
					});
					res.gear.push({
						name: 'Smoke Grenade',
						quantity: 2
					});
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
					res.armor = 'Armor Jacket';
					res.augmentations.push({name:'Cyber Spur'});
					res.gear.push({
						name: 'Jazz',
						quantity: 2
					});
					res.gear.push({
						name: 'Novacoke',
						quantity: 2
					});
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
					magic_focus: true,
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
					magic_focus: true,
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
				case 0:
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
						}
					);
					break;

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
				res.qualities.positive.push('Focused Concentration ' + (rating - 2));
			}

			// Gear
			res.gear.push({
				name: 'Psyche',
				quantity: 2
			});
			res.gear.push({
				name: 'Reagents',
				quantity: 10
			});
			res.gear.push({
				name: 'Spellcasting focus (Combat)',
				magic_focus: true,
				rating: rating
			});

			if (rating > 4)
			{
				res.gear.push({
					name: 'Power focus',
					magic_focus: true,
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
				res.gear.push({
					name: 'Psyche',
					quantity: 2
				});
			}

			if (rating > 2)
			{
				res.augmentations.push({
					name: 'Datajack'
				});
			}
			else
			{
				res.gear.push({
					name: 'Trodes'
				});
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

	get_metatype_adjustment: function(race)
	{
		var res = {
			attributes: {body: 0, agility: 0, reaction: 0, strength: 0, will: 0, logic: 0, intuition: 0, charisma: 0},
			min_attributes: {body: 1, agility: 1, reaction: 1, strength: 1, will: 1, logic: 1, intuition: 1, charisma: 1},
			max_attributes: {body: 6, agility: 6, reaction: 6, strength: 6, will: 6, logic: 6, intuition: 6, charisma: 6},
			augmentations: []
		};

		switch (race)
		{
			case 'Human':
				break;

			case 'Elf':
				res.attributes.agility = 1;
				res.min_attributes.agility = 2;
				res.max_attributes.agility = 7;
				res.attributes.charisma = 2;
				res.min_attributes.charisma = 3;
				res.max_attributes.charisma = 8;
				break;

			case 'Dwarf':
				res.attributes.body = 2;
				res.min_attributes.body = 3;
				res.max_attributes.body = 8;
				res.attributes.reaction = -1;
				res.min_attributes.reaction = 1;
				res.max_attributes.reaction = 5;
				res.attributes.strength = 2;
				res.min_attributes.strength = 3;
				res.max_attributes.strength = 8;
				res.attributes.will = 1;
				res.min_attributes.will = 2;
				res.max_attributes.will = 7;
				break;

			case 'Ork':
				res.attributes.body = 3;
				res.min_attributes.body = 4;
				res.max_attributes.body = 9;
				res.attributes.strength = 2;
				res.min_attributes.strength = 3;
				res.max_attributes.strength = 8;
				res.attributes.logic = -1;
				res.min_attributes.logic = 1;
				res.max_attributes.logic = 5;
				res.attributes.charisma = -1;
				res.min_attributes.charisma = 1;
				res.max_attributes.charisma = 5;
				break;

			case 'Troll':
				res.attributes.body = 4;
				res.min_attributes.body = 5;
				res.max_attributes.body = 10;
				res.attributes.agility = -1;
				res.min_attributes.agility = 1;
				res.max_attributes.agility = 5;
				res.attributes.strength = 4;
				res.min_attributes.strength = 5;
				res.max_attributes.strength = 10;
				res.attributes.logic = -1;
				res.min_attributes.logic = 1;
				res.max_attributes.logic = 5;
				res.attributes.intuition = -1;
				res.min_attributes.intuition = 1;
				res.max_attributes.intuition = 5;
				res.attributes.charisma = -2;
				res.min_attributes.charisma = 1;
				res.max_attributes.charisma = 4;
				res.augmentations.push({name: 'Troll Dermal Deposits'});
				break;

			default:
				console.log('ERROR: get_metatype_adjustment() with no known metatype');
				res = false;
				break;
		}

		return res;
	},

	get_weapon_attributes: function(weapon)
	{
		var name = weapon.name;

		var data = {
			name: name, // Display name of the weapon: Knife, Ares Predator V, etc.
			type: '', // Display type of the weapon: Light Pistol, SMG, etc.
			ability: '', // Linked ability: Blades, Automatics, etc.
			acc: '',
			acc_modified: null, // Modifier to conditionally apply due to smartlink, laser sight, etc.
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

			case 'Cyber Spur':
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

			case 'Streetline Special':
				data.type = 'Hold-out Pistol';
				data.ability = 'Pistols';
				data.acc = 4;
				data.dv = 6;
				data.modes = 'SA';
				data.ammo_count = 6;
				data.reload = 'c';
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

			case 'Defiance T-250':
				data.type = 'Shotgun';
				data.ability = 'Longarms';
				data.acc = 4;
				data.dv = 10;
				data.ap = -1;
				data.modes = 'SS/SA';
				data.ammo_count = 5;
				data.reload = 'm';
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

			case 'Ingram Valiant':
				data.type = 'LMG';
				data.ability = 'Heavy Weapons';
				data.acc = 5;
				data.acc_modified = 6;
				data.dv = 9;
				data.ap = -2;
				data.modes = 'BF/FA';
				data.ammo_count = 50;
				data.reload = 'c';
				break;

			case 'Panther XXL':
				data.type = 'Assault Cannon';
				data.ability = 'Heavy Weapons';
				data.acc = 5;
				data.acc_modified = 7;
				data.dv = 17;
				data.ap = -6;
				data.modes = 'SS';
				data.ammo_count = 15;
				data.reload = 'c';
				break;

			default:
				console.log('ERROR: get_weapon_attributes() with no known weapon name');
				res = false;
				break;
		}

		return data;
	},

	get_armor_list: function()
	{
		return {
			'Synth-Leather': 4,
			'Actioneer Business Clothes': 8,
			'Armor Clothing': 6,
			'Armor Jacket': 12,
			'Armor Vest': 9,
			'Chameleon Suit': 9,
			'Full Body Armor': 15,
			'Full Body Armor w/ Helmet & Chemical Seal': 18,
			'Lined Coat': 9,
			'Urban Explorer Jumpsuit': 9
		};
	},

	get_quality_list: function()
	{
		return {
			positive: [
				'Ambidextrous',
				'Analytical Mind',
				'Astral Chameleon',
				'Blandness',
				'First Impression',
				'Gearhead',
				'Guts',
				'Human-Looking',
				'Lucky',
				'Magical Resistance I',
				'Photographic Memory',
				'Toughness',
				'Will to Live I'
			],
			negative: [
				'Bad Luck',
				'Bad Rep',
				'Combat Paralysis',
				'Dependent(s) I',
				'Distinctive Style',
				'Elf Poser',
				'Gremlins I',
				'Insomnia I',
				'Loss of Confidence',
				'Ork Poser',
				'Scorched (BTLs)',
				'Sensitive System',
				'Social Stress',
				'Uncouth',
				'Uneducated'
			]
		};
	},

	get_skill_list: function()
	{
		return [
			'Arcana',
			'Assessing',
			'Astral Combat',
			'Automatics',
			'Banishing',
			'Binding',
			'Blades',
			'Clubs',
			'Computer',
			'Con',
			'Counterspelling',
			'Cybercombat',
			'Demolitions',
			'Disguise',
			'Electronic Warfare',
			'Etiquette',
			'First Aid',
			'Gunnery',
			'Gymnastics',
			'Hacking',
			'Hardware',
			'Heavy Weapons',
			'Impersonation',
			'Intimidation',
			'Leadership',
			'Longarms',
			'Navigation',
			'Negotiation',
			'Palming',
			'Perception',
			'Pilot Aircraft',
			'Pilot Ground Craft',
			'Pistols',
			'Running',
			'Sneaking',
			'Software',
			'Spellcasting',
			'Summoning',
			'Swimming',
			'Throwing Weapons',
			'Tracking',
			'Unarmed Combat'
		];
	},

	get_augmentation_list: function()
	{
		return [
			{
				name: 'Bone Density Augmentation',
				essence: 0.3,
				max_rating: 4
			},
			{
				name: 'Bone Lacing',
				essence: 0.5,
				max_rating: 3
			},
			{
				name: 'Cerebellum Booster',
				essence: 0.2,
				max_rating: 2
			},
			{
				name: 'Cerebral Booster',
				essence: 0.2,
				max_rating: 3
			},
			{
				name: 'Cybereyes',
				essence: 0.2,
				max_rating: 4,
				components: 'Flare Compensation, Image link, Smartlink, Thermographic vision, Low-light Vision'
			},
			{
				name: 'Datajack',
				essence: 0.1
			},
			{
				name: 'Dermal Plating',
				essence: 0.5,
				max_rating: 6
			},
			{
				name: 'Internal Air Tank',
				essence: 0.5
			},
			{
				name: 'Muscle Augmentation',
				essence: 0.2,
				max_rating: 4
			},
			{
				name: 'Muscle Toner',
				essence: 0.2,
				max_rating: 4
			},
			{
				name: 'Orthoskin',
				essence: 0.25,
				max_rating: 4
			},
			{
				name: 'Cyber Spur',
				essence: 0.3
			},
			{
				name: 'Synaptic Booster',
				essence: 0.5,
				max_rating: 3
			},
			{
				name: 'Wired Reflexes',
				essence: 2, // This isn't correct, but the section that calculates Essence does it right
				max_rating: 3
			},
			{
				name: 'Troll Dermal Deposits',
				essence: 0,
				selectable: false
			},
			{
				name: 'Jazz (Active)',
				essence: 0,
				selectable: false
			},
			{
				name: 'Jazz (Crash)',
				essence: 0,
				selectable: false
			},
			{
				name: 'Kamikaze (Active)',
				essence: 0,
				selectable: false
			},
			{
				name: 'Kamikaze (Crash)',
				essence: 0,
				selectable: false
			}
		];
	},

	get_weapon_list: function()
	{
		return [
			'AK-97',
			'Ares Alpha',
			'Ares Predator V',
			'Browning Ultra-Power',
			'Cavalier Arms Crockett EBR',
			'Ceska Black Scorpion',
			'Club',
			'Colt America L36',
			'Colt Cobra TZ-120',
			'Defiance EX Shocker',
			'Defiance T-250',
			'Enfield AS-7',
			'FN HAR',
			'FN P93 Praetor',
			'Fichetti Security 600',
			'HK 227',
			'Ingram Valiant',
			'Katana',
			'Knife',
			'Panther XXL',
			'Remington Roomsweeper',
			'Steyr TMP',
			'Streetline Special',
			'Stun Baton'
		];
	},

	get_gear_list: function()
	{
		return [
			{
				name: 'Sunglasses',
				rating: 2,
				augments: ['Image link', 'Smartlink', 'Low-light Vision']
			},
			{
				name: 'Goggles',
				rating: 2,
				augments: ['Image link', 'Smartlink', 'Thermographic Vision']
			},
			{
				name: 'Jazz',
				quantity: 2
			},
			{
				name: 'Kamikaze',
				quantity: 2
			},
			{
				name: 'Novacoke',
				quantity: 2
			},
			{
				name: 'Psyche',
				quantity: 2
			},
			{
				name: 'Reagents',
				quantity: 10
			},
			{
				name: 'Smoke Grenade',
				quantity: 2
			},
			{
				name: 'Thermal Smoke Grenade',
				quantity: 2
			},
			{
				name: 'Grapple Gun'
			},
			{
				name: 'Bug Scanner',
				rating: 2
			},
			{
				name: 'Flashlight'
			},
			{
				name: 'Stim Patch',
				rating: 3,
				quantity: 2
			},
			{
				name: 'Trodes'
			}
		];
	},

	get_skill_attributes: function (skill)
	{
		var data = {
			attribute: null,
			limit: null
		};

		switch (skill)
		{
			// Weapon based skills
			case 'Automatics':
			case 'Blades':
			case 'Clubs':
			case 'Heavy Weapons':
			case 'Longarms':
			case 'Pistols':
				data.attribute = 'agility';
				data.limit = 'gear';
				break;

			// Strength based skills
			case 'Running':
			case 'Swimming':
				data.attribute = 'strength';
				data.limit = 'physical';
				break;

			// Agility based skills
			case 'Gunnery':
			case 'Gymnastics':
			case 'Palming':
			case 'Sneaking':
			case 'Unarmed Combat':
			case 'Throwing Weapons':
				data.attribute = 'agility';
				data.limit = 'physical';
				break;

			// Reaction based skills
			case 'Pilot Ground Craft':
			case 'Pilot Aircraft':
				data.attribute = 'reaction';
				data.limit = 'gear';
				break;

			// Charisma based social skills
			case 'Con':
			case 'Etiquette':
			case 'Intimidation':
			case 'Leadership':
			case 'Negotiation':
			case 'Impersonation':
				data.attribute = 'charisma';
				data.limit = 'social';
				break;

			// Logic based skills
			case 'Arcana':
			case 'Computer':
			case 'Demolitions':
			case 'Cybercombat':
			case 'Electronic Warfare':
			case 'First Aid':
			case 'Hacking':
			case 'Hardware':
			case 'Software':
				data.attribute = 'logic';
				data.limit = 'mental';
				break;

			// Intuition based mental skills
			case 'Disguise':
			case 'Navigation':
			case 'Perception':
			case 'Tracking':
				data.attribute = 'intuition';
				data.limit = 'mental';
				break;

			// Willpower based skills
			case 'Astral Combat':
				data.attribute = 'will';
				data.limit = 'astral';
				break;

			// Magic based skills
			case 'Assessing':
			case 'Banishing':
			case 'Binding':
			case 'Counterspelling':
			case 'Spellcasting':
			case 'Summoning':
				data.attribute = 'magic';
				data.limit = 'force';
				break;

			default:
				console.log('ERROR: get_skill_attributes() with unknown skill', skill);
		}

		return data;
	}
};
