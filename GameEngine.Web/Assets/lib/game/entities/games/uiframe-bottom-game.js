ig.module('game.entities.games.uiframe-bottom-game')
.requires(
	'game.app.entity',
	'game.services.hint'
)
.defines(function(){
	EntityUiframeBottomGame = Entity.extend({
		name:"UiframeBottomGame",
		size:{x:480,y:96},
		animSheet: new ig.AnimationSheet('media/graphics/games/ui-frame-bottom.png',480,96),
		hintService:new HintService(),
		hintRemaining:0,
		init:function(x,y,settings){
			this.parent(x,y,settings);
			this.addAnim( 'idle', 0.1, [0] );
			this.currentAnim = this.anims.idle;
			if(!ig.global.wm){
				//Only do in game mode
				this.fnUpdateHintRemaining();
				this.zIndex = this.fnGetSetting('enIdx').uiFrameBottom;
				this.fnInitButtons();
				ig.game.sortEntitiesDeferred();
			}
		},
		fnAddHint:function(){
			this.hintService.fnAdd();
			this.fnUpdateHintRemaining();
		},
		fnReduceHint:function(){
			this.hintService.fnReduce();
			this.fnUpdateHintRemaining();
		},
		fnUpdateHintRemaining:function(){
			this.hintRemaining = this.hintService.fnGet();
		},
		fnInitButtons:function(){
			var center = this.fnGetCenter();
			this.backBtn = this.fnSpawn(EntityUibuttonBack,0,0,{frame:this})
							.fnSetCenter(
								'both',
								{x:center.x,y:center.y},
								{x:-160,y:0}
							);
			this.resetBtn = this.fnSpawn(EntityUibuttonReset,0,0,{frame:this})
							.fnSetCenter(
								'both',
								{x:center.x,y:center.y},
								{x:-80,y:0}
							);
			this.undoBtn = this.fnSpawn(EntityUibuttonUndo,0,0,{frame:this})
							.fnSetCenter(
								'both',
								{x:center.x,y:center.y},
								{x:0,y:0}
							);
			this.hintBtn = this.fnSpawn(EntityUibuttonHint,0,0,{frame:this})
							.fnSetCenter(
								'both',
								{x:center.x,y:center.y},
								{x:80,y:0}
							);
			this.fastBtn = this.fnSpawn(EntityUibuttonFast,0,0,{frame:this})
							.fnSetCenter(
								'both',
								{x:center.x,y:center.y},
								{x:160,y:0}
							);
		},
		fnActivateUndo:function(){
			this.undoBtn.fnActivate();
		},
		fnDeactivateUndo:function(){
			this.undoBtn.fnDeactivate();
		},
		fnActivateFastButton:function(){
			this.fastBtn.fnActivate();
		},
		fnDisableButtonOnCompletedPath:function(){
			this.backBtn.fnDisabled();
			this.resetBtn.fnDisabled();
			this.hintBtn.fnDisabled();
			this.undoBtn.fnDeactivate();
		},
		draw:function(){
			this.parent();
			var center = this.fnGetCenter();
			this.fnCtxWrite(
				_STRINGS.Game.back,
				'sketch-block',
				14,
				this.fnGetSetting('color').captionLeather,
				'center',
				center.x-160,
				center.y + 40
			);

			this.fnCtxWrite(
				_STRINGS.Game.restart,
				'sketch-block',
				14,
				this.fnGetSetting('color').captionLeather,
				'center',
				center.x-80,
				center.y + 40
			);

			this.fnCtxWrite(
				_STRINGS.Game.undo,
				'sketch-block',
				14,
				this.fnGetSetting('color').captionLeather,
				'center',
				center.x,
				center.y + 40
			);

			this.fnCtxWrite(
				_STRINGS.Game.hints + ':'+this.hintRemaining+'',
				'sketch-block',
				14,
				this.fnGetSetting('color').captionLeather,
				'center',
				center.x + 80,
				center.y + 40
			);

			this.fnCtxWrite(
				_STRINGS.Game.faster,
				'sketch-block',
				14,
				this.fnGetSetting('color').captionLeather,
				'center',
				center.x + 160,
				center.y + 40
			);

		},
	});


	EntityUibuttonBack = Entity.extend({
		name:"UibuttonBack",
		size:{x:52,y:51},
		animSheet: new ig.AnimationSheet('media/graphics/sprites/button-game.png',52,51),
		type:ig.Entity.TYPE.A,//[NONE,A,B]
		cursor:'pointer',
		init:function(x,y,settings){
			this.parent(x,y,settings);
			this.addAnim( 'idle', 0.1, [21] );
			this.addAnim( 'hover', 0.1, [20] );
			this.currentAnim = this.anims.idle;
			if(!ig.global.wm){
				//Only do in game mode
				this.zIndex = this.fnGetSetting('enIdx').uiButtonBottom;
				ig.game.sortEntitiesDeferred();
			}
		},
		clicked:function(){
			if(this.disabled) return;
			
			this.levelSplasher = this.fnSpawn(EntityLevelSplasher,0,0,{
				alpha:0,
				onFinish:function(){
					ig.game.director.loadLevel(1);
				},
				killOnfinish:false,
			}).fnAnimateOut();
			ig.soundHandler.sfxPlayer.play('button');
		},
		over:function(){
			if(!this.disabled)
				this.currentAnim = this.anims.hover;
			else
				this.cursor = "inherit"
		},
		leave:function(){
			this.currentAnim = this.anims.idle;
		},
		fnDisabled:function(){
			this.disabled = true;
		},
	});

	EntityUibuttonReset = Entity.extend({
		name:"UibuttonReset",
		size:{x:52,y:51},
		animSheet: new ig.AnimationSheet('media/graphics/sprites/button-game.png',52,51),
		type:ig.Entity.TYPE.A,//[NONE,A,B]
		cursor:'pointer',
		init:function(x,y,settings){
			this.parent(x,y,settings);
			this.addAnim( 'idle', 0.1, [19] );
			this.addAnim( 'hover', 0.1, [18] );
			this.currentAnim = this.anims.idle;
			if(!ig.global.wm){
				//Only do in game mode
				this.zIndex = this.fnGetSetting('enIdx').uiButtonBottom;
				ig.game.sortEntitiesDeferred();
			}
		},
		clicked:function(){
			if(!this.disabled){
				this.fnGetController().fnReloadLevel();
				ig.soundHandler.sfxPlayer.play('button');
			}
		},
		over:function(){
			if(!this.disabled)
				this.currentAnim = this.anims.hover;
			else
				this.cursor = "inherit"
		},
		leave:function(){
			this.currentAnim = this.anims.idle;
		},
		fnDisabled:function(){
			this.disabled = true;
		}
	});

	EntityUibuttonUndo = Entity.extend({
		name:"UibuttonUndo",
		size:{x:52,y:51},
		animSheet: new ig.AnimationSheet('media/graphics/sprites/button-game.png',52,51),
		type:ig.Entity.TYPE.A,//[NONE,A,B]
		disabled:true,
		cursor:'pointer',
		init:function(x,y,settings){
			this.parent(x,y,settings);
			this.addAnim( 'disabled', 0.1, [15] );
			this.addAnim( 'idle', 0.1, [17] );
			this.addAnim( 'hover', 0.1, [16] );
			this.currentAnim = this.anims.disabled;
			if(!ig.global.wm){
				//Only do in game mode
				this.zIndex = this.fnGetSetting('enIdx').uiButtonBottom;
				ig.game.sortEntitiesDeferred();
			}
		},
		clicked:function(){
			this.parent();
			if(!this.disabled){
				this.fnGetController().fnUndo();
				ig.soundHandler.sfxPlayer.play('button');
			}
		},
		over:function(){
			if(!this.disabled)
				this.currentAnim = this.anims.hover;
			else
				this.cursor = 'inherit';
		},
		leave:function(){
			this.currentAnim = (!this.disabled) ? this.anims.idle : this.anims.disabled ;
			this.cursor = 'pointer';
		},
		fnActivate:function(){
			this.disabled = false;
			this.currentAnim = this.anims.idle;
		},
		fnDeactivate:function(){
			this.disabled = true;
			this.currentAnim = this.anims.disabled;
		},
	});

	EntityUibuttonHint = Entity.extend({
		name:"UibuttonHint",
		size:{x:52,y:51},
		animSheet: new ig.AnimationSheet('media/graphics/sprites/button-game.png',52,51),
		type:ig.Entity.TYPE.A,//[NONE,A,B]
		cursor:'pointer',
		init:function(x,y,settings){
			this.parent(x,y,settings);
			this.addAnim( 'idle', 0.1, [14] );
			this.addAnim( 'hover', 0.1, [13] );
			this.currentAnim = this.anims.idle;
			if(!ig.global.wm){
				//Only do in game mode
				this.zIndex = this.fnGetSetting('enIdx').uiButtonBottom;
				ig.game.sortEntitiesDeferred();
			}
		},
		over:function(){
			if(this.frame.hintRemaining>0 && !this.disabled){
				this.currentAnim = this.anims.hover;
				this.cursor = "pointer";
			}else
				this.cursor = "inherit";
		},
		leave:function(){
			this.currentAnim = this.anims.idle;
		},
		clicked:function(){
			if(this.frame.hintRemaining>0 && !this.disabled){
				this.fnGetController().board.fnShowHintTiles();
				this.frame.fnReduceHint();
				ig.soundHandler.sfxPlayer.play('hint');
			}
		},
		fnDisabled:function(){
			this.disabled = true;
		}
	});

	EntityUibuttonFast = Entity.extend({
		name:"UibuttonFast",
		size:{x:52,y:51},
		animSheet: new ig.AnimationSheet('media/graphics/sprites/button-game.png',52,51),
		type:ig.Entity.TYPE.A,//[NONE,A,B]
		disabled:true,
		cursor:'pointer',
		init:function(x,y,settings){
			this.parent(x,y,settings);
			this.addAnim( 'disabled', 0.1, [10] );
			this.addAnim( 'idle', 0.1, [12] );
			this.addAnim( 'hover', 0.1, [11] );
			this.currentAnim = this.anims.disabled;
			if(!ig.global.wm){
				//Only do in game mode
				this.zIndex = this.fnGetSetting('enIdx').uiButtonBottom;
				ig.game.sortEntitiesDeferred();
			}
		},
		clicked:function(){
			this.parent();
			if(!this.disabled){
				this.fnGetController().fnFast();
				this.disabled = true;
				this.currentAnim = this.anims.disabled ;
				this.cursor = 'inherit';
				ig.soundHandler.sfxPlayer.play('button');
			}
		},
		over:function(){
			if(!this.disabled)
				this.currentAnim = this.anims.hover;
			else
				this.cursor = 'inherit';
		},
		leave:function(){
			this.currentAnim = (!this.disabled) ? this.anims.idle : this.anims.disabled ;
			this.cursor = 'pointer';
		},
		fnActivate:function(){
			this.disabled = false;
			this.currentAnim = this.anims.idle;
		},
	});
});
