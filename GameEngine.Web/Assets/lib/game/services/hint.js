/// <reference path='../../../.vscode/impact-intel.d.ts' />

ig.module('game.services.hint')
.requires(
    //Other required class
    'game.app.service'
)
.defines(function () {
    HintService = Service.extend({
        /**Get hint remaining directly from storage */
        fnGet:function(){
            /**@type{AppService}*/
            var o = this;
            return o._get('hint')||0;
        },
        /**Add hint and save direclty to the storage */
        fnAdd:function(){
            /**@type{AppService}*/
            var o = this;
            o._set('hint',this.fnGet()+1);
        },
        fnReduce:function(){
            /**@type{AppService}*/
            var o = this;
            var remaining = o.fnGet();
            remaining -= (remaining>0) ? 1 : 0;
            o._set('hint',remaining);
        },
        /**
         * Get checked hints of each level.
         * Used to check 
         */
        fnGetHints:function(){
            /**@type{AppService}*/
            var o = this;
            return o._get('hints') || {};
        },
        fnSetHints:function(iLevel){
            /**@type{AppService}*/
            var o = this;
            var hints = this.fnGetHints();
            hints[iLevel] = true;
            o._set('hints',hints);
        },
    });
});