/// <reference path='../../../../.vscode/impact-intel.d.ts' />

/**
 * Respnsible of ball movement path
 */
ig.module('game.entities.games.tile-game')
.requires(
	'game.app.entity',
	'game.services.hint',
	'impact.timer'
)
.defines(function(){
	EntityTileGame = Entity.extend({
		name:"TileGame",
		size:{x:98,y:98},
		animSheet: new ig.AnimationSheet('media/graphics/sprites/tiles.png',98,98),
		tileType:'wood',
		tileDir:'n',
		type:ig.Entity.TYPE.B,
		cursor:'pointer',
		iDragDiffIntent:30,
		path : [],
		connected:false,
		dirType:'cw',
		dirTypeOri:false,
		animateBall:false,
		animateBallIndex:0,
		deleteMark:true,
		spinRemoveAnimate:false,
		hintspinFixed:false,
		ballSpeed:0,
		hintService:new HintService(),
		showEndGameTimer:false,
		init:function(x,y,settings){
			this.parent(x,y,settings);
			this.fnSetAnim();
			this.currentAnim = this.anims.default;
			if(!ig.global.wm){
				//Only do in game mode
				this.ballSpeed = this.fnGetSetting('stepSpeedBase');
				if(this.star)
					this.star = this.fnSpawn(EntityStarpickGame,-500,-500);
				
				
				
				if(this.tileType == 'goal' && this.hintSpin){
					if(!this.hintService.fnGetHints()[this.fnGetController().level])
						this.hintSpin = this.fnSpawn(EntityHintspinGame,-500,-500);
					else
						this.hintSpin =  false;
				}
				this.zIndex = this.fnGetSetting('enIdx').tile;
				ig.game.sortEntitiesDeferred();
			}
		},

		fnSetStarPos:function(){
			if(this.star){
				this.star.fnSetCenter('both',this.fnGetCenter(),{
					x:this.starLocation[this.tileDir].x,
					y:this.starLocation[this.tileDir].y
				});
			}
		},

		fnSetHintspin:function(){
			if(this.hintSpin && this.tileType == 'goal' && this.hintSpin && !this.hintspinFixed){
				this.hintspinFixed = true;
				var lastPath = this.path.length - 1;
				var pivot = this.fnGetPivot();
				this.hintSpin.fnSetCenter('both',{
					x:this.path[lastPath].x+pivot.x,
					y:this.path[lastPath].y+pivot.y
				});
			}
		},

		fnSetBall:function(){
			if(this.tileType == 'start' && this.ball && this.path){
				this.ball = this.fnSpawn(EntityBallGame,0,0);
				var pivot = this.fnGetPivot();
				this.ball.fnSetCenter('both',{x:pivot.x + this.path[0].x,y:pivot.y + this.path[0].y});
				this.fnGetController().ball = this.ball;
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

		draw:function(){
			/**@type{AppEntity}*/
			var _this = this;
			_this.parent();
			//Draw id on tile just for testing
			// _this.fnCtxWrite(
			// 	_this.tileId,
			// 	'sketch-block',
			// 	30,
			// 	'white',
			// 	'center',
			// 	_this.fnGetCenter().x,
			// 	_this.fnGetCenter().y
			// );

			//Draw ball movement path
			// if(this.path.length > 0){
			// 	var center = this.fnGetCenter();
			// 	var ctx = ig.system.context;
			// 	var pivot = this.fnGetPivot();
			// 	ctx.beginPath();
			// 	ctx.lineWidth = 2;
			// 	for (var i = 0; i < this.path.length; i++) {
			// 		if(i == 0)
			// 			ctx.moveTo(this.path[i].x+pivot.x,this.path[i].y+pivot.y);
			// 		else
			// 			ctx.lineTo(this.path[i].x+pivot.x,this.path[i].y+pivot.y);
			// 	};
			// 	ctx.strokeStyle = (this.dirType == 'cw') ? 'green' : 'red';
			// 	ctx.stroke();
			// 	ctx.closePath();
			// 	ctx.restore();
			// }
			
		},

		fnChangeDirType:function(dirType){
			if(this.dirType != dirType){
				this.dirType = dirType;
				this.path = this.path.reverse();
			}
		},

		fnSetPath:function(){
			if(this.tileType == 'wood-empty') return;
			this.path = [];
			var center = this.fnGetCenter();
			var halfSize = {x:this.size.x/2,y:this.size.y/2};
			var pivot = {};
			var path = [];
			var aglLeft = Math.PI; aglTop = 3*Math.PI/2; aglRight = Math.PI*2; aglBottom = Math.PI/2;
			var strightBaseStep = this.fnGetSetting('stepStrightBase') ;
			var arcBaseStep = this.fnGetSetting('stepArcBase');
			var strightPadStep = this.fnGetSetting('stepStrightPad');
			var strightSizeStep = this.fnGetSetting('stepStrightSizeMin');

			switch(this.tileDir){
				case 'lt':
					this.fnCreateArcPath(halfSize.x,arcBaseStep,aglRight,Math.PI/2);
				break;
				case 'lb':
					this.fnCreateArcPath(halfSize.x,arcBaseStep,aglTop,Math.PI/2);
				break;
				case 'rb':
					this.fnCreateArcPath(halfSize.x,arcBaseStep,aglLeft,Math.PI/2);
				break;
				case 'rt':
					this.fnCreateArcPath(halfSize.x,arcBaseStep,aglBottom,Math.PI/2);
				break;
				case 'v':
					this.fnCreateStrightPath(this.tileDir,strightBaseStep,this.size.x);
				break;
				case 'h':
					this.fnCreateStrightPath(this.tileDir,strightBaseStep,this.size.x);
				break;
				case 'l':
					this.fnCreateStrightPath(this.tileDir,strightBaseStep-strightPadStep,this.size.x-strightSizeStep);
					if(this.tileType == 'goal')
						this.fnChangeDirType('ccw');
				break;
				case 'r':
					this.fnCreateStrightPath(this.tileDir,strightBaseStep-strightPadStep,this.size.x-strightSizeStep);
					if(this.tileType == 'start')
						this.fnChangeDirType('ccw');
				break;
				case 't':
					this.fnCreateStrightPath(this.tileDir,strightBaseStep-strightPadStep,this.size.y-strightSizeStep);
					if(this.tileType == 'goal')
						this.fnChangeDirType('ccw');
				break;
				case 'b':
					this.fnCreateStrightPath(this.tileDir,strightBaseStep-strightPadStep,this.size.y-strightSizeStep);
					if(this.tileType == 'start')
						this.fnChangeDirType('ccw');
				break;
			}
			this.fnSetBall();
		},

		fnGetPivot:function(){
			var strightSizeStep = this.fnGetSetting('stepStrightSizeMin');
			var center = this.fnGetCenter();
			var bottomRight = this.fnGetBottomRight();
			var results = {x:0,y:0};
			switch(this.tileDir){
				case 'lt':
					results = {x:this.pos.x,y:this.pos.y}
				break;
				case 'lb':
					results = {x:this.pos.x,y:bottomRight.y}
				break;
				case 'rt':
					results = {x:bottomRight.x,y:this.pos.y}
				break;
				case 'rb':
					results = {x:bottomRight.x,y:bottomRight.y}
				break;
				//-------
				case 'v':
					results = {x:center.x,y:this.pos.y}
				break;
				case 't':
					results = {x:center.x,y:this.pos.y+strightSizeStep}
				break;
				case 'b':
					results = {x:center.x,y:this.pos.y}
				break;
				//-------
				case 'h':
					results = {x:this.pos.x,y:center.y}
				break;
				case 'l':
					results = {x:this.pos.x+strightSizeStep,y:center.y}
				break;
				case 'r':
					results = {x:this.pos.x,y:center.y}
				break;
			}
			return results;
		},

		fnCreateStrightPath:function(type,steps,max){
			if(type == 'v' || type == 't' || type == 'b')
				for (var i = 0; i <= steps; i++)
						this.path.push({x:0,y:(i/steps)*max});
			else if(type == 'h' || type == 'l' || type == 'r')
				for (var i = 0; i <= steps; i++)
					this.path.push({x:(i/steps)*max,y:0});
		},

		fnCreateArcPath:function(radius, steps, startAngle, maxDeltaAngle){
			var currentAngle = 0;
			var nextAngle = 0;
			for (var i = 0; i < steps; i++) {
				currentAngle = 2 * Math.PI * i / steps;
				nextAngle = 2 * Math.PI * (i+1) / steps
				this.path.push({
					x:(radius * Math.cos(startAngle + currentAngle)),
					y:(radius * Math.sin(startAngle + currentAngle)),
				});
				if(Math.abs(2 * Math.PI * (i+1) / steps) > maxDeltaAngle){
					this.path.push({
						x:(radius * Math.cos(startAngle + maxDeltaAngle)),
						y:(radius * Math.sin(startAngle + maxDeltaAngle)),
					});
					break;
				}
			}
		},

		clicked:function(){
			this.parent();
			if(this.tileType != 'wood' && this.tileType != 'wood-empty') return;
			this.prePointerPos = this.fnGetPointer().fnGetCenter();
			this.prePointerPos = {x:this.prePointerPos.x,y:this.prePointerPos.y};
			this.beginDrag = true;
		},

		over:function(){
			if(this.tileType == 'wood' || this.tileType == 'wood-empty')
				this.cursor = 'pointer';
			else
				this.cursor = 'inherit';
			this.parent();
		},
		
		/**Used only in development. to check tile shuffling. Called by fnDetectTileMove */
		fnTestCheckTileStep:function(direction){
			var tileDir,step;
			switch (direction) {
				case 'top':
					tileDir = 'y', step = -1;
					break;

				case 'bottom':
					tileDir = 'y', step = 1;
					break;

				case 'left':
					tileDir = 'x', step = -1;
					break;

				case 'right':
					tileDir = 'x', step = 1;
					break;
			
				default:
					break;
			}
			return {
				id:this.tileId,
				tileDir:tileDir,
				step:step
			}
		},

		fnDetectTileMove:function(){
        	/**@type{AppEntity}*/
			var _this = this;
			//Tile drag detection
			//If error again apply timer to limit drag detection
        	// if(this.bMoveAnimate && this.beginDrag){
			// 	_this.fnGetPointer().fnLetGo();
        	// 	this.beginDrag = false;
			// 	return;
			// }
			if(this.pointerHold && !this.bMoveAnimate && this.beginDrag){
				var direction = this.fnPredictDragIntent();
				if(direction){
					//Check tutorial
					if(this.fnGetController().level == 0 && this.fnGetController().tutorial && (direction != 'top' || this.tileId != 'c')) 
						return;
					if(this.fnGetController().level == 0 && this.fnGetController().tutorial){
						this.fnGetController().tutorialService.fnSet();
						this.fnGetController().tutorial.kill();
					}
					
					//Check available next grid
					var griDir = (direction == 'top') ? 	{x:this.gridAx.x, y:this.gridAx.y-1}
								:(direction == 'bottom') ? 	{x:this.gridAx.x, y:this.gridAx.y+1}
								:(direction == 'left') ? 	{x:this.gridAx.x-1, y:this.gridAx.y}
								:{x:this.gridAx.x+1, y:this.gridAx.y}
					var nextGrid = _this.board.fnGetGrid(griDir.x,griDir.y);

					if(nextGrid && nextGrid.bEmpty){
						//Get tile drag direction for developing layout
						//Kick animation
						_this.fnGetPointer().fnLetGo();
        				this.beginDrag = false;
						_this.board.fnHideHintTiles();
						this.board.fnMoveTile(this.tileId,direction,true);

						//Check hints
						//Deprecated use predifined maxMove for hint instead
						// if(ig.game.namedEntities.HintspinGame){
						// 	if(_this.board.arHintMoves){
						// 		if(_this.board.arHintMoves.length == 0){
						// 			ig.game.namedEntities.HintspinGame.addHint = false;
						// 			ig.game.namedEntities.HintspinGame.kill();
						// 		}
						// 		_this.board.arHintMoves.shift();
						// 	}
						// }
						
						if(
							ig.game.namedEntities.HintspinGame &&
							_this.fnGetController().stepHistory.length 
							> _this.fnGetSetting('maxMoves')[_this.fnGetController().level]
						){
							ig.game.namedEntities.HintspinGame.addHint = false;
							ig.game.namedEntities.HintspinGame.kill();
						}
						
					}
				}
			}
		},

		fnAnimateBall:function(){
			//Ball move to goal animation
			if(this.animateBall && this.ball && this.ball.name == 'BallGame'){
				if(this.animateBallIndex > this.path.length - 1 && this.tileType == 'goal'){
					var pivot = this.fnGetPivot();
					this.ball.fnSetCenter('both',{
						x:pivot.x + this.path[this.path.length - 1].x,
						y:pivot.y + this.path[this.path.length - 1].y,
					});
					this.fnStopAnimateBall();
					//Show endgame dialog
					this.showEndGameTimer = new ig.Timer(this.fnGetSetting('endGameDelay'));
				}
				else if(this.animateBallIndex >= this.path.length - 1 && this.tileType != 'goal'){
					var nextTile = this.board.fnFindNextTile(this);
					nextTile.fnTriggerAnimateBall(this.ball);
					this.fnStopAnimateBall();
				}
				else{
					var pivot = this.fnGetPivot();
					this.ball.fnSetCenter('both',{
						x:pivot.x + this.path[this.animateBallIndex].x,
						y:pivot.y + this.path[this.animateBallIndex].y,
					});
					this.animateBallIndex+=this.ballSpeed;
				}
			}
		},

        update:function(){			
			this.parent();

        	if(this.fnGetState().isPaused) return;

        	this.fnSetStarPos();
        	this.fnSetHintspin();
			this.fnDetectTileMove();
        	this.fnAnimateBall();
			if(this.showEndGameTimer && this.showEndGameTimer.delta()>0){
				this.showEndGameTimer = false;
				// this.fnGetController().fnShowEndGameDialog();
				this.fnGetController().fnShowQuestionDialog(); //rubin8
				
			}
        },

        fnAnimateMove:function(centerPos){
        	var pos = this.fnGetPosByCenter(centerPos);
        	this.bMoveAnimate = true;
			this.zIndex ++;
			ig.game.sortEntitiesDeferred();
        	this.tween(
        		{pos:{x:pos.x,y:pos.y}},
        		0.1,
        		{
        			easing:ig.Tween.Easing.Back.EaseOut,
        			//Do after animation
        			onComplete:function(){
        				this.bMoveAnimate = false;
						this.zIndex --;
						ig.game.sortEntitiesDeferred();
        				this.fnGetController().board.fnTriggerCompletedTiles();
						ig.soundHandler.sfxPlayer.play('tile');
        			}.bind(this)
        		}
        	).start();
        },

        fnPredictDragIntent:function(){
        	var pointerPos = this.fnGetPointer().fnGetCenter();
        	var distance = this.fnGetHelper().fnGetDistance(this.prePointerPos,{x:pointerPos.x,y:pointerPos.y});
        	if(distance > this.iDragDiffIntent){
        		var dx  = (pointerPos.x - this.prePointerPos.x);
        		var dy  = (pointerPos.y - this.prePointerPos.y);
        		var ax  = (Math.abs(dx) > Math.abs(dy)) ? 'x' : 'y';
        		return (ax == 'x' && dx > 0) ? 'right'
        				: (ax == 'x' && dx < 0) ? 'left'
        				: (ax == 'y' && dy > 0) ? 'bottom'
        				: 'top';

        	}
        	return false;
        },

        fnTriggerAnimateBall:function(ball){
        	if(!ball || ball.name != 'BallGame') return;
        	this.animateBall = true;
        	this.ball = ball;

			var pivot = this.fnGetPivot();
			this.ball.fnSetCenter('both',{
				x:pivot.x + this.path[this.animateBallIndex].x,
				y:pivot.y + this.path[this.animateBallIndex].y,
			});
			this.animateBallIndex++;
        },

        fnStopAnimateBall:function(){
			if(this.tileType == 'goal'){
				ig.soundHandler.sfxPlayer.soundList.ballroll.stop();
				ig.soundHandler.sfxPlayer.play('tile');
			}
        	this.animateBall = false;
        	this.animateBallIndex = 0;
        	delete(this.ball);
        },

        fnTriggerKill:function(delay){
        	this.zIndex++;
        	ig.game.sortEntitiesDeferred();

        	this.tween(
        		{
					currentAnim:{scale:{x:0,y:0}}
				},
        		0.5,
        		{
        			easing:ig.Tween.Easing.Back.EaseIn,
        			delay:delay,
        			onUpdate:function(prop, obj, start, delta, value){
        				if(porp = 'currentAnim'){
        					this.currentAnim.angle += (Math.PI/4) * ig.system.tick;
							if(this.star){
								this.star.fnTriggerShrink();
								this.star = false;
							}
        				}
        			}.bind(this),
        			onComplete:function(){
        				if(this.triggerBallMove)
        					this.board.fnTriggerBallMove();
        				this.kill();
        			}.bind(this)
        		}
        	).start();
        },

        fnPause:function(){
        	this.pauseTweens();
        },
		
        fnUnpause:function(){
        	this.resumeTweens();
        },

        starLocation:{
        	'h':{x:0,y:0},
        	'v':{x:-1,y:0},
        	'rt':{x:10,y:-18},
        	'rb':{x:10,y:12},
        	'lb':{x:-12,y:10},
        	'lt':{x:-10,y:-18},
        },
		fnUpdateHintPos:function(){
			/**@type{AppEntity}*/
			var _this = this;
			/**@type{AppEntity}*/
			var hint = _this.tilehint;
			
			hint.fnSetCenter('both',_this.fnGetCenter());
		},
	});
});