ig.module('game.entities.controllers.game-ctrl')
.requires(
	'game.entities.games.board-game',
	'game.entities.games.tile-game',
	'game.entities.games.tile-helper',
	'game.entities.games.ball-game',
	'game.entities.games.starpick-game',
	'game.entities.games.hintspin-game',
	'game.entities.games.uiframe-bottom-game',
	'game.entities.games.uiframe-top-game',
	'game.entities.games.paused-game',
	'game.entities.games.option-game',
	'game.entities.games.starstatusuitop-game',
	'game.entities.games.enddialog-game',
	'game.entities.games.question-game',//rubin8
	'game.entities.games.levelselect-game',
	'game.entities.games.tilehint-game',
	'game.entities.games.tutorial-game',
	'game.entities.games.transitiontext-game',
	'game.entities.level-splasher',

	'game.services.level',
	'game.services.score',
	'game.services.bestpath',
	'game.services.hint',
	'game.services.tutorial',

	'game.app.controller'
)
.defines(function(){
	EntityGameCtrl = Controller.extend({
		name:"GameCtrl",
		pathCompleted:false,
		stepHistory:[],
		bestPath:new BestpathService(),
		level:new LevelService(),
		score:new ScoreService(),
		tutorialService: new TutorialService(),
		/**
		 * Current score is the actual score the users got.
		 * i.eg 
		 * Best score is 2, but users got only 1, then the star will show 1 on the game dialog
		 * However if the users got max score (3) then the storage will be updated to 3 
		 */
		currentScore:0,
		tutorial:false,
		init:function(x,y,settings){
			this.fnSpawn(EntityLevelSplasher,0,0,{alpha:1,
				onFinish:function(){
					if(this.fnGetSetting('bShowTransitionText'))
					this.fnSpawn(EntityTransitiontextGame,0,0,{message: _STRINGS.Game.go});
				}
			}).fnAnimateIn();
			this.parent(x,y,settings);
		},
		ready:function(){
			this.parent();
			if(!ig.global.wm){
				//Only do in game mode
				
				this.fnGetState().isPusedReset();
				this.fnSetLevelLayout();
				this.level = this.level.fnLoadLevel().fnGetLevel();
				
				this.tutorial = (this.level === 0 && !this.tutorialService.fnGet()) || false;
				this.score.fnLoad();
				this.bestPath.fnLoad(); 
				/*alert("here befor load Board");*/
				//Set board elements
				this.board = this.fnSpawn(EntityBoardGame,0,0);
				this.uiFooter = this.fnSpawn(EntityUiframeBottomGame,0,544);
				this.uiTop = this.fnSpawn(EntityUiframeTopGame,0,0);

				//Set level and its tile layout
				this.fnSetTileLayout(this.fnGetSetting('layout')[this.level]);

				this.board.fnInitArrangeTiles();
				this.board.fnShuffle(this.fnGetSetting('layoutShuffle')[this.level]);

				//Set score
				var score = this.score.fnGet(this.level);
				this.startTopUi = this.fnSpawn(EntityStarstatusuitopGame,0,0,{score:score});
				this.fnSetTutorial();
				//For testing level select
				// ig.game.fnPause();
				// this.fnShowSelectLevelDialog();
			}
		},
		fnSetTutorial:function(){
			if(this.tutorial)
				this.tutorial = this.fnSpawn(EntityTutorialGame,0,0);
		},
		fnAddScore:function(){
			if(this.score.fnGet(this.level) > 3) 
				return;
			else{
				this.score.fnSet(this.score.fnGet(this.level)+1,this.level);
				this.startTopUi.fnAddScore();
			}
		},
		fnSetLevelLayout:function(){
			var layout = 0;
			var service = new LevelService();
			if(ig.game.queryString && ig.game.queryString.layout){
				layout = parseInt(ig.game.queryString.layout);
				if(this.fnGetSetting('layout')[layout])
					layout = this.level.fnSaveLevel(layout).fnGetLevel();
			}
		},
		fnSetTileLayout:function(oLayout){
			for(il in oLayout){
				this.board.fnAddTile(this.fnSpawn(EntityTileGame,0,0,{
					gridAx:{x:oLayout[il].gridAx.x,y:oLayout[il].gridAx.y},
					tileId:il,
					tileType:oLayout[il].type,
					tileDir:oLayout[il].dir,
					ball:oLayout[il].ball || false,
					star:oLayout[il].star || false,
					hintSpin:oLayout[il].hintspin || false,
					isPath:oLayout[il].isPath || false
				}));
			}
		},
		fnAddMoveHistory:function(tileId,sDir){
			sDir = (sDir == 'right') ? 'left'
				  :(sDir == 'left') ? 'right'
				  :(sDir == 'top') ? 'bottom'
				  :'top';
			this.stepHistory.push({id:tileId,dir:sDir});
			this.uiFooter.fnActivateUndo();
		},
		fnUndo:function(){
			if(this.pathCompleted) return;
			if(this.stepHistory.length>0){
				var recent = this.stepHistory[this.stepHistory.length-1];
				this.board.fnMoveTile(recent.id,recent.dir);
				this.stepHistory.pop();
				if(this.stepHistory.length<1)
					this.uiFooter.undoBtn.fnDeactivate();
			}
		},
		fnFast:function(){
			this.board.fnTriggerFast();
		},
		fnShowPauseDialog:function(){
			this.pauseDialog = this.fnSpawn(EntityPausedGame,0,0);
		},
		fnShowOptionDialog:function(){
			this.optionDialog = this.fnSpawn(EntityOptionGame,0,0);
		},
		fnShowQuestionDialog:function(){//rubin8
			/*var isNewScore = this.score.fnIsNewRecord(this.level);
			if(isNewScore)
				this.score.fnSave();
			
			var isNewPath = this.bestPath.fnIsNewRecord(this.stepHistory.length, this.level);
			if(isNewPath){
				this.bestPath.fnSet(this.stepHistory.length, this.level);
				this.bestPath.fnSave();
			}*/
			
			/*var levelStorage = new LevelService();*/
			/*if(this.fnGetSetting('layout').length - 1 > this.level && this.level >= levelStorage.fnGetUnlockedLevel())
				levelStorage.fnSaveUnlockedLevel(this.level+1);*/
			/**
			 * Submit score
			 * END GAME API BEFORE END GAME DIALOG
			 * to get current score => this.currentScore;
			 * to get best score => this.score.fnGet(); 
			 * tp get cirremt move => this.stepHistory.length
			 * to get best move => this.bestpath.fnGet();
			 */
			this.endGameDialog = this.fnSpawn(EntityQuestionGame,0,0);
		},
		fnShowEndGameDialog:function(){
			var isNewScore = this.score.fnIsNewRecord(this.level);
			if(isNewScore)
				this.score.fnSave();
			
			var isNewPath = this.bestPath.fnIsNewRecord(this.stepHistory.length, this.level);
			if(isNewPath){
				this.bestPath.fnSet(this.stepHistory.length, this.level);
				this.bestPath.fnSave();
			}
			
			var levelStorage = new LevelService();
			if(this.fnGetSetting('layout').length - 1 > this.level && this.level >= levelStorage.fnGetUnlockedLevel())
				levelStorage.fnSaveUnlockedLevel(this.level+1);
			/**
			 * Submit score
			 * END GAME API BEFORE END GAME DIALOG
			 * to get current score => this.currentScore;
			 * to get best score => this.score.fnGet(); 
			 * tp get cirremt move => this.stepHistory.length
			 * to get best move => this.bestpath.fnGet();
			 */
			this.endGameDialog = this.fnSpawn(EntityEnddialogGame,0,0);
		},
		fnShowSelectLevelDialog:function(){
			this.levelselectDialog = this.fnSpawn(EntityLevelselectGame,0,0);
		},
		fnReloadLevel:function(){
			this.levelSplasher = this.fnSpawn(EntityLevelSplasher,0,0,{
				alpha:0,
				onFinish:function(){
					ig.game.director.reloadLevel();
				},
				killOnfinish:false,
			}).fnAnimateOut();
		}
	});
});