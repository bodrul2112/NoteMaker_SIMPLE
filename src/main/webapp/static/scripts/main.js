

require( ["plugins/domReady", "thirdparty/jquery", "thirdparty/easing","notemaker/NoteMaker"], 
		function(domReady, jQuery, Easing, NoteMaker){
	
	domReady(function(){
		
		require(["thirdparty/jquery", "thirdparty/easing", "notemaker/NoteMaker"], 
				function(jQuery, Easing, NoteMaker) {
			
				console.log("things have loaded yo"); 
				
				var oEasing = new Easing(); // not pretty, but does the job bob. 
				
				var oNoteMaker = new NoteMaker();
			
		});
		
	});

});

