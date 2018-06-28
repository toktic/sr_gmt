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

		var hits = 0, i, exploding_count = count, v, e, res = {
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
				exploding_count++;
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

		if (res.misses > (exploding_count / 2))
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
