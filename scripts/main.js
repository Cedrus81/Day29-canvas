'use strict'
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']
var gIsDraw = false
var gElCanvas = document.querySelector('canvas')
var gCtx = gElCanvas.getContext('2d')

function init() {
    addListeners()
}


//Handle the listeners
function addListeners() {
    addMouseListeners()
    addTouchListeners()
    //Listen for resize ev 
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderCanvas()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    console.log('Im from onDown')
    gIsDraw = true
    //Get the ev pos from mouse or touch
    const pos = getEvPos(ev)
    console.log(pos);
}

function onUp(ev) {
    console.log('Im from onUp')
    gIsDraw = false
    //Get the ev pos from mouse or touch
    const pos = getEvPos(ev)
    console.log(pos);
}

function onMove(ev) {
    if (!gIsDraw) return
    console.log('Im from onMove')
    //Get the ev pos from mouse or touch
    const pos = getEvPos(ev)
    console.log(pos, ev);
    drawShape(pos)
}

function drawShape(pos) {
    const prefs = getUserPreferences()

    switch (prefs.shape) {
        case 'line':
            drawLine(pos)
            break
        case 'rectangle':
            drawRect(pos)
            break
        case 'circle':
            drawCircle(pos)
            break
    }

}

function getEvPos(ev) {

    //Gets the offset pos , the default pos
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    // Check if its a touch ev
    if (TOUCH_EVS.includes(ev.type)) {
        //soo we will not trigger the mouse ev
        ev.preventDefault()
        //Gets the first touch point
        ev = ev.changedTouches[0]
        //Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}
function onPickColor(color) {
    setColor(color)
}

function onPickBGC(color) {
    setBGC(color)
}


function onPickShape(shape) {
    setShape(shape)
}

function onSetLineWidth(width) {
    setLineWidth(width)
}

function onClearCanvas() {
    if (!confirm(`Are you sure you'd like to delete this masterpiece?`)) return
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}


function drawLine({ x, y }) {
    gCtx.lineTo(x, y)
    gCtx.stroke()
}

function drawRect({ x, y }) {
    gCtx.strokeRect(x, y, 150, 300)
    gCtx.fillRect(x, y, 150, 150)
}

function drawCircle({ x, y }) {
    gCtx.arc(x, y, size, 0, 2 * Math.PI)
    gCtx.stroke()
    gCtx.fill()
}

// function drawArc(x, y, size = 60, color = 'blue') {
//     gCtx.beginPath()
//     gCtx.lineWidth = '6'
//     gCtx.strokeStyle = 'white'
//     gCtx.fillStyle = color
// }