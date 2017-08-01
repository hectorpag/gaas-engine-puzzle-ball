ig.module('game.entities.games.question-game')
.requires(
    'game.app.entity',
	'game.services.level',
    'plugins.ajax-query'
)
.defines(function(){
    
        EntityQuestionGame = Entity.extend({
        name:'QuestionGame',
        size:{x:480,y:640},
        type:ig.Entity.TYPE.A,
        opacity:0,
        init:function(x,y,settings){
            this.parent(x,y,settings);
            if(!ig.global.wm){
                //Only do in game mode
                var center = this.fnGetCenter();
                //Custom Code For Rubin8 Questionare
                this.anchorCustom = this.fnSpawn(EntityCustomPopUpAnchor,center.x,-500,{overlay:this});
                //End Custom Code 
                this.anchorCustom.fnShow();
                this.zIndex = this.fnGetSetting('enIdx').starendgame;
                ig.game.sortEntitiesDeferred();
                ig.soundHandler.sfxPlayer.play('enddialog');
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

    EntityCustomPopUpAnchor = Entity.extend({
        name:'CustomPopUpAnchor',
        nextEvent:false,
        init:function(x,y,settings){
            this.parent(x,y,settings);
            if(!ig.global.wm){
                //Only do in game mode
                this.fnSetCenter('both',this.pos);
                var center  = this.fnGetCenter();
                this.hidePosY = this.pos.y;
                this.showPosY = ig.system.height/2 - 50;
                this.dialog = this.fnSpawn(EntityCustomPopUpDialog,center.x,center.y,{
                    anchor:this
                });
                this.fnUpdateDialogPos();
                this.zIndex = this.fnGetSetting('enIdx').starendgame + 1;
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
                        // this.fnGenerateStars();
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
                        this.overlay.opacity -= this.fnGetSetting('pauseOverlayDarkness') * value;
                    }.bind(this),
                    onComplete:function(){
                        this.fnResponseOnClose();
                    }.bind(this)
                }
            ).start();
        },
        /*fnGenerateStars:function(){
            this.stars = [];
            var score = this.fnGetController().currentScore;
            for (var index = 0; index <= score - 1; index++) {
                var reslPos = {}
                relPos = (index === 0) ? {x:-56,y:-144}
                        :(index == 1) ? {x:1,y:-156}
                        :{x:56,y:-144};
                this.stars.push(this.fnSpawn(EntityStarend,0,0,{
                    index:index,
                    relPos:relPos,
                    delay:index*this.fnGetSetting('starTopUiDelay')
                }));
            }
            this.fnUpdateStarPos();
            for (var index = 0; index < this.stars.length; index++) {
                var element = this.stars[index];
                element.fnTriggerEntrance();
            }
        },*/
        fnUpdateStarPos:function(){
            if(!this.stars) return;
            var center = this.fnGetCenter();
            for (var index = 0; index < this.stars.length; index++) {
                var element = this.stars[index];
                element.fnSetCenter('both',center,{
                    x:element.relPos.x,
                    y:element.relPos.y
                });                
            }
        },
        fnUpdateDialogPos:function(){
            var center = this.fnGetCenter();
            this.dialog.fnSetCenter('both',center);
        },
        update:function(){
            this.parent();
            this.fnUpdateDialogPos();
            this.fnUpdateStarPos();
        },
        fnResponseOnClose:function(){
            this.nextEvent;//this variable is respond next event
             this.fnGetController().fnShowEndGameDialog();//rubin8
        },
        kill:function(){
            if(this.stars)
                for (var index = 0; index < this.stars.length; index++)
                    this.stars[index].kill()

            this.dialog.kill();
            this.parent();
        },
    });

    EntityCustomPopUpDialog = Entity.extend({
        name:'CustomPopUpDialog',
        size:{x:309,y:298},
        animSheet: new ig.AnimationSheet('media/graphics/games/level-select-dialog.png',309,298),
        init:function(x,y,settings){
            this.parent(x,y,settings);
            this.addAnim( 'idle', 0.1, [0] );
            this.currentAnim = this.anims.idle;
            if(!ig.global.wm){
                //Only do in game mode
                this.fnInitButtons();
                this.fnUpdateButtonPos();
                this.zIndex = this.fnGetSetting('enIdx').starendgame + 2;
                ig.game.sortEntitiesDeferred();
            }
            // this.ajaxcall=new AjaxQuery({"data":"data"},"http://www.tesisting.com","POST",this.fnPrintQuestion,this);
            this.ajaxQuery = new ig.AjaxQuery();
            this.response = this.ajaxQuery.getJSON_sync("https://gaasdevgaasplayapi.azurewebsites.net/v1/Question/GetAllUnorderedCampaignQuestions?campaignKey=82562a5ee1784752bf1f06a87e856382&userId=43c8205f-7d75-4fdc-abc2-7aba28b47177");
            // this.rs = this.ajaxcall.get_sync("http://localhost:5001/allQuestions");
            // console.log("After: "+this.rs);
           
        },
        fnInitButtons:function(){
            if(this.fnGetController().level + 1 > this.fnGetSetting('layout').length - 1){
                // this.levelBtn = this.fnSpawn(EntityLevelendBtn,0,0,{dialog:this});
                // this.retryBtn = this.fnSpawn(EntityRetryendBtn,0,0,{dialog:this});
            }else{
                // this.levelBtn = this.fnSpawn(EntityLevelendBtn,0,0,{dialog:this});
                // this.retryBtn = this.fnSpawn(EntityRetryendBtn,0,0,{dialog:this});
                this.nextBtn = this.fnSpawn(EntityCustomNextBtn,0,0,{dialog:this});
            }
        },
        fnUpdateButtonPos:function(){
            var center = this.fnGetCenter();
            if(this.fnGetController().level + 1 > this.fnGetSetting('layout').length - 1){
                // this.fnUpdateButtonElements(this.levelBtn,center,{x:-42,y:100});
                // this.fnUpdateButtonElements(this.retryBtn,center,{x:42,y:100});
            }else{
                // this.fnUpdateButtonElements(this.levelBtn,center,{x:-85,y:100});
                // this.fnUpdateButtonElements(this.retryBtn,center,{x:0,y:100});
                this.fnUpdateButtonElements(this.nextBtn,center,{x:85,y:100});
            }
        },
        fnUpdateButtonElements:function(enBtn,center,relPos){
            enBtn.fnSetCenter('both',{
                x:center.x + relPos.x,
                y:center.y + relPos.y
            });
        },
        update:function(){
            this.parent();
            this.fnUpdateButtonPos();
            
        },
        draw:function(){
            this.parent();
            // this.ajaxcall.get();
            // this.fnPrintQuestion(this.ajaxcall.ajaxResponse);
            // console.log("After: "+this.ajaxcall.ajaxResponse);
            /*$.ajax({
              url: "http://localhost:5001/allQuestions",
              data:{
                campaignKey: "test",
                userId:"Test"
              },
              type: "GET",
              dataType: "json",
              success: this.fnPrintQuestion(response),
              complete: function(){
                
              }
            });*/
            this.fnPrintQuestion();
            
        },
        fnPrintQuestion:function(){
            // console.log(response.CampaignQuestions[0].CampaignQuestionDescription);
            var center = this.fnGetCenter();
           /* var res = this.response;
            console.log(res);*/
            /*this.response.CampaignQuestions[0].CampaignQuestionDescription*/
            this.fnCtxWrite(
                this.response.CampaignQuestions[0].CampaignQuestionDescription,
                'sketch-block',
                16,
                this.fnGetSetting('color').captionBoard,
                'center',
                center.x,
                center.y - 120
            );
              
           
                
        },
        kill:function(){
            /*this.levelBtn.kill();
            this.retryBtn.kill();*/
            if(this.nextBtn)
                this.nextBtn.kill();
            this.parent();
        },
    });

    EntityCustomNextBtn = Entity.extend({
        name:'CustomNextBtn',
        size:{x:52,y:51},
        animSheet: new ig.AnimationSheet('media/graphics/sprites/button-game.png',52,51),
        type:ig.Entity.TYPE.A,
        cursor:'pointer',
        init:function(x,y,settings){
            this.parent(x,y,settings)
            this.addAnim( 'idle', 0.1, [7] );
            this.addAnim( 'hover', 0.1, [6] );
            this.currentAnim = this.anims.idle;
            if(!ig.global.wm){
                //Only do in game mode
                this.zIndex = this.fnGetSetting('enIdx').starendgame + 3;
                ig.game.sortEntitiesDeferred();
            }
        },
        over:function(){
            this.parent();
            this.currentAnim = this.anims.hover;
        },
        leave:function(){
            this.parent();
            this.currentAnim = this.anims.idle;
        },
        clicked:function(){
            this.parent();
            // var levelStorage = new LevelService();
            // levelStorage.fnSaveLevel(this.fnGetController().level + 1);
            // this.dialog.anchor.nextEvent = 'reset';
            // ig.soundHandler.sfxPlayer.play('button');
            this.dialog.anchor.fnHide();
           
            

        },
    });
             
    
});