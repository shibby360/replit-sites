function rgbchange() {
	document.querySelector('#preview').style.background = `rgb(${document.querySelector('#redamount').value}, ${document.querySelector('#greenamount').value}, ${document.querySelector('#blueamount').value})`
}
var rgbpickers = [...document.querySelectorAll('.amountpickers')]
for(var i in rgbpickers) {
	var el = rgbpickers[i]
	el.addEventListener('mousemove', rgbchange)
}

function hslchange() {
	document.querySelector('#hslpreview').style.background = `hsl(${document.querySelector('#anglepicker').value}, ${document.querySelector('#saturation').value}%, ${document.querySelector('#lightness').value}%)`
	var sathsls = []
	for(var i = 0; i < 110; i += 10) {
		sathsls.push(`hsl(${document.querySelector('#anglepicker').value}, ${i}%, ${document.querySelector('#lightness').value}%)`)
	}
	var grad = '-webkit-linear-gradient(left, ' + sathsls.join() + ')'
	document.querySelector('#saturationstyle').innerHTML = `#hsldiv > #saturation::-webkit-slider-runnable-track {
background: ${grad};
}`
	var lghhsls = []
	for(var i = 0; i < 110; i += 20) {
		lghhsls.push(`hsl(${document.querySelector('#anglepicker').value}, ${document.querySelector('#saturation').value}%, ${i}%)`)
	}
	var grad = '-webkit-linear-gradient(left, ' + lghhsls.join() + ')'
	document.querySelector('#lightnessstyle').innerHTML = `#hsldiv > #lightness::-webkit-slider-runnable-track {
background: ${grad};
}`
}
var hslpickers = [...document.querySelectorAll('.picker')]
for(var i in hslpickers) {
	var el = hslpickers[i]
	el.addEventListener('mousemove', hslchange)
	el.addEventListener('change', hslchange)
}
hslchange()