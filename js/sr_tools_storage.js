var storage = {
	initialize_storage: function()
	{
		// Set up any expected things in localStorage
		localStorage.build_id = build_id;

		// // Cast of Shadows
		// What tab ID did we last create?
		localStorage.cast_tab_id = 1;

		// What character ID did we last create?
		localStorage.cast_character_id = 0;

		// What tab did we show last?
		// Start with the management tab, so new users see it at least once
		localStorage.cast_current_tab = 0;

		// What tabs are there?
		localStorage.cast_tabs = JSON.stringify([
			{
				tab_id: 1,
				name: 'Full Cast',
				order: 1,
				characters: [] // This is an array of {character_id, order} objects
			}
		]);

		// Save the characters
		localStorage.cast_characters = JSON.stringify([]);

		// Save a character template
		localStorage.cast_character_template = JSON.stringify({
			character_id: null,
			type: '',
			data: null
		});

		// Settings
		localStorage.setting_condition_monitor = 'combined';
		localStorage.setting_wound_penalty = '3';
	},

	// Return an array of tabs with their name, tab ID, and display ordering
	get_cast_tabs: function()
	{
		var stored_tabs = $.parseJSON(localStorage.cast_tabs);

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
	get_current_cast_tab: function()
	{
		return parseInt(localStorage.cast_current_tab);
	},

	// Set which tab we are viewing now
	set_current_cast_tab: function(id)
	{
		localStorage.cast_current_tab = id;
	},

	// Get information about a tab
	get_cast_tab: function(tab_id)
	{
		var stored_tabs = $.parseJSON(localStorage.cast_tabs), ret = null;

		stored_tabs.forEach(function(tab)
		{
			tab.href = tab.name.replace(/( )/g, '_').replace(/\W/g, '');
			if (tab.tab_id === tab_id)
				ret = tab;
		});

		if (ret === null)
			console.log('ERROR: get_cast_tab() unable to find specified tab', tab_id);

		return ret;
	},

	// Update a given tab, also for adding a new tab
	set_cast_tab: function(tab_id, tab_data)
	{
		// If the order isn't the same as the existing tabs, update other tabs to match?
		var stored_tabs = $.parseJSON(localStorage.cast_tabs);

		var lower_order, upper_order, change_direction = false;

		stored_tabs.forEach(function(tab)
		{
			if (tab_id === tab.tab_id)
			{
				if (tab_data.name !== null && tab_data.name !== tab.name)
				{
					tab.name = tab_data.name;
				}

				if (tab_data.hasOwnProperty('characters') && tab_data.characters.length !== tab.characters.length)
					tab.characters = tab_data.characters;

				if (Number.isInteger(tab_data.order) && tab_data.order !== tab.order)
				{
					upper_order = Math.max(tab.order, tab_data.order);
					lower_order = Math.min(tab.order, tab_data.order);
					change_direction = (tab.order > tab_data.order) ? 1 : -1;
					tab.order = tab_data.order;
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
	delete_cast_tab: function(tab_id)
	{
		if (tab_id === 1)
			return;

		var stored_tabs = $.parseJSON(localStorage.cast_tabs), new_tabs = [];

		stored_tabs.forEach(function(tab)
		{
			if (tab.tab_id !== tab_id)
				new_tabs.push(tab);
		});

		localStorage.cast_tabs = JSON.stringify(new_tabs);
	},

	generate_character_id: function()
	{
		var id = parseInt(localStorage.cast_character_id) + 1;
		localStorage.cast_character_id = id;
		return id;
	},

	generate_cast_tab_id: function()
	{
		var id = parseInt(localStorage.cast_tab_id) + 1;
		localStorage.cast_tab_id = id;
		return id;
	},

	get_characters: function()
	{
		return $.parseJSON(localStorage.cast_characters);
	},

	get_character: function(id)
	{
		var character = null, all = this.get_characters();

		all.forEach(function(char)
		{
			if (id === char.character_id)
				character = char;
		});

		return character;
	},

	set_character: function(data)
	{
		var cast_characters = $.parseJSON(localStorage.cast_characters), new_char = false;
		var updated_cast = [];

		if (!data.hasOwnProperty('character_id'))
		{
			new_char = true;
			data.character_id = this.generate_character_id();
		}

		if (new_char)
		{
			cast_characters.push(data);
			updated_cast = cast_characters;
		}
		else
		{
			cast_characters.forEach(function(char)
			{
				if (char.character_id === data.character_id)
					updated_cast.push(data);
				else
					updated_cast.push(char);
			});
		}

		localStorage.cast_characters = JSON.stringify(updated_cast);

		return data;
	},

	delete_character_from_tab: function(tab_id, character_id)
	{
		var tab_data = this.get_cast_tab(tab_id);

		tab_data.characters = tab_data.characters.filter(function(id)
		{
			return id !== character_id;
		});

		this.set_cast_tab(tab_id, tab_data);
	},

	delete_character: function(id)
	{
		var old_cast = $.parseJSON(localStorage.cast_characters), new_cast = [], i = 0;

		for (i; i < old_cast.length; i++)
		{
			if (id !== old_cast[i].character_id)
				new_cast.push(old_cast[i]);
		}

		localStorage.cast_characters = JSON.stringify(new_cast);

		var tabs = this.get_cast_tabs();

		tabs.forEach(function(tab)
		{
			storage.delete_character_from_tab(tab.tab_id, id);
		});
	},

	// Return the ID of the newly created tab
	create_cast_tab: function(tab_name)
	{
		// Find the highest tab ID now
		var tab_id = this.generate_cast_tab_id(), sort_order, stored_tabs = $.parseJSON(localStorage.cast_tabs);

		sort_order = stored_tabs.length + 1;

		stored_tabs.push({
			tab_id: tab_id,
			name: tab_name,
			order: sort_order,
			characters: []
		});

		localStorage.cast_tabs = JSON.stringify(stored_tabs);

		return tab_id;
	},

	// Get a specific setting
	// Note that actually changing settings is just left to the Settings tab
	setting: function(name)
	{
		if (localStorage.hasOwnProperty('setting_' + name))
		{
			return localStorage['setting_' + name];
		}
		else
		{
			return null;
		}
	}
};
