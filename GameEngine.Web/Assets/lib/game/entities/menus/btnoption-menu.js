/// <reference path='../../../../.vscode/impact-intel.d.ts' />

ig.module('game.entities.menus.btnoption-menu')
.requires(
    //Other required class
    'game.app.entity'
)
.defines(function () {
    EntityBtnoptionMenu = Entity.extend({
        name:'BtnoptionMenu',
        size:{x:99,y:101},
        animSheet: new ig.AnimationSheet('media/graphics/sprites/button_setting.png',99,101),
        type:ig.Entity.TYPE.A,
        cursor:'pointer',
        init:function(x,y,settings){
            /**@type{AppEntity}*/
            var _this = this;
            _this.parent(x,y,settings)
            _this.addAnim( 'idle', 0.1, [0] );
            _this.addAnim( 'hover', 0.1, [1] );
            _this.currentAnim = _this.anims.idle;
            if(!ig.global.wm){
                //Only do in game mode
                _this.anims.idle.scale.x = 0;
                _this.anims.idle.scale.y = 0;
                _this.anims.hover.scale.x = 0;
                _this.anims.hover.scale.y = 0;
                //--------------------
                _this.zIndex = _this.fnGetSetting('enIdx').menubtn;
                ig.game.sortEntitiesDeferred();
                _this.fnEntrace();
            }
        },
        fnEntrace:function(){
            this.tween(
                {   
                    anims:{
                        idle:{scale:{x:1,y:1}},
                        hover:{scale:{x:1,y:1}},
                    },
                },
                0.25,
                {
                    easing:ig.Tween.Easing.Sinusoidal.EaseInOut,
                    delay:this.delay,
                }
            ).start();
        },
        over:function(){
            /**@type{AppEntity}*/
            var _this = this;
            _this.parent();
            _this.currentAnim = _this.anims.hover;
        },
        leave:function(){
            /**@type{AppEntity}*/
            var _this = this;
            _this.parent();
            _this.currentAnim = _this.anims.idle;
        },
        clicked:function(){
            /**@type{AppEntity}*/
            var _this = this;
            _this.parent();
            if(ig.game.getEntitiesByType(EntityButtonMoreGames).length > 0)
                ig.game.getEntitiesByType(EntityButtonMoreGames)[0].hide();
            ig.soundHandler.sfxPlayer.play('button');
			this.optionDialog = this.fnSpawn(EntityOptionGame,0,0);
        },
    });
});