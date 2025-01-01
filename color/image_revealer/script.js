var imgs = ['ignous.png', 'mask.png', 'sunset@night.png', 'brianexplode.png']
document.body.style.backgroundImage = "url('" + imgs[Math.floor(Math.random() * imgs.length)] + "')"
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
var sqs = 10
var board = document.getElementById('board')
function rcval() {
	return Math.floor(Math.random() * 255)
}
function two550() {
	return [0, 255][Math.floor(Math.random() * 2)]
}
for(var i = 0; i < window.innerHeight; i += sqs) {
	for(var j = 0; j < window.innerWidth; j += sqs) {
		createSVGElement(document.body, 'div', {}, {position:'absolute', left:j+'px', top:i+'px', background:'black', width:sqs+'px', height:sqs+'px'})
	}
}
setInterval(function() {
	for(var i = 0; i < 100; i++) {
		if(document.body.childElementCount) {
			var nm = Math.floor(Math.random() * document.body.childElementCount)
			document.body.children[nm].remove()
		}
	}
}, 500)