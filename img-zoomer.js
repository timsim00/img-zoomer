class ImageZoomer extends HTMLElement {

  constructor() {
    super()
  }

  connectedCallback() {
    this.state = {
      zoomed: false,
      mousedown: false
    }
    this.innerHTML = this.template
    this.img = this.querySelector('figure img')
    this.figure = this.querySelector('figure')
    this.addEventListener( 'click', this.onClick, false )
    this.addEventListener( 'mousemove', this.onMove, false )
    this.addEventListener( 'mousedown', this.onDown, false )
    this.addEventListener( 'mouseup', this.onUp, false )
    this.render(this.state)
  }

  render(state) {
    this.img.setAttribute('src', this.getAttribute('src'))
    this.figure.setAttribute('style', this.getAttribute('style'))
    this.figure.style.backgroundImage = "url('" + this.getAttribute('src') + "')"
    this.figure.style.backgroundRepeat = 'no-repeat'
    this.figure.style.position = 'relative';
  }

  onClick(e) {
    if (this.state.zoomed) {
      this.img.style.opacity = 100
      this.state.zoomed = false
    } else {
      this.img.style.opacity = 0
      this.zoom(e)
      this.state.zoomed = true
    }
  }

  onDown(e) {
    this.state.mousedown = true
    if (!this.state.zoomed) {
      this.img.style.cursor = "-webkit-grabbing"
    }
    this.onClick(e)
  }

  onUp(e) {
    this.state.mousedown = false
    this.img.style.cursor = "auto"
    this.onClick(e)
  }

  onMove(e) {
    if (this.state.mousedown) {
      this.zoom(e)
    }
  }

  get template() {
    return `
      <figure class="zoom" draggable="false">
        <img draggable="false" style="transition: opacity .5s; display: block; width: 100%;"/>
      </figure>
    `
  }

  zoom(e){
    // credit: https://codepen.io/galulex/pen/eNZRVq
    let offsetX, offsetY, x, y
    e.offsetX ? offsetX = e.offsetX : offsetX = e.touches ? e.touches[0].pageX : offsetX
    e.offsetY ? offsetY = e.offsetY : offsetX = e.touches ? e.touches[0].pageX : offsetX
    x = offsetX/this.figure.offsetWidth*100
    y = offsetY/this.figure.offsetHeight*100
    this.figure.style.backgroundPosition = x + '% ' + y + '%'
  }
}
customElements.define('img-zoomer', ImageZoomer)



