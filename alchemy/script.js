function toTitleCase(str) {
	return str.replace(/\w\S*/g, function(txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
	})
}
function addListeners() {
	var func = function(ev) {
		var btn = ev.target
		if(inpot.length < 3) {
			inpot.push(btn.innerText.toLowerCase())
			if(inpot.length >= 2) {
				$('#combiner').prop('disabled', false)
			}
		} else {
			alert('Pot full!')
		}
		updatepot()
	}
	$('.elements').off('click')
	$('.elements').on('click', func)
}
function listListeners() {
	var func = function(ev) {
		var el = ev.target
		var index = inpot.indexOf(el.innerText.toLowerCase())
		inpot.splice(index, 1)
		updatepot()
	}
	$('#inpot > *').off('click')
	$('#inpot > *').on('click', func)
}
var has = ['fire', 'water', 'earth', 'air']
if(localStorage.getItem('has') && localStorage.getItem('rst') === 'false') {
	has = localStorage.getItem('has').split(',')
}
localStorage.setItem('rst', 'false')
var inpot = []
function update() {
	$('#buttons').html('')
	for(var i = 0; i < has.length; i++) {
		var el = $(`<button style="background:${itemdata.data[has[i]].color};color:${itemdata.data[has[i]].fg}" class="elements">${toTitleCase(has[i])}</button>`)
		$('#buttons').append(el)
		addListeners()
	}
}
function updatepot() {
	$('#inpot').html('')
	for(var i = 0; i < inpot.length; i++) {
		var el = $(`<li style="background:${itemdata.data[inpot[i]].color};color:${itemdata.data[inpot[i]].fg}">${toTitleCase(inpot[i])}</li>`)
		$('#inpot').append(el)
		listListeners()
	}
}
update()
$('#combiner').on('click', function() {
	if(inpot.sort().join(',') === 'death,universe') {
		localStorage.setItem('rst', 'true')
		alert('You killed the universe!')
		location.reload()
	} else if(inpot.sort().join(',') === 'indigestion,indigestion,indigestion') {
		$('body').css('background', 'url(indigestion.png)')
		$('body').css('background-size', '100%')
		inpot = []
		updatepot()
	}
	var vals = Object.values(itemmixes.mixes)
	var keys = Object.keys(itemmixes.mixes)
	for(var i in vals) {
		var val = vals[i]
		if(val.sort().join(',') === inpot.sort().join(',')) {
			//.join is required becuase === doesnt work on arrays
			has.push(keys[i])
			has = [...new Set(has)]
			inpot = []
			update()
			updatepot()
		}
	}
})
$(window).on('beforeunload', function() {
	localStorage.setItem('has', has)
})