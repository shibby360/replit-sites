// const observer = new MutationObserver(function(ag1, ag2) {
//   console.log(ag1)
// })
// observer.observe(document.body, {childList:true})

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
var board = document.querySelector('#board')
var x = 0
var y = 0
var sw = 5
var xgo = 5
function t0One(nm) {
	if(nm > 0) {
		return 1
	} else if(nm < 0) {
		return -1
	} else {
		return 0
	}
}
function rcval() {
	return Math.floor(Math.random() * 255)
}
function two550() {
	return [0, 255][Math.floor(Math.random() * 2)]
}
function cwcols() {
	var w = Math.floor(Math.random() * 3)
	var w2 = Math.floor(Math.random() * 3)
	var w3 = Math.floor(Math.random() * 3)
	var ls = [0, 0, 0]
	ls[w] = 255
	ls[w2] = 255
	ls[w3] = 255
	var lcol = `rgb(${ls})`
	return lcol
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
function percent(x_or_y, of, times) {
	return (x_or_y / of) * times
}
var inter
var v1 = 0
var v2 = 0
var v3 = 0
var func = function() {
	var rcol = `rgb(${[rcval(), rcval(), rcval()]})`
	var somehsl = `hsl(${rhval()}, ${(y/innerHeight)*100}%, ${(x/innerWidth)*100}%)`
	var rhsl = `hsl(${rhval()}, ${rslval()}%, ${rslval()}%)`
	var rainbow = `hsl(${x/5}, 100%, 50%)`
	var girlycolors = [`rgb(${two550()}, 182, 193)`, `rgb(191, ${rcval()}, 191)`][Math.floor(Math.random() * 2)]
	var pinked = `hsl(${pickrand([350, 282])}, ${pickrand([100, 80])}%, ${pickrand([63, 88])}%)`
	var incr = `rgb(${v1}, ${v2}, ${v3})`
	var v = ['v1', 'v2', 'v3']
	window[v[Math.floor(Math.random() * v.length)]] += pickrand([0, 1])
	// var poscol = `hwb(${(x+y)/15} ${x/15}% ${y/15}%)` 
 //Firefox
	var poscol = `rgb(
	${80}, 
	${percent(y, innerHeight, 255)}, 
	${percent(x, innerWidth, 255)})`
	createSVGElement(board, 'rect', {x:x, y:y}, {"width":Math.abs(xgo), "height":sw, fill:poscol})
	x += xgo;
	if(x >= window.innerWidth || x < 0) {
		xgo = -xgo;
		y += sw;
	}
	if(y >= window.innerHeight) {
		clearInterval(inter)
		return
	}
	return true
}
if(localStorage.getItem('watch') === 'true') {
	var inter = setInterval(func, 1)
} else {
	while(func()) {
	}
}