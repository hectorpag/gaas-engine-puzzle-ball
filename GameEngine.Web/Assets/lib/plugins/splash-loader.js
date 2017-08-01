ig.module('plugins.splash-loader')
.requires(
	'impact.loader',
	'impact.animation'
)
.defines(function() {
	ig.SplashLoader = ig.Loader.extend({
		bg: new ig.Image('media/graphics/splash/desktop/cover.jpg'),		
		frame : new ig.Image('media/graphics/splash/progress/frame.png'),
		bar : new ig.Image('media/graphics/splash/progress/bar.png'),
		//customAnim: new ig.AnimationSheet('media/splash/some_spritesheet.png',40,40),
		resource:[
			new ig.Sound('media/audio/bgm.mp3'),
            new ig.Sound('media/audio/bgm.ogg'),
            new ig.Sound('media/audio/play/ballroll.mp3'),
            new ig.Sound('media/audio/play/ballroll.ogg'),
            new ig.Sound('media/audio/play/button.mp3'),
            new ig.Sound('media/audio/play/button.ogg'),
            new ig.Sound('media/audio/play/ding1.mp3'),
            new ig.Sound('media/audio/play/ding1.ogg'),
            new ig.Sound('media/audio/play/ding2.mp3'),
            new ig.Sound('media/audio/play/ding2.ogg'),
            new ig.Sound('media/audio/play/ding3.mp3'),
            new ig.Sound('media/audio/play/ding3.ogg'),
            new ig.Sound('media/audio/play/hint.mp3'),
            new ig.Sound('media/audio/play/hint.ogg'),
            new ig.Sound('media/audio/play/tile.mp3'),
            new ig.Sound('media/audio/play/tile.ogg'),
            new ig.Sound('media/audio/play/win.mp3'),
            new ig.Sound('media/audio/play/win.ogg'),
            new ig.Image('media/graphics/games/ball.png'),
            new ig.Image('media/graphics/games/board.png'),
            new ig.Image('media/graphics/games/end-game-dialog.png'),
            new ig.Image('media/graphics/games/level-select-dialog.png'),
            new ig.Image('media/graphics/games/paused-frame.png'),
            new ig.Image('media/graphics/games/sound-bar.png'),
            new ig.Image('media/graphics/games/sound-frame.png'),
            new ig.Image('media/graphics/games/sound-knob.png'),
            new ig.Image('media/graphics/games/tutorial-frame.png'),
            new ig.Image('media/graphics/games/tutorial-pointer.png'),
            new ig.Image('media/graphics/games/ui-frame-bottom.png'),
            new ig.Image('media/graphics/games/ui-frame-top.png'),
            new ig.Image('media/graphics/sprites/button-game.png'),
            new ig.Image('media/graphics/sprites/button_moregames.png'),
            new ig.Image('media/graphics/sprites/button_play.png'),
            new ig.Image('media/graphics/sprites/button_setting.png'),
            new ig.Image('media/graphics/sprites/close-dialog.png'),
            new ig.Image('media/graphics/sprites/hint-spin.png'),
            new ig.Image('media/graphics/sprites/level-select-page.png'),
            new ig.Image('media/graphics/sprites/level-select-tile.png'),
            new ig.Image('media/graphics/sprites/star-end.png'),
            new ig.Image('media/graphics/sprites/star-pick.png'),
            new ig.Image('media/graphics/sprites/star-uitop.png'),
            new ig.Image('media/graphics/sprites/tiles.png'),
		],
		init:function(gameClass,resources){
			ig.system.context.font = "0pt sketch-block"   ;
            ig.system.context.fillText("",0,0);
            ig.system.context.restore();

			this.parent(gameClass,resources);
            //console.log("asdasdasd");
			// ENABLE, IF CUSTOM ANIMATION REQUIRED DURING LOADING	
			//this.setupCustomAnimation();

			// ADS
			ig.apiHandler.run("MJSPreroll");
		},

		end:function(){
			this.parent();
			
            if(ig.ua.mobile)
            {
                var play = ig.domHandler.getElementById("#play");
                ig.domHandler.show(play);
            }
            
            
			var pauseInterval = document.URL.indexOf('localhost')>=0?500:3000;		
			window.setTimeout('ig.system.setGame(MyGame)',pauseInterval);
			
			// CLEAR CUSTOM ANIMATION TIMER
			// window.clearInterval(ig.loadingScreen.animationTimer);			
		},
		
		setupCustomAnimation:function(){
			this.customAnim = new ig.Animation(this.customAnim, 0.05, [0,1,2,3,4,5]);				
			this.customAnim.currentFrame = 0;

			// Assign this class instance an arbitrary name
			ig.loadingScreen = this;

			// Create an external timer variable
			ig.loadingScreen.animationTimer = window.setInterval('ig.loadingScreen.animate()',100);		
		},

		animate:function(){
			// Somehow the update() function doesn't work in Loader class. Resort to using external timer to increment
			// current frame in anim object

			if(this.customAnim.currentFrame<this.customAnim.sequence.length){
				this.customAnim.currentFrame++;
			}else{
				this.customAnim.currentFrame=0;
			}		
			this.customAnim.gotoFrame(this.customAnim.currentFrame);	
		},		
		
		
		draw: function() {
			this._drawStatus += (this.status - this._drawStatus)/5;
			var s = ig.system.scale;
			
			// DIMENSIONS OF LOADING BAR
			var w,h,x,y;
			w = this.frame.width;
			h = this.frame.height;
			x = ig.system.width * 0.5-w/2;
			y = 420;
			this.bg.draw(0,0);
			if(this.frame.width * s > 0){
				this.frame.draw(x*s,y*s);
				this.bar.draw(x*s,y*s,0,0,w*s*this._drawStatus,h*s);
			}		
		}
	});
});