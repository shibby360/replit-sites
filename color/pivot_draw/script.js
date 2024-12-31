function createSVGElement(svg, element, properties, style) {
	var attrs = ""
	for(var i in properties) {
		attrs += i + '="' + properties[i] + '" '
	}
	var styles = ""
	for(var i in style) {
		styles += i+":"+style[i]+";"
	}
	svg.insertAdjacentHTML("beforeEnd", "<"+element+" "+attrs+"style='"+styles+"'></"+element+">")
	return svg.lastChild
}
function rcval() {
	return Math.floor(Math.random() * 255)
}
function two550() {
	return [0, 255][Math.floor(Math.random() * 2)]
}
function rslval() {
	return Math.floor(Math.random() * 100)
}
function rhval() {
	return Math.floor(Math.random() * 360)
}
function rslmax() {
	return [0, 100][Math.floor(Math.random() * 2)]
}
function pickrand(lst) {
	return lst[Math.floor(Math.random() * lst.length)]
}
var point = [Math.floor(Math.random() * innerWidth), Math.floor(Math.random() * innerHeight)]
var goer = function() {
	var point2 = [Math.floor(Math.random() * innerWidth), Math.floor(Math.random() * innerHeight)]
	var col = `rgb(${0}, ${point2[1]/4}, ${point2[0]/4})`
	var rcol = `rgb(${[rcval(), rcval(), rcval()]})`
	createSVGElement(document.querySelector('#board'), 'line', {x1:point2[0], y1:point2[1], x2:point[0], y2:point[1]}, {stroke:col})
}
var inter = setInterval(goer)
addEventListener('click', () => clearInterval(inter))
addEventListener('keypress', (ev) => {
	if(ev.key === 'c') {
		document.querySelector('#board').innerHTML = ''
	}
})