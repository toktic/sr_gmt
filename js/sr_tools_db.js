var db = {
	// Generate a random race
	gen_race: function()
	{
		var races = new Map();
		races.set(0.66, 'Human');
		races.set(0.16, 'Ork');
		races.set(0.13, 'Elf');
		races.set(0.02, 'Dwarf');
		races.set(0.02, 'Troll');
		races.set(0.01, 'other');

		var r = Math.random(), res, a = 0;

		for(let [key, value] of races)
		{
			a += key;
			if(r >= a)
				continue;

			res = value;
			break;
		}

		if(res === 'other')
		{
			var special = ['Gnome', 'Hanuman', 'Koborokuru', 'Menehune',
				'Dryade', 'Nocturna', 'Wakyambi', 'Xapiri Thepe',
				'Nartaki',
				'Hobgoblin', 'Ogre', 'Oni', 'Satyr',
				'Cyclops', 'Fomorian', 'Giant', 'Minotaur',
				'Vampire', 'Nosferatu', 'Banshee', 'Harvester', 'Goblin', 'Gnawer', 'Wendigo', 'Grendel', 'Fomoraig', 'Mutaqua',
				'Centaur', 'Naga', 'Pixie', 'Sasquatch'];
			res = special[Math.floor(Math.random() * special.length)]
		}

		return res;
	},

	get_base_attributes: function(rating)
	{
		//TODO: Add more variety
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

				if (roll.dval(6) === 6)
				{
					res.skills.Pistols = 1 + rating;
					res.armor = 'Armor Clothing';
					res.weapons.push('Defiance EX Shocker');
				}
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

				if (rating > 4 || roll.dval(3) === 3)
				{
					res.skills.Pistols = 1 + rating;
					res.armor = 'Armor Vest';

					if (rating > 3)
						res.weapons.push('Browning Ultra-Power');
					else
						res.weapons.push('Colt America L36');
				}
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
				res.armor = 'Armor Vest';
				res.weapons.push('Knife');

				switch (roll.dval(4))
				{
					case 1:
						res.weapons.push('Defiance EX Shocker');
						break;

					case 2:
						res.weapons.push('Colt America L36');
						break;

					case 3:
						res.weapons.push('Browning Ultra-Power');
						break;

					case 4:
						res.weapons.push('Ares Predator V');
						break;
				}


				if (rating > 1 && roll.dval(4) === 4)
				{
					res.skills['Throwing Weapons'] = 1 + rating;
					res.gear.push({
						name: 'Gas Grenade (CS/Tear)',
						quantity: 2
					});
				}
				else if (roll.dval(4) === 4)
				{
					res.skills.Longarms = 1 + rating;
					res.weapons.push('Defiance T-250');
				}

				if (rating > 3)
				{
					res.armor = 'Armor Jacket';
				}
				break;

			case 'corpsec':
				res.attributes.body = 1;
				res.attributes.agility = 1;
				res.attributes.reaction = 1;
				res.attributes.logic = -1;
				res.attributes.intuition = -1;
				res.attributes.charisma = 1;
				res.skills.Automatics = 1 + rating;
				res.skills.Clubs = 1 + rating;
				res.skills.Etiquette = (rating * 2);
				res.skills.Perception = rating;
				res.skills.Pistols = 2 + rating;
				res.skills.Running = 3 + Math.floor(rating / 2);
				res.skills['Unarmed Combat'] = 1 + rating;
				res.commlink = 3;

				if (rating < 2)
				{
					res.weapons.push('Fichetti Security 600');
					res.weapons.push('Stun Baton');
					res.armor = 'Armor Vest';
				}
				else if (rating < 5)
				{
					res.weapons.push('Colt Cobra TZ-120');
					res.weapons.push('Fichetti Security 600');
					res.weapons.push('Stun Baton');
					res.armor = 'Armor Jacket';
				}
				else
				{
					res.skills['Throwing Weapons'] = 1 + rating;
					res.weapons.push('FN P93 Praetor');
					res.weapons.push('Ares Predator V');
					res.weapons.push('Stun Baton');
					res.armor = 'Full Body Armor';
					res.gear.push({
						name: 'Gas Grenade (CS/Tear)',
						quantity: 2
					});
					res.commlink = 5;
				}
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

				if (rating < 2)
				{
					res.armor = 'Armor Vest';
				}
				else
				{
					res.weapons.push('Ares Predator V');
				}
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
				res.commlink = 3;

				if (rating > 4)
				{
					res.weapons.push('AK-97');
				}
				else if (roll.dval(3) !== 3)
				{
					if (roll.dval(2) === 2)
						res.weapons.push('Ceska Black Scorpion');
					else
						res.weapons.push('Steyr TMP');
				}
				else if (roll.dval(2) === 2)
				{
					res.weapons.push('Colt Cobra TZ-120');
				}
				else
				{
					res.weapons.push('Ares Predator V');
				}

				if (roll.dval(3) === 3)
				{
					res.skills['Throwing Weapons'] = 1 + rating;
					res.gear.push({
						name: 'Flashbang',
						quantity: 2
					});
				}

				if (rating > 4)
				{
					res.weapons.push('AK-97');
				}
				break;

			case 'htr':
				res.attributes.body = 2;
				res.attributes.agility = 1;
				res.attributes.reaction = 1;
				res.attributes.logic = 1;
				res.skills.Blades = 2 + rating;
				res.skills.Clubs = 2 + rating;
				res.skills['Unarmed Combat'] = 2 + rating;
				res.skills['Throwing Weapons'] = 2 + rating;
				res.skills.Gymnastics = 1 + rating;
				res.skills.Running = 1 + rating;
				res.skills.Swimming = 1 + rating;
				res.skills.Etiquette = 3 + Math.ceil(rating / 2);
				res.skills.Automatics = rating * 2 - 1;
				res.skills.Longarms = rating * 2 - 1;
				res.skills.Pistols = rating * 2 - 1;
				res.skills.Perception = 3 + Math.ceil(rating / 2);
				res.skills.Sneaking = 1 + rating;
				res.weapons.push('Ares Predator V');
				res.commlink = rating - 1;
				res.augmentations.push({
					name: 'Cybereyes',
					rating: 2,
					augments: ['Flare Compensation', 'Image link', 'Smartlink', 'Thermographic vision', 'Low-light Vision']
				});

				switch (rating)
				{
					case 0:
					case 1:
						res.armor = 'Armor Jacket';
						res.weapons.push('Enfield AS-7');
						break;

					case 2:
					case 3:
						res.armor = 'Full Body Armor';
						res.weapons.push('FN P93 Praetor');
						res.gear.push({
							name: 'Flashbang',
							quantity: 2
						});
						break;

					default:
						res.armor = 'Full Body Armor w/ Helmet & Chemical Seal';
						res.weapons.push('Ares Alpha');
						res.gear.push({
							name: 'Gas Grenade (CS/Tear)',
							quantity: 2
						});
						res.gear.push({
							name: 'Fragmentation',
							quantity: 2
						});
						break;
				}

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
				res.skills['Throwing Weapons'] = 1 + rating;
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
				res.gear.push({
					name: 'Grapple Gun'
				});
				res.gear.push({
					name: 'Smoke Grenade',
					quantity: 2
				});
				res.commlink = rating - 1;

				switch (rating)
				{
					case 0:
					case 1:
						res.armor = 'Armor Jacket';
						res.weapons.push('FN P93 Praetor');
						break;

					case 2:
					case 3:
						res.armor = 'Full Body Armor';
						res.weapons.push('HK-227');
						res.gear.push({
							name: 'Flashbang',
							quantity: 2
						});
						res.gear.push({
							name: 'Thermal Smoke Grenade',
							quantity: 2
						});
						break;

					default:
						res.armor = 'Full Body Armor w/ Helmet & Chemical Seal';
						res.weapons.push({
							name: 'HK-227',
							ammo: 'APDS'
						});
						res.gear.push({
							name: 'Gas Grenade (CS/Tear)',
							quantity: 2
						});
						res.gear.push({
							name: 'Fragmentation',
							quantity: 2
						});
						break;
				}

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

				if (roll.dval(3) === 3)
				{
					res.skills.Longarms = 1 + rating;
					res.weapons.push('Defiance T-250');
				}
				else if (roll.dval(3) === 3)
				{
					res.skills.Automatics = 1 + rating;
					res.weapons.push('Steyr TMP');
				}

				if (rating > 1)
				{
					res.skills['Throwing Weapons'] = 1 + rating;

					if (roll.dval(2) === 2)
					{
						res.gear.push({
							name: 'Flashbang',
							quantity: 2
						});
					}
					else
					{
						res.gear.push({
							name: 'Fragmentation',
							quantity: 2
						});
					}
				}
				break;

			case 'cast':
				// Special case for when the special adjustments matter more than the type adjustments
				res.attributes.charisma = 1;
				res.skills.Etiquette = 2 + rating;
				break;
		}

		return res;
	},

	// Adjustments if a standard LT, or mage, or decker, etc
	get_special_adjustments: function(special_type, options)
	{
		var rating = options.professional_rating;

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
			switch (options.professional_type)
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

			switch (options.professional_type)
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
			res.skills.Clubs = rating + 2;
			res.skills[improved_skill] = rating + 2;

			// Qualities
			res.qualities.positive.push('Adept');

			// Weapon
			res.weapons.push(bonus_weapon);

			var weapon_name;
			switch (roll.dval(8))
			{
				default:
				case 1:
				case 2:
					weapon_name = 'Katana';
					break;

				case 3:
					weapon_name = 'Sword';
					break;

				case 4:
				case 5:
					weapon_name = 'Knife';
					break;

				case 6:
					weapon_name = 'Staff';
					break;

				case 7:
				case 8:
					weapon_name = 'Telescoping Staff';
					break;
			}
			if (rating > 4)
			{
				var focus = this.get_weapon(weapon_name);
				focus.magic_focus = true;
				focus.weapon_focus = true;
				focus.force = rating - 4;

				res.weapons.push(focus);
			}
			else
			{
				res.weapons.push(weapon_name);
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

			if (rating > 3)
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

			if (['corpsec', 'htr', 'mob', 'specops'].includes(options.professional_type))
			{
				res.skills.Leadership = rating;
				res.skills.Hardware = rating + 1;
				res.skills.Software = rating + 1;
			}

			if (['htr', 'specops'].includes(options.professional_type))
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

			if (rating > 1)
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

		if (special_type === 'Johnson')
		{
			// Attributes
			res.attributes.charisma = 1 + roll.half(rating);
			res.attributes.intuition = Math.max(roll.half(rating, true) - 1, 1);
			res.attributes.logic = Math.max(roll.half(rating, true) - 1, 1);
			res.attributes.will = Math.max(roll.half(rating - 1) - 1, 0);

			// Armor
			if (rating < 4)
				res.armor = 'Armor Clothing';
			else
				res.armor = 'Actioneer Business Clothes';

			// Skills
			res.skills.Computer = rating + 1;
			res.skills.Con = rating + 1;
			res.skills.Etiquette = Math.max(2, rating * 2) - 1;
			res.skills.Intimidation = rating + 3;
			res.skills.Negotiation = Math.max(2, rating * 2);
			res.skills.Perception = rating + 2;
		}

		if (special_type === 'Gunbunny')
		{
			// Attributes
			res.attributes.agility = 3;
			res.attributes.reaction = 1;
			res.attributes.intuition = 1;

			// Qualities
			res.qualities.positive.push('Ambidextrous');
			res.qualities.negative.push('Distinctive Style');

			// One random quality from positive and negative
			var pos_q = ['Analytical Mind', 'Blandness', 'First Impression', 'Lucky', 'Photographic Memory'];
			var neg_q = ['Gremlins I', 'Sensitive System', 'Uncouth', 'Uneducated'];
			var i = roll.dval(neg_q.length) - 1;
			res.qualities.negative.push(neg_q[i]);
			i = roll.dval(neg_q.length) - 1;
			res.qualities.positive.push(pos_q[i]);

			// Armor
			if (rating < 4)
				res.armor = 'Armor Vest';
			else
				res.armor = 'Armor Jacket';

			// Skills
			res.skills.Pistols = rating + 4;
			res.skills.Gymnastics = rating + 2;
			res.skills.Perception = rating + 2;
			res.skills.Running = rating + 2;
			res.skills.Sneaking = rating + 2;

			// Weapons, Augmentations & Drugs
			res.gear.push(this.get_gear('Jazz'));

			if (rating > 0)
			{
				augment = this.get_augmentation('Muscle Toner');
				augment.rating = roll.half(rating) + 1;
				res.augmentations.push(augment);
				augment = this.get_augmentation('Synaptic Booster');
				augment.rating = roll.half(rating);
				res.augmentations.push(augment);
			}

			switch (options.race)
			{
				case 'Human':
					res.skills['Throwing Weapons'] = rating + 3;
					if (rating < 2)
					{
						res.weapons.push(this.get_weapon('Browning Ultra-Power'));
						res.weapons.push(this.get_weapon('Streetline Special'));
						res.gear.push(this.get_gear('Smoke Grenade'));
						res.gear.push(this.get_gear('Flashbang Grenade'));
					}
					else
					{
						res.weapons.push(this.get_weapon('Ares Predator V'));
						res.weapons.push(this.get_weapon('Colt America L36'));
						res.gear.push(this.get_gear('Thermal Smoke Grenade'));
						res.gear.push(this.get_gear('Fragmentation Grenade'));
					}
					break;

				case 'Elf':
					if (rating < 2)
					{
						res.weapons.push(this.get_weapon('Ares Predator V'));
						res.weapons.push(this.get_weapon('Fichetti Security 600'));
					}
					else
					{
						res.weapons.push(this.get_weapon('Ares Predator V'));
						res.weapons.push(this.get_weapon('Ares Predator V'));
					}
					break;

				case 'Dwarf':
					res.skills.Longarms = rating + 4;

					if (rating < 2)
					{
						res.weapons.push(this.get_weapon('Defiance T-250'));
						res.weapons.push(this.get_weapon('Browning Ultra-Power'));
					}
					else
					{
						res.weapons.push(this.get_weapon('Enfield AS-7'));
						res.weapons.push(this.get_weapon('Ares Predator V'));
					}

					break;

				case 'Ork':
					res.skills.Intimidation = rating + 3;
					res.weapons.push(this.get_weapon('Remington Roomsweeper'));
					res.weapons.push(this.get_weapon('Remington Roomsweeper'));
					break;

				case 'Troll':
					res.skills.Automatics = rating + 4;
					if (rating < 2)
					{
						res.weapons.push(this.get_weapon('Steyr TMP'));
						res.weapons.push(this.get_weapon('Steyr TMP'));
					}
					else
					{
						res.weapons.push(this.get_weapon('HK-227'));
						res.weapons.push(this.get_weapon('HK-227'));
					}
					break;
			}
		}

		if (special_type === 'Samurai')
		{
			// Attributes
			res.attributes.agility = 2;
			res.attributes.body = 1;
			res.attributes.reaction = 1;
			res.attributes.strength = 1;

			// Skills
			res.skills.Automatics = rating + 3;
			res.skills.Blades = rating + 2;
			res.skills.Perception = rating + 2;
			res.skills.Running = rating + 2;
			res.skills.Sneaking = rating + 2;

			switch (options.race)
			{
				case 'Human':
					res.attributes.reaction = 2;
					res.skills.Demolitions = rating + 1;
					res.skills['Unarmed Combat'] = rating + 3;
					break;

				case 'Elf':
					res.attributes.reaction = 2;
					res.skills.Gymnastics = rating + 1;
					res.skills.Negotiations = rating + 1;
					break;

				case 'Dwarf':
					res.skills['First Aid'] = rating + 3;
					res.skills['Throwing Weapons'] = rating + 3;
					if (rating < 3)
					{
						res.gear.push(this.get_gear('Smoke Grenade'));
						res.gear.push(this.get_gear('Flashbang Grenade'));
					}
					else
					{
						res.gear.push(this.get_gear('Thermal Smoke Grenade'));
						res.gear.push(this.get_gear('Fragmentation Grenade'));
					}
					break;

				case 'Ork':
					res.skills.Intimidation = rating + 2;
					res.skills['Heavy Weapons'] = rating + 2;
					break;

				case 'Troll':
					res.skills.Intimidation = rating + 3;
					res.skills['Heavy Weapons'] = rating + 3;
					break;
			}

			// Qualities
			// One random quality from positive and negative
			var pos_q = ['Ambidextrous', 'Blandness', 'Gearhead', 'Magical Resistance I', 'Will to Live I'];
			var neg_q = ['Bad Luck', 'Dependent(s) I', 'Insomnia I', 'Scorched (BTLs)', 'Social Stress'];
			var i = roll.dval(neg_q.length) - 1;
			res.qualities.negative.push(neg_q[i]);
			i = roll.dval(neg_q.length) - 1;
			res.qualities.positive.push(pos_q[i]);

			// Armor
			if (rating < 5)
				res.armor = 'Armor Jacket';
			else
				res.armor = 'Full Body Armor';

			// Weapons, Augmentations & Drugs
			if (rating < 3)
				res.weapons.push(this.get_weapon('Knife'));

			var augment;

			if (rating < 2)
			{
				res.gear.push(this.get_gear('Goggles'));
			}
			else
			{
				augment = this.get_augmentation('Cybereyes');
				augment.rating = 2;
				res.augmentations.push(augment);
			}

			switch (options.race)
			{
				case 'Human':
					if (rating > 1)
					{
						augment = this.get_augmentation('Muscle Toner');
						augment.rating = roll.half(rating);
						res.augmentations.push(augment);
						augment = this.get_augmentation('Synaptic Booster');
						augment.rating = roll.half(rating - 1);
						res.augmentations.push(augment);
						res.augmentations.push(this.get_augmentation('Cyber Spur'));
					}
					if (rating > 0)
					{
						augment = this.get_augmentation('Cerebellum Booster');
						augment.rating = Math.ceil(rating / 3);
						res.augmentations.push(augment);
					}
					switch (rating)
					{
						case 0:
						case 1:
							res.weapons.push(this.get_weapon('Steyr TMP'));
							break;
						case 2:
						case 3:
							res.weapons.push(this.get_weapon('Colt Cobra TZ-120'));
							res.weapons.push(this.get_weapon('Colt America L36'));
							break;
						case 4:
						case 5:
						case 6:
							res.weapons.push(this.get_weapon('Ares Alpha'));
							res.weapons.push(this.get_weapon('Colt Cobra TZ-120'));
							res.weapons.push(this.get_weapon('Ares Predator V'));
							break;
					}
					break;

				case 'Elf':
					if (rating > 1)
					{
						augment = this.get_augmentation('Muscle Toner');
						augment.rating = roll.half(rating);
						res.augmentations.push(augment);
						augment = this.get_augmentation('Synaptic Booster');
						augment.rating = roll.half(rating - 1);
						res.augmentations.push(augment);
						res.weapons.push(this.get_weapon('Katana'));
					}
					if (rating > 0)
					{
						augment = this.get_augmentation('Cerebellum Booster');
						augment.rating = Math.ceil(rating / 3);
						res.augmentations.push(augment);
					}
					switch (rating)
					{
						case 0:
						case 1:
							res.weapons.push(this.get_weapon('Ceska Black Scorpion'));
							break;
						case 2:
						case 3:
							res.weapons.push(this.get_weapon('FN P93 Praetor'));
							res.weapons.push(this.get_weapon('Ceska Black Scorpion'));
							break;
						case 4:
						case 5:
						case 6:
							res.weapons.push(this.get_weapon('FN HAR'));
							res.weapons.push(this.get_weapon('FN P93 Praetor'));
							res.weapons.push(this.get_weapon('Ceska Black Scorpion'));
							break;
					}
					break;

				case 'Dwarf':
					if (rating > 1)
					{
						augment = this.get_augmentation('Muscle Toner');
						augment.rating = roll.half(rating);
						res.augmentations.push(augment);
						augment = this.get_augmentation('Synaptic Booster');
						augment.rating = roll.half(rating - 1);
						res.augmentations.push(augment);
						res.weapons.push(this.get_weapon('Combat Knife'));
					}

					augment = this.get_augmentation('Orthoskin');
					augment.rating = roll.half(rating + 2);
					res.augmentations.push(augment);
					augment = this.get_augmentation('Bone Density Augmentation');
					augment.rating = roll.half(rating + 2);
					res.augmentations.push(augment);

					switch (rating)
					{
						case 0:
						case 1:
							res.weapons.push(this.get_weapon('Ceska Black Scorpion'));
							break;
						case 2:
						case 3:
							res.weapons.push(this.get_weapon('HK-227'));
							res.weapons.push(this.get_weapon('Remington Roomsweeper'));
							break;
						case 4:
						case 5:
						case 6:
							res.weapons.push(this.get_weapon('Ares Alpha'));
							res.weapons.push(this.get_weapon('HK-227'));
							res.weapons.push(this.get_weapon('Ceska Black Scorpion'));
							break;
					}
					break;

				case 'Ork':
					if (rating > 1)
					{
						augment = this.get_augmentation('Muscle Toner');
						augment.rating = roll.half(rating);
						res.augmentations.push(augment);
						augment = this.get_augmentation('Muscle Augmentation');
						augment.rating = roll.half(rating);
						res.augmentations.push(augment);
						augment = this.get_augmentation('Synaptic Booster');
						augment.rating = roll.half(rating - 1);
						res.augmentations.push(augment);
						res.weapons.push(this.get_weapon('Sword'));
					}

					augment = this.get_augmentation('Orthoskin');
					augment.rating = roll.half(rating + 2);
					res.augmentations.push(augment);
					augment = this.get_augmentation('Bone Density Augmentation');
					augment.rating = roll.half(rating + 2);
					res.augmentations.push(augment);

					switch (rating)
					{
						case 0:
						case 1:
							res.weapons.push(this.get_weapon('Colt Cobra TZ-120'));
							break;
						case 2:
						case 3:
							res.weapons.push(this.get_weapon('Colt Cobra TZ-120'));
							res.weapons.push(this.get_weapon('Browning Ultra-Power'));
							break;
						case 4:
						case 5:
						case 6:
							res.weapons.push(this.get_weapon('AK-97'));
							res.weapons.push(this.get_weapon('Colt Cobra TZ-120'));
							res.weapons.push(this.get_weapon('Steyr TMP'));
							break;
					}
					break;

				case 'Troll':
					if (rating > 1)
					{
						augment = this.get_augmentation('Muscle Toner');
						augment.rating = roll.half(rating);
						res.augmentations.push(augment);
						augment = this.get_augmentation('Muscle Augmentation');
						augment.rating = roll.half(rating);
						res.augmentations.push(augment);
						augment = this.get_augmentation('Synaptic Booster');
						augment.rating = roll.half(rating - 1);
						res.augmentations.push(augment);
						res.weapons.push(this.get_weapon('Combat Axe'));
					}

					augment = this.get_augmentation('Orthoskin');
					augment.rating = roll.half(rating + 2);
					res.augmentations.push(augment);
					augment = this.get_augmentation('Bone Density Augmentation');
					augment.rating = roll.half(rating + 2);
					res.augmentations.push(augment);

					switch (rating)
					{
						case 0:
						case 1:
							res.weapons.push(this.get_weapon('Steyr TMP'));
							break;
						case 2:
						case 3:
							res.weapons.push(this.get_weapon('Colt Cobra TZ-120'));
							res.weapons.push(this.get_weapon('Steyr TMP'));
							break;
						case 4:
						case 5:
						case 6:
							res.weapons.push(this.get_weapon('Ingram Valiant'));
							res.weapons.push(this.get_weapon('Colt Cobra TZ-120'));
							res.weapons.push(this.get_weapon('Steyr TMP'));
							break;
					}
					break;
			}

			if (rating < 4)
				res.gear.push(this.get_gear('Jazz'));
			else
				res.gear.push(this.get_gear('Kamikaze'));
		}

		if (special_type === 'Tank')
		{
			// Attributes
			res.attributes.body = 2;
			res.attributes.strength = 2;

			// Skills
			res.skills.Clubs = rating + 2;
			res.skills.Longarms = rating + 2;
			res.skills.Pistols = rating + 2;

			if (rating > 3)
			{
				res.skills['Unarmed'] = rating + 2;
				res.augmentations.push(this.get_augmentation('Cyber Spur'));
			}
			// Qualities
			res.qualities.negative.push('Bad Rep');
			res.qualities.positive.push('Guts');

			// Weapon
			if (rating < 2)
				res.weapons.push(this.get_weapon('Club'));
			else
				res.weapons.push(this.get_weapon('Stun Baton'));

			if (rating < 3)
			{
				res.weapons.push(this.get_weapon('Defiance T-250'));
				res.weapons.push(this.get_weapon('Browning Ultra-Power'));
			}
			else
			{
				res.weapons.push(this.get_weapon('Enfield AS-7'));
				res.weapons.push(this.get_weapon('Remington Roomsweeper'));
			}

			// Armor
			if (rating < 4)
				res.armor = 'Armor Jacket';
			else if (rating < 6)
				res.armor = 'Full Body Armor';
			else
				res.armor = 'Full Body Armor w/ Helmet & Chemical Seal';

			// Augmentations & Drugs
			var augment, armor;

			augment = res.augmentations.find(function (aug)
			{
				return aug.name === 'Cybereyes';
			});

			if (!augment)
			{
				augment = this.get_augmentation('Cybereyes');
				augment.rating = 2;
				res.augmentations.push(augment);
			}

			if (rating > 2)
			{
				augment = this.get_augmentation('Orthoskin');
				augment.rating = rating - 2;
				res.augmentations.push(augment);
			}

			if (rating > 4)
			{
				augment = this.get_augmentation('Bone Lacing');
				augment.rating = rating - 4;
				res.augmentations.push(augment);
			}

			if (rating > 0)
			{
				armor = (rating > 3) ? 3 : rating;
				augment = this.get_augmentation('Cyberarm (Left)');
				augment.bonus_armor = armor;
				if (!augment.hasOwnProperty('augments'))
					augment.augments = [];
				augment.augments.push('Armor ' + armor);
				res.augmentations.push(augment);
			}

			if (rating > 3)
			{
				armor = rating - 3;
				augment = this.get_augmentation('Cyberarm (Right)');
				augment.bonus_armor = armor;
				if (!augment.hasOwnProperty('augments'))
					augment.augments = [];
				augment.augments.push('Armor ' + armor);
				res.augmentations.push(augment);
			}
		}

		if (special_type === 'Shaman')
		{
			// Attributes
			res.attributes.will = 1;
			res.attributes.charisma = 1;

			// Skills
			res.skills.Assessing = rating + 2;
			res.skills['Astral Combat'] = rating + 3;
			res.skills.Summoning = rating + 2;
			res.skills.Banishing = rating + 2;
			res.skills.Binding = rating + 2;
			res.skills.Counterspelling = rating + 2;
			res.skills.Spellcasting = rating + 1;

			// Qualities
			res.qualities.positive.push('Magician (Shaman)');
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
				name: 'Novacoke',
				quantity: 2
			});
			res.gear.push({
				name: 'Spellcasting focus (Summoning)',
				magic_focus: true,
				rating: rating
			});

			if (rating > 3)
			{
				res.gear.push({
					name: 'Power focus',
					magic_focus: true,
					rating: rating - 3
				});
			}

			// Specials : Spells
			res.special.Magic = (rating < 2) ? 2 : rating;
			res.special.spells = ['Manabolt', 'Ice Sheet', 'Ball Lightning'];
			switch (rating)
			{
				case 6:
					res.special.spells.push('Mindlink', 'Chaos');
				case 5:
					res.special.spells.push('Mind Probe', 'Trid Phantasm');
				case 4:
					res.special.spells.push('Increase Reflexes', 'Combat Sense');
				case 3:
					res.special.spells.push('Heal');
				case 2:
					res.special.spells.push('Detect Magic');
				case 1:
					res.special.spells.push('Invisibility');
				default:
					break;
			}
		}

		return res;
	},

	get_metatype_adjustment: function(race)
	{
		var res = {
			attributes: {body: 0, agility: 0, reaction: 0, strength: 0, will: 0, logic: 0, intuition: 0, charisma: 0, edge: 0, magic: 0, resonance: 0},
			min_attributes: {body: 1, agility: 1, reaction: 1, strength: 1, will: 1, logic: 1, intuition: 1, charisma: 1, edge: 1, magic: 0, resonance: 0},
			max_attributes: {body: 6, agility: 6, reaction: 6, strength: 6, will: 6, logic: 6, intuition: 6, charisma: 6, edge: 6, magic: 6, resonance: 6},
			augmentations: []
		};

		switch (race)
		{
			case 'Human':
				res.attributes.edge += 1;
				res.min_attributes.edge += 1;
				res.max_attributes.edge += 1;
				break;

			case 'Elf':
				res.attributes.agility += 1;
				res.min_attributes.agility += 1;
				res.max_attributes.agility += 1;
				res.attributes.charisma += 2;
				res.min_attributes.charisma += 2;
				res.max_attributes.charisma += 2;
				res.augmentations.push({name: 'Low-Light Vision'});
				break;

			case 'Dwarf':
				res.attributes.body += 2;
				res.min_attributes.body += 2;
				res.max_attributes.body += 2;
				res.attributes.reaction += -1;
				res.max_attributes.reaction += -1;
				res.attributes.strength += 2;
				res.min_attributes.strength += 2;
				res.max_attributes.strength += 2;
				res.attributes.will += 1;
				res.min_attributes.will += 1;
				res.max_attributes.will += 1;
				res.augmentations.push({name: 'Thermographic Vision'});
				res.augmentations.push({name: 'Pathogen Resistance (2)'});
				res.augmentations.push({name: 'Toxin Resistance (2)'});
				res.augmentations.push({name: 'Increased Lifestyle Costs (120%)'});
				break;

			case 'Ork':
				res.attributes.body += 3;
				res.min_attributes.body += 3;
				res.max_attributes.body += 3;
				res.attributes.strength += 2;
				res.min_attributes.strength += 2;
				res.max_attributes.strength += 2;
				res.attributes.logic += -1;
				res.max_attributes.logic += -1;
				res.attributes.charisma += -1;
				res.max_attributes.charisma += -1;
				res.augmentations.push({name: 'Low-Light Vision'});
				break;

			case 'Troll':
				res.attributes.body += 4;
				res.min_attributes.body += 4;
				res.max_attributes.body += 4;
				res.attributes.agility += -1;
				res.max_attributes.agility += -1;
				res.attributes.strength += 4;
				res.min_attributes.strength += 4;
				res.max_attributes.strength += 4;
				res.attributes.logic += -1;
				res.max_attributes.logic += -1;
				res.attributes.intuition += -1;
				res.max_attributes.intuition += -1;
				res.attributes.charisma += -2;
				res.max_attributes.charisma += -2;
				res.augmentations.push({name: 'Thermographic Vision'});
				res.augmentations.push({name: 'Extended Reach (1)'});
				res.augmentations.push({name: 'Troll Dermal Deposits (1)'});
				res.augmentations.push({name: 'Increased Lifestyle Costs (200%)'});
				break;

			case 'Gnome':
				res.attributes.body += -2;
				res.max_attributes.body += -2;
				res.attributes.agility += 1;
				res.min_attributes.agility += 1;
				res.max_attributes.agility += 1;
				res.attributes.strength += -2;
				res.max_attributes.strength += -2;
				res.attributes.will += 1;
				res.min_attributes.will += 1;
				res.max_attributes.will += 1;
				res.attributes.logic += 1;
				res.min_attributes.logic += 1;
				res.max_attributes.logic += 1;
				res.augmentations.push({name: 'Arcane Arrester (2)'});
				res.augmentations.push({name: 'Neoteny'});
				res.augmentations.push({name: 'Thermographic Vision'});
				break;

			case 'Hanuman':
				res.attributes.agility += 1;
				res.min_attributes.agility += 1;
				res.max_attributes.agility += 1;
				res.attributes.strength += 1;
				res.min_attributes.strength += 1;
				res.max_attributes.strength += 1;
				res.attributes.logic += -1;
				res.max_attributes.logic += -1;
				res.attributes.intuition += 1;
				res.min_attributes.intuition += 1;
				res.max_attributes.intuition += 1;
				res.attributes.charisma += -1;
				res.max_attributes.charisma += -1;
				res.augmentations.push({name: 'Low-Light Vision'});
				res.augmentations.push({name: 'Monkey Pawns'});
				res.augmentations.push({name: 'Prehensile Tail'});
				res.augmentations.push({name: 'Unusual Hair (Body)'});
				break;

			case 'Koborokuru':
				res.attributes.body += 1;
				res.min_attributes.body += 1;
				res.max_attributes.body += 1;
				res.attributes.strength += 1;
				res.min_attributes.strength += 1;
				res.max_attributes.strength += 1;
				res.attributes.will += 1;
				res.min_attributes.will += 1;
				res.max_attributes.will += 1;
				res.augmentations.push({name: 'Celerity'});
				res.augmentations.push({name: 'Pathogen Resistance (1)'});
				res.augmentations.push({name: 'Toxin Resistance (1)'});
				res.augmentations.push({name: 'Thermographic Vision'});
				res.augmentations.push({name: 'Unusual Hair'});
				break;

			case 'Menehune':
				res.attributes.body += 1;
				res.min_attributes.body += 1;
				res.max_attributes.body += 1;
				res.attributes.agility += 1;
				res.min_attributes.agility += 1;
				res.max_attributes.agility += 1;
				res.attributes.reaction += -1;
				res.max_attributes.reaction += -1;
				res.attributes.strength += 1;
				res.min_attributes.strength += 1;
				res.max_attributes.strength += 1;
				res.augmentations.push({name: 'Pathogen Resistance (1)'});
				res.augmentations.push({name: 'Toxin Resistance (1)'});
				res.augmentations.push({name: 'Thermographic Vision'});
				res.augmentations.push({name: 'Underwater Vision'});
				break;

			case 'Dryade':
				res.attributes.agility += 1;
				res.min_attributes.agility += 1;
				res.max_attributes.agility += 1;
				res.attributes.strength += -1;
				res.max_attributes.strength += -1;
				res.attributes.charisma += 2;
				res.min_attributes.charisma += 2;
				res.max_attributes.charisma += 2;
				res.augmentations.push({name: 'Glamour'});
				res.augmentations.push({name: 'Low-Light Vision'});
				res.augmentations.push({name: 'Symbiosis'});
				break;

			case 'Nocturna':
				res.attributes.body += -1;
				res.max_attributes.body += -1;
				res.attributes.agility += 2;
				res.min_attributes.agility += 2;
				res.max_attributes.agility += 2;
				res.attributes.charisma += 1;
				res.min_attributes.charisma += 1;
				res.max_attributes.charisma += 1;
				res.augmentations.push({name: 'Allergy (Sunlight, Mild)'});
				res.augmentations.push({name: 'Low-Light Vision'});
				res.augmentations.push({name: 'Keen-eared'});
				res.augmentations.push({name: 'Nocturnal'});
				res.augmentations.push({name: 'Unusual Hair (Colored Fur)'});
				break;

			case 'Wakyambi':
				res.attributes.agility += 1;
				res.min_attributes.agility += 1;
				res.max_attributes.agility += 1;
				res.attributes.logic += -1;
				res.max_attributes.logic += -1;
				res.attributes.intuition += 1;
				res.min_attributes.intuition += 1;
				res.max_attributes.intuition += 1;
				res.attributes.edge += 1;
				res.min_attributes.edge += 1;
				res.max_attributes.edge += 1;
				res.augmentations.push({name: 'Celerity'});
				res.augmentations.push({name: 'Elongated Limbs'});
				res.augmentations.push({name: 'Low-Light Vision'});
				break;

			case 'Xapiri Thepe':
				res.attributes.agility += 1;
				res.min_attributes.agility += 1;
				res.max_attributes.agility += 1;
				res.attributes.logic += -1;
				res.max_attributes.logic += -1;
				res.attributes.charisma += 1;
				res.min_attributes.charisma += 1;
				res.max_attributes.charisma += 1;
				res.augmentations.push({name: 'Allergy (Pollutants, Mild)'});
				res.augmentations.push({name: 'Low-Light Vision'});
				res.augmentations.push({name: 'Photometabolism'});
				break;

			case 'Nartaki':
				res.augmentations.push({name: 'Shiva Arms'});
				res.augmentations.push({name: 'Striking Skin Pigmentation'});
				break;

			case 'Hobgoblin':
				res.attributes.strength += 1;
				res.min_attributes.strength += 1;
				res.max_attributes.strength += 1;
				res.attributes.logic += -1;
				res.max_attributes.logic += -1;
				res.attributes.charisma += 1;
				res.min_attributes.charisma += 1;
				res.max_attributes.charisma += 1;
				res.augmentations.push({name: 'Fangs'});
				res.augmentations.push({name: 'Low-Light Vision'});
				res.augmentations.push({name: 'Extravagant Eyes'});
				res.augmentations.push({name: 'Poor Self Control (Vindictive)'});
				break;

			case 'Ogre':
				res.attributes.body += 3;
				res.min_attributes.body += 3;
				res.max_attributes.body += 3;
				res.attributes.reaction += -1;
				res.max_attributes.reaction += -1;
				res.attributes.strength += 2;
				res.min_attributes.strength += 2;
				res.max_attributes.strength += 2;
				res.attributes.will += 1;
				res.min_attributes.will += 1;
				res.max_attributes.will += 1;
				res.attributes.logic += -1;
				res.max_attributes.logic += -1;
				res.attributes.charisma += -2;
				res.max_attributes.charisma += -2;
				res.augmentations.push({name: 'Low-Light Vision'});
				res.augmentations.push({name: 'Ogre Stomach'});
				break;

			case 'Oni':
				res.attributes.body += 2;
				res.min_attributes.body += 2;
				res.max_attributes.body += 2;
				res.attributes.agility += 1;
				res.min_attributes.agility += 1;
				res.max_attributes.agility += 1;
				res.attributes.strength += 1;
				res.min_attributes.strength += 1;
				res.max_attributes.strength += 1;
				res.attributes.logic += -1;
				res.max_attributes.logic += -1;
				res.attributes.charisma += 1;
				res.min_attributes.charisma += 1;
				res.max_attributes.charisma += 1;
				res.augmentations.push({name: 'Low-Light Vision'});
				res.augmentations.push({name: 'Striking Skin Pigmentation'});
				break;

			case 'Satyr':
				res.attributes.body += 1;
				res.min_attributes.body += 1;
				res.max_attributes.body += 1;
				res.attributes.reaction += 1;
				res.min_attributes.reaction += 1;
				res.max_attributes.reaction += 1;
				res.attributes.strength += 1;
				res.min_attributes.strength += 1;
				res.max_attributes.strength += 1;
				res.attributes.charisma += -1;
				res.max_attributes.charisma += -1;
				res.augmentations.push({name: 'Low-Light Vision'});
				res.augmentations.push({name: 'Satyr Legs'});
				break;

			case 'Cyclops':
				res.attributes.body += 4;
				res.min_attributes.body += 4;
				res.max_attributes.body += 4;
				res.attributes.agility += -1;
				res.max_attributes.agility += -1;
				res.attributes.strength += 5;
				res.min_attributes.strength += 5;
				res.max_attributes.strength += 5;
				res.attributes.logic += -2;
				res.max_attributes.logic += -2;
				res.attributes.intuition += -1;
				res.max_attributes.intuition += -1;
				res.attributes.charisma += -2;
				res.max_attributes.charisma += -2;
				res.augmentations.push({name: 'Cyclopean Eye'});
				res.augmentations.push({name: 'Extended Reach (1)'});
				break;

			case 'Fomorian':
				res.attributes.body += 3;
				res.min_attributes.body += 3;
				res.max_attributes.body += 3;
				res.attributes.agility += -1;
				res.max_attributes.agility += -1;
				res.attributes.strength += 4;
				res.min_attributes.strength += 4;
				res.max_attributes.strength += 4;
				res.attributes.will += -1;
				res.max_attributes.will += -1;
				res.attributes.logic += -2;
				res.max_attributes.logic += -2;
				res.attributes.intuition += -2;
				res.max_attributes.intuition += -2;
				res.attributes.charisma += -1;
				res.max_attributes.charisma += -1;
				res.augmentations.push({name: 'Arcane Arrester (1)'});
				res.augmentations.push({name: 'Thermographic Vision'});
				res.augmentations.push({name: 'Extended Reach (1)'});
				break;

			case 'Giant':
				res.attributes.body += 4;
				res.min_attributes.body += 4;
				res.max_attributes.body += 4;
				res.attributes.agility += -1;
				res.max_attributes.agility += -1;
				res.attributes.reaction += -1;
				res.max_attributes.reaction += -1;
				res.attributes.strength += 4;
				res.min_attributes.strength += 4;
				res.max_attributes.strength += 4;
				res.attributes.logic += -1;
				res.max_attributes.logic += -1;
				res.attributes.intuition += -1;
				res.max_attributes.intuition += -1;
				res.attributes.charisma += -1;
				res.max_attributes.charisma += -1;
				res.augmentations.push({name: 'Dermal Alteration (Bark)'});
				res.augmentations.push({name: 'Thermographic Vision'});
				res.augmentations.push({name: 'Extended Reach (1)'});
				break;

			case 'Minotaur':
				res.attributes.body += 5;
				res.min_attributes.body += 5;
				res.max_attributes.body += 5;
				res.attributes.agility += -1;
				res.max_attributes.agility += -1;
				res.attributes.strength += 4;
				res.min_attributes.strength += 4;
				res.max_attributes.strength += 4;
				res.attributes.logic += -1;
				res.max_attributes.logic += -1;
				res.attributes.charisma += -2;
				res.max_attributes.charisma += -2;
				res.augmentations.push({name: 'Goring Horns'});
				res.augmentations.push({name: 'Thermographic Vision'});
				res.augmentations.push({name: 'Extended Reach (1)'});
				break;

			case 'Vampire':
				res.attributes.edge += 1;
				res.min_attributes.edge += 1;
				res.max_attributes.edge += 1;
				res.attributes.magic += 6;
				break;

			case 'Nosferatu':
				res.attributes.edge += 1;
				res.min_attributes.edge += 1;
				res.max_attributes.edge += 1;
				res.attributes.magic += 6;
				break;

			case 'Banshee':
				res.attributes.agility += 1;
				res.min_attributes.agility += 1;
				res.max_attributes.agility += 1;
				res.attributes.charisma += 2;
				res.min_attributes.charisma += 2;
				res.max_attributes.charisma += 2;
				res.attributes.magic += 6;
				break;

			case 'Harvester':
				res.attributes.agility += 1;
				res.min_attributes.agility += 1;
				res.max_attributes.agility += 1;
				res.attributes.charisma += 2;
				res.min_attributes.charisma += 2;
				res.max_attributes.charisma += 2;
				res.attributes.magic += 6;
				break;

			case 'Goblin':
				res.attributes.body += 2;
				res.min_attributes.body += 2;
				res.max_attributes.body += 2;
				res.attributes.reaction += -1;
				res.max_attributes.reaction += -1;
				res.attributes.strength += 2;
				res.min_attributes.strength += 2;
				res.max_attributes.strength += 2;
				res.attributes.will += 1;
				res.min_attributes.will += 1;
				res.max_attributes.will += 1;
				res.attributes.magic += 6;
				break;

			case 'Gnawer':
				res.attributes.body += 2;
				res.min_attributes.body += 2;
				res.max_attributes.body += 2;
				res.attributes.reaction += -1;
				res.max_attributes.reaction += -1;
				res.attributes.strength += 2;
				res.min_attributes.strength += 2;
				res.max_attributes.strength += 2;
				res.attributes.will += 1;
				res.min_attributes.will += 1;
				res.max_attributes.will += 1;
				res.attributes.magic += 6;
				break;

			case 'Wendigo':
				res.attributes.body += 3;
				res.min_attributes.body += 3;
				res.max_attributes.body += 3;
				res.attributes.strength += 2;
				res.min_attributes.strength += 2;
				res.max_attributes.strength += 2;
				res.attributes.logic += -1;
				res.max_attributes.logic += -1;
				res.attributes.charisma += -1;
				res.max_attributes.charisma += -1;
				res.attributes.magic += 6;
				break;

			case 'Grendel':
				res.attributes.body += 3;
				res.min_attributes.body += 3;
				res.max_attributes.body += 3;
				res.attributes.strength += 2;
				res.min_attributes.strength += 2;
				res.max_attributes.strength += 2;
				res.attributes.logic += -1;
				res.max_attributes.logic += -1;
				res.attributes.charisma += -1;
				res.max_attributes.charisma += -1;
				res.attributes.magic += 6;
				break;

			case 'Fomoraig':
				res.attributes.body += 4;
				res.min_attributes.body += 4;
				res.max_attributes.body += 4;
				res.attributes.agility += -1;
				res.max_attributes.agility += -1;
				res.attributes.strength += 4;
				res.min_attributes.strength += 4;
				res.max_attributes.strength += 4;
				res.attributes.logic += -1;
				res.max_attributes.logic += -1;
				res.attributes.intuition += -1;
				res.max_attributes.intuition += -1;
				res.attributes.charisma += -2;
				res.max_attributes.charisma += -2;
				res.attributes.magic += 6;
				break;

			case 'Mutaqua':
				res.attributes.body += 4;
				res.min_attributes.body += 4;
				res.max_attributes.body += 4;
				res.attributes.agility += -1;
				res.max_attributes.agility += -1;
				res.attributes.strength += 4;
				res.min_attributes.strength += 4;
				res.max_attributes.strength += 4;
				res.attributes.logic += -1;
				res.max_attributes.logic += -1;
				res.attributes.intuition += -1;
				res.max_attributes.intuition += -1;
				res.attributes.charisma += -2;
				res.max_attributes.charisma += -2;
				res.attributes.magic += 6;
				break;

			case 'Bandersnatch':
				res.attributes.body += 5;
				res.min_attributes.body += 5;
				res.max_attributes.body += 5;
				res.attributes.strength += 4;
				res.min_attributes.strength += 4;
				res.max_attributes.strength += 4;
				res.attributes.magic += 6;
				break;
			case 'Dzoo-Noo-Qua':
				res.attributes.body += 4;
				res.min_attributes.body += 4;
				res.max_attributes.body += 4;
				res.attributes.agility += -1;
				res.max_attributes.agility += -1;
				res.attributes.strength += 4;
				res.min_attributes.strength += 4;
				res.max_attributes.strength += 4;
				res.attributes.logic += -1;
				res.max_attributes.logic += -1;
				res.attributes.intuition += -1;
				res.max_attributes.intuition += -1;
				res.attributes.charisma += -2;
				res.max_attributes.charisma += -2;
				res.attributes.magic += 6;
				break;

			case 'Centaur':
				res.attributes.body += 2;
				res.min_attributes.body += 2;
				res.max_attributes.body += 2;
				res.attributes.strength += 2;
				res.min_attributes.strength += 2;
				res.max_attributes.strength += 2;
				res.attributes.intuition += -1;
				res.max_attributes.intuition += -1;
				res.attributes.charisma += -1;
				res.max_attributes.charisma += -1;
				res.attributes.edge += -1;
				res.max_attributes.edge += -1;
				res.attributes.magic += 1;
				res.augmentations.push({name: 'Low-Light Vision'});
				res.augmentations.push({name: 'Thermographic Vision'});
				res.augmentations.push({name: 'Magic Sense'});
				res.augmentations.push({name: 'Natural Weapon (Kick: DV(STR+2)P, AP +1, Reach +1)'});
				res.augmentations.push({name: 'Search'});
				res.augmentations.push({name: 'Movement (x1/x4/+4)'});
				break;

			case 'Naga':
				res.attributes.body += 2;
				res.min_attributes.body += 2;
				res.max_attributes.body += 2;
				res.attributes.agility += -2;
				res.max_attributes.agility += -2;
				res.attributes.reaction += 1;
				res.min_attributes.reaction += 1;
				res.max_attributes.reaction += 1;
				res.attributes.strength += 3;
				res.min_attributes.strength += 3;
				res.max_attributes.strength += 3;
				res.attributes.will += 1;
				res.min_attributes.will += 1;
				res.max_attributes.will += 1;
				res.attributes.charisma += 1;
				res.min_attributes.charisma += 1;
				res.max_attributes.charisma += 1;
				res.attributes.edge += -1;
				res.max_attributes.edge += -1;
				res.attributes.magic += 1;
				res.augmentations.push({name: 'Armor (8)'});
				res.augmentations.push({name: 'Cold-Blooded'});
				res.augmentations.push({name: 'Dual Natured'});
				res.augmentations.push({name: 'Guard'});
				res.augmentations.push({name: 'Natural Weapon (Bite: DV(STR+1)P, AP -2, Reach -1)'});
				res.augmentations.push({name: 'Venom'});
				break;

			case 'Pixie':
				res.attributes.body += -4;
				res.max_attributes.body += -4;
				res.attributes.agility += 2;
				res.min_attributes.agility += 2;
				res.max_attributes.agility += 2;
				res.attributes.reaction += 2;
				res.min_attributes.reaction += 2;
				res.max_attributes.reaction += 2;
				res.attributes.strength += -4;
				res.max_attributes.strength += -4;
				res.attributes.will += 2;
				res.min_attributes.will += 2;
				res.max_attributes.will += 2;
				res.attributes.logic += 1;
				res.min_attributes.logic += 1;
				res.max_attributes.logic += 1;
				res.attributes.intuition += 1;
				res.min_attributes.intuition += 1;
				res.max_attributes.intuition += 1;
				res.attributes.charisma += 2;
				res.min_attributes.charisma += 2;
				res.max_attributes.charisma += 2;
				res.attributes.edge += 1;
				res.min_attributes.edge += 1;
				res.max_attributes.edge += 1;
				res.attributes.magic += 1;
				res.augmentations.push({name: 'Astral Perception'});
				res.augmentations.push({name: 'Concealment (Self Only)'});
				res.augmentations.push({name: 'Vanishing'});
				res.augmentations.push({name: 'Uneducated'});
				res.augmentations.push({name: 'Movement (x1/x2/+1; x2/x6/+2 flight)'});
				break;

			case 'Sasquatch':
				res.attributes.body += 5;
				res.min_attributes.body += 5;
				res.max_attributes.body += 5;
				res.attributes.strength += 4;
				res.min_attributes.strength += 4;
				res.max_attributes.strength += 4;
				res.augmentations.push({name: 'Dual Natured'});
				res.augmentations.push({name: 'Mimicry'});
				res.augmentations.push({name: 'Natural Weapon (Claws: DV(STR+1)P, AP -, Reach +1)'});
				res.augmentations.push({name: 'Uneducated'});
				break;

			default:
				console.log('ERROR: get_metatype_adjustment() with no known metatype (' + race + ')');
				res = false;
				break;
		}

		return res;
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
		//TODO: Add more qualities
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

	_augmentation_list: [
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
			name: 'Cyberarm (Left)',
			essence: 1,
			type: 'full cyberlimb',
			sub_type: 'arm'
		},
		{
			name: 'Cyberarm (Right)',
			essence: 1,
			type: 'full cyberlimb',
			sub_type: 'arm'
		},
		{
			name: 'Cybereyes',
			essence: 0.1,
			max_rating: 4,
			augments: ['Flare Compensation', 'Image link', 'Smartlink', 'Thermographic vision', 'Low-light Vision']
		},
		{
			name: 'Cyberleg (Left)',
			essence: 1,
			type: 'full cyberlimb',
			sub_type: 'leg'
		},
		{
			name: 'Cyberleg (Right)',
			essence: 1,
			type: 'full cyberlimb',
			sub_type: 'leg'
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
		},
		{
			name: 'Novacoke (Active)',
			essence: 0,
			selectable: false
		},
		{
			name: 'Psyche (Active)',
			essence: 0,
			selectable: false
		}
	],

	get_augmentation_list: function()
	{
		return this._augmentation_list.slice(0);
	},

	get_augmentation: function(name)
	{
		var augment = this._augmentation_list.find(function (aug)
		{
			return aug.name === name;
		});
		return $.extend({}, augment);
	},

	_weapon_list: [
		{
			name: 'Combat Axe',
			type: 'Melee',
			ability: 'Blades',
			acc: 4,
			dv: 5,
			damage_attribute: 'strength',
			ap: -4
		},

		{
			name: 'Combat Knife',
			type: 'Melee',
			ability: 'Blades',
			acc: 6,
			dv: 2,
			damage_attribute: 'strength',
			ap: -3
		},

		{
			name: 'Knife',
			type: 'Melee',
			ability: 'Blades',
			acc: 5,
			dv: 1,
			damage_attribute: 'strength',
			ap: -1
		},

		{
			name: 'Katana',
			type: 'Melee',
			ability: 'Blades',
			acc: 7,
			dv: 3,
			damage_attribute: 'strength',
			ap: -3,
			reach: 1
		},

		{
			name: 'Sword',
			type: 'Melee',
			ability: 'Blades',
			acc: 6,
			dv: 3,
			damage_attribute: 'strength',
			ap: -2,
			reach: 1
		},

		{
			name: 'Cyber Spur',
			type: 'Melee',
			ability: 'Unarmed Combat',
			acc: 'Physical',
			dv: 3,
			damage_attribute: 'strength',
			ap: -2
		},

		{
			name: 'Club',
			type: 'Melee',
			ability: 'Clubs',
			acc: 4,
			dv: 3,
			damage_attribute: 'strength',
			reach: 1
		},

		{
			name: 'Stun Baton',
			type: 'Melee',
			ability: 'Clubs',
			acc: 4,
			dv: 9,
			damage_type: 'S(e)',
			ap: -5,
			reach: 1
		},

		{
			name: 'Staff',
			type: 'Melee',
			ability: 'Clubs',
			acc: 6,
			dv: 3,
			damage_attribute: 'strength',
			reach: 2
		},

		{
			name: 'Telescoping Staff',
			type: 'Melee',
			ability: 'Clubs',
			acc: 4,
			dv: 2,
			damage_attribute: 'strength',
			reach: 2
		},

		{
			name: 'Defiance EX Shocker',
			type: 'Taser',
			ability: 'Pistols',
			acc: 4,
			dv: 9,
			damage_type: 'S(e)',
			ap: -5,
			modes: 'SS',
			ammo_count: 4,
			reload: 'm'
		},

		{
			name: 'Streetline Special',
			type: 'Hold-out Pistol',
			ability: 'Pistols',
			acc: 4,
			dv: 6,
			modes: 'SA',
			ammo_count: 6,
			reload: 'c'
		},

		{
			name: 'Colt America L36',
			type: 'Light Pistol',
			ability: 'Pistols',
			acc: 7,
			dv: 7,
			modes: 'SA',
			ammo_count: 11,
			reload: 'c'
		},

		{
			name: 'Fichetti Security 600',
			type: 'Light Pistol',
			ability: 'Pistols',
			acc: 6,
			acc_modified: 7,
			dv: 7,
			modes: 'SA',
			rc_modified: 1,
			ammo_count: 30,
			reload: 'c'
		},

		{
			name: 'Ares Predator V',
			type: 'Heavy Pistol',
			ability: 'Pistols',
			acc: 5,
			acc_modified: 7,
			dv: 8,
			ap: -1,
			modes: 'SA',
			ammo_count: 15,
			reload: 'c'
		},

		{
			name: 'Browning Ultra-Power',
			type: 'Heavy Pistol',
			ability: 'Pistols',
			acc: 5,
			acc_modified: 6,
			dv: 8,
			ap: -1,
			modes: 'SA',
			ammo_count: 10,
			reload: 'c'
		},

		{
			name: 'Remington Roomsweeper',
			type: 'Heavy Pistol',
			ability: 'Pistols',
			acc: 4,
			dv: 7,
			ap: -1,
			modes: 'SA',
			ammo_count: 8,
			reload: 'm'
		},

		{
			name: 'Ceska Black Scorpion',
			type: 'Machine Pistol',
			ability: 'Automatics',
			acc: 5,
			dv: 6,
			modes: 'SA/BF',
			rc_modified: 1,
			ammo_count: 35,
			reload: 'c'
		},

		{
			name: 'Steyr TMP',
			type: 'Machine Pistol',
			ability: 'Automatics',
			acc: 4,
			dv: 7,
			modes: 'SA/BF/FA',
			ammo_count: 30,
			reload: 'c'
		},

		{
			name: 'Colt Cobra TZ-120',
			type: 'SMG',
			ability: 'Automatics',
			acc: 4,
			acc_modified: 5,
			dv: 7,
			modes: 'SA/BF/FA',
			rc: 2,
			rc_modified: 3,
			ammo_count: 32,
			reload: 'c'
		},

		{
			name: 'FN P93 Praetor',
			type: 'SMG',
			ability: 'Automatics',
			acc: 6,
			dv: 8,
			modes: 'SA/BF/FA',
			rc: 1,
			rc_modified: 2,
			ammo_count: 50,
			reload: 'c'
		},

		{
			name: 'HK-227',
			type: 'SMG',
			ability: 'Automatics',
			acc: 5,
			acc_modified: 7,
			dv: 7,
			modes: 'SA/BF/FA',
			rc_modified: 1,
			ammo_count: 28,
			reload: 'c'
		},

		{
			name: 'AK-97',
			type: 'Assault Rifle',
			ability: 'Automatics',
			acc: 5,
			dv: 10,
			ap: -2,
			modes: 'SA/BF/FA',
			ammo_count: 38,
			reload: 'c'
		},

		{
			name: 'Ares Alpha',
			type: 'Assault Rifle',
			ability: 'Automatics',
			acc: 5,
			acc_modified: 7,
			dv: 11,
			ap: -2,
			modes: 'SA/BF/FA',
			rc: 2,
			ammo_count: 42,
			reload: 'c'
		},

		{
			name: 'FN HAR',
			type: 'Assault Rifle',
			ability: 'Automatics',
			acc: 5,
			acc_modified: 6,
			dv: 10,
			ap: -2,
			modes: 'SA/BF/FA',
			rc: 2,
			ammo_count: 35,
			reload: 'c'
		},

		{
			name: 'Cavalier Arms Crockett EBR',
			type: 'Sniper Rifle',
			ability: 'Longarms',
			acc: 6,
			dv: 12,
			ap: -3,
			modes: 'SA/BF',
			rc_modified: 1,
			ammo_count: 20,
			reload: 'c'
		},

		{
			name: 'Defiance T-250',
			type: 'Shotgun',
			ability: 'Longarms',
			acc: 4,
			dv: 10,
			ap: -1,
			modes: 'SS/SA',
			ammo_count: 5,
			reload: 'm'
		},

		{
			name: 'Enfield AS-7',
			type: 'Shotgun',
			ability: 'Longarms',
			acc: 4,
			acc_modified: 5,
			dv: 13,
			ap: -1,
			modes: 'SA/BF',
			ammo_count: 10,
			reload: 'c'
		},

		{
			name: 'Ingram Valiant',
			type: 'LMG',
			ability: 'Heavy Weapons',
			acc: 5,
			acc_modified: 6,
			dv: 9,
			ap: -2,
			modes: 'BF/FA',
			ammo_count: 50,
			reload: 'c'
		},

		{
			name: 'Panther XXL',
			type: 'Assault Cannon',
			ability: 'Heavy Weapons',
			acc: 5,
			acc_modified: 7,
			dv: 17,
			ap: -6,
			modes: 'SS',
			ammo_count: 15,
			reload: 'c'
		}
	],

	get_weapon_list: function()
	{
		var list = this._weapon_list.map(function (i)
		{
			return i.name;
		});

		list.sort();

		return list;
	},

	get_weapon: function(name)
	{
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

		var stock_weapon = this._weapon_list.find(function (i)
		{
			return name === i.name;
		});

		if (stock_weapon === undefined)
		{
			console.log('ERROR: get_weapon() with no known weapon name');
			return stock_weapon;
		}

		return $.extend(data, stock_weapon);
	},

	_gear_list: [
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
			name: 'Flashbang Grenade',
			quantity: 2
		},
		{
			name: 'Fragmentation Grenade',
			quantity: 1
		},
		{
			name: 'Gas Grenade (CS/Tear)',
			quantity: 2
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
	],

	get_gear_list: function()
	{
		return this._gear_list.slice(0);
	},

	get_gear: function(name)
	{
		var gear = this._gear_list.find(function (g)
		{
			return g.name === name;
		});
		return $.extend({}, gear);
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
