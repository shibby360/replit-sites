function stringer(str) {
	var newstr = str.replaceAll(/(?:[^\\]|)\\\$\{.*\}/g, function(str) {
		if(str.at(0) != '\\') {
			var varnm = str.substring(4, str.length-1)
		} else {
			var varnm = str.substring(3, str.length-1)
		}
		return str.at(0) == '\\'?'':str.at(0) + window[varnm]
	})
	return newstr
}
class var_ extends HTMLElement {
	constructor() {
		super()
	}
	connectedCallback() {
		setTimeout(() => {
			this.hidden = true
			var childs = [...this.children]
			for(var i in childs) {
				var child = childs[i]
				if(child.tagName == 'M-') {
					this.innerHTML = this.innerHTML.replace(child.outerHTML, child.evaluate)
				}
			}
			window[this.getAttribute('name')] = this.innerText
		})
	}
}
class print extends HTMLElement {
	constructor() {
		super()
	}
	connectedCallback() {
		setTimeout(() => {
			this.innerText = stringer(this.innerText)
		})
	}
}
class mathy extends HTMLElement {
	constructor() {
		super()
	}
	get evaluate() {
		return math.evaluate(this.innerText)
	}
}
class input extends HTMLElement {
	constructor() {
		super()
		// var shadow = this.attachShadow({mode:'closed'})
		// var inp = document.createElement('input')
		// shadow.appendChild(inp)
		window[this.getAttribute('name')] = prompt(this.getAttribute('prompt'))
	}
}
class btn extends HTMLButtonElement {
	constructor() {
		super()
		// var shadow = this.attachShadow({mode:'closed'})
		// var inp = document.createElement('input')
		// shadow.appendChild(inp)
	}
}

class func extends HTMLElement {
	constructor() {
		super()
		
	}
}
customElements.define('var-', var_)
customElements.define('print-', print)
customElements.define('m-', mathy)
customElements.define('input-', input)
// customElements.define('btn-', btn)
customElements.define('func-', func)