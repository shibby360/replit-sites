/** Tasklist:
 * (maybe) turn function into:
 * <function name contenteditable paragraph>
 * <paragraph: "(">
 * <function parameters input>
 * <paragraph: ") = ">
 * <function body input>
 *
 * use <g> for lists - (actually maybe " @ {repeat number} {repeat variable}")
*/
/** IMPORTANT NOTES:
 * ANY TEXT CAN START WITH "EXPR " TO BE AN EXPRESSION
 * IN AN EXPRESSION, USE QUOTES FOR TEXT
 * 
 * c1 ? v1 : (c2 ? v2 : v3)
 * ^ chained if ^
 * if c1 is true, it goes to v1
 * ELSE if c2 is true, it goes to v2
 * ELSE nothing is true, it goes to v3
 * to extend, keep nesting ternaries
 */
$('add-line')[0].hideButton('cond-line')
var br = document.createElement('br')
var btn = document.createElement('button')
var sortOn = false
btn.innerText = 'Sort'
btn.addEventListener('click', function(ev) {
	var lines = Array.from($('#objects > :not(add-line)'))
	for(var i of lines) {
		if(sortOn) {
			side.sortArrow.hide(i)
		} else {
			side.sortArrow.show(i)
		}
	}
	sortOn = sortOn ? false : true
})
document.querySelector('add-line').shadowRoot.querySelector('#container > #add').append(br, btn)
var side = {
	box:function () {
		return `<div id='sidebox' style='width: 15%; height: 97%; border-right: black 3px solid; position: relative;'>`
	},
	baseKit:function() {
		return this.error.box() + this.sortArrow.box()
	},
	baseStyleKit:function() {
		return this.error.style() + this.sortArrow.style()
	},
	error:{
		box:function () {
				return `<div id='errorbox' style='width: 100%; height: 100%;  position: relative;'>
			<svg width='100%' height='100%' id='errorsvg' viewBox='0 0 100 100'>
			<g id='errortriangle'>
			<path d='m5,70 l40,-60 l45,60 z' stroke='black' fill='red' />
			<path d='m45,20 v30' stroke='white' stroke-width="5px" />
			<circle cx='46' cy='60' r='5' fill='white' />
			</g>
			</svg>
			<div id='errorinfo' style='position: absolute; top:85px; left: 5px; border: 2px red solid; padding:0; background:rgb(200,200,200);' >
			<p id='errortext'></p>
			</div>
			</div>`
		},
		style:function () {
				return `
			#errorbox {
			display: none;
			}
			#errorsvg:hover + #errorinfo {
			display: block;
			}
			#errorinfo {
			display: none;
			min-width: 400%;
			max-width: 600%;
			}
			#errortext {
			margin: 0;
			padding: 4px;
			font-size: 0.75em;
			}
			`
		},
		hide:function (cnt) {
			cnt.shadowRoot.
			querySelector('#errorbox').style.display = 'none'
		},
		show:function (cnt, msg) {
			cnt.shadowRoot.
			querySelector('#errorbox').style.display = 'block'
			cnt.shadowRoot.
			querySelector('#errortext').innerText = 'Error: '+msg
		}
	},
	sortArrow:{
		box:function () {
			return `<div id='sortarrowbox' style='width: 100%; height: 100%; position: relative'>
				<svg width='100%' height='100%' id='sortarrowsvg' viewBox='0 0 100 100'>
					<defs>
		<marker id="arrowhead" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
			<path d="M 0 0 L 10 5 L 0 10 z" fill='white'/>
		</marker>
	</defs>
	<g id='uparrow'>
	<circle cx='50' cy='-40' r='40' fill='blue'/>
	<line x1="50" y1="-10" x2="50" y2="-60" stroke="white" stroke-width='3' marker-end="url(#arrowhead)" />
	</g>
	<g id='downarrow'>
	<circle cx='50' cy='140' r='40' fill='blue' />
	<line x1="50" y1="110" x2="50" y2="160" stroke="white" stroke-width='3' marker-end="url(#arrowhead)" />
	</g>
				</svg>
				</div>`
		},
		style:function () {
				return `
		#sortarrowbox {
		display: none;
		}
				`
		},
		hide:function (cnt) {
			cnt.shadowRoot.
			querySelector('#sortarrowbox').style.display = 'none'
		},
		show:function (cnt) {
			cnt.shadowRoot.
			querySelector('#sortarrowbox').style.display = 'block'
		},
		applySortArrows:function (cnt) {
			var svg = cnt.shadowRoot.querySelector('#sortarrowsvg')
			svg.querySelector('#uparrow')
			.addEventListener('click', function(ev) {
				$(cnt).prev()[0].before(cnt)
			})
			svg.querySelector('#downarrow')
			.addEventListener('click', function(ev) {
				$(cnt).next()[0].after(cnt)
			})
		}
	}
}
function evalu(v) {
	if(typeof v == 'string') {
		if(v.startsWith('expr ')) {
			return parser.parse(v.replace('expr ', funcDefs())).evaluate(variables)
		} else {
			var nv = v
			for(var i in variables) {
				nv = nv.replaceAll('$'+i, variables[i])
			}
			return nv
		}
	} else {
		return v
	}
}
function addtoUses(el, v) {
	if(typeof v == 'string' && v.startsWith('expr ')) {
		for(var i of parser.parse(v.replace('expr ','')).variables()) {
			if(i in vobjs) {
				vobjs[i].addUse(el)
			}
		}
	}
	if(typeof v == 'string') {
		for(var i in vobjs) {
			if(!!(v.indexOf('$'+i)+1)) {
				vobjs[i].addUse(el)
			}
		}
	}
}
var funcs = []
function funcDefs() {
	var end = ''
	for(var i of funcs) {
		end += i.def + ';'
	}
	return end
}
var vobjs = {}
class ObjectEl extends HTMLElement {
	/* Syntax:
	<objecttype> <objectname> {
		<object attribute name>:"<object attribute value>",
		....
	}
	(you need quotes - only on value)
	(for expressions, make it a string and start it with "expr ")
	(dashed properties need quotes)
	(in text, you can use $ to reference variables)
	(special properties: 
	+ text: sets text content
	+ parent: sets parent with id
	)
	Example:
	rect rect1 {
		width: 50px,
		height: 50px,
		color: red
	}
	draws a red rect named rect1 with width 50px and height 50px
	*/
	constructor() {
		super()
	}
	connectedCallback() {
		var shadow = this.attachShadow({mode:'open'})
		this.setAttribute('id', 'ln'+objid)
		objid += 1
		var styles = $(`<style>
${side.baseStyleKit()}
#container {
	${linestyles}
	display: flex;
}
</style>`)
		var content = $(`<div id='container'>
${side.box()}
	${side.baseKit()}
</div>
<div id='content' style='width: 90%; height: 93%; margin-left: 3px;'>
<p style='margin: 0; font-size: 75%;' id='objectid'>ID: ${'obj'+this.getAttribute('id')}</p>
<textarea id='text' style="width: 95%; height:87%; resize: none;" data-gramm="false"
data-gramm_editor="false"
data-enable-grammarly="false" spellcheck="false"></textarea>
</div>
${lineX}
</div>`)
		applyLineX(content, 'obj', this, 't')
		this.data = {}
		var self = this
		this.usedIn = []
		content.find('#text').on('input', function(ev) {
			self.updatedVal()
		})
		shadow.appendChild(styles[0])
		shadow.appendChild(content[0])
		side.sortArrow.applySortArrows(this)
	}
	updatedVal() {
		side.error.hide(this)
		try {
			var self = this
			var content = $(this.shadowRoot.getElementById('container'))
			var txt = content.find('#text').val()
			var obj = txt.split(' ')[0]
			var name = txt.split(' ')[1]
			this.name = name
			var data = JSON5.parse(txt.split(' ').slice(2).join(' '), function(key, value) {
				addtoUses(self, value)
				return evalu(value)
			})
			self.data = data
			var newel = document.createElementNS("http://www.w3.org/2000/svg", obj);
			this.parent = svgout[0]
			for (var i in data) {
				if(i === 'text') {
					newel.textContent = data[i]
				} else if(i === 'parent') {
					// id of parent goes here
					// id is "def" for defs
					this.parent = document.querySelector('#'+data[i])
				} else {
					newel.setAttribute(i, data[i]);
				}
			}
			newel.setAttribute('id', 'obj'+self.getAttribute('id'))
			if(self.svgel) {
				self.svgel.remove()
			}
			this.parent.appendChild(newel)
			self.svgel = newel
			var dataobj = JSON.parse(JSON.stringify(data))
			dataobj.id = self.getAttribute('id')
			dataobj.object = self
			for(var i in JSON.parse(JSON.stringify(variables))) {
				if(typeof variables[i] == 'object' && variables[i].id == self.getAttribute('id')) {
					delete variables[i]
				}
			}
			variables[name] = dataobj
			vobjs[name] = self
			for(var i of self.usedIn) {
				i.updatedVal()
			}
		} catch(err) {
			side.error.show(this, err.message)
		}
	}
	addUse(x) {
		if(!this.usedIn.includes(x)) {
			this.usedIn.push(x)
		}
	}
}
customElements.define('obj-', ObjectEl)
class variableEl extends HTMLElement {
	constructor() {
		super();
	}
	connectedCallback() {
		var name = prompt('Variable name?: ')
		this.name = name
		var shadow = this.attachShadow({ mode: 'open' });
		var style = $(`<style>#container {
		${linestyles}
		display: flex;
}
#config * {
margin: 0;
}
select, #picktypelabel {
margin: 0;
}
select {
margin-bottom: 10px;
}
#varinfo {
padding-left: 2px;
padding-right: 2px;
}
${side.baseStyleKit()}
</style>`);
		var content = $('<div id="container">');
		content.html(`
${side.box()}
	${side.baseKit()}
</div>
<div id='varinfo'>
<p style='margin:0;'><label contenteditable id='varname'>${name}</label> &nbsp;&nbsp;&nbsp;
<label id='picktypelabel'>Type: </label>
<select id='vtype'>
<option value='number'>Number</option>
<option value='text'>Text</option>
</select>
</p>
<input id='variable' type='number' style='margin-bottom: 12px;'>
<br>
<div id='config'>
<label>Min: </label>
<input name='min' class='conf'>
<br>
<label>Max: </label>
<input name='max' class='conf'>
<br>
<label>Step: </label>
<input name='step' class='conf'>
<br>
</div>
</div>
${lineX}
`);
		applyLineX(content, 'var', this, 't')
		var self = this
		content.find('#variable').on('input', function(ev) {
			self.updatedVal()
		})
		content.find('#varname').on('keydown', function(ev) {
			delete variables[ev.target.textContent]
			delete vobjs[ev.target.textContent]
		})
		content.find('#varname').on('input', function(ev) {
			vobjs[ev.target.textContent] = self
			self.name = ev.target.textContent
			self.updatedVal()
		})
		content.find('.conf').on('input', function(ev) {
			side.error.hide(self)
			try {
					content.find('#variable')
					.attr(ev.target.getAttribute('name'), parser.parse(ev.target.value).evaluate(variables))
			} catch(err) {
				side.error.show(self, err.message)
			}
		})
		content.find('#vtype').on('change', function(ev) {
			content.find('#variable').attr('type', ev.target.value)
			if(ev.target.value === 'number') {
				content.find('#config').show()
			} else {
				content.find('#config').hide()
			}
		})
		shadow.appendChild(style[0]);
		shadow.appendChild(content[0]);
		side.sortArrow.applySortArrows(this)
		this.value = 0
		variables[this.name] = this.value
		vobjs[this.name] = this
		this.usedIn = []
	}
	addUse(x) {
		if(!this.usedIn.includes(x)) {
			this.usedIn.push(x)
		}
	}
	updatedVal() {
		side.error.hide(this)
		try {
			this.value = evalu(this.shadowRoot.querySelector('#variable').value)
			variables[this.name] = this.value
			addtoUses(this, this.shadowRoot.querySelector('#variable').value)
			for(var i of this.usedIn) {
				i.updatedVal()
			}
		} catch(err) {
			side.error.show(this, err.message)
		}
	}
}
customElements.define('var-line', variableEl)
class funcLine extends HTMLElement {
	constructor() {
		super()
	}
	connectedCallback() {
		var shadow = this.attachShadow({mode:'open'})
		var style = $(`<style>#container {
		${linestyles}
		display: flex;
}
${side.baseStyleKit()}
</style>`)
		var content = $(`<div id='container'>
${side.box()}
	${side.baseKit()}
</div>
<input placeholder="f(x) = x">
${lineX}
</div>`)
		applyLineX(content, 'func', this, 't')
		var self = this
		content.find('input').on('input', function(ev) {
			self.def = ev.target.value
			side.error.hide(self)
			try {
				evalu(self.def)
			} catch(err) {
				side.error.show(self, err.message)
			}
		})
		funcs.push(this)
		shadow.appendChild(style[0])
		shadow.appendChild(content[0])
		side.sortArrow.applySortArrows(this)
	}
}
customElements.define('func-line', funcLine)
/**
 * 
 */