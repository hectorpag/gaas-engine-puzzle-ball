/**
 * This is used to make entity handling easier. you can put more helper function in here
 *
 * @version 0.1.4
 * 
 * @since 0.1.0
 * 
 * @author andrian.alfarabi@impact360design.com
 */
ig.module('game.app.entity')
.requires(
	'impact.entity'
)
.defines(function () {
	Entity = ig.Entity.extend({
		//Variables,
		
        
		init:function(x,y,settings){
			//Do something with construction
            if(ig.global.wm){
                var r=Math.floor(Math.random() * (256 - 0 + 1)) + 0;
                var g=Math.floor(Math.random() * (256 - 0 + 1)) + 0;
                var b=Math.floor(Math.random() * (256 - 0 + 1)) + 0;
                var a=1;
                this._wmDrawBox = true;
                this_wmBoxColor = "rgba("+r+","+b+","+g+","+a+")";
            }
            this.parent(x,y,settings);
		},

        /**
         * Get center position of the entity
         * 
         * @param  {boolean} bRelative  position related to the ig.system
         * 
         * @return {axis}               {x,y}
         */
		fnGetCenter:function(bRelative){
            var results = {};
            results =  {
                x : this.pos.x + (this.size.x/2),
                y : this.pos.y + (this.size.y/2),
            }

            if(bRelative){
                results.x -= ig.game.screen.x;
                results.y -= ig.game.screen.y;
            }

            return results;
        },

        /**
         * Get normal position given center position
         * 
         * @param  {axis}       axCenterPos     center poisition of the entity should be
         * 
         * @param  {boolean}    bRelative       position related to ig.system
         * 
         * @return {axis}                       {x,y}
         */
        fnGetPosByCenter:function(axCenterPos, bRelative){
            var result = {
                x:axCenterPos.x - (this.size.x/2),
                y:axCenterPos.y - (this.size.y/2)
            }
            if(bRelative){
                results.x -= ig.game.screen.x;
                results.y -= ig.game.screen.y;
            }
            return result;
        },

        /**
         * Get bottom and right position of the entity
         * 
         * @param  {boolean} bRelative  position related to ig.system
         * 
         * @return {axis}               {x,y}
         */
        fnGetBottomRight:function(bRelative){
            var result = {
                x:this.pos.x + this.size.x,
                y:this.pos.y + this.size.y
            }
            if(bRelative){
                results.x -= ig.game.screen.x;
                results.y -= ig.game.screen.y;
            }
            return result
        },

        /**
         * Easy access to ig.game.states
         * 
         * @param  {string} sKey    element of ig.game.states set it to false/null to get all the states
         * 
         * @return {any}            could be any type
         */
        fnGetState:function(sKey){
            if(sKey)
                return (ig.game.states[sKey] !== undefined) ? ig.game.states[sKey] : false;
            else
                return ig.game.states;
        },

        /**
         * Get state specific to current controller, instead of state available on states.js
         * 
         * @param  {string} sKey    field of the state
         * 
         * @return {any}            any value of requested state
         */ 
        fnGetLocalState:function(sKey){
            return this.fnGetController().fnGetLocalState(sKey);
        },

        /**
         * Easy access to ig.game.settings
         * 
         * @param  {string} sKey    element of ig.game.settings set it to false/null to get all the settings
         * 
         * @return {any}            could be any type
         */
        fnGetSetting:function(sKey){
            if(sKey)
                return (ig.game.settings[sKey]) ? ig.game.settings[sKey] : false;
            else
                return ig.game.settings;
        },

        /**
         * Get helper
         *
         * @see game/app/helper.js
         * 
         * @return {object} collection of helper
         */
        fnGetHelper:function(){
            return ig.game.helper;
        },

        /**
         * Easy access for ig.game.getEntitiesByType()
         * 
         * @param  {object} oType   Impact entity object
         * 
         * @return {array}          collection of entities with same type
         */
        fnGetEntities:function(oType){
            var result = ig.game.getEntitiesByType(oType);
            return result;
        },

        /**
         * Easy access for ig.game.getEntities(oType)[0]. this will return first element of the entities
         * 
         * @param  {object} oType   Impact entity object
         * 
         * @return {object}         return object if found. return false other wise
         */
        fnGetEntity:function(oType){
            var result = this.fnGetEntities(oType);
            result = (result && result[0]) ? result[0] : false;
            return result;
        },
        
        /**
         * Get current active controller
         * However you need to use controller on weltmeister.
         * 
         * @see game/app/controller
         * 
         * @return {Controller}
         */
        fnGetController:function(){
            return ig.game.controller;
        },

        /**
         * Get current pointer
         * However you need to use controller on weltmeister.
         * 
         * @see game/app/controller
         * 
         * @return {PointerApp}
         */
        fnGetPointer:function(){
            return ig.game.pointer;
        },

        /**
         * Easy access of ig.game.context
         * @return {context} return ig.system.context
         */
        fnGetContext:function(){
        	return ig.system.context;
        },
        
        /**
        * Set pointer to specific axis.
        * @param  {string}  type      anchor {'both'|'x'|'y'}
        * @param  {axis}    pos       center position {x,y}
        * @param  {[type]}  extraPos  extra position {x,y}
        * @param  {boolean} bRelative is related to the ig.game.screen instead of ig.system default is false which always follow screen
        * @return {[type]}            void
        */
        fnSetCenter:function(type,pos,extraPos,bRelative){
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
            if(bRelative){
                this.pos.x -= ig.game.screen.x;
                this.pos.y -= ig.game.screen.y;
            }
            return this;
        },
        
        //Helper-------------------------------------
        //Short cut of ig.game.spawnEntity(EntityClass)
        fnSpawn:function(Entity,x,y,settings){
            return ig.game.spawnEntity(Entity,x,y,settings);
        },
        
        //Short cut of writing text using ig.game.context
        fnCtxWrite:function(string,family,size,color,align,x,y){
            // if(ig.global.wm) return;
            ig.system.context.font = size+"pt "+family  ;
            ig.system.context.textAlign = align;
            ig.system.context.fillStyle = color;
            ig.system.context.fillText(string,x,y);
            ig.system.context.restore();
        },

        fnCtxDot:function(x,y,color,size){
            size = size || 2;
            ig.system.context.fillStyle = color || 'black';
            ig.system.context.fillRect( x, y, size, size );
            ig.system.context.restore();
        },

        /**
         * Draw black overaly on it self
         */
        fnDrawOverlay:function(x,y,sRgba){
            ig.system.context.beginPath();
			ig.system.context.rect(0, 0, x, y);
			ig.system.context.fillStyle = sRgba;
			ig.system.context.fill();
			ig.system.context.restore;
        },

        //Pointer handling-------------------------
        //these three are for holding. check holding property on specific entity
        //and see if the entity is hold by its pointer.
        clicked:function(){this.pointerHold = true;},
        clicking:function(){},
        released:function(){
            if(!this.pointerHold && this.fnGetPointer().hoveringItem == this)
                for (var i = 0; i < ig.game.entities.length; i++)
                    if(ig.game.entities[i].pointerHold)
                        ig.game.entities[i].pointerHold = false;

            if(this.pointerHold){
                this.pointerHold = false
                this.fnGetPointer().fnLetGo();
            }
        },
        releasedOutside:function(){
            if(this.pointerHold){
                this.pointerHold = false
                this.fnGetPointer().fnLetGo();
            }
        },
        leave:function(){
            document.body.style.cursor = 'inherit';
        },
        over:function(){
            if(this.cursor)
                document.body.style.cursor = this.cursor;
        },
	});

    ig.Animation.inject({
        scale: { x : 1, y: 1, align:{x:false,y:false}},
        
        draw: function( targetX, targetY ) {
            var scale = ig.system.scale;
            ig.system.context.save();
            var originX = 0, originY = 0;
            originX = (this.scale.align && this.scale.align.x && this.scale.align.x == 'left') ?  targetX
                    : (this.scale.align && this.scale.align.x && this.scale.align.x == 'right') ? targetX + this.sheet.width
                    : targetX + (this.sheet.width/2);
            originY = (this.scale.align && this.scale.align.y && this.scale.align.y == 'top') ?  targetY
                    : (this.scale.align && this.scale.align.y && this.scale.align.y == 'bottom') ? targetY + this.sheet.height
                    : targetY + (this.sheet.height/2);
            ig.system.context.translate(originX * scale, originY * scale);
            ig.system.context.scale(this.scale.x,this.scale.y);
            ig.system.context.translate(-originX * scale, -originY * scale);
            this.parent(targetX, targetY);
            ig.system.context.restore();
        }
    });

});