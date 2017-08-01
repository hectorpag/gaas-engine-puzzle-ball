/**
 * Used to make code consistent
 * Add game/entities/controllers folder for level controlller entities
 * Add game/services folder for service enitties
 * Use level list on game/app/levels. however its modifying start function on main.js
 * Use URL querystring read ability. however should use querystring on development only
 * Need to put all services availble in here
 * To use include 'game.app.minimain' on main.js. then apply this.parent() on main.js init function
 *
 * @version 0.1.1
 *
 * @author andrian.alfarabi@impact360design.com
 */
ig.module('game.app.minimain')
.requires(
	'impact.game',

	//Required injection
	'game.app.settings',
	'game.app.states',
	'game.app.querystring',
	'game.app.levels',
	'game.app.helper',

	//Required services
	'game.services.sound',
	'game.services.level',
	'game.services.hint',
	'game.services.testing'

)
.defines(function () {
	ig.Game.inject({
		controller:false,
		pointer:false,
		init:function(){
			this.parent();
		},
		fnPause:function(){
			for (var i = ig.game.entities.length - 1; i >= 0; i--) {
				if(this.entities[i].fnPause && typeof(this.entities[i].fnPause) == 'function'){
					this.entities[i].fnPause();
					this.states.isPaused = true;
				}
			};
		},
		fnUnpause:function(){
			for (var i = this.entities.length - 1; i >= 0; i--) {
				if(this.entities[i].fnUnpause && typeof(this.entities[i].fnUnpause) == 'function'){
					this.entities[i].fnUnpause();
					this.states.isPusedReset();
				}
			};
		},
		cheat:{
			// enabled:true,
			unlockLevel:function(nLevel){
				if(!this.enabled) return;
				nLevel = (!nLevel) ? ig.game.settings.layout.length : nLevel;
				nLevel --;
				var levelService = new LevelService();
				levelService.fnSaveUnlockedLevel(nLevel);
			},
			addHint:function(nHint){
				if(!this.enabled) return;
				nHint = (!nHint) ? 1 : nHint;
				var hintService = new HintService();
				for (var index = 0; index < nHint; index++) {
					hintService.fnAdd();
				}
				if(ig.game.controller.name == 'GameCtrl'){
					ig.game.controller.uiFooter.hintRemaining = hintService.fnGet();
				}
			},
		},
		test:{
			// enabled:true,
			data:[],
			service:new TestingService(),
			thanks:'Thank You!',
			easier:function(prev,current){
				if(!this.enabled) return;
				if(ig.game.controller.name != 'GameCtrl' && (!current || !prev)){
					console.info('You are in Main Menu, you need to provide first and second parameter');
					return this.thanks;
				} 
				if(!prev && !current){
					if(ig.game.controller.level == 0) {
						console.info('You are in level 1, you need to provide first and second parameter');
						return this.thanks;
					}
					current = ig.game.controller.level + 1;
					prev = current;
					this.service.fnSet(prev,current);
					console.info('OK!');
					return this.thanks;
				}else if(prev && !current){
					current = ig.game.controller.level + 1;
					if(prev >= current){
						console.info('First parameter should less than second parameter');
						return this.thanks;
					}else{
						this.service.fnSet(prev,current);
						console.info('OK!');
						return this.thanks;
					}
				}else{
					if(prev >= current){
						console.info('First parameter should less than second parameter');
						return this.thanks;
					}else{
						if(!prev){
							console.info('First parameter should higher than 0');
							return this.thanks;
						}
						this.service.fnSet(prev,current);
						console.info('OK!');
						return this.thanks;
					}
				}
			},
			easierReset:function(replace){
				if(this.service.fnReset(replace))
					console.info('OK!');
				else
					console.info('Data should in stringified json');
				return 'Thank You!'
			},
			easierReport:function(){
				console.info('Thank You!. Let we know this report by copy and paste to the chat room');
				return JSON.stringify(this.service.fnGet());
			},
		}
	});
});	