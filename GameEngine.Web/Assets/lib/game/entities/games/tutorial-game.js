/// <reference path='../../../../.vscode/impact-intel.d.ts' />

ig.module('game.entities.games.tutorial-game')
.requires(
    //Other required class
    'game.app.entity'
)
.defines(function () {
    EntityTutorialGame = Entity.extend({
        name:'TutorialGame',
        size:{x:97,y:97},
        animSheet: new ig.AnimationSheet('media/graphics/games/tutorial-frame.png',97,97),
        init:function(x,y,settings){
            /**@type{AppEntity}*/
            var _this = this;
            _this.parent(x,y,settings)
            _this.addAnim( 'idle', 0.1, [0] );
            _this.currentAnim = _this.anims.idle;
            if(!ig.global.wm){
                //Only do in game mode
                _this.fnSetCenter('both',{x:288,y:396});
                //--------------------
                _this.zIndex = _this.fnGetSetting('enIdx').tutorial;
                ig.game.sortEntitiesDeferred();
                _this.tutorialPointer = _this.fnSpawn(EntityTutorialPointer,0,0);
            }
        },
        kill:function(){
            this.tutorialPointer.kill();
            this.parent();
        },
    });
    EntityTutorialPointer = Entity.extend({
        name:'TutorialPointer',
        size:{x:53,y:62},
        animSheet: new ig.AnimationSheet('media/graphics/games/tutorial-pointer.png',53,62),
        init:function(x,y,settings){
            /**@type{AppEntity}*/
            var _this = this;
            _this.parent(x,y,settings)
            _this.addAnim( 'idle', 0.1, [0] );
            _this.currentAnim = _this.anims.idle;
            if(!ig.global.wm){
                //Only do in game mode
                _this.fnSetCenter('both',{x:288, y:500});
                //--------------------
                _this.zIndex = _this.fnGetSetting('enIdx').tutorial;
                ig.game.sortEntitiesDeferred();

                this.tween(
                    {pos:{x:_this.pos.x,y:_this.pos.y - 97}},
                    2,
                    {
                        easing:ig.Tween.Easing.Sinusoidal.EaseInOut,
                        delay:1,
                        loop:ig.Tween.Loop.Revert,
                    }
                ).start();
                
            }
        },
        fnPause:function(){
            /**@type{AppEntity}*/
            var _this = this;
            _this.pauseTweens();
        },
        fnUnpause:function(){
            /**@type{AppEntity}*/
            var _this = this;
            _this.resumeTweens();
        },
    });
});