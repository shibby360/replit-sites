var mode = ''
if(confirm('Scramble or no scramble?:')) {
	mode = 'scramble'
}
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
function randomIntFromInterval() {
	return Math.floor(Math.random() * (einc - sinc + 1) + sinc)
}
function negorpos() {
	return [-1, 1][Math.floor(Math.random() * 2)]
}
var board = document.getElementById('game')
var einc = 100
var sinc = 50
var xinc = randomIntFromInterval()
var yinc = randomIntFromInterval()
var x = 1
var y = 1
function rcval() {
	return Math.floor(Math.random() * 255)
}
function two550() {
	return [0, 255][Math.floor(Math.random() * 2)]
}
var inter = setInterval(function() {
	x += xinc
	y += yinc
	var rcol = `rgb(${[rcval(), rcval(), rcval()]})`
	var poscol = `rgb(${two550()}, ${rcval()}, ${x+y})`
	var rainbow = `hsl(${x/5}, 100%, 50%)`
	createSVGElement(board, 'line', {x1:x, y1:y, x2:x-xinc, y2:y-yinc, "stroke-width":5}, {stroke:rcol})
	if(mode === 'scramble') {
		xinc = randomIntFromInterval() * negorpos()
		yinc = randomIntFromInterval() * negorpos()
	}
	if(x >= window.innerWidth) {
		xinc = -randomIntFromInterval()
		yinc = randomIntFromInterval() * negorpos()
	} else if(y >= window.innerHeight) {
		yinc = -randomIntFromInterval()
		xinc = randomIntFromInterval() * negorpos()
	}
	if(x < 0) {
		xinc = randomIntFromInterval()
		yinc = randomIntFromInterval() * negorpos()
	} else if(y < 0) {
		yinc = randomIntFromInterval()
		xinc = randomIntFromInterval() * negorpos()
	}
})
addEventListener('click', () => {
	clearInterval(inter)
	// createSVGElement(board, 'circle', {cx:x, cy:y, r:20}, {fill:`rgb(${[Math.random() * 255, Math.random() * 255, Math.random() * 255]})`})
	console.log(x, y)
})