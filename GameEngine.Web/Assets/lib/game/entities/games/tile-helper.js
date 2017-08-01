ig.module('game.entities.games.tile-helper')
.requires('game.app.entity')
.defines(function(){
	EntityTileHelper = Entity.extend({
		name:"TileHelper",
		size:{x:98,y:98},
		animSheet: new ig.AnimationSheet('media/graphics/sprites/tiles.png',98,98),
		type:ig.Entity.TYPE.B,
		init:function(x,y,settings){
			this.parent(x,y,settings);
			// this.addAnim( 'idle', 0.1, [20] );
			// this.currentAnim = this.anims.idle;
			if(!ig.global.wm){
				//Only do in game mode
				this.zIndex = this.fnGetSetting('enIdx').tile;
				this.fnSetCenter('both',ig.system.width/2,ig.system.height/2);
				this.fnSetAnim();
				ig.game.sortEntitiesDeferred();
			}
		},
		fnSetAnim:function(){
			if(this.tileType == 'wood'){
				switch(this.tileDir){
					case 'h':
						this.addAnim( 'default', 0.1, [15] );
					break;
					case 'v':
						this.addAnim( 'default', 0.1, [14] );
					break;
					case 'rt':
						this.addAnim( 'default', 0.1, [16] );
					break;
					case 'lt':
						this.addAnim( 'default', 0.1, [17] );
					break;
					case 'lb':
						this.addAnim( 'default', 0.1, [18] );
					break;
					case 'rb':
						this.addAnim( 'default', 0.1, [19] );
					break;
				}
			}
			else if(this.tileType == 'wood-empty'){
				this.addAnim( 'default', 0.1, [20] );
			}
			else if(this.tileType == 'start'){
				switch(this.tileDir){
					case 't':
						this.addAnim( 'default', 0.1, [4] );
					break;
					case 'b':
						this.addAnim( 'default', 0.1, [5] );
					break;
					case 'r':
						this.addAnim( 'default', 0.1, [6] );
					break;
					case 'l':
						this.addAnim( 'default', 0.1, [7] );
					break;
				}
			}
			else if(this.tileType == 'metal'){
				switch(this.tileDir){
					case 'h':
						this.addAnim( 'default', 0.1, [9] );
					break;
					case 'v':
						this.addAnim( 'default', 0.1, [8] );
					break;
					case 'rt':
						this.addAnim( 'default', 0.1, [11] );
					break;
					case 'lt':
						this.addAnim( 'default', 0.1, [10] );
					break;
					case 'lb':
						this.addAnim( 'default', 0.1, [12] );
					break;
					case 'rb':
						this.addAnim( 'default', 0.1, [13] );
					break;
				}
			}
			else if(this.tileType == 'goal'){
				switch(this.tileDir){
					case 't':
						this.addAnim( 'default', 0.1, [0] );
					break;
					case 'b':
						this.addAnim( 'default', 0.1, [1] );
					break;
					case 'r':
						this.addAnim( 'default', 0.1, [2] );
					break;
					case 'l':
						this.addAnim( 'default', 0.1, [3] );
					break;
				}
			}
		},
		update:function(){
			if(this.pointerHold){
				this.fnSetCenter('both',this.fnGetPointer().fnGetCenter())
				console.log(this.fnGetCenter());
			}
		}
	});
});