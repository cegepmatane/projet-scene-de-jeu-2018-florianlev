var _stage;
var _rect1;
var _rect2;
var _wasd;
var _arrows;
var _intersect;
var _speed = 4;

function drawRect(x, y, width, height, stroke, fill) {
    var graphics = new createjs.Graphics()
        .setStrokeStyle(1)
        .beginStroke(stroke)
        .beginFill(fill)
        .drawRect(0, 0, width, height)
        .endFill();
    var r = new createjs.Shape(graphics);
    r.setBounds(0, 0, width, height);
	console.log(r.setBounds);
    r.x = x;
    r.y = y;
	
    _stage.addChild(r);
    return r;
}

function intersect(r1, r2) {
    var leftMost = (r1.x < r2.x) ? r1 : r2;
    var rightMost = (r1.x > r2.x) ? r1 : r2;
    var upMost = (r1.y < r2.y) ? r1 : r2;
    var downMost = (r1.y > r2.y) ? r1 : r2;
    
    var upperLeft = [rightMost.x, downMost.y];
    var upperRight = [leftMost.x + leftMost._bounds.width, downMost.y];
    var lowerLeft = [rightMost.x, upMost.y + upMost._bounds.height];
    var lowerRight = [leftMost.x + leftMost._bounds.width, upMost.y + upMost._bounds.height];
    
    var x = upperLeft[0];
    var y = upperLeft[1];
    
    var width = upperRight[0] - upperLeft[0];
    var height = lowerLeft[1] - upperLeft[1];
    
    //console.log(width, height);
    
    if (width < 0 || height < 0) {
        width = 0;
        height = 0;
    }
    
    var r = drawRect(x, y, width, height, '#f00', '#f00');
    
    return r;
}

function onKey(e, state) {
    if (e.keyCode == 65) {//a
        _wasd.a = state;
    } else if (e.keyCode == 68) {//d
        _wasd.d = state;
    } else if (e.keyCode == 87) {//w
        _wasd.w = state;
    } else if (e.keyCode == 83) {//s
        _wasd.s = state;
    } else if (e.keyCode == 37) {//left
        _arrows.left = state;
    } else if (e.keyCode == 38) {//up
        _arrows.up = state;
    } else if (e.keyCode == 39) {//right
        _arrows.right = state;
    } else if (e.keyCode == 40) {//down
        _arrows.down = state;
    }
}

function onKeyDown(e) {
    onKey(e, true);
}

function onKeyUp(e) {
    onKey(e, false);
}

function moveRects() {
    if (_wasd.a)
        _rect1.x -= _speed;
    if (_wasd.w)
        _rect1.y -= _speed;
    if (_wasd.d)
        _rect1.x += _speed;
    if (_wasd.s)
        _rect1.y += _speed;
    
    if(_arrows.left)
        _rect2.x -= _speed;
    if(_arrows.up)
        _rect2.y -= _speed;
    if(_arrows.right)
        _rect2.x += _speed;
    if(_arrows.down)
        _rect2.y += _speed;
    
    _intersect.graphics.clear();
    _intersect = intersect(_rect1, _rect2);
}

function update(e) {
    moveRects();
    _stage.update();
}

_stage = new createjs.Stage("dessin");
_stage.canvas.style.border = "1px solid #000";
_stage.canvas.width = 800;
_stage.canvas.height = 600;

_rect1 = drawRect(50, 50, 400, 300, '#000', '#0f0');
_rect2 = drawRect(350, 250, 400, 300, '#000', '#00f');
_intersect = intersect(_rect1, _rect2);

_wasd = {
    w: false,
    a: false,
    s: false,
    d: false
};
_arrows = {
    left: false,
    up: false,
    right: false,
    down: false
};

document.addEventListener('keydown', onKeyDown, false);
document.addEventListener('keyup', onKeyUp, false);

createjs.Ticker.addEventListener('tick', update);
