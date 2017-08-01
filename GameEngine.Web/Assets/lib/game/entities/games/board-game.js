/// <reference path='../../../../.vscode/impact-intel.d.ts' />

//last used for object index = g
ig.module('game.entities.games.board-game')
.requires('game.app.entity')
.defines(function(){
	EntityBoardGame = Entity.extend({
		name:"BoardGame",
		size:{x:480,y:640},
		animSheet: new ig.AnimationSheet('media/graphics/games/board.png',480,640),
		oTile:{},
		iMaxCol:3,
		iMaxRow:3,
		arHintMoves:[],
		arHintTiles:[],
		arOHintTiles:[],
		hintShowDelay:0.1,
		ballRollPlay:false,
		init:function(x,y,settings){
			this.parent(x,y,settings);
			this.addAnim( 'idle', 0.1, [0] );
			this.currentAnim = this.anims.idle;
			if(!ig.global.wm){
				//Only do in game mode
				this.zIndex = this.fnGetSetting('enIdx').tileBoard;
				ig.game.sortEntitiesDeferred();
			}
		},

		fnAddTile:function(oTile){
			if(this.oTile[oTile.tileId]) return false;
			if(this.fnGetTileByPos(oTile.gridAx.x,oTile.gridAx.y)) return false;
			if(this.fnIsOutsideTile(oTile)) return false;
			this.oTile[oTile.tileId] = oTile;
			oTile.board = this;
		},

		fnGetTileByPos:function(iX,iY){
			var result = false;
			for(a in this.oTile)
				if(this.oTile[a].gridAx.x == iX && this.oTile[a].gridAx.y == iY){
					result = this.oTile[a];
					break;
				}
			return result;
		},

		fnIsOutsideTile:function(oTile){
			return (
				oTile.gridAx.x < 0
				|| oTile.gridAx.x > this.iMaxCol
				|| oTile.gridAx.y < 0
				|| oTile.gridAx.y > this.iMaxRow
			) ? true : false
		},

		fnInitArrangeTiles:function(){
			for(b in this.oTile){
				var grid = this.fnGetGrid(this.oTile[b].gridAx.x,this.oTile[b].gridAx.y);
				if(grid.bEmpty){
					this.oTile[b].fnSetCenter('both',{x:grid.pos.x,y:grid.pos.y});
					this.fnSetGrid(this.oTile[b].gridAx.x,this.oTile[b].gridAx.y);
				}
				
				//Store hint tiles
				if(this.oTile[b].isPath){
					this.arHintTiles.push({
						tileDir:this.oTile[b].tileDir,
						centerPos:{
							x:grid.pos.x,
							y:grid.pos.y,
						}
					});
				}
			}
			this.fnInitTilesPath();
		},

		fnInitTilesPath:function(){
			for(e in this.oTile)
				this.oTile[e].fnSetPath();
		},

		fnShuffle:function(arLayoutShuffle){
			if(!arLayoutShuffle) return;
			for (var index = 0; index < arLayoutShuffle.length; index++) {
				//Move tile position
				var element = arLayoutShuffle[index];
				var oTile = this.oTile[element.id];
				this.fnUnsetGrid(oTile.gridAx.x,oTile.gridAx.y);
				oTile.gridAx[element.tileDir] += element.step
				this.fnSetGrid(oTile.gridAx.x,oTile.gridAx.y);
				var grid = this.fnGetGrid(oTile.gridAx.x, oTile.gridAx.y);
				oTile.fnSetCenter('both',{x:grid.pos.x,y:grid.pos.y});
			}
			//Store hint step
			this.arHintMoves = ig.copy(arLayoutShuffle).reverse();
		},

		fnHideHintTiles:function(){
			if(this.arOHintTiles.length > 0){
				for (var index = 0; index < this.arOHintTiles.length; index++) {
					var element = this.arOHintTiles[index];
					element.kill();
				}
				this.arOHintTiles = [];
			}
		},

		fnShowHintTiles:function(){
			this.fnHideHintTiles();
			for (var index = 0; index < this.arHintTiles.length; index++) {
				var element = this.arHintTiles[index];
				this.arOHintTiles.push(this.fnSpawn(EntityTilehintGame,0,0,{
					tileDir:element.tileDir,
					centerPos:element.centerPos,
					delay:this.hintShowDelay * index,
				}));
			}
		},

		fnMoveTile:function(tileId,sDir,bAddStepHistory){
			if(this.fnGetController().pathCompleted) return;
			var oTile = this.oTile[tileId];
			switch(sDir){
				case 'top':
					if(oTile.gridAx.y == 0) return;
					var nextGrid = this.fnGetGrid(oTile.gridAx.x,oTile.gridAx.y - 1);
					if(nextGrid.bEmpty){
						if(bAddStepHistory)
							this.fnGetController().fnAddMoveHistory(tileId,sDir);
						this.fnGetController().uiTop.fnAnimateFontMoves();
						oTile.gridAx.y--;
						this.fnSetGrid(oTile.gridAx.x,oTile.gridAx.y);
						this.fnUnsetGrid(oTile.gridAx.x,oTile.gridAx.y + 1);
						oTile.fnAnimateMove(nextGrid.pos);
					}
				break;
				case 'bottom':
					if(oTile.gridAx.y > this.iMaxRow) return;
					var nextGrid = this.fnGetGrid(oTile.gridAx.x,oTile.gridAx.y + 1);
					if(nextGrid.bEmpty){
						if(bAddStepHistory)
							this.fnGetController().fnAddMoveHistory(tileId,sDir);
						this.fnGetController().uiTop.fnAnimateFontMoves();
						oTile.gridAx.y++;
						this.fnSetGrid(oTile.gridAx.x,oTile.gridAx.y);
						this.fnUnsetGrid(oTile.gridAx.x,oTile.gridAx.y - 1);
						oTile.fnAnimateMove(nextGrid.pos);
					}
				break;
				case 'left':
					if(oTile.gridAx.x == 0) return;
					var nextGrid = this.fnGetGrid(oTile.gridAx.x - 1,oTile.gridAx.y);
					if(nextGrid.bEmpty){
						if(bAddStepHistory)
							this.fnGetController().fnAddMoveHistory(tileId,sDir);
						this.fnGetController().uiTop.fnAnimateFontMoves();
						oTile.gridAx.x--;
						this.fnSetGrid(oTile.gridAx.x,oTile.gridAx.y);
						this.fnUnsetGrid(oTile.gridAx.x + 1,oTile.gridAx.y);
						oTile.fnAnimateMove(nextGrid.pos);
					}
				break;
				case 'right':
					if(oTile.gridAx.x > this.iMaxRow) return;
					var nextGrid = this.fnGetGrid(oTile.gridAx.x + 1,oTile.gridAx.y);
					if(nextGrid.bEmpty){
						if(bAddStepHistory)
							this.fnGetController().fnAddMoveHistory(tileId,sDir);
						this.fnGetController().uiTop.fnAnimateFontMoves();
						oTile.gridAx.x++;
						this.fnSetGrid(oTile.gridAx.x,oTile.gridAx.y);
						this.fnUnsetGrid(oTile.gridAx.x - 1,oTile.gridAx.y);
						oTile.fnAnimateMove(nextGrid.pos);
					}
				break;
			}
		},

		fnAsignConnectedTiles:function(startTile,arTiles){
			var result = false;
			arTiles = arTiles || [];
			if(!startTile){
				for(c in this.oTile){
					if(this.oTile[c].tileType == 'start')
						startTile = this.oTile[c];
					break;
				}
				if(!startTile) 
					return result;
				else{
					arTiles.push(startTile);
					if(!this.fnAsignConnectedTiles(startTile,arTiles))
						result = false;
					else
						result = arTiles;
				}
			}else{
				var nexTile = this.fnFindNextTile(startTile);
				if(nexTile){
					arTiles.push(nexTile);
					var check = this.fnAsignConnectedTiles(nexTile,arTiles);
					if(nexTile.tileType == 'goal')
						return arTiles;
					else if(!check)
						return false;
					else
						result = arTiles;
				}else
					result = false;
			}
			return result;
		},

		fnFindNextTile:function(startTile){
			var result = false;
			if(startTile.tileType == 'goal'){}
			else{
				var tileType = startTile.tileType;
					tileType = (tileType == 'metal') ? 'wood':tileType;
				var td = this.tileDirection[tileType] || false;
					if(!td) return result;
					td = td[startTile.tileDir] || false;
					if(!td) return result;
					td = td[startTile.dirType] || false;
					if(!td) return result;

				var nextGrid = this.fnGetGrid(startTile.gridAx.x + td.nextGrid.x , startTile.gridAx.y + td.nextGrid.y);
				if(!nextGrid || nextGrid.bEmpty) return result;
				result = this.fnGetTileByPos(nextGrid.ax.x,nextGrid.ax.y);

				if(result && !td.nextDir[result.tileDir]){
					return false;	
				}

				if(result && result.tileType == 'goal')
					result = result;
				else{
					if(result.tileType!=='start')
						result.fnChangeDirType(td.nextDir[result.tileDir]);
				}
			}
			return result;
		},

		fnFindStartTile:function(){
			var result = false;
			for(d in this.oTile){
				if(this.oTile[d].tileType == 'start'){
					result = this.oTile[d];
					break;
				}
			}
			return result;
		},

		/**Trigger completed tiles before showing end game dialog */
		fnTriggerCompletedTiles:function(){
			var check = this.fnAsignConnectedTiles();
			if(!check) return;
			
			ig.soundHandler.sfxPlayer.play('win');
			var message = _STRINGS.Game.pathcomplete;
				message += (ig.game.namedEntities.HintspinGame) ? ' '+_STRINGS.Game.hintplus : '';
			var customSize = (ig.game.namedEntities.HintspinGame) ? true:false;
			if(this.fnGetSetting('bShowTransitionText'))
				this.fnSpawn(EntityTransitiontextGame,0,0,{board:this,checkResult:check, message:message, customSize:customSize});
			else
				this.fnDeleteUncompleteTiles(check);//Run after path complete message shown
			this.fnGetController().pathCompleted = true;
			this.fnGetController().uiFooter.fnActivateFastButton();
			this.fnGetController().uiFooter.fnDisableButtonOnCompletedPath();
		},

		fnTriggerFast:function(){
			for(g in this.oTile)
				this.oTile[g].ballSpeed = this.fnGetSetting('stepSpeedQuick');
		},
		
		fnTriggerBallMove:function(){
			this.ballRollPlay = true;
			ig.soundHandler.sfxPlayer.soundList['ballroll']._loop = true;
			ig.soundHandler.sfxPlayer.play('ballroll');
			var startTile = this.fnFindStartTile();
			startTile.fnTriggerAnimateBall(startTile.ball);
		},

		fnDeleteUncompleteTiles:function(oTile){
			for (var i = 0; i < oTile.length; i++) {
				oTile[i].deleteMark = false;
			};
			var i = 0;
			var tile = false;
			for(f in this.oTile){
				if(this.oTile[f].deleteMark){
					this.oTile[f].fnTriggerKill(i);
					i+=0.05;
					tile = this.oTile[f];
				}
			}
			if(!tile)
				this.fnTriggerBallMove();
			else
				tile.triggerBallMove = true;
		},
		//Grid handler
		fnGetGrid:function(iX,iY){
			for (var i = this.arGrid.length - 1; i >= 0; i--)
				if(this.arGrid[i].ax.x ==  iX && this.arGrid[i].ax.y == iY)
					return this.arGrid[i];
			return false;
		},

		fnSetGrid:function(iX,iY){
			for (var i = this.arGrid.length - 1; i >= 0; i--)
				if(this.arGrid[i].ax.x ==  iX && this.arGrid[i].ax.y == iY)
					this.arGrid[i].bEmpty = false;
		},

		fnUnsetGrid:function(iX,iY){
			for (var i = this.arGrid.length - 1; i >= 0; i--)
				if(this.arGrid[i].ax.x ==  iX && this.arGrid[i].ax.y == iY)
					this.arGrid[i].bEmpty = true;
		},

		fnPause:function(){
			if(this.ballRollPlay)
				ig.soundHandler.sfxPlayer.soundList.ballroll.stop()
		},
		fnUnpause:function(){
			if(this.ballRollPlay){
				ig.soundHandler.sfxPlayer.soundList['ballroll']._loop = true;
				ig.soundHandler.sfxPlayer.play('ballroll');
			}
		},

		//Grid setting is placed at the bottom since space consuming
		arGrid:[
			{ax:{x:0,y:0},pos:{x:93,y:201},bEmpty:true,},
			{ax:{x:1,y:0},pos:{x:191,y:201},bEmpty:true,},
			{ax:{x:2,y:0},pos:{x:289,y:201},bEmpty:true,},
			{ax:{x:3,y:0},pos:{x:387,y:201},bEmpty:true,},
			{ax:{x:0,y:1},pos:{x:93,y:299},bEmpty:true,},
			{ax:{x:1,y:1},pos:{x:191,y:299},bEmpty:true,},
			{ax:{x:2,y:1},pos:{x:289,y:299},bEmpty:true,},
			{ax:{x:3,y:1},pos:{x:387,y:299},bEmpty:true,},
			{ax:{x:0,y:2},pos:{x:93,y:397},bEmpty:true,},
			{ax:{x:1,y:2},pos:{x:191,y:397},bEmpty:true,},
			{ax:{x:2,y:2},pos:{x:289,y:397},bEmpty:true,},
			{ax:{x:3,y:2},pos:{x:387,y:397},bEmpty:true,},
			{ax:{x:0,y:3},pos:{x:93,y:495},bEmpty:true,},
			{ax:{x:1,y:3},pos:{x:191,y:495},bEmpty:true,},
			{ax:{x:2,y:3},pos:{x:289,y:495},bEmpty:true,},
			{ax:{x:3,y:3},pos:{x:387,y:495},bEmpty:true,},
		],

		tileDirection:{
			'start':{
				't':{
					'cw':{nextGrid:{x:0,y:1},'nextDir':{'v':'cw','lt':'cw','rt':'ccw'}}
				},
				'b':{
					'ccw':{nextGrid:{x:0,y:-1},'nextDir':{'v':'ccw','lb':'ccw','rb':'cw'}}
				},
				'l':{
					'cw':{nextGrid:{x:1,y:0},'nextDir':{'h':'cw','lb':'cw','lt':'ccw'}}
				},
				'r':{
					'ccw':{nextGrid:{x:-1,y:0},'nextDir':{'h':'ccw','rb':'ccw','rt':'cw'}}
				},
			},
			'wood':{
				'h':{
					'cw':{'nextGrid':{x:1,y:0},'nextDir':{'h':'cw','r':'cw','lb':'cw','lt':'ccw'}},
					'ccw':{'nextGrid':{x:-1,y:0},'nextDir':{'h':'ccw','l':'ccw','rb':'ccw','rt':'cw'}},
				},
				'v':{
					'cw':{'nextGrid':{x:0,y:1},'nextDir':{'v':'cw','b':'cw','lt':'cw','rt':'ccw'}},
					'ccw':{'nextGrid':{x:0,y:-1},'nextDir':{'v':'ccw','t':'ccw','lb':'ccw','rb':'cw'}},
				},
				'rt':{
					'cw':{'nextGrid':{x:0,y:-1},'nextDir':{'v':'ccw','t':'ccw','lb':'ccw','rb':'cw'}},
					'ccw':{'nextGrid':{x:1,y:0},'nextDir':{'h':'cw','r':'cw','lb':'cw','lt':'ccw'}},
				},
				'rb':{
					'cw':{'nextGrid':{x:1,y:0},'nextDir':{'h':'cw','r':'cw','lb':'cw','lt':'ccw'}},
					'ccw':{'nextGrid':{x:0,y:1},'nextDir':{'v':'cw','b':'cw','lt':'cw','rt':'ccw'}},
				},
				'lb':{
					'cw':{'nextGrid':{x:0,y:1},'nextDir':{'v':'cw','b':'cw','lt':'cw','rt':'ccw'}},
					'ccw':{'nextGrid':{x:-1,y:0},'nextDir':{'h':'ccw','l':'ccw','rb':'ccw','rt':'cw'}},
				},
				'lt':{
					'cw':{'nextGrid':{x:-1,y:0},'nextDir':{'h':'ccw','l':'ccw','rb':'ccw','rt':'cw'}},
					'ccw':{'nextGrid':{x:0,y:-1},'nextDir':{'v':'ccw','t':'ccw','lb':'ccw','rb':'cw'}},
				},
			}
		}


	});
});