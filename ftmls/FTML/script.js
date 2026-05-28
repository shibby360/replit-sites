HTMLElement.prototype.getFamily = function() {
  if(this.nodeName !== 'FAMILY') { return }
  return this.children[0]
}
HTMLElement.prototype.birth = function(name) {
  if(this.nodeName !== 'PARENTS') { return }
  var child = document.createElement('child')
  child.setAttribute('name', name)
  child.setAttribute('gender', ['male', 'female'][Math.floor(Math.random()*2)])
  this.appendChild(child)
}
HTMLElement.prototype.disown = function(name) {
  if(this.nodeName !== 'PARENTS') { return }
  this.children[name].remove()
}
HTMLElement.prototype.brothers = function() {
  if(this.nodeName !== 'CHILD') { return }
  var end = []
  for(var i in Array.from(this.parentElement.children)) {
    if(this.parentElement.children[i] === this) { continue }
    if(this.parentElement.children[i].getAttribute('gender') === 'male') {
      end.push(this.parentElement.children[i])
    }
  }
  return end
}
HTMLElement.prototype.sisters = function() {
  if(this.nodeName !== 'CHILD') { return }
  var end = []
  for(var i in Array.from(this.parentElement.children)) {
    if(this.parentElement.children[i] === this) { continue }
    if(this.parentElement.children[i].getAttribute('gender') === 'female') {
      end.push(this.parentElement.children[i])
    }
  }
  return end
}
HTMLElement.prototype.fullName = function() {
  if(this.nodeName !== 'CHILD') { return }
  return this.getAttribute('name') + ' ' + this.parentElement.parentElement.getAttribute('name')
}
HTMLElement.prototype.display = function(size, x, y, abs, color) {
  var svg = d3.select('body')
  .append('svg')
  .attr('width', size*30)
  .attr('height', size*32)
  if(abs) {
    svg.style({
      'position':'abolute',
      'top':y+'px',
      'left':x+'px'
    })
    x = 10
    y = 10
  }
  function circ(c, r, add) {
    if(add === undefined) {
      add = [0, 0]
    }
    svg.append('circle')
    .attr('cx', c[0]+add[0])
    .attr('cy', c[1]+add[1])
    .attr('r', r)
    .style('fill', 'none')
    .style('stroke', color)
    .style('stroke-width', 13)
  }
  function line(x, y, stroke, add) {
    if(add === undefined) {
      add = [0, 0]
    }
    svg.append("line")
    .attr("x1", x[0]+add[0])
    .attr("y1", x[1]+add[1])
    .attr("x2", y[0]+add[0])
    .attr("y2", y[1]+add[1])
    .style('stroke', stroke)
    .style('stroke-width', size)
  }
  function drawParent(add, name, gender) {
    if(gender === undefined || gender === 'female') {
      svg.append('line')
      .attr('x1', x)
      .attr('y1', y+size*5)
      .attr('x2', x)
      .attr('y2', y+size*13)
      .style('stroke', color)
      .style('stroke-width', size)
      svg.append('line')
      .attr('x1', x+size*10)
      .attr('y1', y+size*5)
      .attr('x2', x+size*10)
      .attr('y2', y+size*13)
      .style('stroke', color)
      .style('stroke-width', size)
    }
    circ([x+size*5, y+size*5], size*5, add) /*Head*/
    line([x+size*5, y+size*10], [x+size*5, y+size*20], color, add) /*Body*/
    line([x+size*5, y+size*20], [x, y+size*25], color, add) /*Left leg*/
    line([x+size*5, y+size*20], [x+size*10, y+size*25], color, add) /*Right leg*/
    line([x+size*5, y+size*15], [x, y+size*15], color, add) /*Left arm*/
    line([x+size*5, y+size*15], [x+size*10, y+size*15], color, add) /*Left arm*/
    if(add === undefined) {
      add = [0, 0]
    }
    svg.append('text')
    .attr('x', x+add[0])
    .attr('y', (y+size*30)+add[1])
    .attr('font-size', size*3)
    .style('fill', color)
    .text(name)
    // name
  }
  /*
  down: size*30
  across: size*10 
  */
  if(this.nodeName === 'PARENTS') {
    // mom
    drawParent(undefined, this.getAttribute('mother'))
    // dad
    drawParent([size*15, 0], this.getAttribute('father'), 'male')
    for(var i in Array.from(this.children)) {
      this.children[i].display(size/2, x, y+size*35, true, color)
    }
  }
  else if(this.nodeName === 'CHILD') {
    drawParent(undefined, this.getAttribute('name'), this.getAttribute('gender'))
  }
}
var familytree = document.getElementsByTagName('family')[0].getFamily()
var size = 10
familytree.display(size, 10, 10, undefined, 'black')
document.body.addEventListener('keyup', function(e) {
  d3.select('svg').remove()
  d3.select('svg').remove()
  d3.select('svg').remove()
  if(e.key === 'ArrowUp') {
    e.preventDefault()
    size ++
  }
  else if(e.key === 'ArrowDown') {
    e.preventDefault()
    size --
  }
  familytree.display(size, 10, 10)
})