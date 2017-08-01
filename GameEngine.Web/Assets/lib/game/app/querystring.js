/**
 * Used for active query string parameter.
 * set queryString variable to true to active it. However should be disabled in production
 *
 * @since 0.1.0
 *
 * @author andrian.alfarabi@impact360design.com
 */
ig.module('game.app.querystring')
.requires(
	//Other required class
	'impact.game'
)
.defines(function () {
	ig.Game.inject({
		queryString:false,//Set true when you need to access query string
		init:function(){
			this.queryString = (this.queryString) ? QueryString : false;
			QueryString = false;
		},
	});
});
//Prepare query string
QueryString=function(){
    // This function is anonymous, is executed immediately and 
    // the return value is assigned to QueryString!
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string") {
            var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
            query_string[pair[0]] = arr;
        // If third or later entry with this name
        } else {
            query_string[pair[0]].push(decodeURIComponent(pair[1]));
        }
    } 
    return query_string;
}();