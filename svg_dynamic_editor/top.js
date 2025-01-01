var svgout = $('#svgout')
var svgconfigbtn = $('#svg-config-btn')
var svgconfig = $('#svg-config')
var xview = 0
var yview = 0
var viewwidth = 100
var viewheight = 100
var objid = 1
svgout[0].setAttribute('viewBox', `${xview} ${yview} ${viewwidth} ${viewheight}`)
svgconfigbtn.on('click', function(ev) {
	svgconfig.toggle()
})
svgconfig.find('input').on('input', function(ev) {
	Array.from(svgconfig.find('input')).forEach((el, ind) => {
		window[el.id] = el.value
	})
	svgout[0].setAttribute('viewBox', `${xview} ${yview} ${viewwidth} ${viewheight}`)
})
var linestyles = `width: calc(100% - 3px);
height: calc(100% / 5);
overflow: auto;
font-family: sans-serif;
border: 3px black solid;
border-right: none;
border-left: none;
padding-left: 3px;
padding-top: 3px;`
var lineX = `<p style="float: right;margin: 0;font-size: x-large;cursor:pointer;" id="xout">X</p>`
function applyLineX(cnt, eln, el, m) {
	if(m == 't') {
		cnt.find('#xout').css('margin-left', 'auto')
	}
	cnt.find('#xout').click((ev) => {
		getDocumentFragment(ev.target).host.remove()
		if(m === 's') {
			if(eln === 'obj') {
				document.getElementById('obj' + el.getAttribute('id')).remove()
			} else if(eln == 'var' || eln == 'cond') {
				delete variables[el.getAttribute('name')]
				for(var i = 0; i < el.used.length; i++) {
					el.used[i].updateVal()
				}
			} else if(eln == 'func') {
				delete functions[el.getAttribute('name')]
				for(var i = 0; i < el.used.length; i++) {
					el.used[i].updateVal()
				}
			}
		} else if(m === 't') {
			if(eln == 'obj') {
				document.getElementById('obj' + el.getAttribute('id')).remove()
				delete variables[document.getElementById('obj'+el.getAttribute('id')).name]
			} else if(eln == 'var') {
				delete variables[el.getAttribute('name')]
			} else if(eln == 'func') {
				delete funcs[funcs.indexOf(el)]
			}
		}
	})
}
var variables = {}
var functions = {}
var funcid = 0
function ref(x) {
	return variables[x].value
}
function funcDefs() {
	return Object.values(functions).map(a => a.def).join(';')+';'
}
function getFunc(nm) {
	for(var i in Object.values(functions)) {
		if(functions[i].def.match(/^.*?(?=\()/) == nm) {
			return functions[i]
		}
	}
}
var parser = new exprEval.Parser()
parser.binaryOps['||'] = (a, b) => a || b;
parser.binaryOps['+'] = (a, b) => a + b;
parser.functions.string = function(a) {
	return a.toString()
}
parser.functions.number = function(a) {
	return Number(a)
}
function getDocumentFragment(element) {
	let parentNode = element.parentNode;
	while (parentNode !== null && !(parentNode instanceof DocumentFragment)) {
		parentNode = parentNode.parentNode;
	}
	return parentNode;
}
class addLine extends HTMLElement {
	constructor() {
		super()
	}
	connectedCallback() {
		var shadow = this.attachShadow({mode:'open'})
		var styles = $(`<style>#container {${linestyles}}</style>`)
		var content = $(`<div id="container" style="display: flex;">
	<h3>Add new: </h3>
	<div id="add">
		<button id="obj-">Object</button>
		<button id="var-line">Variable</button>
		<button id="cond-line">Conditional</button>
		<button id="func-line">Function</button>
</div>
</div>`)
		content.find('button').click((ev) => {
			$('#objects').append($('<' + ev.target.id + '>'))
		})
		shadow.appendChild(styles[0])
		shadow.appendChild(content[0])
	}
	hideButton(w) {
		this.shadowRoot.querySelector('#'+w).style.display = 'none'
	}
}
customElements.define('add-line', addLine)

$('#switch').on('click', function(ev) {
	console.log('hi')
	if(location.pathname.indexOf('typed')+1) {
		window.location = '/'
	} else {
		window.location = '/typed'
	}
})