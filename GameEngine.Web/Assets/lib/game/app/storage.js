/**
 * Fix browser which has no storage supported
 * Used for service companion.
 * Do not access this since storage has no namespace
 * All data modification should be proccessed trough service
 * If you use normal storage instead of service, then just include this on main.js
 * However you cannot use this plugins if you use both normal storage and service.
 *
 * @since 0.1.0
 * 
 * @author andrian.alfarabi@impact360design.com
 */
ig.module('game.app.storage')
.requires(
	//Other required class
	'impact.game'
)
.defines(function () {
	ig.Game.inject({
		init:function(){
			this.parent();
			try {
                var testStorage = "testStorage";
                localStorage.setItem(testStorage, testStorage);
                localStorage.removeItem(testStorage);
                localStorageSupport='localStorage' in window && window['localStorage'] !== null;
                var nameSpace = this.nameSpace;
                ig.game.storage = new ig.Storage();
            } 
            catch(e){
            	//The localStorage is not supported
            	//Other ig.Storage like functions
            	ig.game.storage = {
					data:{},
					set:function(field,value){
						this.data[field] = value;
					},
					get:function(field){
						return this.data[field];
					},
            	}
            }
		},
	});
});