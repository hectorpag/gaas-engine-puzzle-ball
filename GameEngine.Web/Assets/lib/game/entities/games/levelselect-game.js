/// <reference path='../../../../.vscode/impact-intel.d.ts' />

ig.module('game.entities.games.levelselect-game')
.requires(
    'game.app.entity',
    'game.services.level',
    'game.services.score'
)
.defines(function(){
    EntityLevelselectGame = Entity.extend({
        name:'LevelselectGame',
        size:{x:480,y:640},
        opacity:0,
        type:ig.Entity.TYPE.A,
        init:function(x,y,settings){
            this.parent(x,y,settings)
            if(!ig.global.wm){
                //Only do in game mode
                var center = this.fnGetCenter();
                this.anchor = this.fnSpawn(EntityAnchorLevelselect,center.x,-500,{overlay:this});
                this.anchor.fnShow();
                this.zIndex = this.fnGetSetting('enIdx').levelselect;
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
        kill:function(){
            this.anchor.kill();
            this.parent();
        },
    });

    EntityAnchorLevelselect = Entity.extend({
        name:'AnchorLevelselect',
        nextLevel:false,
        init:function(x,y,settings){
            this.parent(x,y,settings)
            if(!ig.global.wm){
                //Only do in game mode
                this.fnSetCenter('both',this.pos);
                var center = this.fnGetCenter();
                this.hidePosY = center.y;
                this.showPosY = ig.system.height/2-30;
                this.dialog = this.fnSpawn(EntityDialogLevelselect,0,0,{anchor:this});
                this.fnUpdateDialogPos();
                this.zIndex = this.fnGetSetting('enIdx').levelselect+1;
                ig.game.sortEntitiesDeferred();
            }
        },
        fnShow:function(){
            this.tween(
                {pos:{x:this.pos.x,y:this.showPosY}},
                this.fnGetSetting('dialogShowSpeed'),
                {
					easing:ig.Tween.Easing.Exponential.EaseOut,
                    onUpdate:function(prop, obj, start, delta, value){
						this.overlay.opacity = this.fnGetSetting('optionOverlayDarkness') * value;
					}.bind(this),
                    onComplete:function(){
                        this.dialog.fnGenerateLevelTile(0);
                    }.bind(this)
                }
            ).start();
        },
        fnHide:function(){
            this.tween(
                {pos:{x:this.pos.x,y:this.hidePosY}},
                this.fnGetSetting('dialogShowSpeed'),
                {
					easing:ig.Tween.Easing.Exponential.EaseIn,
                    onUpdate:function(prop, obj, start, delta, value){
						this.overlay.opacity -= this.fnGetSetting('optionOverlayDarkness') * value;
					}.bind(this),
                    onComplete:function(){
						if (this.fnGetController().name == 'MainmenuCtrl' && ig.game.getEntitiesByType(EntityButtonMoreGames).length > 0){
							ig.game.getEntitiesByType(EntityButtonMoreGames)[0].show();
						}
                        this.fnParentKill();
                    }.bind(this)
                }
            ).start();
        },
        fnUpdateDialogPos:function(){
            var center = this.fnGetCenter();
            this.dialog.fnSetCenter('both',center);
        },
        update:function(){
            this.parent();
            this.fnUpdateDialogPos();
            this.dialog.fnUpdate();
        },
        //Jump to level selected
        fnParentKill:function(){
            if(this.nextLevel!==false && ig.game.getEntityByName('EnddialogGame')){
                ig.game.getEntityByName('EnddialogGame').anchor.nextEvent = 'reset';
                ig.game.getEntityByName('EnddialogGame').anchor.fnHide();
            }
            else if(this.nextLevel!==false && ig.game.getEntityByName('BgMenu')){
                this.fnGetController().fnGotoGameLevel();
            }
            this.overlay.kill();
        },
        kill:function(){
            this.dialog.kill();
            this.parent();
        },
    });

    EntityDialogLevelselect = Entity.extend({
        name:'DialogLevelselect',
        size:{x:309,y:298},
        animSheet: new ig.AnimationSheet('media/graphics/games/level-select-dialog.png',309,298),
        arPageSelector:[],
        levelGrid:[],
        arTile:[],
        pageSelector:false,
        selectedPageIndex:0,
        bTileAnimate:false,
        levelStorage:new LevelService(),
        scoreStorage:new ScoreService(),
        init:function(x,y,settings){
            this.parent(x,y,settings)
            this.addAnim( 'idle', 0.1, [0] );
            this.currentAnim = this.anims.idle;
            if(!ig.global.wm){
                //Only do in game mode
                this.scoreStorage.fnLoad();
                this.fnInitButtons();
                this.fnUpdateBtnPos();
                this.zIndex = this.fnGetSetting('enIdx').levelselect + 2;
                ig.game.sortEntitiesDeferred();
            }
        },
        fnInitButtons:function(){
            var center = this.fnGetCenter();
            this.closeBtn = this.fnSpawn(EntityCloseLevelselect,0,0,{dialog:this,relPos:{x:148,y:-120}});
            this.fnInitPageSelector();
            this.stepBtn = {
                next:this.fnSpawn(EntityLevelselectBtnStep,0,0,{dialog:this}),
                prev:this.fnSpawn(EntityLevelselectBtnStep,0,0,{dialog:this,btnType:'prev'})
            }
        },
        fnInitPageSelector:function(iPageIdx){
            iPageIdx = iPageIdx || this.selectedPageIndex;
            var layoutCount = this.fnGetSetting('layout').length,
                col = 4,
                row = 3,
                grid = col * row,
                pageCount = Math.floor(layoutCount/grid) + ((layoutCount%grid) ? 1:0),
                pageCountWidth = (pageCount == 1) ? 0
                                :((pageCount - 1)*16) +  ((pageCount-1) * 10),
                pageCountStarPosX = (ig.system.width - pageCountWidth)/2,
                relPosX = 0;
                this.pageCount = pageCount;

            for (var index = 0; index < pageCount; index++) {
                relPosX += (index > 0) ? 16 + 10 : 0;
                this.arPageSelector.push(this.fnSpawn(EntityLevelselectPage,0,0,{
                    startPosX:pageCountStarPosX,
                    relPos:{y:110,x:relPosX},
                    pageType:'holder',
                    dialog:this,
                    iPageIdx:index,
                }));
            }
            if(this.arPageSelector)
                this.pageSelector = this.fnSpawn(EntityLevelselectPage,0,0,{
                    iPageIdx:iPageIdx,
                    dialog:this,
                });
        },
        fnUpdatePageSelectorPos:function(center){
            for (var index = 0; index < this.arPageSelector.length; index++) {
                var element = this.arPageSelector[index];
                element.fnSetCenter('both',{
                    x:element.startPosX + element.relPos.x,
                    y:center.y + element.relPos.y
                });
            }
            if(this.pageSelector){
                this.pageSelector.fnSetCenter(
                    'both',
                    this.arPageSelector[this.pageSelector.iPageIdx].fnGetCenter()
                );
            }
        },
        fnUpdateBtnPos:function(){
            var center = this.fnGetCenter();
            this.closeBtn.fnSetCenter('both',center,{
                x:this.closeBtn.relPos.x,
                y:this.closeBtn.relPos.y
            });
            this.fnUpdatePageSelectorPos(center);
            this.stepBtn.next.fnSetCenter('both',center,{x:180,y:10});
            this.stepBtn.prev.fnSetCenter('both',center,{x:-180,y:10});
        },
        fnClose:function(){
            for (var index = 0; index < this.arTile.length; index++) {
                var element = this.arTile[index];
                element.fnHide({bCloseDialog:true});
            }
        },
        fnChangePage:function(iPageIndex){
            this.selectedPageIndex = iPageIndex;
            this.bTileAnimate = true;
            var selectorHide = this.pageSelector.tween(
                {currentAnim:{scale:{x:0,y:0}}},
                0.1,
                {
                    easing:ig.Tween.Easing.Sinusoidal.EaseIn,
                    onComplete:function(){
                        this.pageSelector.iPageIdx = this.selectedPageIndex;
                        this.pageSelector.fnSetCenter(
                            'both',
                            this.arPageSelector[this.selectedPageIndex].fnGetCenter()
                        );
                    }.bind(this)
                }
            );
            var selectorShow = this.pageSelector.tween(
                {currentAnim:{scale:{x:1,y:1}}},
                0.1,
                {
                    easing:ig.Tween.Easing.Sinusoidal.EaseOut,
                    onComplete:function(){
                        for (var index = 0; index < this.arTile.length; index++) {
                            var element = this.arTile[index];
                            element.fnHide({iNextPage:this.selectedPageIndex});
                        }
                    }.bind(this)
                }
            );
            selectorHide.chain(selectorShow);
            selectorHide.start();
        },
        fnGenerateLevelTile:function(iPageIdx){
            if(this.bTileAnimate) return;
            this.fnGenerateGridPos();
            var layoutCount = this.fnGetSetting('layout').length,
                col = 4,
                row = 3,
                grid = col * row,
                arCurrentLayout = this.fnGetSetting('layout').slice((grid*iPageIdx),(grid*iPageIdx)+grid);
                this.arTile = [];
            for (var index = 0; index < arCurrentLayout.length; index++) {
                var element = arCurrentLayout[index];
                this.arTile.push(this.fnSpawn(EntityLevelselectTile,0,0,{
                    centerPos:this.levelGrid[index].pos,
                    dialog:this,
                    delay:(index+1) * this.fnGetSetting('selectleveltileDelay'),
                    index:index,
                    isUnlocked:(this.levelStorage.fnGetUnlockedLevel() >= (grid*iPageIdx) + index),
                    level:(grid*iPageIdx) + index,
                    star:this.scoreStorage.fnGet((grid*iPageIdx) + index)
                }));
                this.arTile[this.arTile.length-1].fnShow();
            }
        },
        fnGenerateGridPos:function(){
            this.levelGrid = [];
            var col = 4,
                row = 3,
                center = this.fnGetCenter(),
                width = this.size.x,
                height = this.size.y,
                gridPadX = (width / col) - ((width / col)/col) + col,
                gridPadY = (height / row) - ((height / row)/row),
                x = this.pos.x,
                y = this.pos.y+10;
            for (var i = 0; i < row; i++) {
                y += gridPadY;
                for (var j = 0; j < col; j++) {
                    x = (j == 0) ? this.pos.x: x;
                    x += gridPadX;
                    this.levelGrid.push({
                        isHead:(j == 0) ? true : false,
                        isTail:(j == (col - 1)) ? true : false,
                        pos:{x:x,y:y}
                    }); 
                }
            }

        },
        fnKillLevelTile:function(){
            //Do reset grid when all tiles are killed
            this.levelGrid = [];
        },
        draw:function(){
            this.parent();

			var center = this.fnGetCenter();
			this.fnCtxWrite(
				_STRINGS.Game.selectlevel,
				'sketch-block',
				16,
				this.fnGetSetting('color').captionBoard,
				'center',
				center.x,
				center.y - 122
			);
        },
        fnUpdate:function(){
            this.fnUpdateBtnPos();
        },
        kill:function(){
            this.closeBtn.kill();
            for (var index = 0; index < this.arPageSelector.length; index++) {
                var element = this.arPageSelector[index];
                element.kill();
            }
            if(this.pageSelector)
                this.pageSelector.kill();
            this.stepBtn.next.kill();
            this.stepBtn.prev.kill();
            this.parent();
        },
    });

    EntityCloseLevelselect = Entity.extend({
        name:'CloseLevelselect',
        size:{x:40,y:39},
        animSheet: new ig.AnimationSheet('media/graphics/sprites/close-dialog.png',40,39),
        type:ig.Entity.TYPE.A,
        cursor:'pointer',
        init:function(x,y,settings){
            this.parent(x,y,settings)
            this.addAnim( 'idle', 0.1, [1] );
            this.addAnim( 'hover', 0.1, [0] );
            this.currentAnim = this.anims.idle;
            if(!ig.global.wm){
                //Only do in game mode
                this.zIndex = this.fnGetSetting('enIdx').levelselect + 3;
                ig.game.sortEntitiesDeferred();
            }
        },
        clicked:function(){
            this.parent();
			ig.soundHandler.sfxPlayer.play('button');
            this.dialog.fnClose();
        },
        over:function(){
            this.parent();
            this.currentAnim = this.anims.hover;
        },
        leave:function(){
            this.parent();
            this.currentAnim = this.anims.idle;
        }
    });

    EntityLevelselectPage = Entity.extend({
        name:'LevelselectPage',
        size:{x:16,y:16},
        animSheet: new ig.AnimationSheet('media/graphics/sprites/level-select-page.png',16,16),
        init:function(x,y,settings){
            this.parent(x,y,settings)
            this.addAnim( 'active', 0.1, [0] );
            this.addAnim( 'frame', 0.1, [1] );
            if(!ig.global.wm){
                //Only do in game mode
                if(this.pageType == 'holder'){
                    this.currentAnim = this.anims.frame;
                    this.type = ig.Entity.TYPE.A;
                    this.cursor = 'pointer';
                    this.zIndex = this.fnGetSetting('enIdx').levelselect + 4;
                }
                else{
                    this.currentAnim = this.anims.active;
                    this.zIndex = this.fnGetSetting('enIdx').levelselect + 5;
                }
                ig.game.sortEntitiesDeferred();
            }
        },
        clicked:function(){
            this.parent();
            if(!this.dialog.bTileAnimate){
			    ig.soundHandler.sfxPlayer.play('button');
                this.dialog.fnChangePage(this.iPageIdx);
            }
        },
    });

    EntityLevelselectTile = Entity.extend({
        name:'LevelselectTile',
        size:{x:52,y:52},
        animSheet: new ig.AnimationSheet('media/graphics/sprites/level-select-tile.png',52,52),
        iNextPage:false,
        bCloseDialog:false,
        readyWriteLevel:false,
        fontSize:0,
        locked:false,
        type:ig.Entity.TYPE.A,
        init:function(x,y,settings){
            this.parent(x,y,settings)
            this.addAnim( 'zeroStar', 0.1, [0] );
            this.addAnim( 'oneStar', 0.1, [1] );
            this.addAnim( 'twoStar', 0.1, [2] );
            this.addAnim( 'threeStar', 0.1, [3] );
            this.addAnim( 'locked', 0.1, [4] );
            this.currentAnim = this.anims.zeroStar;
            if(!ig.global.wm){
                //Only do in game mode
                if(this.isUnlocked){
                    switch (this.star) {
                        case 0:
                            this.currentAnim = this.anims.zeroStar
                            break;
                        case 1:
                            this.currentAnim = this.anims.oneStar
                            break;
                        case 2:
                            this.currentAnim = this.anims.twoStar
                            break;
                        case 3:
                            this.currentAnim = this.anims.threeStar
                            break;
                    
                        default:
                            break;
                    }
                }else{
                    this.currentAnim = this.anims.locked;
                }
                
                
                this.fnSetCenter('both',this.centerPos);
                this.currentAnim.scale.x = 0,
                this.currentAnim.scale.y = 0,
                this.zIndex = this.fnGetSetting('enIdx').levelselect+5;
                ig.game.sortEntitiesDeferred();
            }
        },
        fnShow:function(){
            this.dialog.bTileAnimate = true;
            this.tween(
                {
                    currentAnim:{scale:{x:1,y:1}},
                    fontSize:16,
                },
                0.1,
                {
                    easing:ig.Tween.Easing.Sinusoidal.EaseOut,
                    delay:this.delay,
                    onComplete:function(){
                        if(this.dialog.arTile.length-1 == this.index){
                            this.dialog.bTileAnimate = false;
                            if(this.fnGetPointer().hoveringItem)
                                this.fnGetPointer().hoveringItem.over();
                        }
                    }.bind(this)
                }
            ).start();
        },
        fnHide:function(oParam){
            this.dialog.bTileAnimate = true;
            this.iNextPage = (oParam && oParam.iNextPage !== false) ? oParam.iNextPage : false;
            this.bCloseDialog = (oParam && oParam.bCloseDialog) ? true : false;
            this.tween(
                {
                    currentAnim:{scale:{x:0,y:0}},
                    fontSize:0,
                },
                0.1,
                {
                    easing:ig.Tween.Easing.Sinusoidal.EaseIn,
                    delay:this.delay,
                    onComplete:function(){
                        if(this.dialog.arTile.length-1 == this.index){
                            this.dialog.bTileAnimate = false;
                            if(this.iNextPage !== false && this.iNextPage > -1){
                                this.dialog.fnGenerateLevelTile(this.iNextPage);
                            }
                            else if(this.bCloseDialog){
                                this.dialog.anchor.fnHide();
                            }
                        }
                        this.kill()
                    }.bind(this)
                }
            ).start();
        },
        draw:function(){
            this.parent();
            var center = this.fnGetCenter();
            if(this.isUnlocked){
                this.fnCtxWrite(
                    this.level+1,
                    'sketch-block',
                    this.fontSize,
                    this.fnGetSetting('color').captionBoard,
                    'center',
                    center.x - 1,
                    center.y - 4
                );
            }
        },
        fnAnimateBig:function(){
            this.tween(
                {
                    currentAnim:{scale:{x:1.2,y:1.2}},
                    fontSize:16*1.2
                },
                0.1,
                {
                    easing:ig.Tween.Easing.Sinusoidal.EaseInOut,
                }
            ).start();
        },
        fnAnimateSmall:function(){
            this.tween(
                {
                    currentAnim:{scale:{x:1,y:1}},
                    fontSize:16
                },
                0.1,
                {
                    easing:ig.Tween.Easing.Sinusoidal.EaseInOut,
                }
            ).start();
        },
        over:function(){
            this.parent();
            if(!this.isUnlocked) return;
            if(this.locked || this.dialog.bTileAnimate) return;
            this.cursor = 'pointer';
            this.fnAnimateBig();
        },
        leave:function(){
            this.parent();
            if(!this.isUnlocked) return;
            if(this.locked ||  this.dialog.bTileAnimate) return;
            this.cursor = 'inherit';
            this.fnAnimateSmall();
        },
        clicked:function(){
            /**@type{AppEntity}*/
            var _this = this;
            _this.parent();
            if(!_this.isUnlocked) return;
            _this.dialog.levelStorage.fnSaveLevel(_this.level);
            _this.dialog.anchor.nextLevel = _this.level;
            _this.dialog.fnClose();
			ig.soundHandler.sfxPlayer.play('button');
        },
    });

    EntityLevelselectBtnStep = Entity.extend({
        name:'BtnNextPrev',
        size:{x:52,y:51},
        animSheet: new ig.AnimationSheet('media/graphics/sprites/button-game.png',52,51),
        btnType:'next',
        type:ig.Entity.TYPE.A,
        cursor:'pointer',
        init:function(x,y,settings){
            /**@type{AppEntity}*/
            var _this = this;
            _this.parent(x,y,settings)
            _this.addAnim( 'hover', 0.1, [6] );
            _this.addAnim( 'idle', 0.1, [7] );
            _this.currentAnim = _this.anims.idle;
            if(!ig.global.wm){
                //Only do in game mode
                if(_this.btnType == 'prev')
                    _this.currentAnim.flip.x = true;
                //--------------------
                _this.zIndex = _this.fnGetSetting('enIdx').levelselect + 1;
                ig.game.sortEntitiesDeferred();
            }
        },
        clicked:function(){
            /**@type{AppEntity}*/
            var _this = this;
            _this.parent();
            if(this.dialog.bTileAnimate) return;
            var nextPage = false;
            if(_this.btnType == 'prev'){
                nextPage = (_this.dialog.selectedPageIndex == 0) 
                          ? 0 
                          :_this.dialog.selectedPageIndex - 1;
            }else{
                nextPage = (_this.dialog.selectedPageIndex == _this.dialog.pageCount - 1) 
                          ? _this.dialog.pageCount - 1
                          : _this.dialog.selectedPageIndex + 1
            }
            _this.dialog.fnChangePage(nextPage);
			ig.soundHandler.sfxPlayer.play('button');
        },
        over:function(){
            /**@type{AppEntity}*/
            var _this = this;
            _this.currentAnim =_this.anims.hover;
            if (_this.btnType == 'prev')
                _this.currentAnim.flip.x = true;
            else
                _this.currentAnim.flip.x = false;
        },
        leave:function(){
            /**@type{AppEntity}*/
            var _this = this;
            _this.currentAnim = _this.anims.idle;
        },
        fhShow:function(){
            
        },
        fnHide:function(){

        },
    });
});