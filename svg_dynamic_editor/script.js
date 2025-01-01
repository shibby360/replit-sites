/**
 * Tasklist:
 * sorting
 */
class valueBox extends HTMLElement {
	constructor() {
		super()
	}
	connectedCallback() {
		var shadow = this.attachShadow( { mode: 'open' })
		var style = $(`<style>#valcontainer {
	width: 100%;
	display: flex;
	font-family: sans-serif;
	}</style>`)
		var content = $('<div id="valcontainer">')
		content.html(`
${this.getAttribute('for') == 'object' ? `<label style="margin-right: 5px; margin-left: 3px;" contenteditable="true" id="attrname">${this.getAttribute('aname')}</label>` : ''}
<input id="val" style="width: 60%;" type="number">
<select id="vtype" style="width: 30%;">
	<option value="number">Number</option>
	<option value="calc">Expression</option>
	<option value="text">Text</option>
</select>
${this.getAttribute('for') == 'object' || (this.getAttribute('for') == 'cond' && this.hasAttribute('only') && !(this.getAttribute('del') == 'no')) ? `<button id="del">🗑️</button>` : ''}
`)
		this.type = 'number'
		if(this.hasAttribute('only')) {
			this.type = this.getAttribute('only')
			if(this.type == 'text' || this.type == 'variable' || this.type == 'calc') {
				content.find('#val').attr('type', 'text')
			} else if(this.type == 'number') {
				content.find('#val').attr('type', 'number')
			}
			content.find('#val').css('width', '90%')
			content.find('#vtype').remove()
		}
		shadow.appendChild(style[0])
		shadow.appendChild(content[0])
		this.topel = getDocumentFragment(this).host
		var self = this
		content.find('#vtype').change((ev) => {
			this.type = ev.target.value
			if(this.type == 'text' || this.type == 'calc') {
				content.find('#val').attr('type', 'text')
			} else if(this.type == 'number') {
				content.find('#val').attr('type', 'number')
			}
			this.updateVal()
			if(this.getAttribute('for') == 'variable') {
				var confdiv = $(this.topel.shadowRoot.querySelector('#config'))
				if(this.type == 'number') {
					confdiv.show()
				} else {
					confdiv.hide()
				}
			}
		})
		content.find('#val, #attrname').on('input', (ev) => {
			this.updateVal()
		})
		content.find('#del').click((ev) => {
			if(this.getAttribute('for') == 'object') {
				delete this.topel.attrslist[this.getAttribute('aname')]
				self.remove()
				this.topel.draw()
			} else if(this.getAttribute('for') == 'cond') {
				this.parentElement.remove()
				for(var i of this.topel.used) {
					i.updateVal()
				}
			}
		})
	}
	get value() {
		var oval = this.shadowRoot.querySelector('input').value
		if(this.type == 'number') {
			return Number(oval)
		} else if(this.type == 'text') {
			var nval = oval
			for(var i in variables) {
				nval = nval.replaceAll('${'+i+'}', ref(i))
			}
			return nval
		} else if(this.type == 'calc') {
			if(oval == '') { return }
			var varvals = {}
			for(var i in variables) {
				varvals[i] = ref(i)
			}
			return parser.parse(funcDefs()+oval).evaluate(varvals)
		}
	}
	updateVal() {
		this.shadowRoot.querySelector('input')
		.style.backgroundColor = ''
		this.shadowRoot.querySelector('input')
		.style.border = ''
		try {
			this.value
		} catch(err) {
			this.shadowRoot.querySelector('input')
			.style.backgroundColor = 'rgb(255,0,0,0.6)'
			this.shadowRoot.querySelector('input')
			.style.border = '3px red solid'
		}
		if(this.getAttribute('for') == 'object') {
			delete this.topel.attrslist[this.getAttribute('aname')]
			this.topel.attrslist[this.shadowRoot.querySelector('#attrname').innerText] = this.value
			this.topel.draw()
			this.setAttribute('aname', this.shadowRoot.querySelector('#attrname').innerText)
		} else if(this.getAttribute('for') == 'objstyle') {
			this.topel.stylelist[this.getAttribute('name')] = this.value
			this.topel.shadowRoot.querySelector('#circle svg circle').style[this.getAttribute('name')] = this.value
			this.topel.draw()
		} else if(this.getAttribute('for') == 'variable' || this.getAttribute('for') == 'cond') {
			if(this.getAttribute('for') == 'variable') {
				this.topel.value = this.value
			} else if(this.getAttribute('for') == 'cond') {
				this.topel.setVal()
			}
			for(var i = 0; i < this.topel.used.length; i++) {
				this.topel.used[i].updateVal()
			}
		}
		if(this.getAttribute('for') == 'varconf') {
			this.topel.shadowRoot.querySelector('value-box[for="variable"]').shadowRoot.querySelector('input').setAttribute(this.getAttribute('name'), this.value)
		}
		var oval = this.shadowRoot.querySelector('input').value
		if(this.type == 'calc') {
			if(oval == '') { return }
			for(var i of parser.parse(funcDefs()+oval).variables()) {
				if(i in variables) {
					variables[i].addUse(this)
				}
				if(getFunc(i)) {
					getFunc(i).addUse(this)
				}
			}
		} else if(this.type == 'text') {
			if(!oval.match(/(?<=\${).*?(?=})/g)) { return }
			var mtchs = [...oval.match(/(?<=\${).*?(?=})/g)]
			for(var i of mtchs) {
				if(i in variables) {
					variables[i].addUse(this)
				}
			}
		}
	}
}
customElements.define('value-box', valueBox)
class ObjectEl extends HTMLElement {
	constructor() {
		super()
	}
	connectedCallback() {
		var shadow = this.attachShadow({mode:'open'})
		this.setAttribute('id', 'ln'+objid)
		objid += 1
		var style = $(`<style>#container {
	${linestyles} display: flex;}
#type {
width: 60%;
display: inline-block;
}
#content {
width: 80%;
height: 100%;
margin-left: 5px;
}
#color {
width: 20%;
height: 100%;
border-right: 3px grey solid;
position: relative;
}
#circle {
width: 80%;
aspect-ratio: 1 / 1;
position: absolute;
left: 5%;
cursor: pointer;
}
#opts {
width: 200%;
position: absolute;
left: calc(100% + 5px);
border: 3px black solid;
display: none;
background: white;
}
#opts value-box {
width: 90%;
}</style>`)
		var content = $('<div id="container">')
		content.html(`
<div id="color">
<div id='circle'>
<svg viewBox="0 0 100 100" preserveAspectRatio="none" width='100%' height='100%'>
<circle cx="50" cy="50" r="25" fill="black" />
</svg>
</div>
<div id='opts'>
<div id="fillinfo" style="height: 50%;">
	<label for="fillshow">Fill</label>
	<input name="fillshow" type="checkbox" checked id="fillshow">
	<br>
	<label for="fill">Color</label>
	<value-box name="fill" id="fill" for="objstyle" only='text'></value-box>
	<label for="fill-opacity">Opacity</label>
	<value-box name="fill-opacity" id="fill-opacity" for="objstyle" only='text'></value-box>
</div>
<div style="border-bottom: 3px solid #333;width: 90%;position: relative;left: 5%;"></div>
<div id="strokeinfo" style="height: 50%;">
	<label for="strokeshow">Stroke</label>
	<input name="strokeshow" type="checkbox" id="strokeshow">
	<br>
	<label for="stroke">Color</label>
	<value-box name="stroke" id="stroke" for='objstyle' only='text'></value-box>
	<label for="stroke-opacity">Opacity</label>
	<value-box name="stroke-opacity" id="stroke-opacity" for="objstyle" only='text'></value-box>
	<label for="stroke-width">Width</label>
	<value-box name="stroke-width" id="stroke-width" for='objstyle' only='text'></value-box>
</div>
</div>
</div>
<div id="content">
${lineX}
<p id='objectid' style="margin-bottom: 0; margin-top: 0; font-size: 75%">ID: ${'obj' + this.getAttribute('id')}</p>
<p id="type" contenteditable style='margin-top: 0;'>rect</p>
<input type='checkbox' name="isDef" id="isDef">
<label for="isDef" id='isDeflbl'>is def</label>
<button id='addattr'>Add attribute</button>
</div>
`)
		this.attrslist = {}
		this.stylelist = {}
		this.isDef = false
		content.find('#isDef').change((ev) => {
			this.isDef = ev.target.checked
			this.draw()
		})
		content.find('#addattr').click((ev) => {
			var attrn = prompt('Attribute name')
			var sel = $('<value-box aname="' + attrn + '" for="object">')
			sel.insertBefore(ev.target)
		})
		content.find('#type').on('input', (ev) => {
			this.draw()
		})
		this.optsshow = 0
		content.find('#circle').click((ev) => {
			if(this.optsshow) {
				content.find('#opts').hide()
				this.optsshow = 0
			} else {
				content.find('#opts').show()
				this.optsshow = 1
			}
		})
		content.find('#opts input').on('input', (ev) => {
			if(!content.find('#opts #fillshow')[0].checked) {
				this.svgel.style.fill = 'none'
				this.stylelist.fill = 'none'
				content.find('#circle svg circle')[0].style.fill = 'none'
			}
			if(!content.find('#opts #strokeshow')[0].checked) {
				this.svgel.style.stroke = 'none'
				this.stylelist.stroke = 'none'
				content.find('#circle svg circle')[0].style.stroke = 'none'
			}
		})
		this.svgel = document.createElementNS("http://www.w3.org/2000/svg", content.find('#type').text().toLowerCase());
		this.svgel.setAttribute('id', 'obj'+this.getAttribute('id'))
		svgout[0].appendChild(this.svgel)
		applyLineX(content, 'obj', this, 's')
		shadow.appendChild(style[0])
		shadow.appendChild(content[0])
		content.find('#circle').css('top', ((content.find('#color')[0].offsetHeight - content.find('#circle')[0].offsetHeight) / 2) + 'px')
	}
	draw() {
		var newel = document.createElementNS("http://www.w3.org/2000/svg", this.shadowRoot.querySelector('#type').innerText.toLowerCase());
		for (var i in this.attrslist) {
			var attr = this.attrslist[i];
			newel.setAttribute(i, attr);
		}
		for(var i in this.stylelist) {
			var stle = this.stylelist[i];
			newel.style[i] = stle
		}
		newel.setAttribute('id', 'obj'+this.getAttribute('id'))
		this.svgel.remove()
		if(this.isDef) {
			svgout[0].querySelector('defs').appendChild(newel)
		} else {
			svgout[0].appendChild(newel)
		}
		this.svgel = newel
	}
}
customElements.define('obj-', ObjectEl)
class variableEl extends HTMLElement {
	constructor() {
		super();
	}
	connectedCallback() {
		var name = prompt('Variable name?: ')
		this.setAttribute('name', name)
		var shadow = this.attachShadow({ mode: 'open' });
		var style = $(`<style>#container {
		${linestyles}
}
#config * {
margin: 0;
}
</style>`);
		var content = $('<div id="container">');
		content.html(`
${lineX}
<p>${this.getAttribute('name')}</p>
<value-box for="variable"></value-box>
<br>
<div id='config'>
<p>Min: </p>
<value-box for="varconf" only="calc" name='min'></value-box>
<p>Max: </p>
<value-box for="varconf" only="calc" name='max'></value-box>
<p>Step: </p>
<value-box for="varconf" only="calc" name='step'></value-box>
</div>
`);
		applyLineX(content, 'var', this, 's')
		shadow.appendChild(style[0]);
		shadow.appendChild(content[0]);
		this.value = null
		variables[this.getAttribute('name')] = this
		this.used = []
	}
	addUse(x) {
		if(!this.used.includes(x)) {
			this.used.push(x)
		}
	}
}
customElements.define('var-line', variableEl)
class condLine extends HTMLElement {
	constructor() {
		super()
	}
	connectedCallback() {
		this.branchcode = function(e) {
			return `<div class='branch'><p>${e}if</p><value-box class='cond' for='cond' only='calc'></value-box><p>{</p><br>
<value-box class='val' for='cond'></value-box>
<p>}</p><br></div>`
		}
		var name = prompt('Conditional name?: ')
		this.setAttribute('name', name)
		var shadow = this.attachShadow({mode:'open'})
		var styles = $(`<style>#container {${linestyles}}
p {
display: inline;
margin-left: 10px;
margin-right: 10px;
}
.branch {
display: flex;
}</style>`)
		var content = $(`<div id="container">
${lineX}
<h3>${this.getAttribute('name')}</h3>
${this.branchcode('')}
<div id='elsebranch' class='branch'><p>else</p><p>{</p><br>
<value-box id='elseval' for='cond'></value-box>
<p>}</p><br></div>
<button id='addbranch'>Add branch</button>
</div>`)
		content.find('value-box.cond').attr('del', 'no')
		applyLineX(content, 'cond', this, 's')
		shadow.appendChild(styles[0])
		shadow.appendChild(content[0])
		variables[this.getAttribute('name')] = this
		this.used = []
		this.value = null
		content.find('.cond').on('input', (ev) => {
			this.setVal()
		})
		content.find('#addbranch').click((ev) => {
			$(this.branchcode('else ')).insertBefore(content.find('#elsebranch'))
			content.find('.cond').on('input', (ev) => {
				this.setVal()
			})
			this.setVal()
		})
	}
	addUse(x) {
		if(!this.used.includes(x)) {
			this.used.push(x)
		}
	}
	setVal() {
		var conds = this.shadowRoot.querySelectorAll('.branch')
		for(var i = 0; i < conds.length; i++) {
			var condi = conds[i].querySelector('.cond').value
			var vali = conds[i].querySelector('.val').value
			if(condi) {
				this.value = vali
				return
			}
		}
		this.value = this.shadowRoot.querySelector('#elseval').value
	}
}
customElements.define('cond-line', condLine)
class funcLine extends HTMLElement {
	constructor() {
		super()
	}
	connectedCallback() {
		var shadow = this.attachShadow({mode:'open'})
		var styles = $(`<style>#container {${linestyles}}</style>`)
		var content = $(`<div id="container">
${lineX}
<input placeholder="f(x) = x" id='funcdef'>
</div>`)
		this.funcid = funcid
		this.used = []
		this.def = ''
		funcid += 1
		applyLineX(content, 'func', this, 's')
		functions[this.funcid] = this
		content.find('input').on('input', ev => {
			this.def = ev.target.value
			for(var i of this.used) {
				i.updateVal()
			}
			var oval = ev.target.value.match(/(?<== ).*/)
			for(var i of parser.parse(funcDefs()+oval).variables()) {
				if(i in variables) {
					variables[i].addUse(this)
				}
				if(getFunc(i)) {
					getFunc(i).addUse(this)
				}
			}
		})
		shadow.appendChild(styles[0])
		shadow.appendChild(content[0])
	}
	addUse(x) {
		if(!this.used.includes(x)) {
			this.used.push(x)
		}
	}
	updateVal() {
		this.def = ev.target.value
		for(var i of this.used) {
			i.updateVal()
		}
	}
}
customElements.define('func-line', funcLine)