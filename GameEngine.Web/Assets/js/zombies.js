var zombies = [];
var Zombie = {
    id: 0,
    query: '.zombie' + this.id,
    type: 'normal',
    top: 960,
    pos: 0,
    left: 70,
    destination: 0,
    speed: -300,
    lateralSpeed: 0, 
    status: 'alive',
    jersey: '0',
    name: '', 
    imgFrame: 11,
    zIndex: 500,
    zoom: 1,
    size: 1,
    boss: '',
    lastFrameUpdate: new Date().getTime(),
    lastFlashUpdate: new Date().getTime(),
    moveZombie: function() {
        var time = new Date().getTime();
        if ((time - this.lastFrameUpdate) > (80 - this.speed / -10)) {
            this.lastFrameUpdate = time;
            $(this.query).removeClass('zombie-frame-' + this.imgFrame);
            if (this.imgFrame === 11) {
                this.imgFrame = 0;
            }
            this.imgFrame++;
            $(this.query).addClass('zombie-frame-' + this.imgFrame);
        }

        if (this.type == 'bonus') {
            var flashTime = new Date().getTime();
            if ((flashTime - this.lastFlashUpdate) > 250) {
                this.lastFlashUpdate = flashTime;
                $(this.query).toggleClass('bonusZombie');
            }
        }
        

        this.top += this.speed / fps;
        this.left += this.lateralSpeed / fps;
        
        if (Math.round(this.left) === zombiePosValues[this.destination]) {
            this.lateralSpeed = 0;
        }

        this.zIndex = this.top / 2;
        this.zoom = this.size + (this.top / 1400)
        //$(this.query).css('z-index', this.zIndex);
         
        $(this.query).css({
            'top': this.top,
            'left': this.left,
            'transform': 'scale(' + this.zoom + ')',
            'z-index': parseInt(this.zIndex + 10)
        });
    },
    destroyZombie: function () {
        this.status = 'dead';
        $(this.query).attr('class', 'zombie bones ' + 'zombie' + this.id);
        $(this.query).addClass('bones');
        $(this.query).fadeOut(1500, function () {
            $(this).remove();
        });
        
        
    },
    checkHit: function() {
        if (player.top - 100 < this.top && this.top < (player.top + player.height - 100) && this.destination === player.pos && player.status == 'alive' && this.status == 'alive') {
            this.status = 'dead';
            var pointsScored = 1;
            this.destroyZombie();
            if (this.type == 'bonus' || this.type == 'boss') {
                pointsScored = 5;
            }
            updateTacklesMade(pointsScored);
        }
    },
    checkBehindPlayer: function() {
        if (player.top < this.top && this.top < (player.top + player.height)) {
            //$(this.query).css('z-index', '1'); 
        }
    }
} 

function createZombies() {
    if (noOfZombies < maxNumberOfZombies) {
        noOfZombies++;

        var numberOfZombies = noOfZombies;
        var zombieTemp = Object.create(Zombie);
        zombieTemp.id = numberOfZombies;
        zombieTemp.pos = Math.floor(Math.random() * 3);
        zombieTemp.destination = Math.floor(Math.random() * 3);
        zombieTemp.left = zombiePosValues[zombieTemp.pos];
        zombieTemp.query = '.zombie' + zombieTemp.id;
        zombieTemp.speed = Math.floor((Math.random() * -300) * Math.random()) - 150;

        if (noOfZombies === levelNumber * 10) {
            zombieTemp.type = 'boss';
            zombieTemp.size = 1.5;
            zombieTemp.boss = ' bossZombie';
        } else if ((noOfZombies) % 10 === 0) {
            zombieTemp.type = 'bonus';
        }

        if (zombieTemp.type == 'boss') {
            zombieTemp.speed = -150;
        }
        if (zombieTemp.type == 'bonus') {
            zombieTemp.speed = -450;
        }
        

        var destinationDistance = zombieTemp.pos - zombieTemp.destination;
        zombieTemp.lateralSpeed = destinationDistance * (zombieTemp.speed / 4);

        var temp = true;
        var zombiePlayerIndex;
        var iterations = 0;

        zombies.push(zombieTemp);
        $('.inner').append('<div class="zombie zombie' + zombieTemp.id + zombieTemp.boss + ' ' + posClass[zombieTemp.pos] + '"></div>');
        
    }
}

function moveZombies() {
    for (i = 0; i < zombies.length; i++) {
        zombies[i].moveZombie();
        zombies[i].checkHit();
        zombies[i].checkBehindPlayer();
    }
}

function destroyZombies() {
    for (i = 0; i < zombies.length; i++) {
        if (zombies[i].top < outOfBounds) {
            zombies[i].destroyZombie();
            updateMissedZombies();
        }
        if (zombies[i].status == 'dead') {
            zombies.splice(i, 1);
        }
    } 
}