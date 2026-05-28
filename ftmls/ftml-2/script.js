class parentsClass extends HTMLElement {
  get mother() {
    if(this.hasAttribute('mothermaiden')) {
      return this.getAttribute('mother')
    } else {
      return this.getAttribute('mother') + ' ' + this.getAttribute('lastname')
    }
  }
  get father() {
    return this.getAttribute('father') + ' ' + this.getAttribute('lastname')
  }
  get famChildren() {
    var childs = Array.from(this.children)
    childs.splice(childs.indexOf(this.children[0]), 1)
    return childs
  }
  get metaData() {
    var metas = this.querySelectorAll('metadata- *')
    var end = {}
    for(var i = 0; i < metas.length; i++) {
      end[metas[i].nodeName.toLowerCase().slice(0, -1)] = metas[i].getData
    }
    return end
  }
  get treeElement() {
    if(this.shadowRoot && this.shadowRoot.children) {
      var end = document.createElement('div')
        end.appendChild(this.shadowRoot.children[0].cloneNode(true))
      end.appendChild(this.shadowRoot.children[1].cloneNode(true))
      end.appendChild(this.shadowRoot.children[2].cloneNode(true))
      return end
    }
    return null
  }
  constructor() {
    super()
    if(!this.getAttribute('mother') || !this.getAttribute('father')) {
      throw new SyntaxError("Incomplete parents")
    }
    if(this.hasAttribute('create-var')) {
      if(this.getAttribute('create-var') !== '') {
        window[this.getAttribute('create-var')] = this
      } else {
        window[this.getAttribute('lastname').toLowerCase()+'s'] = this
      }
    }
  }
  birth() {
    var child = document.createElement('child')
    child.setAttribute('gender', ['male', 'female'][Math.floor(Math.random()*2)])
    this.appendChild(child)
    return {gender:child.getAttribute('gender'), setName:function(name) { child.setAttribute('name', name) }}
  }
  divorce() {
    this.remove()
  }
  disown(name) {
    Array.from(this.children).forEach((el, ind) => {
      if(el.name === name) {
        el.remove()
      }
    })
  }
  showTree() {
    if(this.treeElement) { return }
    try {
      var shadow = this.attachShadow({mode:'open'})
    } catch(err) {
      var shadow = this.shadowRoot
    }
    var parentnames = document.createElement('p')
    parentnames.innerText = this.mother + ' + ' + this.father
    parentnames.style.display = 'inline-block'
    parentnames.style.marginTop = '5px'
    parentnames.style.marginBottom = '0'
    shadow.appendChild(parentnames)
    var newsvg = document.querySelector('#downarrow').cloneNode(true)
    newsvg.style.display = 'block'
    newsvg.style.width = getComputedStyle(parentnames).width
    shadow.appendChild(newsvg)
    var kidnames = []
    Array.from(this.children).forEach((el, ind) => {
      if(el.nodeName === 'METADATA-') { return }
      kidnames.push(el.fullname)
    })
    kidnames = kidnames.join(', ')
    var kidel = document.createElement('p')
    kidel.innerText = kidnames
    kidel.style.display = 'inline-block'
    kidel.style.margin = '0'
    shadow.appendChild(kidel)
    shadow.appendChild(document.createElement('br'))
  }
  closeTree() {
    if(!this.treeElement) { return }
    this.shadowRoot.children[0].remove()
    this.shadowRoot.children[0].remove()
    this.shadowRoot.children[0].remove()
  }
}
class childClass extends HTMLElement {
  get name() {
    return this.getAttribute('name')
  }
  get fullname() {
    return this.name + ' ' + this.parentElement.getAttribute('lastname')
  }
  get gender() {
    return this.getAttribute('gender')
  }
  get age() {
    return this.getAttribute('age')
  }
  constructor() {
    super()
    if(this.parentElement.nodeName !== 'PARENTS-' && this.hasAttribute('orphan')) {
      throw new SyntaxError('Child is abandoned')
    }
    if(!this.getAttribute('name') || !this.getAttribute('gender') || !this.getAttribute('age')) {
      throw new SyntaxError('Incomplete attributes')
    }
  }
  celebrateBirthday() {
    console.log('Happy birthday ' + this.getAttribute('name') + '!')
    this.setAttribute('age', Number(this.getAttribute('age'))+1)
  }
  get brothers() {
    var end = []
    for(var i in this.parentElement.children) {
      var child = this.parentElement.children[i]
      if(child !== this && child.gender === 'male') {
        end.push(child)
      }
    }
    return end
  }
  get sisters() {
    var end = []
    for(var i in this.parentElement.children) {
      var child = this.parentElement.children[i]
      if(child !== this && child.gender === 'female') {
        end.push(child)
      }
    }
    return end
  }
  openProfile() {
    try {
      var shadow = this.attachShadow({mode:'open'})
    } catch(err) {
      var shadow = this.shadowRoot
    }
    var name = document.createElement('p')
    var gend = document.createElement('p')
    var age = document.createElement('p')
    var style = document.createElement('style')
    var styles = `p {
margin: 0;
}`
    style.innerText = styles
    name.innerText = 'Name: ' + this.fullname
    gend.innerText = 'Gender: ' + this.gender.charAt(0).toUpperCase() + this.gender.slice(1);
    age.innerText = 'Age: ' + this.age
    shadow.appendChild(style)
    shadow.appendChild(name)
    shadow.appendChild(gend)
    shadow.appendChild(age)
  }
  closeProfile() {
    if(this.shadowRoot && this.shadowRoot.children) {
      for(var i = 0; i <= 3; i++) {
        this.shadowRoot.children[0].remove()
      }
    }
  }
}
class familyMetaData extends HTMLElement {
  
}
class motherMetaData extends HTMLElement {
  constructor() {
    super()
  }
  get getData() {
    var attrs = this.attributes
    var end = {}
    for(var i in [...attrs]) {
      end[attrs[i].nodeName] = attrs[i].nodeValue
    }
    return end
  }
}
class fatherMetaData extends HTMLElement {
  constructor() {
    super()
  }
  get getData() {
    var attrs = this.attributes
    var end = {}
    for(var i in [...attrs]) {
      end[attrs[i].nodeName] = attrs[i].nodeValue
    }
    return end
  }
}
customElements.define('parents-', parentsClass)
customElements.define('child-', childClass)
customElements.define('metadata-', familyMetaData)
customElements.define('mother-', motherMetaData)
customElements.define('father-', fatherMetaData)
