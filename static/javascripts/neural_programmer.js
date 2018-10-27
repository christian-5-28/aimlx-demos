answers_translate = {"word-match": " and perform a <b>word query</b>.", "print": " and <b>return</b> the results.", "count": " and return the <b>number</b> of results.", "group_by_max": " and <b>group</b> the elements by the query.", "max": " and obtain the <b>maximum</b> value.", "min": " and obtain the <b>minimum</b> value.", "greater": " and get the cells with value <b>greater</b> than the query.", "smaller": " and get the cells with value <b>smaller</b> than the query.", "geq": " and get the cells with value <b>greater or equal</b> than the query.", "leq": " and get the cells with value <b>smaller or equal</b> than the query.", "first_rs": " and get the <b>first</b> cell.", "last_rs": " and get the <b>last</b> cell.", "reset_select": " and <b>select all</b> the rows."}

function new_question(question) {
	$('#question').text(question);
	start_spinner();
	$("#answer_np").css('visibility', 'hidden');
	$("#debug").css('visibility', 'hidden');
	$('#answer_np').text('');
	$('#suggestions').text('');	
	$("#question").css('visibility', 'visible');
	clean_table();
}

function clean_table() {
	$("tr th").removeClass("highlighted");
	$("tr td").removeClass("highlighted");
	$("tr").removeClass("highlighted");
	$("tr td").removeClass("result");
}

function new_neural_programmer_answer(np, debug) {
	$('#answer_np').text(np);
	$("#answer_np").css('visibility', 'visible');
	var steps = "";
	var last_rows = ""
	for (var i=0, l=debug.ops.length; i<l; i++) { 
		op = debug.ops[i];
		col = debug.cols[i];
		rows = debug.rows[i].replace(/ /g, ",");
		index = i+1;
		if (i == l -1) {
			var rows_selector = last_rows;
		}
		else {
			var rows_selector = JSON.parse(rows).join('-');
			last_rows = rows_selector;
		}
		steps += "<div class='step debug-message'>Step " + index + ": Select the column <b><span rows=" + rows_selector + " class='col'>" + col + "</span></b>" + answers_translate[op] + "</div>";	
	}

	$('#debug').html(steps);
	$("#debug").css('visibility', 'visible');
	//suggestions_random = get_random_suggestions(suggestions);
    //load_suggestions(suggestions_random);
	stop_spinner();
}


