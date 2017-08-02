/// <reference path='../../../../.vscode/impact-intel.d.ts' />

ig.module('game.entities.controllers.mainmenu-ctrl')
.requires(
	'game.app.controller',
	'game.entities.menus.bg-menu',
	'game.entities.menus.btnoption-menu',
	'game.entities.games.option-game',
	'game.entities.games.levelselect-game',
	'game.entities.level-splasher',
	'game.entities.menus.btnplay-menu'
)
.defines(function(){
	EntityMainmenuCtrl = Controller.extend({
		name:"MainmenuCtrl",
		init:function(x,y,settings){
			this.parent(x,y,settings);
			if(!ig.global.wm){
				//Only do in game mode
			}
		},
		ready:function(){
			/**@type{AppEntity}*/
			var _this = this;
			_this.parent();
			this.fnSpawn(EntityLevelSplasher,0,0,{alpha:1}).fnAnimateIn();
			_this.bg = _this.fnSpawn(EntityBgMenu,0,0);
			_this.fnInitButton();
			
		},
		fnInitButton:function(){
			/**@type{AppEntity}*/
			var _this = this;
			_this.btnPlay = _this.fnSpawn(
				EntityBtnplayMenu,0,0,{delay:0}
			);
			_this.btnPlay.fnSetCenter('both',{
				x:ig.system.width/2 + 80,
				y:ig.system.height/2 + 170
			});
			
			if(_SETTINGS.MoreGames.Enabled){
				_this.btnOption = _this.fnSpawn(EntityBtnoptionMenu,0,0,{delay:0.2});
				//_this.btnMoregames = _this.fnSpawn(EntityButtonMoreGames,270,440,{delay:0.4});
				// _this.btnMoregames.pos = {
				// 	x:ig.system.width/2 + 80 - (_this.btnMoregames.size.x / 2),
				// 	y:ig.system.height/2 + 120
				// }
				_this.btnOption.pos = {
					x:ig.system.width/2 - 80 - (_this.btnOption.size.x / 2),
					y:ig.system.height/2 + 120
				}
			}
			else{
				_this.btnOption = _this.fnSpawn(EntityBtnoptionMenu,0,0,{delay:0.2})
				_this.btnOption.pos = {
					x:ig.system.width/2 - (_this.btnOption.size.x / 2),
					y:ig.system.height/2 + 120
				}
			}
		},
		fnGotoGameLevel:function(){
			this.levelSplasher = this.fnSpawn(EntityLevelSplasher,0,0,{
				alpha:0,
				onFinish:function(){
					ig.game.director.loadLevel(2);
				},
				killOnfinish:false,
			}).fnAnimateOut();
		}
	});
});