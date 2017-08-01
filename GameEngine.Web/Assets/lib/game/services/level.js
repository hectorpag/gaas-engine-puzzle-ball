ig.module('game.services.level')
.requires(
	//Other required class
	'game.app.service'
)
.defines(function () {
	LevelService = Service.extend({
		//Variables,
		/**
		 * Memorize latest level
		 * used by 
		 * Game controller and Select level
		 */
		level:0,
		unlockedLevel:0,
		//Functions
		fnSaveLevel:function(iLevel){
			this._set('level',iLevel);
			this.level = iLevel;
			return this;
		},
		fnLoadLevel:function(){
			this.level = this._get('level') || 0;
			return this;
		},
		fnGetLevel:function(){
			return this.level;
		},
		fnSaveUnlockedLevel:function(iLevel){
			this._set('unlockedLevel',iLevel);
		},
		fnGetUnlockedLevel:function(){
			return this._get('unlockedLevel') || 0;

		},
	});
});