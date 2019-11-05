## Description

Simple image zoomer as a vanilla javascript Web Component.


## Business rules of this component:
* the image starts out normal (not zoomed in)
* clicking the image zooms in on the image where the click happened
* holding the mouse down and dragging pans around the image, still zoomed in.
* change the cursor to be a hand after you start dragging while zoomed in. `cursor: grabbing; cursor: -webkit-grabbing;`
* when releasing the mouse, stop dragging
* clicking on the image again returns to normal mode.
