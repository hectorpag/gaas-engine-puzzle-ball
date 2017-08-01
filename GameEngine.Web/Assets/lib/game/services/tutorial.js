/// <reference path='../../../.vscode/impact-intel.d.ts' />

ig.module('game.services.tutorial')
.requires(
    //Other required class
    'game.app.service'
)
.defines(function () {
    TutorialService = Service.extend({
        fnGet:function(){
            /**@type{AppService}*/
            var o = this;
            return o._get('tutorial') || false;
        },
        fnSet:function(){
            /**@type{AppService}*/
            var o = this;
            o._set('tutorial',true);
        },
    })
});