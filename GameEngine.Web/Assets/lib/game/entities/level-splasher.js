ig.module('game.entities.level-splasher')
.requires(
    //Other required class
    'game.app.entity'
)
.defines(function () {
    EntityLevelSplasher = Entity.extend({
        name:'LevelSplahser',
        size:{x:480,y:640},
        type:ig.Entity.TYPE.A,
        onStart:false,
        onFinish:false,
        killOnfinish:true,
        alpha:null,
        init:function(x,y,settings){
            /**@type{AppEntity}*/
            var _this = this;
            _this.parent(x,y,settings)
            if(!ig.global.wm){
                _this.zIndex = _this.fnGetSetting('enIdx').levelsplasher;
                ig.game.sortEntitiesDeferred();
            }
        },
        fnAnimateIn:function(){
            if(this.onStart)
                this.onStart(this);
            this.tween(
                {alpha:0},
                0.25,
                {
                    easing:ig.Tween.Easing.Sinusoidal.EaseOut,
                    onComplete:function(){
                        if(this.onFinish)
                            this.onFinish();
                        if(this.killOnfinish)
                            this.kill();
                        this.kill();
                    }.bind(this)
                }
            ).start();
        },
        fnAnimateOut:function(){
            if(this.onStart)
                this.onStart(this);
            this.tween(
                {alpha:1},
                0.25,
                {
                    easing:ig.Tween.Easing.Sinusoidal.EaseIn,
                    onComplete:function(){
                        if(this.onFinish)
                            this.onFinish();
                        if(this.killOnfinish)
                            this.kill();

                    }.bind(this)
                }
            ).start();
        },
        draw:function(){
            /**@type{AppEntity}*/
            var _this = this;
            _this.fnDrawOverlay(_this.size.x,_this.size.y,'rgba(0,0,0,'+_this.alpha+')');
        }
    });
});