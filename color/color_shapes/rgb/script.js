function setvars(ev) {
	var arr = ['grad', 'y', 'stag']
	arr.forEach(function(item) {
		var select = document.getElementById(item)
		window[item] = select.value
	})
	window['stagv'] = Number(document.getElementById('stagv').value)
	window['r'] = null
	window['r2'] = null
	window['g'] = null
	window['g2'] = null
	window['b'] = null
	window['b2'] = null
	draw()
}
setvars()
Array.from(document.getElementsByTagName('select')).forEach(function(selel) {
	selel.addEventListener('change', setvars)
})
document.getElementById('stagv').addEventListener('input', setvars)
function draw() {
	document.getElementById('grid').innerHTML = ''
	for (let i = 0; i < 256; i++) {
		var el = document.createElement('div')
		el.style.position = 'absolute'
		el.style.top = (2 + (i * 2)) + 'px'
		el.style.width = (255 * 2) + 'px'
		el.style.height = '2px'
		window[grad] = 0
		window[grad+'2'] = 255
		window[y] = i
		window[y+'2'] = i
		window[stag] = stagv
		window[stag+'2'] = stagv
		el.style.background = `linear-gradient(to right, rgb(${r}, ${g}, ${b}), rgb(${r2}, ${g2}, ${b2}))`
		document.getElementById('grid').appendChild(el)
	}
}
draw()