/**
 * This is to store game state.
 * Every state available should have reset function
 * 
 * @example
 * onMove default is false, then you cahange it toonMove = true. then you should make resetOnMove:function(){this.onMove = false}
 * However it has no automatic call on both onMove or resetOnMove. Its just for your code behavior
 *
 * @since 0.1.0
 * 
 * @author andrian.alfarabi@impact360design.com
 */
ig.module('game.app.states')
.requires(
	//Other required class
	'impact.game'
)
.defines(function () {
	ig.Game.inject({
		states:{
			//DEFINE-------------------------------
			isPaused:false,

			//RESET--------------------------------
			isPusedReset:function(){this.isPaused = false},
		}
	});
});