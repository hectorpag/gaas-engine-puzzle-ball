ig.module('game.entities.games.uiframe-top-game')
.requires(
	'game.services.level',
	'game.app.entity'
)
.defines(function(){
	EntityUiframeTopGame = Entity.extend({
		name:"UiframeTopGame",
		size:{x:480,y:144},
		animSheet: new ig.AnimationSheet('media/graphics/games/ui-frame-top.png',480,144),
		levelService:new LevelService(),
		fMovesFontSizeBase:14,
		fMovesFontSizeBig:18,
		fMovesFontSize:14,
		rgbMoves:{},
		rgbMovesBase:{},
		init:function(x,y,settings){
			this.parent(x,y,settings);
			this.addAnim( 'idle', 0.1, [0] );
			this.currentAnim = this.anims.idle;
			if(!ig.global.wm){
				//Only do in game mode
				this.rgbMovesBase = ig.copy(this.fnGetSetting('color').rgbMovesBase);
				this.rgbMoves = ig.copy(this.rgbMovesBase);
				
				this.zIndex = this.fnGetSetting('enIdx').uiFrameTop;
				this.fnInitButton();
				this.levelService.fnLoadLevel();
				ig.game.sortEntitiesDeferred();
			}
		},

		fnInitButton:function(){
			this.pauseBtn = this.fnSpawn(EntityUibuttonPause,380,15);
			this.optionBtn = this.fnSpawn(EntityUibuttonOption,380,70);
		},

		fnAnimateFontMoves:function(){
			/**@type{IgTween}*/
			var twBig = this.tween(
				{
					fMovesFontSize:this.fMovesFontSizeBig,
					rgbMoves:{
						r:this.fnGetSetting('color').rgbMovesAnimate.r,
						g:this.fnGetSetting('color').rgbMovesAnimate.g,
						b:this.fnGetSetting('color').rgbMovesAnimate.b
					}
				},
				0.1,
				{
					easing:ig.Tween.Easing.Sinusoidal.EaseIn,
				}
			);
			/**@type{IgTween}*/
			var twSmall = this.tween(
				{
					fMovesFontSize:this.fMovesFontSizeBase,
					rgbMoves:{
						r:this.rgbMovesBase.r,
						g:this.rgbMovesBase.g,
						b:this.rgbMovesBase.b
					}
				},
				0.1,
				{
					easing:ig.Tween.Easing.Sinusoidal.EaseOut,
				}
			);

			twBig.chain(twSmall);
			twBig.start();
			
		},

		draw:function(){
			this.parent();
			var center = this.fnGetCenter();
			this.fnCtxWrite(
				'Level '+(this.levelService.fnGetLevel()+1),
				'sketch-block',
				15,
				this.fnGetSetting('color').captionBoard,
				'center',
				center.x,
				center.y - 50
			);

			this.fnCtxWrite(
				_STRINGS.Game.moves,
				'sketch-block',
				13,
				this.fnGetSetting('color').captionLeather,
				'center',
				center.x - 166,
				center.y - 35
			);
			var movesColor = 'rgba(R,G,B,1)';
			movesColor = movesColor.replace('R',(this.rgbMoves.r).round());
			movesColor = movesColor.replace('G',(this.rgbMoves.g).round());
			movesColor = movesColor.replace('B',(this.rgbMoves.b).round());
			this.fnCtxWrite(
				this.fnGetController().stepHistory.length,
				'sketch-block',
				this.fMovesFontSize,
				movesColor,
				'center',
				center.x - 166,
				center.y - 10
			);
			this.fnCtxWrite(
				_STRINGS.Game.best,
				'sketch-block',
				14,
				this.fnGetSetting('color').captionLeather,
				'center',
				center.x - 166,
				center.y + 15
			);
			this.fnCtxWrite(
				this.fnGetController().bestPath.fnGet(this.fnGetController().level) || '-',
				'sketch-block',
				this.fMovesFontSizeBase,
				this.fnGetSetting('color').value,
				'center',
				center.x - 166,
				center.y + 35
			);

		},
	});
	EntityUibuttonPause = Entity.extend({
		name:"UibuttonBack",
		size:{x:52,y:51},
		animSheet: new ig.AnimationSheet('media/graphics/sprites/button-game.png',52,51),
		type:ig.Entity.TYPE.A,//[NONE,A,B]
		cursor:'pointer',
		init:function(x,y,settings){
			this.parent(x,y,settings);
			this.addAnim( 'idle', 0.1, [3] );
			this.addAnim( 'hover', 0.1, [2] );
			this.currentAnim = this.anims.idle;
			if(!ig.global.wm){
				//Only do in game mode
				this.zIndex = this.fnGetSetting('enIdx').uiButtonTop;
				ig.game.sortEntitiesDeferred();
			}
		},
		clicked:function(){
			this.parent();
			if(!this.fnGetState('isPaused')){
				ig.game.fnPause();
				this.fnGetController().fnShowPauseDialog();
				this.currentAnim = this.anims.idle;
				ig.soundHandler.sfxPlayer.play('button');
			}
		},
		over:function(){
			this.currentAnim = this.anims.hover;
		},
		leave:function(){
			this.currentAnim = this.anims.idle;
		},
	});
	EntityUibuttonOption = Entity.extend({
		name:"UibuttonOption",
		size:{x:52,y:51},
		animSheet: new ig.AnimationSheet('media/graphics/sprites/button-game.png',52,51),
		type:ig.Entity.TYPE.A,//[NONE,A,B]
		cursor:'pointer',
		init:function(x,y,settings){
			this.parent(x,y,settings);
			this.addAnim( 'idle', 0.1, [1] );
			this.addAnim( 'hover', 0.1, [0] );
			this.currentAnim = this.anims.idle;
			if(!ig.global.wm){
				//Only do in game mode
				this.zIndex = this.fnGetSetting('enIdx').uiButtonTop;
				ig.game.sortEntitiesDeferred();
			}
		},
		clicked:function(){
			this.parent();
			ig.game.fnPause();
			this.fnGetController().fnShowOptionDialog();
			this.currentAnim = this.anims.idle;
			ig.soundHandler.sfxPlayer.play('button');
		},
		over:function(){
			this.currentAnim = this.anims.hover;
		},
		leave:function(){
			this.currentAnim = this.anims.idle;
		},
	});
});