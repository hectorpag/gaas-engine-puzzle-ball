ig.module('game.entities.games.starpick-game')
.requires('game.app.entity')
.defines(function(){
	EntityStarpickGame = Entity.extend({
		name:"StarpickGame",
		size:{x:41,y:39},
		animSheet: new ig.AnimationSheet('media/graphics/sprites/star-pick.png',41,39),
		type:ig.Entity.TYPE.A,//[NONE,A,B]
		shrinking:false,
		disablePointer:true,
		pausedFrame:0,
		init:function(x,y,settings){
			this.parent(x,y,settings);
			this.addAnim( 'idle', 0.1, [0,1,2,3,4,5] );
			this.currentAnim = this.anims.idle;
			if(!ig.global.wm){
				//Only do in game mode
				this.zIndex = this.fnGetSetting('enIdx').starpick;
				ig.game.sortEntitiesDeferred();
			}
		},
		fnTriggerShrink:function(){
			switch(this.fnGetController().currentScore){
				case 0:  ig.soundHandler.sfxPlayer.play('ding1'); break;
				case 1:  ig.soundHandler.sfxPlayer.play('ding2'); break;
				case 2:  ig.soundHandler.sfxPlayer.play('ding3'); break;
				default: break;
			}
			
			this.shrinking = true;
			this.tween(
				{currentAnim:{alpha:0},pos:{y:this.pos.y-40}},
				0.5,
				{
					easing:ig.Tween.Easing.Sinusoidal.EaseInOut,
					onComplete:function(){
						this.kill();
					}.bind(this)
				}
			).start();
		},
		update:function(){
			if(this.fnGetState('isPaused')) return;
			this.parent();
		},
		fnPause:function(){
        	this.pauseTweens();
        	this.pausedFrame = this.currentAnim.frame;
        },
        fnUnpause:function(){
        	this.resumeTweens();
        	this.currentAnim.gotoFrame(this.pausedFrame);
        },
	});
});