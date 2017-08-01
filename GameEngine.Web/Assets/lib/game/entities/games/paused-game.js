ig.module('game.entities.games.paused-game')
.requires('game.app.entity')
.defines(function(){
	EntityPausedGame = Entity.extend({
		name:"PausedGame",
		size:{x:460,y:840},
		type:ig.Entity.TYPE.A,//[NONE,A,B]
		opacity:0,
		init:function(x,y,settings){
			this.parent(x,y,settings);
			if(!ig.global.wm){
				var center = this.fnGetCenter();
				this.frame = this.fnSpawn(EntityPausedgameFrame,0,0,{overlay:this});
				this.frame.fnShow();
				this.zIndex = this.fnGetSetting('enIdx').paused;
				ig.game.sortEntitiesDeferred();
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
	});

	
	EntityPausedgameFrame = Entity.extend({
		name:"PausedgameFrame",
		size:{x:299,y:105},
		animSheet: new ig.AnimationSheet('media/graphics/games/paused-frame.png',299,105),
		init:function(x,y,settings){
			this.parent(x,y,settings);
			this.addAnim( 'idle', 0.1, [0] );
			this.currentAnim = this.anims.idle;
			if(!ig.global.wm){
				//Only do in game mode
				var center = this.overlay.fnGetCenter();
				this.fnSetCenter('both',{x:center.x,y:-500});
				this.hidePos = {x:center.x,y:-500}
				this.showPos = {x:center.x,y:250};
				this.resumeBtn = this.fnSpawn(EntityResumeBtn,0,0,{dialog:this});
				this.fnSetResumeBtnPos();
				this.zIndex = this.fnGetSetting('enIdx').paused + 1;
				ig.game.sortEntitiesDeferred();
			}
		},
		fnSetResumeBtnPos:function(){
			var center = this.fnGetCenter();
			this.resumeBtn.fnSetCenter('both',center,{y:15});
		},
		fnShow:function(){
			this.tween(
				{pos:{y:this.showPos.y}},
				0.25,
				{
					easing:ig.Tween.Easing.Exponential.EaseOut,
					onUpdate:function(prop, obj, start, delta, value){
						this.overlay.opacity = this.fnGetSetting('pauseOverlayDarkness') * value;
					}.bind(this),
				}
			).start();
		},
		fnHideKill:function(){
			this.tween(
				{pos:{y:this.hidePos.y}},
				0.25,
				{
					easing:ig.Tween.Easing.Exponential.EaseIn,
					onUpdate:function(prop, obj, start, delta, value){
						this.overlay.opacity -= this.fnGetSetting('pauseOverlayDarkness') * value;
					}.bind(this),
					onComplete:function(){
						this.kill();
					}.bind(this)
				}
			).start();
		},
		update:function(){
			this.parent();
			this.fnSetResumeBtnPos();
		},
		kill:function(){
			this.overlay.kill();
			this.resumeBtn.kill();
			this.parent();
		},
		draw:function(){
			this.parent();
			var center = this.fnGetCenter();
			this.fnCtxWrite(
					_STRINGS.Game.paused,
					'sketch-block',
					16,
					'black',
					'center',
					center.x,
					center.y - 30
				);
		},
	});

	
	EntityResumeBtn = Entity.extend({
		name:"ResumeBtn",
		size:{x:52,y:51},
		animSheet: new ig.AnimationSheet('media/graphics/sprites/button-game.png',52,51),
		type:ig.Entity.TYPE.A,//[NONE,A,B]
		cursor:'pointer',
		init:function(x,y,settings){
			this.parent(x,y,settings);
			this.addAnim( 'idle', 0.1, [7] );
			this.addAnim( 'hover', 0.1, [6] );
			this.currentAnim = this.anims.idle;
			if(!ig.global.wm){
				//Only do in game mode
				this.zIndex = this.fnGetSetting('enIdx').paused + 2;
				ig.game.sortEntitiesDeferred();
			}
		},
		released:function(){
			this.parent();
			ig.game.fnUnpause();
			ig.soundHandler.sfxPlayer.play('button');
			this.dialog.fnHideKill();
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

});