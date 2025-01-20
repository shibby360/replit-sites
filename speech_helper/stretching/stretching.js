var interval = 2000
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
	$('#sentence').html(newsntnc.join(''))
	var wordindx = 1;
	var f = function() {
		var theword = $('#word'+wordindx.toString())
		var previndx = wordindx - 1
		var wordbehind = $('#word'+previndx.toString())
		wordbehind.css('color', sntcclr)
		theword.css('color', highltclr)
		var cntrr = 0;
		function f2() {
			if(wordindx === 2) {
				var fs = Number($("#word1").css("font-size").replace('px', ''));
				$('#word1').css("font-size", fs+3+'px')
			}
			cntrr += 1
			if(cntrr === 10) {
				$('#word1').css("font-size", 16)
				clearInterval(idseti2)
			}
		}
		wordindx += 1
		if(wordindx > newsntnc.length) {
			setTimeout(function() {
				$('#word'+newsntnc.length).css('color', sntcclr)
			}, interval)
			clearInterval(idseti)
		}
		var idseti2 = setInterval(f2, 100)
	}
	var idseti = setInterval(f, interval);
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
