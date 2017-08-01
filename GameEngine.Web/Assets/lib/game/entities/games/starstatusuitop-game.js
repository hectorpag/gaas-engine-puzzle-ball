ig.module('game.entities.games.starstatusuitop-game')
.requires('game.app.entity')
.defines(function(){
	EntityStarstatusuitopGame = Entity.extend({
		name:"StarstatusuitopGame",
		score:false,
		arElement:[],
		init:function(x,y,settings){
			this.parent(x,y,settings);
			if(!ig.global.wm){
				//Only do in game mode
				for (var i = 0; i < this.score; i++) {
					this.fnActivateStar(i,this.fnGetSetting('starTopUiDelay') * i);
				};
				this.zIndex = this.fnGetSetting('enIdx').starstatusUiTop;
				ig.game.sortEntitiesDeferred();
			}
		},
		fnActivateStar:function(idx,iAnimDelay){
			var pos;
			pos = (idx == 0) ? {x:167,y:96}
				 :(idx == 1) ? {x:239,y:86}
				 :{x:311,y:96};
					
			this.arElement.push(this.fnSpawn(
				EntityStarstatusuitopElement,pos.x,pos.y,
				{index:idx,delay:iAnimDelay}
			));
		},
		fnAddScore:function(){
			if(this.arElement.length > 2) return;
			this.score++;
			var idx = this.arElement.length;
			this.fnActivateStar(idx,0);
		},
	});
	EntityStarstatusuitopElement = Entity.extend({
		name:"StarstatusuitopElement",
		animSheet: new ig.AnimationSheet('media/graphics/sprites/star-uitop.png',75,71),
		size:{x:75,y:71},
		init:function(x,y,settings){
			this.parent(x,y,settings);

			if(!ig.global.wm){
				//Only do in game mode
				
				if(this.index%2)
					this.addAnim( 'idle', 0.1, [0] );
				else
					this.addAnim( 'idle', 0.1, [1] );

				this.currentAnim = this.anims.idle;
				this.fnSetCenter('both',this.pos);
				this.currentAnim.scale = {x:0,y:0};
				this.fnTriggerEntrance(this.delay);
				this.zIndex = this.fnGetSetting('enIdx').starstatusUiTop + 1;
				ig.game.sortEntitiesDeferred();
			}
		},
		fnTriggerEntrance:function(delay){
			this.tween(
				{currentAnim:{scale:{x:1,y:1}}},
				0.3,
				{
					easing:ig.Tween.Easing.Sinusoidal.EaseOut,
					delay:delay,
					onUpdate:function(prop, obj, start, delta, value){
						this.currentAnim.angle = (Math.PI*2) * value;
					}.bind(this),
					onComplete:function(){}.bind(this)
				}
			).start();
		},
	});
});