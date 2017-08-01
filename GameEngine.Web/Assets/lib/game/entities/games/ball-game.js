/// <reference path='../../../../.vscode/impact-intel.d.ts' />

ig.module('game.entities.games.ball-game')
.requires('game.app.entity')
.defines(function(){
	EntityBallGame = Entity.extend({
		name:"BallGame",
		size:{x:32,y:32},
		animSheet: new ig.AnimationSheet('media/graphics/games/ball.png',32,32),
        checkAgainst: ig.Entity.TYPE.A,
        star:0,
		arPath:[],//Collection of axis which ball follow
		init:function(x,y,settings){
			this.parent(x,y,settings);
			this.addAnim( 'idle', 0.1, [0] );
			this.currentAnim = this.anims.idle;
			if(!ig.global.wm){
				//Only do in game mode
				this.zIndex = this.fnGetSetting('enIdx').ball;
				ig.game.sortEntitiesDeferred();
			}
		},
		check:function(other){
			this.parent();
			if(other.name == 'StarpickGame' && !other.shrinking){
				other.fnTriggerShrink();
				this.fnGetController().currentScore++;
				if(this.fnGetController().currentScore > this.fnGetController().score.fnGet(this.fnGetController().level)){
					this.fnGetController().fnAddScore();
				}
			}
			if(other.name == 'HintspinGame' && !other.shrinking)
				other.fnTriggerShrink();
		},
	});
});