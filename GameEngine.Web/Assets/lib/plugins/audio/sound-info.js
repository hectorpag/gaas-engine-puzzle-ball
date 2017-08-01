/**
 *  SoundHandler
 *
 *  Created by Justin Ng on 2014-08-19.
 *  Copyright (c) 2014 __MyCompanyName__. All rights reserved.
 */

ig.module('plugins.audio.sound-info')
.requires(
)
.defines(function () {

    SoundInfo = ig.Class.extend({
		FORMATS:{
			OGG:".ogg",
			MP3:".mp3",
		},
        
		/**
		* Define your sounds here
		* 
        */
		sfx:{
            kittyopeningSound: {
                path: ImpactPrefix +"media/audio/opening/kittyopening"}
            , staticSound: { path: ImpactPrefix +"media/audio/play/static"}
            , openingSound: { path: ImpactPrefix +"media/audio/opening/opening"}
            , tile: { path: ImpactPrefix +"media/audio/play/tile"}
            , button: { path: ImpactPrefix +"media/audio/play/button"}
            , hint: { path: ImpactPrefix +"media/audio/play/hint"}
            , win: { path: ImpactPrefix +"media/audio/play/win"}
            , ballroll: { path: ImpactPrefix +"media/audio/play/ballroll"}
            , ding1: { path: ImpactPrefix +"media/audio/play/ding1"}
            , ding2: { path: ImpactPrefix +"media/audio/play/ding2"}
            , ding3: { path: ImpactPrefix +"media/audio/play/ding3"}
            , enddialog: { path: ImpactPrefix +"media/audio/play/end-dialog"}
		},
		
        /**
        * Define your BGM here
        */
		bgm:{
            background: { path:ImpactPrefix +'media/audio/bgm',startOgg:0,endOgg:46.106,startMp3:0,endMp3:46.106}
		}
        
		
    });

});
