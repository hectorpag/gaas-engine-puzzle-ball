ig.module('game.entities.buttons.button-more-games')
.requires(
	'game.entities.buttons.button'
	,'plugins.clickable-div-layer'
)
.defines(function() {
	EntityButtonMoreGames = EntityButton.extend({
		type:ig.Entity.TYPE.A,
		gravityFactor:0,
		logo: new ig.AnimationSheet('media/graphics/sprites/button_moregames.png',99,101),
		size:{x:99,
			y:101,
		},
		// zIndex: 750,
		clickableLayer:null,
		link:null,
		newWindow:false,
		div_layer_name:"more-games",
		name:"moregames",
		init:function(x,y,settings){
			this.parent(x,y,settings);

            //ig.soundHandler.unmuteAll(true);
            
			if(ig.global.wm)
			{
				return;
			}
			
			if(settings.div_layer_name)
			{
				//console.log('settings found ... using that div layer name')
				this.div_layer_name = settings.div_layer_name;
			}
			else
			{
				this.div_layer_name = 'more-games'
			}
			
			if(_SETTINGS.MoreGames.Enabled)
			{
				this.anims.idle = new ig.Animation(this.logo,0,[0], true);
				this.anims.hover = new ig.Animation(this.logo,0,[1], true);
				this.currentAnim = this.anims.idle;
				
				if(_SETTINGS.MoreGames.Link)
				{
					this.link=_SETTINGS.MoreGames.Link;
				}
				if(_SETTINGS.MoreGames.NewWindow)
				{
					this.newWindow = _SETTINGS.MoreGames.NewWindow;
				}
				this.clickableLayer = new ClickableDivLayer(this);
				
                this.anims.idle.scale.x = 0;
                this.anims.idle.scale.y = 0;
                this.anims.hover.scale.x = 0;
                this.anims.hover.scale.y = 0;
				this.zIndex = ig.game.settings.enIdx.menubtn;
				this.fnEntrace();
			}
			else
			{
				this.kill();
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

        show:function()
        {
            var elem = ig.domHandler.getElementById("#"+this.div_layer_name);
            ig.domHandler.show(elem);
        },
        hide:function()
        {
            var elem = ig.domHandler.getElementById("#"+this.div_layer_name);
            ig.domHandler.hide(elem);
        },
		clicked:function()
		{
			
		},
		clicking:function()
		{
			
		},
		released:function()
		{
			
		},
		over:function(){
			this.currentAnim = this.anims.hover;
		},
		leave:function(){
			this.currentAnim = this.anims.idle;
		},
	});
});