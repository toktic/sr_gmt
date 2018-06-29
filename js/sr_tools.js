function view_cast(show_intro)
{
	var $container = $('.main_content').empty();
	var $template = render.get_template('cast_of_shadows');
	var tabs_added = 0, tab_index_to_show;

	$('<div/>').addClass('cast_wrapper').append($template).appendTo($container);

	var tabs = storage.get_cast_tabs();

	tabs.forEach(function(tab)
	{
		tabs_added++;

		var $href = $('<a>' + tab.name + '</a>').attr('href', '#' + tab.href).attr('tab_id', tab.tab_id);

		var $li = $('<li/>').attr('tab_id', tab.tab_id).append($href);

		$template.find('ul.cast_tabs').append($li);

		$('<div/>', {id: tab.href}).appendTo($template.find('.cast_of_shadows')).attr('tab_id', tab.tab_id);

		// Add a row for editing this tab to the introduction edit area
		var $row_template = render.get_template('edit_tab_row');

		$row_template.appendTo($template.find('.edit_tab_wrapper'));

		$row_template.find('#tab_name').val(tab.name);

		// Check will save the name
		var save_tab_data = function ()
		{
			var tab_name = $row_template.find('#tab_name').val().replace(/\W/g, ' ').trim();

			if (tab.name !== tab_name && tab_name !== '')
			{
				storage.set_cast_tab(tab.tab_id, {name: tab_name});
				storage.set_current_cast_tab(tab.tab_id);
				view_cast();
			}
		};

		$row_template.find('button.tab_edit').button().click(save_tab_data);
		$row_template.find('#tab_name').on('keyup', function (e)
		{
			if (e.keyCode === 13)
				save_tab_data();
		});

		// Up arrow moves tab up
		$row_template.find('button.tab_up').button();

		if (tabs_added > 1)
		{
			$row_template.find('button.tab_up').click(function ()
			{
				storage.set_cast_tab(tab.tab_id, {order: (tab.order - 1)});
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
				storage.set_cast_tab(tab.tab_id, {order: (tab.order + 1)});
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
				storage.delete_cast_tab(tab.tab_id);
				storage.set_current_cast_tab(1);
				view_cast(true);
			});
		}
		else
		{
			$row_template.find('button.delete_tab').button('disable');
		}
	});

	var redraw_full_cast = function($tab)
	{
		$tab.empty().append(render.get_template('cast__full_list'));

		var full_cast = storage.get_characters();

		if (full_cast.length > 0)
		{
			$tab.find('.empty_message').detach();
		}
		else
		{
			$tab.find('.cast_message').detach();
		}

		full_cast.forEach(function(cast)
		{
			var $char_template = render.get_template('cast__full_list_entry').appendTo($tab.find('[list]'));

			render.mook_for_action($char_template.find('.entry'), cast);

			$char_template.find('.tab_delete_dialog').detach();
			var $deletion_dialog = $char_template.find('.delete_dialog').dialog({
				autoOpen: false,
				modal: true,
				title: 'Remove Cast Member',
				width: 450,
				buttons: [
					{
						text: "Ok",
						click: function() {
							storage.delete_character(cast.character_id);
							$(this).dialog("close");
							view_cast();
						}
					},
					{
						text: "Cancel",
						click: function() {
							$(this).dialog("close");
						}
					}
				]
			});

			$char_template.find('.delete_cast_member').button().click(function ()
			{
				$deletion_dialog.dialog('open');
			});

			// TODO add a line saying when the character was created

			// TODO add a line saying when the character was last edited (might not store that yet)

			// Add the npc to a given tab it isn't already in
			var tabs = storage.get_cast_tabs();

			if (tabs.length > 1)
			{
				$char_template.find('button.add_npc').button().off('click').click(function()
				{
					var tab_id = parseInt($char_template.find('select[name="tab_name"]').val());
					var this_tab = storage.get_cast_tab(tab_id);

					if (!this_tab.characters.includes(cast.character_id))
					{
						this_tab.characters.push(cast.character_id);
						storage.set_cast_tab(tab_id, this_tab);
					}
				});

				$char_template.find('button.add_npc_and_switch').button().off('click').click(function()
				{
					var tab_id = parseInt($char_template.find('select[name="tab_name"]').val());
					var this_tab = storage.get_cast_tab(tab_id);

					if (!this_tab.characters.includes(cast.character_id))
					{
						this_tab.characters.push(cast.character_id);
						storage.set_cast_tab(tab_id, this_tab);
					}

					$template.find('.cast_tabs li[tab_id] a[tab_id="' + tab_id + '"]').click();
				});

				var tabs_available = false;
				tabs.forEach(function(tab)
				{
					if (!tab.characters.includes(cast.character_id) && tab.tab_id !== 1)
					{
						$char_template.find('.add_to_tab select[name="tab_name"]').append($('<option/>').html(tab.name).attr('value', tab.tab_id));
						tabs_available = true;
					}
				});

				if (!tabs_available)
					$char_template.find('.add_to_tab').detach();
			}
			else
			{
				$char_template.find('.add_to_tab').detach();
			}
		});

		// Set the currently active cast tab
		storage.set_current_cast_tab(1);
	};

	var redraw_tab = function(tab_id, $tab)
	{
		var tab_info = storage.get_cast_tab(tab_id);

		$tab.empty().append(render.get_template('cast__tab_list'));

		// Add each NPC who appears on this tab
		if (tab_info.characters.length > 0)
		{
			tab_info.characters.forEach(function(character_id)
			{
				var character = storage.get_character(character_id);

				var $char_template = render.get_template('cast__full_list_entry').appendTo($tab.find('[list]'));

				render.mook_for_action($char_template.find('.entry'), character);

				$char_template.find('.delete_dialog').detach();
				var $deletion_dialog = $char_template.find('.tab_delete_dialog').dialog({
					autoOpen: false,
					modal: true,
					title: 'Remove Cast Member',
					width: 450,
					buttons: [
						{
							text: "Ok",
							click: function() {
								storage.delete_character_from_tab(tab_id, character_id);
								$(this).dialog("close");
								$char_template.detach();
							}
						},
						{
							text: "Cancel",
							click: function() {
								$(this).dialog("close");
							}
						}
					]
				});

				$char_template.find('.delete_cast_member').button().click(function ()
				{
					$deletion_dialog.dialog('open');
				});

				// TODO add a line saying when the character was created

				$char_template.find('.add_to_tab').detach();
			});
		}
		else
		{
			$tab.append($("<div/>").html(tab_info.name)).append("There are currently no NPCs on this tab.");
		}

		// asdfasdf

		// Set the currently active cast tab
		storage.set_current_cast_tab(tab_id);
	};

	$template.tabs({
		beforeActivate: function(e, ui)
		{
			var show_tab_id = parseInt($(ui.newTab).attr('tab_id'));

			if (show_tab_id === 0)
				return;
			else if (show_tab_id === 1)
				redraw_full_cast(ui.newPanel);
			else
				redraw_tab(show_tab_id, ui.newPanel);
		}
	});

	var add_new_tab = function()
	{
		var tab_name = $('.cast_of_shadows #add_tab_name').val(), tab_id;

		if (tab_name === '')
		{
			return;
		}

		tab_id = storage.create_cast_tab(tab_name);
		storage.set_current_cast_tab(tab_id);

		view_cast();
	};

	// Be able to add a tab
	$template.find('button.add_tab').button().click(add_new_tab);
	$template.find('.add_tab_wrapper #add_tab_name').on('keyup', function (e)
	{
		if (e.keyCode === 13)
			add_new_tab();
	});

	// Activate the last-viewed tab, or the Full Cast if we've just created something
	tab_index_to_show = storage.get_current_cast_tab();
	tab_index_to_show = $template.find('a[tab_id="' + tab_index_to_show + '"]').parent().index();
	if (show_intro === true)
		tab_index_to_show = 0;
	$template.tabs('option', 'active', tab_index_to_show);
}

