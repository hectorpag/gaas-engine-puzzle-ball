/**
 * This is used for controlling game play on each level
 * This class will automatically set controller and create pointer on ig.game when the level is started
 * 
 * Lets assume each level has controller, and each level are designed using weltmeister at least.
 * So we should put controller entity on the level using weltmeister.
 *
 * @example
 * Create a new controller extending this class, then put once on the level using weltmeister.
 *
 * @version 0.1.2
 * 
 * @since 0.1.0
 * 
 * @author andrian.alfarabi@impact360design.com
 */
ig.module('game.app.controller')
.requires(
	'impact.entity',
	'game.app.pointer'
)
.defines(function () {
	Controller = ig.Entity.extend({
		//Variables,
		name:"Controller",
		_wmDrawBox: true,
		_wmBoxColor: 'rgba(0, 0, 255, 0.7)',
		size:{x:20,y:20},
		pos:{x:550,y:466},
		zIndex:1000,
        localState:{},
		init:function(){
			//Do something with construction
			if(!ig.global.wm){
				ig.game.controller = this;
				ig.game.pointer = ig.game.spawnEntity(PointerApp,ig.system.width/2, ig.system.height/2);
				ig.game.sortEntitiesDeferred();
			}
		},

		/**
         * Easy access to ig.game.states
         * 
         * @param  {string} sKey    element of ig.game.states set it to false/null to get all the states
         * 
         * @return {any}            could be any type
         */
        fnGetState:function(sKey){
            if(sKey)
                return (ig.game.states[sKey] !== undefined) ? ig.game.states[sKey] : false;
            else
                return ig.game.states;
        },

        /**
         * Get state specific to current controller, instead of state available on states.js
         * 
         * @param  {string} sKey    field of the state
         * 
         * @return {any}            any value of requested state
         */ 
        fnGetLocalState:function(sKey){
            if(sKey)
                return (this.localState[sKey] !== undefined) ? this.localState[sKey] : false;
            else
                return this.localState;
        },

        /**
         * Easy access to ig.game.settings
         * 
         * @param  {string} sKey    element of ig.game.settings set it to false/null to get all the settings
         * 
         * @return {any}            could be any type
         */
        fnGetSetting:function(sKey){
            if(sKey)
                return (ig.game.settings[sKey]) ? ig.game.settings[sKey] : false;
            else
                return ig.game.settings;
        },

        /**
         * Easy access to ig.game.spawnEntity
         * @param  {object} oEntity     Entity to be spawn
         * @param  {integer} x          position x
         * @param  {integer} y          position y
         * @param  {object|null}        settings other settings
         * @return {void}          
         */
        fnSpawn:function(oEntity,x,y,settings){
            return ig.game.spawnEntity(oEntity,x,y,settings);
        },

        /**
         * Get helper
         *
         * @see game/app/helper.js
         * 
         * @return {object} collection of helper
         */
        fnGetHelper:function(){
            return ig.game.helper;
        },

	});
});