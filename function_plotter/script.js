var board = document.getElementById('board')
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
function Function(func) {
	this.func = func
	this.plot = function(xvalues) {
		var line = createSVGElement(board, 'polyline', null, {stroke:'black', fill:'none'})
		var points = ''
		for(var i in xvalues) {
			var y = func(xvalues[i]-200)+200
			var x = xvalues[i]
			points += ' ' + x + ',' + y
		}
		line.setAttribute('points', points)
	}
	this.plotrange = function(from, to) {
		var xs = []
		for(var i = from; i <= to; i++) {
			xs.push(i)
		}
		this.plot(xs)
	}
}
var f = new Function(function(x) {
	return x**2
})
f.plotrange(0, 1000)