function submit(input_text) {
	console.log("Neural Programmer input:", input_text)
	$('#input_text').val('');
	new_question(input_text);
	url = "/neural_programmer/question";
	//table_key = 'csv/203-csv/713.csv'
	table_key = 'csv/custom-csv/swisscom.csv';
	processed_text = input_text.toLowerCase().replace('?',' ?');
	data = {"question": processed_text, "table_key": table_key }
	$.ajax({
	  type: "POST",
	  url: url,
	  contentType: 'application/json',
	  data: JSON.stringify(data, null, '\t'),
	  success: function(data) {
		var data = data.neural_programmer;
		data = data.replace(/'{/g, '{');
		data = data.replace(/}'/g, '}');
		data = data.replace(/"{/g, '{');
		data = data.replace(/}"/g, '}');
		data = data.replace(/'/g, '"');
		console.log(data)
		data = JSON.parse(data);
		var answer = data.answer;
		var debug = data.debugging;
		console.log("Debug:", debug);
		console.log("Answer:", answer);
		new_neural_programmer_answer(answer, debug)
	  }	
	});
}

function load_suggestions(suggestions){
	for (var c in suggestions) {
		$('#suggestions').html($('#suggestions').html() + '<div class="col-md-4 suggestion_box"><div class="panel panel-default suggestion"><div class="panel-body">' + suggestions[c] + ' </div></div></div>');
	}
	$('.suggestion .panel-body').matchHeight();
	$('.suggestion .panel-body').click(function(e){
		query = $(e.target).text();
		submit(query);
	})
}

function get_random_suggestions(suggestions) {
	var random_indexes = []
	while(random_indexes.length < 6){
	    var random_number = Math.ceil(Math.random()*(suggestions.length-1));
	    if(random_indexes.indexOf(random_number) > -1) continue;
	    random_indexes[random_indexes.length] = random_number;
	}

	suggestions_random = []
	for (var i in random_indexes) {
		suggestions_random.push(suggestions[random_indexes[i]]);
	}
	return suggestions_random
}

$(document).ready(function(){

	$('#input_text').keyup(function(e){
	    if(e.keyCode == 13) {
	    	input_text = $('#input_text').val();
	    	if (input_text != '') submit(input_text, $('#project_value').text().toLowerCase());
	    }
	});

	$('#search_button').click(function(e){
		input_text = $('#input_text').val();
	    if (input_text != '') submit(input_text, $('#project_value').text().toLowerCase());
	})

	//$.getJSON("../static/javascripts/lists/neural_programmer_swisscom.json", function(json) {
	//	suggestions = json.questions;
	//	suggestions_random = get_random_suggestions(suggestions);
	//  load_suggestions(suggestions_random);
	//});
	
	$(document).on('mouseenter', '.step', function() {
    	var col = $(this).find('.col')[0]
		var col_name = $(col).text().replace(/ /g, "_");
		col_name = col_name.slice(0, -1);
		$(".col-" + col_name).addClass("highlighted");
		var rows_selector = col.getAttribute('rows').split("-");
		for (var r in rows_selector) {
			row = parseInt(rows_selector[r]);
			var cells = $($('tr')[row+1])
			cells.addClass('highlighted')
			cells.children('td').each(function (){
				if ($(this).hasClass('highlighted')) {
					$(this).addClass("result");
				}
			})
		}
	})

    $(document).on('mouseleave', '.step', function() {
    	var col = $(this).find('.col')[0]
		var col_name = $(col).text().replace(/ /g, "_");
		col_name = ".col-" + col_name.slice(0, -1);
		$(col_name).removeClass("highlighted");
		var rows_selector = col.getAttribute('rows').split("-");
		for (var r in rows_selector) {
			row = parseInt(rows_selector[r]);
			var cells = $($('tr')[row+1])
			cells.removeClass('highlighted')
			cells.children('td').each(function (){
				$(this).removeClass("highlighted");
				$(this).removeClass("result");
			})
		}
    })

	//table = '<div id="table-wrap""><div id="table"><table class="clean table"><thead><tr><th class="col-player">Player</th><th class="col-nationality">Nationality</th><th class="col-team">Team</th><th class="col-titles">Titles</th><th class="col-age">Age</th><th class="col-salary">Salary</th><th class="col-position">Position</th><th class="col-matches">Matches Played</th><th class="col-goals">Goals</th><th class="col-assists">Assists</th><th class="col-yellow_cards">Yellow Cards</th><th class="col-red_cards"">Red Cards</th></tr></thead><tbody><tr><td class="col-player">Iker Casillas</td><td class="col-nationality">Spain</td><td class="col-team">FC Porto</td><td class="col-titles">3</td><td class="col-age">36</td><td class="col-salary">7.500.000€</td><td class="col-position">Goalkeeper</td><td class="col-matches">164</td><td class="col-goals">0</td><td class="col-assists">0</td><td class="col-yellow_cards">5</td><td class="col-red_cards"">0</td></tr><tr><td class="col-player">Cristiano Ronaldo</td><td class="col-nationality">Portugal</td><td class="col-team">Real Madrid CF</td><td class="col-titles">4</td><td class="col-age">32</td><td class="col-salary">32.000.000€</td><td class="col-position">Forward</td><td class="col-matches">140</td><td class="col-goals">105</td><td class="col-assists">31</td><td class="col-yellow_cards">16</td><td class="col-red_cards">0</td></tr><tr><td class="col-player">Andrés Iniesta</td><td class="col-nationality">Spain</td><td class="col-team">FC Barcelona</td><td class="col-titles">4</td><td class="col-age">33</td><td class="col-salary">14.000.000€</td><td class="col-position">Midfield</td><td class="col-matches">122</td><td class="col-goals">11</td><td class="col-assists">16</td><td class="col-yellow_cards">8</td><td class="col-red_cards">0</td></tr><tr><td class="col-player">Zlatan Ibrahimovic</td><td class="col-nationality">Sweden</td><td class="col-team">Manchester United</td><td class="col-titles">0</td><td class="col-age">35</td><td class="col-salary" class="col-salary">12.000.000€</td><td class="col-position">Forward</td><td class="col-matches">119</td><td class="col-goals">48</td><td class="col-assists">22</td><td class="col-yellow_cards">19</td><td class="col-red_cards">4</td></tr><tr><td class="col-player">Leo Messi</td><td class="col-nationality">Argentina</td><td class="col-team">FC Barcelona</td><td class="col-titles">4</td><td class="col-age" class="col-age">30</td><td class="col-salary">40.000.000€</td><td class="col-position">Forward</td><td class="col-matches" class="col-matches">115</td><td class="col-goals">94</td><td class="col-assists">24</td><td class="col-yellow_cards">14</td><td class="col-red_cards">0</td></tr><tr><td class="col-player">Petr Cech</td><td class="col-nationality">Czech Republic</td><td class="col-team">FC Arsenal</td><td class="col-titles">1</td><td class="col-age">35</td><td class="col-salary">7.000.000€</td><td class="col-position">Goalkeeper</td><td class="col-matches">111</td><td class="col-goals">0</td><td class="col-assists">0</td><td class="col-yellow_cards">4</td><td class="col-red_cards">0</td></tr><tr><td class="col-player">Gianluigi Buffon</td><td class="col-nationality">Italy</td><td class="col-team">Juventus FC</td><td class="col-titles">0</td><td class="col-age">39</td><td class="col-salary">4.000.000€</td><td class="col-position">Goalkeeper</td><td class="col-matches">108</td><td class="col-goals">0</td><td class="col-assists">0</td><td class="col-yellow_cards">2</td><td class="col-red_cards">0</td></tr><tr><td class="col-player">Sergio Ramos</td><td class="col-nationality">Spain</td><td class="col-team">Real Madrid CF</td><td class="col-titles">3</td><td class="col-age">31</td><td class="col-salary">10.000.000€</td><td class="col-position">Defender</td><td class="col-matches">103</td><td class="col-goals">10</td><td class="col-assists">6</td><td class="col-yellow_cards">32</td><td class="col-red_cards">3</td></tr></tbody></table></div></div>'
	table = '<div id="table-wrap""><div id="table"><table class="clean table"><thead><tr><th class="col-package">Package</th><th class="col-download_speed">Download speed (Mbps)</th><th class="col-international_calls">International time (Minutes)</th><th class="col-roaming">Roaming (Days)</th><th class="col-price">Price (CHF)</th><th class="col-description">Description</th></tr></thead><tbody><tr><td class="col-package">InOne XL</td><td class="col-download_speed">200</td><td class="col-international_calls">1000</td><td class="col-roaming">365</td><td class="col-price">180</td><td class="col-description">With highspeed internet, ideal for business</td></tr><tr><td class="col-package">InOne L</td><td class="col-download_speed">200</td><td class="col-international_calls">300</td><td class="col-roaming">365</td><td class="col-price">120</td><td class="col-description">Complete package thought for Erasmus students.</td></tr><tr><td class="col-package">InOne M</td><td class="col-download_speed">200</td><td class="col-international_calls">100</td><td class="col-roaming">60</td><td class="col-price">90</td><td class="col-description">Top seller package, ideal for teenagers to use the social media.</td></tr><tr><td class="col-package">InOne S</td><td class="col-download_speed">20</td><td class="col-international_calls">60</td><td class="col-roaming">45</td><td class="col-price">70</td><td class="col-description">Fast internet with an affordable price. Convenient for holidays abroad.</td></tr><tr><td class="col-package">InOne XS</td><td class="col-download_speed">2</td><td class="col-international_calls">30</td><td class="col-roaming">30</td><td class="col-price">50</td><td class="col-description">Package cheap, simple and easy.</td><tr></tbody></table></div></div>'
	$('#table_container').html(table)
});
