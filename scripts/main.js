'use strict'
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']
var gIsDraw = false
var gElCanvas = document.querySelector('canvas')
var gCtx = gElCanvas.getContext('2d')

function init() {
    addListeners()
    resizeCanvas()
    gCtx.strokeStyle = 'white'
}


//Handle the listeners
function addListeners() {
    addMouseListeners()
    addTouchListeners()
    //Listen for resize ev 
    window.addEventListener('resize', () => {
        resizeCanvas()
    })
}
function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
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
    gIsDraw = true
    const pos = getEvPos(ev)
    gCtx.beginPath()

}

function onUp(ev) {
    gIsDraw = false
    const pos = getEvPos(ev)
}

function onMove(ev) {
    if (!gIsDraw) return
    //Get the ev pos from mouse or touch
    const pos = getEvPos(ev)
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
        case 'triangle':
            drawTriangle(pos)
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
    gCtx.strokeRect(x, y, 150, 150)
}

function drawCircle({ x, y }, size = 60) {
    gCtx.arc(x, y, size, 0, 2 * Math.PI)
    gCtx.stroke()
}

function drawTriangle({ x, y }) {
    gCtx.lineTo(x + 60, y + 60)
    gCtx.lineTo(x - 60, y + 60)
    gCtx.lineTo(x, y)
    gCtx.stroke()
}


function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')// image/jpeg the default format
    elLink.href = imgContent
}