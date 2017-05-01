var player = {
    query: '.player',
    pos: 1,
    top: 120,
    left: 270,
    height: 100,
    lateralSpeed: 50, 
    moving: false,
    direction: 0,
    movePlayer: function(_moveAmount) {  
        var newPos = this.pos + _moveAmount;
        
        if (0 <= newPos && newPos <= 2) {
            this.moving = true;
            this.direction = _moveAmount;
        }
        
        
    },
    slidePlayer: function() {
        if (this.moving) {
            this.left += this.direction * this.lateralSpeed;
            $(this.query).css('left', this.left);
            for(i = 0; i < posValues.length; i++) {
                if (Math.round(this.left) === posValues[i]) {
                    this.moving = false;
                    this.direction = 0;
                    this.pos = i; 
                }
            }
        }
    }
}
