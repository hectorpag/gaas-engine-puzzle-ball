ig.module('game.entities.games.option-game')
.requires(
	'game.services.sound',
	'game.app.entity'
)
.defines(function(){

	
	EntityOptionGame = Entity.extend({
		name:"OptionGame",
		size:{x:480,y:640},
		type:ig.Entity.TYPE.A,//[NONE,A,B]
		opacity:0,
		init:function(x,y,settings){
			this.parent(x,y,settings);
			if(!ig.global.wm){
				//Only do in game mode
				this.frame = this.fnSpawn(EntityOptionFrame,0,0,{overlay:this});
				this.frame.fnShow();
				this.zIndex = this.fnGetSetting('enIdx').option;
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

	EntityOptionFrame = Entity.extend({
		name:"OptionFrame",
		size:{x:309,y:297},
		animSheet: new ig.AnimationSheet('media/graphics/games/sound-frame.png',309,297),
		soundBar: new ig.Image('media/graphics/games/sound-bar.png'),
		service: new SoundService(),
		soundValue:0,
		musicValue:0,
		init:function(x,y,settings){
			this.parent(x,y,settings);
			this.addAnim( 'idle', 0.1, [0] );
			this.currentAnim = this.anims.idle;
			if(!ig.global.wm){
				//Only do in game mode
				var center = this.overlay.fnGetCenter();
				this.fnSetCenter('both',{x:center.x,y:-500});
				this.hidePos = {x:center.x,y:-500}
				this.showPos = {x:center.x,y:150};

				this.okBtn = this.fnSpawn(EntityOptionokGame,0,0,{dialog:this});
				this.fnUpdateOkBtnPos(center);

				this.closeBtn = this.fnSpawn(EntityClosedialogGame,0,0,{dialog:this});
				this.fnUpdateCloseBtnPos(center);

				var sliderCenterDiff = this.soundBar.width/2;

				this.soundValue = this.service.fnGetSfx();
				this.musicValue = this.service.fnGetBgm();
				this.oKnobs = {
					sound:this.fnSpawn(EntitySoundknobGame,0,0,{dialog:this,knobType:'sfx',centerX:287,diffCenter:sliderCenterDiff,value:this.soundValue}),
					music:this.fnSpawn(EntitySoundknobGame,0,0,{dialog:this,knobType:'bgm',centerX:287,diffCenter:sliderCenterDiff,value:this.musicValue}),
				};
				this.fnUpdateSliderPos(center,true);

				this.zIndex = this.fnGetSetting('enIdx').option + 1;
				ig.game.sortEntitiesDeferred();
			}
		},
		fnShow:function(){
			this.tween(
				{pos:{y:this.showPos.y}},
				this.fnGetSetting('dialogShowSpeed'),
				{
					easing:ig.Tween.Easing.Exponential.EaseOut,
					onUpdate:function(prop, obj, start, delta, value){
						this.overlay.opacity = this.fnGetSetting('optionOverlayDarkness') * value;
					}.bind(this),
				}
			).start();
		},
		fnHideKill:function(){
			if(ig.game.states.isPaused)
				ig.game.fnUnpause();
			this.tween(
				{pos:{y:this.hidePos.y}},
				0.25,
				{
					easing:ig.Tween.Easing.Exponential.EaseIn,
					onUpdate:function(prop, obj, start, delta, value){
						this.overlay.opacity -= this.fnGetSetting('pauseOverlayDarkness') * value;
					}.bind(this),
					onComplete:function(){
						if (this.fnGetController().name == 'MainmenuCtrl' && ig.game.getEntitiesByType(EntityButtonMoreGames).length > 0){
							ig.game.getEntitiesByType(EntityButtonMoreGames)[0].show();
						}

						this.kill();
					}.bind(this)
				}
			).start();
		},
		fnUpdateOkBtnPos:function(center){
			this.okBtn.fnSetCenter('both',center,{y:100});
		},
		fnUpdateCloseBtnPos:function(center){
			this.closeBtn.fnSetCenter('both',center,{x:148,y:-122});
		},

		fnUpdateSliderPos:function(center,init){
			this.oKnobs.sound.fnSetCenter('y',center.y-54);
			this.oKnobs.music.fnSetCenter('y',center.y+16);
		},

		fnSaveSfxBgmValue:function(){
			this.service.fnSetSfx(this.soundValue);
			this.service.fnSetBgm(this.musicValue);
		},

		update:function(){
			this.parent();
			var center = this.fnGetCenter();
			this.fnUpdateOkBtnPos(center);
			this.fnUpdateCloseBtnPos(center);
			this.fnUpdateSliderPos(center);
		},

		kill:function(){
			this.overlay.kill();
			this.okBtn.kill();
			this.closeBtn.kill();
			this.oKnobs.sound.kill();
			this.oKnobs.music.kill();
			this.parent();
		},

		draw:function(){
			this.parent();
			var center = this.fnGetCenter();
			this.fnCtxWrite(
				_STRINGS.Game.options,
				'sketch-block',
				16,
				this.fnGetSetting('color').captionBoard,
				'center',
				center.x,
				center.y - 120
			);

			this.fnCtxWrite(
				_STRINGS.Game.sound,
				'sketch-block',
				16,
				this.fnGetSetting('color').captionLeather,
				'right',
				center.x - 50,
				center.y - 50
			);

			this.fnCtxWrite(
				_STRINGS.Game.music,
				'sketch-block',
				16,
				this.fnGetSetting('color').captionLeather,
				'right',
				center.x - 50,
				center.y + 20
			);

			this.soundBar.draw(center.x - 25,center.y + 7);
			this.soundBar.draw(center.x - 25,center.y - 63);
		},
	});

	EntityOptionokGame = Entity.extend({
		name:"OptionokGame",
		size:{x:52,y:51},
		animSheet: new ig.AnimationSheet('media/graphics/sprites/button-game.png',52,51),
		type:ig.Entity.TYPE.A,//[NONE,A,B]
		cursor:'pointer',
		init:function(x,y,settings){
			this.parent(x,y,settings);
			this.addAnim( 'idle', 0.1, [5] );
			this.addAnim( 'hover', 0.1, [4] );
			this.currentAnim = this.anims.idle;
			if(!ig.global.wm){
				//Only do in game mode
				this.zIndex = this.fnGetSetting('enIdx').option + 2;
				ig.game.sortEntitiesDeferred();
			}
		},
		clicked:function(){
			this.parent();
			this.dialog.fnSaveSfxBgmValue();
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

	EntityClosedialogGame = Entity.extend({
		name:"ClosedialogGame",
		size:{x:40,y:39},
		animSheet: new ig.AnimationSheet('media/graphics/sprites/close-dialog.png',40,39),
		type:ig.Entity.TYPE.A,//[NONE,A,B]
		cursor:'pointer',
		init:function(x,y,settings){
			this.parent(x,y,settings);
			this.addAnim( 'idle', 0.1, [1] );
			this.addAnim( 'hover', 0.1, [0] );
			this.currentAnim = this.anims.idle;
			if(!ig.global.wm){
				//Only do in game mode
				this.zIndex = this.fnGetSetting('enIdx').option + 3;
				ig.game.sortEntitiesDeferred();
			}
		},
		clicked:function(){
			this.parent();
			ig.soundHandler.sfxPlayer.volume(this.dialog.service.fnGetSfx());
			ig.soundHandler.bgmPlayer.volume(this.dialog.service.fnGetBgm());
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

	EntitySoundknobGame = Entity.extend({
		name:"SoundknobGame",
		size:{x:41,y:41},
		animSheet: new ig.AnimationSheet('media/graphics/games/sound-knob.png',41,41),
		type:ig.Entity.TYPE.A,//[NONE,A,B]
		cursor:'pointer',
		init:function(x,y,settings){
			this.parent(x,y,settings);
			this.addAnim( 'idle', 0.1, [0] );
			this.currentAnim = this.anims.idle;
			if(!ig.global.wm){
				//Only do in game mode
				this.fnSetPosXByValue();
				this.zIndex = this.fnGetSetting('enIdx').option + 3;
				ig.game.sortEntitiesDeferred();
			}
		},
		fnCalculatePosXByValue:function(){
			var minPos = this.centerX - this.diffCenter;
			var deltaMax = this.diffCenter * 2;
			var currentDelta = deltaMax * this.value;
			return {min:minPos,delta:currentDelta};
		},
		fnCalculateValueByPos:function(){
			var minPos = this.centerX - this.diffCenter;
			var deltaMax = this.diffCenter * 2;
			var currentDelta = this.fnGetCenter().x - minPos;
			var result = this.fnGetHelper().fnR2D(currentDelta/deltaMax);
			if(this.knobType == 'sfx')
				this.dialog.soundValue = result;
			else
				this.dialog.musicValue = result;
			return result;
		},
		fnSetPosXByValue:function(){
			var pos = this.fnCalculatePosXByValue();
			this.fnSetCenter('x',pos.min + pos.delta); 
		},
		fnDrawBarColor:function(){
			var pos = this.fnCalculatePosXByValue();
			var x = pos.min + 2;
			var y = this.fnGetCenter().y - 6;
			var width = pos.delta;
			
            

			var color = this.fnGetSetting('color').soundLevel;
				color[color['changed']] = (255 * this.value).round();
				ig.system.context.shadowColor = 'rgba('+color.r+','+color.g+','+color.b+',1)';
				ig.system.context.shadowBlur = 10;

			// var green = (255 * this.value).round();
			ig.system.context.fillStyle = 'rgba('+color.r+','+color.g+','+color.b+',1)';
			this.fnGetHelper().fnRoundRect(ig.system.context,x,y,pos.delta,10,5,true,false);
			
            ig.system.context.shadowColor = "rgba(0,0,0,0)";
			ig.system.context.shadowBlur = 0;
			ig.system.context.restore();

		},
		fnSetSoundhandlerSfxVolume:function(){
		},
		draw:function(){
			this.fnDrawBarColor();
			this.parent();
		},

		released:function(){
			this.parent();
			if(this.knobType == 'sfx'){
				ig.soundHandler.sfxPlayer.play('button');
			}
		},
		update:function(){
			this.parent();
			if(this.pointerHold){
				var center = this.fnGetPointer().fnGetCenter();
				if(center.x < this.centerX - this.diffCenter)
					this.fnSetCenter('x',this.centerX - this.diffCenter);
				else if(center.x > this.centerX + this.diffCenter)
					this.fnSetCenter('x',this.centerX + this.diffCenter);
				else
					this.fnSetCenter('x',center.x);
			}

			
			this.value = this.fnCalculateValueByPos();
			if(this.pointerHold && this.knobType == 'bgm'){
				ig.soundHandler.bgmPlayer.volume(this.value);
			}
			else if(this.pointerHold && this.knobType == 'sfx'){
				ig.soundHandler.sfxPlayer.volume(this.value);
			}
		},
	});

});