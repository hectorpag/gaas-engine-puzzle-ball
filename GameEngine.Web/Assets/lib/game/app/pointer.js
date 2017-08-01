/**
 * This plugins is to support game.entities.pointer
 * 
 * @version 0.1.1
 * 
 * @since 0.1.0
 *
 * @author andrian.alfarabi@impact360design.com
 */
ig.module('game.app.pointer')
.requires('game.entities.pointer-selector')
.defines(function(){
	PointerApp = EntityPointerSelector.extend({
		name:"PointerApp",
		size:{x:1,y:1},

		init:function(x,y,settings){
			this.parent(x,y,settings);
		},

		update:function(){
			this.parent();
			// this.fnSetCenter('both',this.pos);
			if(this.hoveringItem && this.hoveringItem.cursor)
				document.body.style.cursor = this.hoveringItem.cursor;
			else
				document.body.style.cursor = 'inherit';
		},

        // fnUpdatePos:function(){
        //      this.fnSetCenter('both',this.pos);
        //      if(this.hoveringItem && this.hoveringItem.cursor)
        //          document.body.style.cursor = this.hoveringItem.cursor;
        //      else
        //          document.body.style.cursor = 'inherit';
        // },

        /**
         * To force pointer escape from its state
         * @return {void}
         */
        fnLetGo: function() {
            // this.firstClick = false ;
            this.hoveringItem = null;
        },

		/**
		 * This is copied from game.app.entity. should see on app.entity comment
		 * @see game.app.entity
		 */
		fnGetCenter:function(bRelavive){
            var results = {};
            results =  {
                x : this.pos.x + (this.size.x/2),
                y : this.pos.y + (this.size.y/2),
            }

            if(bRelavive){
                results.x -= ig.game.screen.x;
                results.y -= ig.game.screen.y;
            }

            return results;
        },

       
       /**
        * Set pointer to specific axis.
        * @param  {string}  type      anchor {'both'|'x'|'y'}
        * @param  {axis}    pos       center position {x,y}
        * @param  {[type]}  extraPos  extra position {x,y}
        * @param  {boolean} bFixed    is related to the ig.game.screen instead of ig.system default is true which always follow system
        * @return {[type]}            void
        */
        fnSetCenter:function(type,pos,extraPos,bFixed){
            if(!type || !pos) return false;
            switch(type){
                case 'x':
                    if(typeof pos != 'number') return false;
                    var addition = (extraPos && typeof extraPos == 'number') ? extraPos : 0;
                    this.pos.x = pos - (this.size.x/2) + addition;
                break;
                case 'y':
                    if(typeof pos != 'number') return false;
                    var addition = (extraPos && typeof extraPos == 'number') ? extraPos : 0;
                    this.pos.y = pos - (this.size.y/2) + addition;
                break;
                case 'both':
                    if(typeof pos != 'object' || !pos.x || !pos.y) return false;
                    var addition = {x:0,y:0};
                    addition.x = (extraPos && extraPos.x) ? extraPos.x : 0;
                    addition.y = (extraPos && extraPos.y) ? extraPos.y : 0;
                    this.pos = {
                        x : pos.x - (this.size.x/2) + addition.x,
                        y : pos.y - (this.size.y/2) + addition.y
                    }
                break;
            }
            if(!bFixed){
                this.pos.x += ig.game.screen.x;
                this.pos.y += ig.game.screen.y;
            }else{
                this.pos.x -= ig.game.screen.x;
                this.pos.y -= ig.game.screen.y;
            }
            return this;
        },

        check:function(other){
            if(other.disablePointer)
                return;
            this.parent(other);
        },
	});
});