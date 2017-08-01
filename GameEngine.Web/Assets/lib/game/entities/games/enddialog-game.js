ig.module('game.entities.games.enddialog-game')
.requires(
    'game.app.entity',
	'game.services.level'
)
.defines(function(){
    EntityEnddialogGame = Entity.extend({
        name:'EnddialogGame',
        size:{x:480,y:640},
        type:ig.Entity.TYPE.A,
        opacity:0,
        init:function(x,y,settings){
            this.parent(x,y,settings);
            if(!ig.global.wm){
                //Only do in game mode
                var center = this.fnGetCenter();
                
                this.anchor = this.fnSpawn(EntityStarendAnchor,center.x,-500,{overlay:this});
                
                this.anchor.fnShow();
                this.zIndex = this.fnGetSetting('enIdx').starendgame;
                ig.game.sortEntitiesDeferred();
                ig.soundHandler.sfxPlayer.play('enddialog');
            }
        },
		draw:function(){
			this.parent();
			ig.system.context.beginPath();
			ig.system.context.rect(0, 0, 480, 640);
			ig.system.context.fillStyle = 'rgba(0,0,0,'+this.opacity+')';
			ig.system.context.fill();
			ig.system.context.restore;
		},
        kill:function(){
            this.anchor.kill();
            this.parent();
        },
    });

    EntityStarendAnchor = Entity.extend({
        name:'StarendAnchor',
        nextEvent:false,
        init:function(x,y,settings){
            this.parent(x,y,settings);
            if(!ig.global.wm){
                //Only do in game mode
                this.fnSetCenter('both',this.pos);
                var center  = this.fnGetCenter();
                this.hidePosY = this.pos.y;
                this.showPosY = ig.system.height/2 - 50;
                this.dialog = this.fnSpawn(EntityStarendDialog,center.x,center.y,{
                    anchor:this
                });
                this.fnUpdateDialogPos();
                this.zIndex = this.fnGetSetting('enIdx').starendgame + 1;
                ig.game.sortEntitiesDeferred();
            }
        },
        fnShow:function(){
            this.tween(
                {pos:{x:this.pos.x,y:this.showPosY}},
                this.fnGetSetting('dialogShowSpeed'),
                {
					easing:ig.Tween.Easing.Exponential.EaseOut,
					onUpdate:function(prop, obj, start, delta, value){
						this.overlay.opacity = this.fnGetSetting('optionOverlayDarkness') * value;
					}.bind(this),
                    onComplete:function(){
                        this.fnGenerateStars();
                    }.bind(this)
                }
            ).start();
            
        },
        fnHide:function(){
            this.tween(
                {pos:{x:this.pos.x,y:this.hidePosY}},
                this.fnGetSetting('dialogShowSpeed'),
                {
					easing:ig.Tween.Easing.Exponential.EaseIn,
					onUpdate:function(prop, obj, start, delta, value){
						this.overlay.opacity -= this.fnGetSetting('pauseOverlayDarkness') * value;
					}.bind(this),
                    onComplete:function(){
                        this.fnResponseOnClose();
                    }.bind(this)
                }
            ).start();
        },
        fnGenerateStars:function(){
            this.stars = [];
            var score = this.fnGetController().currentScore;
            for (var index = 0; index <= score - 1; index++) {
                var reslPos = {}
                relPos = (index === 0) ? {x:-56,y:-144}
                        :(index == 1) ? {x:1,y:-156}
                        :{x:56,y:-144};
                this.stars.push(this.fnSpawn(EntityStarend,0,0,{
                    index:index,
                    relPos:relPos,
                    delay:index*this.fnGetSetting('starTopUiDelay')
                }));
            }
            this.fnUpdateStarPos();
            for (var index = 0; index < this.stars.length; index++) {
                var element = this.stars[index];
                element.fnTriggerEntrance();
            }
        },
        fnUpdateStarPos:function(){
            if(!this.stars) return;
            var center = this.fnGetCenter();
            for (var index = 0; index < this.stars.length; index++) {
                var element = this.stars[index];
                element.fnSetCenter('both',center,{
                    x:element.relPos.x,
                    y:element.relPos.y
                });                
            }
        },
        fnUpdateDialogPos:function(){
            var center = this.fnGetCenter();
            this.dialog.fnSetCenter('both',center);
        },
        update:function(){
            this.parent();
            this.fnUpdateDialogPos();
            this.fnUpdateStarPos();
        },
        fnResponseOnClose:function(){
            this.nextEvent;//this variable is respond next event
            if(this.nextEvent == 'reset')
                this.fnGetController().fnReloadLevel();
        },
        kill:function(){
            if(this.stars)
                for (var index = 0; index < this.stars.length; index++)
                    this.stars[index].kill()

            this.dialog.kill();
            this.parent();
        },
    });

    EntityStarendDialog = Entity.extend({
        name:'StarendDialog',
        size:{x:309,y:347},
        animSheet: new ig.AnimationSheet('media/graphics/games/end-game-dialog.png',309,347),
        init:function(x,y,settings){
            this.parent(x,y,settings);
            this.addAnim( 'idle', 0.1, [0] );
            this.currentAnim = this.anims.idle;
            if(!ig.global.wm){
                //Only do in game mode
                this.fnInitButtons();
                this.fnUpdateButtonPos();
                this.zIndex = this.fnGetSetting('enIdx').starendgame + 2;
                ig.game.sortEntitiesDeferred();
            }
        },
        fnInitButtons:function(){
            if(this.fnGetController().level + 1 > this.fnGetSetting('layout').length - 1){
                this.levelBtn = this.fnSpawn(EntityLevelendBtn,0,0,{dialog:this});
                this.retryBtn = this.fnSpawn(EntityRetryendBtn,0,0,{dialog:this});
            }else{
                this.levelBtn = this.fnSpawn(EntityLevelendBtn,0,0,{dialog:this});
                this.retryBtn = this.fnSpawn(EntityRetryendBtn,0,0,{dialog:this});
                this.nextBtn = this.fnSpawn(EntityNextendBtn,0,0,{dialog:this});
            }
        },
        fnUpdateButtonPos:function(){
            var center = this.fnGetCenter();
            if(this.fnGetController().level + 1 > this.fnGetSetting('layout').length - 1){
                this.fnUpdateButtonElements(this.levelBtn,center,{x:-42,y:100});
                this.fnUpdateButtonElements(this.retryBtn,center,{x:42,y:100});
            }else{
                this.fnUpdateButtonElements(this.levelBtn,center,{x:-85,y:100});
                this.fnUpdateButtonElements(this.retryBtn,center,{x:0,y:100});
                this.fnUpdateButtonElements(this.nextBtn,center,{x:85,y:100});
            }
        },
        fnUpdateButtonElements:function(enBtn,center,relPos){
            enBtn.fnSetCenter('both',{
                x:center.x + relPos.x,
                y:center.y + relPos.y
            });
        },
        update:function(){
            this.parent();
            this.fnUpdateButtonPos();
        },
        draw:function(){
			this.parent();
			var center = this.fnGetCenter();
			this.fnCtxWrite(
				_STRINGS.Game.levelcomplete,
				'sketch-block',
				16,
				this.fnGetSetting('color').captionBoard,
				'center',
				center.x,
				center.y - 98
			);

			this.fnCtxWrite(
				_STRINGS.Game.moves,
				'sketch-block',
				16,
				this.fnGetSetting('color').captionLeather,
				'right',
				center.x - 45,
				center.y - 25
			);

            var currentPath = this.fnGetController().stepHistory.length;
			this.fnCtxWrite(
				currentPath,
				'sketch-block',
				16,
				this.fnGetSetting('color').value,
				'center',
				center.x + 38,
				center.y - 25
			);

			this.fnCtxWrite(
				_STRINGS.Game.best,
				'sketch-block',
				16,
				this.fnGetSetting('color').captionLeather,
				'right',
				center.x - 45,
				center.y + 43
			);

            var bestPath = this.fnGetController().bestPath.fnGet(this.fnGetController().level) || false;
            var newRecord = (bestPath === false) ? currentPath 
                            :(currentPath < bestPath) ? currentPath : false; 
                bestPath = newRecord || bestPath;

            this.fnCtxWrite(
				bestPath,
				'sketch-block',
				16,
				this.fnGetSetting('color').value,
				'center',
				center.x + 38,
				center.y + 43
			);
		},
        kill:function(){
            this.levelBtn.kill();
            this.retryBtn.kill();
            if(this.nextBtn)
                this.nextBtn.kill();
            this.parent();
        },
    });

    EntityLevelendBtn = Entity.extend({
        name:'LevelenBtn',
        size:{x:52,y:51},
        animSheet: new ig.AnimationSheet('media/graphics/sprites/button-game.png',52,51),
        type:ig.Entity.TYPE.A,
        cursor:'pointer',
        init:function(x,y,settings){
            this.parent(x,y,settings);
            this.addAnim( 'idle', 0.1, [9] );
            this.addAnim( 'hover', 0.1, [8] );
            this.currentAnim = this.anims.idle;
            if(!ig.global.wm){
                //Only do in game mode
                this.zIndex = this.fnGetSetting('enIdx').starendgame + 3;
                ig.game.sortEntitiesDeferred();
            }
        },
        clicked:function(){
            this.parent();
            ig.soundHandler.sfxPlayer.play('button');
            this.fnGetController().fnShowSelectLevelDialog();
        },
        over:function(){
            this.parent();
            this.currentAnim = this.anims.hover;
        },
        leave:function(){
            this.parent();
            this.currentAnim = this.anims.idle;
        },
    });

    EntityRetryendBtn = Entity.extend({
        name:'RetryendBtn',
        size:{x:52,y:51},
        animSheet: new ig.AnimationSheet('media/graphics/sprites/button-game.png',52,51),
        type:ig.Entity.TYPE.A,
        cursor:'pointer',
        clicked:function(){
            this.parent();
            ig.soundHandler.sfxPlayer.play('button');
            this.dialog.anchor.nextEvent = 'reset';
            this.dialog.anchor.fnHide();
        },
        init:function(x,y,settings){
            this.parent(x,y,settings);
            this.addAnim( 'idle', 0.1, [19] );
            this.addAnim( 'hover', 0.1, [18] );
            this.currentAnim = this.anims.idle;
            if(!ig.global.wm){
                //Only do in game mode
                this.zIndex = this.fnGetSetting('enIdx').starendgame + 3;
                ig.game.sortEntitiesDeferred();
            }
        },
        over:function(){
            this.parent();
            this.currentAnim = this.anims.hover;
        },
        leave:function(){
            this.parent();
            this.currentAnim = this.anims.idle;
        },
    });

    EntityNextendBtn = Entity.extend({
        name:'NextendBtn',
        size:{x:52,y:51},
        animSheet: new ig.AnimationSheet('media/graphics/sprites/button-game.png',52,51),
        type:ig.Entity.TYPE.A,
        cursor:'pointer',
        init:function(x,y,settings){
            this.parent(x,y,settings)
            this.addAnim( 'idle', 0.1, [7] );
            this.addAnim( 'hover', 0.1, [6] );
            this.currentAnim = this.anims.idle;
            if(!ig.global.wm){
                //Only do in game mode
                this.zIndex = this.fnGetSetting('enIdx').starendgame + 3;
                ig.game.sortEntitiesDeferred();
            }
        },
        over:function(){
            this.parent();
            this.currentAnim = this.anims.hover;
        },
        leave:function(){
            this.parent();
            this.currentAnim = this.anims.idle;
        },
        clicked:function(){
            this.parent();
            var levelStorage = new LevelService();
            levelStorage.fnSaveLevel(this.fnGetController().level + 1);
            this.dialog.anchor.nextEvent = 'reset';
            ig.soundHandler.sfxPlayer.play('button');
            this.dialog.anchor.fnHide();
        },
    });
    
    EntityStarend = Entity.extend({
        name:'Starend',
        size:{x:68,y:66},
        animSheet: new ig.AnimationSheet('media/graphics/sprites/star-end.png',68,66),
        init:function(x,y,settings){
            this.parent(x,y,settings)
            if(!ig.global.wm){
                //Only do in game mode
                if(this.index%2 == 0)
                    this.addAnim( 'idle', 0.1, [1] );
                else
                    this.addAnim( 'idle', 0.1, [0] );

                this.currentAnim = this.anims.idle;
                this.currentAnim.scale.x = 0;
                this.currentAnim.scale.y = 0;
                this.zIndex = this.fnGetSetting('enIdx').starendgame + 4;
                ig.game.sortEntitiesDeferred();
            }
        },
        fnTriggerEntrance:function(){
            this.tween(
                {currentAnim:{
                    scale:{x:1,y:1},
                    angle:Math.PI*2,   
                }},
                0.5,
                {
					easing:ig.Tween.Easing.Exponential.EaseOut,
                    delay:this.delay,
                }
            ).start();
            
        },
    });

});