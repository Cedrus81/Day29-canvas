var gUserPreferences = {
    shape: 'line',
}

function getUserPreferences() {
    return gUserPreferences
}

function setColor(color) {
    gCtx.strokeStyle = color
}

function setBGC(bgc) {
    gCtx.fillStyle = bgc
}

function setLineWidth(width) {
    gCtx.lineWidth = width
}

function setShape(shape) {
    gUserPreferences.shape = shape
}