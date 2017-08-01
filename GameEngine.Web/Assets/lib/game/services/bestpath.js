ig.module('game.services.bestpath')
.requires(
	//Other required class
	'game.app.service'
)
.defines(function () {
	BestpathService = Service.extend({
		//Variables,
		bestPath:0,
		//Run this first before processing path
		fnLoad:function(){
			this.bestPath = this._get('bestpath') || {};
			return this;
		},
		fnGet:function(iLevel){
			return this.bestPath[iLevel] || 0;
		},
		fnSet:function(iPath,iLevel){
				this.bestPath[iLevel] = iPath;
			// if(!this.bestPath[iLevel])
			// 	this.bestPath[iLevel] = iPath;
			// else
			// 	this.bestPath[iLevel] = (this.bestPath[iLevel] < iPath) ? iPath : this.bestPath[iLevel];
		},
		//Do not save the record before getting new record otherwise the path will be overwriten
		fnIsNewRecord:function(iPath,iLevel){
			var bestPathStorage = this._get('bestpath')||false;
			if(!bestPathStorage) 
				return true;
			else if (!bestPathStorage[iLevel])
				return true;
			else
				return (bestPathStorage[iLevel] > iPath) ? true : false;
		},
		//Be aware this will overwrite the path. thus make sure to run save path on the last
		fnSave:function(iLevel){
			this._set('bestpath',this.bestPath);
		},
	});
});