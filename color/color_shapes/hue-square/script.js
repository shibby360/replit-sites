var bds = {
	h:360,
	ws:100,
	bl:100
}
function setvars(ev) {
	var arr = ['grad', 'y', 'stag']
	arr.forEach(function(item) {
		var select = document.getElementById(item)
		window[item] = select.value
	})
	window['stagv'] = Number(document.getElementById('stagv').value)
	window['h'] = null
	window['h2'] = null
	window['ws'] = null
	window['ws2'] = null
	window['bl'] = null
	window['bl2'] = null
	document.getElementById('stagv').setAttribute('max', bds[stag])
	window['mode'] = document.getElementById('mode').value
	draw()
}
setvars()
Array.from(document.getElementsByTagName('select')).forEach(function(selel) {
	selel.addEventListener('change', setvars)
})
document.getElementById('stagv').addEventListener('input', setvars)
function draw() {
	document.getElementById('grid').innerHTML = ''
	for (let i = 0; i < bds[y]+1; i++) {
		var el = document.createElement('div')
		el.style.position = 'absolute'
		el.style.top = (2 + (i * 2)) + 'px'
		el.style.width = (bds[grad] * 2) + 'px'
		el.style.height = '2px'
		window[grad] = 0
		window[grad+'2'] = bds[grad]
		window[y] = i
		window[y+'2'] = i
		window[stag] = stagv
		window[stag+'2'] = stagv
		if(grad == 'guggenschleiper') {
			var cols = []
			for(var j = 0; j <= 360; j+=15) {
				color = `${mode}(${j} ${ws}% ${bl}%)`
				cols.push(color)
			}
			el.style.background = `linear-gradient(to right, ${cols+[]})`
		} else {
			console.log(h)
			el.style.background = `linear-gradient(in hsl longer hue to right, ${mode}(${h} ${ws}% ${bl}%), ${mode}(${h2} ${ws2}% ${bl2}%))`
		}
		document.getElementById('grid').appendChild(el)
	}
}
draw()