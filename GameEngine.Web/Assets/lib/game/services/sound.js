ig.module('game.services.sound')
.requires(
	//Other required class
	'game.app.service'
)
.defines(function () {
	SoundService = Service.extend({
		//Variables,
		fnSetSfx:function(iValue){
			this._set('sfx',iValue);
		},
		fnSetBgm:function(iValue){
			this._set('bgm',iValue);
		},
		fnGetSfx:function(){
			var value = this._get('sfx');
			if(value == undefined || value === false){
				value = 1;
				this.fnSetSfx(value);
			}
			return value;
		},
		fnGetBgm:function(){
			var value = this._get('bgm');
			if(value == undefined || value === false){
				value = 0.5;
				this.fnSetBgm(value);
			}
			return value;
		},
	});
});