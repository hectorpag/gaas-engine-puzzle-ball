/*
# MarketJS Game Loading System
# -----------------------------------------------------------------------
# Copyright (c) 2012 MarketJS Limited. Certain portions may come from 3rd parties and
# carry their own licensing terms and are referenced where applicable. 
# -----------------------------------------------------------------------
*/

function loadScriptsSynchronously(arr) {
    if (!arr || !arr.length) return;
    var i;
    var loadFunctions = [];
    for (i = arr.length - 1; i >= 0; --i) {
        if (i == arr.length - 1) {
            loadFunctions[i] = (function (idx) { return function () { jQuery.getScript(arr[idx], function () { }); }; })(i);
        } else {
            loadFunctions[i] = (function (idx) { return function () { jQuery.getScript(arr[idx], loadFunctions[idx + 1]); }; })(i);
        }
    }
    loadFunctions[0]();
}
console.log(ImpactPrefix);
// if not on server, run compiled version
loadScriptsSynchronously([
	// _STRINGS
    ImpactPrefix+'media/text/strings.js',

	// SETTINGS
    ImpactPrefix +'settings/dev.js',

	// ADS		
    ImpactPrefix +'settings/ad/mobile/header/themes/light/ad.js',
    ImpactPrefix +'settings/ad/mobile/preroll/themes/light/ad.js',
    ImpactPrefix +'settings/ad/mobile/footer/themes/light/ad.js',
    ImpactPrefix +'settings/ad/mobile/end/themes/light/ad.js',
				
	// IE >=9 
    ImpactPrefix +'glue/ie/ie.js',

	// Jukebox
    ImpactPrefix +'glue/jukebox/Player.js',

	// ORIENTATION

	//Howler
    ImpactPrefix +'glue/howler/howler.js',
	
	// Game
    ImpactPrefix +'lib/impact/impact.js',
    ImpactPrefix +'lib/game/main.js'
    
]);
