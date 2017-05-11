var zombiePlayers = [["1", "Minichiello"],
                    ["2", "King"],
                    ["3", "Gasnier"],
                    ["4", "Daley"],
                    ["5", "Tahu"],
                    ["6", "Fittler"],
                    ["7", "Johns"],
                    ["8", "Lazarus"],
                    ["9", "Buderus"],
                    ["10", "Gallen"],
                    ["11", "Hindmarsh"],
                    ["12", "Menzies"],
                    ["13", "Bird"],
                    ["", "Gould"]];

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
        $(this.query).attr('class', 'zombie bones ' + 'zombie' + this.id);
        $(this.query).addClass('bones');
        $(this.query).fadeOut(1500, function () {
            $(this).remove();
        });
        
        this.status = 'dead';
    },
    checkHit: function() {
        if (player.top - 50 < this.top && this.top < (player.top + player.height - 100) && this.destination === player.pos) {
            var pointsScored = 1;
            this.destroyZombie();
            if (this.type == 'bonus') {
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

        while (temp) {
            zombiePlayerIndex = Math.floor(Math.random() * 14);
            var doesExist = false;

            for (i = 0; i < zombies.length; i++) {
                if (zombies[i].name == zombiePlayers[zombiePlayerIndex][1]) {
                    doesExist = true;
                }
            }

            if (zombies.length >= zombiePlayers.length) {
                doesExist = true; // If theres more zombies than actual players the game will break so we just serve up a duplicate zombie
            }

            if (!doesExist) {
                temp = false;
            }

            // This is to just stop it from getting stuck if it were to occur
            iterations++;
            if (iterations >= 100) {
                temp = false;
            }
        }

        zombieTemp.jersey = zombiePlayers[zombiePlayerIndex][0];
        zombieTemp.name = zombiePlayers[zombiePlayerIndex][1];

        zombies.push(zombieTemp);
        $('.inner').append('<div class="zombie zombie' + zombieTemp.id + zombieTemp.boss + ' ' + posClass[zombieTemp.pos] + '"><div class="jerseyName">' + zombiePlayers[zombiePlayerIndex][1] + '</div><div class="jerseyNumber">' + zombiePlayers[zombiePlayerIndex][0] + '</div></div>');
        
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