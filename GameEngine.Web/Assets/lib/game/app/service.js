/**
 * Used to combine data in a namespace whcih represents a field on the storage.
 * However you can have multiple namespace by setting nameSpace variable on each inherited service object
 * This class needs game.app.storage included
 *
 * @since 0.1.0
 *
 * @author andrian.alfarabi@impact360design.com
 */
ig.module('game.app.service')
.requires(
	//Other required class
	'game.app.storage'
)
.defines(function () {
	Service = ig.Class.extend({
		//Change default namespace here
		nameSpace:'puzzle-ball',
		init:function(nameSpace){
			this.nameSpace = (nameSpace) || this.nameSpace;
		},
		fnSetNameSpace:function(sNameSpace){
			this.nameSpace = sNameSpace;
		},
		_set:function(sKey,value){
			var data = this._get();
			data[sKey] = value;
			ig.game.storage.set(this.nameSpace,data);
			return this;
		},
		_unset:function(sKey){
			var data = this._get();
			delete(data[sKey])
			ig.game.storage.set(this.nameSpace,data);
		},
		_get:function(sKey){
			var data = ig.game.storage.get(this.nameSpace);
			if(
				! data
				|| data === undefined
				|| typeof data !== 'object'
			){
				data = {};
			}
			if(sKey){
				return (data[sKey] != undefined) ? data[sKey] : undefined;
			}
			else
				return data;
		},
	});
});