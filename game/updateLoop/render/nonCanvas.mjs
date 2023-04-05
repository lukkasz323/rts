function renderStatus() {
    const types = components.Production.Types;
    for (const key in types) {
        const value = types[key];
        
        document.getElementById(value).innerText = game.resources[value];
    }
}

function renderDebug() {
    const mouseCoords = game.mouse.getX() + ', ' + game.mouse.getY();
    
    $title.innerText = mouseCoords;
}

export function renderNonCanvas(params) {
    renderStatus();
    renderDebug();
}