/// <reference path='../../../../.vscode/impact-intel.d.ts' />
ig.module('game.entities.games.tilehint-game')
.requires(
    //Other required class
    'game.app.entity'
)
.defines(function () {
    EntityTilehintGame = Entity.extend({
        name:'TilehintGame',
        size:{x:98,y:98},
        tileType:false,
        tileHalf:49,
        tileQuart:18,
        tileREdge:15,
        delay:false,
        init:function(x,y,settings){
            this.parent(x,y,settings)
            if(!ig.global.wm){
                //Only do in game mode
                this.delay = new ig.Timer(this.delay);
                if(this.centerPos)
                    this.fnSetCenter('both',this.centerPos);
                //--------------------
                this.zIndex = this.fnGetSetting('enIdx').tileHint;
                ig.game.sortEntitiesDeferred();
            }
        },
        draw:function(){
            /**@type{AppEntity}*/
            var _this = this;
            _this.parent();
            if(this.delay.delta()<0) return;
            var center = _this.fnGetCenter();
            var br = _this.fnGetBottomRight();

            if(!this.tileDir) return;
            
            switch (_this.tileDir) {
                case 'h':
                    ig.system.context.beginPath();
                    ig.system.context.moveTo(center.x - _this.tileHalf, center.y - _this.tileQuart);
                    ig.system.context.lineTo(center.x + _this.tileHalf, center.y - _this.tileQuart);
                    ig.system.context.lineTo(center.x + _this.tileHalf, center.y + _this.tileQuart);
                    ig.system.context.lineTo(center.x - _this.tileHalf, center.y + _this.tileQuart);
                    ig.system.context.fillStyle = _this.fnGetSetting('color').tileHint;
                    ig.system.context.fill();
                    ig.system.context.restore();
                    break;

                case 'v':
                    ig.system.context.beginPath();
                    ig.system.context.moveTo(center.x - _this.tileQuart, center.y - _this.tileHalf);
                    ig.system.context.lineTo(center.x + _this.tileQuart, center.y - _this.tileHalf);
                    ig.system.context.lineTo(center.x + _this.tileQuart, center.y + _this.tileHalf);
                    ig.system.context.lineTo(center.x - _this.tileQuart, center.y + _this.tileHalf);
                    ig.system.context.fillStyle = _this.fnGetSetting('color').tileHint;
                    ig.system.context.fill();
                    ig.system.context.restore();
                    break;
                
                case 't':
                    ig.system.context.beginPath();
                    ig.system.context.moveTo(center.x - _this.tileQuart, center.y - _this.tileREdge);
                    ig.system.context.arc(center.x,center.y - _this.tileREdge,_this.tileQuart,0,Math.PI,true);
                    ig.system.context.lineTo(center.x + _this.tileQuart, center.y - _this.tileREdge);
                    ig.system.context.lineTo(center.x + _this.tileQuart, center.y + _this.tileHalf);
                    ig.system.context.lineTo(center.x - _this.tileQuart, center.y + _this.tileHalf);
                    ig.system.context.fillStyle = _this.fnGetSetting('color').tileHint;
                    ig.system.context.fill();
                    ig.system.context.restore();
                    break;
                    
                case 'l':
                    ig.system.context.beginPath();
                    ig.system.context.moveTo(center.x - _this.tileREdge, center.y - _this.tileQuart);
                    ig.system.context.lineTo(center.x + _this.tileHalf, center.y - _this.tileQuart);
                    ig.system.context.lineTo(center.x + _this.tileHalf, center.y + _this.tileQuart);
                    ig.system.context.lineTo(center.x - _this.tileREdge, center.y + _this.tileQuart);
                    ig.system.context.arc(
                        center.x - _this.tileREdge, center.y,
                        _this.tileQuart,
                        Math.PI * 0.5,
                        true
                    )
                    ig.system.context.fillStyle = _this.fnGetSetting('color').tileHint;
                    ig.system.context.fill();
                    ig.system.context.restore();
                    break;
                    
                case 'r':
                    ig.system.context.beginPath();
                    ig.system.context.moveTo(center.x + _this.tileREdge, center.y + _this.tileQuart);
                    ig.system.context.lineTo(center.x - _this.tileHalf, center.y + _this.tileQuart);
                    ig.system.context.lineTo(center.x - _this.tileHalf, center.y - _this.tileQuart);
                    ig.system.context.lineTo(center.x + _this.tileREdge, center.y - _this.tileQuart);
                    ig.system.context.arc(center.x + _this.tileREdge,center.y,_this.tileQuart, Math.PI * 1.5,Math.PI * 0.5)
                    ig.system.context.fillStyle = _this.fnGetSetting('color').tileHint;
                    ig.system.context.fill();
                    ig.system.context.restore();
                    break;

                case 'b':
                    ig.system.context.beginPath();
                    ig.system.context.moveTo(center.x - _this.tileQuart, center.y - _this.tileHalf);
                    ig.system.context.lineTo(center.x + _this.tileQuart, center.y - _this.tileHalf);
                    ig.system.context.lineTo(center.x + _this.tileQuart, center.y + _this.tileREdge);
                    ig.system.context.arc(center.x,center.y + _this.tileREdge,_this.tileQuart,0,Math.PI,false);
                    ig.system.context.lineTo(center.x - _this.tileQuart, center.y + _this.tileREdge);
                    ig.system.context.fillStyle = _this.fnGetSetting('color').tileHint;
                    ig.system.context.fill();
                    ig.system.context.restore();
                    break;

                case 'lt':

                    ig.system.context.beginPath();
                    ig.system.context.moveTo(
                        _this.pos.x + 31, _this.pos.y
                    );

                    //curve1--------------------------------------------
                    ig.system.context.quadraticCurveTo(
                        _this.pos.x + 23 + 8, _this.pos.y + 24 - 6,//control
                        _this.pos.x + 23, _this.pos.y + 24//Target
                    );
                    ig.system.context.quadraticCurveTo(
                        _this.pos.x + 16, _this.pos.y + 31,//control
                        _this.pos.x, _this.pos.y + 31//Target
                    );

                    //----------------------
                    ig.system.context.lineTo(
                        _this.pos.x,
                        _this.pos.y + 67
                    );
                    ig.system.context.lineTo(
                        _this.pos.x + 10,
                        _this.pos.y + 67
                    );

                    //Curve2-----------------
                    ig.system.context.quadraticCurveTo(
                        _this.pos.x + 50 - 15,  _this.pos.y + 50 + 16,//control
                        _this.pos.x + 50,  _this.pos.y + 50//target
                    );
                    
                    ig.system.context.quadraticCurveTo(
                        _this.pos.x + 67, _this.pos.y + 10 + 22,//
                        _this.pos.x + 67, _this.pos.y + 10//
                    );

                    //----------------------
                    ig.system.context.lineTo(
                        _this.pos.x + 67,
                        _this.pos.y
                    );
                    ig.system.context.lineTo(
                        _this.pos.x + 31, _this.pos.y
                    );
                    
                    ig.system.context.fillStyle = _this.fnGetSetting('color').tileHint;
                    ig.system.context.fill();
                    // ig.system.context.strokeStyle="black";
                    // ig.system.context.stroke();
                    ig.system.context.restore();
                    break;
                    
                case 'lb':
                    ig.system.context.beginPath();
                    ig.system.context.moveTo(_this.pos.x + 31, br.y);
                    //curve1------------------------------------
                    ig.system.context.quadraticCurveTo(
                        _this.pos.x + 24 + 9, br.y - 24 + 10,
                        _this.pos.x + 24, br.y - 24
                    )
                    ig.system.context.quadraticCurveTo(
                        _this.pos.x + 15, br.y - 31 - 2,
                        _this.pos.x, br.y - 31
                    )
                    //--------------------------------------------
                    ig.system.context.lineTo(_this.pos.x, center.y - _this.tileQuart);
                    ig.system.context.lineTo(_this.pos.x + 10, center.y - _this.tileQuart);
                    //Curve2--------------------------------------
                    ig.system.context.quadraticCurveTo(
                        center.x - _this.tileQuart + 3, center.y - _this.tileQuart,
                        center.x + 3, center.y
                    );
                    ig.system.context.quadraticCurveTo(
                        center.x + _this.tileQuart,center.y + _this.tileHalf-10 - 20,
                        center.x + _this.tileQuart,center.y + _this.tileHalf-10
                    );
                    //--------------------------
                    ig.system.context.lineTo(center.x + _this.tileQuart, center.y + _this.tileHalf);
                    ig.system.context.lineTo(center.x - _this.tileQuart, center.y + _this.tileHalf)
                    ig.system.context.fillStyle = _this.fnGetSetting('color').tileHint;
                    ig.system.context.fill();
                    // ig.system.context.strokeStyle="black";
                    // ig.system.context.stroke();
                    ig.system.context.restore();
                    break;
                case 'rb':
                    ig.system.context.beginPath();
                    ig.system.context.moveTo(center.x + _this.tileQuart, center.y + _this.tileHalf);
                    //curve1----------------------
                    ig.system.context.lineTo(center.x + _this.tileQuart, center.y + _this.tileHalf - 5);
                    ig.system.context.quadraticCurveTo(
                        br.x - 24 - 8, br.y - 24 + 8,
                        br.x - 24, br.y - 24
                    )
                    ig.system.context.quadraticCurveTo(
                        br.x - 10 - 8, center.y + _this.tileQuart + 2,
                        br.x - 10, center.y + _this.tileQuart
                    )
                    ig.system.context.lineTo(br.x, center.y + _this.tileQuart);
                    //----------------------------
                    ig.system.context.lineTo(br.x, center.y - _this.tileQuart);
                    //Curve2----------------------
                    ig.system.context.lineTo(br.x - 10, center.y - _this.tileQuart);
                    ig.system.context.quadraticCurveTo(
                        center.x-5 + _this.tileQuart,center.y - _this.tileQuart + 1,
                        center.x-2,center.y
                    )
                    ig.system.context.quadraticCurveTo(
                        center.x - _this.tileQuart + 2, center.y + 12,
                        center.x - _this.tileQuart, br.y - 10
                    )
                    ig.system.context.lineTo(center.x - _this.tileQuart, br.y)
                    //-------------------------------
                    ig.system.context.lineTo(center.x + _this.tileQuart, center.y + _this.tileHalf);
                    ig.system.context.fillStyle = _this.fnGetSetting('color').tileHint;
                    ig.system.context.fill();
                    // ig.system.context.strokeStyle="black";
                    // ig.system.context.stroke();
                    ig.system.context.closePath();
                    ig.system.context.restore();
                    break;
                case 'rt':
                    ig.system.context.beginPath();
                    ig.system.context.moveTo(br.x, center.y - _this.tileQuart);

                    //Curve1-------------------------
                    ig.system.context.lineTo(br.x - 5, center.y - _this.tileQuart);
                    ig.system.context.quadraticCurveTo(
                        br.x - 24 + 5, _this.pos.y + 24 + 5,
                        br.x - 24, _this.pos.y + 24
                    );
                    ig.system.context.quadraticCurveTo(
                        center.x + _this.tileQuart, _this.pos.y + 5 + 10,
                        center.x + _this.tileQuart, _this.pos.y + 5
                    );
                    ig.system.context.lineTo(center.x + _this.tileQuart, _this.pos.y);
                    //--------------------------------
                    ig.system.context.lineTo(center.x - _this.tileQuart, _this.pos.y);
                    //Curve2--------------------------
                    ig.system.context.lineTo(center.x - _this.tileQuart, _this.pos.y + 10);
                    ig.system.context.quadraticCurveTo(
                        center.x - 2 - 15, center.y - 15,
                        center.x - 2, center.y
                    );
                    ig.system.context.quadraticCurveTo(
                        br.x - 10 - 22, center.y + _this.tileQuart,
                        br.x - 10, center.y + _this.tileQuart
                    );
                    ig.system.context.lineTo(br.x,center.y + _this.tileQuart);
                    //--------------------------------
                    ig.system.context.lineTo(br.x, center.y - _this.tileQuart);



                    ig.system.context.fillStyle = _this.fnGetSetting('color').tileHint;
                    ig.system.context.fill();
                    // ig.system.context.strokeStyle="black";
                    // ig.system.context.stroke();
                    ig.system.context.closePath();
                    break;
                default:
                    break;
            }

        }
    });
});