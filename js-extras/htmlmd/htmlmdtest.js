hljs.highlightAll()
document.getElementById('docornot').onchange = function() {
	if(this.checked) {
		document.getElementById('doctitle').style.display = 'block'
	} else {
		document.getElementById('doctitle').style.display = 'none'
	}
}
function htmlmd() {
	document.getElementById('mdout').innerText = htmltomd(document.getElementById('htmlin').value)
}
function mdhtml() {
	document.getElementById('htmlout').innerText = mdtohtml(document.getElementById('mdin').value, document.getElementById('docornot').checked, document.getElementById('doctitle').value)
	document.getElementById('htmlpreview').innerHTML = mdtohtml(document.getElementById('mdin').value)
}