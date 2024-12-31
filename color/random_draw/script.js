var board = document.querySelector('#board')
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
var x = 0
var y = 0
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
var inter = setInterval(function() {
	var rcol = `rgb(${[rcval(), rcval(), rcval()]})`
	var rhsl = `hsl(${rhval()}, ${rslval()}%, ${rslval()}%)`
	var rainbow = `hsl(${x/5}, 100%, 50%)`
	var girlycolors = [`rgb(${two550()}, 182, 193)`, `rgb(191, ${rcval()}, 191)`][Math.floor(Math.random() * 2)]
	var pinked = `hsl(${pickrand([350, 282])}, ${pickrand([100, 80])}%, ${pickrand([63, 88])}%)`
	var newx = Math.floor(Math.random() * innerWidth)
	var newy = Math.floor(Math.random() * innerHeight)
	var poscol = `rgb(${two550()}, ${rcval()}, ${x+y})`
	createSVGElement(board, 'line', {x1:x, y1:y, x2:newx, y2:newy}, {stroke:poscol, 'stroke-width':Math.floor(Math.random() * 10)})
	x = newx
	y = newy
})
document.addEventListener('click', () => { clearInterval(inter) })