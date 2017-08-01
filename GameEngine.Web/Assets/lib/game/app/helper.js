/**
 * This is used to make other counting stuff easier
 *
 * @version 0.1.1
 * 
 * @since 0.1.1
 * 
 * @author andrian.alfarabi@impact360design.com
 */
ig.module('game.app.helper')
.requires(
	//Other required class
	'impact.game'
)
.defines(function () {
	ig.Game.inject({
		init:function(){
			this.parent();
		},
		helper:{
			//-------------Rounding
			fnR1D:function(fNumber){
				return Math.round(fNumber*10)/10;
			},
			fnR2D:function(fNumber){
				return Math.round(fNumber*100)/100;
			},
			fnR3D:function(fNumber){
				return Math.round(fNumber*1000)/1000;
			},
			fnR4D:function(fNumber){
				return Math.round(fNumber*10000)/10000;
			},
			fnR5D:function(fNumber){
				return Math.round(fNumber*100000)/100000;
			},
			fnGetDistance:function(p1,p2){
				return Math.sqrt( (p2.x-=p1.x)*p2.x + (p2.y-=p1.y)*p2.y );
			},
			fnCreateTileHelper:function(settings){
				var tile = ig.game.spawnEntity(EntityTileHelper,0,0,settings);
			},
			fnRoundRect:function(ctx, x, y, width, height, radius, fill, stroke) {
				if (typeof stroke == 'undefined') {
					stroke = true;
				}
				if (typeof radius === 'undefined') {
					radius = 5;
				}
				if (typeof radius === 'number') {
					radius = {tl: radius, tr: radius, br: radius, bl: radius};
				} else {
					var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
					for (var side in defaultRadius) {
						radius[side] = radius[side] || defaultRadius[side];
					}
				}
				ctx.beginPath();
				ctx.moveTo(x + radius.tl, y);
				ctx.lineTo(x + width - radius.tr, y);
				ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
				ctx.lineTo(x + width, y + height - radius.br);
				ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
				ctx.lineTo(x + radius.bl, y + height);
				ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
				ctx.lineTo(x, y + radius.tl);
				ctx.quadraticCurveTo(x, y, x + radius.tl, y);
				ctx.closePath();
				if (fill) {
					ctx.fill();
				}
				if (stroke) {
					ctx.stroke();
				}

			},
		}
	});
});