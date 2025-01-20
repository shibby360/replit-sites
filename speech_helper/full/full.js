var interval = 1000
var sntcclr = 'black'
var highltclr = 'blue'
function start() {
	sentences = [
		'What time are we eating dinner tonight?', 
		'My favorite foods are pizza, spaghetti, and chicken nuggets.',
		'I want to buy that toy.',
		'Yesterday, my teacher surprised us with a party.',
		'I am going to eat chicken, macaroni and cheese, and a cookie for dinner tonight.',
		'I used blank paper to write and draw.'
	];
	sentence = sentences[Math.floor(Math.random() * sentences.length)]
	var newsntnc = sentence.split(' ')
	for(var i = 0; i < newsntnc.length; i++) {
		newsntnc[i] = `<span id='word${i+1}'> ` + newsntnc[i] + ' </span>'
	}
	var wordindx = 1;
	var f = function() {
		var theword = $('#word'+wordindx.toString())
		var previndx = wordindx - 1
		var wordbehind = $('#word'+previndx.toString())
		wordbehind.css('color', sntcclr)
		theword.css('color', highltclr)
		wordindx += 1
		if(wordindx > newsntnc.length) {
			setTimeout(function() {
				$('#word'+newsntnc.length).css('color', sntcclr)
			}, interval)
			$('#tip').text('Take a deep breath before you start your sentence')
			clearInterval(idseti)
		}
	}
	$('#tip').text('Breathe in...')
	var idseti;
	setTimeout(function() {
		$('#sentence').html(newsntnc.join(''))
		$('#tip').text('Breathe out as you read...')
		idseti = setInterval(f, interval);
	}, 2000)
};
function settings() {
	if(!($('#settingsmenu').is(':visible'))) {
		$('#settingsmenu').show()
		$('#intervalinput').attr('value', interval/1000)
	} else {
		$('#settingsmenu').hide()
	}
}
function setsettings() {
	interval = Number($('#intervalinput').val()) * 1000
	$('#settingsmenu').hide()
	if($('#darkthemecheck').is(':checked')) {
		$('body').css('background-color', 'black')
		$('#sentence').css('color', 'white')
		$('#tip').css('color', 'red')
		sntcclr = 'white'
		highltclr = 'yellow'
	} else {
		$('body').css('background-color', 'white')
		$('#sentence').css('color', 'black')
		$('#tip').css('color', 'green')
		sntcclr = 'black'
		highltclr = 'blue'
	}
}