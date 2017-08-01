/**
 * This is used for saving game settings. This each varilable is not related to automatic function call
 * Just to make same code behavior.
 * In this example, it has custom and fixed setting. Custom setting can be modified, while fixed should not
 *
 * @version 0.1.2
 * 
 * @since 0.1.0
 *
 * @author andrian.alfarabi@impact360design.com
 */
ig.module('game.app.settings')
	.requires(
	//Other required class
	'impact.game'
	)
	.defines(function () {
		ig.Game.inject({
			settings: {
				//Custom---------------------------------

				//Scale pixel to meter for this game.
				//Higher the value quicker the car runs

				//Fixed----------------------------------
				//Entity zIndexing
				enIdx: {
					//Main menu

					//Game
					levelsplasher: 200,

					levelselect: 100,
					starendgame: 50,
					option: 40,
					paused: 30,
					starstatusUiTop: 22,
					uiButtonTop: 21,
					uiFrameTop: 20,
					pathcomplete: 12,
					tutorial: 11,
					hintspin: 10,
					uiButtonBottom: 10,
					uiFrameBottom: 9,
					starpick: 8,
					ball: 7,
					tileHint: 6,
					tile: 5,
					tileBoard: 4,

					//Main menu
					menubackground: 1,
					menubtn: 2,
				},
				color: {
					value: "#FF751F",
					rgbTransitiontext: { r: 128, g: 255, b: 0 },
					rgbTransitiontextShadow: { r: 23, g: 46, b: 0 },
					tileHint: 'rgba(19,191,0,0.7)',
					rgbMovesBase: { r: 255, g: 117, b: 31 },
					rgbMovesAnimate: { r: 255, g: 255, b: 255 },
					captionLeather: "#FFF99E",
					captionBoard: "#3B0B00",//Used for caption on board
					soundLevel: { r: 0, g: 0, b: 0, changed: 'g' },//Used for sound controller
				},
				//Tile layout
				layout: [
					//A
					{
						'a': { gridAx: { x: 1, y: 1 }, type: 'start', dir: 't', isPath: true, ball: true },
						'b': { gridAx: { x: 1, y: 2 }, type: 'wood', dir: 'rt', isPath: true, star: true },
						'c': { gridAx: { x: 2, y: 2 }, type: 'wood', dir: 'lt', isPath: true, star: true },
						'd': { gridAx: { x: 2, y: 1 }, type: 'metal', dir: 'rb', isPath: true, star: true },
						'e': { gridAx: { x: 3, y: 1 }, type: 'wood', dir: 'lb', isPath: true },
						'z': { gridAx: { x: 3, y: 2 }, type: 'goal', dir: 'b', isPath: true, hintspin: true },
					},
					//B
					{
						'a': { gridAx: { x: 1, y: 1 }, type: 'start', dir: 'b', isPath: true, ball: true },
						'b': { gridAx: { x: 1, y: 0 }, type: 'wood', dir: 'lb', isPath: true },
						'c': { gridAx: { x: 0, y: 0 }, type: 'metal', dir: 'rb', isPath: true },
						'd': { gridAx: { x: 0, y: 1 }, type: 'wood', dir: 'v', isPath: true },
						'e': { gridAx: { x: 0, y: 2 }, type: 'wood', dir: 'rt', isPath: true, star: true },
						'f': { gridAx: { x: 1, y: 2 }, type: 'wood', dir: 'h', isPath: true, star: true },
						'g': { gridAx: { x: 2, y: 2 }, type: 'wood', dir: 'lt', isPath: true, star: true },
						'h': { gridAx: { x: 1, y: 3 }, type: 'wood-empty' },
						'z': { gridAx: { x: 2, y: 1 }, type: 'goal', dir: 't', isPath: true, hintspin: true },
					},
					//C
					{
						'a': { gridAx: { x: 1, y: 1 }, type: 'start', dir: 'b', isPath: true, ball: true },
						'b': { gridAx: { x: 1, y: 0 }, type: 'wood', dir: 'lb', isPath: true },
						'c': { gridAx: { x: 0, y: 0 }, type: 'wood', dir: 'rb', isPath: true, star: true },
						'd': { gridAx: { x: 0, y: 1 }, type: 'wood', dir: 'v', isPath: true },
						'e': { gridAx: { x: 0, y: 2 }, type: 'wood', dir: 'rt', isPath: true, star: true },
						'f': { gridAx: { x: 1, y: 2 }, type: 'wood', dir: 'h', isPath: true },
						'g': { gridAx: { x: 2, y: 2 }, type: 'wood', dir: 'lt', isPath: true, star: true },
						'h': { gridAx: { x: 2, y: 3 }, type: 'wood-empty' },
						'z': { gridAx: { x: 2, y: 1 }, type: 'goal', dir: 't', isPath: true, hintspin: true },
					},
					//D
					{
						'a': { gridAx: { x: 0, y: 3 }, type: 'start', dir: 'l', isPath: true, ball: true },

						'b': { gridAx: { x: 1, y: 3 }, type: 'wood', dir: 'lt', isPath: true, star: true},
						'c': { gridAx: { x: 1, y: 2 }, type: 'wood', dir: 'v', isPath: true},
						'd': { gridAx: { x: 1, y: 1 }, type: 'wood', dir: 'v', isPath: true},
						'e': { gridAx: { x: 1, y: 0 }, type: 'metal', dir: 'rb', isPath: true, star: true},
						'f': { gridAx: { x: 2, y: 0 }, type: 'metal', dir: 'lb', isPath: true},
						'g': { gridAx: { x: 2, y: 1 }, type: 'wood', dir: 'v', isPath: true},
						'h': { gridAx: { x: 2, y: 2 }, type: 'wood', dir: 'v', isPath: true},
						'i': { gridAx: { x: 2, y: 3 }, type: 'wood', dir: 'rt', isPath: true, star: true},
						
						'z': { gridAx: { x: 3, y: 3 }, type: 'goal', dir: 'r', isPath: true, hintspin: true },

					},
					//E
					{
						'a': { gridAx: { x: 1, y: 1 }, type: 'start', dir: 'r', isPath: true, ball: true },

						'b': { gridAx: { x: 0, y: 1 }, type: 'wood', dir: 'rb', isPath: true, star: true},
						'c': { gridAx: { x: 0, y: 2 }, type: 'wood', dir: 'rt', isPath: true},
						'd': { gridAx: { x: 1, y: 2 }, type: 'wood', dir: 'h', isPath: true},
						'e': { gridAx: { x: 2, y: 2 }, type: 'wood', dir: 'h', isPath: true, star: true},
						'f': { gridAx: { x: 3, y: 2 }, type: 'wood', dir: 'lt', isPath: true},
						'g': { gridAx: { x: 3, y: 1 }, type: 'wood', dir: 'lb', isPath: true, star: true},
						'h': { gridAx: { x: 1, y: 3 }, type: 'wood-empty'},
						'i': { gridAx: { x: 2, y: 3 }, type: 'wood-empty'},
						
						'z': { gridAx: { x: 2, y: 1 }, type: 'goal', dir: 'l', isPath: true, hintspin: true },
					},
					//F
					{
						'a': { gridAx: { x: 0, y: 0 }, type: 'start', dir: 't', isPath: true, ball: true },
						'b': { gridAx: { x: 0, y: 1 }, type: 'wood', dir: 'v', isPath: true },
						'c': { gridAx: { x: 0, y: 2 }, type: 'wood', dir: 'rt', isPath: true, star: true },
						'd': { gridAx: { x: 1, y: 2 }, type: 'wood', dir: 'h', isPath: true, star: true },
						'e': { gridAx: { x: 2, y: 2 }, type: 'wood', dir: 'lt', isPath: true, star: true },
						'f': { gridAx: { x: 1, y: 1 }, type: 'wood', dir: 'lt' },
						'g': { gridAx: { x: 2, y: 3 }, type: 'wood-empty' },
						'z': { gridAx: { x: 2, y: 1 }, type: 'goal', dir: 't', isPath: true, hintspin: true },
					},
					//G
					{
						'a': { gridAx: { x: 0, y: 0 }, type: 'start', dir: 't', isPath: true, ball: true },
						'b': { gridAx: { x: 0, y: 1 }, type: 'wood', dir: 'rt', isPath: true },
						'c': { gridAx: { x: 1, y: 1 }, type: 'wood', dir: 'lt', isPath: true },
						'd': { gridAx: { x: 1, y: 0 }, type: 'metal', dir: 'rb', isPath: true, star: true },
						'e': { gridAx: { x: 2, y: 0 }, type: 'wood', dir: 'h', isPath: true, star: true },
						'f': { gridAx: { x: 3, y: 0 }, type: 'wood', dir: 'lb', isPath: true },
						'g': { gridAx: { x: 3, y: 1 }, type: 'wood', dir: 'v', isPath: true, star: true },
						'h': { gridAx: { x: 3, y: 2 }, type: 'wood', dir: 'lt', isPath: true },
						'i': { gridAx: { x: 2, y: 2 }, type: 'wood', dir: 'rt', isPath: true },
						'j': { gridAx: { x: 0, y: 2 }, type: 'wood', dir: 'v' },
						'k': { gridAx: { x: 1, y: 2 }, type: 'wood', dir: 'h' },
						'z': { gridAx: { x: 2, y: 1 }, type: 'goal', dir: 't', isPath: true, hintspin: true },
					},
					//H
					{
						'a': { gridAx: { x: 0, y: 3 }, type: 'start', dir: 'l', isPath: true, ball: true },
						'b': { gridAx: { x: 1, y: 3 }, type: 'wood', dir: 'h', isPath: true, star: true },
						'c': { gridAx: { x: 2, y: 3 }, type: 'wood', dir: 'h', isPath: true },
						'd': { gridAx: { x: 3, y: 3 }, type: 'wood', dir: 'lt', isPath: true, star: true },
						'e': { gridAx: { x: 3, y: 2 }, type: 'wood', dir: 'lb', isPath: true },
						'f': { gridAx: { x: 2, y: 2 }, type: 'wood', dir: 'rt', isPath: true, star: true },
						'g': { gridAx: { x: 1, y: 2 }, type: 'wood', dir: 'lt' },
						'h': { gridAx: { x: 0, y: 2 }, type: 'wood', dir: 'rb' },
						'z': { gridAx: { x: 2, y: 1 }, type: 'goal', dir: 't', isPath: true, hintspin: true },
					},
					//I
					{
						'a': { gridAx: { x: 0, y: 3 }, type: 'start', dir: 'l', isPath: true, ball: true },
						'b': { gridAx: { x: 1, y: 3 }, type: 'wood', dir: 'lt', isPath: true, star: true },
						'c': { gridAx: { x: 1, y: 2 }, type: 'wood', dir: 'lb', isPath: true},
						'd': { gridAx: { x: 0, y: 2 }, type: 'wood', dir: 'rt', isPath: true},
						'e': { gridAx: { x: 0, y: 1 }, type: 'wood', dir: 'rb', isPath: true, star: true },
						'f': { gridAx: { x: 1, y: 1 }, type: 'wood', dir: 'h', isPath: true},
						'g': { gridAx: { x: 2, y: 1 }, type: 'wood', dir: 'lb', isPath: true},
						'h': { gridAx: { x: 2, y: 2 }, type: 'wood', dir: 'rt', isPath: true},
						'i': { gridAx: { x: 3, y: 2 }, type: 'wood', dir: 'lt', isPath: true, star: true },
						'j': { gridAx: { x: 2, y: 3 }, type: 'wood-empty'},
						'z': { gridAx: { x: 3, y: 1 }, type: 'goal', dir: 't', isPath: true, hintspin: true },
					},
					//J
					{
						'a': { gridAx: { x: 0, y: 3 }, type: 'start', dir: 'l', isPath: true, ball: true },
						'b': { gridAx: { x: 1, y: 3 }, type: 'wood', dir: 'h', isPath: true},
						'c': { gridAx: { x: 2, y: 3 }, type: 'metal', dir: 'lt', isPath: true, star: true },
						'd': { gridAx: { x: 2, y: 2 }, type: 'wood', dir: 'v', isPath: true},
						'e': { gridAx: { x: 2, y: 1 }, type: 'wood', dir: 'rb', isPath: true, star: true },
						'f': { gridAx: { x: 3, y: 1 }, type: 'wood', dir: 'lb', isPath: true},
						'g': { gridAx: { x: 3, y: 2 }, type: 'wood', dir: 'v', isPath: true, star: true },
						'z': { gridAx: { x: 3, y: 3 }, type: 'goal', dir: 'b', isPath: true, hintspin: true },
					},
					//K
					{
						'a': { gridAx: { x: 0, y: 3 }, type: 'start', dir: 'l', isPath: true, ball: true },
						
						'b': { gridAx: { x: 1, y: 3 }, type: 'wood', dir: 'lt', isPath: true},
						'c': { gridAx: { x: 1, y: 2 }, type: 'wood', dir: 'lb', isPath: true},
						'd': { gridAx: { x: 0, y: 2 }, type: 'metal', dir: 'rt', isPath: true, star:true},
						'e': { gridAx: { x: 0, y: 1 }, type: 'wood', dir: 'rb', isPath: true},
						'f': { gridAx: { x: 1, y: 1 }, type: 'wood', dir: 'h', isPath: true, star:true},
						'g': { gridAx: { x: 2, y: 1 }, type: 'wood', dir: 'h', isPath: true},
						'h': { gridAx: { x: 3, y: 1 }, type: 'wood', dir: 'lb', isPath: true, star:true},
						'i': { gridAx: { x: 3, y: 2 }, type: 'wood', dir: 'v', isPath: true},

						'z': { gridAx: { x: 3, y: 3 }, type: 'goal', dir: 'b', isPath: true, hintspin: true },
					},
					//L
					{
						'a': { gridAx: { x: 0, y: 3 }, type: 'start', dir: 'l', isPath: true, ball: true },
						
						'b': { gridAx: { x: 1, y: 3 }, type: 'wood', dir: 'h', isPath: true},
						'c': { gridAx: { x: 2, y: 3 }, type: 'wood', dir: 'lt', isPath: true, star:true},
						'd': { gridAx: { x: 2, y: 2 }, type: 'wood', dir: 'v', isPath: true},
						'e': { gridAx: { x: 2, y: 1 }, type: 'wood', dir: 'rb', isPath: true, star:true},
						'f': { gridAx: { x: 3, y: 1 }, type: 'metal', dir: 'lb', isPath: true, star:true},
						'g': { gridAx: { x: 3, y: 3 }, type: 'wood-empty'},

						'z': { gridAx: { x: 3, y: 2 }, type: 'goal', dir: 'b', isPath: true, hintspin: true },
					},
					//M
					{
						'a': { gridAx: { x: 0, y: 0 }, type: 'start', dir: 'l', isPath: true, ball: true },

						'b': { gridAx: { x: 1, y: 0 }, type: 'wood', dir: 'lb', isPath: true, star:true},
						'c': { gridAx: { x: 1, y: 1 }, type: 'wood', dir: 'v', isPath: true},
						'd': { gridAx: { x: 1, y: 2 }, type: 'wood', dir: 'rt', isPath: true, star:true},
						'e': { gridAx: { x: 2, y: 2 }, type: 'wood', dir: 'lb', isPath: true, star:true},
						
						'f': { gridAx: { x: 0, y: 1 }, type: 'wood-empty'},
						'g': { gridAx: { x: 0, y: 3}, type: 'wood-empty'},
						'h': { gridAx: { x: 1, y: 3}, type: 'wood-empty'},

						'z': { gridAx: { x: 2, y: 3 }, type: 'goal', dir: 'b', isPath: true, hintspin: true },
					},
					//N
					{
						'a': { gridAx: { x: 0, y: 0 }, type: 'start', dir: 'l', isPath: true, ball: true },

						'b': { gridAx: { x: 1, y: 0 }, type: 'wood', dir: 'lb', isPath: true},
						'c': { gridAx: { x: 1, y: 1 }, type: 'wood', dir: 'rt', isPath: true, star:true},
						'd': { gridAx: { x: 2, y: 1 }, type: 'wood', dir: 'h', isPath: true},
						'e': { gridAx: { x: 3, y: 1 }, type: 'wood', dir: 'lb', isPath: true},
						'f': { gridAx: { x: 3, y: 2 }, type: 'wood', dir: 'lt', isPath: true, star:true},
						'g': { gridAx: { x: 2, y: 2 }, type: 'wood', dir: 'rb', isPath: true, star:true},
						'h': { gridAx: { x: 1, y: 2 }, type: 'wood', dir: 'v'},
						'i': { gridAx: { x: 3, y: 0 }, type: 'wood-empty'},

						'z': { gridAx: { x: 2, y: 3 }, type: 'goal', dir: 'b', isPath: true, hintspin: true },
					},
					//O
					{
						'a': { gridAx: { x: 2, y: 0 }, type: 'start', dir: 't', isPath: true, ball: true },

						'b': { gridAx: { x: 2, y: 1 }, type: 'wood', dir: 'rt', isPath: true, star:true},
						'c': { gridAx: { x: 3, y: 1 }, type: 'wood', dir: 'lb', isPath: true},
						'd': { gridAx: { x: 3, y: 2 }, type: 'wood', dir: 'lt', isPath: true},
						'e': { gridAx: { x: 2, y: 2 }, type: 'metal', dir: 'h', isPath: true},
						'f': { gridAx: { x: 1, y: 2 }, type: 'wood', dir: 'h', isPath: true, star:true},
						'g': { gridAx: { x: 0, y: 2 }, type: 'wood', dir: 'rb', isPath: true, star:true},
						'h': { gridAx: { x: 0, y: 3 }, type: 'wood', dir: 'rt', isPath: true},
						'i': { gridAx: { x: 1, y: 3 }, type: 'wood', dir: 'h', isPath: true},

						'j': { gridAx: { x: 0, y: 0 }, type: 'wood-empty'},
						'k': { gridAx: { x: 1, y: 0 }, type: 'wood-empty'},

						'z': { gridAx: { x: 2, y: 3 }, type: 'goal', dir: 'r', isPath: true, hintspin: true },
					},
					//P
					{
						'a': { gridAx: { x: 3, y: 3 }, type: 'start', dir: 'b', isPath: true, ball: true },

						'b': { gridAx: { x: 3, y: 2 }, type: 'wood', dir: 'v', isPath: true, star:true},
						'c': { gridAx: { x: 3, y: 1 }, type: 'wood', dir: 'lb', isPath: true},
						'd': { gridAx: { x: 2, y: 1 }, type: 'wood', dir: 'h', isPath: true, star:true},
						'e': { gridAx: { x: 1, y: 1 }, type: 'wood', dir: 'rb', isPath: true},
						'f': { gridAx: { x: 1, y: 2 }, type: 'wood', dir: 'v', isPath: true},
						'g': { gridAx: { x: 1, y: 3 }, type: 'wood', dir: 'rt', isPath: true, star:true},
						'h': { gridAx: { x: 0, y: 0 }, type: 'wood-empty'},
						'i': { gridAx: { x: 1, y: 0 }, type: 'wood-empty'},
						'j': { gridAx: { x: 2, y: 0 }, type: 'wood-empty'},
						'k': { gridAx: { x: 0, y: 1 }, type: 'wood-empty'},
						'l': { gridAx: { x: 0, y: 2 }, type: 'wood-empty'},
						'm': { gridAx: { x: 0, y: 3 }, type: 'wood-empty'},

						'z': { gridAx: { x: 2, y: 3 }, type: 'goal', dir: 'r', isPath: true, hintspin: true },
					},
					//Q
					{
						'a': { gridAx: { x: 3, y: 3 }, type: 'start', dir: 'b', isPath: true, ball: true },

						'b': { gridAx: { x: 3, y: 2 }, type: 'wood', dir: 'v', isPath: true},
						'c': { gridAx: { x: 3, y: 1 }, type: 'wood', dir: 'v', isPath: true},
						'd': { gridAx: { x: 3, y: 0 }, type: 'wood', dir: 'lb', isPath: true},
						'e': { gridAx: { x: 2, y: 0 }, type: 'wood', dir: 'rb', isPath: true, star:true},
						'f': { gridAx: { x: 2, y: 1 }, type: 'wood', dir: 'v', isPath: true},
						'g': { gridAx: { x: 2, y: 2 }, type: 'wood', dir: 'lt', isPath: true, star:true},
						'h': { gridAx: { x: 1, y: 2 }, type: 'wood', dir: 'rb', isPath: true},
						'i': { gridAx: { x: 1, y: 3 }, type: 'wood', dir: 'rt', isPath: true, star:true},
						'j': { gridAx: { x: 0, y: 0 }, type: 'wood-empty'},
						'j': { gridAx: { x: 1, y: 0 }, type: 'wood-empty'},
						'k': { gridAx: { x: 0, y: 1 }, type: 'wood-empty'},
						'l': { gridAx: { x: 0, y: 2 }, type: 'wood', dir:'h'},

						'z': { gridAx: { x: 2, y: 3 }, type: 'goal', dir: 'r', isPath: true, hintspin: true },
					},
					//R
					{
						'a': { gridAx: { x: 3, y: 1 }, type: 'start', dir: 'b', isPath: true, ball: true },
						
						'b': { gridAx: { x: 3, y: 0 }, type: 'wood', dir: 'lb', isPath: true},
						'c': { gridAx: { x: 2, y: 0 }, type: 'wood', dir: 'rb', isPath: true},
						'd': { gridAx: { x: 2, y: 1 }, type: 'wood', dir: 'v', isPath: true, star:true},
						'e': { gridAx: { x: 2, y: 2 }, type: 'wood', dir: 'lt', isPath: true},
						'f': { gridAx: { x: 1, y: 2 }, type: 'wood', dir: 'rb', isPath: true, star:true},
						'g': { gridAx: { x: 1, y: 3 }, type: 'wood', dir: 'lt', isPath: true, star:true},
						'h': { gridAx: { x: 0, y: 3 }, type: 'wood', dir: 'rt', isPath: true},

						'i': { gridAx: { x: 1, y: 1 }, type: 'wood', dir: 'h'},
						'j': { gridAx: { x: 2, y: 3 }, type: 'wood', dir: 'v'},

						'z': { gridAx: { x: 0, y: 2 }, type: 'goal', dir: 't', isPath: true, hintspin: true },
					}, 
					//S
					{
						'a': { gridAx: { x: 3, y: 3 }, type: 'start', dir: 'b', isPath: true, ball: true },
						
						'b': { gridAx: { x: 3, y: 2 }, type: 'wood', dir: 'lb', isPath: true, star:true},
						'c': { gridAx: { x: 2, y: 2 }, type: 'wood', dir: 'rb', isPath: true,},
						'e': { gridAx: { x: 2, y: 3 }, type: 'wood', dir: 'lt', isPath: true,},
						'f': { gridAx: { x: 1, y: 3 }, type: 'wood', dir: 'rt', isPath: true, star:true},
						'g': { gridAx: { x: 1, y: 2 }, type: 'wood', dir: 'v', isPath: true, star:true},
						'h': { gridAx: { x: 1, y: 1 }, type: 'wood', dir: 'lb', isPath: true,},
						'i': { gridAx: { x: 0, y: 1 }, type: 'wood', dir: 'rt', isPath: true,},

						'j': { gridAx: { x: 0, y: 2 }, type: 'wood', dir: 'h',},
						'k': { gridAx: { x: 2, y: 0 }, type: 'wood', dir: 'h',},

						'z': { gridAx: { x: 0, y: 0 }, type: 'goal', dir: 't', isPath: true, hintspin: true },
					},
					//T
					{
						'a': { gridAx: { x: 3, y: 0 }, type: 'start', dir: 't', isPath: true, ball: true },
						'b': { gridAx: { x: 3, y: 1 }, type: 'wood', dir: 'lt', isPath: true},
						'c': { gridAx: { x: 2, y: 1 }, type: 'wood', dir: 'rb', isPath: true},
						'd': { gridAx: { x: 2, y: 2 }, type: 'wood', dir: 'rt', isPath: true, star:true},
						'e': { gridAx: { x: 3, y: 2 }, type: 'wood', dir: 'lb', isPath: true},
						'f': { gridAx: { x: 3, y: 3 }, type: 'metal', dir: 'lt', isPath: true, star:true},
						'g': { gridAx: { x: 2, y: 3 }, type: 'wood', dir: 'h', isPath: true},
						'h': { gridAx: { x: 1, y: 3 }, type: 'wood', dir: 'rt', isPath: true, star:true},
						'i': { gridAx: { x: 1, y: 2 }, type: 'wood', dir: 'lb', isPath: true},
						'j': { gridAx: { x: 0, y: 2 }, type: 'wood', dir: 'rb', isPath: true},
						
						'k': { gridAx: { x: 2, y: 0 }, type: 'wood', dir: 'v'},
						'l': { gridAx: { x: 0, y: 1 }, type: 'wood', dir: 'v'},

						'z': { gridAx: { x: 0, y: 3 }, type: 'goal', dir: 'b', isPath: true, hintspin: true },
					},
					//U
					{
						'a': { gridAx: { x: 3, y: 3 }, type: 'start', dir: 'r', isPath: true, ball: true },
						
						'b': { gridAx: { x: 2, y: 3 }, type: 'wood', dir: 'rt', isPath: true, star:true},
						'c': { gridAx: { x: 2, y: 2 }, type: 'wood', dir: 'rb', isPath: true},
						'd': { gridAx: { x: 3, y: 2 }, type: 'wood', dir: 'lt', isPath: true},
						'e': { gridAx: { x: 3, y: 1 }, type: 'wood', dir: 'lb', isPath: true},
						'f': { gridAx: { x: 2, y: 1 }, type: 'wood', dir: 'h', isPath: true, star:true},
						'g': { gridAx: { x: 1, y: 1 }, type: 'wood', dir: 'rb', isPath: true},
						'h': { gridAx: { x: 1, y: 2 }, type: 'wood', dir: 'v', isPath: true},
						'i': { gridAx: { x: 1, y: 3 }, type: 'wood', dir: 'lt', isPath: true, star:true},

						'j': { gridAx: { x: 0, y: 2 }, type: 'wood', dir: 'h'},
						'k': { gridAx: { x: 0, y: 0 }, type: 'wood-empty'},
						'l': { gridAx: { x: 1, y: 0 }, type: 'wood-empty'},
						'm': { gridAx: { x: 0, y: 1 }, type: 'wood-empty'},

						'z': { gridAx: { x: 0, y: 3 }, type: 'goal', dir: 'l', isPath: true, hintspin: true },
					},
					//V
					{
						'a': { gridAx: { x: 3, y: 0 }, type: 'start', dir: 'r', isPath: true, ball: true },
						
						'b': { gridAx: { x: 2, y: 0 }, type: 'wood', dir: 'rb', isPath: true},
						'c': { gridAx: { x: 2, y: 1 }, type: 'wood', dir: 'v', isPath: true, star:true},
						'd': { gridAx: { x: 2, y: 2 }, type: 'metal', dir: 'rt', isPath: true},
						'e': { gridAx: { x: 3, y: 2 }, type: 'wood', dir: 'lb', isPath: true},
						'f': { gridAx: { x: 3, y: 3 }, type: 'wood', dir: 'lt', isPath: true},
						'g': { gridAx: { x: 2, y: 3 }, type: 'wood', dir: 'h', isPath: true, star:true},
						'h': { gridAx: { x: 1, y: 3 }, type: 'wood', dir: 'rt', isPath: true},
						'i': { gridAx: { x: 1, y: 2 }, type: 'wood', dir: 'v', isPath: true},
						'j': { gridAx: { x: 1, y: 1 }, type: 'wood', dir: 'v', isPath: true, star:true},
						'k': { gridAx: { x: 1, y: 0 }, type: 'wood', dir: 'lb', isPath: true},
						
						'l': { gridAx: { x: 0, y: 2 }, type: 'wood', dir: 'h'},

						'z': { gridAx: { x: 0, y: 0 }, type: 'goal', dir: 'l', isPath: true, hintspin: true },
					},
					//W
					{
						'b': { gridAx: { x: 1, y: 1 }, type: 'start', dir: 't', isPath: true, ball: true },
						
						'c': { gridAx: { x: 1, y: 2 }, type: 'wood', dir: 'lt', isPath: true},
						'd': { gridAx: { x: 0, y: 2 }, type: 'wood', dir: 'rb', isPath: true, star:true},
						'e': { gridAx: { x: 0, y: 3 }, type: 'wood', dir: 'rt', isPath: true},
						'f': { gridAx: { x: 1, y: 3 }, type: 'wood', dir: 'h', isPath: true, star:true},
						'g': { gridAx: { x: 2, y: 3 }, type: 'wood', dir: 'lt', isPath: true, star:true},
						'h': { gridAx: { x: 2, y: 2 }, type: 'wood', dir: 'v', isPath: true},
						'i': { gridAx: { x: 2, y: 1 }, type: 'wood', dir: 'v', isPath: true},
						'j': { gridAx: { x: 2, y: 0 }, type: 'wood', dir: 'lb', isPath: true},
						'k': { gridAx: { x: 1, y: 0 }, type: 'wood', dir: 'h', isPath: true},


						'l': { gridAx: { x: 3, y: 2 }, type: 'wood', dir: 'h'},
						'm': { gridAx: { x: 3, y: 0 }, type: 'wood-empty'},

						'z': { gridAx: { x: 0, y: 0 }, type: 'goal', dir: 'l', isPath: true, hintspin: true },
					},
					//X
					{
						'a': { gridAx: { x: 3, y: 3 }, type: 'start', dir: 'r', isPath: true, ball: true },

						'b': { gridAx: { x: 2, y: 3 }, type: 'wood', dir: 'rt', isPath: true},
						'c': { gridAx: { x: 2, y: 2 }, type: 'wood', dir: 'rb', isPath: true},
						'd': { gridAx: { x: 3, y: 2 }, type: 'wood', dir: 'lt', isPath: true},
						'e': { gridAx: { x: 3, y: 1 }, type: 'wood', dir: 'v', isPath: true},
						'f': { gridAx: { x: 3, y: 0 }, type: 'metal', dir: 'lb', isPath: true, star:true},
						'g': { gridAx: { x: 2, y: 0 }, type: 'wood', dir: 'rb', isPath: true},
						'h': { gridAx: { x: 2, y: 1 }, type: 'wood', dir: 'lt', isPath: true},
						'i': { gridAx: { x: 1, y: 1 }, type: 'wood', dir: 'rb', isPath: true,star:true},
						'j': { gridAx: { x: 1, y: 2 }, type: 'wood', dir: 'v', isPath: true},
						'k': { gridAx: { x: 1, y: 3 }, type: 'wood', dir: 'lt', isPath: true},
						'l': { gridAx: { x: 0, y: 3 }, type: 'metal', dir: 'rt', isPath: true, star:true},
						'm': { gridAx: { x: 0, y: 2 }, type: 'wood', dir: 'v', isPath: true},
						'n': { gridAx: { x: 0, y: 1 }, type: 'wood', dir: 'v', isPath: true},
						
						'z': { gridAx: { x: 0, y: 0 }, type: 'goal', dir: 't', isPath: true, hintspin: true },
					},
				],
				layoutShuffle: [
					//A
					[
						{ id: 'c', tileDir: 'y', step: 1 },
					],
					//B
					[
						{ id: 'g', tileDir: 'y', step: 1 },
						{ id: 'f', tileDir: 'x', step: 1 },
						{ id: 'h', tileDir: 'y', step: -1 },
					],
					//C
					[
						{ id: 'e', tileDir: 'y', step: 1 },
						{ id: 'f', tileDir: 'x', step: -1 },
						{ id: 'g', tileDir: 'x', step: -1 },
						{ id: 'h', tileDir: 'y', step: -1 },
					],
					//D
					[
						{id: "c", tileDir: "x", step: -1},
						{id: "b", tileDir: "y", step: -1},
						{id: "h", tileDir: "x", step: 1},
						{id: "i", tileDir: "x", step: -1},
						{id: "b", tileDir: "x", step: 1},
						{id: "b", tileDir: "y", step: 1},
						{id: "h", tileDir: "x", step: -1},
						{id: "c", tileDir: "x", step: 1},
					],
					//E
					[
						{id: "c", tileDir: "y", step: 1},
						{id: "d", tileDir: "x", step: -1},
						{id: "f", tileDir: "y", step: 1},
						{id: "e", tileDir: "x", step: 1},
						{id: "i", tileDir: "y", step: -1},
						{id: "h", tileDir: "y", step: -1},
						{id: "f", tileDir: "x", step: -1},
						{id: "c", tileDir: "x", step: 1},
					],
					//F
					[
						{ id: 'c', tileDir: 'y', step: 1 },
						{ id: 'd', tileDir: 'x', step: -1 },
						{ id: 'e', tileDir: 'x', step: 1 },
						{ id: 'f', tileDir: 'y', step: 1 },
						{ id: 'f', tileDir: 'x', step: 1 },
						{ id: 'd', tileDir: 'x', step: 1 },
					],
					//G
					[
						{ id: 'k', tileDir: 'y', step: 1 },
						{ id: 'j', tileDir: 'x', step: 1 },
						{ id: 'b', tileDir: 'y', step: 1 },
						{ id: 'b', tileDir: 'y', step: 1 },
						{ id: 'j', tileDir: 'x', step: -1 },
						{ id: 'j', tileDir: 'y', step: -1 },
						{ id: 'c', tileDir: 'y', step: 1 },
						{ id: 'c', tileDir: 'x', step: -1 },
						{ id: 'k', tileDir: 'y', step: -1 },
					],
					//H
					[
						{ id: 'g', tileDir: 'y', step: -1 },
						{ id: 'g', tileDir: 'x', step: -1 },
						{ id: 'b', tileDir: 'y', step: -1 },
						{ id: 'b', tileDir: 'y', step: -1 },
						{ id: 'h', tileDir: 'x', step: 1 },
						{ id: 'h', tileDir: 'y', step: 1 },
						{ id: 'g', tileDir: 'y', step: 1 },
						{ id: 'g', tileDir: 'x', step: 1 },
					],
					//I
					[
						{id: "i", tileDir: "y", step: 1},
						{id: "h", tileDir: "x", step: 1},
						{id: "j", tileDir: "y", step: -1},
						{id: "b", tileDir: "x", step: 1},
						{id: "c", tileDir: "y", step: 1},
						{id: "j", tileDir: "x", step: -1},
					],
					//J
					[
						{id: "e", tileDir: "y", step: -1},
						{id: "d", tileDir: "y", step: -1},
						{id: "g", tileDir: "x", step: -1},
						{id: "f", tileDir: "y", step: 1},
						{id: "d", tileDir: "x", step: 1},
						{id: "e", tileDir: "y", step: 1},
					],
					//K
					[
						{id: "f", tileDir: "y", step: -1},
						{id: "c", tileDir: "x", step: 1},
						{id: "c", tileDir: "y", step: 1},
						{id: "e", tileDir: "x", step: 1},
						{id: "e", tileDir: "y", step: 1},
						{id: "g", tileDir: "y", step: 1},
					],
					//L
					[
						{id: "d", tileDir: "x", step: -1},
						{id: "c", tileDir: "y", step: -1},
						{id: "d", tileDir: "y", step: -1},
						{id: "b", tileDir: "y", step: -1},
						{id: "g", tileDir: "x", step: -1},
						{id: "g", tileDir: "x", step: -1},
					],
					//M
					[
						{id: "c", tileDir: "x", step: 1},
						{id: "f", tileDir: "x", step: 1},
						{id: "g", tileDir: "y", step: -1},
						{id: "g", tileDir: "y", step: -1},
						{id: "d", tileDir: "x", step: -1},
						{id: "d", tileDir: "y", step: 1},
						{id: "g", tileDir: "y", step: 1},
						{id: "e", tileDir: "x", step: -1},
					],
					//N
					[
						{id: "d", tileDir: "y", step: -1},
						{id: "c", tileDir: "x", step: -1},
						{id: "h", tileDir: "y", step: -1},
						{id: "c", tileDir: "y", step: 1},
						{id: "c", tileDir: "x", step: 1},
						{id: "e", tileDir: "x", step: -1},
						{id: "i", tileDir: "y", step: 1},
					],
					//O
					[
						{id: "b", tileDir: "x", step: -1},
						{id: "b", tileDir: "x", step: -1},
						{id: "f", tileDir: "y", step: -1},
						{id: "f", tileDir: "x", step: 1},
						{id: "b", tileDir: "x", step: 1},
						{id: "b", tileDir: "y", step: 1},
						{id: "g", tileDir: "y", step: -1},
						{id: "g", tileDir: "x", step: 1},
					],
					//P
					[
						{id: "d", tileDir: "y", step: 1},
						{id: "c", tileDir: "x", step: -1},
						{id: "j", tileDir: "x", step: 1},
						{id: "j", tileDir: "y", step: 1},
						{id: "i", tileDir: "x", step: 1},
						{id: "i", tileDir: "x", step: 1},
						{id: "e", tileDir: "y", step: -1},
						{id: "e", tileDir: "x", step: 1},
						{id: "h", tileDir: "x", step: 1},
						{id: "h", tileDir: "y", step: 1},
					],
					//Q
					[
						{id: "i", tileDir: "x", step: -1},
						{id: "h", tileDir: "y", step: 1},
						{id: "l", tileDir: "x", step: 1},
						{id: "k", tileDir: "y", step: 1},
						{id: "f", tileDir: "x", step: -1},
						{id: "c", tileDir: "x", step: -1},
						{id: "d", tileDir: "y", step: 1},
						{id: "e", tileDir: "x", step: 1},
						{id: "j", tileDir: "x", step: 1},
					],
					//R
					[
						{id: "e", tileDir: "x", step: 1},
						{id: "f", tileDir: "x", step: 1},
						{id: "i", tileDir: "y", step: 1},
						{id: "e", tileDir: "y", step: 1},
						{id: "f", tileDir: "x", step: 1},
						{id: "j", tileDir: "y", step: -1},
						{id: "e", tileDir: "x", step: -1},
					],
					//S
					[
						{id: "b", tileDir: "y", step: -1},
						{id: "c", tileDir: "x", step: 1},
						{id: "k", tileDir: "y", step: 1},
						{id: "k", tileDir: "y", step: 1},
						{id: "h", tileDir: "y", step: -1},
						{id: "g", tileDir: "y", step: -1},
						{id: "g", tileDir: "x", step: 1},
						{id: "j", tileDir: "x", step: 1},
						{id: "h", tileDir: "y", step: 1},
					],
					//T
					[
						{id: "i", tileDir: "y", step: -1},
						{id: "i", tileDir: "y", step: -1},
						{id: "l", tileDir: "x", step: 1},
						{id: "l", tileDir: "y", step: 1},
						{id: "c", tileDir: "x", step: -1},
						{id: "d", tileDir: "y", step: -1},
						{id: "l", tileDir: "x", step: 1},
						{id: "c", tileDir: "y", step: 1},
						{id: "d", tileDir: "x", step: -1},
						{id: "k", tileDir: "y", step: 1},
					],
					//U
					[
						{id: "e", tileDir: "y", step: -1},
						{id: "d", tileDir: "y", step: -1},
						{id: "c", tileDir: "x", step: 1},
						{id: "f", tileDir: "y", step: 1},
						{id: "l", tileDir: "x", step: 1},
						{id: "l", tileDir: "y", step: 1},
						{id: "g", tileDir: "y", step: -1},
						{id: "h", tileDir: "y", step: -1},
						{id: "j", tileDir: "x", step: 1},
						{id: "m", tileDir: "y", step: 1},
					],
					//V
					[
						{id: "e", tileDir: "y", step: -1},
						{id: "f", tileDir: "y", step: -1},
						{id: "h", tileDir: "x", step: -1},
						{id: "j", tileDir: "x", step: -1},
						{id: "i", tileDir: "y", step: -1},
						{id: "l", tileDir: "x", step: 1},
						{id: "l", tileDir: "y", step: 1},
						{id: "i", tileDir: "y", step: 1},
						{id: "j", tileDir: "x", step: 1},
					],
					//W
					[
						{id: "d", tileDir: "y", step: -1},
						{id: "l", tileDir: "y", step: 1},
						{id: "h", tileDir: "x", step: 1},
						{id: "h", tileDir: "y", step: -1},
						{id: "g", tileDir: "y", step: -1},
						{id: "g", tileDir: "x", step: 1},
						{id: "c", tileDir: "x", step: -1},
						{id: "f", tileDir: "x", step: 1},
						{id: "e", tileDir: "x", step: 1},
						{id: "e", tileDir: "y", step: -1},
						{id: "f", tileDir: "y", step: -1},
						
					],
					//X
					[
						{id: "i", tileDir: "y", step: -1},
						{id: "h", tileDir: "x", step: -1},
						{id: "c", tileDir: "y", step: -1},
						{id: "j", tileDir: "x", step: 1},
						{id: "h", tileDir: "y", step: 1},
						{id: "c", tileDir: "x", step: -1},
						{id: "j", tileDir: "y", step: -1},
						{id: "b", tileDir: "y", step: -1},
						{id: "k", tileDir: "x", step: 1},
						{id: "h", tileDir: "y", step: 1},
						{id: "m", tileDir: "x", step: 1},
						{id: "n", tileDir: "y", step: 1},
						{id: "c", tileDir: "x", step: -1},
						{id: "i", tileDir: "y", step: 1},
					],
				],
				maxMoves: [
					1,//A
					3,//B
					4,//C
					8,//D
					8,//E
					1,//F. quicker but less star
					7,//G
					6,//H
					6,//I
					6,//J
					6,//K
					6,//L
					7,//M
					5,//N
					8,//O
					8,//P
					8,//Q
					3,//R. quicker but less star
					8,//S
					10,//T
					9,//U
					9,//V
					1,//W. quicker but less star
					14,//X.
				],

				/**Setting to show text animation on beginning and end game level */
				bShowTransitionText:false,

				//Points available on stright path
				//Reduced by step stepStrightPad
				stepStrightBase: 25,
				//Points available on arc path
				stepArcBase: 100,
				//Default scale for step speed
				stepSpeedBase: 2,
				//Quick scale for step speed
				stepSpeedQuick: 4,
				//If the tile type is start or goal
				//they need a padding
				stepStrightPad: 5,
				//If the tile type is start or goal
				//Their size need to be smaller
				stepStrightSizeMin: 32,

				//Game overlay darkness when dialog appear
				pauseOverlayDarkness: 0.8,
				optionOverlayDarkness: 0.8,

				//Star on top ui
				starTopUiDelay: 0.25,

				//How fast each dialog show and hide
				dialogShowSpeed: 0.25,

				//How fast level tile transitioning
				selectleveltileDelay: 0.025,

				//How long end game dialog shows, after ball reach end path
				endGameDelay:0.5,

			},
		});
	});