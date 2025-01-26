hljs.highlightAll()
easyCss()
addCssByQuery('body', {'font-family':'sans-serif'})
addCssByQuery('div > span', {'border-color':'white', 'border-style':'solid'})
document.body.style.backgroundColor = 'rgb(255, 255, 255)'
invertTextColors()
var div = document.getElementById('gridsample')
grid(div, [
	{
		el:div.children[0],
		row:0,
		column:0,
		rowspan:2
	},
	{
		el:div.children[1],
		row:0,
		column:1
	},
	{
		el:div.children[2],
		row:1,
		column:1
	}
], {
	cellSize:new CssSize(100)
})
var div = document.getElementById('flexsample')
flex(div, [
	{
		el:div.children[0],
		order:2,
		grow:5
	},
	{
		el:div.children[1],
		order:3,
		grow:1,
		length:new CssSize(50)
	},
	{
		el:div.children[2],
		order:1,
		grow:3
	}
], {
	direction:'column'
})