function view_generator()
{
	var $container = $('.main_content').empty();

	var $template = render.get_template('minion_generator_section');

	var current_npc;

	$container.append($template);

	$template.find('button').button();

	$template.find('#overview button.generate_mook').on('click', function()
	{
		$template.find('.section_tabs').tabs('option', 'active', 1);
	});

	$template.find('#overview button.generate_mob').on('click', function()
	{
		$template.find('.section_tabs').tabs('option', 'active', 2);
	});

	$template.find('#generate_minion').on('click', function()
	{
		var options = {};

		if ($('.main_content #minion_generator .entry_form input[name="name"]').val())
		{
			options['name'] = $('.main_content #minion_generator .entry_form input[name="name"]').val();
		}

		$('.main_content #minion_generator .entry_form select').each(function ()
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

		render.mook($template.find('#minion_generator #generated_results'), current_npc);

		$template.find('#minion_generator #discard_minion').button('enable');

		$template.find('#minion_generator #add_to_cast').button('enable').off('click').click(function()
		{
			storage.set_character(current_npc);

			// When we create a new character, go to the full cast
			storage.set_current_cast_tab(1);

			view_cast();
		});
	});

	$template.find('#minion_generator #discard_minion').button('disable').click(function ()
	{
		$template.find('#minion_generator #generated_results').empty();

		$template.find('#minion_generator #discard_minion').button('disable');

		$template.find('#minion_generator #add_to_cast').button('disable');
	});

	$template.find('#minion_generator #add_to_cast').button('disable');

	$template.find('#generate_mob').on('click', function()
	{
		var options = {}, i, mob_name = 'Mob #' + roll.dval(10) + roll.dval(10) + ':', mob = [], special;

		if ($('.main_content #mob_generator .entry_form input[name="name"]').val().trim())
		{
			mob_name = $('.main_content #mob_generator .entry_form input[name="name"]').val().trim();
		}

		var mob_count = $('.main_content #mob_generator .entry_form select[name="number"]');
		mob_count = mob_count.find(':selected').val();

		switch (mob_count)
		{
			case 'two_four':
				mob_count = 1 + roll.dval(3);
				break;

			case 'three_six':
				mob_count = 2 + roll.dval(4);
				break;

			case 'four_ten':
				mob_count = 3 + roll.dval(7);
				break;

			default:
				mob_count = 1;
				break;
		}

		if ($('#mob_generator .entry_form select[name="race"] option:selected').val())
			options.race = $('#mob_generator .entry_form select[name="race"] option:selected').val();

		if ($('#mob_generator .entry_form select[name="gender"] option:selected').val())
			options.gender = $('#mob_generator .entry_form select[name="gender"] option:selected').val();

		if ($('#mob_generator .entry_form select[name="professional_rating"] option:selected').val())
			options.professional_rating = $('#mob_generator .entry_form select[name="professional_rating"] option:selected').val();

		if ($('#mob_generator .entry_form select[name="professional_type"] option:selected').val())
			options.professional_type = $('#mob_generator .entry_form select[name="professional_type"] option:selected').val();

		// If we need a group rating, generate that
		if (options.professional_rating === 'group')
		{
			options.professional_rating = roll.dval(5) - 1;
		}
		else if (options.professional_rating == parseInt(options.professional_rating))
		{
			options.professional_rating = parseInt(options.professional_rating);
		}

		// If we need a group type, generate that
		if (options.professional_type === 'group')
		{
			options.professional_type = gen.random_type();
		}

		for (i = 0; i < mob_count; i++)
		{
			var mook = gen.mook($.extend({}, options));
			mook.name = mob_name + ' ' + mook.name;
			mob.push(mook);
		}

		if ($('#mob_generator .entry_form input[name="special_magician"]').prop('checked'))
		{
			special = $.extend({}, options);
			special.is_mage = true;
			var mook = gen.mook(special);
			mook.name = mob_name + ' ' + mook.name;
			mob.push(mook);
		}
		if ($('#mob_generator .entry_form input[name="special_adept"]').prop('checked'))
		{
			special = $.extend({}, options);
			special.is_adept = true;
			var mook = gen.mook(special);
			mook.name = mob_name + ' ' + mook.name;
			mob.push(mook);
		}
		if ($('#mob_generator .entry_form input[name="special_decker"]').prop('checked'))
		{
			special = $.extend({}, options);
			special.is_decker = true;
			var mook = gen.mook(special);
			mook.name = mob_name + ' ' + mook.name;
			mob.push(mook);
		}
		if ($('#mob_generator .entry_form input[name="special_lieutenant"]').prop('checked'))
		{
			special = $.extend({}, options);
			special.is_lt = true;
			var mook = gen.mook(special);
			mook.name = mob_name + ' ' + mook.name;
			mob.push(mook);
		}

		$template.find('#mob_generator #generated_results').empty();

		for (i = mob.length - 1; i >= 0; i--)
		{
			var $mob_entry = $('<div/>').addClass('mob_entry').appendTo($template.find('#mob_generator #generated_results'));

			render.mook($mob_entry, mob[i]);
		}

		$template.find('#mob_generator #discard_minion').button('enable');

		$template.find('#mob_generator #add_to_cast').button('enable').off('click').click(function()
		{
			for (i = mob.length - 1; i >= 0; i--)
			{
				storage.set_character(mob[i]);
			}

			// When we create a new character, go to the full cast
			storage.set_current_cast_tab(1);

			view_cast();
		});
	});

	$template.find('#mob_generator #discard_minion').button('disable').click(function ()
	{
		$template.find('#mob_generator #generated_results').empty();

		$template.find('#mob_generator #discard_minion').button('disable');

		$template.find('#mob_generator #add_to_cast').button('disable');
	});

	$template.find('#mob_generator #add_to_cast').button('disable');

	// TODO add a reset button to the form to reset all the values to default. Could just call view_generator()

	// TODO want a button that adds the generated mook to the cast as well as a specified tab

	// Make things pretty!
	$template.find('select').selectmenu();
	$template.find('#mob_generator .add_special_types input').checkboxradio();

	render.equalize_widths($template.find('.section_tabs #minion_generator .input_row label[equalize]'));
	render.equalize_widths($template.find('.section_tabs #mob_generator .input_row label[equalize]'));

	$template.find('.section_tabs').tabs();
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
					view_settings();
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

	// Condition Monitor global setting
	$container.find('[setting="condition_monitor"]').buttonset();
	$container.find('[setting="condition_monitor"] input#' + storage.setting('condition_monitor')).click();

	$container.find('[setting="condition_monitor"] input').click(function()
	{
		localStorage.setting_condition_monitor = $(this).attr('id');
	});

	// Wound Penalties global setting
	$container.find('[setting="wound_penalty"]').buttonset();
	$container.find('[setting="wound_penalty"] input#' + storage.setting('wound_penalty')).click();

	$container.find('[setting="wound_penalty"] input').click(function()
	{
		localStorage.setting_wound_penalty = $(this).attr('id');
	});
}

function view_intro()
{
	var $container = $('.main_content').empty();

	var template = render.get_template('main_screen');

	$container.append(template);

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

function setup_controls()
{
	render.get_templates();

	// Initialization checks
	if (!localStorage)
	{
		// TODO prettyify
		alert('Your browser is too old to run this utility. Please upgrade your browser.');
	}

	// Initial setup of localStorage if it hasn't been
	if (!localStorage.hasOwnProperty(['build_id']))
	{
		storage.initialize_storage();
	}

	// Set up the roll controls in the top bar
	$('.top_bar button').button();

	$('.top_bar .numbers button').addClass('smaller_button');

	$('.top_bar .numbers button').on('click', function ()
	{
		var dice = $(this).attr('roll'), options = {}, addition = '\n';

		var timestamp = new Date();

		addition += timestamp.toLocaleTimeString() + '; pool of ' + dice;

		if ($('.top_bar_roller #explode').is(':checked'))
		{
			options.pre_edge = true;
			addition += ' exploding';
		}

		addition += '\n';

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
}

var build_id = '0.10';
var total_count = 78;
var download_url = 'https://github.com/toktic/sr_gmt';
