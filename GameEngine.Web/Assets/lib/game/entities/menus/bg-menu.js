/// <reference path='../../../../.vscode/impact-intel.d.ts' />
ig.module('game.entities.menus.bg-menu')
.requires(
    //Other required class
    'game.app.entity'
)
.defines(function () {
    EntityBgMenu = Entity.extend({
        name:'BgMenu',
        size:{x:480,y:640},
        animSheet: new ig.AnimationSheet('media/graphics/backgrounds/desktop/background.jpg',480,640),
        init:function(x,y,settings){
            /**@type{AppEntity}*/
            var _this = this;
            _this.parent(x,y,settings)
            _this.addAnim( 'idle', 0.1, [0] );
            _this.currentAnim = _this.anims.idle;
            if(!ig.global.wm){
                //Only do in game mode
                
                //--------------------
                _this.zIndex = _this.fnGetSetting('enIdx').menubackground;
                ig.game.sortEntitiesDeferred();
            }
        },
    });
});