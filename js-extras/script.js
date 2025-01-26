var pres = document.getElementsByTagName('pre')
for(var i in [...pres]) {
	pres[i].children[0].appendChild(document.createElement('<button onclick="copycode(this)">Copy code</button>'))
}
function copycode(element) {
	element = element.parentElement.parentElement
	var text = '';
	for (var i = 0; i < element.childNodes.length; ++i)
		if (element.childNodes[i].nodeType === Node.TEXT_NODE)
			text += element.childNodes[i].textContent;
	navigator.clipboard.writeText(text)
}
