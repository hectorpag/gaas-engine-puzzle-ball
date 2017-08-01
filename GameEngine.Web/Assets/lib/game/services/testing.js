/// <reference path='../../../.vscode/impact-intel.d.ts' />

ig.module('game.services.testing')
.requires(
    //Other required class
    'game.app.service'
)
.defines(function () {
    TestingService = Service.extend({
        init:function(){
            this.parent('puzzle-ball-testing');
        },
        fnGet:function(){
            /**@type{AppService}*/
            var _this = this;
            var easier = _this._get('easier');
            return (easier) || []; 
        },
        fnSet:function(prev,current){
            /**@type{AppService}*/
            var _this = this;
            var easier = _this.fnGet();
            easier.push({
                easy:current,
                hard:prev
            });
            _this._set('easier',easier);
        },
        fnReset:function(replace){
            /**@type{AppService}*/
            var _this = this;
            if(!replace){
                _this._unset('easier')
                return true;
            }
            else{
                try{
                    var data = JSON.parse(replace);
                    _this._set('easier',data);
                    return true;
                }catch(e){
                    return false;
                }
            }
        },
    });
});