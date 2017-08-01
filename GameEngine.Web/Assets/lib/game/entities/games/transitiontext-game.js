/// <reference path='../../../../.vscode/impact-intel.d.ts' />

ig.module('game.entities.games.transitiontext-game')
.requires(
    //Other required class
    'game.app.entity'
)
.defines(function () {
    EntityTransitiontextGame = Entity.extend({
        name:'TransitiontextGame',
        size:{x:1,y:1},
        textAlpha:0,
        init:function(x,y,settings){
            /**@type{AppEntity}*/
            var _this = this;
            _this.parent(x,y,settings)
            if(!ig.global.wm){
                //Only do in game mode
                //--------------------
                _this.zIndex = _this.fnGetSetting('enIdx').pathcomplete;
                ig.game.sortEntitiesDeferred();
                this.fnAnimate();
            }
        },
        fnAnimate:function(){
            /**@type{AppEntity}*/
            var _this = this;
            var center = {
                x:ig.system.width/2,
                y:ig.system.height/2,
            }
            _this.fnSetCenter('both',{
                x:center.x,
                y:center.y + 60
            })
            var animatePos1 = {
                x:center.x,
                y:center.y + 20
            };
            var animatePos2 = {
                x:center.x,
                y:center.y - 20,
            }
            var animatePos3 = {
                x:center.x,
                y:center.y - 60
            }
            /**@type{IgTween}*/
            var anim1 = this.tween(
                {pos:{x:animatePos1.x,y:animatePos1.y},textAlpha:1},
                0.5,
                {
                    easing:ig.Tween.Easing.Bounce.EaseOut,
                }
            );
            /**@type{IgTween}*/
            var anim2 = this.tween(
                {pos:{x:animatePos2.x,y:animatePos2.y}},
                1,
                {
                    easing:ig.Tween.Easing.Linear.EaseNone,
                }
            );
            /**@type{IgTween}*/
            var anim3 = this.tween(
                {pos:{x:animatePos3.x,y:animatePos3.y},textAlpha:0},
                0.1,
                {
                    easing:ig.Tween.Easing.Sinusoidal.EaseIn,
                    onComplete:function(){
                        if(_this.board && _this.checkResult)
                            this.board.fnDeleteUncompleteTiles(_this.checkResult);
                        this.kill();
                    }.bind(this),
                }
            );
            anim1.chain(anim2);
            anim2.chain(anim3);
            anim1.start();
        },
        draw:function(){
            /**@type{AppEntity}*/
            var _this = this;
            _this.parent();
            var center = _this.fnGetCenter();

            ig.system.context.shadowColor = "#1AED1A";
			ig.system.context.shadowBlur = 5;
			
            var color = this.fnGetSetting('color').rgbTransitiontextShadow;
            var sColor = 'rgba(R!,G!,B!,A!)';
                sColor = sColor.replace('R!',color.r);
                sColor = sColor.replace('G!',color.g);
                sColor = sColor.replace('B!',color.b);
                sColor = sColor.replace('A!',_this.textAlpha);
            var textSize = (this.customSize) ? 25 : 30;

            ig.system.context.font = textSize+'pt sketch-block';
            ig.system.context.textAlign = 'center';
            ig.system.context.fillStyle = sColor;
            // _STRINGS.Game.pathcomplete
            ig.system.context.fillText(
                _this.message,
                center.x + 2,
                center.y + 2
            );



            color = this.fnGetSetting('color').rgbTransitiontext;
            sColor = 'rgba(R!,G!,B!,A!)';
            sColor = sColor.replace('R!',color.r);
            sColor = sColor.replace('G!',color.g);
            sColor = sColor.replace('B!',color.b);
            sColor = sColor.replace('A!',_this.textAlpha);
                
            ig.system.context.font = textSize+'pt sketch-block';
            ig.system.context.textAlign = 'center';
            ig.system.context.fillStyle = sColor;
            
            ig.system.context.fillText(
                _this.message,
                center.x,
                center.y
            );

            

            ig.system.context.shadowColor = "rgba(0,0,0,0)";
			ig.system.context.shadowBlur = 0;
            ig.system.context.restore();
        },
        fnPause:function(){
            /**@type{AppEntity}*/
            var _this = this;
            try{
                _this.pauseTweens();
            }catch(e){}
        },
        fnUnpause:function(){
            /**@type{AppEntity}*/
            var _this = this;
            try{
                _this.resumeTweens();
            }catch(e){}
        },
    });
});