ig.module('game.services.score')
.requires(
	//Other required class
	'game.app.service'
)
.defines(function () {
	ScoreService = Service.extend({
		//Variables,
		score:0,
		//Run this first before processing score
		fnLoad:function(){
			this.score = this._get('score') || {};
			return this;
		},
		fnGet:function(iLevel){
			return this.score[iLevel] || 0;
		},
		fnSet:function(iScore,iLevel){
			if(!this.score[iLevel])
				this.score[iLevel] = iScore;
			else
				this.score[iLevel] = (this.score[iLevel] < iScore) ? iScore : this.score[iLevel];
		},
		//Do not save the record before getting new record otherwise the score will be overwriten
		fnIsNewRecord:function(iLevel){
			if(!this.score[iLevel])
				return true;
			else{
				var scoreStorage = this._get('score')||false;
				if(!scoreStorage) 
					return true;
				else if (!scoreStorage[iLevel])
					return true;
				else
					return (scoreStorage[iLevel] < this.score[iLevel]) ? true : false;
			}
		},
		//Be aware this will overwrite the score. thus make sure to run save score on the last
		fnSave:function(iLevel){
			this._set('score',this.score);
		},
	});
});