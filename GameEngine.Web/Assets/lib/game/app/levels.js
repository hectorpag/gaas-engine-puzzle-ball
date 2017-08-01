/**
 * Used for managing level list. instead of using settings its better to arrange level list here
 * It has ability to set default level
 * The game can be started with URL level param. However that feature needs to activate querystring. 
 * See game/app/querystring.js for more details
 *
 * @version 0.1.1
 * 
 * @since 0.1.0
 * 
 * @author andrian.alfarabi@impact360design.com
 */
ig.module('game.app.levels')
.requires(
	//Other required class
	'impact.game',
	//Levels to load
	'game.levels.game',
	'game.levels.mainmenu'
)
.defines(function () {
	ig.Game.inject({
		//Define level to load first
		beginLevel:1,
		//Define level in object
		oLevels:{
			arMobile:[
				LevelMainmenu,
				LevelGame,
			],
			arDesktop:[
				LevelMainmenu,
				LevelGame,
			],
		},
		init:function(){
			this.parent();
		},
		fnMergeLevels:function(arLevels,iOrder){
			if(!arLevels) []
			if(!iOrder) return arLevels
			if(ig.ua.mobile)
				return (iOrder < 0)
					? arLevels.concat(this.oLevels.arMobile)
					: this.oLevels.arMobile.concat(arLevels)
			else
				return (iOrder < 0)
					? arLevels.concat(this.oLevels.arDesktop)
					: this.oLevels.arDesktop.concat(arLevels)
		},
		fnGetBeginLevel:function(){
			this.beginLevel = (this.beginLevel === false) ? this.director.currentLevel : this.beginLevel;
			var tmp = (this.queryString && this.queryString.level) ? parseInt(this.queryString.level) : this.beginLevel;
			return (this.director.levels[tmp]) ? tmp : this.beginLevel;
		},
	});
});