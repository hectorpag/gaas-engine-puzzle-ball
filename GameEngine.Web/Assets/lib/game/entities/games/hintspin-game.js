ig.module('game.entities.games.hintspin-game')
.requires(
	'game.app.entity',
	'game.services.hint'
)
.defines(function(){
	EntityHintspinGame = Entity.extend({
		name:"HintspinGame",
		size:{x:32,y:32},
		animSheet: new ig.AnimationSheet('media/graphics/sprites/hint-spin.png',32,32),
		type:ig.Entity.TYPE.A,//[NONE,A,B]
		shrinking:false,
		disablePointer:true,
		pausedFrame:0,
		addHint:true,
		hintService:new HintService(),
		init:function(x,y,settings){
			this.parent(x,y,settings);
			this.addAnim( 'idle', 0.1, [0,1,2,3,4,5,6,7,8,9] );
			this.currentAnim = this.anims.idle;
			if(!ig.global.wm){
				//Only do in game mode
				this.zIndex = this.fnGetSetting('enIdx').hintspin;
				ig.game.sortEntitiesDeferred();
			}
		},
		fnTriggerShrink:function(){
			ig.soundHandler.sfxPlayer.play('hint');
			this.shrinking = true;
			this.tween(
				{currentAnim:{alpha:0.5},pos:{x:305,y:580}},
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
		kill:function(){
			if(this.addHint && !this.hintService.fnGetHints()[this.fnGetController().level]){
				ig.game.namedEntities.UiframeBottomGame.fnAddHint();
				this.hintService.fnSetHints(this.fnGetController().level);
			}
			this.parent();
		}
	});
});